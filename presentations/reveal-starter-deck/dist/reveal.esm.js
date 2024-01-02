/*!
 * reveal.js 1.0.0
 * undefined
 * MIT licensed
 *
 * Copyright (C) 2011-2023 Hakim El Hattab, https://hakim.se
 */
const e = (e, t) => {
		for (let i in t) e[i] = t[i];
		return e;
	},
	t = (e, t) => Array.from(e.querySelectorAll(t)),
	i = (e, t, i) => {
		i ? e.classList.add(t) : e.classList.remove(t);
	},
	s = (e) => {
		if ('string' == typeof e) {
			if ('null' === e) return null;
			if ('true' === e) return !0;
			if ('false' === e) return !1;
			if (e.match(/^-?[\d\.]+$/)) return parseFloat(e);
		}
		return e;
	},
	n = (e, t) => {
		e.style.transform = t;
	},
	a = (e, t) => {
		let i = e.matches || e.matchesSelector || e.msMatchesSelector;
		return !(!i || !i.call(e, t));
	},
	o = (e, t) => {
		if ('function' == typeof e.closest) return e.closest(t);
		for (; e; ) {
			if (a(e, t)) return e;
			e = e.parentNode;
		}
		return null;
	},
	r = (e) => {
		let t = document.createElement('style');
		return (
			(t.type = 'text/css'),
			e &&
				e.length > 0 &&
				(t.styleSheet
					? (t.styleSheet.cssText = e)
					: t.appendChild(document.createTextNode(e))),
			document.head.appendChild(t),
			t
		);
	},
	l = () => {
		let e = {};
		location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, (t) => {
			e[t.split('=').shift()] = t.split('=').pop();
		});
		for (let t in e) {
			let i = e[t];
			e[t] = s(unescape(i));
		}
		return void 0 !== e.dependencies && delete e.dependencies, e;
	},
	d = {
		mp4: 'video/mp4',
		m4a: 'video/mp4',
		ogv: 'video/ogg',
		mpeg: 'video/mpeg',
		webm: 'video/webm',
	},
	c = navigator.userAgent,
	h =
		/(iphone|ipod|ipad|android)/gi.test(c) ||
		('MacIntel' === navigator.platform && navigator.maxTouchPoints > 1),
	u = /android/gi.test(c);
var g = (function (e) {
	if (e) {
		var t = function (e) {
				return [].slice.call(e);
			},
			i = 3,
			s = [],
			n = null,
			a =
				'requestAnimationFrame' in e
					? function () {
							e.cancelAnimationFrame(n),
								(n = e.requestAnimationFrame(function () {
									return r(
										s.filter(function (e) {
											return e.dirty && e.active;
										}),
									);
								}));
					  }
					: function () {},
			o = function (e) {
				return function () {
					s.forEach(function (t) {
						return (t.dirty = e);
					}),
						a();
				};
			},
			r = function (e) {
				e
					.filter(function (e) {
						return !e.styleComputed;
					})
					.forEach(function (e) {
						e.styleComputed = h(e);
					}),
					e.filter(u).forEach(g);
				var t = e.filter(c);
				t.forEach(d),
					t.forEach(function (e) {
						g(e), l(e);
					}),
					t.forEach(v);
			},
			l = function (e) {
				return (e.dirty = 0);
			},
			d = function (e) {
				(e.availableWidth = e.element.parentNode.clientWidth),
					(e.currentWidth = e.element.scrollWidth),
					(e.previousFontSize = e.currentFontSize),
					(e.currentFontSize = Math.min(
						Math.max(
							e.minSize,
							(e.availableWidth / e.currentWidth) *
								e.previousFontSize,
						),
						e.maxSize,
					)),
					(e.whiteSpace =
						e.multiLine && e.currentFontSize === e.minSize
							? 'normal'
							: 'nowrap');
			},
			c = function (e) {
				return (
					2 !== e.dirty ||
					(2 === e.dirty &&
						e.element.parentNode.clientWidth !== e.availableWidth)
				);
			},
			h = function (t) {
				var i = e.getComputedStyle(t.element, null);
				return (
					(t.currentFontSize = parseFloat(
						i.getPropertyValue('font-size'),
					)),
					(t.display = i.getPropertyValue('display')),
					(t.whiteSpace = i.getPropertyValue('white-space')),
					!0
				);
			},
			u = function (e) {
				var t = !1;
				return (
					!e.preStyleTestCompleted &&
					(/inline-/.test(e.display) ||
						((t = !0), (e.display = 'inline-block')),
					'nowrap' !== e.whiteSpace &&
						((t = !0), (e.whiteSpace = 'nowrap')),
					(e.preStyleTestCompleted = !0),
					t)
				);
			},
			g = function (e) {
				(e.element.style.whiteSpace = e.whiteSpace),
					(e.element.style.display = e.display),
					(e.element.style.fontSize = e.currentFontSize + 'px');
			},
			v = function (e) {
				e.element.dispatchEvent(
					new CustomEvent('fit', {
						detail: {
							oldValue: e.previousFontSize,
							newValue: e.currentFontSize,
							scaleFactor: e.currentFontSize / e.previousFontSize,
						},
					}),
				);
			},
			p = function (e, t) {
				return function () {
					(e.dirty = t), e.active && a();
				};
			},
			m = function (e) {
				return function () {
					(s = s.filter(function (t) {
						return t.element !== e.element;
					})),
						e.observeMutations && e.observer.disconnect(),
						(e.element.style.whiteSpace =
							e.originalStyle.whiteSpace),
						(e.element.style.display = e.originalStyle.display),
						(e.element.style.fontSize = e.originalStyle.fontSize);
				};
			},
			f = function (e) {
				return function () {
					e.active || ((e.active = !0), a());
				};
			},
			b = function (e) {
				return function () {
					return (e.active = !1);
				};
			},
			y = function (e) {
				e.observeMutations &&
					((e.observer = new MutationObserver(p(e, 1))),
					e.observer.observe(e.element, e.observeMutations));
			},
			w = {
				minSize: 16,
				maxSize: 512,
				multiLine: !0,
				observeMutations: 'MutationObserver' in e && {
					subtree: !0,
					childList: !0,
					characterData: !0,
				},
			},
			E = null,
			R = function () {
				e.clearTimeout(E),
					(E = e.setTimeout(o(2), k.observeWindowDelay));
			},
			S = ['resize', 'orientationchange'];
		return (
			Object.defineProperty(k, 'observeWindow', {
				set: function (t) {
					var i = ''.concat(t ? 'add' : 'remove', 'EventListener');
					S.forEach(function (t) {
						e[i](t, R);
					});
				},
			}),
			(k.observeWindow = !0),
			(k.observeWindowDelay = 100),
			(k.fitAll = o(i)),
			k
		);
	}
	function A(e, t) {
		var n = Object.assign({}, w, t),
			o = e.map(function (e) {
				var t = Object.assign({}, n, { element: e, active: !0 });
				return (
					(function (e) {
						(e.originalStyle = {
							whiteSpace: e.element.style.whiteSpace,
							display: e.element.style.display,
							fontSize: e.element.style.fontSize,
						}),
							y(e),
							(e.newbie = !0),
							(e.dirty = !0),
							s.push(e);
					})(t),
					{
						element: e,
						fit: p(t, i),
						unfreeze: f(t),
						freeze: b(t),
						unsubscribe: m(t),
					}
				);
			});
		return a(), o;
	}
	function k(e) {
		var i =
			arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		return 'string' == typeof e
			? A(t(document.querySelectorAll(e)), i)
			: A([e], i)[0];
	}
})('undefined' == typeof window ? null : window);
class v {
	constructor(e) {
		(this.Reveal = e),
			(this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this));
	}
	shouldPreload(e) {
		let t = this.Reveal.getConfig().preloadIframes;
		return 'boolean' != typeof t && (t = e.hasAttribute('data-preload')), t;
	}
	load(e, i = {}) {
		(e.style.display = this.Reveal.getConfig().display),
			t(
				e,
				'img[data-src], video[data-src], audio[data-src], iframe[data-src]',
			).forEach((e) => {
				('IFRAME' !== e.tagName || this.shouldPreload(e)) &&
					(e.setAttribute('src', e.getAttribute('data-src')),
					e.setAttribute('data-lazy-loaded', ''),
					e.removeAttribute('data-src'));
			}),
			t(e, 'video, audio').forEach((e) => {
				let i = 0;
				t(e, 'source[data-src]').forEach((e) => {
					e.setAttribute('src', e.getAttribute('data-src')),
						e.removeAttribute('data-src'),
						e.setAttribute('data-lazy-loaded', ''),
						(i += 1);
				}),
					h &&
						'VIDEO' === e.tagName &&
						e.setAttribute('playsinline', ''),
					i > 0 && e.load();
			});
		let s = e.slideBackgroundElement;
		if (s) {
			s.style.display = 'block';
			let t = e.slideBackgroundContentElement,
				n = e.getAttribute('data-background-iframe');
			if (!1 === s.hasAttribute('data-loaded')) {
				s.setAttribute('data-loaded', 'true');
				let a = e.getAttribute('data-background-image'),
					o = e.getAttribute('data-background-video'),
					r = e.hasAttribute('data-background-video-loop'),
					l = e.hasAttribute('data-background-video-muted');
				if (a)
					/^data:/.test(a.trim())
						? (t.style.backgroundImage = `url(${a.trim()})`)
						: (t.style.backgroundImage = a
								.split(',')
								.map(
									(e) =>
										`url(${((e = '') =>
											encodeURI(e)
												.replace(/%5B/g, '[')
												.replace(/%5D/g, ']')
												.replace(
													/[!'()*]/g,
													(e) =>
														`%${e
															.charCodeAt(0)
															.toString(16)
															.toUpperCase()}`,
												))(decodeURI(e.trim()))})`,
								)
								.join(','));
				else if (o && !this.Reveal.isSpeakerNotes()) {
					let e = document.createElement('video');
					r && e.setAttribute('loop', ''),
						l && (e.muted = !0),
						h &&
							((e.muted = !0), e.setAttribute('playsinline', '')),
						o.split(',').forEach((t) => {
							let i = ((e = '') => d[e.split('.').pop()])(t);
							e.innerHTML += i
								? `<source src="${t}" type="${i}">`
								: `<source src="${t}">`;
						}),
						t.appendChild(e);
				} else if (n && !0 !== i.excludeIframes) {
					let e = document.createElement('iframe');
					e.setAttribute('allowfullscreen', ''),
						e.setAttribute('mozallowfullscreen', ''),
						e.setAttribute('webkitallowfullscreen', ''),
						e.setAttribute('allow', 'autoplay'),
						e.setAttribute('data-src', n),
						(e.style.width = '100%'),
						(e.style.height = '100%'),
						(e.style.maxHeight = '100%'),
						(e.style.maxWidth = '100%'),
						t.appendChild(e);
				}
			}
			let a = t.querySelector('iframe[data-src]');
			a &&
				this.shouldPreload(s) &&
				!/autoplay=(1|true|yes)/gi.test(n) &&
				a.getAttribute('src') !== n &&
				a.setAttribute('src', n);
		}
		this.layout(e);
	}
	layout(e) {
		Array.from(e.querySelectorAll('.r-fit-text')).forEach((e) => {
			g(e, {
				minSize: 24,
				maxSize: 0.8 * this.Reveal.getConfig().height,
				observeMutations: !1,
				observeWindow: !1,
			});
		});
	}
	unload(e) {
		e.style.display = 'none';
		let i = this.Reveal.getSlideBackground(e);
		i &&
			((i.style.display = 'none'),
			t(i, 'iframe[src]').forEach((e) => {
				e.removeAttribute('src');
			})),
			t(
				e,
				'video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]',
			).forEach((e) => {
				e.setAttribute('data-src', e.getAttribute('src')),
					e.removeAttribute('src');
			}),
			t(
				e,
				'video[data-lazy-loaded] source[src], audio source[src]',
			).forEach((e) => {
				e.setAttribute('data-src', e.getAttribute('src')),
					e.removeAttribute('src');
			});
	}
	formatEmbeddedContent() {
		let e = (e, i, s) => {
			t(
				this.Reveal.getSlidesElement(),
				'iframe[' + e + '*="' + i + '"]',
			).forEach((t) => {
				let i = t.getAttribute(e);
				i &&
					-1 === i.indexOf(s) &&
					t.setAttribute(e, i + (/\?/.test(i) ? '&' : '?') + s);
			});
		};
		e('src', 'youtube.com/embed/', 'enablejsapi=1'),
			e('data-src', 'youtube.com/embed/', 'enablejsapi=1'),
			e('src', 'player.vimeo.com/', 'api=1'),
			e('data-src', 'player.vimeo.com/', 'api=1');
	}
	startEmbeddedContent(e) {
		e &&
			!this.Reveal.isSpeakerNotes() &&
			(t(e, 'img[src$=".gif"]').forEach((e) => {
				e.setAttribute('src', e.getAttribute('src'));
			}),
			t(e, 'video, audio').forEach((e) => {
				if (o(e, '.fragment') && !o(e, '.fragment.visible')) return;
				let t = this.Reveal.getConfig().autoPlayMedia;
				if (
					('boolean' != typeof t &&
						(t =
							e.hasAttribute('data-autoplay') ||
							!!o(e, '.slide-background')),
					t && 'function' == typeof e.play)
				)
					if (e.readyState > 1)
						this.startEmbeddedMedia({ target: e });
					else if (h) {
						let t = e.play();
						t &&
							'function' == typeof t.catch &&
							!1 === e.controls &&
							t.catch(() => {
								(e.controls = !0),
									e.addEventListener('play', () => {
										e.controls = !1;
									});
							});
					} else
						e.removeEventListener(
							'loadeddata',
							this.startEmbeddedMedia,
						),
							e.addEventListener(
								'loadeddata',
								this.startEmbeddedMedia,
							);
			}),
			t(e, 'iframe[src]').forEach((e) => {
				(o(e, '.fragment') && !o(e, '.fragment.visible')) ||
					this.startEmbeddedIframe({ target: e });
			}),
			t(e, 'iframe[data-src]').forEach((e) => {
				(o(e, '.fragment') && !o(e, '.fragment.visible')) ||
					(e.getAttribute('src') !== e.getAttribute('data-src') &&
						(e.removeEventListener(
							'load',
							this.startEmbeddedIframe,
						),
						e.addEventListener('load', this.startEmbeddedIframe),
						e.setAttribute('src', e.getAttribute('data-src'))));
			}));
	}
	startEmbeddedMedia(e) {
		let t = !!o(e.target, 'html'),
			i = !!o(e.target, '.present');
		t && i && ((e.target.currentTime = 0), e.target.play()),
			e.target.removeEventListener('loadeddata', this.startEmbeddedMedia);
	}
	startEmbeddedIframe(e) {
		let t = e.target;
		if (t && t.contentWindow) {
			let i = !!o(e.target, 'html'),
				s = !!o(e.target, '.present');
			if (i && s) {
				let e = this.Reveal.getConfig().autoPlayMedia;
				'boolean' != typeof e &&
					(e =
						t.hasAttribute('data-autoplay') ||
						!!o(t, '.slide-background')),
					/youtube\.com\/embed\//.test(t.getAttribute('src')) && e
						? t.contentWindow.postMessage(
								'{"event":"command","func":"playVideo","args":""}',
								'*',
						  )
						: /player\.vimeo\.com\//.test(t.getAttribute('src')) &&
						    e
						  ? t.contentWindow.postMessage(
									'{"method":"play"}',
									'*',
						    )
						  : t.contentWindow.postMessage('slide:start', '*');
			}
		}
	}
	stopEmbeddedContent(i, s = {}) {
		(s = e({ unloadIframes: !0 }, s)),
			i &&
				i.parentNode &&
				(t(i, 'video, audio').forEach((e) => {
					e.hasAttribute('data-ignore') ||
						'function' != typeof e.pause ||
						(e.setAttribute('data-paused-by-reveal', ''),
						e.pause());
				}),
				t(i, 'iframe').forEach((e) => {
					e.contentWindow &&
						e.contentWindow.postMessage('slide:stop', '*'),
						e.removeEventListener('load', this.startEmbeddedIframe);
				}),
				t(i, 'iframe[src*="youtube.com/embed/"]').forEach((e) => {
					!e.hasAttribute('data-ignore') &&
						e.contentWindow &&
						'function' == typeof e.contentWindow.postMessage &&
						e.contentWindow.postMessage(
							'{"event":"command","func":"pauseVideo","args":""}',
							'*',
						);
				}),
				t(i, 'iframe[src*="player.vimeo.com/"]').forEach((e) => {
					!e.hasAttribute('data-ignore') &&
						e.contentWindow &&
						'function' == typeof e.contentWindow.postMessage &&
						e.contentWindow.postMessage('{"method":"pause"}', '*');
				}),
				!0 === s.unloadIframes &&
					t(i, 'iframe[data-src]').forEach((e) => {
						e.setAttribute('src', 'about:blank'),
							e.removeAttribute('src');
					}));
	}
}
class p {
	constructor(e) {
		this.Reveal = e;
	}
	render() {
		(this.element = document.createElement('div')),
			(this.element.className = 'slide-number'),
			this.Reveal.getRevealElement().appendChild(this.element);
	}
	configure(e, t) {
		let i = 'none';
		e.slideNumber &&
			!this.Reveal.isPrintingPDF() &&
			('all' === e.showSlideNumber ||
				('speaker' === e.showSlideNumber &&
					this.Reveal.isSpeakerNotes())) &&
			(i = 'block'),
			(this.element.style.display = i);
	}
	update() {
		this.Reveal.getConfig().slideNumber &&
			this.element &&
			(this.element.innerHTML = this.getSlideNumber());
	}
	getSlideNumber(e = this.Reveal.getCurrentSlide()) {
		let t,
			i = this.Reveal.getConfig(),
			s = 'h.v';
		if ('function' == typeof i.slideNumber) t = i.slideNumber(e);
		else {
			'string' == typeof i.slideNumber && (s = i.slideNumber),
				/c/.test(s) ||
					1 !== this.Reveal.getHorizontalSlides().length ||
					(s = 'c');
			let n = e && 'uncounted' === e.dataset.visibility ? 0 : 1;
			switch (((t = []), s)) {
				case 'c':
					t.push(this.Reveal.getSlidePastCount(e) + n);
					break;
				case 'c/t':
					t.push(
						this.Reveal.getSlidePastCount(e) + n,
						'/',
						this.Reveal.getTotalSlides(),
					);
					break;
				default:
					let i = this.Reveal.getIndices(e);
					t.push(i.h + n);
					let a = 'h/v' === s ? '/' : '.';
					this.Reveal.isVerticalSlide(e) && t.push(a, i.v + 1);
			}
		}
		let n = '#' + this.Reveal.location.getHash(e);
		return this.formatNumber(t[0], t[1], t[2], n);
	}
	formatNumber(e, t, i, s = '#' + this.Reveal.location.getHash()) {
		return 'number' != typeof i || isNaN(i)
			? `<a href="${s}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t</a>`
			: `<a href="${s}">\n\t\t\t\t\t<span class="slide-number-a">${e}</span>\n\t\t\t\t\t<span class="slide-number-delimiter">${t}</span>\n\t\t\t\t\t<span class="slide-number-b">${i}</span>\n\t\t\t\t\t</a>`;
	}
	destroy() {
		this.element.remove();
	}
}
class m {
	constructor(e) {
		(this.Reveal = e),
			(this.onInput = this.onInput.bind(this)),
			(this.onBlur = this.onBlur.bind(this)),
			(this.onKeyDown = this.onKeyDown.bind(this));
	}
	render() {
		(this.element = document.createElement('div')),
			(this.element.className = 'jump-to-slide'),
			(this.jumpInput = document.createElement('input')),
			(this.jumpInput.type = 'text'),
			(this.jumpInput.className = 'jump-to-slide-input'),
			(this.jumpInput.placeholder = 'Jump to slide'),
			this.jumpInput.addEventListener('input', this.onInput),
			this.jumpInput.addEventListener('keydown', this.onKeyDown),
			this.jumpInput.addEventListener('blur', this.onBlur),
			this.element.appendChild(this.jumpInput);
	}
	show() {
		(this.indicesOnShow = this.Reveal.getIndices()),
			this.Reveal.getRevealElement().appendChild(this.element),
			this.jumpInput.focus();
	}
	hide() {
		this.isVisible() &&
			(this.element.remove(),
			(this.jumpInput.value = ''),
			clearTimeout(this.jumpTimeout),
			delete this.jumpTimeout);
	}
	isVisible() {
		return !!this.element.parentNode;
	}
	jump() {
		clearTimeout(this.jumpTimeout), delete this.jumpTimeout;
		const e = this.jumpInput.value.trim('');
		let t = this.Reveal.location.getIndicesFromHash(e, {
			oneBasedIndex: !0,
		});
		return (
			!t && /\S+/i.test(e) && e.length > 1 && (t = this.search(e)),
			t && '' !== e
				? (this.Reveal.slide(t.h, t.v, t.f), !0)
				: (this.Reveal.slide(
						this.indicesOnShow.h,
						this.indicesOnShow.v,
						this.indicesOnShow.f,
				  ),
				  !1)
		);
	}
	jumpAfter(e) {
		clearTimeout(this.jumpTimeout),
			(this.jumpTimeout = setTimeout(() => this.jump(), e));
	}
	search(e) {
		const t = new RegExp('\\b' + e.trim() + '\\b', 'i'),
			i = this.Reveal.getSlides().find((e) => t.test(e.innerText));
		return i ? this.Reveal.getIndices(i) : null;
	}
	cancel() {
		this.Reveal.slide(
			this.indicesOnShow.h,
			this.indicesOnShow.v,
			this.indicesOnShow.f,
		),
			this.hide();
	}
	confirm() {
		this.jump(), this.hide();
	}
	destroy() {
		this.jumpInput.removeEventListener('input', this.onInput),
			this.jumpInput.removeEventListener('keydown', this.onKeyDown),
			this.jumpInput.removeEventListener('blur', this.onBlur),
			this.element.remove();
	}
	onKeyDown(e) {
		13 === e.keyCode
			? this.confirm()
			: 27 === e.keyCode && (this.cancel(), e.stopImmediatePropagation());
	}
	onInput(e) {
		this.jumpAfter(200);
	}
	onBlur() {
		setTimeout(() => this.hide(), 1);
	}
}
const f = (e) => {
	let t = e.match(/^#([0-9a-f]{3})$/i);
	if (t && t[1])
		return (
			(t = t[1]),
			{
				r: 17 * parseInt(t.charAt(0), 16),
				g: 17 * parseInt(t.charAt(1), 16),
				b: 17 * parseInt(t.charAt(2), 16),
			}
		);
	let i = e.match(/^#([0-9a-f]{6})$/i);
	if (i && i[1])
		return (
			(i = i[1]),
			{
				r: parseInt(i.slice(0, 2), 16),
				g: parseInt(i.slice(2, 4), 16),
				b: parseInt(i.slice(4, 6), 16),
			}
		);
	let s = e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	if (s)
		return {
			r: parseInt(s[1], 10),
			g: parseInt(s[2], 10),
			b: parseInt(s[3], 10),
		};
	let n = e.match(
		/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i,
	);
	return n
		? {
				r: parseInt(n[1], 10),
				g: parseInt(n[2], 10),
				b: parseInt(n[3], 10),
				a: parseFloat(n[4]),
		  }
		: null;
};
class b {
	constructor(e) {
		this.Reveal = e;
	}
	render() {
		(this.element = document.createElement('div')),
			(this.element.className = 'backgrounds'),
			this.Reveal.getRevealElement().appendChild(this.element);
	}
	create() {
		(this.element.innerHTML = ''),
			this.element.classList.add('no-transition'),
			this.Reveal.getHorizontalSlides().forEach((e) => {
				let i = this.createBackground(e, this.element);
				t(e, 'section').forEach((e) => {
					this.createBackground(e, i), i.classList.add('stack');
				});
			}),
			this.Reveal.getConfig().parallaxBackgroundImage
				? ((this.element.style.backgroundImage =
						'url("' +
						this.Reveal.getConfig().parallaxBackgroundImage +
						'")'),
				  (this.element.style.backgroundSize =
						this.Reveal.getConfig().parallaxBackgroundSize),
				  (this.element.style.backgroundRepeat =
						this.Reveal.getConfig().parallaxBackgroundRepeat),
				  (this.element.style.backgroundPosition =
						this.Reveal.getConfig().parallaxBackgroundPosition),
				  setTimeout(() => {
						this.Reveal.getRevealElement().classList.add(
							'has-parallax-background',
						);
				  }, 1))
				: ((this.element.style.backgroundImage = ''),
				  this.Reveal.getRevealElement().classList.remove(
						'has-parallax-background',
				  ));
	}
	createBackground(e, t) {
		let i = document.createElement('div');
		i.className =
			'slide-background ' +
			e.className.replace(/present|past|future/, '');
		let s = document.createElement('div');
		return (
			(s.className = 'slide-background-content'),
			i.appendChild(s),
			t.appendChild(i),
			(e.slideBackgroundElement = i),
			(e.slideBackgroundContentElement = s),
			this.sync(e),
			i
		);
	}
	sync(e) {
		const t = e.slideBackgroundElement,
			i = e.slideBackgroundContentElement,
			s = {
				background: e.getAttribute('data-background'),
				backgroundSize: e.getAttribute('data-background-size'),
				backgroundImage: e.getAttribute('data-background-image'),
				backgroundVideo: e.getAttribute('data-background-video'),
				backgroundIframe: e.getAttribute('data-background-iframe'),
				backgroundColor: e.getAttribute('data-background-color'),
				backgroundGradient: e.getAttribute('data-background-gradient'),
				backgroundRepeat: e.getAttribute('data-background-repeat'),
				backgroundPosition: e.getAttribute('data-background-position'),
				backgroundTransition: e.getAttribute(
					'data-background-transition',
				),
				backgroundOpacity: e.getAttribute('data-background-opacity'),
			},
			n = e.hasAttribute('data-preload');
		e.classList.remove('has-dark-background'),
			e.classList.remove('has-light-background'),
			t.removeAttribute('data-loaded'),
			t.removeAttribute('data-background-hash'),
			t.removeAttribute('data-background-size'),
			t.removeAttribute('data-background-transition'),
			(t.style.backgroundColor = ''),
			(i.style.backgroundSize = ''),
			(i.style.backgroundRepeat = ''),
			(i.style.backgroundPosition = ''),
			(i.style.backgroundImage = ''),
			(i.style.opacity = ''),
			(i.innerHTML = ''),
			s.background &&
				(/^(http|file|\/\/)/gi.test(s.background) ||
				/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(
					s.background,
				)
					? e.setAttribute('data-background-image', s.background)
					: (t.style.background = s.background)),
			(s.background ||
				s.backgroundColor ||
				s.backgroundGradient ||
				s.backgroundImage ||
				s.backgroundVideo ||
				s.backgroundIframe) &&
				t.setAttribute(
					'data-background-hash',
					s.background +
						s.backgroundSize +
						s.backgroundImage +
						s.backgroundVideo +
						s.backgroundIframe +
						s.backgroundColor +
						s.backgroundGradient +
						s.backgroundRepeat +
						s.backgroundPosition +
						s.backgroundTransition +
						s.backgroundOpacity,
				),
			s.backgroundSize &&
				t.setAttribute('data-background-size', s.backgroundSize),
			s.backgroundColor && (t.style.backgroundColor = s.backgroundColor),
			s.backgroundGradient &&
				(t.style.backgroundImage = s.backgroundGradient),
			s.backgroundTransition &&
				t.setAttribute(
					'data-background-transition',
					s.backgroundTransition,
				),
			n && t.setAttribute('data-preload', ''),
			s.backgroundSize && (i.style.backgroundSize = s.backgroundSize),
			s.backgroundRepeat &&
				(i.style.backgroundRepeat = s.backgroundRepeat),
			s.backgroundPosition &&
				(i.style.backgroundPosition = s.backgroundPosition),
			s.backgroundOpacity && (i.style.opacity = s.backgroundOpacity);
		let a = s.backgroundColor;
		if (!a || !f(a)) {
			let e = window.getComputedStyle(t);
			e && e.backgroundColor && (a = e.backgroundColor);
		}
		if (a) {
			const t = f(a);
			t &&
				0 !== t.a &&
				('string' == typeof (o = a) && (o = f(o)),
				(o ? (299 * o.r + 587 * o.g + 114 * o.b) / 1e3 : null) < 128
					? e.classList.add('has-dark-background')
					: e.classList.add('has-light-background'));
		}
		var o;
	}
	update(e = !1) {
		let i = this.Reveal.getCurrentSlide(),
			s = this.Reveal.getIndices(),
			n = null,
			a = this.Reveal.getConfig().rtl ? 'future' : 'past',
			o = this.Reveal.getConfig().rtl ? 'past' : 'future';
		if (
			(Array.from(this.element.childNodes).forEach((i, r) => {
				i.classList.remove('past', 'present', 'future'),
					r < s.h
						? i.classList.add(a)
						: r > s.h
						  ? i.classList.add(o)
						  : (i.classList.add('present'), (n = i)),
					(e || r === s.h) &&
						t(i, '.slide-background').forEach((e, t) => {
							e.classList.remove('past', 'present', 'future'),
								t < s.v
									? e.classList.add('past')
									: t > s.v
									  ? e.classList.add('future')
									  : (e.classList.add('present'),
									    r === s.h && (n = e));
						});
			}),
			this.previousBackground &&
				this.Reveal.slideContent.stopEmbeddedContent(
					this.previousBackground,
					{
						unloadIframes: !this.Reveal.slideContent.shouldPreload(
							this.previousBackground,
						),
					},
				),
			n)
		) {
			this.Reveal.slideContent.startEmbeddedContent(n);
			let e = n.querySelector('.slide-background-content');
			if (e) {
				let t = e.style.backgroundImage || '';
				/\.gif/i.test(t) &&
					((e.style.backgroundImage = ''),
					window.getComputedStyle(e).opacity,
					(e.style.backgroundImage = t));
			}
			let t = this.previousBackground
					? this.previousBackground.getAttribute(
							'data-background-hash',
					  )
					: null,
				i = n.getAttribute('data-background-hash');
			i &&
				i === t &&
				n !== this.previousBackground &&
				this.element.classList.add('no-transition'),
				(this.previousBackground = n);
		}
		i &&
			['has-light-background', 'has-dark-background'].forEach((e) => {
				i.classList.contains(e)
					? this.Reveal.getRevealElement().classList.add(e)
					: this.Reveal.getRevealElement().classList.remove(e);
			}, this),
			setTimeout(() => {
				this.element.classList.remove('no-transition');
			}, 1);
	}
	updateParallax() {
		let e = this.Reveal.getIndices();
		if (this.Reveal.getConfig().parallaxBackgroundImage) {
			let t,
				i,
				s = this.Reveal.getHorizontalSlides(),
				n = this.Reveal.getVerticalSlides(),
				a = this.element.style.backgroundSize.split(' ');
			1 === a.length
				? (t = i = parseInt(a[0], 10))
				: ((t = parseInt(a[0], 10)), (i = parseInt(a[1], 10)));
			let o,
				r,
				l = this.element.offsetWidth,
				d = s.length;
			(o =
				'number' ==
				typeof this.Reveal.getConfig().parallaxBackgroundHorizontal
					? this.Reveal.getConfig().parallaxBackgroundHorizontal
					: d > 1
					  ? (t - l) / (d - 1)
					  : 0),
				(r = o * e.h * -1);
			let c,
				h,
				u = this.element.offsetHeight,
				g = n.length;
			(c =
				'number' ==
				typeof this.Reveal.getConfig().parallaxBackgroundVertical
					? this.Reveal.getConfig().parallaxBackgroundVertical
					: (i - u) / (g - 1)),
				(h = g > 0 ? c * e.v : 0),
				(this.element.style.backgroundPosition = r + 'px ' + -h + 'px');
		}
	}
	destroy() {
		this.element.remove();
	}
}
const y = '.slides section',
	w = '.slides>section',
	E = '.slides>section.present>section',
	R =
		/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/,
	S =
		/fade-(down|up|right|left|out|in-then-out|in-then-semi-out)|semi-fade-out|current-visible|shrink|grow/;
let A = 0;
class k {
	constructor(e) {
		this.Reveal = e;
	}
	run(e, t) {
		this.reset();
		let i = this.Reveal.getSlides(),
			s = i.indexOf(t),
			n = i.indexOf(e);
		if (
			e.hasAttribute('data-auto-animate') &&
			t.hasAttribute('data-auto-animate') &&
			e.getAttribute('data-auto-animate-id') ===
				t.getAttribute('data-auto-animate-id') &&
			!(s > n ? t : e).hasAttribute('data-auto-animate-restart')
		) {
			this.autoAnimateStyleSheet = this.autoAnimateStyleSheet || r();
			let i = this.getAutoAnimateOptions(t);
			(e.dataset.autoAnimate = 'pending'),
				(t.dataset.autoAnimate = 'pending'),
				(i.slideDirection = s > n ? 'forward' : 'backward');
			let a = 'none' === e.style.display;
			a && (e.style.display = this.Reveal.getConfig().display);
			let o = this.getAutoAnimatableElements(e, t).map((e) =>
				this.autoAnimateElements(e.from, e.to, e.options || {}, i, A++),
			);
			if (
				(a && (e.style.display = 'none'),
				'false' !== t.dataset.autoAnimateUnmatched &&
					!0 === this.Reveal.getConfig().autoAnimateUnmatched)
			) {
				let e = 0.8 * i.duration,
					s = 0.2 * i.duration;
				this.getUnmatchedAutoAnimateElements(t).forEach((e) => {
					let t = this.getAutoAnimateOptions(e, i),
						s = 'unmatched';
					(t.duration === i.duration && t.delay === i.delay) ||
						((s = 'unmatched-' + A++),
						o.push(
							`[data-auto-animate="running"] [data-auto-animate-target="${s}"] { transition: opacity ${t.duration}s ease ${t.delay}s; }`,
						)),
						(e.dataset.autoAnimateTarget = s);
				}, this),
					o.push(
						`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e}s ease ${s}s; }`,
					);
			}
			(this.autoAnimateStyleSheet.innerHTML = o.join('')),
				requestAnimationFrame(() => {
					this.autoAnimateStyleSheet &&
						(getComputedStyle(this.autoAnimateStyleSheet)
							.fontWeight,
						(t.dataset.autoAnimate = 'running'));
				}),
				this.Reveal.dispatchEvent({
					type: 'autoanimate',
					data: {
						fromSlide: e,
						toSlide: t,
						sheet: this.autoAnimateStyleSheet,
					},
				});
		}
	}
	reset() {
		t(
			this.Reveal.getRevealElement(),
			'[data-auto-animate]:not([data-auto-animate=""])',
		).forEach((e) => {
			e.dataset.autoAnimate = '';
		}),
			t(
				this.Reveal.getRevealElement(),
				'[data-auto-animate-target]',
			).forEach((e) => {
				delete e.dataset.autoAnimateTarget;
			}),
			this.autoAnimateStyleSheet &&
				this.autoAnimateStyleSheet.parentNode &&
				(this.autoAnimateStyleSheet.parentNode.removeChild(
					this.autoAnimateStyleSheet,
				),
				(this.autoAnimateStyleSheet = null));
	}
	autoAnimateElements(e, t, i, s, n) {
		(e.dataset.autoAnimateTarget = ''), (t.dataset.autoAnimateTarget = n);
		let a = this.getAutoAnimateOptions(t, s);
		void 0 !== i.delay && (a.delay = i.delay),
			void 0 !== i.duration && (a.duration = i.duration),
			void 0 !== i.easing && (a.easing = i.easing);
		let o = this.getAutoAnimatableProperties('from', e, i),
			r = this.getAutoAnimatableProperties('to', t, i);
		if (
			t.classList.contains('fragment') &&
			(delete r.styles.opacity, e.classList.contains('fragment'))
		) {
			(e.className.match(S) || [''])[0] ===
				(t.className.match(S) || [''])[0] &&
				'forward' === s.slideDirection &&
				t.classList.add('visible', 'disabled');
		}
		if (!1 !== i.translate || !1 !== i.scale) {
			let e = this.Reveal.getScale(),
				t = {
					x: (o.x - r.x) / e,
					y: (o.y - r.y) / e,
					scaleX: o.width / r.width,
					scaleY: o.height / r.height,
				};
			(t.x = Math.round(1e3 * t.x) / 1e3),
				(t.y = Math.round(1e3 * t.y) / 1e3),
				(t.scaleX = Math.round(1e3 * t.scaleX) / 1e3),
				(t.scaleX = Math.round(1e3 * t.scaleX) / 1e3);
			let s = !1 !== i.translate && (0 !== t.x || 0 !== t.y),
				n = !1 !== i.scale && (0 !== t.scaleX || 0 !== t.scaleY);
			if (s || n) {
				let e = [];
				s && e.push(`translate(${t.x}px, ${t.y}px)`),
					n && e.push(`scale(${t.scaleX}, ${t.scaleY})`),
					(o.styles.transform = e.join(' ')),
					(o.styles['transform-origin'] = 'top left'),
					(r.styles.transform = 'none');
			}
		}
		for (let e in r.styles) {
			const t = r.styles[e],
				i = o.styles[e];
			t === i
				? delete r.styles[e]
				: (!0 === t.explicitValue && (r.styles[e] = t.value),
				  !0 === i.explicitValue && (o.styles[e] = i.value));
		}
		let l = '',
			d = Object.keys(r.styles);
		if (d.length > 0) {
			(o.styles.transition = 'none'),
				(r.styles.transition = `all ${a.duration}s ${a.easing} ${a.delay}s`),
				(r.styles['transition-property'] = d.join(', ')),
				(r.styles['will-change'] = d.join(', ')),
				(l =
					'[data-auto-animate-target="' +
					n +
					'"] {' +
					Object.keys(o.styles)
						.map((e) => e + ': ' + o.styles[e] + ' !important;')
						.join('') +
					'}[data-auto-animate="running"] [data-auto-animate-target="' +
					n +
					'"] {' +
					Object.keys(r.styles)
						.map((e) => e + ': ' + r.styles[e] + ' !important;')
						.join('') +
					'}');
		}
		return l;
	}
	getAutoAnimateOptions(t, i) {
		let s = {
			easing: this.Reveal.getConfig().autoAnimateEasing,
			duration: this.Reveal.getConfig().autoAnimateDuration,
			delay: 0,
		};
		if (((s = e(s, i)), t.parentNode)) {
			let e = o(t.parentNode, '[data-auto-animate-target]');
			e && (s = this.getAutoAnimateOptions(e, s));
		}
		return (
			t.dataset.autoAnimateEasing &&
				(s.easing = t.dataset.autoAnimateEasing),
			t.dataset.autoAnimateDuration &&
				(s.duration = parseFloat(t.dataset.autoAnimateDuration)),
			t.dataset.autoAnimateDelay &&
				(s.delay = parseFloat(t.dataset.autoAnimateDelay)),
			s
		);
	}
	getAutoAnimatableProperties(e, t, i) {
		let s = this.Reveal.getConfig(),
			n = { styles: [] };
		if (!1 !== i.translate || !1 !== i.scale) {
			let e;
			if ('function' == typeof i.measure) e = i.measure(t);
			else if (s.center) e = t.getBoundingClientRect();
			else {
				let i = this.Reveal.getScale();
				e = {
					x: t.offsetLeft * i,
					y: t.offsetTop * i,
					width: t.offsetWidth * i,
					height: t.offsetHeight * i,
				};
			}
			(n.x = e.x),
				(n.y = e.y),
				(n.width = e.width),
				(n.height = e.height);
		}
		const a = getComputedStyle(t);
		return (
			(i.styles || s.autoAnimateStyles).forEach((t) => {
				let i;
				'string' == typeof t && (t = { property: t }),
					void 0 !== t.from && 'from' === e
						? (i = { value: t.from, explicitValue: !0 })
						: void 0 !== t.to && 'to' === e
						  ? (i = { value: t.to, explicitValue: !0 })
						  : ('line-height' === t.property &&
									(i =
										parseFloat(a['line-height']) /
										parseFloat(a['font-size'])),
						    isNaN(i) && (i = a[t.property])),
					'' !== i && (n.styles[t.property] = i);
			}),
			n
		);
	}
	getAutoAnimatableElements(e, t) {
		let i = (
				'function' == typeof this.Reveal.getConfig().autoAnimateMatcher
					? this.Reveal.getConfig().autoAnimateMatcher
					: this.getAutoAnimatePairs
			).call(this, e, t),
			s = [];
		return i.filter((e, t) => {
			if (-1 === s.indexOf(e.to)) return s.push(e.to), !0;
		});
	}
	getAutoAnimatePairs(e, t) {
		let i = [];
		const s = 'h1, h2, h3, h4, h5, h6, p, li';
		return (
			this.findAutoAnimateMatches(
				i,
				e,
				t,
				'[data-id]',
				(e) => e.nodeName + ':::' + e.getAttribute('data-id'),
			),
			this.findAutoAnimateMatches(
				i,
				e,
				t,
				s,
				(e) => e.nodeName + ':::' + e.innerText,
			),
			this.findAutoAnimateMatches(
				i,
				e,
				t,
				'img, video, iframe',
				(e) =>
					e.nodeName +
					':::' +
					(e.getAttribute('src') || e.getAttribute('data-src')),
			),
			this.findAutoAnimateMatches(
				i,
				e,
				t,
				'pre',
				(e) => e.nodeName + ':::' + e.innerText,
			),
			i.forEach((e) => {
				a(e.from, s)
					? (e.options = { scale: !1 })
					: a(e.from, 'pre') &&
					  ((e.options = { scale: !1, styles: ['width', 'height'] }),
					  this.findAutoAnimateMatches(
							i,
							e.from,
							e.to,
							'.hljs .hljs-ln-code',
							(e) => e.textContent,
							{
								scale: !1,
								styles: [],
								measure: this.getLocalBoundingBox.bind(this),
							},
					  ),
					  this.findAutoAnimateMatches(
							i,
							e.from,
							e.to,
							'.hljs .hljs-ln-numbers[data-line-number]',
							(e) => e.getAttribute('data-line-number'),
							{
								scale: !1,
								styles: ['width'],
								measure: this.getLocalBoundingBox.bind(this),
							},
					  ));
			}, this),
			i
		);
	}
	getLocalBoundingBox(e) {
		const t = this.Reveal.getScale();
		return {
			x: Math.round(e.offsetLeft * t * 100) / 100,
			y: Math.round(e.offsetTop * t * 100) / 100,
			width: Math.round(e.offsetWidth * t * 100) / 100,
			height: Math.round(e.offsetHeight * t * 100) / 100,
		};
	}
	findAutoAnimateMatches(e, t, i, s, n, a) {
		let o = {},
			r = {};
		[].slice.call(t.querySelectorAll(s)).forEach((e, t) => {
			const i = n(e);
			'string' == typeof i &&
				i.length &&
				((o[i] = o[i] || []), o[i].push(e));
		}),
			[].slice.call(i.querySelectorAll(s)).forEach((t, i) => {
				const s = n(t);
				let l;
				if (((r[s] = r[s] || []), r[s].push(t), o[s])) {
					const e = r[s].length - 1,
						t = o[s].length - 1;
					o[s][e]
						? ((l = o[s][e]), (o[s][e] = null))
						: o[s][t] && ((l = o[s][t]), (o[s][t] = null));
				}
				l && e.push({ from: l, to: t, options: a });
			});
	}
	getUnmatchedAutoAnimateElements(e) {
		return [].slice.call(e.children).reduce((e, t) => {
			const i = t.querySelector('[data-auto-animate-target]');
			return (
				t.hasAttribute('data-auto-animate-target') || i || e.push(t),
				t.querySelector('[data-auto-animate-target]') &&
					(e = e.concat(this.getUnmatchedAutoAnimateElements(t))),
				e
			);
		}, []);
	}
}
class L {
	constructor(e) {
		this.Reveal = e;
	}
	configure(e, t) {
		!1 === e.fragments
			? this.disable()
			: !1 === t.fragments && this.enable();
	}
	disable() {
		t(this.Reveal.getSlidesElement(), '.fragment').forEach((e) => {
			e.classList.add('visible'), e.classList.remove('current-fragment');
		});
	}
	enable() {
		t(this.Reveal.getSlidesElement(), '.fragment').forEach((e) => {
			e.classList.remove('visible'),
				e.classList.remove('current-fragment');
		});
	}
	availableRoutes() {
		let e = this.Reveal.getCurrentSlide();
		if (e && this.Reveal.getConfig().fragments) {
			let t = e.querySelectorAll('.fragment:not(.disabled)'),
				i = e.querySelectorAll(
					'.fragment:not(.disabled):not(.visible)',
				);
			return { prev: t.length - i.length > 0, next: !!i.length };
		}
		return { prev: !1, next: !1 };
	}
	sort(e, t = !1) {
		e = Array.from(e);
		let i = [],
			s = [],
			n = [];
		e.forEach((e) => {
			if (e.hasAttribute('data-fragment-index')) {
				let t = parseInt(e.getAttribute('data-fragment-index'), 10);
				i[t] || (i[t] = []), i[t].push(e);
			} else s.push([e]);
		}),
			(i = i.concat(s));
		let a = 0;
		return (
			i.forEach((e) => {
				e.forEach((e) => {
					n.push(e), e.setAttribute('data-fragment-index', a);
				}),
					a++;
			}),
			!0 === t ? i : n
		);
	}
	sortAll() {
		this.Reveal.getHorizontalSlides().forEach((e) => {
			let i = t(e, 'section');
			i.forEach((e, t) => {
				this.sort(e.querySelectorAll('.fragment'));
			}, this),
				0 === i.length && this.sort(e.querySelectorAll('.fragment'));
		});
	}
	update(e, t) {
		let i = { shown: [], hidden: [] },
			s = this.Reveal.getCurrentSlide();
		if (
			s &&
			this.Reveal.getConfig().fragments &&
			(t = t || this.sort(s.querySelectorAll('.fragment'))).length
		) {
			let n = 0;
			if ('number' != typeof e) {
				let t = this.sort(
					s.querySelectorAll('.fragment.visible'),
				).pop();
				t &&
					(e = parseInt(
						t.getAttribute('data-fragment-index') || 0,
						10,
					));
			}
			Array.from(t).forEach((t, s) => {
				if (
					(t.hasAttribute('data-fragment-index') &&
						(s = parseInt(
							t.getAttribute('data-fragment-index'),
							10,
						)),
					(n = Math.max(n, s)),
					s <= e)
				) {
					let n = t.classList.contains('visible');
					t.classList.add('visible'),
						t.classList.remove('current-fragment'),
						s === e &&
							(this.Reveal.announceStatus(
								this.Reveal.getStatusText(t),
							),
							t.classList.add('current-fragment'),
							this.Reveal.slideContent.startEmbeddedContent(t)),
						n ||
							(i.shown.push(t),
							this.Reveal.dispatchEvent({
								target: t,
								type: 'visible',
								bubbles: !1,
							}));
				} else {
					let e = t.classList.contains('visible');
					t.classList.remove('visible'),
						t.classList.remove('current-fragment'),
						e &&
							(this.Reveal.slideContent.stopEmbeddedContent(t),
							i.hidden.push(t),
							this.Reveal.dispatchEvent({
								target: t,
								type: 'hidden',
								bubbles: !1,
							}));
				}
			}),
				(e = 'number' == typeof e ? e : -1),
				(e = Math.max(Math.min(e, n), -1)),
				s.setAttribute('data-fragment', e);
		}
		return i;
	}
	sync(e = this.Reveal.getCurrentSlide()) {
		return this.sort(e.querySelectorAll('.fragment'));
	}
	goto(e, t = 0) {
		let i = this.Reveal.getCurrentSlide();
		if (i && this.Reveal.getConfig().fragments) {
			let s = this.sort(i.querySelectorAll('.fragment:not(.disabled)'));
			if (s.length) {
				if ('number' != typeof e) {
					let t = this.sort(
						i.querySelectorAll('.fragment:not(.disabled).visible'),
					).pop();
					e = t
						? parseInt(
								t.getAttribute('data-fragment-index') || 0,
								10,
						  )
						: -1;
				}
				e += t;
				let n = this.update(e, s);
				return (
					n.hidden.length &&
						this.Reveal.dispatchEvent({
							type: 'fragmenthidden',
							data: {
								fragment: n.hidden[0],
								fragments: n.hidden,
							},
						}),
					n.shown.length &&
						this.Reveal.dispatchEvent({
							type: 'fragmentshown',
							data: { fragment: n.shown[0], fragments: n.shown },
						}),
					this.Reveal.controls.update(),
					this.Reveal.progress.update(),
					this.Reveal.getConfig().fragmentInURL &&
						this.Reveal.location.writeURL(),
					!(!n.shown.length && !n.hidden.length)
				);
			}
		}
		return !1;
	}
	next() {
		return this.goto(null, 1);
	}
	prev() {
		return this.goto(null, -1);
	}
}
class C {
	constructor(e) {
		(this.Reveal = e),
			(this.active = !1),
			(this.onSlideClicked = this.onSlideClicked.bind(this));
	}
	activate() {
		if (this.Reveal.getConfig().overview && !this.isActive()) {
			(this.active = !0),
				this.Reveal.getRevealElement().classList.add('overview'),
				this.Reveal.cancelAutoSlide(),
				this.Reveal.getSlidesElement().appendChild(
					this.Reveal.getBackgroundsElement(),
				),
				t(this.Reveal.getRevealElement(), y).forEach((e) => {
					e.classList.contains('stack') ||
						e.addEventListener('click', this.onSlideClicked, !0);
				});
			const e = 70,
				i = this.Reveal.getComputedSlideSize();
			(this.overviewSlideWidth = i.width + e),
				(this.overviewSlideHeight = i.height + e),
				this.Reveal.getConfig().rtl &&
					(this.overviewSlideWidth = -this.overviewSlideWidth),
				this.Reveal.updateSlidesVisibility(),
				this.layout(),
				this.update(),
				this.Reveal.layout();
			const s = this.Reveal.getIndices();
			this.Reveal.dispatchEvent({
				type: 'overviewshown',
				data: {
					indexh: s.h,
					indexv: s.v,
					currentSlide: this.Reveal.getCurrentSlide(),
				},
			});
		}
	}
	layout() {
		this.Reveal.getHorizontalSlides().forEach((e, i) => {
			e.setAttribute('data-index-h', i),
				n(
					e,
					'translate3d(' + i * this.overviewSlideWidth + 'px, 0, 0)',
				),
				e.classList.contains('stack') &&
					t(e, 'section').forEach((e, t) => {
						e.setAttribute('data-index-h', i),
							e.setAttribute('data-index-v', t),
							n(
								e,
								'translate3d(0, ' +
									t * this.overviewSlideHeight +
									'px, 0)',
							);
					});
		}),
			Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach(
				(e, i) => {
					n(
						e,
						'translate3d(' +
							i * this.overviewSlideWidth +
							'px, 0, 0)',
					),
						t(e, '.slide-background').forEach((e, t) => {
							n(
								e,
								'translate3d(0, ' +
									t * this.overviewSlideHeight +
									'px, 0)',
							);
						});
				},
			);
	}
	update() {
		const e = Math.min(window.innerWidth, window.innerHeight),
			t = Math.max(e / 5, 150) / e,
			i = this.Reveal.getIndices();
		this.Reveal.transformSlides({
			overview: [
				'scale(' + t + ')',
				'translateX(' + -i.h * this.overviewSlideWidth + 'px)',
				'translateY(' + -i.v * this.overviewSlideHeight + 'px)',
			].join(' '),
		});
	}
	deactivate() {
		if (this.Reveal.getConfig().overview) {
			(this.active = !1),
				this.Reveal.getRevealElement().classList.remove('overview'),
				this.Reveal.getRevealElement().classList.add(
					'overview-deactivating',
				),
				setTimeout(() => {
					this.Reveal.getRevealElement().classList.remove(
						'overview-deactivating',
					);
				}, 1),
				this.Reveal.getRevealElement().appendChild(
					this.Reveal.getBackgroundsElement(),
				),
				t(this.Reveal.getRevealElement(), y).forEach((e) => {
					n(e, ''),
						e.removeEventListener('click', this.onSlideClicked, !0);
				}),
				t(
					this.Reveal.getBackgroundsElement(),
					'.slide-background',
				).forEach((e) => {
					n(e, '');
				}),
				this.Reveal.transformSlides({ overview: '' });
			const e = this.Reveal.getIndices();
			this.Reveal.slide(e.h, e.v),
				this.Reveal.layout(),
				this.Reveal.cueAutoSlide(),
				this.Reveal.dispatchEvent({
					type: 'overviewhidden',
					data: {
						indexh: e.h,
						indexv: e.v,
						currentSlide: this.Reveal.getCurrentSlide(),
					},
				});
		}
	}
	toggle(e) {
		'boolean' == typeof e
			? e
				? this.activate()
				: this.deactivate()
			: this.isActive()
			  ? this.deactivate()
			  : this.activate();
	}
	isActive() {
		return this.active;
	}
	onSlideClicked(e) {
		if (this.isActive()) {
			e.preventDefault();
			let t = e.target;
			for (; t && !t.nodeName.match(/section/gi); ) t = t.parentNode;
			if (
				t &&
				!t.classList.contains('disabled') &&
				(this.deactivate(), t.nodeName.match(/section/gi))
			) {
				let e = parseInt(t.getAttribute('data-index-h'), 10),
					i = parseInt(t.getAttribute('data-index-v'), 10);
				this.Reveal.slide(e, i);
			}
		}
	}
}
class x {
	constructor(e) {
		(this.Reveal = e),
			(this.shortcuts = {}),
			(this.bindings = {}),
			(this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this)),
			(this.onDocumentKeyPress = this.onDocumentKeyPress.bind(this));
	}
	configure(e, t) {
		'linear' === e.navigationMode
			? ((this.shortcuts[
					'&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J'
			  ] = 'Next slide'),
			  (this.shortcuts['&#8592;  ,  &#8593;  ,  P  ,  H  ,  K'] =
					'Previous slide'))
			: ((this.shortcuts['N  ,  SPACE'] = 'Next slide'),
			  (this.shortcuts['P  ,  Shift SPACE'] = 'Previous slide'),
			  (this.shortcuts['&#8592;  ,  H'] = 'Navigate left'),
			  (this.shortcuts['&#8594;  ,  L'] = 'Navigate right'),
			  (this.shortcuts['&#8593;  ,  K'] = 'Navigate up'),
			  (this.shortcuts['&#8595;  ,  J'] = 'Navigate down')),
			(this.shortcuts['Alt + &#8592;/&#8593/&#8594;/&#8595;'] =
				'Navigate without fragments'),
			(this.shortcuts['Shift + &#8592;/&#8593/&#8594;/&#8595;'] =
				'Jump to first/last slide'),
			(this.shortcuts['B  ,  .'] = 'Pause'),
			(this.shortcuts.F = 'Fullscreen'),
			(this.shortcuts.G = 'Jump to slide'),
			(this.shortcuts['ESC, O'] = 'Slide overview');
	}
	bind() {
		document.addEventListener('keydown', this.onDocumentKeyDown, !1),
			document.addEventListener('keypress', this.onDocumentKeyPress, !1);
	}
	unbind() {
		document.removeEventListener('keydown', this.onDocumentKeyDown, !1),
			document.removeEventListener(
				'keypress',
				this.onDocumentKeyPress,
				!1,
			);
	}
	addKeyBinding(e, t) {
		'object' == typeof e && e.keyCode
			? (this.bindings[e.keyCode] = {
					callback: t,
					key: e.key,
					description: e.description,
			  })
			: (this.bindings[e] = {
					callback: t,
					key: null,
					description: null,
			  });
	}
	removeKeyBinding(e) {
		delete this.bindings[e];
	}
	triggerKey(e) {
		this.onDocumentKeyDown({ keyCode: e });
	}
	registerKeyboardShortcut(e, t) {
		this.shortcuts[e] = t;
	}
	getShortcuts() {
		return this.shortcuts;
	}
	getBindings() {
		return this.bindings;
	}
	onDocumentKeyPress(e) {
		e.shiftKey && 63 === e.charCode && this.Reveal.toggleHelp();
	}
	onDocumentKeyDown(e) {
		let t = this.Reveal.getConfig();
		if (
			'function' == typeof t.keyboardCondition &&
			!1 === t.keyboardCondition(e)
		)
			return !0;
		if ('focused' === t.keyboardCondition && !this.Reveal.isFocused())
			return !0;
		let i = e.keyCode,
			s = !this.Reveal.isAutoSliding();
		this.Reveal.onUserInput(e);
		let n =
				document.activeElement &&
				!0 === document.activeElement.isContentEditable,
			a =
				document.activeElement &&
				document.activeElement.tagName &&
				/input|textarea/i.test(document.activeElement.tagName),
			o =
				document.activeElement &&
				document.activeElement.className &&
				/speaker-notes/i.test(document.activeElement.className),
			r =
				!(
					(-1 !== [32, 37, 38, 39, 40, 78, 80].indexOf(e.keyCode) &&
						e.shiftKey) ||
					e.altKey
				) &&
				(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey);
		if (n || a || o || r) return;
		let l,
			d = [66, 86, 190, 191];
		if ('object' == typeof t.keyboard)
			for (l in t.keyboard)
				'togglePause' === t.keyboard[l] && d.push(parseInt(l, 10));
		if (this.Reveal.isPaused() && -1 === d.indexOf(i)) return !1;
		let c =
				'linear' === t.navigationMode ||
				!this.Reveal.hasHorizontalSlides() ||
				!this.Reveal.hasVerticalSlides(),
			h = !1;
		if ('object' == typeof t.keyboard)
			for (l in t.keyboard)
				if (parseInt(l, 10) === i) {
					let i = t.keyboard[l];
					'function' == typeof i
						? i.apply(null, [e])
						: 'string' == typeof i &&
						  'function' == typeof this.Reveal[i] &&
						  this.Reveal[i].call(),
						(h = !0);
				}
		if (!1 === h)
			for (l in this.bindings)
				if (parseInt(l, 10) === i) {
					let t = this.bindings[l].callback;
					'function' == typeof t
						? t.apply(null, [e])
						: 'string' == typeof t &&
						  'function' == typeof this.Reveal[t] &&
						  this.Reveal[t].call(),
						(h = !0);
				}
		!1 === h &&
			((h = !0),
			80 === i || 33 === i
				? this.Reveal.prev({ skipFragments: e.altKey })
				: 78 === i || 34 === i
				  ? this.Reveal.next({ skipFragments: e.altKey })
				  : 72 === i || 37 === i
				    ? e.shiftKey
							? this.Reveal.slide(0)
							: !this.Reveal.overview.isActive() && c
							  ? this.Reveal.prev({ skipFragments: e.altKey })
							  : this.Reveal.left({ skipFragments: e.altKey })
				    : 76 === i || 39 === i
				      ? e.shiftKey
								? this.Reveal.slide(
										this.Reveal.getHorizontalSlides()
											.length - 1,
								  )
								: !this.Reveal.overview.isActive() && c
								  ? this.Reveal.next({
											skipFragments: e.altKey,
								    })
								  : this.Reveal.right({
											skipFragments: e.altKey,
								    })
				      : 75 === i || 38 === i
				        ? e.shiftKey
									? this.Reveal.slide(void 0, 0)
									: !this.Reveal.overview.isActive() && c
									  ? this.Reveal.prev({
												skipFragments: e.altKey,
									    })
									  : this.Reveal.up({
												skipFragments: e.altKey,
									    })
				        : 74 === i || 40 === i
				          ? e.shiftKey
										? this.Reveal.slide(
												void 0,
												Number.MAX_VALUE,
										  )
										: !this.Reveal.overview.isActive() && c
										  ? this.Reveal.next({
													skipFragments: e.altKey,
										    })
										  : this.Reveal.down({
													skipFragments: e.altKey,
										    })
				          : 36 === i
				            ? this.Reveal.slide(0)
				            : 35 === i
				              ? this.Reveal.slide(
													this.Reveal.getHorizontalSlides()
														.length - 1,
				                )
				              : 32 === i
				                ? (this.Reveal.overview.isActive() &&
														this.Reveal.overview.deactivate(),
				                  e.shiftKey
														? this.Reveal.prev({
																skipFragments:
																	e.altKey,
														  })
														: this.Reveal.next({
																skipFragments:
																	e.altKey,
														  }))
				                : 58 === i ||
				                    59 === i ||
				                    66 === i ||
				                    86 === i ||
				                    190 === i ||
				                    191 === i
				                  ? this.Reveal.togglePause()
				                  : 70 === i
				                    ? ((e) => {
																let t =
																	(e =
																		e ||
																		document.documentElement)
																		.requestFullscreen ||
																	e.webkitRequestFullscreen ||
																	e.webkitRequestFullScreen ||
																	e.mozRequestFullScreen ||
																	e.msRequestFullscreen;
																t && t.apply(e);
				                      })(
																t.embedded
																	? this.Reveal.getViewportElement()
																	: document.documentElement,
				                      )
				                    : 65 === i
				                      ? t.autoSlideStoppable &&
				                        this.Reveal.toggleAutoSlide(s)
				                      : 71 === i
				                        ? t.jumpToSlide &&
				                          this.Reveal.toggleJumpToSlide()
				                        : (h = !1)),
			h
				? e.preventDefault && e.preventDefault()
				: (27 !== i && 79 !== i) ||
				  (!1 === this.Reveal.closeOverlay() &&
						this.Reveal.overview.toggle(),
				  e.preventDefault && e.preventDefault()),
			this.Reveal.cueAutoSlide();
	}
}
class P {
	MAX_REPLACE_STATE_FREQUENCY = 1e3;
	constructor(e) {
		(this.Reveal = e),
			(this.writeURLTimeout = 0),
			(this.replaceStateTimestamp = 0),
			(this.onWindowHashChange = this.onWindowHashChange.bind(this));
	}
	bind() {
		window.addEventListener('hashchange', this.onWindowHashChange, !1);
	}
	unbind() {
		window.removeEventListener('hashchange', this.onWindowHashChange, !1);
	}
	getIndicesFromHash(e = window.location.hash, t = {}) {
		let i = e.replace(/^#\/?/, ''),
			s = i.split('/');
		if (/^[0-9]*$/.test(s[0]) || !i.length) {
			const e = this.Reveal.getConfig();
			let i,
				n = e.hashOneBasedIndex || t.oneBasedIndex ? 1 : 0,
				a = parseInt(s[0], 10) - n || 0,
				o = parseInt(s[1], 10) - n || 0;
			return (
				e.fragmentInURL &&
					((i = parseInt(s[2], 10)), isNaN(i) && (i = void 0)),
				{ h: a, v: o, f: i }
			);
		}
		{
			let e, t;
			/\/[-\d]+$/g.test(i) &&
				((t = parseInt(i.split('/').pop(), 10)),
				(t = isNaN(t) ? void 0 : t),
				(i = i.split('/').shift()));
			try {
				e = document.getElementById(decodeURIComponent(i));
			} catch (e) {}
			if (e) return { ...this.Reveal.getIndices(e), f: t };
		}
		return null;
	}
	readURL() {
		const e = this.Reveal.getIndices(),
			t = this.getIndicesFromHash();
		t
			? (t.h === e.h && t.v === e.v && void 0 === t.f) ||
			  this.Reveal.slide(t.h, t.v, t.f)
			: this.Reveal.slide(e.h || 0, e.v || 0);
	}
	writeURL(e) {
		let t = this.Reveal.getConfig(),
			i = this.Reveal.getCurrentSlide();
		if ((clearTimeout(this.writeURLTimeout), 'number' == typeof e))
			this.writeURLTimeout = setTimeout(this.writeURL, e);
		else if (i) {
			let e = this.getHash();
			t.history
				? (window.location.hash = e)
				: t.hash &&
				  ('/' === e
						? this.debouncedReplaceState(
								window.location.pathname +
									window.location.search,
						  )
						: this.debouncedReplaceState('#' + e));
		}
	}
	replaceState(e) {
		window.history.replaceState(null, null, e),
			(this.replaceStateTimestamp = Date.now());
	}
	debouncedReplaceState(e) {
		clearTimeout(this.replaceStateTimeout),
			Date.now() - this.replaceStateTimestamp >
			this.MAX_REPLACE_STATE_FREQUENCY
				? this.replaceState(e)
				: (this.replaceStateTimeout = setTimeout(
						() => this.replaceState(e),
						this.MAX_REPLACE_STATE_FREQUENCY,
				  ));
	}
	getHash(e) {
		let t = '/',
			i = e || this.Reveal.getCurrentSlide(),
			s = i ? i.getAttribute('id') : null;
		s && (s = encodeURIComponent(s));
		let n = this.Reveal.getIndices(e);
		if (
			(this.Reveal.getConfig().fragmentInURL || (n.f = void 0),
			'string' == typeof s && s.length)
		)
			(t = '/' + s), n.f >= 0 && (t += '/' + n.f);
		else {
			let e = this.Reveal.getConfig().hashOneBasedIndex ? 1 : 0;
			(n.h > 0 || n.v > 0 || n.f >= 0) && (t += n.h + e),
				(n.v > 0 || n.f >= 0) && (t += '/' + (n.v + e)),
				n.f >= 0 && (t += '/' + n.f);
		}
		return t;
	}
	onWindowHashChange(e) {
		this.readURL();
	}
}
class N {
	constructor(e) {
		(this.Reveal = e),
			(this.onNavigateLeftClicked =
				this.onNavigateLeftClicked.bind(this)),
			(this.onNavigateRightClicked =
				this.onNavigateRightClicked.bind(this)),
			(this.onNavigateUpClicked = this.onNavigateUpClicked.bind(this)),
			(this.onNavigateDownClicked =
				this.onNavigateDownClicked.bind(this)),
			(this.onNavigatePrevClicked =
				this.onNavigatePrevClicked.bind(this)),
			(this.onNavigateNextClicked =
				this.onNavigateNextClicked.bind(this));
	}
	render() {
		const e = this.Reveal.getConfig().rtl,
			i = this.Reveal.getRevealElement();
		(this.element = document.createElement('aside')),
			(this.element.className = 'controls'),
			(this.element.innerHTML = `<button class="navigate-left" aria-label="${
				e ? 'next slide' : 'previous slide'
			}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-right" aria-label="${
				e ? 'previous slide' : 'next slide'
			}"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>\n\t\t\t<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`),
			this.Reveal.getRevealElement().appendChild(this.element),
			(this.controlsLeft = t(i, '.navigate-left')),
			(this.controlsRight = t(i, '.navigate-right')),
			(this.controlsUp = t(i, '.navigate-up')),
			(this.controlsDown = t(i, '.navigate-down')),
			(this.controlsPrev = t(i, '.navigate-prev')),
			(this.controlsNext = t(i, '.navigate-next')),
			(this.controlsRightArrow =
				this.element.querySelector('.navigate-right')),
			(this.controlsLeftArrow =
				this.element.querySelector('.navigate-left')),
			(this.controlsDownArrow =
				this.element.querySelector('.navigate-down'));
	}
	configure(e, t) {
		(this.element.style.display = e.controls ? 'block' : 'none'),
			this.element.setAttribute('data-controls-layout', e.controlsLayout),
			this.element.setAttribute(
				'data-controls-back-arrows',
				e.controlsBackArrows,
			);
	}
	bind() {
		let e = ['touchstart', 'click'];
		u && (e = ['touchstart']),
			e.forEach((e) => {
				this.controlsLeft.forEach((t) =>
					t.addEventListener(e, this.onNavigateLeftClicked, !1),
				),
					this.controlsRight.forEach((t) =>
						t.addEventListener(e, this.onNavigateRightClicked, !1),
					),
					this.controlsUp.forEach((t) =>
						t.addEventListener(e, this.onNavigateUpClicked, !1),
					),
					this.controlsDown.forEach((t) =>
						t.addEventListener(e, this.onNavigateDownClicked, !1),
					),
					this.controlsPrev.forEach((t) =>
						t.addEventListener(e, this.onNavigatePrevClicked, !1),
					),
					this.controlsNext.forEach((t) =>
						t.addEventListener(e, this.onNavigateNextClicked, !1),
					);
			});
	}
	unbind() {
		['touchstart', 'click'].forEach((e) => {
			this.controlsLeft.forEach((t) =>
				t.removeEventListener(e, this.onNavigateLeftClicked, !1),
			),
				this.controlsRight.forEach((t) =>
					t.removeEventListener(e, this.onNavigateRightClicked, !1),
				),
				this.controlsUp.forEach((t) =>
					t.removeEventListener(e, this.onNavigateUpClicked, !1),
				),
				this.controlsDown.forEach((t) =>
					t.removeEventListener(e, this.onNavigateDownClicked, !1),
				),
				this.controlsPrev.forEach((t) =>
					t.removeEventListener(e, this.onNavigatePrevClicked, !1),
				),
				this.controlsNext.forEach((t) =>
					t.removeEventListener(e, this.onNavigateNextClicked, !1),
				);
		});
	}
	update() {
		let e = this.Reveal.availableRoutes();
		[
			...this.controlsLeft,
			...this.controlsRight,
			...this.controlsUp,
			...this.controlsDown,
			...this.controlsPrev,
			...this.controlsNext,
		].forEach((e) => {
			e.classList.remove('enabled', 'fragmented'),
				e.setAttribute('disabled', 'disabled');
		}),
			e.left &&
				this.controlsLeft.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				}),
			e.right &&
				this.controlsRight.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				}),
			e.up &&
				this.controlsUp.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				}),
			e.down &&
				this.controlsDown.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				}),
			(e.left || e.up) &&
				this.controlsPrev.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				}),
			(e.right || e.down) &&
				this.controlsNext.forEach((e) => {
					e.classList.add('enabled'), e.removeAttribute('disabled');
				});
		let t = this.Reveal.getCurrentSlide();
		if (t) {
			let e = this.Reveal.fragments.availableRoutes();
			e.prev &&
				this.controlsPrev.forEach((e) => {
					e.classList.add('fragmented', 'enabled'),
						e.removeAttribute('disabled');
				}),
				e.next &&
					this.controlsNext.forEach((e) => {
						e.classList.add('fragmented', 'enabled'),
							e.removeAttribute('disabled');
					}),
				this.Reveal.isVerticalSlide(t)
					? (e.prev &&
							this.controlsUp.forEach((e) => {
								e.classList.add('fragmented', 'enabled'),
									e.removeAttribute('disabled');
							}),
					  e.next &&
							this.controlsDown.forEach((e) => {
								e.classList.add('fragmented', 'enabled'),
									e.removeAttribute('disabled');
							}))
					: (e.prev &&
							this.controlsLeft.forEach((e) => {
								e.classList.add('fragmented', 'enabled'),
									e.removeAttribute('disabled');
							}),
					  e.next &&
							this.controlsRight.forEach((e) => {
								e.classList.add('fragmented', 'enabled'),
									e.removeAttribute('disabled');
							}));
		}
		if (this.Reveal.getConfig().controlsTutorial) {
			let t = this.Reveal.getIndices();
			!this.Reveal.hasNavigatedVertically() && e.down
				? this.controlsDownArrow.classList.add('highlight')
				: (this.controlsDownArrow.classList.remove('highlight'),
				  this.Reveal.getConfig().rtl
						? !this.Reveal.hasNavigatedHorizontally() &&
						  e.left &&
						  0 === t.v
							? this.controlsLeftArrow.classList.add('highlight')
							: this.controlsLeftArrow.classList.remove(
									'highlight',
							  )
						: !this.Reveal.hasNavigatedHorizontally() &&
						    e.right &&
						    0 === t.v
						  ? this.controlsRightArrow.classList.add('highlight')
						  : this.controlsRightArrow.classList.remove(
									'highlight',
						    ));
		}
	}
	destroy() {
		this.unbind(), this.element.remove();
	}
	onNavigateLeftClicked(e) {
		e.preventDefault(),
			this.Reveal.onUserInput(),
			'linear' === this.Reveal.getConfig().navigationMode
				? this.Reveal.prev()
				: this.Reveal.left();
	}
	onNavigateRightClicked(e) {
		e.preventDefault(),
			this.Reveal.onUserInput(),
			'linear' === this.Reveal.getConfig().navigationMode
				? this.Reveal.next()
				: this.Reveal.right();
	}
	onNavigateUpClicked(e) {
		e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.up();
	}
	onNavigateDownClicked(e) {
		e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.down();
	}
	onNavigatePrevClicked(e) {
		e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.prev();
	}
	onNavigateNextClicked(e) {
		e.preventDefault(), this.Reveal.onUserInput(), this.Reveal.next();
	}
}
class M {
	constructor(e) {
		(this.Reveal = e),
			(this.onProgressClicked = this.onProgressClicked.bind(this));
	}
	render() {
		(this.element = document.createElement('div')),
			(this.element.className = 'progress'),
			this.Reveal.getRevealElement().appendChild(this.element),
			(this.bar = document.createElement('span')),
			this.element.appendChild(this.bar);
	}
	configure(e, t) {
		this.element.style.display = e.progress ? 'block' : 'none';
	}
	bind() {
		this.Reveal.getConfig().progress &&
			this.element &&
			this.element.addEventListener('click', this.onProgressClicked, !1);
	}
	unbind() {
		this.Reveal.getConfig().progress &&
			this.element &&
			this.element.removeEventListener(
				'click',
				this.onProgressClicked,
				!1,
			);
	}
	update() {
		if (this.Reveal.getConfig().progress && this.bar) {
			let e = this.Reveal.getProgress();
			this.Reveal.getTotalSlides() < 2 && (e = 0),
				(this.bar.style.transform = 'scaleX(' + e + ')');
		}
	}
	getMaxWidth() {
		return this.Reveal.getRevealElement().offsetWidth;
	}
	onProgressClicked(e) {
		this.Reveal.onUserInput(e), e.preventDefault();
		let t = this.Reveal.getSlides(),
			i = t.length,
			s = Math.floor((e.clientX / this.getMaxWidth()) * i);
		this.Reveal.getConfig().rtl && (s = i - s);
		let n = this.Reveal.getIndices(t[s]);
		this.Reveal.slide(n.h, n.v);
	}
	destroy() {
		this.element.remove();
	}
}
class I {
	constructor(e) {
		(this.Reveal = e),
			(this.lastMouseWheelStep = 0),
			(this.cursorHidden = !1),
			(this.cursorInactiveTimeout = 0),
			(this.onDocumentCursorActive =
				this.onDocumentCursorActive.bind(this)),
			(this.onDocumentMouseScroll =
				this.onDocumentMouseScroll.bind(this));
	}
	configure(e, t) {
		e.mouseWheel
			? (document.addEventListener(
					'DOMMouseScroll',
					this.onDocumentMouseScroll,
					!1,
			  ),
			  document.addEventListener(
					'mousewheel',
					this.onDocumentMouseScroll,
					!1,
			  ))
			: (document.removeEventListener(
					'DOMMouseScroll',
					this.onDocumentMouseScroll,
					!1,
			  ),
			  document.removeEventListener(
					'mousewheel',
					this.onDocumentMouseScroll,
					!1,
			  )),
			e.hideInactiveCursor
				? (document.addEventListener(
						'mousemove',
						this.onDocumentCursorActive,
						!1,
				  ),
				  document.addEventListener(
						'mousedown',
						this.onDocumentCursorActive,
						!1,
				  ))
				: (this.showCursor(),
				  document.removeEventListener(
						'mousemove',
						this.onDocumentCursorActive,
						!1,
				  ),
				  document.removeEventListener(
						'mousedown',
						this.onDocumentCursorActive,
						!1,
				  ));
	}
	showCursor() {
		this.cursorHidden &&
			((this.cursorHidden = !1),
			(this.Reveal.getRevealElement().style.cursor = ''));
	}
	hideCursor() {
		!1 === this.cursorHidden &&
			((this.cursorHidden = !0),
			(this.Reveal.getRevealElement().style.cursor = 'none'));
	}
	destroy() {
		this.showCursor(),
			document.removeEventListener(
				'DOMMouseScroll',
				this.onDocumentMouseScroll,
				!1,
			),
			document.removeEventListener(
				'mousewheel',
				this.onDocumentMouseScroll,
				!1,
			),
			document.removeEventListener(
				'mousemove',
				this.onDocumentCursorActive,
				!1,
			),
			document.removeEventListener(
				'mousedown',
				this.onDocumentCursorActive,
				!1,
			);
	}
	onDocumentCursorActive(e) {
		this.showCursor(),
			clearTimeout(this.cursorInactiveTimeout),
			(this.cursorInactiveTimeout = setTimeout(
				this.hideCursor.bind(this),
				this.Reveal.getConfig().hideCursorTime,
			));
	}
	onDocumentMouseScroll(e) {
		if (Date.now() - this.lastMouseWheelStep > 1e3) {
			this.lastMouseWheelStep = Date.now();
			let t = e.detail || -e.wheelDelta;
			t > 0 ? this.Reveal.next() : t < 0 && this.Reveal.prev();
		}
	}
}
const D = (e, t) => {
	const i = document.createElement('script');
	(i.type = 'text/javascript'),
		(i.async = !1),
		(i.defer = !1),
		(i.src = e),
		'function' == typeof t &&
			((i.onload = i.onreadystatechange =
				(e) => {
					('load' === e.type ||
						/loaded|complete/.test(i.readyState)) &&
						((i.onload = i.onreadystatechange = i.onerror = null),
						t());
				}),
			(i.onerror = (e) => {
				(i.onload = i.onreadystatechange = i.onerror = null),
					t(new Error('Failed loading script: ' + i.src + '\n' + e));
			}));
	const s = document.querySelector('head');
	s.insertBefore(i, s.lastChild);
};
class T {
	constructor(e) {
		(this.Reveal = e),
			(this.state = 'idle'),
			(this.registeredPlugins = {}),
			(this.asyncDependencies = []);
	}
	load(e, t) {
		return (
			(this.state = 'loading'),
			e.forEach(this.registerPlugin.bind(this)),
			new Promise((e) => {
				let i = [],
					s = 0;
				if (
					(t.forEach((e) => {
						(e.condition && !e.condition()) ||
							(e.async
								? this.asyncDependencies.push(e)
								: i.push(e));
					}),
					i.length)
				) {
					s = i.length;
					const t = (t) => {
						t && 'function' == typeof t.callback && t.callback(),
							0 == --s && this.initPlugins().then(e);
					};
					i.forEach((e) => {
						'string' == typeof e.id
							? (this.registerPlugin(e), t(e))
							: 'string' == typeof e.src
							  ? D(e.src, () => t(e))
							  : (console.warn('Unrecognized plugin format', e),
							    t());
					});
				} else this.initPlugins().then(e);
			})
		);
	}
	initPlugins() {
		return new Promise((e) => {
			let t = Object.values(this.registeredPlugins),
				i = t.length;
			if (0 === i) this.loadAsync().then(e);
			else {
				let s,
					n = () => {
						0 == --i ? this.loadAsync().then(e) : s();
					},
					a = 0;
				(s = () => {
					let e = t[a++];
					if ('function' == typeof e.init) {
						let t = e.init(this.Reveal);
						t && 'function' == typeof t.then ? t.then(n) : n();
					} else n();
				}),
					s();
			}
		});
	}
	loadAsync() {
		return (
			(this.state = 'loaded'),
			this.asyncDependencies.length &&
				this.asyncDependencies.forEach((e) => {
					D(e.src, e.callback);
				}),
			Promise.resolve()
		);
	}
	registerPlugin(e) {
		2 === arguments.length && 'string' == typeof arguments[0]
			? ((e = arguments[1]).id = arguments[0])
			: 'function' == typeof e && (e = e());
		let t = e.id;
		'string' != typeof t
			? console.warn(
					"Unrecognized plugin format; can't find plugin.id",
					e,
			  )
			: void 0 === this.registeredPlugins[t]
			  ? ((this.registeredPlugins[t] = e),
			    'loaded' === this.state &&
						'function' == typeof e.init &&
						e.init(this.Reveal))
			  : console.warn(
						'reveal.js: "' +
							t +
							'" plugin has already been registered',
			    );
	}
	hasPlugin(e) {
		return !!this.registeredPlugins[e];
	}
	getPlugin(e) {
		return this.registeredPlugins[e];
	}
	getRegisteredPlugins() {
		return this.registeredPlugins;
	}
	destroy() {
		Object.values(this.registeredPlugins).forEach((e) => {
			'function' == typeof e.destroy && e.destroy();
		}),
			(this.registeredPlugins = {}),
			(this.asyncDependencies = []);
	}
}
class F {
	constructor(e) {
		this.Reveal = e;
	}
	async setupPDF() {
		const e = this.Reveal.getConfig(),
			i = t(this.Reveal.getRevealElement(), y),
			s = e.slideNumber && /all|print/i.test(e.showSlideNumber),
			n = this.Reveal.getComputedSlideSize(
				window.innerWidth,
				window.innerHeight,
			),
			a = Math.floor(n.width * (1 + e.margin)),
			o = Math.floor(n.height * (1 + e.margin)),
			l = n.width,
			d = n.height;
		await new Promise(requestAnimationFrame),
			r('@page{size:' + a + 'px ' + o + 'px; margin: 0px;}'),
			r(
				'.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: ' +
					l +
					'px; max-height:' +
					d +
					'px}',
			),
			document.documentElement.classList.add('print-pdf'),
			(document.body.style.width = a + 'px'),
			(document.body.style.height = o + 'px');
		const c = document.querySelector('.reveal-viewport');
		let h;
		if (c) {
			const e = window.getComputedStyle(c);
			e && e.background && (h = e.background);
		}
		await new Promise(requestAnimationFrame),
			this.Reveal.layoutSlideContents(l, d),
			await new Promise(requestAnimationFrame);
		const u = i.map((e) => e.scrollHeight),
			g = [],
			v = i[0].parentNode;
		let p = 1;
		i.forEach(function (i, n) {
			if (!1 === i.classList.contains('stack')) {
				let r = (a - l) / 2,
					c = (o - d) / 2;
				const v = u[n];
				let m = Math.max(Math.ceil(v / o), 1);
				(m = Math.min(m, e.pdfMaxPagesPerSlide)),
					((1 === m && e.center) || i.classList.contains('center')) &&
						(c = Math.max((o - v) / 2, 0));
				const f = document.createElement('div');
				if (
					(g.push(f),
					(f.className = 'pdf-page'),
					(f.style.height = (o + e.pdfPageHeightOffset) * m + 'px'),
					h && (f.style.background = h),
					f.appendChild(i),
					(i.style.left = r + 'px'),
					(i.style.top = c + 'px'),
					(i.style.width = l + 'px'),
					this.Reveal.slideContent.layout(i),
					i.slideBackgroundElement &&
						f.insertBefore(i.slideBackgroundElement, i),
					e.showNotes)
				) {
					const t = this.Reveal.getSlideNotes(i);
					if (t) {
						const i = 8,
							s =
								'string' == typeof e.showNotes
									? e.showNotes
									: 'inline',
							n = document.createElement('div');
						n.classList.add('speaker-notes'),
							n.classList.add('speaker-notes-pdf'),
							n.setAttribute('data-layout', s),
							(n.innerHTML = t),
							'separate-page' === s
								? g.push(n)
								: ((n.style.left = i + 'px'),
								  (n.style.bottom = i + 'px'),
								  (n.style.width = a - 2 * i + 'px'),
								  f.appendChild(n));
					}
				}
				if (s) {
					const e = document.createElement('div');
					e.classList.add('slide-number'),
						e.classList.add('slide-number-pdf'),
						(e.innerHTML = p++),
						f.appendChild(e);
				}
				if (e.pdfSeparateFragments) {
					const e = this.Reveal.fragments.sort(
						f.querySelectorAll('.fragment'),
						!0,
					);
					let t;
					e.forEach(function (e, i) {
						t &&
							t.forEach(function (e) {
								e.classList.remove('current-fragment');
							}),
							e.forEach(function (e) {
								e.classList.add('visible', 'current-fragment');
							}, this);
						const n = f.cloneNode(!0);
						if (s) {
							const e = i + 1;
							n.querySelector('.slide-number-pdf').innerHTML +=
								'.' + e;
						}
						g.push(n), (t = e);
					}, this),
						e.forEach(function (e) {
							e.forEach(function (e) {
								e.classList.remove(
									'visible',
									'current-fragment',
								);
							});
						});
				} else
					t(f, '.fragment:not(.fade-out)').forEach(function (e) {
						e.classList.add('visible');
					});
			}
		}, this),
			await new Promise(requestAnimationFrame),
			g.forEach((e) => v.appendChild(e)),
			this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),
			this.Reveal.dispatchEvent({ type: 'pdf-ready' });
	}
	isPrintingPDF() {
		return /print-pdf/gi.test(window.location.search);
	}
}
class z {
	constructor(e) {
		(this.Reveal = e),
			(this.touchStartX = 0),
			(this.touchStartY = 0),
			(this.touchStartCount = 0),
			(this.touchCaptured = !1),
			(this.onPointerDown = this.onPointerDown.bind(this)),
			(this.onPointerMove = this.onPointerMove.bind(this)),
			(this.onPointerUp = this.onPointerUp.bind(this)),
			(this.onTouchStart = this.onTouchStart.bind(this)),
			(this.onTouchMove = this.onTouchMove.bind(this)),
			(this.onTouchEnd = this.onTouchEnd.bind(this));
	}
	bind() {
		let e = this.Reveal.getRevealElement();
		'onpointerdown' in window
			? (e.addEventListener('pointerdown', this.onPointerDown, !1),
			  e.addEventListener('pointermove', this.onPointerMove, !1),
			  e.addEventListener('pointerup', this.onPointerUp, !1))
			: window.navigator.msPointerEnabled
			  ? (e.addEventListener('MSPointerDown', this.onPointerDown, !1),
			    e.addEventListener('MSPointerMove', this.onPointerMove, !1),
			    e.addEventListener('MSPointerUp', this.onPointerUp, !1))
			  : (e.addEventListener('touchstart', this.onTouchStart, !1),
			    e.addEventListener('touchmove', this.onTouchMove, !1),
			    e.addEventListener('touchend', this.onTouchEnd, !1));
	}
	unbind() {
		let e = this.Reveal.getRevealElement();
		e.removeEventListener('pointerdown', this.onPointerDown, !1),
			e.removeEventListener('pointermove', this.onPointerMove, !1),
			e.removeEventListener('pointerup', this.onPointerUp, !1),
			e.removeEventListener('MSPointerDown', this.onPointerDown, !1),
			e.removeEventListener('MSPointerMove', this.onPointerMove, !1),
			e.removeEventListener('MSPointerUp', this.onPointerUp, !1),
			e.removeEventListener('touchstart', this.onTouchStart, !1),
			e.removeEventListener('touchmove', this.onTouchMove, !1),
			e.removeEventListener('touchend', this.onTouchEnd, !1);
	}
	isSwipePrevented(e) {
		if (a(e, 'video, audio')) return !0;
		for (; e && 'function' == typeof e.hasAttribute; ) {
			if (e.hasAttribute('data-prevent-swipe')) return !0;
			e = e.parentNode;
		}
		return !1;
	}
	onTouchStart(e) {
		if (this.isSwipePrevented(e.target)) return !0;
		(this.touchStartX = e.touches[0].clientX),
			(this.touchStartY = e.touches[0].clientY),
			(this.touchStartCount = e.touches.length);
	}
	onTouchMove(e) {
		if (this.isSwipePrevented(e.target)) return !0;
		let t = this.Reveal.getConfig();
		if (this.touchCaptured) u && e.preventDefault();
		else {
			this.Reveal.onUserInput(e);
			let i = e.touches[0].clientX,
				s = e.touches[0].clientY;
			if (1 === e.touches.length && 2 !== this.touchStartCount) {
				let n = this.Reveal.availableRoutes({ includeFragments: !0 }),
					a = i - this.touchStartX,
					o = s - this.touchStartY;
				a > 40 && Math.abs(a) > Math.abs(o)
					? ((this.touchCaptured = !0),
					  'linear' === t.navigationMode
							? t.rtl
								? this.Reveal.next()
								: this.Reveal.prev()
							: this.Reveal.left())
					: a < -40 && Math.abs(a) > Math.abs(o)
					  ? ((this.touchCaptured = !0),
					    'linear' === t.navigationMode
								? t.rtl
									? this.Reveal.prev()
									: this.Reveal.next()
								: this.Reveal.right())
					  : o > 40 && n.up
					    ? ((this.touchCaptured = !0),
					      'linear' === t.navigationMode
									? this.Reveal.prev()
									: this.Reveal.up())
					    : o < -40 &&
					      n.down &&
					      ((this.touchCaptured = !0),
					      'linear' === t.navigationMode
									? this.Reveal.next()
									: this.Reveal.down()),
					t.embedded
						? (this.touchCaptured ||
								this.Reveal.isVerticalSlide()) &&
						  e.preventDefault()
						: e.preventDefault();
			}
		}
	}
	onTouchEnd(e) {
		this.touchCaptured = !1;
	}
	onPointerDown(e) {
		(e.pointerType !== e.MSPOINTER_TYPE_TOUCH &&
			'touch' !== e.pointerType) ||
			((e.touches = [{ clientX: e.clientX, clientY: e.clientY }]),
			this.onTouchStart(e));
	}
	onPointerMove(e) {
		(e.pointerType !== e.MSPOINTER_TYPE_TOUCH &&
			'touch' !== e.pointerType) ||
			((e.touches = [{ clientX: e.clientX, clientY: e.clientY }]),
			this.onTouchMove(e));
	}
	onPointerUp(e) {
		(e.pointerType !== e.MSPOINTER_TYPE_TOUCH &&
			'touch' !== e.pointerType) ||
			((e.touches = [{ clientX: e.clientX, clientY: e.clientY }]),
			this.onTouchEnd(e));
	}
}
const H = 'focus',
	B = 'blur';
class O {
	constructor(e) {
		(this.Reveal = e),
			(this.onRevealPointerDown = this.onRevealPointerDown.bind(this)),
			(this.onDocumentPointerDown =
				this.onDocumentPointerDown.bind(this));
	}
	configure(e, t) {
		e.embedded ? this.blur() : (this.focus(), this.unbind());
	}
	bind() {
		this.Reveal.getConfig().embedded &&
			this.Reveal.getRevealElement().addEventListener(
				'pointerdown',
				this.onRevealPointerDown,
				!1,
			);
	}
	unbind() {
		this.Reveal.getRevealElement().removeEventListener(
			'pointerdown',
			this.onRevealPointerDown,
			!1,
		),
			document.removeEventListener(
				'pointerdown',
				this.onDocumentPointerDown,
				!1,
			);
	}
	focus() {
		this.state !== H &&
			(this.Reveal.getRevealElement().classList.add('focused'),
			document.addEventListener(
				'pointerdown',
				this.onDocumentPointerDown,
				!1,
			)),
			(this.state = H);
	}
	blur() {
		this.state !== B &&
			(this.Reveal.getRevealElement().classList.remove('focused'),
			document.removeEventListener(
				'pointerdown',
				this.onDocumentPointerDown,
				!1,
			)),
			(this.state = B);
	}
	isFocused() {
		return this.state === H;
	}
	destroy() {
		this.Reveal.getRevealElement().classList.remove('focused');
	}
	onRevealPointerDown(e) {
		this.focus();
	}
	onDocumentPointerDown(e) {
		let t = o(e.target, '.reveal');
		(t && t === this.Reveal.getRevealElement()) || this.blur();
	}
}
class q {
	constructor(e) {
		this.Reveal = e;
	}
	render() {
		(this.element = document.createElement('div')),
			(this.element.className = 'speaker-notes'),
			this.element.setAttribute('data-prevent-swipe', ''),
			this.element.setAttribute('tabindex', '0'),
			this.Reveal.getRevealElement().appendChild(this.element);
	}
	configure(e, t) {
		e.showNotes &&
			this.element.setAttribute(
				'data-layout',
				'string' == typeof e.showNotes ? e.showNotes : 'inline',
			);
	}
	update() {
		this.Reveal.getConfig().showNotes &&
			this.element &&
			this.Reveal.getCurrentSlide() &&
			!this.Reveal.print.isPrintingPDF() &&
			(this.element.innerHTML =
				this.getSlideNotes() ||
				'<span class="notes-placeholder">No notes on this slide.</span>');
	}
	updateVisibility() {
		this.Reveal.getConfig().showNotes &&
		this.hasNotes() &&
		!this.Reveal.print.isPrintingPDF()
			? this.Reveal.getRevealElement().classList.add('show-notes')
			: this.Reveal.getRevealElement().classList.remove('show-notes');
	}
	hasNotes() {
		return (
			this.Reveal.getSlidesElement().querySelectorAll(
				'[data-notes], aside.notes',
			).length > 0
		);
	}
	isSpeakerNotesWindow() {
		return !!window.location.search.match(/receiver/gi);
	}
	getSlideNotes(e = this.Reveal.getCurrentSlide()) {
		if (e.hasAttribute('data-notes')) return e.getAttribute('data-notes');
		let t = e.querySelectorAll('aside.notes');
		return t
			? Array.from(t)
					.map((e) => e.innerHTML)
					.join('\n')
			: null;
	}
	destroy() {
		this.element.remove();
	}
}
class U {
	constructor(e, t) {
		(this.diameter = 100),
			(this.diameter2 = this.diameter / 2),
			(this.thickness = 6),
			(this.playing = !1),
			(this.progress = 0),
			(this.progressOffset = 1),
			(this.container = e),
			(this.progressCheck = t),
			(this.canvas = document.createElement('canvas')),
			(this.canvas.className = 'playback'),
			(this.canvas.width = this.diameter),
			(this.canvas.height = this.diameter),
			(this.canvas.style.width = this.diameter2 + 'px'),
			(this.canvas.style.height = this.diameter2 + 'px'),
			(this.context = this.canvas.getContext('2d')),
			this.container.appendChild(this.canvas),
			this.render();
	}
	setPlaying(e) {
		const t = this.playing;
		(this.playing = e), !t && this.playing ? this.animate() : this.render();
	}
	animate() {
		const e = this.progress;
		(this.progress = this.progressCheck()),
			e > 0.8 &&
				this.progress < 0.2 &&
				(this.progressOffset = this.progress),
			this.render(),
			this.playing && requestAnimationFrame(this.animate.bind(this));
	}
	render() {
		let e = this.playing ? this.progress : 0,
			t = this.diameter2 - this.thickness,
			i = this.diameter2,
			s = this.diameter2,
			n = 28;
		this.progressOffset += 0.1 * (1 - this.progressOffset);
		const a = -Math.PI / 2 + e * (2 * Math.PI),
			o = -Math.PI / 2 + this.progressOffset * (2 * Math.PI);
		this.context.save(),
			this.context.clearRect(0, 0, this.diameter, this.diameter),
			this.context.beginPath(),
			this.context.arc(i, s, t + 4, 0, 2 * Math.PI, !1),
			(this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )'),
			this.context.fill(),
			this.context.beginPath(),
			this.context.arc(i, s, t, 0, 2 * Math.PI, !1),
			(this.context.lineWidth = this.thickness),
			(this.context.strokeStyle = 'rgba( 255, 255, 255, 0.2 )'),
			this.context.stroke(),
			this.playing &&
				(this.context.beginPath(),
				this.context.arc(i, s, t, o, a, !1),
				(this.context.lineWidth = this.thickness),
				(this.context.strokeStyle = '#fff'),
				this.context.stroke()),
			this.context.translate(i - 14, s - 14),
			this.playing
				? ((this.context.fillStyle = '#fff'),
				  this.context.fillRect(0, 0, 10, n),
				  this.context.fillRect(18, 0, 10, n))
				: (this.context.beginPath(),
				  this.context.translate(4, 0),
				  this.context.moveTo(0, 0),
				  this.context.lineTo(24, 14),
				  this.context.lineTo(0, n),
				  (this.context.fillStyle = '#fff'),
				  this.context.fill()),
			this.context.restore();
	}
	on(e, t) {
		this.canvas.addEventListener(e, t, !1);
	}
	off(e, t) {
		this.canvas.removeEventListener(e, t, !1);
	}
	destroy() {
		(this.playing = !1),
			this.canvas.parentNode && this.container.removeChild(this.canvas);
	}
}
var j = {
	width: 960,
	height: 700,
	margin: 0.04,
	minScale: 0.2,
	maxScale: 2,
	controls: !0,
	controlsTutorial: !0,
	controlsLayout: 'bottom-right',
	controlsBackArrows: 'faded',
	progress: !0,
	slideNumber: !1,
	showSlideNumber: 'all',
	hashOneBasedIndex: !1,
	hash: !1,
	respondToHashChanges: !0,
	jumpToSlide: !0,
	history: !1,
	keyboard: !0,
	keyboardCondition: null,
	disableLayout: !1,
	overview: !0,
	center: !0,
	touch: !0,
	loop: !1,
	rtl: !1,
	navigationMode: 'default',
	shuffle: !1,
	fragments: !0,
	fragmentInURL: !0,
	embedded: !1,
	help: !0,
	pause: !0,
	showNotes: !1,
	showHiddenSlides: !1,
	autoPlayMedia: null,
	preloadIframes: null,
	autoAnimate: !0,
	autoAnimateMatcher: null,
	autoAnimateEasing: 'ease',
	autoAnimateDuration: 1,
	autoAnimateUnmatched: !0,
	autoAnimateStyles: [
		'opacity',
		'color',
		'background-color',
		'padding',
		'font-size',
		'line-height',
		'letter-spacing',
		'border-width',
		'border-color',
		'border-radius',
		'outline',
		'outline-offset',
	],
	autoSlide: 0,
	autoSlideStoppable: !0,
	autoSlideMethod: null,
	defaultTiming: null,
	mouseWheel: !1,
	previewLinks: !1,
	postMessage: !0,
	postMessageEvents: !1,
	focusBodyOnPageVisibilityChange: !0,
	transition: 'slide',
	transitionSpeed: 'default',
	backgroundTransition: 'fade',
	parallaxBackgroundImage: '',
	parallaxBackgroundSize: '',
	parallaxBackgroundRepeat: '',
	parallaxBackgroundPosition: '',
	parallaxBackgroundHorizontal: null,
	parallaxBackgroundVertical: null,
	pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
	pdfSeparateFragments: !0,
	pdfPageHeightOffset: -1,
	viewDistance: 3,
	mobileViewDistance: 2,
	display: 'block',
	hideInactiveCursor: !0,
	hideCursorTime: 5e3,
	sortFragmentsOnSync: !0,
	dependencies: [],
	plugins: [],
};
const W = '4.5.0';
function K(a, r) {
	arguments.length < 2 &&
		((r = arguments[0]), (a = document.querySelector('.reveal')));
	const d = {};
	let c,
		u,
		g,
		f,
		S,
		A = {},
		D = !1,
		H = { hasNavigatedHorizontally: !1, hasNavigatedVertically: !1 },
		B = [],
		K = 1,
		V = { layout: '', overview: '' },
		$ = {},
		X = 'idle',
		Y = 0,
		_ = 0,
		J = -1,
		G = !1,
		Q = new v(d),
		Z = new p(d),
		ee = new m(d),
		te = new k(d),
		ie = new b(d),
		se = new L(d),
		ne = new C(d),
		ae = new x(d),
		oe = new P(d),
		re = new N(d),
		le = new M(d),
		de = new I(d),
		ce = new T(d),
		he = new F(d),
		ue = new O(d),
		ge = new z(d),
		ve = new q(d);
	function pe() {
		(D = !0),
			A.showHiddenSlides ||
				t($.wrapper, 'section[data-visibility="hidden"]').forEach(
					(e) => {
						e.parentNode.removeChild(e);
					},
				),
			(function () {
				$.slides.classList.add('no-transition'),
					h
						? $.wrapper.classList.add('no-hover')
						: $.wrapper.classList.remove('no-hover');
				ie.render(),
					Z.render(),
					ee.render(),
					re.render(),
					le.render(),
					ve.render(),
					($.pauseOverlay = ((e, t, i, s = '') => {
						let n = e.querySelectorAll('.' + i);
						for (let t = 0; t < n.length; t++) {
							let i = n[t];
							if (i.parentNode === e) return i;
						}
						let a = document.createElement(t);
						return (
							(a.className = i),
							(a.innerHTML = s),
							e.appendChild(a),
							a
						);
					})(
						$.wrapper,
						'div',
						'pause-overlay',
						A.controls
							? '<button class="resume-button">Resume presentation</button>'
							: null,
					)),
					($.statusElement = (function () {
						let e = $.wrapper.querySelector('.aria-status');
						e ||
							((e = document.createElement('div')),
							(e.style.position = 'absolute'),
							(e.style.height = '1px'),
							(e.style.width = '1px'),
							(e.style.overflow = 'hidden'),
							(e.style.clip = 'rect( 1px, 1px, 1px, 1px )'),
							e.classList.add('aria-status'),
							e.setAttribute('aria-live', 'polite'),
							e.setAttribute('aria-atomic', 'true'),
							$.wrapper.appendChild(e));
						return e;
					})()),
					$.wrapper.setAttribute('role', 'application');
			})(),
			A.postMessage && window.addEventListener('message', bt, !1),
			setInterval(() => {
				(0 === $.wrapper.scrollTop && 0 === $.wrapper.scrollLeft) ||
					(($.wrapper.scrollTop = 0), ($.wrapper.scrollLeft = 0));
			}, 1e3),
			document.addEventListener('fullscreenchange', St),
			document.addEventListener('webkitfullscreenchange', St),
			tt().forEach((e) => {
				t(e, 'section').forEach((e, t) => {
					t > 0 &&
						(e.classList.remove('present'),
						e.classList.remove('past'),
						e.classList.add('future'),
						e.setAttribute('aria-hidden', 'true'));
				});
			}),
			be(),
			oe.readURL(),
			ie.update(!0),
			setTimeout(() => {
				$.slides.classList.remove('no-transition'),
					$.wrapper.classList.add('ready'),
					Ae({
						type: 'ready',
						data: { indexh: c, indexv: u, currentSlide: f },
					});
			}, 1),
			he.isPrintingPDF() &&
				(we(),
				'complete' === document.readyState
					? he.setupPDF()
					: window.addEventListener('load', () => {
							he.setupPDF();
					  }));
	}
	function me(e) {
		$.statusElement.textContent = e;
	}
	function fe(e) {
		let t = '';
		if (3 === e.nodeType) t += e.textContent;
		else if (1 === e.nodeType) {
			let i = e.getAttribute('aria-hidden'),
				s = 'none' === window.getComputedStyle(e).display;
			'true' === i ||
				s ||
				Array.from(e.childNodes).forEach((e) => {
					t += fe(e);
				});
		}
		return (t = t.trim()), '' === t ? '' : t + ' ';
	}
	function be(t) {
		const s = { ...A };
		if (('object' == typeof t && e(A, t), !1 === d.isReady())) return;
		const n = $.wrapper.querySelectorAll(y).length;
		$.wrapper.classList.remove(s.transition),
			$.wrapper.classList.add(A.transition),
			$.wrapper.setAttribute('data-transition-speed', A.transitionSpeed),
			$.wrapper.setAttribute(
				'data-background-transition',
				A.backgroundTransition,
			),
			$.viewport.style.setProperty('--slide-width', A.width + 'px'),
			$.viewport.style.setProperty('--slide-height', A.height + 'px'),
			A.shuffle && $e(),
			i($.wrapper, 'embedded', A.embedded),
			i($.wrapper, 'rtl', A.rtl),
			i($.wrapper, 'center', A.center),
			!1 === A.pause && Ue(),
			A.previewLinks
				? (Le(), Ce('[data-preview-link=false]'))
				: (Ce(),
				  Le('[data-preview-link]:not([data-preview-link=false])')),
			te.reset(),
			S && (S.destroy(), (S = null)),
			n > 1 &&
				A.autoSlide &&
				A.autoSlideStoppable &&
				((S = new U($.wrapper, () =>
					Math.min(Math.max((Date.now() - J) / Y, 0), 1),
				)),
				S.on('click', kt),
				(G = !1)),
			'default' !== A.navigationMode
				? $.wrapper.setAttribute(
						'data-navigation-mode',
						A.navigationMode,
				  )
				: $.wrapper.removeAttribute('data-navigation-mode'),
			ve.configure(A, s),
			ue.configure(A, s),
			de.configure(A, s),
			re.configure(A, s),
			le.configure(A, s),
			ae.configure(A, s),
			se.configure(A, s),
			Z.configure(A, s),
			Ve();
	}
	function ye() {
		window.addEventListener('resize', Et, !1),
			A.touch && ge.bind(),
			A.keyboard && ae.bind(),
			A.progress && le.bind(),
			A.respondToHashChanges && oe.bind(),
			re.bind(),
			ue.bind(),
			$.slides.addEventListener('click', wt, !1),
			$.slides.addEventListener('transitionend', yt, !1),
			$.pauseOverlay.addEventListener('click', Ue, !1),
			A.focusBodyOnPageVisibilityChange &&
				document.addEventListener('visibilitychange', Rt, !1);
	}
	function we() {
		ge.unbind(),
			ue.unbind(),
			ae.unbind(),
			re.unbind(),
			le.unbind(),
			oe.unbind(),
			window.removeEventListener('resize', Et, !1),
			$.slides.removeEventListener('click', wt, !1),
			$.slides.removeEventListener('transitionend', yt, !1),
			$.pauseOverlay.removeEventListener('click', Ue, !1);
	}
	function Ee(e, t, i) {
		a.addEventListener(e, t, i);
	}
	function Re(e, t, i) {
		a.removeEventListener(e, t, i);
	}
	function Se(e) {
		'string' == typeof e.layout && (V.layout = e.layout),
			'string' == typeof e.overview && (V.overview = e.overview),
			V.layout
				? n($.slides, V.layout + ' ' + V.overview)
				: n($.slides, V.overview);
	}
	function Ae({ target: t = $.wrapper, type: i, data: s, bubbles: n = !0 }) {
		let a = document.createEvent('HTMLEvents', 1, 2);
		return (
			a.initEvent(i, n, !0),
			e(a, s),
			t.dispatchEvent(a),
			t === $.wrapper && ke(i),
			a
		);
	}
	function ke(t, i) {
		if (A.postMessageEvents && window.parent !== window.self) {
			let s = { namespace: 'reveal', eventName: t, state: rt() };
			e(s, i), window.parent.postMessage(JSON.stringify(s), '*');
		}
	}
	function Le(e = 'a') {
		Array.from($.wrapper.querySelectorAll(e)).forEach((e) => {
			/^(http|www)/gi.test(e.getAttribute('href')) &&
				e.addEventListener('click', At, !1);
		});
	}
	function Ce(e = 'a') {
		Array.from($.wrapper.querySelectorAll(e)).forEach((e) => {
			/^(http|www)/gi.test(e.getAttribute('href')) &&
				e.removeEventListener('click', At, !1);
		});
	}
	function xe(e) {
		Ne(),
			($.overlay = document.createElement('div')),
			$.overlay.classList.add('overlay'),
			$.overlay.classList.add('overlay-preview'),
			$.wrapper.appendChild($.overlay),
			($.overlay.innerHTML = `<header>\n\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t<a class="external" href="${e}" target="_blank"><span class="icon"></span></a>\n\t\t\t</header>\n\t\t\t<div class="spinner"></div>\n\t\t\t<div class="viewport">\n\t\t\t\t<iframe src="${e}"></iframe>\n\t\t\t\t<small class="viewport-inner">\n\t\t\t\t\t<span class="x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>\n\t\t\t\t</small>\n\t\t\t</div>`),
			$.overlay.querySelector('iframe').addEventListener(
				'load',
				(e) => {
					$.overlay.classList.add('loaded');
				},
				!1,
			),
			$.overlay.querySelector('.close').addEventListener(
				'click',
				(e) => {
					Ne(), e.preventDefault();
				},
				!1,
			),
			$.overlay.querySelector('.external').addEventListener(
				'click',
				(e) => {
					Ne();
				},
				!1,
			);
	}
	function Pe() {
		if (A.help) {
			Ne(),
				($.overlay = document.createElement('div')),
				$.overlay.classList.add('overlay'),
				$.overlay.classList.add('overlay-help'),
				$.wrapper.appendChild($.overlay);
			let e = '<p class="title">Keyboard Shortcuts</p><br/>',
				t = ae.getShortcuts(),
				i = ae.getBindings();
			e += '<table><th>KEY</th><th>ACTION</th>';
			for (let i in t) e += `<tr><td>${i}</td><td>${t[i]}</td></tr>`;
			for (let t in i)
				i[t].key &&
					i[t].description &&
					(e += `<tr><td>${i[t].key}</td><td>${i[t].description}</td></tr>`);
			(e += '</table>'),
				($.overlay.innerHTML = `\n\t\t\t\t<header>\n\t\t\t\t\t<a class="close" href="#"><span class="icon"></span></a>\n\t\t\t\t</header>\n\t\t\t\t<div class="viewport">\n\t\t\t\t\t<div class="viewport-inner">${e}</div>\n\t\t\t\t</div>\n\t\t\t`),
				$.overlay.querySelector('.close').addEventListener(
					'click',
					(e) => {
						Ne(), e.preventDefault();
					},
					!1,
				);
		}
	}
	function Ne() {
		return (
			!!$.overlay &&
			($.overlay.parentNode.removeChild($.overlay),
			($.overlay = null),
			!0)
		);
	}
	function Me() {
		if ($.wrapper && !he.isPrintingPDF()) {
			if (!A.disableLayout) {
				h &&
					!A.embedded &&
					document.documentElement.style.setProperty(
						'--vh',
						0.01 * window.innerHeight + 'px',
					);
				const e = De(),
					t = K;
				Ie(A.width, A.height),
					($.slides.style.width = e.width + 'px'),
					($.slides.style.height = e.height + 'px'),
					(K = Math.min(
						e.presentationWidth / e.width,
						e.presentationHeight / e.height,
					)),
					(K = Math.max(K, A.minScale)),
					(K = Math.min(K, A.maxScale)),
					1 === K
						? (($.slides.style.zoom = ''),
						  ($.slides.style.left = ''),
						  ($.slides.style.top = ''),
						  ($.slides.style.bottom = ''),
						  ($.slides.style.right = ''),
						  Se({ layout: '' }))
						: (($.slides.style.zoom = ''),
						  ($.slides.style.left = '50%'),
						  ($.slides.style.top = '50%'),
						  ($.slides.style.bottom = 'auto'),
						  ($.slides.style.right = 'auto'),
						  Se({
								layout:
									'translate(-50%, -50%) scale(' + K + ')',
						  }));
				const i = Array.from($.wrapper.querySelectorAll(y));
				for (let t = 0, s = i.length; t < s; t++) {
					const s = i[t];
					'none' !== s.style.display &&
						(A.center || s.classList.contains('center')
							? s.classList.contains('stack')
								? (s.style.top = 0)
								: (s.style.top =
										Math.max(
											(e.height - s.scrollHeight) / 2,
											0,
										) + 'px')
							: (s.style.top = ''));
				}
				t !== K &&
					Ae({
						type: 'resize',
						data: { oldScale: t, scale: K, size: e },
					});
			}
			$.viewport.style.setProperty('--slide-scale', K),
				le.update(),
				ie.updateParallax(),
				ne.isActive() && ne.update();
		}
	}
	function Ie(e, i) {
		t($.slides, 'section > .stretch, section > .r-stretch').forEach((t) => {
			let s = ((e, t = 0) => {
				if (e) {
					let i,
						s = e.style.height;
					return (
						(e.style.height = '0px'),
						(e.parentNode.style.height = 'auto'),
						(i = t - e.parentNode.offsetHeight),
						(e.style.height = s + 'px'),
						e.parentNode.style.removeProperty('height'),
						i
					);
				}
				return t;
			})(t, i);
			if (/(img|video)/gi.test(t.nodeName)) {
				const i = t.naturalWidth || t.videoWidth,
					n = t.naturalHeight || t.videoHeight,
					a = Math.min(e / i, s / n);
				(t.style.width = i * a + 'px'), (t.style.height = n * a + 'px');
			} else (t.style.width = e + 'px'), (t.style.height = s + 'px');
		});
	}
	function De(e, t) {
		let i = A.width,
			s = A.height;
		A.disableLayout &&
			((i = $.slides.offsetWidth), (s = $.slides.offsetHeight));
		const n = {
			width: i,
			height: s,
			presentationWidth: e || $.wrapper.offsetWidth,
			presentationHeight: t || $.wrapper.offsetHeight,
		};
		return (
			(n.presentationWidth -= n.presentationWidth * A.margin),
			(n.presentationHeight -= n.presentationHeight * A.margin),
			'string' == typeof n.width &&
				/%$/.test(n.width) &&
				(n.width = (parseInt(n.width, 10) / 100) * n.presentationWidth),
			'string' == typeof n.height &&
				/%$/.test(n.height) &&
				(n.height =
					(parseInt(n.height, 10) / 100) * n.presentationHeight),
			n
		);
	}
	function Te(e, t) {
		'object' == typeof e &&
			'function' == typeof e.setAttribute &&
			e.setAttribute('data-previous-indexv', t || 0);
	}
	function Fe(e) {
		if (
			'object' == typeof e &&
			'function' == typeof e.setAttribute &&
			e.classList.contains('stack')
		) {
			const t = e.hasAttribute('data-start-indexv')
				? 'data-start-indexv'
				: 'data-previous-indexv';
			return parseInt(e.getAttribute(t) || 0, 10);
		}
		return 0;
	}
	function ze(e = f) {
		return e && e.parentNode && !!e.parentNode.nodeName.match(/section/i);
	}
	function He() {
		return !(!f || !ze(f)) && !f.nextElementSibling;
	}
	function Be() {
		return 0 === c && 0 === u;
	}
	function Oe() {
		return (
			!!f &&
			!f.nextElementSibling &&
			(!ze(f) || !f.parentNode.nextElementSibling)
		);
	}
	function qe() {
		if (A.pause) {
			const e = $.wrapper.classList.contains('paused');
			dt(),
				$.wrapper.classList.add('paused'),
				!1 === e && Ae({ type: 'paused' });
		}
	}
	function Ue() {
		const e = $.wrapper.classList.contains('paused');
		$.wrapper.classList.remove('paused'),
			lt(),
			e && Ae({ type: 'resumed' });
	}
	function je(e) {
		'boolean' == typeof e ? (e ? qe() : Ue()) : We() ? Ue() : qe();
	}
	function We() {
		return $.wrapper.classList.contains('paused');
	}
	function Ke(e, i, s, n) {
		if (
			Ae({
				type: 'beforeslidechange',
				data: {
					indexh: void 0 === e ? c : e,
					indexv: void 0 === i ? u : i,
					origin: n,
				},
			}).defaultPrevented
		)
			return;
		g = f;
		const a = $.wrapper.querySelectorAll(w);
		if (0 === a.length) return;
		void 0 !== i || ne.isActive() || (i = Fe(a[e])),
			g &&
				g.parentNode &&
				g.parentNode.classList.contains('stack') &&
				Te(g.parentNode, u);
		const o = B.concat();
		B.length = 0;
		let r = c || 0,
			l = u || 0;
		(c = Xe(w, void 0 === e ? c : e)), (u = Xe(E, void 0 === i ? u : i));
		let d = c !== r || u !== l;
		d || (g = null);
		let h = a[c],
			v = h.querySelectorAll('section');
		f = v[u] || h;
		let p = !1;
		d &&
			g &&
			f &&
			!ne.isActive() &&
			(g.hasAttribute('data-auto-animate') &&
				f.hasAttribute('data-auto-animate') &&
				g.getAttribute('data-auto-animate-id') ===
					f.getAttribute('data-auto-animate-id') &&
				!(c > r || u > l ? f : g).hasAttribute(
					'data-auto-animate-restart',
				) &&
				((p = !0), $.slides.classList.add('disable-slide-transitions')),
			(X = 'running')),
			Je(),
			Me(),
			ne.isActive() && ne.update(),
			void 0 !== s && se.goto(s),
			g &&
				g !== f &&
				(g.classList.remove('present'),
				g.setAttribute('aria-hidden', 'true'),
				Be() &&
					setTimeout(() => {
						t($.wrapper, w + '.stack').forEach((e) => {
							Te(e, 0);
						});
					}, 0));
		e: for (let e = 0, t = B.length; e < t; e++) {
			for (let t = 0; t < o.length; t++)
				if (o[t] === B[e]) {
					o.splice(t, 1);
					continue e;
				}
			$.viewport.classList.add(B[e]), Ae({ type: B[e] });
		}
		for (; o.length; ) $.viewport.classList.remove(o.pop());
		d &&
			Ae({
				type: 'slidechanged',
				data: {
					indexh: c,
					indexv: u,
					previousSlide: g,
					currentSlide: f,
					origin: n,
				},
			}),
			(!d && g) || (Q.stopEmbeddedContent(g), Q.startEmbeddedContent(f)),
			requestAnimationFrame(() => {
				me(fe(f));
			}),
			le.update(),
			re.update(),
			ve.update(),
			ie.update(),
			ie.updateParallax(),
			Z.update(),
			se.update(),
			oe.writeURL(),
			lt(),
			p &&
				(setTimeout(() => {
					$.slides.classList.remove('disable-slide-transitions');
				}, 0),
				A.autoAnimate && te.run(g, f));
	}
	function Ve() {
		we(),
			ye(),
			Me(),
			(Y = A.autoSlide),
			lt(),
			ie.create(),
			oe.writeURL(),
			!0 === A.sortFragmentsOnSync && se.sortAll(),
			re.update(),
			le.update(),
			Je(),
			ve.update(),
			ve.updateVisibility(),
			ie.update(!0),
			Z.update(),
			Q.formatEmbeddedContent(),
			!1 === A.autoPlayMedia
				? Q.stopEmbeddedContent(f, { unloadIframes: !1 })
				: Q.startEmbeddedContent(f),
			ne.isActive() && ne.layout();
	}
	function $e(e = tt()) {
		e.forEach((t, i) => {
			let s = e[Math.floor(Math.random() * e.length)];
			s.parentNode === t.parentNode && t.parentNode.insertBefore(t, s);
			let n = t.querySelectorAll('section');
			n.length && $e(n);
		});
	}
	function Xe(e, i) {
		let s = t($.wrapper, e),
			n = s.length,
			a = he.isPrintingPDF(),
			o = !1,
			r = !1;
		if (n) {
			A.loop &&
				(i >= n && (o = !0), (i %= n) < 0 && ((i = n + i), (r = !0))),
				(i = Math.max(Math.min(i, n - 1), 0));
			for (let e = 0; e < n; e++) {
				let t = s[e],
					n = A.rtl && !ze(t);
				t.classList.remove('past'),
					t.classList.remove('present'),
					t.classList.remove('future'),
					t.setAttribute('hidden', ''),
					t.setAttribute('aria-hidden', 'true'),
					t.querySelector('section') && t.classList.add('stack'),
					a
						? t.classList.add('present')
						: e < i
						  ? (t.classList.add(n ? 'future' : 'past'),
						    A.fragments && Ye(t))
						  : e > i
						    ? (t.classList.add(n ? 'past' : 'future'),
						      A.fragments && _e(t))
						    : e === i &&
						      A.fragments &&
						      (o ? _e(t) : r && Ye(t));
			}
			let e = s[i],
				t = e.classList.contains('present');
			e.classList.add('present'),
				e.removeAttribute('hidden'),
				e.removeAttribute('aria-hidden'),
				t || Ae({ target: e, type: 'visible', bubbles: !1 });
			let l = e.getAttribute('data-state');
			l && (B = B.concat(l.split(' ')));
		} else i = 0;
		return i;
	}
	function Ye(e) {
		t(e, '.fragment').forEach((e) => {
			e.classList.add('visible'), e.classList.remove('current-fragment');
		});
	}
	function _e(e) {
		t(e, '.fragment.visible').forEach((e) => {
			e.classList.remove('visible', 'current-fragment');
		});
	}
	function Je() {
		let e,
			i,
			s = tt(),
			n = s.length;
		if (n && void 0 !== c) {
			let a = ne.isActive() ? 10 : A.viewDistance;
			h && (a = ne.isActive() ? 6 : A.mobileViewDistance),
				he.isPrintingPDF() && (a = Number.MAX_VALUE);
			for (let o = 0; o < n; o++) {
				let r = s[o],
					l = t(r, 'section'),
					d = l.length;
				if (
					((e = Math.abs((c || 0) - o) || 0),
					A.loop && (e = Math.abs(((c || 0) - o) % (n - a)) || 0),
					e < a ? Q.load(r) : Q.unload(r),
					d)
				) {
					let t = Fe(r);
					for (let s = 0; s < d; s++) {
						let n = l[s];
						(i =
							o === (c || 0)
								? Math.abs((u || 0) - s)
								: Math.abs(s - t)),
							e + i < a ? Q.load(n) : Q.unload(n);
					}
				}
			}
			nt()
				? $.wrapper.classList.add('has-vertical-slides')
				: $.wrapper.classList.remove('has-vertical-slides'),
				st()
					? $.wrapper.classList.add('has-horizontal-slides')
					: $.wrapper.classList.remove('has-horizontal-slides');
		}
	}
	function Ge({ includeFragments: e = !1 } = {}) {
		let t = $.wrapper.querySelectorAll(w),
			i = $.wrapper.querySelectorAll(E),
			s = {
				left: c > 0,
				right: c < t.length - 1,
				up: u > 0,
				down: u < i.length - 1,
			};
		if (
			(A.loop &&
				(t.length > 1 && ((s.left = !0), (s.right = !0)),
				i.length > 1 && ((s.up = !0), (s.down = !0))),
			t.length > 1 &&
				'linear' === A.navigationMode &&
				((s.right = s.right || s.down), (s.left = s.left || s.up)),
			!0 === e)
		) {
			let e = se.availableRoutes();
			(s.left = s.left || e.prev),
				(s.up = s.up || e.prev),
				(s.down = s.down || e.next),
				(s.right = s.right || e.next);
		}
		if (A.rtl) {
			let e = s.left;
			(s.left = s.right), (s.right = e);
		}
		return s;
	}
	function Qe(e = f) {
		let t = tt(),
			i = 0;
		e: for (let s = 0; s < t.length; s++) {
			let n = t[s],
				a = n.querySelectorAll('section');
			for (let t = 0; t < a.length; t++) {
				if (a[t] === e) break e;
				'uncounted' !== a[t].dataset.visibility && i++;
			}
			if (n === e) break;
			!1 === n.classList.contains('stack') &&
				'uncounted' !== n.dataset.visibility &&
				i++;
		}
		return i;
	}
	function Ze(e) {
		let i,
			s = c,
			n = u;
		if (e) {
			let i = ze(e),
				a = i ? e.parentNode : e,
				o = tt();
			(s = Math.max(o.indexOf(a), 0)),
				(n = void 0),
				i && (n = Math.max(t(e.parentNode, 'section').indexOf(e), 0));
		}
		if (!e && f) {
			if (f.querySelectorAll('.fragment').length > 0) {
				let e = f.querySelector('.current-fragment');
				i =
					e && e.hasAttribute('data-fragment-index')
						? parseInt(e.getAttribute('data-fragment-index'), 10)
						: f.querySelectorAll('.fragment.visible').length - 1;
			}
		}
		return { h: s, v: n, f: i };
	}
	function et() {
		return t(
			$.wrapper,
			y + ':not(.stack):not([data-visibility="uncounted"])',
		);
	}
	function tt() {
		return t($.wrapper, w);
	}
	function it() {
		return t($.wrapper, '.slides>section>section');
	}
	function st() {
		return tt().length > 1;
	}
	function nt() {
		return it().length > 1;
	}
	function at() {
		return et().length;
	}
	function ot(e, t) {
		let i = tt()[e],
			s = i && i.querySelectorAll('section');
		return s && s.length && 'number' == typeof t ? (s ? s[t] : void 0) : i;
	}
	function rt() {
		let e = Ze();
		return {
			indexh: e.h,
			indexv: e.v,
			indexf: e.f,
			paused: We(),
			overview: ne.isActive(),
		};
	}
	function lt() {
		if ((dt(), f && !1 !== A.autoSlide)) {
			let e = f.querySelector('.current-fragment'),
				i = e ? e.getAttribute('data-autoslide') : null,
				s = f.parentNode
					? f.parentNode.getAttribute('data-autoslide')
					: null,
				n = f.getAttribute('data-autoslide');
			i
				? (Y = parseInt(i, 10))
				: n
				  ? (Y = parseInt(n, 10))
				  : s
				    ? (Y = parseInt(s, 10))
				    : ((Y = A.autoSlide),
				      0 === f.querySelectorAll('.fragment').length &&
								t(f, 'video, audio').forEach((e) => {
									e.hasAttribute('data-autoplay') &&
										Y &&
										(1e3 * e.duration) / e.playbackRate >
											Y &&
										(Y =
											(1e3 * e.duration) /
												e.playbackRate +
											1e3);
								})),
				!Y ||
					G ||
					We() ||
					ne.isActive() ||
					(Oe() && !se.availableRoutes().next && !0 !== A.loop) ||
					((_ = setTimeout(() => {
						'function' == typeof A.autoSlideMethod
							? A.autoSlideMethod()
							: ft(),
							lt();
					}, Y)),
					(J = Date.now())),
				S && S.setPlaying(-1 !== _);
		}
	}
	function dt() {
		clearTimeout(_), (_ = -1);
	}
	function ct() {
		Y &&
			!G &&
			((G = !0),
			Ae({ type: 'autoslidepaused' }),
			clearTimeout(_),
			S && S.setPlaying(!1));
	}
	function ht() {
		Y && G && ((G = !1), Ae({ type: 'autoslideresumed' }), lt());
	}
	function ut({ skipFragments: e = !1 } = {}) {
		(H.hasNavigatedHorizontally = !0),
			A.rtl
				? (ne.isActive() || e || !1 === se.next()) &&
				  Ge().left &&
				  Ke(c + 1, 'grid' === A.navigationMode ? u : void 0)
				: (ne.isActive() || e || !1 === se.prev()) &&
				  Ge().left &&
				  Ke(c - 1, 'grid' === A.navigationMode ? u : void 0);
	}
	function gt({ skipFragments: e = !1 } = {}) {
		(H.hasNavigatedHorizontally = !0),
			A.rtl
				? (ne.isActive() || e || !1 === se.prev()) &&
				  Ge().right &&
				  Ke(c - 1, 'grid' === A.navigationMode ? u : void 0)
				: (ne.isActive() || e || !1 === se.next()) &&
				  Ge().right &&
				  Ke(c + 1, 'grid' === A.navigationMode ? u : void 0);
	}
	function vt({ skipFragments: e = !1 } = {}) {
		(ne.isActive() || e || !1 === se.prev()) && Ge().up && Ke(c, u - 1);
	}
	function pt({ skipFragments: e = !1 } = {}) {
		(H.hasNavigatedVertically = !0),
			(ne.isActive() || e || !1 === se.next()) &&
				Ge().down &&
				Ke(c, u + 1);
	}
	function mt({ skipFragments: e = !1 } = {}) {
		if (e || !1 === se.prev())
			if (Ge().up) vt({ skipFragments: e });
			else {
				let i;
				if (
					((i = A.rtl
						? t($.wrapper, w + '.future').pop()
						: t($.wrapper, w + '.past').pop()),
					i && i.classList.contains('stack'))
				) {
					let e = i.querySelectorAll('section').length - 1 || void 0;
					Ke(c - 1, e);
				} else ut({ skipFragments: e });
			}
	}
	function ft({ skipFragments: e = !1 } = {}) {
		if (
			((H.hasNavigatedHorizontally = !0),
			(H.hasNavigatedVertically = !0),
			e || !1 === se.next())
		) {
			let t = Ge();
			t.down && t.right && A.loop && He() && (t.down = !1),
				t.down
					? pt({ skipFragments: e })
					: A.rtl
					  ? ut({ skipFragments: e })
					  : gt({ skipFragments: e });
		}
	}
	function bt(e) {
		let t = e.data;
		if (
			'string' == typeof t &&
			'{' === t.charAt(0) &&
			'}' === t.charAt(t.length - 1) &&
			((t = JSON.parse(t)), t.method && 'function' == typeof d[t.method])
		)
			if (!1 === R.test(t.method)) {
				const e = d[t.method].apply(d, t.args);
				ke('callback', { method: t.method, result: e });
			} else
				console.warn(
					'reveal.js: "' +
						t.method +
						'" is is blacklisted from the postMessage API',
				);
	}
	function yt(e) {
		'running' === X &&
			/section/gi.test(e.target.nodeName) &&
			((X = 'idle'),
			Ae({
				type: 'slidetransitionend',
				data: {
					indexh: c,
					indexv: u,
					previousSlide: g,
					currentSlide: f,
				},
			}));
	}
	function wt(e) {
		const t = o(e.target, 'a[href^="#"]');
		if (t) {
			const i = t.getAttribute('href'),
				s = oe.getIndicesFromHash(i);
			s && (d.slide(s.h, s.v, s.f), e.preventDefault());
		}
	}
	function Et(e) {
		Me();
	}
	function Rt(e) {
		!1 === document.hidden &&
			document.activeElement !== document.body &&
			('function' == typeof document.activeElement.blur &&
				document.activeElement.blur(),
			document.body.focus());
	}
	function St(e) {
		(document.fullscreenElement || document.webkitFullscreenElement) ===
			$.wrapper &&
			(e.stopImmediatePropagation(),
			setTimeout(() => {
				d.layout(), d.focus.focus();
			}, 1));
	}
	function At(e) {
		if (e.currentTarget && e.currentTarget.hasAttribute('href')) {
			let t = e.currentTarget.getAttribute('href');
			t && (xe(t), e.preventDefault());
		}
	}
	function kt(e) {
		Oe() && !1 === A.loop ? (Ke(0, 0), ht()) : G ? ht() : ct();
	}
	const Lt = {
		VERSION: W,
		initialize: function (e) {
			if (!a)
				throw 'Unable to find presentation root (<div class="reveal">).';
			if (
				(($.wrapper = a),
				($.slides = a.querySelector('.slides')),
				!$.slides)
			)
				throw 'Unable to find slides container (<div class="slides">).';
			return (
				(A = { ...j, ...A, ...r, ...e, ...l() }),
				(function () {
					!0 === A.embedded
						? ($.viewport = o(a, '.reveal-viewport') || a)
						: (($.viewport = document.body),
						  document.documentElement.classList.add(
								'reveal-full-page',
						  ));
					$.viewport.classList.add('reveal-viewport');
				})(),
				window.addEventListener('load', Me, !1),
				ce.load(A.plugins, A.dependencies).then(pe),
				new Promise((e) => d.on('ready', e))
			);
		},
		configure: be,
		destroy: function () {
			we(),
				dt(),
				Ce(),
				ve.destroy(),
				ue.destroy(),
				ce.destroy(),
				de.destroy(),
				re.destroy(),
				le.destroy(),
				ie.destroy(),
				Z.destroy(),
				ee.destroy(),
				document.removeEventListener('fullscreenchange', St),
				document.removeEventListener('webkitfullscreenchange', St),
				document.removeEventListener('visibilitychange', Rt, !1),
				window.removeEventListener('message', bt, !1),
				window.removeEventListener('load', Me, !1),
				$.pauseOverlay && $.pauseOverlay.remove(),
				$.statusElement && $.statusElement.remove(),
				document.documentElement.classList.remove('reveal-full-page'),
				$.wrapper.classList.remove(
					'ready',
					'center',
					'has-horizontal-slides',
					'has-vertical-slides',
				),
				$.wrapper.removeAttribute('data-transition-speed'),
				$.wrapper.removeAttribute('data-background-transition'),
				$.viewport.classList.remove('reveal-viewport'),
				$.viewport.style.removeProperty('--slide-width'),
				$.viewport.style.removeProperty('--slide-height'),
				$.slides.style.removeProperty('width'),
				$.slides.style.removeProperty('height'),
				$.slides.style.removeProperty('zoom'),
				$.slides.style.removeProperty('left'),
				$.slides.style.removeProperty('top'),
				$.slides.style.removeProperty('bottom'),
				$.slides.style.removeProperty('right'),
				$.slides.style.removeProperty('transform'),
				Array.from($.wrapper.querySelectorAll(y)).forEach((e) => {
					e.style.removeProperty('display'),
						e.style.removeProperty('top'),
						e.removeAttribute('hidden'),
						e.removeAttribute('aria-hidden');
				});
		},
		sync: Ve,
		syncSlide: function (e = f) {
			ie.sync(e), se.sync(e), Q.load(e), ie.update(), ve.update();
		},
		syncFragments: se.sync.bind(se),
		slide: Ke,
		left: ut,
		right: gt,
		up: vt,
		down: pt,
		prev: mt,
		next: ft,
		navigateLeft: ut,
		navigateRight: gt,
		navigateUp: vt,
		navigateDown: pt,
		navigatePrev: mt,
		navigateNext: ft,
		navigateFragment: se.goto.bind(se),
		prevFragment: se.prev.bind(se),
		nextFragment: se.next.bind(se),
		on: Ee,
		off: Re,
		addEventListener: Ee,
		removeEventListener: Re,
		layout: Me,
		shuffle: $e,
		availableRoutes: Ge,
		availableFragments: se.availableRoutes.bind(se),
		toggleHelp: function (e) {
			'boolean' == typeof e ? (e ? Pe() : Ne()) : $.overlay ? Ne() : Pe();
		},
		toggleOverview: ne.toggle.bind(ne),
		togglePause: je,
		toggleAutoSlide: function (e) {
			'boolean' == typeof e ? (e ? ht() : ct()) : G ? ht() : ct();
		},
		toggleJumpToSlide: function (e) {
			'boolean' == typeof e
				? e
					? ee.show()
					: ee.hide()
				: ee.isVisible()
				  ? ee.hide()
				  : ee.show();
		},
		isFirstSlide: Be,
		isLastSlide: Oe,
		isLastVerticalSlide: He,
		isVerticalSlide: ze,
		isPaused: We,
		isAutoSliding: function () {
			return !(!Y || G);
		},
		isSpeakerNotes: ve.isSpeakerNotesWindow.bind(ve),
		isOverview: ne.isActive.bind(ne),
		isFocused: ue.isFocused.bind(ue),
		isPrintingPDF: he.isPrintingPDF.bind(he),
		isReady: () => D,
		loadSlide: Q.load.bind(Q),
		unloadSlide: Q.unload.bind(Q),
		showPreview: xe,
		hidePreview: Ne,
		addEventListeners: ye,
		removeEventListeners: we,
		dispatchEvent: Ae,
		getState: rt,
		setState: function (e) {
			if ('object' == typeof e) {
				Ke(s(e.indexh), s(e.indexv), s(e.indexf));
				let t = s(e.paused),
					i = s(e.overview);
				'boolean' == typeof t && t !== We() && je(t),
					'boolean' == typeof i &&
						i !== ne.isActive() &&
						ne.toggle(i);
			}
		},
		getProgress: function () {
			let e = at(),
				t = Qe();
			if (f) {
				let e = f.querySelectorAll('.fragment');
				if (e.length > 0) {
					let i = 0.9;
					t +=
						(f.querySelectorAll('.fragment.visible').length /
							e.length) *
						i;
				}
			}
			return Math.min(t / (e - 1), 1);
		},
		getIndices: Ze,
		getSlidesAttributes: function () {
			return et().map((e) => {
				let t = {};
				for (let i = 0; i < e.attributes.length; i++) {
					let s = e.attributes[i];
					t[s.name] = s.value;
				}
				return t;
			});
		},
		getSlidePastCount: Qe,
		getTotalSlides: at,
		getSlide: ot,
		getPreviousSlide: () => g,
		getCurrentSlide: () => f,
		getSlideBackground: function (e, t) {
			let i = 'number' == typeof e ? ot(e, t) : e;
			if (i) return i.slideBackgroundElement;
		},
		getSlideNotes: ve.getSlideNotes.bind(ve),
		getSlides: et,
		getHorizontalSlides: tt,
		getVerticalSlides: it,
		hasHorizontalSlides: st,
		hasVerticalSlides: nt,
		hasNavigatedHorizontally: () => H.hasNavigatedHorizontally,
		hasNavigatedVertically: () => H.hasNavigatedVertically,
		addKeyBinding: ae.addKeyBinding.bind(ae),
		removeKeyBinding: ae.removeKeyBinding.bind(ae),
		triggerKey: ae.triggerKey.bind(ae),
		registerKeyboardShortcut: ae.registerKeyboardShortcut.bind(ae),
		getComputedSlideSize: De,
		getScale: () => K,
		getConfig: () => A,
		getQueryHash: l,
		getSlidePath: oe.getHash.bind(oe),
		getRevealElement: () => a,
		getSlidesElement: () => $.slides,
		getViewportElement: () => $.viewport,
		getBackgroundsElement: () => ie.element,
		registerPlugin: ce.registerPlugin.bind(ce),
		hasPlugin: ce.hasPlugin.bind(ce),
		getPlugin: ce.getPlugin.bind(ce),
		getPlugins: ce.getRegisteredPlugins.bind(ce),
	};
	return (
		e(d, {
			...Lt,
			announceStatus: me,
			getStatusText: fe,
			print: he,
			focus: ue,
			progress: le,
			controls: re,
			location: oe,
			overview: ne,
			fragments: se,
			slideContent: Q,
			slideNumber: Z,
			onUserInput: function (e) {
				A.autoSlideStoppable && ct();
			},
			closeOverlay: Ne,
			updateSlidesVisibility: Je,
			layoutSlideContents: Ie,
			transformSlides: Se,
			cueAutoSlide: lt,
			cancelAutoSlide: dt,
		}),
		Lt
	);
}
let V = K,
	$ = [];
(V.initialize = (e) => (
	Object.assign(V, new K(document.querySelector('.reveal'), e)),
	$.map((e) => e(V)),
	V.initialize()
)),
	[
		'configure',
		'on',
		'off',
		'addEventListener',
		'removeEventListener',
		'registerPlugin',
	].forEach((e) => {
		V[e] = (...t) => {
			$.push((i) => i[e].call(null, ...t));
		};
	}),
	(V.isReady = () => !1),
	(V.VERSION = W);
export { V as default };
//# sourceMappingURL=reveal.esm.js.map
