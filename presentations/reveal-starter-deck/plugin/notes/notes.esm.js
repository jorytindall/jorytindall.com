function t() {
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
let e = {
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
function n(t) {
	e = t;
}
const s = /[&<>"']/,
	i = new RegExp(s.source, 'g'),
	r = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	a = new RegExp(r.source, 'g'),
	o = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
	l = (t) => o[t];
function c(t, e) {
	if (e) {
		if (s.test(t)) return t.replace(i, l);
	} else if (r.test(t)) return t.replace(a, l);
	return t;
}
const p = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
const u = /(^|[^\[])\^/g;
function d(t, e) {
	(t = 'string' == typeof t ? t : t.source), (e = e || '');
	const n = {
		replace: (e, s) => (
			(s = (s =
				'object' == typeof s && 'source' in s ? s.source : s).replace(
				u,
				'$1',
			)),
			(t = t.replace(e, s)),
			n
		),
		getRegex: () => new RegExp(t, e),
	};
	return n;
}
function h(t) {
	try {
		t = encodeURI(t).replace(/%25/g, '%');
	} catch (t) {
		return null;
	}
	return t;
}
const g = { exec: () => null };
function m(t, e) {
	const n = t
		.replace(/\|/g, (t, e, n) => {
			let s = !1,
				i = e;
			for (; --i >= 0 && '\\' === n[i]; ) s = !s;
			return s ? '|' : ' |';
		})
		.split(/ \|/);
	let s = 0;
	if (
		(n[0].trim() || n.shift(),
		n.length > 0 && !n[n.length - 1].trim() && n.pop(),
		e)
	)
		if (n.length > e) n.splice(e);
		else for (; n.length < e; ) n.push('');
	for (; s < n.length; s++) n[s] = n[s].trim().replace(/\\\|/g, '|');
	return n;
}
function f(t, e, n) {
	const s = t.length;
	if (0 === s) return '';
	let i = 0;
	for (; i < s; ) {
		const r = t.charAt(s - i - 1);
		if (r !== e || n) {
			if (r === e || !n) break;
			i++;
		} else i++;
	}
	return t.slice(0, s - i);
}
function k(t, e, n, s) {
	const i = e.href,
		r = e.title ? c(e.title) : null,
		a = t[1].replace(/\\([\[\]])/g, '$1');
	if ('!' !== t[0].charAt(0)) {
		s.state.inLink = !0;
		const t = {
			type: 'link',
			raw: n,
			href: i,
			title: r,
			text: a,
			tokens: s.inlineTokens(a),
		};
		return (s.state.inLink = !1), t;
	}
	return { type: 'image', raw: n, href: i, title: r, text: c(a) };
}
class b {
	options;
	rules;
	lexer;
	constructor(t) {
		this.options = t || e;
	}
	space(t) {
		const e = this.rules.block.newline.exec(t);
		if (e && e[0].length > 0) return { type: 'space', raw: e[0] };
	}
	code(t) {
		const e = this.rules.block.code.exec(t);
		if (e) {
			const t = e[0].replace(/^ {1,4}/gm, '');
			return {
				type: 'code',
				raw: e[0],
				codeBlockStyle: 'indented',
				text: this.options.pedantic ? t : f(t, '\n'),
			};
		}
	}
	fences(t) {
		const e = this.rules.block.fences.exec(t);
		if (e) {
			const t = e[0],
				n = (function (t, e) {
					const n = t.match(/^(\s+)(?:```)/);
					if (null === n) return e;
					const s = n[1];
					return e
						.split('\n')
						.map((t) => {
							const e = t.match(/^\s+/);
							if (null === e) return t;
							const [n] = e;
							return n.length >= s.length ? t.slice(s.length) : t;
						})
						.join('\n');
				})(t, e[3] || '');
			return {
				type: 'code',
				raw: t,
				lang: e[2]
					? e[2].trim().replace(this.rules.inline._escapes, '$1')
					: e[2],
				text: n,
			};
		}
	}
	heading(t) {
		const e = this.rules.block.heading.exec(t);
		if (e) {
			let t = e[2].trim();
			if (/#$/.test(t)) {
				const e = f(t, '#');
				this.options.pedantic
					? (t = e.trim())
					: (e && !/ $/.test(e)) || (t = e.trim());
			}
			return {
				type: 'heading',
				raw: e[0],
				depth: e[1].length,
				text: t,
				tokens: this.lexer.inline(t),
			};
		}
	}
	hr(t) {
		const e = this.rules.block.hr.exec(t);
		if (e) return { type: 'hr', raw: e[0] };
	}
	blockquote(t) {
		const e = this.rules.block.blockquote.exec(t);
		if (e) {
			const t = f(e[0].replace(/^ *>[ \t]?/gm, ''), '\n'),
				n = this.lexer.state.top;
			this.lexer.state.top = !0;
			const s = this.lexer.blockTokens(t);
			return (
				(this.lexer.state.top = n),
				{ type: 'blockquote', raw: e[0], tokens: s, text: t }
			);
		}
	}
	list(t) {
		let e = this.rules.block.list.exec(t);
		if (e) {
			let n = e[1].trim();
			const s = n.length > 1,
				i = {
					type: 'list',
					raw: '',
					ordered: s,
					start: s ? +n.slice(0, -1) : '',
					loose: !1,
					items: [],
				};
			(n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
				this.options.pedantic && (n = s ? n : '[*+-]');
			const r = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
			let a = '',
				o = '',
				l = !1;
			for (; t; ) {
				let n = !1;
				if (!(e = r.exec(t))) break;
				if (this.rules.block.hr.test(t)) break;
				(a = e[0]), (t = t.substring(a.length));
				let s = e[2]
						.split('\n', 1)[0]
						.replace(/^\t+/, (t) => ' '.repeat(3 * t.length)),
					c = t.split('\n', 1)[0],
					p = 0;
				this.options.pedantic
					? ((p = 2), (o = s.trimStart()))
					: ((p = e[2].search(/[^ ]/)),
					  (p = p > 4 ? 1 : p),
					  (o = s.slice(p)),
					  (p += e[1].length));
				let u = !1;
				if (
					(!s &&
						/^ *$/.test(c) &&
						((a += c + '\n'),
						(t = t.substring(c.length + 1)),
						(n = !0)),
					!n)
				) {
					const e = new RegExp(
							`^ {0,${Math.min(
								3,
								p - 1,
							)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`,
						),
						n = new RegExp(
							`^ {0,${Math.min(
								3,
								p - 1,
							)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
						),
						i = new RegExp(
							`^ {0,${Math.min(3, p - 1)}}(?:\`\`\`|~~~)`,
						),
						r = new RegExp(`^ {0,${Math.min(3, p - 1)}}#`);
					for (; t; ) {
						const l = t.split('\n', 1)[0];
						if (
							((c = l),
							this.options.pedantic &&
								(c = c.replace(
									/^ {1,4}(?=( {4})*[^ ])/g,
									'  ',
								)),
							i.test(c))
						)
							break;
						if (r.test(c)) break;
						if (e.test(c)) break;
						if (n.test(t)) break;
						if (c.search(/[^ ]/) >= p || !c.trim())
							o += '\n' + c.slice(p);
						else {
							if (u) break;
							if (s.search(/[^ ]/) >= 4) break;
							if (i.test(s)) break;
							if (r.test(s)) break;
							if (n.test(s)) break;
							o += '\n' + c;
						}
						u || c.trim() || (u = !0),
							(a += l + '\n'),
							(t = t.substring(l.length + 1)),
							(s = c.slice(p));
					}
				}
				i.loose ||
					(l ? (i.loose = !0) : /\n *\n *$/.test(a) && (l = !0));
				let d,
					h = null;
				this.options.gfm &&
					((h = /^\[[ xX]\] /.exec(o)),
					h &&
						((d = '[ ] ' !== h[0]),
						(o = o.replace(/^\[[ xX]\] +/, '')))),
					i.items.push({
						type: 'list_item',
						raw: a,
						task: !!h,
						checked: d,
						loose: !1,
						text: o,
						tokens: [],
					}),
					(i.raw += a);
			}
			(i.items[i.items.length - 1].raw = a.trimEnd()),
				(i.items[i.items.length - 1].text = o.trimEnd()),
				(i.raw = i.raw.trimEnd());
			for (let t = 0; t < i.items.length; t++)
				if (
					((this.lexer.state.top = !1),
					(i.items[t].tokens = this.lexer.blockTokens(
						i.items[t].text,
						[],
					)),
					!i.loose)
				) {
					const e = i.items[t].tokens.filter(
							(t) => 'space' === t.type,
						),
						n = e.length > 0 && e.some((t) => /\n.*\n/.test(t.raw));
					i.loose = n;
				}
			if (i.loose)
				for (let t = 0; t < i.items.length; t++) i.items[t].loose = !0;
			return i;
		}
	}
	html(t) {
		const e = this.rules.block.html.exec(t);
		if (e) {
			return {
				type: 'html',
				block: !0,
				raw: e[0],
				pre: 'pre' === e[1] || 'script' === e[1] || 'style' === e[1],
				text: e[0],
			};
		}
	}
	def(t) {
		const e = this.rules.block.def.exec(t);
		if (e) {
			const t = e[1].toLowerCase().replace(/\s+/g, ' '),
				n = e[2]
					? e[2]
							.replace(/^<(.*)>$/, '$1')
							.replace(this.rules.inline._escapes, '$1')
					: '',
				s = e[3]
					? e[3]
							.substring(1, e[3].length - 1)
							.replace(this.rules.inline._escapes, '$1')
					: e[3];
			return { type: 'def', tag: t, raw: e[0], href: n, title: s };
		}
	}
	table(t) {
		const e = this.rules.block.table.exec(t);
		if (e) {
			if (!/[:|]/.test(e[2])) return;
			const t = {
				type: 'table',
				raw: e[0],
				header: m(e[1]).map((t) => ({ text: t, tokens: [] })),
				align: e[2].replace(/^\||\| *$/g, '').split('|'),
				rows:
					e[3] && e[3].trim()
						? e[3].replace(/\n[ \t]*$/, '').split('\n')
						: [],
			};
			if (t.header.length === t.align.length) {
				let e,
					n,
					s,
					i,
					r = t.align.length;
				for (e = 0; e < r; e++) {
					const n = t.align[e];
					n &&
						(/^ *-+: *$/.test(n)
							? (t.align[e] = 'right')
							: /^ *:-+: *$/.test(n)
							  ? (t.align[e] = 'center')
							  : /^ *:-+ *$/.test(n)
							    ? (t.align[e] = 'left')
							    : (t.align[e] = null));
				}
				for (r = t.rows.length, e = 0; e < r; e++)
					t.rows[e] = m(t.rows[e], t.header.length).map((t) => ({
						text: t,
						tokens: [],
					}));
				for (r = t.header.length, n = 0; n < r; n++)
					t.header[n].tokens = this.lexer.inline(t.header[n].text);
				for (r = t.rows.length, n = 0; n < r; n++)
					for (i = t.rows[n], s = 0; s < i.length; s++)
						i[s].tokens = this.lexer.inline(i[s].text);
				return t;
			}
		}
	}
	lheading(t) {
		const e = this.rules.block.lheading.exec(t);
		if (e)
			return {
				type: 'heading',
				raw: e[0],
				depth: '=' === e[2].charAt(0) ? 1 : 2,
				text: e[1],
				tokens: this.lexer.inline(e[1]),
			};
	}
	paragraph(t) {
		const e = this.rules.block.paragraph.exec(t);
		if (e) {
			const t =
				'\n' === e[1].charAt(e[1].length - 1)
					? e[1].slice(0, -1)
					: e[1];
			return {
				type: 'paragraph',
				raw: e[0],
				text: t,
				tokens: this.lexer.inline(t),
			};
		}
	}
	text(t) {
		const e = this.rules.block.text.exec(t);
		if (e)
			return {
				type: 'text',
				raw: e[0],
				text: e[0],
				tokens: this.lexer.inline(e[0]),
			};
	}
	escape(t) {
		const e = this.rules.inline.escape.exec(t);
		if (e) return { type: 'escape', raw: e[0], text: c(e[1]) };
	}
	tag(t) {
		const e = this.rules.inline.tag.exec(t);
		if (e)
			return (
				!this.lexer.state.inLink && /^<a /i.test(e[0])
					? (this.lexer.state.inLink = !0)
					: this.lexer.state.inLink &&
					  /^<\/a>/i.test(e[0]) &&
					  (this.lexer.state.inLink = !1),
				!this.lexer.state.inRawBlock &&
				/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])
					? (this.lexer.state.inRawBlock = !0)
					: this.lexer.state.inRawBlock &&
					  /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) &&
					  (this.lexer.state.inRawBlock = !1),
				{
					type: 'html',
					raw: e[0],
					inLink: this.lexer.state.inLink,
					inRawBlock: this.lexer.state.inRawBlock,
					block: !1,
					text: e[0],
				}
			);
	}
	link(t) {
		const e = this.rules.inline.link.exec(t);
		if (e) {
			const t = e[2].trim();
			if (!this.options.pedantic && /^</.test(t)) {
				if (!/>$/.test(t)) return;
				const e = f(t.slice(0, -1), '\\');
				if ((t.length - e.length) % 2 == 0) return;
			} else {
				const t = (function (t, e) {
					if (-1 === t.indexOf(e[1])) return -1;
					let n = 0;
					for (let s = 0; s < t.length; s++)
						if ('\\' === t[s]) s++;
						else if (t[s] === e[0]) n++;
						else if (t[s] === e[1] && (n--, n < 0)) return s;
					return -1;
				})(e[2], '()');
				if (t > -1) {
					const n =
						(0 === e[0].indexOf('!') ? 5 : 4) + e[1].length + t;
					(e[2] = e[2].substring(0, t)),
						(e[0] = e[0].substring(0, n).trim()),
						(e[3] = '');
				}
			}
			let n = e[2],
				s = '';
			if (this.options.pedantic) {
				const t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
				t && ((n = t[1]), (s = t[3]));
			} else s = e[3] ? e[3].slice(1, -1) : '';
			return (
				(n = n.trim()),
				/^</.test(n) &&
					(n =
						this.options.pedantic && !/>$/.test(t)
							? n.slice(1)
							: n.slice(1, -1)),
				k(
					e,
					{
						href: n
							? n.replace(this.rules.inline._escapes, '$1')
							: n,
						title: s
							? s.replace(this.rules.inline._escapes, '$1')
							: s,
					},
					e[0],
					this.lexer,
				)
			);
		}
	}
	reflink(t, e) {
		let n;
		if (
			(n = this.rules.inline.reflink.exec(t)) ||
			(n = this.rules.inline.nolink.exec(t))
		) {
			let t = (n[2] || n[1]).replace(/\s+/g, ' ');
			if (((t = e[t.toLowerCase()]), !t)) {
				const t = n[0].charAt(0);
				return { type: 'text', raw: t, text: t };
			}
			return k(n, t, n[0], this.lexer);
		}
	}
	emStrong(t, e, n = '') {
		let s = this.rules.inline.emStrong.lDelim.exec(t);
		if (!s) return;
		if (s[3] && n.match(/[\p{L}\p{N}]/u)) return;
		if (
			!(s[1] || s[2] || '') ||
			!n ||
			this.rules.inline.punctuation.exec(n)
		) {
			const n = [...s[0]].length - 1;
			let i,
				r,
				a = n,
				o = 0;
			const l =
				'*' === s[0][0]
					? this.rules.inline.emStrong.rDelimAst
					: this.rules.inline.emStrong.rDelimUnd;
			for (
				l.lastIndex = 0, e = e.slice(-1 * t.length + n);
				null != (s = l.exec(e));

			) {
				if (((i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !i))
					continue;
				if (((r = [...i].length), s[3] || s[4])) {
					a += r;
					continue;
				}
				if ((s[5] || s[6]) && n % 3 && !((n + r) % 3)) {
					o += r;
					continue;
				}
				if (((a -= r), a > 0)) continue;
				r = Math.min(r, r + a + o);
				const e = [...s[0]][0].length,
					l = t.slice(0, n + s.index + e + r);
				if (Math.min(n, r) % 2) {
					const t = l.slice(1, -1);
					return {
						type: 'em',
						raw: l,
						text: t,
						tokens: this.lexer.inlineTokens(t),
					};
				}
				const c = l.slice(2, -2);
				return {
					type: 'strong',
					raw: l,
					text: c,
					tokens: this.lexer.inlineTokens(c),
				};
			}
		}
	}
	codespan(t) {
		const e = this.rules.inline.code.exec(t);
		if (e) {
			let t = e[2].replace(/\n/g, ' ');
			const n = /[^ ]/.test(t),
				s = /^ /.test(t) && / $/.test(t);
			return (
				n && s && (t = t.substring(1, t.length - 1)),
				(t = c(t, !0)),
				{ type: 'codespan', raw: e[0], text: t }
			);
		}
	}
	br(t) {
		const e = this.rules.inline.br.exec(t);
		if (e) return { type: 'br', raw: e[0] };
	}
	del(t) {
		const e = this.rules.inline.del.exec(t);
		if (e)
			return {
				type: 'del',
				raw: e[0],
				text: e[2],
				tokens: this.lexer.inlineTokens(e[2]),
			};
	}
	autolink(t) {
		const e = this.rules.inline.autolink.exec(t);
		if (e) {
			let t, n;
			return (
				'@' === e[2]
					? ((t = c(e[1])), (n = 'mailto:' + t))
					: ((t = c(e[1])), (n = t)),
				{
					type: 'link',
					raw: e[0],
					text: t,
					href: n,
					tokens: [{ type: 'text', raw: t, text: t }],
				}
			);
		}
	}
	url(t) {
		let e;
		if ((e = this.rules.inline.url.exec(t))) {
			let t, n;
			if ('@' === e[2]) (t = c(e[0])), (n = 'mailto:' + t);
			else {
				let s;
				do {
					(s = e[0]),
						(e[0] = this.rules.inline._backpedal.exec(e[0])[0]);
				} while (s !== e[0]);
				(t = c(e[0])), (n = 'www.' === e[1] ? 'http://' + e[0] : e[0]);
			}
			return {
				type: 'link',
				raw: e[0],
				text: t,
				href: n,
				tokens: [{ type: 'text', raw: t, text: t }],
			};
		}
	}
	inlineText(t) {
		const e = this.rules.inline.text.exec(t);
		if (e) {
			let t;
			return (
				(t = this.lexer.state.inRawBlock ? e[0] : c(e[0])),
				{ type: 'text', raw: e[0], text: t }
			);
		}
	}
}
const w = {
	newline: /^(?: *(?:\n|$))+/,
	code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
	fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
	hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
	heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
	blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
	list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
	html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
	def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
	table: g,
	lheading:
		/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	_paragraph:
		/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
	text: /^[^\n]+/,
	_label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
	_title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
};
(w.def = d(w.def)
	.replace('label', w._label)
	.replace('title', w._title)
	.getRegex()),
	(w.bullet = /(?:[*+-]|\d{1,9}[.)])/),
	(w.listItemStart = d(/^( *)(bull) */)
		.replace('bull', w.bullet)
		.getRegex()),
	(w.list = d(w.list)
		.replace(/bull/g, w.bullet)
		.replace(
			'hr',
			'\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
		)
		.replace('def', '\\n+(?=' + w.def.source + ')')
		.getRegex()),
	(w._tag =
		'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
	(w._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
	(w.html = d(w.html, 'i')
		.replace('comment', w._comment)
		.replace('tag', w._tag)
		.replace(
			'attribute',
			/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
		)
		.getRegex()),
	(w.lheading = d(w.lheading).replace(/bull/g, w.bullet).getRegex()),
	(w.paragraph = d(w._paragraph)
		.replace('hr', w.hr)
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
		.replace('tag', w._tag)
		.getRegex()),
	(w.blockquote = d(w.blockquote)
		.replace('paragraph', w.paragraph)
		.getRegex()),
	(w.normal = { ...w }),
	(w.gfm = {
		...w.normal,
		table: '^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
	}),
	(w.gfm.table = d(w.gfm.table)
		.replace('hr', w.hr)
		.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
		.replace('blockquote', ' {0,3}>')
		.replace('code', ' {4}[^\\n]')
		.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
		.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
		.replace(
			'html',
			'</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
		)
		.replace('tag', w._tag)
		.getRegex()),
	(w.gfm.paragraph = d(w._paragraph)
		.replace('hr', w.hr)
		.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
		.replace('|lheading', '')
		.replace('table', w.gfm.table)
		.replace('blockquote', ' {0,3}>')
		.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
		.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
		.replace(
			'html',
			'</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)',
		)
		.replace('tag', w._tag)
		.getRegex()),
	(w.pedantic = {
		...w.normal,
		html: d(
			'^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
		)
			.replace('comment', w._comment)
			.replace(
				/tag/g,
				'(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
			)
			.getRegex(),
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
		heading: /^(#{1,6})(.*)(?:\n+|$)/,
		fences: g,
		lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
		paragraph: d(w.normal._paragraph)
			.replace('hr', w.hr)
			.replace('heading', ' *#{1,6} *[^\n]')
			.replace('lheading', w.lheading)
			.replace('blockquote', ' {0,3}>')
			.replace('|fences', '')
			.replace('|list', '')
			.replace('|html', '')
			.getRegex(),
	});
const x = {
	escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
	autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
	url: g,
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
	del: g,
	text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
	punctuation: /^((?![*_])[\spunctuation])/,
	_punctuation: '\\p{P}$+<=>`^|~',
};
(x.punctuation = d(x.punctuation, 'u')
	.replace(/punctuation/g, x._punctuation)
	.getRegex()),
	(x.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g),
	(x.anyPunctuation = /\\[punct]/g),
	(x._escapes = /\\([punct])/g),
	(x._comment = d(w._comment).replace('(?:--\x3e|$)', '--\x3e').getRegex()),
	(x.emStrong.lDelim = d(x.emStrong.lDelim, 'u')
		.replace(/punct/g, x._punctuation)
		.getRegex()),
	(x.emStrong.rDelimAst = d(x.emStrong.rDelimAst, 'gu')
		.replace(/punct/g, x._punctuation)
		.getRegex()),
	(x.emStrong.rDelimUnd = d(x.emStrong.rDelimUnd, 'gu')
		.replace(/punct/g, x._punctuation)
		.getRegex()),
	(x.anyPunctuation = d(x.anyPunctuation, 'gu')
		.replace(/punct/g, x._punctuation)
		.getRegex()),
	(x._escapes = d(x._escapes, 'gu')
		.replace(/punct/g, x._punctuation)
		.getRegex()),
	(x._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
	(x._email =
		/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
	(x.autolink = d(x.autolink)
		.replace('scheme', x._scheme)
		.replace('email', x._email)
		.getRegex()),
	(x._attribute =
		/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
	(x.tag = d(x.tag)
		.replace('comment', x._comment)
		.replace('attribute', x._attribute)
		.getRegex()),
	(x._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
	(x._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
	(x._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
	(x.link = d(x.link)
		.replace('label', x._label)
		.replace('href', x._href)
		.replace('title', x._title)
		.getRegex()),
	(x.reflink = d(x.reflink)
		.replace('label', x._label)
		.replace('ref', w._label)
		.getRegex()),
	(x.nolink = d(x.nolink).replace('ref', w._label).getRegex()),
	(x.reflinkSearch = d(x.reflinkSearch, 'g')
		.replace('reflink', x.reflink)
		.replace('nolink', x.nolink)
		.getRegex()),
	(x.normal = { ...x }),
	(x.pedantic = {
		...x.normal,
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
		link: d(/^!?\[(label)\]\((.*?)\)/)
			.replace('label', x._label)
			.getRegex(),
		reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/)
			.replace('label', x._label)
			.getRegex(),
	}),
	(x.gfm = {
		...x.normal,
		escape: d(x.escape).replace('])', '~|])').getRegex(),
		_extended_email:
			/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
		url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
		_backpedal:
			/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
		del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
		text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
	}),
	(x.gfm.url = d(x.gfm.url, 'i')
		.replace('email', x.gfm._extended_email)
		.getRegex()),
	(x.breaks = {
		...x.gfm,
		br: d(x.br).replace('{2,}', '*').getRegex(),
		text: d(x.gfm.text)
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
	constructor(t) {
		(this.tokens = []),
			(this.tokens.links = Object.create(null)),
			(this.options = t || e),
			(this.options.tokenizer = this.options.tokenizer || new b()),
			(this.tokenizer = this.options.tokenizer),
			(this.tokenizer.options = this.options),
			(this.tokenizer.lexer = this),
			(this.inlineQueue = []),
			(this.state = { inLink: !1, inRawBlock: !1, top: !0 });
		const n = { block: w.normal, inline: x.normal };
		this.options.pedantic
			? ((n.block = w.pedantic), (n.inline = x.pedantic))
			: this.options.gfm &&
			  ((n.block = w.gfm),
			  this.options.breaks ? (n.inline = x.breaks) : (n.inline = x.gfm)),
			(this.tokenizer.rules = n);
	}
	static get rules() {
		return { block: w, inline: x };
	}
	static lex(t, e) {
		return new y(e).lex(t);
	}
	static lexInline(t, e) {
		return new y(e).inlineTokens(t);
	}
	lex(t) {
		let e;
		for (
			t = t.replace(/\r\n|\r/g, '\n'), this.blockTokens(t, this.tokens);
			(e = this.inlineQueue.shift());

		)
			this.inlineTokens(e.src, e.tokens);
		return this.tokens;
	}
	blockTokens(t, e = []) {
		let n, s, i, r;
		for (
			t = this.options.pedantic
				? t.replace(/\t/g, '    ').replace(/^ +$/gm, '')
				: t.replace(
						/^( *)(\t+)/gm,
						(t, e, n) => e + '    '.repeat(n.length),
				  );
			t;

		)
			if (
				!(
					this.options.extensions &&
					this.options.extensions.block &&
					this.options.extensions.block.some(
						(s) =>
							!!(n = s.call({ lexer: this }, t, e)) &&
							((t = t.substring(n.raw.length)), e.push(n), !0),
					)
				)
			)
				if ((n = this.tokenizer.space(t)))
					(t = t.substring(n.raw.length)),
						1 === n.raw.length && e.length > 0
							? (e[e.length - 1].raw += '\n')
							: e.push(n);
				else if ((n = this.tokenizer.code(t)))
					(t = t.substring(n.raw.length)),
						(s = e[e.length - 1]),
						!s || ('paragraph' !== s.type && 'text' !== s.type)
							? e.push(n)
							: ((s.raw += '\n' + n.raw),
							  (s.text += '\n' + n.text),
							  (this.inlineQueue[
									this.inlineQueue.length - 1
							  ].src = s.text));
				else if ((n = this.tokenizer.fences(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.heading(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.hr(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.blockquote(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.list(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.html(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.def(t)))
					(t = t.substring(n.raw.length)),
						(s = e[e.length - 1]),
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
				else if ((n = this.tokenizer.table(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.lheading(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else {
					if (
						((i = t),
						this.options.extensions &&
							this.options.extensions.startBlock)
					) {
						let e = 1 / 0;
						const n = t.slice(1);
						let s;
						this.options.extensions.startBlock.forEach((t) => {
							(s = t.call({ lexer: this }, n)),
								'number' == typeof s &&
									s >= 0 &&
									(e = Math.min(e, s));
						}),
							e < 1 / 0 && e >= 0 && (i = t.substring(0, e + 1));
					}
					if (this.state.top && (n = this.tokenizer.paragraph(i)))
						(s = e[e.length - 1]),
							r && 'paragraph' === s.type
								? ((s.raw += '\n' + n.raw),
								  (s.text += '\n' + n.text),
								  this.inlineQueue.pop(),
								  (this.inlineQueue[
										this.inlineQueue.length - 1
								  ].src = s.text))
								: e.push(n),
							(r = i.length !== t.length),
							(t = t.substring(n.raw.length));
					else if ((n = this.tokenizer.text(t)))
						(t = t.substring(n.raw.length)),
							(s = e[e.length - 1]),
							s && 'text' === s.type
								? ((s.raw += '\n' + n.raw),
								  (s.text += '\n' + n.text),
								  this.inlineQueue.pop(),
								  (this.inlineQueue[
										this.inlineQueue.length - 1
								  ].src = s.text))
								: e.push(n);
					else if (t) {
						const e = 'Infinite loop on byte: ' + t.charCodeAt(0);
						if (this.options.silent) {
							console.error(e);
							break;
						}
						throw new Error(e);
					}
				}
		return (this.state.top = !0), e;
	}
	inline(t, e = []) {
		return this.inlineQueue.push({ src: t, tokens: e }), e;
	}
	inlineTokens(t, e = []) {
		let n,
			s,
			i,
			r,
			a,
			o,
			l = t;
		if (this.tokens.links) {
			const t = Object.keys(this.tokens.links);
			if (t.length > 0)
				for (
					;
					null !=
					(r = this.tokenizer.rules.inline.reflinkSearch.exec(l));

				)
					t.includes(r[0].slice(r[0].lastIndexOf('[') + 1, -1)) &&
						(l =
							l.slice(0, r.index) +
							'[' +
							'a'.repeat(r[0].length - 2) +
							']' +
							l.slice(
								this.tokenizer.rules.inline.reflinkSearch
									.lastIndex,
							));
		}
		for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); )
			l =
				l.slice(0, r.index) +
				'[' +
				'a'.repeat(r[0].length - 2) +
				']' +
				l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		for (
			;
			null != (r = this.tokenizer.rules.inline.anyPunctuation.exec(l));

		)
			l =
				l.slice(0, r.index) +
				'++' +
				l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		for (; t; )
			if (
				(a || (o = ''),
				(a = !1),
				!(
					this.options.extensions &&
					this.options.extensions.inline &&
					this.options.extensions.inline.some(
						(s) =>
							!!(n = s.call({ lexer: this }, t, e)) &&
							((t = t.substring(n.raw.length)), e.push(n), !0),
					)
				))
			)
				if ((n = this.tokenizer.escape(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.tag(t)))
					(t = t.substring(n.raw.length)),
						(s = e[e.length - 1]),
						s && 'text' === n.type && 'text' === s.type
							? ((s.raw += n.raw), (s.text += n.text))
							: e.push(n);
				else if ((n = this.tokenizer.link(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.reflink(t, this.tokens.links)))
					(t = t.substring(n.raw.length)),
						(s = e[e.length - 1]),
						s && 'text' === n.type && 'text' === s.type
							? ((s.raw += n.raw), (s.text += n.text))
							: e.push(n);
				else if ((n = this.tokenizer.emStrong(t, l, o)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.codespan(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.br(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.del(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if ((n = this.tokenizer.autolink(t)))
					(t = t.substring(n.raw.length)), e.push(n);
				else if (this.state.inLink || !(n = this.tokenizer.url(t))) {
					if (
						((i = t),
						this.options.extensions &&
							this.options.extensions.startInline)
					) {
						let e = 1 / 0;
						const n = t.slice(1);
						let s;
						this.options.extensions.startInline.forEach((t) => {
							(s = t.call({ lexer: this }, n)),
								'number' == typeof s &&
									s >= 0 &&
									(e = Math.min(e, s));
						}),
							e < 1 / 0 && e >= 0 && (i = t.substring(0, e + 1));
					}
					if ((n = this.tokenizer.inlineText(i)))
						(t = t.substring(n.raw.length)),
							'_' !== n.raw.slice(-1) && (o = n.raw.slice(-1)),
							(a = !0),
							(s = e[e.length - 1]),
							s && 'text' === s.type
								? ((s.raw += n.raw), (s.text += n.text))
								: e.push(n);
					else if (t) {
						const e = 'Infinite loop on byte: ' + t.charCodeAt(0);
						if (this.options.silent) {
							console.error(e);
							break;
						}
						throw new Error(e);
					}
				} else (t = t.substring(n.raw.length)), e.push(n);
		return e;
	}
}
class v {
	options;
	constructor(t) {
		this.options = t || e;
	}
	code(t, e, n) {
		const s = (e || '').match(/^\S*/)?.[0];
		return (
			(t = t.replace(/\n$/, '') + '\n'),
			s
				? '<pre><code class="language-' +
				  c(s) +
				  '">' +
				  (n ? t : c(t, !0)) +
				  '</code></pre>\n'
				: '<pre><code>' + (n ? t : c(t, !0)) + '</code></pre>\n'
		);
	}
	blockquote(t) {
		return `<blockquote>\n${t}</blockquote>\n`;
	}
	html(t, e) {
		return t;
	}
	heading(t, e, n) {
		return `<h${e}>${t}</h${e}>\n`;
	}
	hr() {
		return '<hr>\n';
	}
	list(t, e, n) {
		const s = e ? 'ol' : 'ul';
		return (
			'<' +
			s +
			(e && 1 !== n ? ' start="' + n + '"' : '') +
			'>\n' +
			t +
			'</' +
			s +
			'>\n'
		);
	}
	listitem(t, e, n) {
		return `<li>${t}</li>\n`;
	}
	checkbox(t) {
		return (
			'<input ' +
			(t ? 'checked="" ' : '') +
			'disabled="" type="checkbox">'
		);
	}
	paragraph(t) {
		return `<p>${t}</p>\n`;
	}
	table(t, e) {
		return (
			e && (e = `<tbody>${e}</tbody>`),
			'<table>\n<thead>\n' + t + '</thead>\n' + e + '</table>\n'
		);
	}
	tablerow(t) {
		return `<tr>\n${t}</tr>\n`;
	}
	tablecell(t, e) {
		const n = e.header ? 'th' : 'td';
		return (
			(e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>\n`
		);
	}
	strong(t) {
		return `<strong>${t}</strong>`;
	}
	em(t) {
		return `<em>${t}</em>`;
	}
	codespan(t) {
		return `<code>${t}</code>`;
	}
	br() {
		return '<br>';
	}
	del(t) {
		return `<del>${t}</del>`;
	}
	link(t, e, n) {
		const s = h(t);
		if (null === s) return n;
		let i = '<a href="' + (t = s) + '"';
		return e && (i += ' title="' + e + '"'), (i += '>' + n + '</a>'), i;
	}
	image(t, e, n) {
		const s = h(t);
		if (null === s) return n;
		let i = `<img src="${(t = s)}" alt="${n}"`;
		return e && (i += ` title="${e}"`), (i += '>'), i;
	}
	text(t) {
		return t;
	}
}
class S {
	strong(t) {
		return t;
	}
	em(t) {
		return t;
	}
	codespan(t) {
		return t;
	}
	del(t) {
		return t;
	}
	html(t) {
		return t;
	}
	text(t) {
		return t;
	}
	link(t, e, n) {
		return '' + n;
	}
	image(t, e, n) {
		return '' + n;
	}
	br() {
		return '';
	}
}
class T {
	options;
	renderer;
	textRenderer;
	constructor(t) {
		(this.options = t || e),
			(this.options.renderer = this.options.renderer || new v()),
			(this.renderer = this.options.renderer),
			(this.renderer.options = this.options),
			(this.textRenderer = new S());
	}
	static parse(t, e) {
		return new T(e).parse(t);
	}
	static parseInline(t, e) {
		return new T(e).parseInline(t);
	}
	parse(t, e = !0) {
		let n = '';
		for (let s = 0; s < t.length; s++) {
			const i = t[s];
			if (
				this.options.extensions &&
				this.options.extensions.renderers &&
				this.options.extensions.renderers[i.type]
			) {
				const t = i,
					e = this.options.extensions.renderers[t.type].call(
						{ parser: this },
						t,
					);
				if (
					!1 !== e ||
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
					].includes(t.type)
				) {
					n += e || '';
					continue;
				}
			}
			switch (i.type) {
				case 'space':
					continue;
				case 'hr':
					n += this.renderer.hr();
					continue;
				case 'heading': {
					const t = i;
					n += this.renderer.heading(
						this.parseInline(t.tokens),
						t.depth,
						this.parseInline(t.tokens, this.textRenderer).replace(
							p,
							(t, e) =>
								'colon' === (e = e.toLowerCase())
									? ':'
									: '#' === e.charAt(0)
									  ? 'x' === e.charAt(1)
											? String.fromCharCode(
													parseInt(
														e.substring(2),
														16,
													),
											  )
											: String.fromCharCode(
													+e.substring(1),
											  )
									  : '',
						),
					);
					continue;
				}
				case 'code': {
					const t = i;
					n += this.renderer.code(t.text, t.lang, !!t.escaped);
					continue;
				}
				case 'table': {
					const t = i;
					let e = '',
						s = '';
					for (let e = 0; e < t.header.length; e++)
						s += this.renderer.tablecell(
							this.parseInline(t.header[e].tokens),
							{ header: !0, align: t.align[e] },
						);
					e += this.renderer.tablerow(s);
					let r = '';
					for (let e = 0; e < t.rows.length; e++) {
						const n = t.rows[e];
						s = '';
						for (let e = 0; e < n.length; e++)
							s += this.renderer.tablecell(
								this.parseInline(n[e].tokens),
								{ header: !1, align: t.align[e] },
							);
						r += this.renderer.tablerow(s);
					}
					n += this.renderer.table(e, r);
					continue;
				}
				case 'blockquote': {
					const t = i,
						e = this.parse(t.tokens);
					n += this.renderer.blockquote(e);
					continue;
				}
				case 'list': {
					const t = i,
						e = t.ordered,
						s = t.start,
						r = t.loose;
					let a = '';
					for (let e = 0; e < t.items.length; e++) {
						const n = t.items[e],
							s = n.checked,
							i = n.task;
						let o = '';
						if (n.task) {
							const t = this.renderer.checkbox(!!s);
							r
								? n.tokens.length > 0 &&
								  'paragraph' === n.tokens[0].type
									? ((n.tokens[0].text =
											t + ' ' + n.tokens[0].text),
									  n.tokens[0].tokens &&
											n.tokens[0].tokens.length > 0 &&
											'text' ===
												n.tokens[0].tokens[0].type &&
											(n.tokens[0].tokens[0].text =
												t +
												' ' +
												n.tokens[0].tokens[0].text))
									: n.tokens.unshift({
											type: 'text',
											text: t + ' ',
									  })
								: (o += t + ' ');
						}
						(o += this.parse(n.tokens, r)),
							(a += this.renderer.listitem(o, i, !!s));
					}
					n += this.renderer.list(a, e, s);
					continue;
				}
				case 'html': {
					const t = i;
					n += this.renderer.html(t.text, t.block);
					continue;
				}
				case 'paragraph': {
					const t = i;
					n += this.renderer.paragraph(this.parseInline(t.tokens));
					continue;
				}
				case 'text': {
					let r = i,
						a = r.tokens ? this.parseInline(r.tokens) : r.text;
					for (; s + 1 < t.length && 'text' === t[s + 1].type; )
						(r = t[++s]),
							(a +=
								'\n' +
								(r.tokens
									? this.parseInline(r.tokens)
									: r.text));
					n += e ? this.renderer.paragraph(a) : a;
					continue;
				}
				default: {
					const t = 'Token with "' + i.type + '" type was not found.';
					if (this.options.silent) return console.error(t), '';
					throw new Error(t);
				}
			}
		}
		return n;
	}
	parseInline(t, e) {
		e = e || this.renderer;
		let n = '';
		for (let s = 0; s < t.length; s++) {
			const i = t[s];
			if (
				this.options.extensions &&
				this.options.extensions.renderers &&
				this.options.extensions.renderers[i.type]
			) {
				const t = this.options.extensions.renderers[i.type].call(
					{ parser: this },
					i,
				);
				if (
					!1 !== t ||
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
					].includes(i.type)
				) {
					n += t || '';
					continue;
				}
			}
			switch (i.type) {
				case 'escape': {
					const t = i;
					n += e.text(t.text);
					break;
				}
				case 'html': {
					const t = i;
					n += e.html(t.text);
					break;
				}
				case 'link': {
					const t = i;
					n += e.link(t.href, t.title, this.parseInline(t.tokens, e));
					break;
				}
				case 'image': {
					const t = i;
					n += e.image(t.href, t.title, t.text);
					break;
				}
				case 'strong': {
					const t = i;
					n += e.strong(this.parseInline(t.tokens, e));
					break;
				}
				case 'em': {
					const t = i;
					n += e.em(this.parseInline(t.tokens, e));
					break;
				}
				case 'codespan': {
					const t = i;
					n += e.codespan(t.text);
					break;
				}
				case 'br':
					n += e.br();
					break;
				case 'del': {
					const t = i;
					n += e.del(this.parseInline(t.tokens, e));
					break;
				}
				case 'text': {
					const t = i;
					n += e.text(t.text);
					break;
				}
				default: {
					const t = 'Token with "' + i.type + '" type was not found.';
					if (this.options.silent) return console.error(t), '';
					throw new Error(t);
				}
			}
		}
		return n;
	}
}
class _ {
	options;
	constructor(t) {
		this.options = t || e;
	}
	static passThroughHooks = new Set(['preprocess', 'postprocess']);
	preprocess(t) {
		return t;
	}
	postprocess(t) {
		return t;
	}
}
const $ = new (class {
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
	parse = this.#t(y.lex, T.parse);
	parseInline = this.#t(y.lexInline, T.parseInline);
	Parser = T;
	parser = T.parse;
	Renderer = v;
	TextRenderer = S;
	Lexer = y;
	lexer = y.lex;
	Tokenizer = b;
	Hooks = _;
	constructor(...t) {
		this.use(...t);
	}
	walkTokens(t, e) {
		let n = [];
		for (const s of t)
			switch (((n = n.concat(e.call(this, s))), s.type)) {
				case 'table': {
					const t = s;
					for (const s of t.header)
						n = n.concat(this.walkTokens(s.tokens, e));
					for (const s of t.rows)
						for (const t of s)
							n = n.concat(this.walkTokens(t.tokens, e));
					break;
				}
				case 'list': {
					const t = s;
					n = n.concat(this.walkTokens(t.items, e));
					break;
				}
				default: {
					const t = s;
					this.defaults.extensions?.childTokens?.[t.type]
						? this.defaults.extensions.childTokens[t.type].forEach(
								(s) => {
									n = n.concat(this.walkTokens(t[s], e));
								},
						  )
						: t.tokens &&
						  (n = n.concat(this.walkTokens(t.tokens, e)));
				}
			}
		return n;
	}
	use(...t) {
		const e = this.defaults.extensions || {
			renderers: {},
			childTokens: {},
		};
		return (
			t.forEach((t) => {
				const n = { ...t };
				if (
					((n.async = this.defaults.async || n.async || !1),
					t.extensions &&
						(t.extensions.forEach((t) => {
							if (!t.name)
								throw new Error('extension name required');
							if ('renderer' in t) {
								const n = e.renderers[t.name];
								e.renderers[t.name] = n
									? function (...e) {
											let s = t.renderer.apply(this, e);
											return (
												!1 === s &&
													(s = n.apply(this, e)),
												s
											);
									  }
									: t.renderer;
							}
							if ('tokenizer' in t) {
								if (
									!t.level ||
									('block' !== t.level &&
										'inline' !== t.level)
								)
									throw new Error(
										"extension level must be 'block' or 'inline'",
									);
								const n = e[t.level];
								n
									? n.unshift(t.tokenizer)
									: (e[t.level] = [t.tokenizer]),
									t.start &&
										('block' === t.level
											? e.startBlock
												? e.startBlock.push(t.start)
												: (e.startBlock = [t.start])
											: 'inline' === t.level &&
											  (e.startInline
													? e.startInline.push(
															t.start,
													  )
													: (e.startInline = [
															t.start,
													  ])));
							}
							'childTokens' in t &&
								t.childTokens &&
								(e.childTokens[t.name] = t.childTokens);
						}),
						(n.extensions = e)),
					t.renderer)
				) {
					const e = this.defaults.renderer || new v(this.defaults);
					for (const n in t.renderer) {
						const s = t.renderer[n],
							i = n,
							r = e[i];
						e[i] = (...t) => {
							let n = s.apply(e, t);
							return !1 === n && (n = r.apply(e, t)), n || '';
						};
					}
					n.renderer = e;
				}
				if (t.tokenizer) {
					const e = this.defaults.tokenizer || new b(this.defaults);
					for (const n in t.tokenizer) {
						const s = t.tokenizer[n],
							i = n,
							r = e[i];
						e[i] = (...t) => {
							let n = s.apply(e, t);
							return !1 === n && (n = r.apply(e, t)), n;
						};
					}
					n.tokenizer = e;
				}
				if (t.hooks) {
					const e = this.defaults.hooks || new _();
					for (const n in t.hooks) {
						const s = t.hooks[n],
							i = n,
							r = e[i];
						_.passThroughHooks.has(n)
							? (e[i] = (t) => {
									if (this.defaults.async)
										return Promise.resolve(
											s.call(e, t),
										).then((t) => r.call(e, t));
									const n = s.call(e, t);
									return r.call(e, n);
							  })
							: (e[i] = (...t) => {
									let n = s.apply(e, t);
									return !1 === n && (n = r.apply(e, t)), n;
							  });
					}
					n.hooks = e;
				}
				if (t.walkTokens) {
					const e = this.defaults.walkTokens,
						s = t.walkTokens;
					n.walkTokens = function (t) {
						let n = [];
						return (
							n.push(s.call(this, t)),
							e && (n = n.concat(e.call(this, t))),
							n
						);
					};
				}
				this.defaults = { ...this.defaults, ...n };
			}),
			this
		);
	}
	setOptions(t) {
		return (this.defaults = { ...this.defaults, ...t }), this;
	}
	#t(t, e) {
		return (n, s) => {
			const i = { ...s },
				r = { ...this.defaults, ...i };
			!0 === this.defaults.async &&
				!1 === i.async &&
				(r.silent ||
					console.warn(
						'marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.',
					),
				(r.async = !0));
			const a = this.#e(!!r.silent, !!r.async);
			if (null == n)
				return a(
					new Error('marked(): input parameter is undefined or null'),
				);
			if ('string' != typeof n)
				return a(
					new Error(
						'marked(): input parameter is of type ' +
							Object.prototype.toString.call(n) +
							', string expected',
					),
				);
			if ((r.hooks && (r.hooks.options = r), r.async))
				return Promise.resolve(r.hooks ? r.hooks.preprocess(n) : n)
					.then((e) => t(e, r))
					.then((t) =>
						r.walkTokens
							? Promise.all(
									this.walkTokens(t, r.walkTokens),
							  ).then(() => t)
							: t,
					)
					.then((t) => e(t, r))
					.then((t) => (r.hooks ? r.hooks.postprocess(t) : t))
					.catch(a);
			try {
				r.hooks && (n = r.hooks.preprocess(n));
				const s = t(n, r);
				r.walkTokens && this.walkTokens(s, r.walkTokens);
				let i = e(s, r);
				return r.hooks && (i = r.hooks.postprocess(i)), i;
			} catch (t) {
				return a(t);
			}
		};
	}
	#e(t, e) {
		return (n) => {
			if (
				((n.message +=
					'\nPlease report this to https://github.com/markedjs/marked.'),
				t)
			) {
				const t =
					'<p>An error occurred:</p><pre>' +
					c(n.message + '', !0) +
					'</pre>';
				return e ? Promise.resolve(t) : t;
			}
			if (e) return Promise.reject(n);
			throw n;
		};
	}
})();
function z(t, e) {
	return $.parse(t, e);
}
(z.options = z.setOptions =
	function (t) {
		return $.setOptions(t), (z.defaults = $.defaults), n(z.defaults), z;
	}),
	(z.getDefaults = t),
	(z.defaults = e),
	(z.use = function (...t) {
		return $.use(...t), (z.defaults = $.defaults), n(z.defaults), z;
	}),
	(z.walkTokens = function (t, e) {
		return $.walkTokens(t, e);
	}),
	(z.parseInline = $.parseInline),
	(z.Parser = T),
	(z.parser = T.parse),
	(z.Renderer = v),
	(z.TextRenderer = S),
	(z.Lexer = y),
	(z.lexer = y.lex),
	(z.Tokenizer = b),
	(z.Hooks = _),
	(z.parse = z),
	z.options,
	z.setOptions,
	z.use,
	z.walkTokens,
	z.parseInline;
const E = () => {
	let t,
		e,
		n = null;
	function s() {
		if (n && !n.closed) n.focus();
		else {
			if (
				((n = window.open(
					'about:blank',
					'reveal.js - Notes',
					'width=1100,height=700',
				)),
				(n.marked = z),
				n.document.write(
					"\x3c!--\n\tNOTE: You need to build the notes plugin after making changes to this file.\n--\x3e\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\n\t\t<title>reveal.js - Speaker View</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: Helvetica;\n\t\t\t\tfont-size: 18px;\n\t\t\t}\n\n\t\t\t#current-slide,\n\t\t\t#upcoming-slide,\n\t\t\t#speaker-controls {\n\t\t\t\tpadding: 6px;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\t-moz-box-sizing: border-box;\n\t\t\t}\n\n\t\t\t#current-slide iframe,\n\t\t\t#upcoming-slide iframe {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tborder: 1px solid #ddd;\n\t\t\t}\n\n\t\t\t#current-slide .label,\n\t\t\t#upcoming-slide .label {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 10px;\n\t\t\t\tleft: 10px;\n\t\t\t\tz-index: 2;\n\t\t\t}\n\n\t\t\t#connection-status {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tz-index: 20;\n\t\t\t\tpadding: 30% 20% 20% 20%;\n\t\t\t\tfont-size: 18px;\n\t\t\t\tcolor: #222;\n\t\t\t\tbackground: #fff;\n\t\t\t\ttext-align: center;\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tline-height: 1.4;\n\t\t\t}\n\n\t\t\t.overlay-element {\n\t\t\t\theight: 34px;\n\t\t\t\tline-height: 34px;\n\t\t\t\tpadding: 0 10px;\n\t\t\t\ttext-shadow: none;\n\t\t\t\tbackground: rgba( 220, 220, 220, 0.8 );\n\t\t\t\tcolor: #222;\n\t\t\t\tfont-size: 14px;\n\t\t\t}\n\n\t\t\t.overlay-element.interactive:hover {\n\t\t\t\tbackground: rgba( 220, 220, 220, 1 );\n\t\t\t}\n\n\t\t\t#current-slide {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 60%;\n\t\t\t\theight: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tpadding-right: 0;\n\t\t\t}\n\n\t\t\t#upcoming-slide {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 40%;\n\t\t\t\theight: 40%;\n\t\t\t\tright: 0;\n\t\t\t\ttop: 0;\n\t\t\t}\n\n\t\t\t/* Speaker controls */\n\t\t\t#speaker-controls {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 40%;\n\t\t\t\tright: 0;\n\t\t\t\twidth: 40%;\n\t\t\t\theight: 60%;\n\t\t\t\toverflow: auto;\n\t\t\t\tfont-size: 18px;\n\t\t\t}\n\n\t\t\t\t.speaker-controls-time.hidden,\n\t\t\t\t.speaker-controls-notes.hidden {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .label,\n\t\t\t\t.speaker-controls-pace .label,\n\t\t\t\t.speaker-controls-notes .label {\n\t\t\t\t\ttext-transform: uppercase;\n\t\t\t\t\tfont-weight: normal;\n\t\t\t\t\tfont-size: 0.66em;\n\t\t\t\t\tcolor: #666;\n\t\t\t\t\tmargin: 0;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time, .speaker-controls-pace {\n\t\t\t\t\tborder-bottom: 1px solid rgba( 200, 200, 200, 0.5 );\n\t\t\t\t\tmargin-bottom: 10px;\n\t\t\t\t\tpadding: 10px 16px;\n\t\t\t\t\tpadding-bottom: 20px;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .reset-button {\n\t\t\t\t\topacity: 0;\n\t\t\t\t\tfloat: right;\n\t\t\t\t\tcolor: #666;\n\t\t\t\t\ttext-decoration: none;\n\t\t\t\t}\n\t\t\t\t.speaker-controls-time:hover .reset-button {\n\t\t\t\t\topacity: 1;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer,\n\t\t\t\t.speaker-controls-time .clock {\n\t\t\t\t\twidth: 50%;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer,\n\t\t\t\t.speaker-controls-time .clock,\n\t\t\t\t.speaker-controls-time .pacing .hours-value,\n\t\t\t\t.speaker-controls-time .pacing .minutes-value,\n\t\t\t\t.speaker-controls-time .pacing .seconds-value {\n\t\t\t\t\tfont-size: 1.9em;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .timer {\n\t\t\t\t\tfloat: left;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .clock {\n\t\t\t\t\tfloat: right;\n\t\t\t\t\ttext-align: right;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time span.mute {\n\t\t\t\t\topacity: 0.3;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing-title {\n\t\t\t\t\tmargin-top: 5px;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.ahead {\n\t\t\t\t\tcolor: blue;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.on-track {\n\t\t\t\t\tcolor: green;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-time .pacing.behind {\n\t\t\t\t\tcolor: red;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-notes {\n\t\t\t\t\tpadding: 10px 16px;\n\t\t\t\t}\n\n\t\t\t\t.speaker-controls-notes .value {\n\t\t\t\t\tmargin-top: 5px;\n\t\t\t\t\tline-height: 1.4;\n\t\t\t\t\tfont-size: 1.2em;\n\t\t\t\t}\n\n\t\t\t/* Layout selector */\n\t\t\t#speaker-layout {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 10px;\n\t\t\t\tright: 10px;\n\t\t\t\tcolor: #222;\n\t\t\t\tz-index: 10;\n\t\t\t}\n\t\t\t\t#speaker-layout select {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tborder: 0;\n\t\t\t\t\tbox-shadow: 0;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\topacity: 0;\n\n\t\t\t\t\tfont-size: 1em;\n\t\t\t\t\tbackground-color: transparent;\n\n\t\t\t\t\t-moz-appearance: none;\n\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\t\t\t\t}\n\n\t\t\t\t#speaker-layout select:focus {\n\t\t\t\t\toutline: none;\n\t\t\t\t\tbox-shadow: none;\n\t\t\t\t}\n\n\t\t\t.clear {\n\t\t\t\tclear: both;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Wide */\n\t\t\tbody[data-speaker-layout=\"wide\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"wide\"] #upcoming-slide {\n\t\t\t\twidth: 50%;\n\t\t\t\theight: 45%;\n\t\t\t\tpadding: 6px;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #current-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #upcoming-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 50%;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"wide\"] #speaker-controls {\n\t\t\t\ttop: 45%;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 50%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Tall */\n\t\t\tbody[data-speaker-layout=\"tall\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"tall\"] #upcoming-slide {\n\t\t\t\twidth: 45%;\n\t\t\t\theight: 50%;\n\t\t\t\tpadding: 6px;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #current-slide {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #upcoming-slide {\n\t\t\t\ttop: 50%;\n\t\t\t\tleft: 0;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"tall\"] #speaker-controls {\n\t\t\t\tpadding-top: 40px;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 45%;\n\t\t\t\twidth: 55%;\n\t\t\t\theight: 100%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t/* Speaker layout: Notes only */\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #current-slide,\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #upcoming-slide {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\tbody[data-speaker-layout=\"notes-only\"] #speaker-controls {\n\t\t\t\tpadding-top: 40px;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tfont-size: 1.25em;\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 1080px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 16px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 900px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 14px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t@media screen and (max-width: 800px) {\n\t\t\t\tbody[data-speaker-layout=\"default\"] #speaker-controls {\n\t\t\t\t\tfont-size: 12px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t</style>\n\t</head>\n\n\t<body>\n\n\t\t<div id=\"connection-status\">Loading speaker view...</div>\n\n\t\t<div id=\"current-slide\"></div>\n\t\t<div id=\"upcoming-slide\"><span class=\"overlay-element label\">Upcoming</span></div>\n\t\t<div id=\"speaker-controls\">\n\t\t\t<div class=\"speaker-controls-time\">\n\t\t\t\t<h4 class=\"label\">Time <span class=\"reset-button\">Click to Reset</span></h4>\n\t\t\t\t<div class=\"clock\">\n\t\t\t\t\t<span class=\"clock-value\">0:00 AM</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"timer\">\n\t\t\t\t\t<span class=\"hours-value\">00</span><span class=\"minutes-value\">:00</span><span class=\"seconds-value\">:00</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"clear\"></div>\n\n\t\t\t\t<h4 class=\"label pacing-title\" style=\"display: none\">Pacing – Time to finish current slide</h4>\n\t\t\t\t<div class=\"pacing\" style=\"display: none\">\n\t\t\t\t\t<span class=\"hours-value\">00</span><span class=\"minutes-value\">:00</span><span class=\"seconds-value\">:00</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"speaker-controls-notes hidden\">\n\t\t\t\t<h4 class=\"label\">Notes</h4>\n\t\t\t\t<div class=\"value\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"speaker-layout\" class=\"overlay-element interactive\">\n\t\t\t<span class=\"speaker-layout-label\"></span>\n\t\t\t<select class=\"speaker-layout-dropdown\"></select>\n\t\t</div>\n\n\t\t<script>\n\n\t\t\t(function() {\n\n\t\t\t\tvar notes,\n\t\t\t\t\tnotesValue,\n\t\t\t\t\tcurrentState,\n\t\t\t\t\tcurrentSlide,\n\t\t\t\t\tupcomingSlide,\n\t\t\t\t\tlayoutLabel,\n\t\t\t\t\tlayoutDropdown,\n\t\t\t\t\tpendingCalls = {},\n\t\t\t\t\tlastRevealApiCallId = 0,\n\t\t\t\t\tconnected = false\n\n\t\t\t\tvar connectionStatus = document.querySelector( '#connection-status' );\n\n\t\t\t\tvar SPEAKER_LAYOUTS = {\n\t\t\t\t\t'default': 'Default',\n\t\t\t\t\t'wide': 'Wide',\n\t\t\t\t\t'tall': 'Tall',\n\t\t\t\t\t'notes-only': 'Notes only'\n\t\t\t\t};\n\n\t\t\t\tsetupLayout();\n\n\t\t\t\tlet openerOrigin;\n\n\t\t\t\ttry {\n\t\t\t\t\topenerOrigin = window.opener.location.origin;\n\t\t\t\t}\n\t\t\t\tcatch ( error ) { console.warn( error ) }\n\n\t\t\t\t// In order to prevent XSS, the speaker view will only run if its\n\t\t\t\t// opener has the same origin as itself\n\t\t\t\tif( window.location.origin !== openerOrigin ) {\n\t\t\t\t\tconnectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tvar connectionTimeout = setTimeout( function() {\n\t\t\t\t\tconnectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';\n\t\t\t\t}, 5000 );\n\n\t\t\t\twindow.addEventListener( 'message', function( event ) {\n\n\t\t\t\t\tclearTimeout( connectionTimeout );\n\t\t\t\t\tconnectionStatus.style.display = 'none';\n\n\t\t\t\t\tvar data = JSON.parse( event.data );\n\n\t\t\t\t\t// The overview mode is only useful to the reveal.js instance\n\t\t\t\t\t// where navigation occurs so we don't sync it\n\t\t\t\t\tif( data.state ) delete data.state.overview;\n\n\t\t\t\t\t// Messages sent by the notes plugin inside of the main window\n\t\t\t\t\tif( data && data.namespace === 'reveal-notes' ) {\n\t\t\t\t\t\tif( data.type === 'connect' ) {\n\t\t\t\t\t\t\thandleConnectMessage( data );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( data.type === 'state' ) {\n\t\t\t\t\t\t\thandleStateMessage( data );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( data.type === 'return' ) {\n\t\t\t\t\t\t\tpendingCalls[data.callId](data.result);\n\t\t\t\t\t\t\tdelete pendingCalls[data.callId];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t// Messages sent by the reveal.js inside of the current slide preview\n\t\t\t\t\telse if( data && data.namespace === 'reveal' ) {\n\t\t\t\t\t\tif( /ready/.test( data.eventName ) ) {\n\t\t\t\t\t\t\t// Send a message back to notify that the handshake is complete\n\t\t\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if( /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {\n\n\t\t\t\t\t\t\tdispatchStateToMainWindow( data.state );\n\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t} );\n\n\t\t\t\t/**\n\t\t\t\t * Updates the presentation in the main window to match the state\n\t\t\t\t * of the presentation in the notes window.\n\t\t\t\t */\n\t\t\t\tconst dispatchStateToMainWindow = debounce(( state ) => {\n\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );\n\t\t\t\t}, 500);\n\n\t\t\t\t/**\n\t\t\t\t * Asynchronously calls the Reveal.js API of the main frame.\n\t\t\t\t */\n\t\t\t\tfunction callRevealApi( methodName, methodArguments, callback ) {\n\n\t\t\t\t\tvar callId = ++lastRevealApiCallId;\n\t\t\t\t\tpendingCalls[callId] = callback;\n\t\t\t\t\twindow.opener.postMessage( JSON.stringify( {\n\t\t\t\t\t\tnamespace: 'reveal-notes',\n\t\t\t\t\t\ttype: 'call',\n\t\t\t\t\t\tcallId: callId,\n\t\t\t\t\t\tmethodName: methodName,\n\t\t\t\t\t\targuments: methodArguments\n\t\t\t\t\t} ), '*' );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Called when the main window is trying to establish a\n\t\t\t\t * connection.\n\t\t\t\t */\n\t\t\t\tfunction handleConnectMessage( data ) {\n\n\t\t\t\t\tif( connected === false ) {\n\t\t\t\t\t\tconnected = true;\n\n\t\t\t\t\t\tsetupIframes( data );\n\t\t\t\t\t\tsetupKeyboard();\n\t\t\t\t\t\tsetupNotes();\n\t\t\t\t\t\tsetupTimer();\n\t\t\t\t\t\tsetupHeartbeat();\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Called when the main window sends an updated state.\n\t\t\t\t */\n\t\t\t\tfunction handleStateMessage( data ) {\n\n\t\t\t\t\t// Store the most recently set state to avoid circular loops\n\t\t\t\t\t// applying the same state\n\t\t\t\t\tcurrentState = JSON.stringify( data.state );\n\n\t\t\t\t\t// No need for updating the notes in case of fragment changes\n\t\t\t\t\tif ( data.notes ) {\n\t\t\t\t\t\tnotes.classList.remove( 'hidden' );\n\t\t\t\t\t\tnotesValue.style.whiteSpace = data.whitespace;\n\t\t\t\t\t\tif( data.markdown ) {\n\t\t\t\t\t\t\tnotesValue.innerHTML = marked( data.notes );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tnotesValue.innerHTML = data.notes;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tnotes.classList.add( 'hidden' );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Update the note slides\n\t\t\t\t\tcurrentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );\n\t\t\t\t\tupcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );\n\t\t\t\t\tupcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );\n\n\t\t\t\t}\n\n\t\t\t\t// Limit to max one state update per X ms\n\t\t\t\thandleStateMessage = debounce( handleStateMessage, 200 );\n\n\t\t\t\t/**\n\t\t\t\t * Forward keyboard events to the current slide window.\n\t\t\t\t * This enables keyboard events to work even if focus\n\t\t\t\t * isn't set on the current slide iframe.\n\t\t\t\t *\n\t\t\t\t * Block F5 default handling, it reloads and disconnects\n\t\t\t\t * the speaker notes window.\n\t\t\t\t */\n\t\t\t\tfunction setupKeyboard() {\n\n\t\t\t\t\tdocument.addEventListener( 'keydown', function( event ) {\n\t\t\t\t\t\tif( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {\n\t\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcurrentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Creates the preview iframes.\n\t\t\t\t */\n\t\t\t\tfunction setupIframes( data ) {\n\n\t\t\t\t\tvar params = [\n\t\t\t\t\t\t'receiver',\n\t\t\t\t\t\t'progress=false',\n\t\t\t\t\t\t'history=false',\n\t\t\t\t\t\t'transition=none',\n\t\t\t\t\t\t'autoSlide=0',\n\t\t\t\t\t\t'backgroundTransition=none'\n\t\t\t\t\t].join( '&' );\n\n\t\t\t\t\tvar urlSeparator = /\\?/.test(data.url) ? '&' : '?';\n\t\t\t\t\tvar hash = '#/' + data.state.indexh + '/' + data.state.indexv;\n\t\t\t\t\tvar currentURL = data.url + urlSeparator + params + '&postMessageEvents=true' + hash;\n\t\t\t\t\tvar upcomingURL = data.url + urlSeparator + params + '&controls=false' + hash;\n\n\t\t\t\t\tcurrentSlide = document.createElement( 'iframe' );\n\t\t\t\t\tcurrentSlide.setAttribute( 'width', 1280 );\n\t\t\t\t\tcurrentSlide.setAttribute( 'height', 1024 );\n\t\t\t\t\tcurrentSlide.setAttribute( 'src', currentURL );\n\t\t\t\t\tdocument.querySelector( '#current-slide' ).appendChild( currentSlide );\n\n\t\t\t\t\tupcomingSlide = document.createElement( 'iframe' );\n\t\t\t\t\tupcomingSlide.setAttribute( 'width', 640 );\n\t\t\t\t\tupcomingSlide.setAttribute( 'height', 512 );\n\t\t\t\t\tupcomingSlide.setAttribute( 'src', upcomingURL );\n\t\t\t\t\tdocument.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Setup the notes UI.\n\t\t\t\t */\n\t\t\t\tfunction setupNotes() {\n\n\t\t\t\t\tnotes = document.querySelector( '.speaker-controls-notes' );\n\t\t\t\t\tnotesValue = document.querySelector( '.speaker-controls-notes .value' );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * We send out a heartbeat at all times to ensure we can\n\t\t\t\t * reconnect with the main presentation window after reloads.\n\t\t\t\t */\n\t\t\t\tfunction setupHeartbeat() {\n\n\t\t\t\t\tsetInterval( () => {\n\t\t\t\t\t\twindow.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );\n\t\t\t\t\t}, 1000 );\n\n\t\t\t\t}\n\n\t\t\t\tfunction getTimings( callback ) {\n\n\t\t\t\t\tcallRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {\n\t\t\t\t\t\tcallRevealApi( 'getConfig', [], function ( config ) {\n\t\t\t\t\t\t\tvar totalTime = config.totalTime;\n\t\t\t\t\t\t\tvar minTimePerSlide = config.minimumTimePerSlide || 0;\n\t\t\t\t\t\t\tvar defaultTiming = config.defaultTiming;\n\t\t\t\t\t\t\tif ((defaultTiming == null) && (totalTime == null)) {\n\t\t\t\t\t\t\t\tcallback(null);\n\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t// Setting totalTime overrides defaultTiming\n\t\t\t\t\t\t\tif (totalTime) {\n\t\t\t\t\t\t\t\tdefaultTiming = 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tvar timings = [];\n\t\t\t\t\t\t\tfor ( var i in slideAttributes ) {\n\t\t\t\t\t\t\t\tvar slide = slideAttributes[ i ];\n\t\t\t\t\t\t\t\tvar timing = defaultTiming;\n\t\t\t\t\t\t\t\tif( slide.hasOwnProperty( 'data-timing' )) {\n\t\t\t\t\t\t\t\t\tvar t = slide[ 'data-timing' ];\n\t\t\t\t\t\t\t\t\ttiming = parseInt(t);\n\t\t\t\t\t\t\t\t\tif( isNaN(timing) ) {\n\t\t\t\t\t\t\t\t\t\tconsole.warn(\"Could not parse timing '\" + t + \"' of slide \" + i + \"; using default of \" + defaultTiming);\n\t\t\t\t\t\t\t\t\t\ttiming = defaultTiming;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\ttimings.push(timing);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif ( totalTime ) {\n\t\t\t\t\t\t\t\t// After we've allocated time to individual slides, we summarize it and\n\t\t\t\t\t\t\t\t// subtract it from the total time\n\t\t\t\t\t\t\t\tvar remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );\n\t\t\t\t\t\t\t\t// The remaining time is divided by the number of slides that have 0 seconds\n\t\t\t\t\t\t\t\t// allocated at the moment, giving the average time-per-slide on the remaining slides\n\t\t\t\t\t\t\t\tvar remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length\n\t\t\t\t\t\t\t\tvar timePerSlide = Math.round( remainingTime / remainingSlides, 0 )\n\t\t\t\t\t\t\t\t// And now we replace every zero-value timing with that average\n\t\t\t\t\t\t\t\ttimings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tvar slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length\n\t\t\t\t\t\t\tif ( slidesUnderMinimum ) {\n\t\t\t\t\t\t\t\tmessage = \"The pacing time for \" + slidesUnderMinimum + \" slide(s) is under the configured minimum of \" + minTimePerSlide + \" seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).\";\n\t\t\t\t\t\t\t\talert(message);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcallback( timings );\n\t\t\t\t\t\t} );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Return the number of seconds allocated for presenting\n\t\t\t\t * all slides up to and including this one.\n\t\t\t\t */\n\t\t\t\tfunction getTimeAllocated( timings, callback ) {\n\n\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\tvar allocated = 0;\n\t\t\t\t\t\tfor (var i in timings.slice(0, currentSlide + 1)) {\n\t\t\t\t\t\t\tallocated += timings[i];\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcallback( allocated );\n\t\t\t\t\t} );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Create the timer and clock and start updating them\n\t\t\t\t * at an interval.\n\t\t\t\t */\n\t\t\t\tfunction setupTimer() {\n\n\t\t\t\t\tvar start = new Date(),\n\t\t\t\t\ttimeEl = document.querySelector( '.speaker-controls-time' ),\n\t\t\t\t\tclockEl = timeEl.querySelector( '.clock-value' ),\n\t\t\t\t\thoursEl = timeEl.querySelector( '.hours-value' ),\n\t\t\t\t\tminutesEl = timeEl.querySelector( '.minutes-value' ),\n\t\t\t\t\tsecondsEl = timeEl.querySelector( '.seconds-value' ),\n\t\t\t\t\tpacingTitleEl = timeEl.querySelector( '.pacing-title' ),\n\t\t\t\t\tpacingEl = timeEl.querySelector( '.pacing' ),\n\t\t\t\t\tpacingHoursEl = pacingEl.querySelector( '.hours-value' ),\n\t\t\t\t\tpacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),\n\t\t\t\t\tpacingSecondsEl = pacingEl.querySelector( '.seconds-value' );\n\n\t\t\t\t\tvar timings = null;\n\t\t\t\t\tgetTimings( function ( _timings ) {\n\n\t\t\t\t\t\ttimings = _timings;\n\t\t\t\t\t\tif (_timings !== null) {\n\t\t\t\t\t\t\tpacingTitleEl.style.removeProperty('display');\n\t\t\t\t\t\t\tpacingEl.style.removeProperty('display');\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Update once directly\n\t\t\t\t\t\t_updateTimer();\n\n\t\t\t\t\t\t// Then update every second\n\t\t\t\t\t\tsetInterval( _updateTimer, 1000 );\n\n\t\t\t\t\t} );\n\n\n\t\t\t\t\tfunction _resetTimer() {\n\n\t\t\t\t\t\tif (timings == null) {\n\t\t\t\t\t\t\tstart = new Date();\n\t\t\t\t\t\t\t_updateTimer();\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t// Reset timer to beginning of current slide\n\t\t\t\t\t\t\tgetTimeAllocated( timings, function ( slideEndTimingSeconds ) {\n\t\t\t\t\t\t\t\tvar slideEndTiming = slideEndTimingSeconds * 1000;\n\t\t\t\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\t\t\t\tvar currentSlideTiming = timings[currentSlide] * 1000;\n\t\t\t\t\t\t\t\t\tvar previousSlidesTiming = slideEndTiming - currentSlideTiming;\n\t\t\t\t\t\t\t\t\tvar now = new Date();\n\t\t\t\t\t\t\t\t\tstart = new Date(now.getTime() - previousSlidesTiming);\n\t\t\t\t\t\t\t\t\t_updateTimer();\n\t\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\ttimeEl.addEventListener( 'click', function() {\n\t\t\t\t\t\t_resetTimer();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t} );\n\n\t\t\t\t\tfunction _displayTime( hrEl, minEl, secEl, time) {\n\n\t\t\t\t\t\tvar sign = Math.sign(time) == -1 ? \"-\" : \"\";\n\t\t\t\t\t\ttime = Math.abs(Math.round(time / 1000));\n\t\t\t\t\t\tvar seconds = time % 60;\n\t\t\t\t\t\tvar minutes = Math.floor( time / 60 ) % 60 ;\n\t\t\t\t\t\tvar hours = Math.floor( time / ( 60 * 60 )) ;\n\t\t\t\t\t\thrEl.innerHTML = sign + zeroPadInteger( hours );\n\t\t\t\t\t\tif (hours == 0) {\n\t\t\t\t\t\t\thrEl.classList.add( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\thrEl.classList.remove( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\tminEl.innerHTML = ':' + zeroPadInteger( minutes );\n\t\t\t\t\t\tif (hours == 0 && minutes == 0) {\n\t\t\t\t\t\t\tminEl.classList.add( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tminEl.classList.remove( 'mute' );\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsecEl.innerHTML = ':' + zeroPadInteger( seconds );\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction _updateTimer() {\n\n\t\t\t\t\t\tvar diff, hours, minutes, seconds,\n\t\t\t\t\t\tnow = new Date();\n\n\t\t\t\t\t\tdiff = now.getTime() - start.getTime();\n\n\t\t\t\t\t\tclockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );\n\t\t\t\t\t\t_displayTime( hoursEl, minutesEl, secondsEl, diff );\n\t\t\t\t\t\tif (timings !== null) {\n\t\t\t\t\t\t\t_updatePacing(diff);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfunction _updatePacing(diff) {\n\n\t\t\t\t\t\tgetTimeAllocated( timings, function ( slideEndTimingSeconds ) {\n\t\t\t\t\t\t\tvar slideEndTiming = slideEndTimingSeconds * 1000;\n\n\t\t\t\t\t\t\tcallRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {\n\t\t\t\t\t\t\t\tvar currentSlideTiming = timings[currentSlide] * 1000;\n\t\t\t\t\t\t\t\tvar timeLeftCurrentSlide = slideEndTiming - diff;\n\t\t\t\t\t\t\t\tif (timeLeftCurrentSlide < 0) {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing behind';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\telse if (timeLeftCurrentSlide < currentSlideTiming) {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing on-track';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\tpacingEl.className = 'pacing ahead';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t} );\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Sets up the speaker view layout and layout selector.\n\t\t\t\t */\n\t\t\t\tfunction setupLayout() {\n\n\t\t\t\t\tlayoutDropdown = document.querySelector( '.speaker-layout-dropdown' );\n\t\t\t\t\tlayoutLabel = document.querySelector( '.speaker-layout-label' );\n\n\t\t\t\t\t// Render the list of available layouts\n\t\t\t\t\tfor( var id in SPEAKER_LAYOUTS ) {\n\t\t\t\t\t\tvar option = document.createElement( 'option' );\n\t\t\t\t\t\toption.setAttribute( 'value', id );\n\t\t\t\t\t\toption.textContent = SPEAKER_LAYOUTS[ id ];\n\t\t\t\t\t\tlayoutDropdown.appendChild( option );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Monitor the dropdown for changes\n\t\t\t\t\tlayoutDropdown.addEventListener( 'change', function( event ) {\n\n\t\t\t\t\t\tsetLayout( layoutDropdown.value );\n\n\t\t\t\t\t}, false );\n\n\t\t\t\t\t// Restore any currently persisted layout\n\t\t\t\t\tsetLayout( getLayout() );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Sets a new speaker view layout. The layout is persisted\n\t\t\t\t * in local storage.\n\t\t\t\t */\n\t\t\t\tfunction setLayout( value ) {\n\n\t\t\t\t\tvar title = SPEAKER_LAYOUTS[ value ];\n\n\t\t\t\t\tlayoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );\n\t\t\t\t\tlayoutDropdown.value = value;\n\n\t\t\t\t\tdocument.body.setAttribute( 'data-speaker-layout', value );\n\n\t\t\t\t\t// Persist locally\n\t\t\t\t\tif( supportsLocalStorage() ) {\n\t\t\t\t\t\twindow.localStorage.setItem( 'reveal-speaker-layout', value );\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Returns the ID of the most recently set speaker layout\n\t\t\t\t * or our default layout if none has been set.\n\t\t\t\t */\n\t\t\t\tfunction getLayout() {\n\n\t\t\t\t\tif( supportsLocalStorage() ) {\n\t\t\t\t\t\tvar layout = window.localStorage.getItem( 'reveal-speaker-layout' );\n\t\t\t\t\t\tif( layout ) {\n\t\t\t\t\t\t\treturn layout;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Default to the first record in the layouts hash\n\t\t\t\t\tfor( var id in SPEAKER_LAYOUTS ) {\n\t\t\t\t\t\treturn id;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tfunction supportsLocalStorage() {\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tlocalStorage.setItem('test', 'test');\n\t\t\t\t\t\tlocalStorage.removeItem('test');\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t\tcatch( e ) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tfunction zeroPadInteger( num ) {\n\n\t\t\t\t\tvar str = '00' + parseInt( num );\n\t\t\t\t\treturn str.substring( str.length - 2 );\n\n\t\t\t\t}\n\n\t\t\t\t/**\n\t\t\t\t * Limits the frequency at which a function can be called.\n\t\t\t\t */\n\t\t\t\tfunction debounce( fn, ms ) {\n\n\t\t\t\t\tvar lastTime = 0,\n\t\t\t\t\t\ttimeout;\n\n\t\t\t\t\treturn function() {\n\n\t\t\t\t\t\tvar args = arguments;\n\t\t\t\t\t\tvar context = this;\n\n\t\t\t\t\t\tclearTimeout( timeout );\n\n\t\t\t\t\t\tvar timeSinceLastCall = Date.now() - lastTime;\n\t\t\t\t\t\tif( timeSinceLastCall > ms ) {\n\t\t\t\t\t\t\tfn.apply( context, args );\n\t\t\t\t\t\t\tlastTime = Date.now();\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\ttimeout = setTimeout( function() {\n\t\t\t\t\t\t\t\tfn.apply( context, args );\n\t\t\t\t\t\t\t\tlastTime = Date.now();\n\t\t\t\t\t\t\t}, ms - timeSinceLastCall );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t})();\n\n\t\t</script>\n\t</body>\n</html>",
				),
				!n)
			)
				return void alert(
					'Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.',
				);
			!(function () {
				const s = e.getConfig().url,
					i =
						'string' == typeof s
							? s
							: window.location.protocol +
							  '//' +
							  window.location.host +
							  window.location.pathname +
							  window.location.search;
				(t = setInterval(function () {
					n.postMessage(
						JSON.stringify({
							namespace: 'reveal-notes',
							type: 'connect',
							state: e.getState(),
							url: i,
						}),
						'*',
					);
				}, 500)),
					window.addEventListener('message', r);
			})();
		}
	}
	function i(t) {
		let s = e.getCurrentSlide(),
			i = s.querySelectorAll('aside.notes'),
			r = s.querySelector('.current-fragment'),
			a = {
				namespace: 'reveal-notes',
				type: 'state',
				notes: '',
				markdown: !1,
				whitespace: 'normal',
				state: e.getState(),
			};
		if (
			(s.hasAttribute('data-notes') &&
				((a.notes = s.getAttribute('data-notes')),
				(a.whitespace = 'pre-wrap')),
			r)
		) {
			let t = r.querySelector('aside.notes');
			t
				? ((a.notes = t.innerHTML),
				  (a.markdown =
						'string' == typeof t.getAttribute('data-markdown')),
				  (i = null))
				: r.hasAttribute('data-notes') &&
				  ((a.notes = r.getAttribute('data-notes')),
				  (a.whitespace = 'pre-wrap'),
				  (i = null));
		}
		i &&
			((a.notes = Array.from(i)
				.map((t) => t.innerHTML)
				.join('\n')),
			(a.markdown =
				i[0] && 'string' == typeof i[0].getAttribute('data-markdown'))),
			n.postMessage(JSON.stringify(a), '*');
	}
	function r(s) {
		if (
			(function (t) {
				try {
					return window.location.origin === t.source.location.origin;
				} catch (t) {
					return !1;
				}
			})(s)
		) {
			let i = JSON.parse(s.data);
			i && 'reveal-notes' === i.namespace && 'connected' === i.type
				? (clearInterval(t), a())
				: i &&
				  'reveal-notes' === i.namespace &&
				  'call' === i.type &&
				  (function (t, s, i) {
						let r = e[t].apply(e, s);
						n.postMessage(
							JSON.stringify({
								namespace: 'reveal-notes',
								type: 'return',
								result: r,
								callId: i,
							}),
							'*',
						);
				  })(i.methodName, i.arguments, i.callId);
		}
	}
	function a() {
		e.on('slidechanged', i),
			e.on('fragmentshown', i),
			e.on('fragmenthidden', i),
			e.on('overviewhidden', i),
			e.on('overviewshown', i),
			e.on('paused', i),
			e.on('resumed', i),
			i();
	}
	return {
		id: 'notes',
		init: function (t) {
			(e = t),
				/receiver/i.test(window.location.search) ||
					(null !== window.location.search.match(/(\?|\&)notes/gi)
						? s()
						: window.addEventListener('message', (t) => {
								if (!n && 'string' == typeof t.data) {
									let s;
									try {
										s = JSON.parse(t.data);
									} catch (t) {}
									s &&
										'reveal-notes' === s.namespace &&
										'heartbeat' === s.type &&
										((e = t.source),
										n && !n.closed
											? n.focus()
											: ((n = e),
											  window.addEventListener(
													'message',
													r,
											  ),
											  a()));
								}
								var e;
						  }),
					e.addKeyBinding(
						{
							keyCode: 83,
							key: 'S',
							description: 'Speaker notes view',
						},
						function () {
							s();
						},
					));
		},
		open: s,
	};
};
export { E as default };
