!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		  ? define(t)
		  : ((e =
					'undefined' != typeof globalThis
						? globalThis
						: e || self).RevealMarkdown = t());
})(this, function () {
	'use strict';
	function e() {
		return {
			async: !1,
			breaks: !1,
			extensions: null,
			gfm: !0,
			hooks: null,
			pedantic: !1,
			renderer: null,
			silent: !1,
			tokenizer: null,
			walkTokens: null,
		};
	}
	let t = {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null,
	};
	function n(e) {
		t = e;
	}
	const s = /[&<>"']/,
		r = new RegExp(s.source, 'g'),
		i = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
		l = new RegExp(i.source, 'g'),
		a = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		},
		o = (e) => a[e];
	function c(e, t) {
		if (t) {
			if (s.test(e)) return e.replace(r, o);
		} else if (i.test(e)) return e.replace(l, o);
		return e;
	}
	const h = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
	const p = /(^|[^\[])\^/g;
	function u(e, t) {
		(e = 'string' == typeof e ? e : e.source), (t = t || '');
		const n = {
			replace: (t, s) => (
				(s = (s =
					'object' == typeof s && 'source' in s
						? s.source
						: s).replace(p, '$1')),
				(e = e.replace(t, s)),
				n
			),
			getRegex: () => new RegExp(e, t),
		};
		return n;
	}
	function g(e) {
		try {
			e = encodeURI(e).replace(/%25/g, '%');
		} catch (e) {
			return null;
		}
		return e;
	}
	const d = { exec: () => null };
	function k(e, t) {
		const n = e
			.replace(/\|/g, (e, t, n) => {
				let s = !1,
					r = t;
				for (; --r >= 0 && '\\' === n[r]; ) s = !s;
				return s ? '|' : ' |';
			})
			.split(/ \|/);
		let s = 0;
		if (
			(n[0].trim() || n.shift(),
			n.length > 0 && !n[n.length - 1].trim() && n.pop(),
			t)
		)
			if (n.length > t) n.splice(t);
			else for (; n.length < t; ) n.push('');
		for (; s < n.length; s++) n[s] = n[s].trim().replace(/\\\|/g, '|');
		return n;
	}
	function f(e, t, n) {
		const s = e.length;
		if (0 === s) return '';
		let r = 0;
		for (; r < s; ) {
			const i = e.charAt(s - r - 1);
			if (i !== t || n) {
				if (i === t || !n) break;
				r++;
			} else r++;
		}
		return e.slice(0, s - r);
	}
	function x(e, t, n, s) {
		const r = t.href,
			i = t.title ? c(t.title) : null,
			l = e[1].replace(/\\([\[\]])/g, '$1');
		if ('!' !== e[0].charAt(0)) {
			s.state.inLink = !0;
			const e = {
				type: 'link',
				raw: n,
				href: r,
				title: i,
				text: l,
				tokens: s.inlineTokens(l),
			};
			return (s.state.inLink = !1), e;
		}
		return { type: 'image', raw: n, href: r, title: i, text: c(l) };
	}
	class m {
		options;
		rules;
		lexer;
		constructor(e) {
			this.options = e || t;
		}
		space(e) {
			const t = this.rules.block.newline.exec(e);
			if (t && t[0].length > 0) return { type: 'space', raw: t[0] };
		}
		code(e) {
			const t = this.rules.block.code.exec(e);
			if (t) {
				const e = t[0].replace(/^ {1,4}/gm, '');
				return {
					type: 'code',
					raw: t[0],
					codeBlockStyle: 'indented',
					text: this.options.pedantic ? e : f(e, '\n'),
				};
			}
		}
		fences(e) {
			const t = this.rules.block.fences.exec(e);
			if (t) {
				const e = t[0],
					n = (function (e, t) {
						const n = e.match(/^(\s+)(?:```)/);
						if (null === n) return t;
						const s = n[1];
						return t
							.split('\n')
							.map((e) => {
								const t = e.match(/^\s+/);
								if (null === t) return e;
								const [n] = t;
								return n.length >= s.length
									? e.slice(s.length)
									: e;
							})
							.join('\n');
					})(e, t[3] || '');
				return {
					type: 'code',
					raw: e,
					lang: t[2]
						? t[2].trim().replace(this.rules.inline._escapes, '$1')
						: t[2],
					text: n,
				};
			}
		}
		heading(e) {
			const t = this.rules.block.heading.exec(e);
			if (t) {
				let e = t[2].trim();
				if (/#$/.test(e)) {
					const t = f(e, '#');
					this.options.pedantic
						? (e = t.trim())
						: (t && !/ $/.test(t)) || (e = t.trim());
				}
				return {
					type: 'heading',
					raw: t[0],
					depth: t[1].length,
					text: e,
					tokens: this.lexer.inline(e),
				};
			}
		}
		hr(e) {
			const t = this.rules.block.hr.exec(e);
			if (t) return { type: 'hr', raw: t[0] };
		}
		blockquote(e) {
			const t = this.rules.block.blockquote.exec(e);
			if (t) {
				const e = f(t[0].replace(/^ *>[ \t]?/gm, ''), '\n'),
					n = this.lexer.state.top;
				this.lexer.state.top = !0;
				const s = this.lexer.blockTokens(e);
				return (
					(this.lexer.state.top = n),
					{ type: 'blockquote', raw: t[0], tokens: s, text: e }
				);
			}
		}
		list(e) {
			let t = this.rules.block.list.exec(e);
			if (t) {
				let n = t[1].trim();
				const s = n.length > 1,
					r = {
						type: 'list',
						raw: '',
						ordered: s,
						start: s ? +n.slice(0, -1) : '',
						loose: !1,
						items: [],
					};
				(n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
					this.options.pedantic && (n = s ? n : '[*+-]');
				const i = new RegExp(
					`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`,
				);
				let l = '',
					a = '',
					o = !1;
				for (; e; ) {
					let n = !1;
					if (!(t = i.exec(e))) break;
					if (this.rules.block.hr.test(e)) break;
					(l = t[0]), (e = e.substring(l.length));
					let s = t[2]
							.split('\n', 1)[0]
							.replace(/^\t+/, (e) => ' '.repeat(3 * e.length)),
						c = e.split('\n', 1)[0],
						h = 0;
					this.options.pedantic
						? ((h = 2), (a = s.trimStart()))
						: ((h = t[2].search(/[^ ]/)),
						  (h = h > 4 ? 1 : h),
						  (a = s.slice(h)),
						  (h += t[1].length));
					let p = !1;
					if (
						(!s &&
							/^ *$/.test(c) &&
							((l += c + '\n'),
							(e = e.substring(c.length + 1)),
							(n = !0)),
						!n)
					) {
						const t = new RegExp(
								`^ {0,${Math.min(
									3,
									h - 1,
								)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`,
							),
							n = new RegExp(
								`^ {0,${Math.min(
									3,
									h - 1,
								)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
							),
							r = new RegExp(
								`^ {0,${Math.min(3, h - 1)}}(?:\`\`\`|~~~)`,
							),
							i = new RegExp(`^ {0,${Math.min(3, h - 1)}}#`);
						for (; e; ) {
							const o = e.split('\n', 1)[0];
							if (
								((c = o),
								this.options.pedantic &&
									(c = c.replace(
										/^ {1,4}(?=( {4})*[^ ])/g,
										'  ',
									)),
								r.test(c))
							)
								break;
							if (i.test(c)) break;
							if (t.test(c)) break;
							if (n.test(e)) break;
							if (c.search(/[^ ]/) >= h || !c.trim())
								a += '\n' + c.slice(h);
							else {
								if (p) break;
								if (s.search(/[^ ]/) >= 4) break;
								if (r.test(s)) break;
								if (i.test(s)) break;
								if (n.test(s)) break;
								a += '\n' + c;
							}
							p || c.trim() || (p = !0),
								(l += o + '\n'),
								(e = e.substring(o.length + 1)),
								(s = c.slice(h));
						}
					}
					r.loose ||
						(o ? (r.loose = !0) : /\n *\n *$/.test(l) && (o = !0));
					let u,
						g = null;
					this.options.gfm &&
						((g = /^\[[ xX]\] /.exec(a)),
						g &&
							((u = '[ ] ' !== g[0]),
							(a = a.replace(/^\[[ xX]\] +/, '')))),
						r.items.push({
							type: 'list_item',
							raw: l,
							task: !!g,
							checked: u,
							loose: !1,
							text: a,
							tokens: [],
						}),
						(r.raw += l);
				}
				(r.items[r.items.length - 1].raw = l.trimEnd()),
					(r.items[r.items.length - 1].text = a.trimEnd()),
					(r.raw = r.raw.trimEnd());
				for (let e = 0; e < r.items.length; e++)
					if (
						((this.lexer.state.top = !1),
						(r.items[e].tokens = this.lexer.blockTokens(
							r.items[e].text,
							[],
						)),
						!r.loose)
					) {
						const t = r.items[e].tokens.filter(
								(e) => 'space' === e.type,
							),
							n =
								t.length > 0 &&
								t.some((e) => /\n.*\n/.test(e.raw));
						r.loose = n;
					}
				if (r.loose)
					for (let e = 0; e < r.items.length; e++)
						r.items[e].loose = !0;
				return r;
			}
		}
		html(e) {
			const t = this.rules.block.html.exec(e);
			if (t) {
				return {
					type: 'html',
					block: !0,
					raw: t[0],
					pre:
						'pre' === t[1] || 'script' === t[1] || 'style' === t[1],
					text: t[0],
				};
			}
		}
		def(e) {
			const t = this.rules.block.def.exec(e);
			if (t) {
				const e = t[1].toLowerCase().replace(/\s+/g, ' '),
					n = t[2]
						? t[2]
								.replace(/^<(.*)>$/, '$1')
								.replace(this.rules.inline._escapes, '$1')
						: '',
					s = t[3]
						? t[3]
								.substring(1, t[3].length - 1)
								.replace(this.rules.inline._escapes, '$1')
						: t[3];
				return { type: 'def', tag: e, raw: t[0], href: n, title: s };
			}
		}
		table(e) {
			const t = this.rules.block.table.exec(e);
			if (t) {
				if (!/[:|]/.test(t[2])) return;
				const e = {
					type: 'table',
					raw: t[0],
					header: k(t[1]).map((e) => ({ text: e, tokens: [] })),
					align: t[2].replace(/^\||\| *$/g, '').split('|'),
					rows:
						t[3] && t[3].trim()
							? t[3].replace(/\n[ \t]*$/, '').split('\n')
							: [],
				};
				if (e.header.length === e.align.length) {
					let t,
						n,
						s,
						r,
						i = e.align.length;
					for (t = 0; t < i; t++) {
						const n = e.align[t];
						n &&
							(/^ *-+: *$/.test(n)
								? (e.align[t] = 'right')
								: /^ *:-+: *$/.test(n)
								  ? (e.align[t] = 'center')
								  : /^ *:-+ *$/.test(n)
								    ? (e.align[t] = 'left')
								    : (e.align[t] = null));
					}
					for (i = e.rows.length, t = 0; t < i; t++)
						e.rows[t] = k(e.rows[t], e.header.length).map((e) => ({
							text: e,
							tokens: [],
						}));
					for (i = e.header.length, n = 0; n < i; n++)
						e.header[n].tokens = this.lexer.inline(
							e.header[n].text,
						);
					for (i = e.rows.length, n = 0; n < i; n++)
						for (r = e.rows[n], s = 0; s < r.length; s++)
							r[s].tokens = this.lexer.inline(r[s].text);
					return e;
				}
			}
		}
		lheading(e) {
			const t = this.rules.block.lheading.exec(e);
			if (t)
				return {
					type: 'heading',
					raw: t[0],
					depth: '=' === t[2].charAt(0) ? 1 : 2,
					text: t[1],
					tokens: this.lexer.inline(t[1]),
				};
		}
		paragraph(e) {
			const t = this.rules.block.paragraph.exec(e);
			if (t) {
				const e =
					'\n' === t[1].charAt(t[1].length - 1)
						? t[1].slice(0, -1)
						: t[1];
				return {
					type: 'paragraph',
					raw: t[0],
					text: e,
					tokens: this.lexer.inline(e),
				};
			}
		}
		text(e) {
			const t = this.rules.block.text.exec(e);
			if (t)
				return {
					type: 'text',
					raw: t[0],
					text: t[0],
					tokens: this.lexer.inline(t[0]),
				};
		}
		escape(e) {
			const t = this.rules.inline.escape.exec(e);
			if (t) return { type: 'escape', raw: t[0], text: c(t[1]) };
		}
		tag(e) {
			const t = this.rules.inline.tag.exec(e);
			if (t)
				return (
					!this.lexer.state.inLink && /^<a /i.test(t[0])
						? (this.lexer.state.inLink = !0)
						: this.lexer.state.inLink &&
						  /^<\/a>/i.test(t[0]) &&
						  (this.lexer.state.inLink = !1),
					!this.lexer.state.inRawBlock &&
					/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
						? (this.lexer.state.inRawBlock = !0)
						: this.lexer.state.inRawBlock &&
						  /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
						  (this.lexer.state.inRawBlock = !1),
					{
						type: 'html',
						raw: t[0],
						inLink: this.lexer.state.inLink,
						inRawBlock: this.lexer.state.inRawBlock,
						block: !1,
						text: t[0],
					}
				);
		}
		link(e) {
			const t = this.rules.inline.link.exec(e);
			if (t) {
				const e = t[2].trim();
				if (!this.options.pedantic && /^</.test(e)) {
					if (!/>$/.test(e)) return;
					const t = f(e.slice(0, -1), '\\');
					if ((e.length - t.length) % 2 == 0) return;
				} else {
					const e = (function (e, t) {
						if (-1 === e.indexOf(t[1])) return -1;
						let n = 0;
						for (let s = 0; s < e.length; s++)
							if ('\\' === e[s]) s++;
							else if (e[s] === t[0]) n++;
							else if (e[s] === t[1] && (n--, n < 0)) return s;
						return -1;
					})(t[2], '()');
					if (e > -1) {
						const n =
							(0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + e;
						(t[2] = t[2].substring(0, e)),
							(t[0] = t[0].substring(0, n).trim()),
							(t[3] = '');
					}
				}
				let n = t[2],
					s = '';
				if (this.options.pedantic) {
					const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
					e && ((n = e[1]), (s = e[3]));
				} else s = t[3] ? t[3].slice(1, -1) : '';
				return (
					(n = n.trim()),
					/^</.test(n) &&
						(n =
							this.options.pedantic && !/>$/.test(e)
								? n.slice(1)
								: n.slice(1, -1)),
					x(
						t,
						{
							href: n
								? n.replace(this.rules.inline._escapes, '$1')
								: n,
							title: s
								? s.replace(this.rules.inline._escapes, '$1')
								: s,
						},
						t[0],
						this.lexer,
					)
				);
			}
		}
		reflink(e, t) {
			let n;
			if (
				(n = this.rules.inline.reflink.exec(e)) ||
				(n = this.rules.inline.nolink.exec(e))
			) {
				let e = (n[2] || n[1]).replace(/\s+/g, ' ');
				if (((e = t[e.toLowerCase()]), !e)) {
					const e = n[0].charAt(0);
					return { type: 'text', raw: e, text: e };
				}
				return x(n, e, n[0], this.lexer);
			}
		}
		emStrong(e, t, n = '') {
			let s = this.rules.inline.emStrong.lDelim.exec(e);
			if (!s) return;
			if (s[3] && n.match(/[\p{L}\p{N}]/u)) return;
			if (
				!(s[1] || s[2] || '') ||
				!n ||
				this.rules.inline.punctuation.exec(n)
			) {
				const n = [...s[0]].length - 1;
				let r,
					i,
					l = n,
					a = 0;
				const o =
					'*' === s[0][0]
						? this.rules.inline.emStrong.rDelimAst
						: this.rules.inline.emStrong.rDelimUnd;
				for (
					o.lastIndex = 0, t = t.slice(-1 * e.length + n);
					null != (s = o.exec(t));

				) {
					if (
						((r = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !r)
					)
						continue;
					if (((i = [...r].length), s[3] || s[4])) {
						l += i;
						continue;
					}
					if ((s[5] || s[6]) && n % 3 && !((n + i) % 3)) {
						a += i;
						continue;
					}
					if (((l -= i), l > 0)) continue;
					i = Math.min(i, i + l + a);
					const t = [...s[0]][0].length,
						o = e.slice(0, n + s.index + t + i);
					if (Math.min(n, i) % 2) {
						const e = o.slice(1, -1);
						return {
							type: 'em',
							raw: o,
							text: e,
							tokens: this.lexer.inlineTokens(e),
						};
					}
					const c = o.slice(2, -2);
					return {
						type: 'strong',
						raw: o,
						text: c,
						tokens: this.lexer.inlineTokens(c),
					};
				}
			}
		}
		codespan(e) {
			const t = this.rules.inline.code.exec(e);
			if (t) {
				let e = t[2].replace(/\n/g, ' ');
				const n = /[^ ]/.test(e),
					s = /^ /.test(e) && / $/.test(e);
				return (
					n && s && (e = e.substring(1, e.length - 1)),
					(e = c(e, !0)),
					{ type: 'codespan', raw: t[0], text: e }
				);
			}
		}
		br(e) {
			const t = this.rules.inline.br.exec(e);
			if (t) return { type: 'br', raw: t[0] };
		}
		del(e) {
			const t = this.rules.inline.del.exec(e);
			if (t)
				return {
					type: 'del',
					raw: t[0],
					text: t[2],
					tokens: this.lexer.inlineTokens(t[2]),
				};
		}
		autolink(e) {
			const t = this.rules.inline.autolink.exec(e);
			if (t) {
				let e, n;
				return (
					'@' === t[2]
						? ((e = c(t[1])), (n = 'mailto:' + e))
						: ((e = c(t[1])), (n = e)),
					{
						type: 'link',
						raw: t[0],
						text: e,
						href: n,
						tokens: [{ type: 'text', raw: e, text: e }],
					}
				);
			}
		}
		url(e) {
			let t;
			if ((t = this.rules.inline.url.exec(e))) {
				let e, n;
				if ('@' === t[2]) (e = c(t[0])), (n = 'mailto:' + e);
				else {
					let s;
					do {
						(s = t[0]),
							(t[0] = this.rules.inline._backpedal.exec(t[0])[0]);
					} while (s !== t[0]);
					(e = c(t[0])),
						(n = 'www.' === t[1] ? 'http://' + t[0] : t[0]);
				}
				return {
					type: 'link',
					raw: t[0],
					text: e,
					href: n,
					tokens: [{ type: 'text', raw: e, text: e }],
				};
			}
		}
		inlineText(e) {
			const t = this.rules.inline.text.exec(e);
			if (t) {
				let e;
				return (
					(e = this.lexer.state.inRawBlock ? t[0] : c(t[0])),
					{ type: 'text', raw: t[0], text: e }
				);
			}
		}
	}
	const b = {
		newline: /^(?: *(?:\n|$))+/,
		code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
		fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
		hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
		heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
		blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
		list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
		html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
		def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
		table: d,
		lheading:
			/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
		_paragraph:
			/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
		text: /^[^\n]+/,
		_label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
		_title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
	};
	(b.def = u(b.def)
		.replace('label', b._label)
		.replace('title', b._title)
		.getRegex()),
		(b.bullet = /(?:[*+-]|\d{1,9}[.)])/),
		(b.listItemStart = u(/^( *)(bull) */)
			.replace('bull', b.bullet)
			.getRegex()),
		(b.list = u(b.list)
			.replace(/bull/g, b.bullet)
			.replace(
				'hr',
				'\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
			)
			.replace('def', '\\n+(?=' + b.def.source + ')')
			.getRegex()),
		(b._tag =
			'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
		(b._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
		(b.html = u(b.html, 'i')
			.replace('comment', b._comment)
			.replace('tag', b._tag)
			.replace(
				'attribute',
				/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
			)
			.getRegex()),
		(b.lheading = u(b.lheading).replace(/bull/g, b.bullet).getRegex()),
		(b.paragraph = u(b._paragraph)
			.replace('hr', b.hr)
			.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
			.replace('|lheading', '')
			.replace('|table', '')
			.replace('blockquote', ' {0,3}>')
			.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
			.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
			.replace(
				'html',
				'</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
			)
			.replace('tag', b._tag)
			.getRegex()),
		(b.blockquote = u(b.blockquote)
			.replace('paragraph', b.paragraph)
			.getRegex()),
		(b.normal = { ...b }),
		(b.gfm = {
			...b.normal,
			table: '^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
		}),
		(b.gfm.table = u(b.gfm.table)
			.replace('hr', b.hr)
			.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
			.replace('blockquote', ' {0,3}>')
			.replace('code', ' {4}[^\\n]')
			.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
			.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
			.replace(
				'html',
				'</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
			)
			.replace('tag', b._tag)
			.getRegex()),
		(b.gfm.paragraph = u(b._paragraph)
			.replace('hr', b.hr)
			.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
			.replace('|lheading', '')
			.replace('table', b.gfm.table)
			.replace('blockquote', ' {0,3}>')
			.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
			.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
			.replace(
				'html',
				'</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
			)
			.replace('tag', b._tag)
			.getRegex()),
		(b.pedantic = {
			...b.normal,
			html: u(
				'^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
			)
				.replace('comment', b._comment)
				.replace(
					/tag/g,
					'(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
				)
				.getRegex(),
			def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
			heading: /^(#{1,6})(.*)(?:\n+|$)/,
			fences: d,
			lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
			paragraph: u(b.normal._paragraph)
				.replace('hr', b.hr)
				.replace('heading', ' *#{1,6} *[^\n]')
				.replace('lheading', b.lheading)
				.replace('blockquote', ' {0,3}>')
				.replace('|fences', '')
				.replace('|list', '')
				.replace('|html', '')
				.getRegex(),
		});
	const w = {
		escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
		autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
		url: d,
		tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
		link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
		reflink: /^!?\[(label)\]\[(ref)\]/,
		nolink: /^!?\[(ref)\](?:\[\])?/,
		reflinkSearch: 'reflink|nolink(?!\\()',
		emStrong: {
			lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
			rDelimAst:
				/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
			rDelimUnd:
				/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/,
		},
		code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
		br: /^( {2,}|\\)\n(?!\s*$)/,
		del: d,
		text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
		punctuation: /^((?![*_])[\spunctuation])/,
		_punctuation: '\\p{P}$+<=>`^|~',
	};
	(w.punctuation = u(w.punctuation, 'u')
		.replace(/punctuation/g, w._punctuation)
		.getRegex()),
		(w.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g),
		(w.anyPunctuation = /\\[punct]/g),
		(w._escapes = /\\([punct])/g),
		(w._comment = u(b._comment)
			.replace('(?:--\x3e|$)', '--\x3e')
			.getRegex()),
		(w.emStrong.lDelim = u(w.emStrong.lDelim, 'u')
			.replace(/punct/g, w._punctuation)
			.getRegex()),
		(w.emStrong.rDelimAst = u(w.emStrong.rDelimAst, 'gu')
			.replace(/punct/g, w._punctuation)
			.getRegex()),
		(w.emStrong.rDelimUnd = u(w.emStrong.rDelimUnd, 'gu')
			.replace(/punct/g, w._punctuation)
			.getRegex()),
		(w.anyPunctuation = u(w.anyPunctuation, 'gu')
			.replace(/punct/g, w._punctuation)
			.getRegex()),
		(w._escapes = u(w._escapes, 'gu')
			.replace(/punct/g, w._punctuation)
			.getRegex()),
		(w._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
		(w._email =
			/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
		(w.autolink = u(w.autolink)
			.replace('scheme', w._scheme)
			.replace('email', w._email)
			.getRegex()),
		(w._attribute =
			/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
		(w.tag = u(w.tag)
			.replace('comment', w._comment)
			.replace('attribute', w._attribute)
			.getRegex()),
		(w._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
		(w._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
		(w._title =
			/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
		(w.link = u(w.link)
			.replace('label', w._label)
			.replace('href', w._href)
			.replace('title', w._title)
			.getRegex()),
		(w.reflink = u(w.reflink)
			.replace('label', w._label)
			.replace('ref', b._label)
			.getRegex()),
		(w.nolink = u(w.nolink).replace('ref', b._label).getRegex()),
		(w.reflinkSearch = u(w.reflinkSearch, 'g')
			.replace('reflink', w.reflink)
			.replace('nolink', w.nolink)
			.getRegex()),
		(w.normal = { ...w }),
		(w.pedantic = {
			...w.normal,
			strong: {
				start: /^__|\*\*/,
				middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
				endAst: /\*\*(?!\*)/g,
				endUnd: /__(?!_)/g,
			},
			em: {
				start: /^_|\*/,
				middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
				endAst: /\*(?!\*)/g,
				endUnd: /_(?!_)/g,
			},
			link: u(/^!?\[(label)\]\((.*?)\)/)
				.replace('label', w._label)
				.getRegex(),
			reflink: u(/^!?\[(label)\]\s*\[([^\]]*)\]/)
				.replace('label', w._label)
				.getRegex(),
		}),
		(w.gfm = {
			...w.normal,
			escape: u(w.escape).replace('])', '~|])').getRegex(),
			_extended_email:
				/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
			url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
			_backpedal:
				/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
			del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
			text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
		}),
		(w.gfm.url = u(w.gfm.url, 'i')
			.replace('email', w.gfm._extended_email)
			.getRegex()),
		(w.breaks = {
			...w.gfm,
			br: u(w.br).replace('{2,}', '*').getRegex(),
			text: u(w.gfm.text)
				.replace('\\b_', '\\b_| {2,}\\n')
				.replace(/\{2,\}/g, '*')
				.getRegex(),
		});
	class y {
		tokens;
		options;
		state;
		tokenizer;
		inlineQueue;
		constructor(e) {
			(this.tokens = []),
				(this.tokens.links = Object.create(null)),
				(this.options = e || t),
				(this.options.tokenizer = this.options.tokenizer || new m()),
				(this.tokenizer = this.options.tokenizer),
				(this.tokenizer.options = this.options),
				(this.tokenizer.lexer = this),
				(this.inlineQueue = []),
				(this.state = { inLink: !1, inRawBlock: !1, top: !0 });
			const n = { block: b.normal, inline: w.normal };
			this.options.pedantic
				? ((n.block = b.pedantic), (n.inline = w.pedantic))
				: this.options.gfm &&
				  ((n.block = b.gfm),
				  this.options.breaks
						? (n.inline = w.breaks)
						: (n.inline = w.gfm)),
				(this.tokenizer.rules = n);
		}
		static get rules() {
			return { block: b, inline: w };
		}
		static lex(e, t) {
			return new y(t).lex(e);
		}
		static lexInline(e, t) {
			return new y(t).inlineTokens(e);
		}
		lex(e) {
			let t;
			for (
				e = e.replace(/\r\n|\r/g, '\n'),
					this.blockTokens(e, this.tokens);
				(t = this.inlineQueue.shift());

			)
				this.inlineTokens(t.src, t.tokens);
			return this.tokens;
		}
		blockTokens(e, t = []) {
			let n, s, r, i;
			for (
				e = this.options.pedantic
					? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
					: e.replace(
							/^( *)(\t+)/gm,
							(e, t, n) => t + '    '.repeat(n.length),
					  );
				e;

			)
				if (
					!(
						this.options.extensions &&
						this.options.extensions.block &&
						this.options.extensions.block.some(
							(s) =>
								!!(n = s.call({ lexer: this }, e, t)) &&
								((e = e.substring(n.raw.length)),
								t.push(n),
								!0),
						)
					)
				)
					if ((n = this.tokenizer.space(e)))
						(e = e.substring(n.raw.length)),
							1 === n.raw.length && t.length > 0
								? (t[t.length - 1].raw += '\n')
								: t.push(n);
					else if ((n = this.tokenizer.code(e)))
						(e = e.substring(n.raw.length)),
							(s = t[t.length - 1]),
							!s || ('paragraph' !== s.type && 'text' !== s.type)
								? t.push(n)
								: ((s.raw += '\n' + n.raw),
								  (s.text += '\n' + n.text),
								  (this.inlineQueue[
										this.inlineQueue.length - 1
								  ].src = s.text));
					else if ((n = this.tokenizer.fences(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.heading(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.hr(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.blockquote(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.list(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.html(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.def(e)))
						(e = e.substring(n.raw.length)),
							(s = t[t.length - 1]),
							!s || ('paragraph' !== s.type && 'text' !== s.type)
								? this.tokens.links[n.tag] ||
								  (this.tokens.links[n.tag] = {
										href: n.href,
										title: n.title,
								  })
								: ((s.raw += '\n' + n.raw),
								  (s.text += '\n' + n.raw),
								  (this.inlineQueue[
										this.inlineQueue.length - 1
								  ].src = s.text));
					else if ((n = this.tokenizer.table(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.lheading(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else {
						if (
							((r = e),
							this.options.extensions &&
								this.options.extensions.startBlock)
						) {
							let t = 1 / 0;
							const n = e.slice(1);
							let s;
							this.options.extensions.startBlock.forEach((e) => {
								(s = e.call({ lexer: this }, n)),
									'number' == typeof s &&
										s >= 0 &&
										(t = Math.min(t, s));
							}),
								t < 1 / 0 &&
									t >= 0 &&
									(r = e.substring(0, t + 1));
						}
						if (this.state.top && (n = this.tokenizer.paragraph(r)))
							(s = t[t.length - 1]),
								i && 'paragraph' === s.type
									? ((s.raw += '\n' + n.raw),
									  (s.text += '\n' + n.text),
									  this.inlineQueue.pop(),
									  (this.inlineQueue[
											this.inlineQueue.length - 1
									  ].src = s.text))
									: t.push(n),
								(i = r.length !== e.length),
								(e = e.substring(n.raw.length));
						else if ((n = this.tokenizer.text(e)))
							(e = e.substring(n.raw.length)),
								(s = t[t.length - 1]),
								s && 'text' === s.type
									? ((s.raw += '\n' + n.raw),
									  (s.text += '\n' + n.text),
									  this.inlineQueue.pop(),
									  (this.inlineQueue[
											this.inlineQueue.length - 1
									  ].src = s.text))
									: t.push(n);
						else if (e) {
							const t =
								'Infinite loop on byte: ' + e.charCodeAt(0);
							if (this.options.silent) {
								console.error(t);
								break;
							}
							throw new Error(t);
						}
					}
			return (this.state.top = !0), t;
		}
		inline(e, t = []) {
			return this.inlineQueue.push({ src: e, tokens: t }), t;
		}
		inlineTokens(e, t = []) {
			let n,
				s,
				r,
				i,
				l,
				a,
				o = e;
			if (this.tokens.links) {
				const e = Object.keys(this.tokens.links);
				if (e.length > 0)
					for (
						;
						null !=
						(i = this.tokenizer.rules.inline.reflinkSearch.exec(o));

					)
						e.includes(i[0].slice(i[0].lastIndexOf('[') + 1, -1)) &&
							(o =
								o.slice(0, i.index) +
								'[' +
								'a'.repeat(i[0].length - 2) +
								']' +
								o.slice(
									this.tokenizer.rules.inline.reflinkSearch
										.lastIndex,
								));
			}
			for (
				;
				null != (i = this.tokenizer.rules.inline.blockSkip.exec(o));

			)
				o =
					o.slice(0, i.index) +
					'[' +
					'a'.repeat(i[0].length - 2) +
					']' +
					o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
			for (
				;
				null !=
				(i = this.tokenizer.rules.inline.anyPunctuation.exec(o));

			)
				o =
					o.slice(0, i.index) +
					'++' +
					o.slice(
						this.tokenizer.rules.inline.anyPunctuation.lastIndex,
					);
			for (; e; )
				if (
					(l || (a = ''),
					(l = !1),
					!(
						this.options.extensions &&
						this.options.extensions.inline &&
						this.options.extensions.inline.some(
							(s) =>
								!!(n = s.call({ lexer: this }, e, t)) &&
								((e = e.substring(n.raw.length)),
								t.push(n),
								!0),
						)
					))
				)
					if ((n = this.tokenizer.escape(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.tag(e)))
						(e = e.substring(n.raw.length)),
							(s = t[t.length - 1]),
							s && 'text' === n.type && 'text' === s.type
								? ((s.raw += n.raw), (s.text += n.text))
								: t.push(n);
					else if ((n = this.tokenizer.link(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
						(e = e.substring(n.raw.length)),
							(s = t[t.length - 1]),
							s && 'text' === n.type && 'text' === s.type
								? ((s.raw += n.raw), (s.text += n.text))
								: t.push(n);
					else if ((n = this.tokenizer.emStrong(e, o, a)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.codespan(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.br(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.del(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if ((n = this.tokenizer.autolink(e)))
						(e = e.substring(n.raw.length)), t.push(n);
					else if (
						this.state.inLink ||
						!(n = this.tokenizer.url(e))
					) {
						if (
							((r = e),
							this.options.extensions &&
								this.options.extensions.startInline)
						) {
							let t = 1 / 0;
							const n = e.slice(1);
							let s;
							this.options.extensions.startInline.forEach((e) => {
								(s = e.call({ lexer: this }, n)),
									'number' == typeof s &&
										s >= 0 &&
										(t = Math.min(t, s));
							}),
								t < 1 / 0 &&
									t >= 0 &&
									(r = e.substring(0, t + 1));
						}
						if ((n = this.tokenizer.inlineText(r)))
							(e = e.substring(n.raw.length)),
								'_' !== n.raw.slice(-1) &&
									(a = n.raw.slice(-1)),
								(l = !0),
								(s = t[t.length - 1]),
								s && 'text' === s.type
									? ((s.raw += n.raw), (s.text += n.text))
									: t.push(n);
						else if (e) {
							const t =
								'Infinite loop on byte: ' + e.charCodeAt(0);
							if (this.options.silent) {
								console.error(t);
								break;
							}
							throw new Error(t);
						}
					} else (e = e.substring(n.raw.length)), t.push(n);
			return t;
		}
	}
	class _ {
		options;
		constructor(e) {
			this.options = e || t;
		}
		code(e, t, n) {
			const s = (t || '').match(/^\S*/)?.[0];
			return (
				(e = e.replace(/\n$/, '') + '\n'),
				s
					? '<pre><code class="language-' +
					  c(s) +
					  '">' +
					  (n ? e : c(e, !0)) +
					  '</code></pre>\n'
					: '<pre><code>' + (n ? e : c(e, !0)) + '</code></pre>\n'
			);
		}
		blockquote(e) {
			return `<blockquote>\n${e}</blockquote>\n`;
		}
		html(e, t) {
			return e;
		}
		heading(e, t, n) {
			return `<h${t}>${e}</h${t}>\n`;
		}
		hr() {
			return '<hr>\n';
		}
		list(e, t, n) {
			const s = t ? 'ol' : 'ul';
			return (
				'<' +
				s +
				(t && 1 !== n ? ' start="' + n + '"' : '') +
				'>\n' +
				e +
				'</' +
				s +
				'>\n'
			);
		}
		listitem(e, t, n) {
			return `<li>${e}</li>\n`;
		}
		checkbox(e) {
			return (
				'<input ' +
				(e ? 'checked="" ' : '') +
				'disabled="" type="checkbox">'
			);
		}
		paragraph(e) {
			return `<p>${e}</p>\n`;
		}
		table(e, t) {
			return (
				t && (t = `<tbody>${t}</tbody>`),
				'<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
			);
		}
		tablerow(e) {
			return `<tr>\n${e}</tr>\n`;
		}
		tablecell(e, t) {
			const n = t.header ? 'th' : 'td';
			return (
				(t.align ? `<${n} align="${t.align}">` : `<${n}>`) +
				e +
				`</${n}>\n`
			);
		}
		strong(e) {
			return `<strong>${e}</strong>`;
		}
		em(e) {
			return `<em>${e}</em>`;
		}
		codespan(e) {
			return `<code>${e}</code>`;
		}
		br() {
			return '<br>';
		}
		del(e) {
			return `<del>${e}</del>`;
		}
		link(e, t, n) {
			const s = g(e);
			if (null === s) return n;
			let r = '<a href="' + (e = s) + '"';
			return t && (r += ' title="' + t + '"'), (r += '>' + n + '</a>'), r;
		}
		image(e, t, n) {
			const s = g(e);
			if (null === s) return n;
			let r = `<img src="${(e = s)}" alt="${n}"`;
			return t && (r += ` title="${t}"`), (r += '>'), r;
		}
		text(e) {
			return e;
		}
	}
	class $ {
		strong(e) {
			return e;
		}
		em(e) {
			return e;
		}
		codespan(e) {
			return e;
		}
		del(e) {
			return e;
		}
		html(e) {
			return e;
		}
		text(e) {
			return e;
		}
		link(e, t, n) {
			return '' + n;
		}
		image(e, t, n) {
			return '' + n;
		}
		br() {
			return '';
		}
	}
	class S {
		options;
		renderer;
		textRenderer;
		constructor(e) {
			(this.options = e || t),
				(this.options.renderer = this.options.renderer || new _()),
				(this.renderer = this.options.renderer),
				(this.renderer.options = this.options),
				(this.textRenderer = new $());
		}
		static parse(e, t) {
			return new S(t).parse(e);
		}
		static parseInline(e, t) {
			return new S(t).parseInline(e);
		}
		parse(e, t = !0) {
			let n = '';
			for (let s = 0; s < e.length; s++) {
				const r = e[s];
				if (
					this.options.extensions &&
					this.options.extensions.renderers &&
					this.options.extensions.renderers[r.type]
				) {
					const e = r,
						t = this.options.extensions.renderers[e.type].call(
							{ parser: this },
							e,
						);
					if (
						!1 !== t ||
						![
							'space',
							'hr',
							'heading',
							'code',
							'table',
							'blockquote',
							'list',
							'html',
							'paragraph',
							'text',
						].includes(e.type)
					) {
						n += t || '';
						continue;
					}
				}
				switch (r.type) {
					case 'space':
						continue;
					case 'hr':
						n += this.renderer.hr();
						continue;
					case 'heading': {
						const e = r;
						n += this.renderer.heading(
							this.parseInline(e.tokens),
							e.depth,
							this.parseInline(
								e.tokens,
								this.textRenderer,
							).replace(h, (e, t) =>
								'colon' === (t = t.toLowerCase())
									? ':'
									: '#' === t.charAt(0)
									  ? 'x' === t.charAt(1)
											? String.fromCharCode(
													parseInt(
														t.substring(2),
														16,
													),
											  )
											: String.fromCharCode(
													+t.substring(1),
											  )
									  : '',
							),
						);
						continue;
					}
					case 'code': {
						const e = r;
						n += this.renderer.code(e.text, e.lang, !!e.escaped);
						continue;
					}
					case 'table': {
						const e = r;
						let t = '',
							s = '';
						for (let t = 0; t < e.header.length; t++)
							s += this.renderer.tablecell(
								this.parseInline(e.header[t].tokens),
								{ header: !0, align: e.align[t] },
							);
						t += this.renderer.tablerow(s);
						let i = '';
						for (let t = 0; t < e.rows.length; t++) {
							const n = e.rows[t];
							s = '';
							for (let t = 0; t < n.length; t++)
								s += this.renderer.tablecell(
									this.parseInline(n[t].tokens),
									{ header: !1, align: e.align[t] },
								);
							i += this.renderer.tablerow(s);
						}
						n += this.renderer.table(t, i);
						continue;
					}
					case 'blockquote': {
						const e = r,
							t = this.parse(e.tokens);
						n += this.renderer.blockquote(t);
						continue;
					}
					case 'list': {
						const e = r,
							t = e.ordered,
							s = e.start,
							i = e.loose;
						let l = '';
						for (let t = 0; t < e.items.length; t++) {
							const n = e.items[t],
								s = n.checked,
								r = n.task;
							let a = '';
							if (n.task) {
								const e = this.renderer.checkbox(!!s);
								i
									? n.tokens.length > 0 &&
									  'paragraph' === n.tokens[0].type
										? ((n.tokens[0].text =
												e + ' ' + n.tokens[0].text),
										  n.tokens[0].tokens &&
												n.tokens[0].tokens.length > 0 &&
												'text' ===
													n.tokens[0].tokens[0]
														.type &&
												(n.tokens[0].tokens[0].text =
													e +
													' ' +
													n.tokens[0].tokens[0].text))
										: n.tokens.unshift({
												type: 'text',
												text: e + ' ',
										  })
									: (a += e + ' ');
							}
							(a += this.parse(n.tokens, i)),
								(l += this.renderer.listitem(a, r, !!s));
						}
						n += this.renderer.list(l, t, s);
						continue;
					}
					case 'html': {
						const e = r;
						n += this.renderer.html(e.text, e.block);
						continue;
					}
					case 'paragraph': {
						const e = r;
						n += this.renderer.paragraph(
							this.parseInline(e.tokens),
						);
						continue;
					}
					case 'text': {
						let i = r,
							l = i.tokens ? this.parseInline(i.tokens) : i.text;
						for (; s + 1 < e.length && 'text' === e[s + 1].type; )
							(i = e[++s]),
								(l +=
									'\n' +
									(i.tokens
										? this.parseInline(i.tokens)
										: i.text));
						n += t ? this.renderer.paragraph(l) : l;
						continue;
					}
					default: {
						const e =
							'Token with "' + r.type + '" type was not found.';
						if (this.options.silent) return console.error(e), '';
						throw new Error(e);
					}
				}
			}
			return n;
		}
		parseInline(e, t) {
			t = t || this.renderer;
			let n = '';
			for (let s = 0; s < e.length; s++) {
				const r = e[s];
				if (
					this.options.extensions &&
					this.options.extensions.renderers &&
					this.options.extensions.renderers[r.type]
				) {
					const e = this.options.extensions.renderers[r.type].call(
						{ parser: this },
						r,
					);
					if (
						!1 !== e ||
						![
							'escape',
							'html',
							'link',
							'image',
							'strong',
							'em',
							'codespan',
							'br',
							'del',
							'text',
						].includes(r.type)
					) {
						n += e || '';
						continue;
					}
				}
				switch (r.type) {
					case 'escape': {
						const e = r;
						n += t.text(e.text);
						break;
					}
					case 'html': {
						const e = r;
						n += t.html(e.text);
						break;
					}
					case 'link': {
						const e = r;
						n += t.link(
							e.href,
							e.title,
							this.parseInline(e.tokens, t),
						);
						break;
					}
					case 'image': {
						const e = r;
						n += t.image(e.href, e.title, e.text);
						break;
					}
					case 'strong': {
						const e = r;
						n += t.strong(this.parseInline(e.tokens, t));
						break;
					}
					case 'em': {
						const e = r;
						n += t.em(this.parseInline(e.tokens, t));
						break;
					}
					case 'codespan': {
						const e = r;
						n += t.codespan(e.text);
						break;
					}
					case 'br':
						n += t.br();
						break;
					case 'del': {
						const e = r;
						n += t.del(this.parseInline(e.tokens, t));
						break;
					}
					case 'text': {
						const e = r;
						n += t.text(e.text);
						break;
					}
					default: {
						const e =
							'Token with "' + r.type + '" type was not found.';
						if (this.options.silent) return console.error(e), '';
						throw new Error(e);
					}
				}
			}
			return n;
		}
	}
	class z {
		options;
		constructor(e) {
			this.options = e || t;
		}
		static passThroughHooks = new Set(['preprocess', 'postprocess']);
		preprocess(e) {
			return e;
		}
		postprocess(e) {
			return e;
		}
	}
	const T = new (class {
		defaults = {
			async: !1,
			breaks: !1,
			extensions: null,
			gfm: !0,
			hooks: null,
			pedantic: !1,
			renderer: null,
			silent: !1,
			tokenizer: null,
			walkTokens: null,
		};
		options = this.setOptions;
		parse = this.#e(y.lex, S.parse);
		parseInline = this.#e(y.lexInline, S.parseInline);
		Parser = S;
		parser = S.parse;
		Renderer = _;
		TextRenderer = $;
		Lexer = y;
		lexer = y.lex;
		Tokenizer = m;
		Hooks = z;
		constructor(...e) {
			this.use(...e);
		}
		walkTokens(e, t) {
			let n = [];
			for (const s of e)
				switch (((n = n.concat(t.call(this, s))), s.type)) {
					case 'table': {
						const e = s;
						for (const s of e.header)
							n = n.concat(this.walkTokens(s.tokens, t));
						for (const s of e.rows)
							for (const e of s)
								n = n.concat(this.walkTokens(e.tokens, t));
						break;
					}
					case 'list': {
						const e = s;
						n = n.concat(this.walkTokens(e.items, t));
						break;
					}
					default: {
						const e = s;
						this.defaults.extensions?.childTokens?.[e.type]
							? this.defaults.extensions.childTokens[
									e.type
							  ].forEach((s) => {
									n = n.concat(this.walkTokens(e[s], t));
							  })
							: e.tokens &&
							  (n = n.concat(this.walkTokens(e.tokens, t)));
					}
				}
			return n;
		}
		use(...e) {
			const t = this.defaults.extensions || {
				renderers: {},
				childTokens: {},
			};
			return (
				e.forEach((e) => {
					const n = { ...e };
					if (
						((n.async = this.defaults.async || n.async || !1),
						e.extensions &&
							(e.extensions.forEach((e) => {
								if (!e.name)
									throw new Error('extension name required');
								if ('renderer' in e) {
									const n = t.renderers[e.name];
									t.renderers[e.name] = n
										? function (...t) {
												let s = e.renderer.apply(
													this,
													t,
												);
												return (
													!1 === s &&
														(s = n.apply(this, t)),
													s
												);
										  }
										: e.renderer;
								}
								if ('tokenizer' in e) {
									if (
										!e.level ||
										('block' !== e.level &&
											'inline' !== e.level)
									)
										throw new Error(
											"extension level must be 'block' or 'inline'",
										);
									const n = t[e.level];
									n
										? n.unshift(e.tokenizer)
										: (t[e.level] = [e.tokenizer]),
										e.start &&
											('block' === e.level
												? t.startBlock
													? t.startBlock.push(e.start)
													: (t.startBlock = [e.start])
												: 'inline' === e.level &&
												  (t.startInline
														? t.startInline.push(
																e.start,
														  )
														: (t.startInline = [
																e.start,
														  ])));
								}
								'childTokens' in e &&
									e.childTokens &&
									(t.childTokens[e.name] = e.childTokens);
							}),
							(n.extensions = t)),
						e.renderer)
					) {
						const t =
							this.defaults.renderer || new _(this.defaults);
						for (const n in e.renderer) {
							const s = e.renderer[n],
								r = n,
								i = t[r];
							t[r] = (...e) => {
								let n = s.apply(t, e);
								return !1 === n && (n = i.apply(t, e)), n || '';
							};
						}
						n.renderer = t;
					}
					if (e.tokenizer) {
						const t =
							this.defaults.tokenizer || new m(this.defaults);
						for (const n in e.tokenizer) {
							const s = e.tokenizer[n],
								r = n,
								i = t[r];
							t[r] = (...e) => {
								let n = s.apply(t, e);
								return !1 === n && (n = i.apply(t, e)), n;
							};
						}
						n.tokenizer = t;
					}
					if (e.hooks) {
						const t = this.defaults.hooks || new z();
						for (const n in e.hooks) {
							const s = e.hooks[n],
								r = n,
								i = t[r];
							z.passThroughHooks.has(n)
								? (t[r] = (e) => {
										if (this.defaults.async)
											return Promise.resolve(
												s.call(t, e),
											).then((e) => i.call(t, e));
										const n = s.call(t, e);
										return i.call(t, n);
								  })
								: (t[r] = (...e) => {
										let n = s.apply(t, e);
										return (
											!1 === n && (n = i.apply(t, e)), n
										);
								  });
						}
						n.hooks = t;
					}
					if (e.walkTokens) {
						const t = this.defaults.walkTokens,
							s = e.walkTokens;
						n.walkTokens = function (e) {
							let n = [];
							return (
								n.push(s.call(this, e)),
								t && (n = n.concat(t.call(this, e))),
								n
							);
						};
					}
					this.defaults = { ...this.defaults, ...n };
				}),
				this
			);
		}
		setOptions(e) {
			return (this.defaults = { ...this.defaults, ...e }), this;
		}
		#e(e, t) {
			return (n, s) => {
				const r = { ...s },
					i = { ...this.defaults, ...r };
				!0 === this.defaults.async &&
					!1 === r.async &&
					(i.silent ||
						console.warn(
							'marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.',
						),
					(i.async = !0));
				const l = this.#t(!!i.silent, !!i.async);
				if (null == n)
					return l(
						new Error(
							'marked(): input parameter is undefined or null',
						),
					);
				if ('string' != typeof n)
					return l(
						new Error(
							'marked(): input parameter is of type ' +
								Object.prototype.toString.call(n) +
								', string expected',
						),
					);
				if ((i.hooks && (i.hooks.options = i), i.async))
					return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n)
						.then((t) => e(t, i))
						.then((e) =>
							i.walkTokens
								? Promise.all(
										this.walkTokens(e, i.walkTokens),
								  ).then(() => e)
								: e,
						)
						.then((e) => t(e, i))
						.then((e) => (i.hooks ? i.hooks.postprocess(e) : e))
						.catch(l);
				try {
					i.hooks && (n = i.hooks.preprocess(n));
					const s = e(n, i);
					i.walkTokens && this.walkTokens(s, i.walkTokens);
					let r = t(s, i);
					return i.hooks && (r = i.hooks.postprocess(r)), r;
				} catch (e) {
					return l(e);
				}
			};
		}
		#t(e, t) {
			return (n) => {
				if (
					((n.message +=
						'\nPlease report this to https://github.com/markedjs/marked.'),
					e)
				) {
					const e =
						'<p>An error occurred:</p><pre>' +
						c(n.message + '', !0) +
						'</pre>';
					return t ? Promise.resolve(e) : e;
				}
				if (t) return Promise.reject(n);
				throw n;
			};
		}
	})();
	function R(e, t) {
		return T.parse(e, t);
	}
	(R.options = R.setOptions =
		function (e) {
			return T.setOptions(e), (R.defaults = T.defaults), n(R.defaults), R;
		}),
		(R.getDefaults = e),
		(R.defaults = t),
		(R.use = function (...e) {
			return T.use(...e), (R.defaults = T.defaults), n(R.defaults), R;
		}),
		(R.walkTokens = function (e, t) {
			return T.walkTokens(e, t);
		}),
		(R.parseInline = T.parseInline),
		(R.Parser = S),
		(R.parser = S.parse),
		(R.Renderer = _),
		(R.TextRenderer = $),
		(R.Lexer = y),
		(R.lexer = y.lex),
		(R.Tokenizer = m),
		(R.Hooks = z),
		(R.parse = R),
		R.options,
		R.setOptions,
		R.use,
		R.walkTokens,
		R.parseInline;
	/*!
	 * The reveal.js markdown plugin. Handles parsing of
	 * markdown inside of presentations as well as loading
	 * of external markdown documents.
	 */
	const A = '__SCRIPT_END__',
		v = /\[\s*((\d*):)?\s*([\s\d,|-]*)\]/,
		E = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};
	return () => {
		let e;
		function t(e) {
			var t = (
					e.querySelector('[data-template]') ||
					e.querySelector('script') ||
					e
				).textContent,
				n = (t = t.replace(new RegExp(A, 'g'), '</script>')).match(
					/^\n?(\s*)/,
				)[1].length,
				s = t.match(/^\n?(\t*)/)[1].length;
			return (
				s > 0
					? (t = t.replace(
							new RegExp('\\n?\\t{' + s + '}(.*)', 'g'),
							function (e, t) {
								return '\n' + t;
							},
					  ))
					: n > 1 &&
					  (t = t.replace(
							new RegExp('\\n? {' + n + '}(.*)', 'g'),
							function (e, t) {
								return '\n' + t;
							},
					  )),
				t
			);
		}
		function n(e) {
			for (
				var t = e.attributes, n = [], s = 0, r = t.length;
				s < r;
				s++
			) {
				var i = t[s].name,
					l = t[s].value;
				/data\-(markdown|separator|vertical|notes)/gi.test(i) ||
					(l ? n.push(i + '="' + l + '"') : n.push(i));
			}
			return n.join(' ');
		}
		function s(e) {
			return (
				((e = e || {}).separator = e.separator || '\r?\n---\r?\n'),
				(e.notesSeparator = e.notesSeparator || 'notes?:'),
				(e.attributes = e.attributes || ''),
				e
			);
		}
		function r(e, t) {
			t = s(t);
			var n = e.split(new RegExp(t.notesSeparator, 'mgi'));
			return (
				2 === n.length &&
					(e =
						n[0] +
						'<aside class="notes">' +
						R(n[1].trim()) +
						'</aside>'),
				'<script type="text/template">' +
					(e = e.replace(/<\/script>/g, A)) +
					'</script>'
			);
		}
		function i(e, t) {
			t = s(t);
			for (
				var n,
					i,
					l,
					a = new RegExp(
						t.separator +
							(t.verticalSeparator
								? '|' + t.verticalSeparator
								: ''),
						'mg',
					),
					o = new RegExp(t.separator),
					c = 0,
					h = !0,
					p = [];
				(n = a.exec(e));

			)
				!(i = o.test(n[0])) && h && p.push([]),
					(l = e.substring(c, n.index)),
					i && h ? p.push(l) : p[p.length - 1].push(l),
					(c = a.lastIndex),
					(h = i);
			(h ? p : p[p.length - 1]).push(e.substring(c));
			for (var u = '', g = 0, d = p.length; g < d; g++)
				p[g] instanceof Array
					? ((u += '<section ' + t.attributes + '>'),
					  p[g].forEach(function (e) {
							u +=
								'<section data-markdown>' +
								r(e, t) +
								'</section>';
					  }),
					  (u += '</section>'))
					: (u +=
							'<section ' +
							t.attributes +
							' data-markdown>' +
							r(p[g], t) +
							'</section>');
			return u;
		}
		function l(e) {
			return new Promise(function (s) {
				var r = [];
				[].slice
					.call(
						e.querySelectorAll(
							'section[data-markdown]:not([data-markdown-parsed])',
						),
					)
					.forEach(function (e, s) {
						e.getAttribute('data-markdown').length
							? r.push(
									(function (e) {
										return new Promise(function (t, n) {
											var s = new XMLHttpRequest(),
												r =
													e.getAttribute(
														'data-markdown',
													),
												i =
													e.getAttribute(
														'data-charset',
													);
											null != i &&
												'' != i &&
												s.overrideMimeType(
													'text/html; charset=' + i,
												),
												(s.onreadystatechange =
													function (e, s) {
														4 === s.readyState &&
															((s.status >= 200 &&
																s.status <
																	300) ||
															0 === s.status
																? t(s, r)
																: n(s, r));
													}.bind(this, e, s)),
												s.open('GET', r, !0);
											try {
												s.send();
											} catch (e) {
												console.warn(
													'Failed to get the Markdown file ' +
														r +
														'. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' +
														e,
												),
													t(s, r);
											}
										});
									})(e).then(
										function (t, s) {
											e.outerHTML = i(t.responseText, {
												separator:
													e.getAttribute(
														'data-separator',
													),
												verticalSeparator:
													e.getAttribute(
														'data-separator-vertical',
													),
												notesSeparator: e.getAttribute(
													'data-separator-notes',
												),
												attributes: n(e),
											});
										},
										function (t, n) {
											e.outerHTML =
												'<section data-state="alert">ERROR: The attempt to fetch ' +
												n +
												' failed with HTTP status ' +
												t.status +
												".Check your browser's JavaScript console for more details.<p>Remember that you need to serve the presentation HTML from a HTTP server.</p></section>";
										},
									),
							  )
							: (e.outerHTML = i(t(e), {
									separator: e.getAttribute('data-separator'),
									verticalSeparator: e.getAttribute(
										'data-separator-vertical',
									),
									notesSeparator: e.getAttribute(
										'data-separator-notes',
									),
									attributes: n(e),
							  }));
					}),
					Promise.all(r).then(s);
			});
		}
		function a(e, t, n) {
			var s,
				r,
				i = new RegExp(n, 'mg'),
				l = new RegExp(
					'([^"= ]+?)="([^"]+?)"|(data-[^"= ]+?)(?=[" ])',
					'mg',
				),
				a = e.nodeValue;
			if ((s = i.exec(a))) {
				var o = s[1];
				for (
					a = a.substring(0, s.index) + a.substring(i.lastIndex),
						e.nodeValue = a;
					(r = l.exec(o));

				)
					r[2]
						? t.setAttribute(r[1], r[2])
						: t.setAttribute(r[3], '');
				return !0;
			}
			return !1;
		}
		function o(e, t, n, s, r) {
			if (null != t && null != t.childNodes && t.childNodes.length > 0)
				for (var i = t, l = 0; l < t.childNodes.length; l++) {
					var c = t.childNodes[l];
					if (l > 0)
						for (var h = l - 1; h >= 0; ) {
							var p = t.childNodes[h];
							if (
								'function' == typeof p.setAttribute &&
								'BR' != p.tagName
							) {
								i = p;
								break;
							}
							h -= 1;
						}
					var u = e;
					'section' == c.nodeName && ((u = c), (i = c)),
						('function' != typeof c.setAttribute &&
							c.nodeType != Node.COMMENT_NODE) ||
							o(u, c, i, s, r);
				}
			t.nodeType == Node.COMMENT_NODE && 0 == a(t, n, s) && a(t, e, r);
		}
		function c() {
			var n = e
				.getRevealElement()
				.querySelectorAll(
					'[data-markdown]:not([data-markdown-parsed])',
				);
			return (
				[].slice.call(n).forEach(function (e) {
					e.setAttribute('data-markdown-parsed', !0);
					var n = e.querySelector('aside.notes'),
						s = t(e);
					(e.innerHTML = R(s)),
						o(
							e,
							e,
							null,
							e.getAttribute('data-element-attributes') ||
								e.parentNode.getAttribute(
									'data-element-attributes',
								) ||
								'\\.element\\s*?(.+?)$',
							e.getAttribute('data-attributes') ||
								e.parentNode.getAttribute('data-attributes') ||
								'\\.slide:\\s*?(\\S.+?)$',
						),
						n && e.appendChild(n);
				}),
				Promise.resolve()
			);
		}
		return {
			id: 'markdown',
			init: function (t) {
				e = t;
				let {
					renderer: n,
					animateLists: s,
					...r
				} = e.getConfig().markdown || {};
				return (
					n ||
						((n = new R.Renderer()),
						(n.code = (e, t) => {
							let n = '',
								s = '';
							if (v.test(t)) {
								let e = t.match(v)[2];
								e && (n = `data-ln-start-from="${e.trim()}"`),
									(s = t.match(v)[3].trim()),
									(s = `data-line-numbers="${s}"`),
									(t = t.replace(v, '').trim());
							}
							return `<pre><code ${s} ${n} class="${t}">${(e =
								e.replace(
									/([&<>'"])/g,
									(e) => E[e],
								))}</code></pre>`;
						})),
					!0 === s &&
						(n.listitem = (e) => `<li class="fragment">${e}</li>`),
					R.setOptions({ renderer: n, ...r }),
					l(e.getRevealElement()).then(c)
				);
			},
			processSlides: l,
			convertSlides: c,
			slidify: i,
			marked: R,
		};
	};
});
