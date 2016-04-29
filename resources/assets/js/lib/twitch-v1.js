! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.video = t() : (e.Twitch = e.Twitch || {}, e.Twitch.video = t())
}(this, function() {
	return function(e) {
		function t(r) {
			if (n[r]) return n[r].exports;
			var i = n[r] = {
				exports: {},
				id: r,
				loaded: !1
			};
			return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
		}
		var n = {};
		return t.m = e, t.c = n, t.p = "", t(0)
	}([function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PlayerEmbed = void 0;
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(1),
			s = r(a),
			u = n(4),
			c = r(u),
			l = n(65),
			f = n(66),
			d = n(74),
			h = n(77),
			p = n(76),
			g = t.PlayerEmbed = function() {
				function e(t, n) {
					i(this, e), this._root = t;
					var r = (0, l.toString)((0, c["default"])(n, "width", "height")),
						o = f.playerHost + "/?" + r,
						a = document.createElement("iframe");
					a.setAttribute("src", o), n.width && a.setAttribute("width", n.width), n.height && a.setAttribute("height", n.height), a.setAttribute("frameBorder", "0"), a.setAttribute("allowFullScreen", ""), a.setAttribute("scrolling", "no"), (0, s["default"])(this._root) && (this._root = document.getElementById(this._root)), this._root.appendChild(a), this._bridge = new d.EmbedClient(a.contentWindow)
				}
				return o(e, [{
					key: "play",
					value: function() {
						this._bridge.callPlayerMethod(p.METHOD_PLAY)
					}
				}, {
					key: "pause",
					value: function() {
						this._bridge.callPlayerMethod(p.METHOD_PAUSE)
					}
				}, {
					key: "seek",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SEEK, e)
					}
				}, {
					key: "setVolume",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SET_VOLUME, e)
					}
				}, {
					key: "setMuted",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SET_MUTE, e)
					}
				}, {
					key: "setChannel",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SET_CHANNEL, e)
					}
				}, {
					key: "setVideo",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SET_VIDEO, e)
					}
				}, {
					key: "setQuality",
					value: function(e) {
						this._bridge.callPlayerMethod(p.METHOD_SET_QUALITY, e)
					}
				}, {
					key: "addEventListener",
					value: function(e, t) {
						this._bridge.addEventListener(e, t)
					}
				}, {
					key: "removeEventListener",
					value: function(e, t) {
						this._bridge.removeEventListener(e, t)
					}
				}, {
					key: "getChannel",
					value: function() {
						return this._bridge.getPlayerState().channelName
					}
				}, {
					key: "getCurrentTime",
					value: function() {
						return this._bridge.getPlayerState().currentTime
					}
				}, {
					key: "getDuration",
					value: function() {
						return this._bridge.getPlayerState().duration
					}
				}, {
					key: "getEnded",
					value: function() {
						return this._bridge.getPlayerState().playback === h.PLAYBACK_ENDED
					}
				}, {
					key: "getMuted",
					value: function() {
						return this._bridge.getPlayerState().muted
					}
				}, {
					key: "getPlaybackStats",
					value: function() {
						return this._bridge.getPlayerState().stats
					}
				}, {
					key: "isPaused",
					value: function() {
						return this._bridge.getPlayerState().playback === h.PLAYBACK_PAUSED
					}
				}, {
					key: "getQuality",
					value: function() {
						return this._bridge.getPlayerState().quality
					}
				}, {
					key: "getQualities",
					value: function() {
						return this._bridge.getPlayerState().qualitiesAvailable
					}
				}, {
					key: "getViewers",
					value: function() {
						return this._bridge.getPlayerState().viewers
					}
				}, {
					key: "getVideo",
					value: function() {
						return this._bridge.getPlayerState().videoID
					}
				}, {
					key: "getVolume",
					value: function() {
						return this._bridge.getPlayerState().volume
					}
				}]), e
			}();
		window.Twitch = window.Twitch || {}, window.Twitch.Player = g
	}, function(e, t, n) {
		function r(e) {
			return "string" == typeof e || !i(e) && o(e) && u.call(e) == a
		}
		var i = n(2),
			o = n(3),
			a = "[object String]",
			s = Object.prototype,
			u = s.toString;
		e.exports = r
	}, function(e, t) {
		var n = Array.isArray;
		e.exports = n
	}, function(e, t) {
		function n(e) {
			return !!e && "object" == typeof e
		}
		e.exports = n
	}, function(e, t, n) {
		var r = n(5),
			i = n(6),
			o = n(43),
			a = n(51),
			s = n(53),
			u = n(61),
			c = u(function(e, t) {
				return null == e ? {} : (t = r(o(t, 1), String), a(e, i(s(e), t)))
			});
		e.exports = c
	}, function(e, t) {
		function n(e, t) {
			for (var n = -1, r = e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
			return i
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t, n, r) {
			var f = -1,
				d = o,
				h = !0,
				p = e.length,
				g = [],
				v = t.length;
			if (!p) return g;
			n && (t = s(t, u(n))), r ? (d = a, h = !1) : t.length >= l && (d = c, h = !1, t = new i(t));
			e: for (; ++f < p;) {
				var _ = e[f],
					y = n ? n(_) : _;
				if (h && y === y) {
					for (var m = v; m--;)
						if (t[m] === y) continue e;
					g.push(_)
				} else d(t, y, r) || g.push(_)
			}
			return g
		}
		var i = n(7),
			o = n(37),
			a = n(40),
			s = n(5),
			u = n(41),
			c = n(42),
			l = 200;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.__data__ = new i; ++t < n;) this.push(e[t])
		}
		var i = n(8),
			o = n(36);
		r.prototype.push = o, e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.clear(); ++t < n;) {
				var r = e[t];
				this.set(r[0], r[1])
			}
		}
		var i = n(9),
			o = n(21),
			a = n(28),
			s = n(31),
			u = n(33);
		r.prototype.clear = i, r.prototype["delete"] = o, r.prototype.get = a, r.prototype.has = s, r.prototype.set = u, e.exports = r
	}, function(e, t, n) {
		function r() {
			this.__data__ = {
				hash: new i,
				map: o ? new o : [],
				string: new i
			}
		}
		var i = n(10),
			o = n(17);
		e.exports = r
	}, function(e, t, n) {
		function r() {}
		var i = n(11),
			o = Object.prototype;
		r.prototype = i ? i(null) : o, e.exports = r
	}, function(e, t, n) {
		var r = n(12),
			i = r(Object, "create");
		e.exports = i
	}, function(e, t, n) {
		function r(e, t) {
			var n = e[t];
			return i(n) ? n : void 0
		}
		var i = n(13);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return null == e ? !1 : i(e) ? d.test(l.call(e)) : a(e) && (o(e) ? d : u).test(e)
		}
		var i = n(14),
			o = n(16),
			a = n(3),
			s = /[\\^$.*+?()[\]{}|]/g,
			u = /^\[object .+?Constructor\]$/,
			c = Object.prototype,
			l = Function.prototype.toString,
			f = c.hasOwnProperty,
			d = RegExp("^" + l.call(f).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = i(e) ? u.call(e) : "";
			return t == o || t == a
		}
		var i = n(15),
			o = "[object Function]",
			a = "[object GeneratorFunction]",
			s = Object.prototype,
			u = s.toString;
		e.exports = r
	}, function(e, t) {
		function n(e) {
			var t = typeof e;
			return !!e && ("object" == t || "function" == t)
		}
		e.exports = n
	}, function(e, t) {
		function n(e) {
			var t = !1;
			if (null != e && "function" != typeof e.toString) try {
				t = !!(e + "")
			} catch (n) {}
			return t
		}
		e.exports = n
	}, function(e, t, n) {
		var r = n(12),
			i = n(18),
			o = r(i, "Map");
		e.exports = o
	}, function(e, t, n) {
		(function(e, r) {
			var i = n(20),
				o = {
					"function": !0,
					object: !0
				},
				a = o[typeof t] && t && !t.nodeType ? t : void 0,
				s = o[typeof e] && e && !e.nodeType ? e : void 0,
				u = i(a && s && "object" == typeof r && r),
				c = i(o[typeof self] && self),
				l = i(o[typeof window] && window),
				f = i(o[typeof this] && this),
				d = u || l !== (f && f.window) && l || c || f || Function("return this")();
			e.exports = d
		}).call(t, n(19)(e), function() {
			return this
		}())
	}, function(e, t) {
		e.exports = function(e) {
			return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
		}
	}, function(e, t) {
		function n(e) {
			return e && e.Object === Object ? e : null
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__;
			return s(e) ? a("string" == typeof e ? t.string : t.hash, e) : i ? t.map["delete"](e) : o(t.map, e)
		}
		var i = n(17),
			o = n(22),
			a = n(25),
			s = n(27);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = i(e, t);
			if (0 > n) return !1;
			var r = e.length - 1;
			return n == r ? e.pop() : a.call(e, n, 1), !0
		}
		var i = n(23),
			o = Array.prototype,
			a = o.splice;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			for (var n = e.length; n--;)
				if (i(e[n][0], t)) return n;
			return -1
		}
		var i = n(24);
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			return e === t || e !== e && t !== t
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			return i(e, t) && delete e[t]
		}
		var i = n(26);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return i ? void 0 !== e[t] : a.call(e, t)
		}
		var i = n(11),
			o = Object.prototype,
			a = o.hasOwnProperty;
		e.exports = r
	}, function(e, t) {
		function n(e) {
			var t = typeof e;
			return "number" == t || "boolean" == t || "string" == t && "__proto__" != e || null == e
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__;
			return s(e) ? a("string" == typeof e ? t.string : t.hash, e) : i ? t.map.get(e) : o(t.map, e)
		}
		var i = n(17),
			o = n(29),
			a = n(30),
			s = n(27);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = i(e, t);
			return 0 > n ? void 0 : e[n][1]
		}
		var i = n(23);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			if (i) {
				var n = e[t];
				return n === o ? void 0 : n
			}
			return s.call(e, t) ? e[t] : void 0
		}
		var i = n(11),
			o = "__lodash_hash_undefined__",
			a = Object.prototype,
			s = a.hasOwnProperty;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__;
			return s(e) ? a("string" == typeof e ? t.string : t.hash, e) : i ? t.map.has(e) : o(t.map, e)
		}
		var i = n(17),
			o = n(32),
			a = n(26),
			s = n(27);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return i(e, t) > -1
		}
		var i = n(23);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = this.__data__;
			return s(e) ? a("string" == typeof e ? n.string : n.hash, e, t) : i ? n.map.set(e, t) : o(n.map, e, t), this
		}
		var i = n(17),
			o = n(34),
			a = n(35),
			s = n(27);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			var r = i(e, t);
			0 > r ? e.push([t, n]) : e[r][1] = n
		}
		var i = n(23);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			e[t] = i && void 0 === n ? o : n
		}
		var i = n(11),
			o = "__lodash_hash_undefined__";
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__;
			if (i(e)) {
				var n = t.__data__,
					r = "string" == typeof e ? n.string : n.hash;
				r[e] = o
			} else t.set(e, o)
		}
		var i = n(27),
			o = "__lodash_hash_undefined__";
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return !!e.length && i(e, t, 0) > -1
		}
		var i = n(38);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			if (t !== t) return i(e, n);
			for (var r = n - 1, o = e.length; ++r < o;)
				if (e[r] === t) return r;
			return -1
		}
		var i = n(39);
		e.exports = r
	}, function(e, t) {
		function n(e, t, n) {
			for (var r = e.length, i = t + (n ? 0 : -1); n ? i-- : ++i < r;) {
				var o = e[i];
				if (o !== o) return i
			}
			return -1
		}
		e.exports = n
	}, function(e, t) {
		function n(e, t, n) {
			for (var r = -1, i = e.length; ++r < i;)
				if (n(t, e[r])) return !0;
			return !1
		}
		e.exports = n
	}, function(e, t) {
		function n(e) {
			return function(t) {
				return e(t)
			}
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			var n = e.__data__;
			if (i(t)) {
				var r = n.__data__,
					a = "string" == typeof t ? r.string : r.hash;
				return a[t] === o
			}
			return n.has(t)
		}
		var i = n(27),
			o = "__lodash_hash_undefined__";
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, u) {
			u || (u = []);
			for (var c = -1, l = e.length; ++c < l;) {
				var f = e[c];
				t > 0 && s(f) && (n || a(f) || o(f)) ? t > 1 ? r(f, t - 1, n, u) : i(u, f) : n || (u[u.length] = f)
			}
			return u
		}
		var i = n(44),
			o = n(45),
			a = n(2),
			s = n(46);
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
			return e
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			return i(e) && s.call(e, "callee") && (!c.call(e, "callee") || u.call(e) == o)
		}
		var i = n(46),
			o = "[object Arguments]",
			a = Object.prototype,
			s = a.hasOwnProperty,
			u = a.toString,
			c = a.propertyIsEnumerable;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return o(e) && i(e)
		}
		var i = n(47),
			o = n(3);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return null != e && a(i(e)) && !o(e)
		}
		var i = n(48),
			o = n(14),
			a = n(50);
		e.exports = r
	}, function(e, t, n) {
		var r = n(49),
			i = r("length");
		e.exports = i
	}, function(e, t) {
		function n(e) {
			return function(t) {
				return null == t ? void 0 : t[e]
			}
		}
		e.exports = n
	}, function(e, t) {
		function n(e) {
			return "number" == typeof e && e > -1 && e % 1 == 0 && r >= e
		}
		var r = 9007199254740991;
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			return e = Object(e), i(t, function(t, n) {
				return n in e && (t[n] = e[n]), t
			}, {})
		}
		var i = n(52);
		e.exports = r
	}, function(e, t) {
		function n(e, t, n, r) {
			var i = -1,
				o = e.length;
			for (r && o && (n = e[++i]); ++i < o;) n = t(n, e[i], i, e);
			return n
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			for (var t = -1, n = s(e), r = i(e), u = r.length, l = o(e), f = !!l, d = l || [], h = d.length; ++t < u;) {
				var p = r[t];
				f && ("length" == p || a(p, h)) || "constructor" == p && (n || !c.call(e, p)) || d.push(p)
			}
			return d
		}
		var i = n(54),
			o = n(57),
			a = n(59),
			s = n(60),
			u = Object.prototype,
			c = u.hasOwnProperty;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			e = null == e ? e : Object(e);
			var t = [];
			for (var n in e) t.push(n);
			return t
		}
		var i = n(55),
			o = n(56),
			a = Object.prototype,
			s = i ? i.enumerate : void 0,
			u = a.propertyIsEnumerable;
		s && !u.call({
			valueOf: 1
		}, "valueOf") && (r = function(e) {
			return o(s(e))
		}), e.exports = r
	}, function(e, t, n) {
		var r = n(18),
			i = r.Reflect;
		e.exports = i
	}, function(e, t) {
		function n(e) {
			for (var t, n = []; !(t = e.next()).done;) n.push(t.value);
			return n
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			var t = e ? e.length : void 0;
			return s(t) && (a(e) || u(e) || o(e)) ? i(t, String) : null
		}
		var i = n(58),
			o = n(45),
			a = n(2),
			s = n(50),
			u = n(1);
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
			return r
		}
		e.exports = n
	}, function(e, t) {
		function n(e, t) {
			return e = "number" == typeof e || i.test(e) ? +e : -1, t = null == t ? r : t, e > -1 && e % 1 == 0 && t > e
		}
		var r = 9007199254740991,
			i = /^(?:0|[1-9]\d*)$/;
		e.exports = n
	}, function(e, t) {
		function n(e) {
			var t = e && e.constructor,
				n = "function" == typeof t && t.prototype || r;
			return e === n
		}
		var r = Object.prototype;
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			if ("function" != typeof e) throw new TypeError(a);
			return t = s(void 0 === t ? e.length - 1 : o(t), 0),
				function() {
					for (var n = arguments, r = -1, o = s(n.length - t, 0), a = Array(o); ++r < o;) a[r] = n[t + r];
					switch (t) {
						case 0:
							return e.call(this, a);
						case 1:
							return e.call(this, n[0], a);
						case 2:
							return e.call(this, n[0], n[1], a)
					}
					var u = Array(t + 1);
					for (r = -1; ++r < t;) u[r] = n[r];
					return u[t] = a, i(e, this, u)
				}
		}
		var i = n(62),
			o = n(63),
			a = "Expected a function",
			s = Math.max;
		e.exports = r
	}, function(e, t) {
		function n(e, t, n) {
			var r = n.length;
			switch (r) {
				case 0:
					return e.call(t);
				case 1:
					return e.call(t, n[0]);
				case 2:
					return e.call(t, n[0], n[1]);
				case 3:
					return e.call(t, n[0], n[1], n[2])
			}
			return e.apply(t, n)
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			if (!e) return 0 === e ? e : 0;
			if (e = i(e), e === o || e === -o) {
				var t = 0 > e ? -1 : 1;
				return t * a
			}
			var n = e % 1;
			return e === e ? n ? e - n : e : 0
		}
		var i = n(64),
			o = 1 / 0,
			a = 1.7976931348623157e308;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			if (o(e)) {
				var t = i(e.valueOf) ? e.valueOf() : e;
				e = o(t) ? t + "" : t
			}
			if ("string" != typeof e) return 0 === e ? e : +e;
			e = e.replace(s, "");
			var n = c.test(e);
			return n || l.test(e) ? f(e.slice(2), n ? 2 : 8) : u.test(e) ? a : +e
		}
		var i = n(14),
			o = n(15),
			a = NaN,
			s = /^\s+|\s+$/g,
			u = /^[-+]0x[0-9a-f]+$/i,
			c = /^0b[01]+$/i,
			l = /^0o[0-7]+$/i,
			f = parseInt;
		e.exports = r
	}, function(e, t) {
		"use strict";

		function n(e) {
			for (var t = {}, n = e.split("&"), r = 0; r < n.length; r++) {
				var i = /^(.+?)(?:=(.+))?$/.exec(n[r]);
				if (i) {
					var o = i[1],
						a = i[2];
					"true" === a ? a = !0 : "false" === a ? a = !1 : void 0 !== a ? a = decodeURIComponent(a) : "!" === o[0] ? (o = o.substring(1), a = !1) : a = !0, t[o] = a
				}
			}
			return t
		}

		function r(e) {
			var t = [];
			for (var n in e)
				if (e.hasOwnProperty(n)) {
					var r = e[n];
					n = encodeURIComponent(n), r === !0 ? t.push(n) : r === !1 ? t.push("!" + n) : (r = encodeURIComponent(r), t.push(n + "=" + r))
				}
			return t.join("&")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.parse = n, t.toString = r
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.httpsQualityCarryover = t.unknownError = t.videoError = t.channelError = t.flashError = t.cancelResumeAmount = t.hotkeySeekAmount = t.defaultLanguage = t.leaveDialog = t.doubleClickUrl = t.flashTimeout = t.volumeStepAmount = t.embedParameters = t.mutedSegmentsMessage = t.chromecastStates = t.debugIgnoreEvents = t.allEvents = t.customEvents = t.mediaEvents = t.reportHideDelay = t.hoverControlsDelay = t.initialControlsDelay = t.qualityChangeDuration = t.qualityText = t.bufferPollDelay = t.pubSubEnviroment = t.version = t.chromecastId = t.popoutSize = t.gamePath = t.countessHost = t.spadeIgnore = t.spadeHost = t.mixpanelIgnore = t.mixpanelToken = t.mixpanelHost = t.trackingPlatform = t.apiTimeout = t.playerHost = t.valveApiHost = t.usherHost = t.spectreHost = t.apiHost = t.twitchHost = t.domain = void 0;
		var i = n(67),
			o = r(i),
			a = n(73),
			s = "testplayer.twitch.tv",
			u = (t.domain = "twitch.tv", t.twitchHost = "//twitch.tv"),
			c = t.apiHost = "https://api.twitch.tv",
			l = (t.spectreHost = "//spectre.twitch.tv", t.usherHost = "//usher.ttvnw.net", t.valveApiHost = c + "/steam/watching", t.playerHost = function() {
				var e = document.currentScript,
					t = document.getElementsByTagName("script");
				if (!e) {
					var n = Array.prototype.filter.call(t, function(e) {
						return e.src && e.src.match(/player(?:\.\w+)?\.js$/i)
					});
					e = 1 === n.length ? n[0] : t[t.length - 1]
				}
				var r = (0, a.parseUri)(e.src);
				if (r.authority === s) {
					var i = r.path.split("/").slice(1, -2).join("/");
					return r.protocol + "://" + r.authority + "/" + i
				}
				return r.protocol + "://" + r.authority
			}(), t.apiTimeout = 1e4, t.trackingPlatform = "web", t.mixpanelHost = "//api.mixpanel.com", t.mixpanelToken = "809576468572134f909dffa6bd0dcfcf", t.mixpanelIgnore = ["minute-buffered", "x_untrusted_video_init", "x_untrusted_video-play", "x_untrusted_minute-watched", "x_untrusted_buffer-empty", "x_untrusted_buffer-refill", "network_profile"], t.spadeHost = "//spade.twitch.tv", t.spadeIgnore = [], t.countessHost = "//countess.twitch.tv", t.gamePath = u + "/directory/game", t.popoutSize = {
				width: 853,
				height: 480
			}, t.chromecastId = "358E83DC", t.version = "0.6.5", t.pubSubEnviroment = "production", t.bufferPollDelay = 1e3, t.qualityText = {
				chunked: "Source",
				high: "High",
				medium: "Medium",
				low: "Low",
				mobile: "Mobile",
				auto: "Auto"
			}, t.qualityChangeDuration = 6e3, t.initialControlsDelay = 8e3, t.hoverControlsDelay = 5e3, t.reportHideDelay = 2e3, t.mediaEvents = ["loadstart", "progress", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "play", "pause", "ratechange", "volumechange"]),
			f = t.customEvents = ["adcompanionrendered", "castingchange", "bufferedchange", "statschange", "qualitychange", "qualitieschange", "adstart", "adend", "init", "loadedchannel", "loadedvideo", "viewerschange", "fullscreenchange", "restricted", "segmentchange", "isspectre", "theatrechange", "online", "offline", "usherfail", "captions"];
		t.allEvents = (0, o["default"])(l, f), t.debugIgnoreEvents = ["statschange", "timeupdate", "bufferedchange"], t.chromecastStates = ["unavailable", "available", "connecting", "connected", "error"], t.mutedSegmentsMessage = "Audio for portions of this video has been muted as it appears to contain copyrighted content owned or controlled by a third party.", t.embedParameters = ["channel", "video", "muted", "autoplay", "time", "t", "debug", "html5", "quality", "controls", "captions"], t.volumeStepAmount = .1, t.flashTimeout = 5e3, t.doubleClickUrl = "//pubads.g.doubleclick.net/gampad/ads", t.leaveDialog = {
			enabled: !1,
			sinceEnded: 45,
			viewerThreshold: 5e4,
			text: "Don't panicBasket. The broadcast is down, but don't refresh just yet. When the broadcast is back, the player will automatically reload for you.",
			refreshTimeout: 20,
			warningDuration: 45
		}, t.defaultLanguage = "en-US", t.hotkeySeekAmount = 5, t.cancelResumeAmount = 10, t.flashError = "No supported video backend available; Flash is not installed", t.channelError = "Channel could not be found, or has been deleted by its owner", t.videoError = "Video could not be found, or has been deleted by its owner", t.unknownError = "An unknown error has occured", t.httpsQualityCarryover = new Date(2016, 3, 30)
	}, function(e, t, n) {
		var r = n(43),
			i = n(68),
			o = n(61),
			a = o(function(e) {
				return i(r(e, 1, !0))
			});
		e.exports = a
	}, function(e, t, n) {
		function r(e, t, n) {
			var r = -1,
				f = o,
				d = e.length,
				h = !0,
				p = [],
				g = p;
			if (n) h = !1, f = a;
			else if (d >= l) {
				var v = t ? null : u(e);
				if (v) return c(v);
				h = !1, f = s, g = new i
			} else g = t ? [] : p;
			e: for (; ++r < d;) {
				var _ = e[r],
					y = t ? t(_) : _;
				if (h && y === y) {
					for (var m = g.length; m--;)
						if (g[m] === y) continue e;
					t && g.push(y), p.push(_)
				} else f(g, y, n) || (g !== p && g.push(y), p.push(_))
			}
			return p
		}
		var i = n(7),
			o = n(37),
			a = n(40),
			s = n(42),
			u = n(69),
			c = n(72),
			l = 200;
		e.exports = r
	}, function(e, t, n) {
		var r = n(70),
			i = n(71),
			o = r && 2 === new r([1, 2]).size ? function(e) {
				return new r(e)
			} : i;
		e.exports = o
	}, function(e, t, n) {
		var r = n(12),
			i = n(18),
			o = r(i, "Set");
		e.exports = o
	}, function(e, t) {
		function n() {}
		e.exports = n
	}, function(e, t) {
		function n(e) {
			var t = -1,
				n = Array(e.size);
			return e.forEach(function(e) {
				n[++t] = e
			}), n
		}
		e.exports = n
	}, function(e, t) {
		"use strict";

		function n(e) {
			for (var t = {
				strictMode: !1,
				key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
				q: {
					name: "queryKey",
					parser: /(?:^|&)([^&=]*)=?([^&]*)/g
				},
				parser: {
					strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
					loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
				}
			}, n = t.parser[t.strictMode ? "strict" : "loose"].exec(e), r = {}, i = 14; i--;) r[t.key[i]] = n[i] || "";
			return r[t.q.name] = {}, r[t.key[12]].replace(t.q.parser, function(e, n, i) {
				n && (r[t.q.name][n] = i)
			}), r
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.parseUri = n
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.EmbedClient = t.EVENT_EMBED_READY = void 0;
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(75),
			s = r(a),
			u = n(76),
			c = n(77),
			l = 15e3,
			f = t.EVENT_EMBED_READY = "ready";
		t.EmbedClient = function() {
			function e(t) {
				i(this, e), this._host = t, this._eventEmitter = new s["default"], this._playerState = c.DEFAULT_EMBED_STATE, this._onHostReady = this._getHostReady(), this._send(u.BRIDGE_REQ_SUBSCRIBE)
			}
			return o(e, [{
				key: "_getHostReady",
				value: function() {
					var e = this;
					return new Promise(function(t, n) {
						function r(e) {
							this._isClientMessage(e) && e.data.method === u.BRIDGE_HOST_READY && (window.removeEventListener("message", i), window.addEventListener("message", this), this._eventEmitter.emit(f), t())
						}
						var i = r.bind(e);
						window.addEventListener("message", i), setTimeout(n, l)
					})
				}
			}, {
				key: "_send",
				value: function(e) {
					for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; t > r; r++) n[r - 1] = arguments[r];
					var i = {
						namespace: u.BRIDGE_HOST_NAMESPACE,
						method: e,
						args: n
					};
					this._host.postMessage(i, "*")
				}
			}, {
				key: "_deferSend",
				value: function() {
					for (var e = this, t = arguments.length, n = Array(t), r = 0; t > r; r++) n[r] = arguments[r];
					this._onHostReady.then(function() {
						return e._send.apply(e, n)
					})
				}
			}, {
				key: "_isClientMessage",
				value: function(e) {
					return Boolean(e.data) && e.data.namespace === u.BRIDGE_CLIENT_NAMESPACE
				}
			}, {
				key: "handleEvent",
				value: function(e) {
					if (this._isClientMessage(e)) switch (e.data.method) {
						case u.BRIDGE_STATE_UPDATE:
							this._playerState = e.data.args[0];
							break;
						case u.BRIDGE_PLAYER_EVENT:
							this._eventEmitter.emit(e.data.args[0])
					}
				}
			}, {
				key: "getPlayerState",
				value: function() {
					return this._playerState
				}
			}, {
				key: "addEventListener",
				value: function(e, t) {
					this._eventEmitter.on(e, t)
				}
			}, {
				key: "removeEventListener",
				value: function(e, t) {
					this._eventEmitter.off(e, t)
				}
			}, {
				key: "callPlayerMethod",
				value: function(e, t) {
					this._deferSend(e, t)
				}
			}]), e
		}()
	}, function(e, t, n) {
		var r;
		(function() {
			"use strict";

			function t() {}

			function i(e, t) {
				for (var n = e.length; n--;)
					if (e[n].listener === t) return n;
				return -1
			}

			function o(e) {
				return function() {
					return this[e].apply(this, arguments)
				}
			}
			var a = t.prototype,
				s = this,
				u = s.EventEmitter;
			a.getListeners = function(e) {
				var t, n, r = this._getEvents();
				if (e instanceof RegExp) {
					t = {};
					for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
				} else t = r[e] || (r[e] = []);
				return t
			}, a.flattenListeners = function(e) {
				var t, n = [];
				for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
				return n
			}, a.getListenersAsObject = function(e) {
				var t, n = this.getListeners(e);
				return n instanceof Array && (t = {}, t[e] = n), t || n
			}, a.addListener = function(e, t) {
				var n, r = this.getListenersAsObject(e),
					o = "object" == typeof t;
				for (n in r) r.hasOwnProperty(n) && -1 === i(r[n], t) && r[n].push(o ? t : {
					listener: t,
					once: !1
				});
				return this
			}, a.on = o("addListener"), a.addOnceListener = function(e, t) {
				return this.addListener(e, {
					listener: t,
					once: !0
				})
			}, a.once = o("addOnceListener"), a.defineEvent = function(e) {
				return this.getListeners(e), this
			}, a.defineEvents = function(e) {
				for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
				return this
			}, a.removeListener = function(e, t) {
				var n, r, o = this.getListenersAsObject(e);
				for (r in o) o.hasOwnProperty(r) && (n = i(o[r], t), -1 !== n && o[r].splice(n, 1));
				return this
			}, a.off = o("removeListener"), a.addListeners = function(e, t) {
				return this.manipulateListeners(!1, e, t)
			}, a.removeListeners = function(e, t) {
				return this.manipulateListeners(!0, e, t)
			}, a.manipulateListeners = function(e, t, n) {
				var r, i, o = e ? this.removeListener : this.addListener,
					a = e ? this.removeListeners : this.addListeners;
				if ("object" != typeof t || t instanceof RegExp)
					for (r = n.length; r--;) o.call(this, t, n[r]);
				else
					for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? o.call(this, r, i) : a.call(this, r, i));
				return this
			}, a.removeEvent = function(e) {
				var t, n = typeof e,
					r = this._getEvents();
				if ("string" === n) delete r[e];
				else if (e instanceof RegExp)
					for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
				else delete this._events;
				return this
			}, a.removeAllListeners = o("removeEvent"), a.emitEvent = function(e, t) {
				var n, r, i, o, a, s = this.getListenersAsObject(e);
				for (o in s)
					if (s.hasOwnProperty(o))
						for (n = s[o].slice(0), i = n.length; i--;) r = n[i], r.once === !0 && this.removeListener(e, r.listener), a = r.listener.apply(this, t || []), a === this._getOnceReturnValue() && this.removeListener(e, r.listener);
				return this
			}, a.trigger = o("emitEvent"), a.emit = function(e) {
				var t = Array.prototype.slice.call(arguments, 1);
				return this.emitEvent(e, t)
			}, a.setOnceReturnValue = function(e) {
				return this._onceReturnValue = e, this
			}, a._getOnceReturnValue = function() {
				return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
			}, a._getEvents = function() {
				return this._events || (this._events = {})
			}, t.noConflict = function() {
				return s.EventEmitter = u, t
			}, r = function() {
				return t
			}.call(s, n, s, e), !(void 0 !== r && (e.exports = r))
		}).call(this)
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.EmbedHost = t.BRIDGE_CLIENT_NAMESPACE = t.BRIDGE_HOST_NAMESPACE = t.BRIDGE_DOCUMENT_EVENT = t.BRIDGE_PLAYER_EVENT = t.BRIDGE_STATE_UPDATE = t.BRIDGE_HOST_READY = t.BRIDGE_REQ_SUBSCRIBE = t.METHOD_DESTROY = t.METHOD_SET_VOLUME = t.METHOD_SET_MUTE = t.METHOD_SET_QUALITY = t.METHOD_SEEK = t.METHOD_SET_VIDEO = t.METHOD_SET_CHANNEL = t.METHOD_PAUSE = t.METHOD_PLAY = void 0;
		var a = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			s = n(15),
			u = i(s),
			c = n(4),
			l = i(c),
			f = n(77),
			d = n(201),
			h = r(d),
			p = t.METHOD_PLAY = "play",
			g = t.METHOD_PAUSE = "pause",
			v = t.METHOD_SET_CHANNEL = "channel",
			_ = t.METHOD_SET_VIDEO = "video",
			y = t.METHOD_SEEK = "seek",
			m = t.METHOD_SET_QUALITY = "quality",
			b = t.METHOD_SET_MUTE = "mute",
			E = t.METHOD_SET_VOLUME = "volume",
			w = t.METHOD_DESTROY = "destroy",
			k = t.BRIDGE_REQ_SUBSCRIBE = "subscribe",
			O = t.BRIDGE_HOST_READY = "ready",
			S = t.BRIDGE_STATE_UPDATE = "bridgestateupdate",
			T = t.BRIDGE_PLAYER_EVENT = "bridgeplayerevent",
			P = t.BRIDGE_DOCUMENT_EVENT = "bridgedocumentevent",
			x = t.BRIDGE_HOST_NAMESPACE = "player.embed.host",
			A = t.BRIDGE_CLIENT_NAMESPACE = "player.embed.client",
			C = ["blur", "focus", "keydown", "keypress", "keyup", "resize"];
		t.EmbedHost = function() {
			function e(t, n, r) {
				o(this, e), this._player = t, this._state = r, this._clients = [], this._initWindowEvents(), n.addEventListener(f.EVENT_STATE_UPDATE, this._sendPlayerState.bind(this)), n.addEventListener(f.EVENT_PLAYER_UPDATE, this._sendPlayerEvent.bind(this)), window.addEventListener("message", this);
				var i = window.opener || window.parent;
				i && i !== window && this._addClient(i)
			}
			return a(e, [{
				key: "_initWindowEvents",
				value: function() {
					var e = this;
					C.forEach(function(t) {
						document.addEventListener(t, function(n) {
							var r = (0, l["default"])(n, u["default"]);
							e._sendAll(P, [t, r])
						})
					})
				}
			}, {
				key: "_addClient",
				value: function(e) {
					this._clients.push(e), this._send(e, O)
				}
			}, {
				key: "_send",
				value: function(e, t) {
					var n = arguments.length <= 2 || void 0 === arguments[2] ? [] : arguments[2],
						r = Array.isArray(n) ? n : [n],
						i = {
							namespace: A,
							method: t,
							args: r
						};
					e.postMessage(i, "*")
				}
			}, {
				key: "_sendAll",
				value: function(e, t) {
					var n = this;
					this._clients.forEach(function(r) {
						n._send(r, e, t)
					})
				}
			}, {
				key: "handleEvent",
				value: function(e) {
					if ((0, u["default"])(e.data) && e.data.namespace === x) switch (e.data.method) {
						case k:
							this._addClient(e.source);
							break;
						case p:
							this._player.play();
							break;
						case g:
							this._player.pause();
							break;
						case v:
							this._state.dispatch(h.setChannel(e.data.args[0]));
							break;
						case _:
							this._state.dispatch(h.setVideo(e.data.args[0]));
							break;
						case y:
							this._player.setCurrentTime(parseFloat(e.data.args[0]));
							break;
						case m:
							this._player.setQuality(e.data.args[0]);
							break;
						case b:
							this._player.setMuted(!!e.data.args[0]);
							break;
						case E:
							this._player.setVolume(parseFloat(e.data.args[0]));
							break;
						case w:
							this._player.destroy()
					}
				}
			}, {
				key: "_sendPlayerState",
				value: function(e) {
					this._sendAll(S, e.toJSON())
				}
			}, {
				key: "_sendPlayerEvent",
				value: function(e) {
					this._sendAll(T, e)
				}
			}]), e
		}()
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.State = t.EVENT_AD_END = t.EVENT_AD_START = t.KEY_CAPTIONS_MODAL_SEEN = t.DEFAULT_EMBED_STATE = t.CHROMECAST_CONNECTED = t.CHROMECAST_CONNECTING = t.CHROMECAST_AVAILABLE = t.CHROMECAST_UNAVAILABLE = t.PLAYBACK_ENDED = t.PLAYBACK_PLAYING = t.PLAYBACK_PAUSED = t.EVENT_LANGUAGE_CHANGED = t.EVENT_PLAYER_UPDATE = t.EVENT_STATE_UPDATE = void 0;
		var a = function() {
				function e(e, t) {
					var n = [],
						r = !0,
						i = !1,
						o = void 0;
					try {
						for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
					} catch (u) {
						i = !0, o = u
					} finally {
						try {
							!r && s["return"] && s["return"]()
						} finally {
							if (i) throw o
						}
					}
					return n
				}
				return function(t, n) {
					if (Array.isArray(t)) return t;
					if (Symbol.iterator in Object(t)) return e(t, n);
					throw new TypeError("Invalid attempt to destructure non-iterable instance")
				}
			}(),
			s = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			u = n(78),
			c = i(u),
			l = n(75),
			f = i(l),
			d = n(84),
			h = n(150),
			p = n(66),
			g = r(p),
			v = n(160),
			_ = n(179),
			y = n(138),
			m = r(y),
			b = n(181),
			E = r(b),
			w = n(182),
			k = i(w),
			O = n(183),
			S = n(195),
			T = n(197),
			P = r(T),
			x = n(198),
			A = r(x);
		n(199).patch(E);
		var C = t.EVENT_STATE_UPDATE = "stateupdate",
			N = t.EVENT_PLAYER_UPDATE = "player",
			j = t.EVENT_LANGUAGE_CHANGED = "languagechanged",
			L = t.PLAYBACK_PAUSED = "paused",
			R = t.PLAYBACK_PLAYING = "playing",
			M = t.PLAYBACK_ENDED = "ended",
			I = t.CHROMECAST_UNAVAILABLE = "unavailable",
			D = t.CHROMECAST_AVAILABLE = "available",
			U = (t.CHROMECAST_CONNECTING = "connecting", t.CHROMECAST_CONNECTED = "connected"),
			H = (t.DEFAULT_EMBED_STATE = {
				channelName: "",
				currentTime: 0,
				duration: 0,
				muted: !1,
				playback: "",
				quality: "",
				qualitiesAvailable: [],
				stats: {},
				videoID: "",
				viewers: 0,
				volume: 0
			}, "mature"),
			V = "vodResumeTimes",
			B = "vodResumeWatcheds",
			q = "leaveData",
			F = t.KEY_CAPTIONS_MODAL_SEEN = "captionsModalSeen",
			G = [C, N, j],
			z = t.EVENT_AD_START = "adstart",
			K = t.EVENT_AD_END = "adend",
			W = "markerschange",
			$ = "mutedsegmentschange",
			J = "previewschange";
		t.State = function() {
			function e(t, n, r, i, a, s) {
				o(this, e), this._options = s, this._backend = t, this._stateStore = i, this._pubSub = n, this._timelineMetadata = new d.TimelineMetadata(a), this._fullscreen = r, this._eventEmitter = new f["default"], this._i18n = new v.Nulli18n, this._adrunning = !1, this._theatreModeEnabled = !1, this._isVODRestricted = !1, this._isFirstPlaying = !0, this._online = !1, this._viewers = 0, this._markers = [], this._mutedSegments = [], this._previews = d.NULL_PREVIEW, g.allEvents.forEach(function(e) {
					t.addEventListener(e, this.handleEvent.bind(this, e))
				}, this), r.addEventListener(S.FULLSCREEN_CHANGE, this.handleEvent.bind(this, S.FULLSCREEN_CHANGE)), n.addEventListener(O.EVENT_VIEWCOUNT, this._onViewersChange.bind(this)), n.addEventListener(O.EVENT_ONLINE, this.handleEvent.bind(this, O.EVENT_ONLINE)), n.addEventListener(O.EVENT_OFFLINE, this.handleEvent.bind(this, O.EVENT_OFFLINE))
			}
			return s(e, [{
				key: "_onViewersChange",
				value: function(e) {
					this._viewers = e.viewers, this._backend.onViewersChange && this._backend.onViewersChange(e), this._eventEmitter.emit(C, this)
				}
			}, {
				key: "canFullScreen",
				value: function() {
					return this._fullscreen.canFullScreen()
				}
			}, {
				key: "isFullScreen",
				value: function() {
					return this._fullscreen.isFullScreen()
				}
			}, {
				key: "getMarkers",
				value: function() {
					return this._markers
				}
			}, {
				key: "isMature",
				value: function() {
					return E.get(H, !1)
				}
			}, {
				key: "setIsMature",
				value: function(e) {
					E.set(H, e)
				}
			}, {
				key: "getMutedSegments",
				value: function() {
					return this._mutedSegments
				}
			}, {
				key: "getPreviews",
				value: function() {
					return this._previews
				}
			}, {
				key: "setSessionLeaveData",
				value: function(e) {
					k["default"].setItem(q, e)
				}
			}, {
				key: "setTheatreEnabled",
				value: function(e) {
					this._theatreModeEnabled = e, this._eventEmitter.emit(C, this)
				}
			}, {
				key: "isVODRestricted",
				value: function() {
					return this._isVODRestricted
				}
			}, {
				key: "setVodResumeTimes",
				value: function(e) {
					E.set(V, e)
				}
			}, {
				key: "setVodResumeWatcheds",
				value: function(e) {
					E.set(B, e)
				}
			}, {
				key: "getChannelInfo",
				value: function(e) {
					return m.channelInfo(e)
				}
			}, {
				key: "getStreamInfo",
				value: function(e) {
					return m.streamInfo(e)
				}
			}, {
				key: "getVideoInfo",
				value: function(e) {
					return m.videoInfo(e)
				}
			}, {
				key: "getChannelViewerInfo",
				value: function(e) {
					return m.channelViewerInfo(e)
				}
			}, {
				key: "getOfflinePlaylistInfo",
				value: function(e) {
					return this.getChannelInfo(e).then(function(e) {
						return m.offlinePlaylistInfo(e._id)
					})
				}
			}, {
				key: "getSeenCaptionsModal",
				value: function() {
					return E.get(F, !1)
				}
			}, {
				key: "setSeenCaptionsModal",
				value: function() {
					E.set(F, !0)
				}
			}, {
				key: "handleEvent",
				value: function(e, t) {
					var n = this;
					switch (this._logStateChange(e), e) {
						case z:
							this._adrunning = !0;
							break;
						case K:
							this._adrunning = !1;
							break;
						case A.LOADED_CHANNEL:
							this._online = !0;
							break;
						case A.SEGMENT_CHANGE:
						case "segmentchange":
							this._currentSegment = t;
							break;
						case A.LOADED_VIDEO:
							this._timelineMetadata.getMutedSegments(this.videoID).then(function(e) {
								return n._updateMutedSegments(e)
							});
							break;
						case O.EVENT_ONLINE:
							this._online = !0;
							break;
						case O.EVENT_OFFLINE:
							this._online = !1;
							break;
						case A.LOADED_METADATA:
							this._updateIsVODRestricted();
							break;
						case P.LOADSTART:
							this._updateIsVODRestricted();
							break;
						case P.PLAYING:
							this._isFirstPlaying && this.videoID && (this._isFirstPlaying = !1, this._retrieveTimelineMetadata());
							break;
						case A.USHER_FAIL_ERROR:
							this._updateIsVODRestricted()
					}
					this._eventEmitter.emit(N, e), this._eventEmitter.emit(C, this)
				}
			}, {
				key: "_retrieveTimelineMetadata",
				value: function() {
					var e = this,
						t = this._stateStore.getState(),
						n = t.experiments;
					n.get(h.THUMBNAIL_PREVIEWS).then(function(t) {
						"no" !== t && m.videoInfo("v26108407").then(function(t) {
							return e._timelineMetadata.getPreviews(t)
						}).then(function(t) {
							return e._updatePreviews(t)
						})
					}), n.get(h.MARKERS).then(function(t) {
						"no" !== t && m.videoInfo(e.videoID).then(function(t) {
							return e._timelineMetadata.getMarkers(t)
						}).then(function(t) {
							return e._updateMarkers(t)
						})
					})
				}
			}, {
				key: "addEventListener",
				value: function(e, t) {
					(0, c["default"])(G, e) && this._eventEmitter.addListener(e, t)
				}
			}, {
				key: "removeEventListener",
				value: function(e, t) {
					this._eventEmitter.removeListener(e, t)
				}
			}, {
				key: "toJSON",
				value: function() {
					return {
						channelName: this.channelName,
						currentTime: this.currentTime,
						duration: this.duration,
						muted: this.muted,
						online: this.online,
						playback: this.playback,
						quality: this.quality,
						qualitiesAvailable: this.qualitiesAvailable,
						stats: this.stats,
						videoID: this.videoID,
						viewers: this.viewers,
						volume: this.volume
					}
				}
			}, {
				key: "_logStateChange",
				value: function() {
					var e = arguments.length <= 0 || void 0 === arguments[0] ? null : arguments[0];
					this._options.debug && !(0, c["default"])(g.debugIgnoreEvents, e) && null !== e && (console.groupCollapsed("state change: %s", e), console.log("partial state: %o", this.toJSON()), console.groupEnd())
				}
			}, {
				key: "setLang",
				value: function(e) {
					var t = this;
					(0, v.getI18N)(e).then(function(e) {
						t._i18n = e, t._eventEmitter.emit(j, t)
					})
				}
			}, {
				key: "_updateMarkers",
				value: function(e) {
					this._markers = e, this._logStateChange(W), this._eventEmitter.emit(C, this)
				}
			}, {
				key: "_updateMutedSegments",
				value: function(e) {
					this._mutedSegments = e, this._logStateChange($), this._eventEmitter.emit(C, this)
				}
			}, {
				key: "_updatePreviews",
				value: function(e) {
					this._previews = e, this._logStateChange(J), this._eventEmitter.emit(C, this)
				}
			}, {
				key: "_updateIsVODRestricted",
				value: function() {
					var e = this;
					if (this._isVODRestricted = !1, this._eventEmitter.emit(C, this), null !== this.videoID && null === this.channelName) {
						var t = m.videoInfo(this.videoID),
							n = t.then(function(e) {
								return m.channelViewerInfo(e.channel.name)
							});
						Promise.all([t, n]).then(function(t) {
							var n = a(t, 2),
								r = n[0],
								i = n[1];
							e._isVODRestricted = m.isVODRestricted(i, r), e._eventEmitter.emit(C, e)
						})
					}
				}
			}, {
				key: "destroy",
				value: function() {
					var e = this;
					G.map(function(t) {
						e._eventEmitter.removeEvent(t)
					})
				}
			}, {
				key: "isAdRunning",
				get: function() {
					return this._adrunning
				}
			}, {
				key: "autoplayEnabled",
				get: function() {
					return this._backend.getAutoplay()
				}
			}, {
				key: "buffered",
				get: function() {
					return this._backend.getBuffered()
				}
			}, {
				key: "castingDevice",
				get: function() {
					return _.BackendChromecast.getDevice()
				}
			}, {
				key: "castingState",
				get: function() {
					if (_.BackendChromecast.getReadyState() !== _.BackendChromecast.HAVE_NOTHING) return U;
					switch (_.BackendChromecast.getNetworkState()) {
						case _.BackendChromecast.NETWORK_EMPTY:
							return I;
						case _.BackendChromecast.NETWORK_IDLE:
							return D;
						default:
							return U
					}
				}
			}, {
				key: "channelName",
				get: function() {
					return this._backend.getChannel()
				}
			}, {
				key: "currentBackend",
				get: function() {
					return this._backend.getBackend()
				}
			}, {
				key: "currentTime",
				get: function() {
					return this._backend.getCurrentTime()
				}
			}, {
				key: "duration",
				get: function() {
					return this._backend.getDuration()
				}
			}, {
				key: "error",
				get: function() {
					return this._backend.error
				}
			}, {
				key: "i18n",
				get: function() {
					return this._i18n
				}
			}, {
				key: "isLoading",
				get: function() {
					return this.playback === R && this._backend.getReadyState() <= this._backend.HAVE_CURRENT_DATA
				}
			}, {
				key: "muted",
				get: function() {
					return this._backend.getMuted()
				}
			}, {
				key: "online",
				get: function() {
					return this._online
				}
			}, {
				key: "playback",
				get: function() {
					return this._backend.getPaused() ? L : this._backend.getEnded() ? M : R
				}
			}, {
				key: "quality",
				get: function() {
					return this._backend.getQuality()
				}
			}, {
				key: "qualitiesAvailable",
				get: function() {
					return this._backend.getQualities()
				}
			}, {
				key: "sessionLeaveData",
				get: function() {
					return k["default"].getItem(q)
				}
			}, {
				key: "isSeeking",
				get: function() {
					return this._backend.getSeeking()
				}
			}, {
				key: "isSpectre",
				get: function() {
					return this._backend.isSpectre()
				}
			}, {
				key: "stats",
				get: function() {
					return this._backend.getStats()
				}
			}, {
				key: "supportedBackends",
				get: function() {
					return this._backend.getSupportedBackends()
				}
			}, {
				key: "theatreEnabled",
				get: function() {
					return this._theatreModeEnabled
				}
			}, {
				key: "viewers",
				get: function() {
					return this._viewers
				}
			}, {
				key: "videoID",
				get: function() {
					return this._backend.getVideo()
				}
			}, {
				key: "videoURL",
				get: function() {
					return this._backend.getVideoURL()
				}
			}, {
				key: "vodResumeTimes",
				get: function() {
					return E.get(V, {})
				}
			}, {
				key: "vodResumeWatcheds",
				get: function() {
					return E.get(B, {})
				}
			}, {
				key: "volume",
				get: function() {
					return this._backend.getVolume()
				}
			}, {
				key: "currentSegment",
				get: function() {
					return this._currentSegment
				}
			}]), e
		}()
	}, function(e, t, n) {
		function r(e, t, n, r) {
			e = o(e) ? e : u(e), n = n && !r ? s(n) : 0;
			var l = e.length;
			return 0 > n && (n = c(l + n, 0)), a(e) ? l >= n && e.indexOf(t, n) > -1 : !!l && i(e, t, n) > -1
		}
		var i = n(38),
			o = n(47),
			a = n(1),
			s = n(63),
			u = n(79),
			c = Math.max;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return e ? i(e, o(e)) : []
		}
		var i = n(80),
			o = n(81);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return i(t, function(t) {
				return e[t]
			})
		}
		var i = n(5);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = c(e);
			if (!t && !s(e)) return o(e);
			var n = a(e),
				r = !!n,
				l = n || [],
				f = l.length;
			for (var d in e) !i(e, d) || r && ("length" == d || u(d, f)) || t && "constructor" == d || l.push(d);
			return l
		}
		var i = n(82),
			o = n(83),
			a = n(57),
			s = n(47),
			u = n(59),
			c = n(60);
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			return i.call(e, t) || "object" == typeof e && t in e && null === o(e)
		}
		var r = Object.prototype,
			i = r.hasOwnProperty,
			o = Object.getPrototypeOf;
		e.exports = n
	}, function(e, t) {
		function n(e) {
			return r(Object(e))
		}
		var r = Object.keys;
		e.exports = n
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e, t, n) {
			return t in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.TimelineMetadata = t.NULL_PREVIEW = void 0;
		var a, s = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			u = n(85),
			c = r(u),
			l = n(136),
			f = r(l),
			d = n(79),
			h = r(d),
			p = n(73),
			g = n(138),
			v = t.NULL_PREVIEW = {
				count: 0,
				lq: {
					width: 0,
					height: 0,
					rows: 0,
					cols: 0,
					URLs: [""]
				},
				hq: {
					width: 0,
					height: 0,
					rows: 0,
					cols: 0,
					URLs: [""]
				}
			},
			_ = "low",
			y = "high",
			m = "https://clipmn.twitch.tv/prod/",
			b = "lol",
			E = "hs",
			w = "leagueOfLegendTags",
			k = "hearthStoneOpeningTags",
			O = "hearthStoneMatchTags",
			S = "ungroupedTags",
			T = (a = {}, o(a, w, function(e, t, n) {
				return {
					title: "Match " + (t + 1),
					info: "",
					startTime: e.start_sec,
					imageURL: "" + m + n.thumbnail_sheet,
					x: e.thumbnail_index[1] * n.thumbnail_size[0],
					y: e.thumbnail_index[0] * n.thumbnail_size[1],
					width: n.thumbnail_size[0],
					height: n.thumbnail_size[1],
					cols: n.sheet_dimensions[1]
				}
			}), o(a, O, function(e, t, n) {
				return {
					title: "Match " + (t + 1),
					info: "<strong>" + e.game_data.characters[0] + "</strong> vs. " + e.game_data.characters[1],
					startTime: e.start_sec,
					imageURL: "" + m + n.thumbnail_sheet,
					x: e.thumbnail_index[1] * n.thumbnail_size[0],
					y: e.thumbnail_index[0] * n.thumbnail_size[1],
					width: n.thumbnail_size[0],
					height: n.thumbnail_size[1],
					cols: n.sheet_dimensions[1]
				}
			}), a),
			P = function() {
				return null
			};
		t.TimelineMetadata = function() {
			function e(t, n) {
				i(this, e), this._analytics = t, this._options = n
			}
			return s(e, [{
				key: "getPreviews",
				value: function(e) {
					var t = this;
					return Promise.resolve($.get(e.seek_previews_url)).then(function(n) {
						return t._normalizedPreviews(n, e.seek_previews_url)
					})["catch"](function() {
						return v
					})
				}
			}, {
				key: "getMutedSegments",
				value: function(e) {
					var t = this;
					return (0, g.videoInfo)(e).then(function(e) {
						return t._normalizedMutedSegments(e.muted_segments)
					})["catch"](function() {
						return []
					})
				}
			}, {
				key: "getMarkers",
				value: function(e) {
					var t = this;
					return Promise.resolve($.get(m + "channels.json")).then(function(t) {
						return -1 === t.indexOf(e.channel.name) ? Promise.reject("Current channel is not marker enabled") : Promise.resolve($.get("" + m + e._id + ".json"))
					}).then(function(e) {
						return t._analytics.trackEvent("vod_metadata_request", {
							response: "success"
						}), e
					}).then(function(e) {
						return JSON.parse(e)
					}).then(this._normalizedMarkers)["catch"](function(n) {
						return n.status && -1 !== n.responseText.indexOf(e._id + ".json") && t._analytics.trackEvent("vod_metadata_request", {
							response: "404"
						}), []
					})
				}
			}, {
				key: "_normalizedPreviews",
				value: function(e, t) {
					if (null === e) return v;
					var n = (0, p.parseUri)(t),
						r = n.protocol + "://" + n.host + n.directory,
						i = e.map(function(e) {
							return e.quality
						}),
						o = i.indexOf(_),
						a = i.indexOf(y);
					return {
						count: e[o].count,
						lq: {
							width: e[o].width,
							height: e[o].height,
							rows: e[o].rows,
							cols: e[o].cols,
							URLs: e[o].images.map(function(e) {
								return "" + r + e + "?t=" + Date.now()
							})
						},
						hq: {
							width: e[a].width,
							height: e[a].height,
							rows: e[a].rows,
							cols: e[a].cols,
							URLs: e[a].images.map(function(e) {
								return "" + r + e + "?t=" + Date.now()
							})
						}
					}
				}
			}, {
				key: "_normalizedMutedSegments",
				value: function() {
					var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
					if (e.length <= 1) return e;
					var t = e.slice(0).sort(function(e, t) {
						return e.offset - t.offset
					});
					return this._combineOverlappingSegments(t)
				}
			}, {
				key: "_normalizedMarkers",
				value: function(e) {
					if (null === e) return [];
					var t = (0, c["default"])(e.data.tags, function(e) {
						switch (e.game_type) {
							case b:
								return w;
							case E:
								switch (e.game_data.type) {
									case 0:
										return O;
									case 1:
										return k
								}
						}
						return S
					});
					return Array.prototype.concat.apply([], (0, h["default"])((0, f["default"])(t, function(t, n) {
						return t.map(function(t, r) {
							var i = T[n] || P;
							return i(t, r, e.data)
						})
					}))).filter(function(e) {
						return null !== e
					}).sort()
				}
			}, {
				key: "_combineOverlappingSegments",
				value: function(e) {
					return e.reduce(function(e, t) {
						var n = e[e.length - 1],
							r = n.offset + n.duration,
							i = t.offset + t.duration;
						return r < t.offset ? e.push(t) : i > r && (n.duration = i - n.offset), e
					}, [e[0]])
				}
			}]), e
		}()
	}, function(e, t, n) {
		var r = n(86),
			i = Object.prototype,
			o = i.hasOwnProperty,
			a = r(function(e, t, n) {
				o.call(e, n) ? e[n].push(t) : e[n] = [t]
			});
		e.exports = a
	}, function(e, t, n) {
		function r(e, t) {
			return function(n, r) {
				var u = s(n) ? i : o,
					c = t ? t() : {};
				return u(n, e, a(r), c)
			}
		}
		var i = n(87),
			o = n(88),
			a = n(94),
			s = n(2);
		e.exports = r
	}, function(e, t) {
		function n(e, t, n, r) {
			for (var i = -1, o = e.length; ++i < o;) {
				var a = e[i];
				t(r, a, n(a), e)
			}
			return r
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t, n, r) {
			return i(e, function(e, i, o) {
				t(r, e, n(e), o)
			}), r
		}
		var i = n(89);
		e.exports = r
	}, function(e, t, n) {
		var r = n(90),
			i = n(93),
			o = i(r);
		e.exports = o
	}, function(e, t, n) {
		function r(e, t) {
			return e && i(e, t, o)
		}
		var i = n(91),
			o = n(81);
		e.exports = r
	}, function(e, t, n) {
		var r = n(92),
			i = r();
		e.exports = i
	}, function(e, t) {
		function n(e) {
			return function(t, n, r) {
				for (var i = -1, o = Object(t), a = r(t), s = a.length; s--;) {
					var u = a[e ? s : ++i];
					if (n(o[u], u, o) === !1) break
				}
				return t
			}
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			return function(n, r) {
				if (null == n) return n;
				if (!i(n)) return e(n, r);
				for (var o = n.length, a = t ? o : -1, s = Object(n);
					 (t ? a-- : ++a < o) && r(s[a], a, s) !== !1;);
				return n
			}
		}
		var i = n(47);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = typeof e;
			return "function" == t ? e : null == e ? a : "object" == t ? s(e) ? o(e[0], e[1]) : i(e) : u(e)
		}
		var i = n(95),
			o = n(119),
			a = n(133),
			s = n(2),
			u = n(134);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = o(e);
			if (1 == t.length && t[0][2]) {
				var n = t[0][0],
					r = t[0][1];
				return function(e) {
					return null == e ? !1 : e[n] === r && (void 0 !== r || n in Object(e))
				}
			}
			return function(n) {
				return n === e || i(n, e, t)
			}
		}
		var i = n(96),
			o = n(115);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, r) {
			var u = n.length,
				c = u,
				l = !r;
			if (null == e) return !c;
			for (e = Object(e); u--;) {
				var f = n[u];
				if (l && f[2] ? f[1] !== e[f[0]] : !(f[0] in e)) return !1
			}
			for (; ++u < c;) {
				f = n[u];
				var d = f[0],
					h = e[d],
					p = f[1];
				if (l && f[2]) {
					if (void 0 === h && !(d in e)) return !1
				} else {
					var g = new i,
						v = r ? r(h, p, d, e, t, g) : void 0;
					if (!(void 0 === v ? o(p, h, r, a | s, g) : v)) return !1
				}
			}
			return !0
		}
		var i = n(97),
			o = n(103),
			a = 1,
			s = 2;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.clear(); ++t < n;) {
				var r = e[t];
				this.set(r[0], r[1])
			}
		}
		var i = n(98),
			o = n(99),
			a = n(100),
			s = n(101),
			u = n(102);
		r.prototype.clear = i, r.prototype["delete"] = o, r.prototype.get = a, r.prototype.has = s, r.prototype.set = u, e.exports = r
	}, function(e, t) {
		function n() {
			this.__data__ = {
				array: [],
				map: null
			}
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__,
				n = t.array;
			return n ? i(n, e) : t.map["delete"](e)
		}
		var i = n(22);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__,
				n = t.array;
			return n ? i(n, e) : t.map.get(e)
		}
		var i = n(29);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = this.__data__,
				n = t.array;
			return n ? i(n, e) : t.map.has(e)
		}
		var i = n(32);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = this.__data__,
				r = n.array;
			r && (r.length < a - 1 ? o(r, e, t) : (n.array = null, n.map = new i(r)));
			var s = n.map;
			return s && s.set(e, t), this
		}
		var i = n(8),
			o = n(34),
			a = 200;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, s, u) {
			return e === t ? !0 : null == e || null == t || !o(e) && !a(t) ? e !== e && t !== t : i(e, t, r, n, s, u)
		}
		var i = n(104),
			o = n(15),
			a = n(3);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, r, v, y) {
			var m = c(e),
				b = c(t),
				E = p,
				w = p;
			m || (E = u(e), E = E == h ? g : E), b || (w = u(t), w = w == h ? g : w);
			var k = E == g && !l(e),
				O = w == g && !l(t),
				S = E == w;
			if (S && !k) return y || (y = new i), m || f(e) ? o(e, t, n, r, v, y) : a(e, t, E, n, r, v, y);
			if (!(v & d)) {
				var T = k && _.call(e, "__wrapped__"),
					P = O && _.call(t, "__wrapped__");
				if (T || P) return y || (y = new i), n(T ? e.value() : e, P ? t.value() : t, r, v, y)
			}
			return S ? (y || (y = new i), s(e, t, n, r, v, y)) : !1
		}
		var i = n(97),
			o = n(105),
			a = n(107),
			s = n(111),
			u = n(112),
			c = n(2),
			l = n(16),
			f = n(114),
			d = 2,
			h = "[object Arguments]",
			p = "[object Array]",
			g = "[object Object]",
			v = Object.prototype,
			_ = v.hasOwnProperty;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, r, s, u) {
			var c = -1,
				l = s & a,
				f = s & o,
				d = e.length,
				h = t.length;
			if (d != h && !(l && h > d)) return !1;
			var p = u.get(e);
			if (p) return p == t;
			var g = !0;
			for (u.set(e, t); ++c < d;) {
				var v = e[c],
					_ = t[c];
				if (r) var y = l ? r(_, v, c, t, e, u) : r(v, _, c, e, t, u);
				if (void 0 !== y) {
					if (y) continue;
					g = !1;
					break
				}
				if (f) {
					if (!i(t, function(e) {
							return v === e || n(v, e, r, s, u)
						})) {
						g = !1;
						break
					}
				} else if (v !== _ && !n(v, _, r, s, u)) {
					g = !1;
					break
				}
			}
			return u["delete"](e), g
		}
		var i = n(106),
			o = 1,
			a = 2;
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			for (var n = -1, r = e.length; ++n < r;)
				if (t(e[n], n, e)) return !0;
			return !1
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t, n, r, i, E, k) {
			switch (n) {
				case b:
					return e.byteLength == t.byteLength && r(new o(e), new o(t)) ? !0 : !1;
				case f:
				case d:
					return +e == +t;
				case h:
					return e.name == t.name && e.message == t.message;
				case g:
					return e != +e ? t != +t : e == +t;
				case v:
				case y:
					return e == t + "";
				case p:
					var O = s;
				case _:
					var S = E & l;
					if (O || (O = u), e.size != t.size && !S) return !1;
					var T = k.get(e);
					return T ? T == t : a(O(e), O(t), r, i, E | c, k.set(e, t));
				case m:
					if (w) return w.call(e) == w.call(t)
			}
			return !1
		}
		var i = n(108),
			o = n(109),
			a = n(105),
			s = n(110),
			u = n(72),
			c = 1,
			l = 2,
			f = "[object Boolean]",
			d = "[object Date]",
			h = "[object Error]",
			p = "[object Map]",
			g = "[object Number]",
			v = "[object RegExp]",
			_ = "[object Set]",
			y = "[object String]",
			m = "[object Symbol]",
			b = "[object ArrayBuffer]",
			E = i ? i.prototype : void 0,
			w = E ? E.valueOf : void 0;
		e.exports = r
	}, function(e, t, n) {
		var r = n(18),
			i = r.Symbol;
		e.exports = i
	}, function(e, t, n) {
		var r = n(18),
			i = r.Uint8Array;
		e.exports = i
	}, function(e, t) {
		function n(e) {
			var t = -1,
				n = Array(e.size);
			return e.forEach(function(e, r) {
				n[++t] = [r, e]
			}), n
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t, n, r, s, u) {
			var c = s & a,
				l = o(e),
				f = l.length,
				d = o(t),
				h = d.length;
			if (f != h && !c) return !1;
			for (var p = f; p--;) {
				var g = l[p];
				if (!(c ? g in t : i(t, g))) return !1
			}
			var v = u.get(e);
			if (v) return v == t;
			var _ = !0;
			u.set(e, t);
			for (var y = c; ++p < f;) {
				g = l[p];
				var m = e[g],
					b = t[g];
				if (r) var E = c ? r(b, m, g, t, e, u) : r(m, b, g, e, t, u);
				if (!(void 0 === E ? m === b || n(m, b, r, s, u) : E)) {
					_ = !1;
					break
				}
				y || (y = "constructor" == g)
			}
			if (_ && !y) {
				var w = e.constructor,
					k = t.constructor;
				w != k && "constructor" in e && "constructor" in t && !("function" == typeof w && w instanceof w && "function" == typeof k && k instanceof k) && (_ = !1)
			}
			return u["delete"](e), _
		}
		var i = n(82),
			o = n(81),
			a = 2;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return h.call(e)
		}
		var i = n(17),
			o = n(70),
			a = n(113),
			s = "[object Map]",
			u = "[object Object]",
			c = "[object Set]",
			l = "[object WeakMap]",
			f = Object.prototype,
			d = Function.prototype.toString,
			h = f.toString,
			p = i ? d.call(i) : "",
			g = o ? d.call(o) : "",
			v = a ? d.call(a) : "";
		(i && r(new i) != s || o && r(new o) != c || a && r(new a) != l) && (r = function(e) {
			var t = h.call(e),
				n = t == u ? e.constructor : null,
				r = "function" == typeof n ? d.call(n) : "";
			if (r) switch (r) {
				case p:
					return s;
				case g:
					return c;
				case v:
					return l
			}
			return t
		}), e.exports = r
	}, function(e, t, n) {
		var r = n(12),
			i = n(18),
			o = r(i, "WeakMap");
		e.exports = o
	}, function(e, t, n) {
		function r(e) {
			return o(e) && i(e.length) && !!A[N.call(e)]
		}
		var i = n(50),
			o = n(3),
			a = "[object Arguments]",
			s = "[object Array]",
			u = "[object Boolean]",
			c = "[object Date]",
			l = "[object Error]",
			f = "[object Function]",
			d = "[object Map]",
			h = "[object Number]",
			p = "[object Object]",
			g = "[object RegExp]",
			v = "[object Set]",
			_ = "[object String]",
			y = "[object WeakMap]",
			m = "[object ArrayBuffer]",
			b = "[object Float32Array]",
			E = "[object Float64Array]",
			w = "[object Int8Array]",
			k = "[object Int16Array]",
			O = "[object Int32Array]",
			S = "[object Uint8Array]",
			T = "[object Uint8ClampedArray]",
			P = "[object Uint16Array]",
			x = "[object Uint32Array]",
			A = {};
		A[b] = A[E] = A[w] = A[k] = A[O] = A[S] = A[T] = A[P] = A[x] = !0, A[a] = A[s] = A[m] = A[u] = A[c] = A[l] = A[f] = A[d] = A[h] = A[p] = A[g] = A[v] = A[_] = A[y] = !1;
		var C = Object.prototype,
			N = C.toString;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			for (var t = o(e), n = t.length; n--;) t[n][2] = i(t[n][1]);
			return t
		}
		var i = n(116),
			o = n(117);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return e === e && !i(e)
		}
		var i = n(15);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return i(e, o(e))
		}
		var i = n(118),
			o = n(81);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return i(t, function(t) {
				return [t, e[t]]
			})
		}
		var i = n(5);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return function(n) {
				var r = o(n, e);
				return void 0 === r && r === t ? a(n, e) : i(t, r, void 0, s | u)
			}
		}
		var i = n(103),
			o = n(120),
			a = n(127),
			s = 1,
			u = 2;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			var r = null == e ? void 0 : i(e, t);
			return void 0 === r ? n : r
		}
		var i = n(121);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			t = o(t, e) ? [t + ""] : i(t);
			for (var n = 0, r = t.length; null != e && r > n;) e = e[t[n++]];
			return n && n == r ? e : void 0
		}
		var i = n(122),
			o = n(126);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return i(e) ? e : o(e)
		}
		var i = n(2),
			o = n(123);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			var t = [];
			return i(e).replace(o, function(e, n, r, i) {
				t.push(r ? i.replace(a, "$1") : n || e)
			}), t
		}
		var i = n(124),
			o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g,
			a = /\\(\\)?/g;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			if ("string" == typeof e) return e;
			if (null == e) return "";
			if (o(e)) return u ? u.call(e) : "";
			var t = e + "";
			return "0" == t && 1 / e == -a ? "-0" : t
		}
		var i = n(108),
			o = n(125),
			a = 1 / 0,
			s = i ? i.prototype : void 0,
			u = s ? s.toString : void 0;
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return "symbol" == typeof e || i(e) && s.call(e) == o
		}
		var i = n(3),
			o = "[object Symbol]",
			a = Object.prototype,
			s = a.toString;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return "number" == typeof e ? !0 : !i(e) && (a.test(e) || !o.test(e) || null != t && e in Object(t))
		}
		var i = n(2),
			o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
			a = /^\w*$/;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			return o(e, t, i)
		}
		var i = n(128),
			o = n(129);
		e.exports = r
	}, function(e, t) {
		function n(e, t) {
			return t in Object(e)
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t, n) {
			if (null == e) return !1;
			var r = n(e, t);
			r || u(t) || (t = i(t), e = d(e, t), null != e && (t = f(t), r = n(e, t)));
			var h = e ? e.length : void 0;
			return r || !!h && c(h) && s(t, h) && (a(e) || l(e) || o(e))
		}
		var i = n(122),
			o = n(45),
			a = n(2),
			s = n(59),
			u = n(126),
			c = n(50),
			l = n(1),
			f = n(130),
			d = n(131);
		e.exports = r
	}, function(e, t) {
		function n(e) {
			var t = e ? e.length : 0;
			return t ? e[t - 1] : void 0
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e, t) {
			return 1 == t.length ? e : o(e, i(t, 0, -1))
		}
		var i = n(132),
			o = n(120);
		e.exports = r
	}, function(e, t) {
		function n(e, t, n) {
			var r = -1,
				i = e.length;
			0 > t && (t = -t > i ? 0 : i + t), n = n > i ? i : n, 0 > n && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0;
			for (var o = Array(i); ++r < i;) o[r] = e[r + t];
			return o
		}
		e.exports = n
	}, function(e, t) {
		function n(e) {
			return e
		}
		e.exports = n
	}, function(e, t, n) {
		function r(e) {
			return a(e) ? i(e) : o(e)
		}
		var i = n(49),
			o = n(135),
			a = n(126);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return function(t) {
				return i(t, e)
			}
		}
		var i = n(121);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = s(e) ? i : a;
			return n(e, o(t, 3))
		}
		var i = n(5),
			o = n(94),
			a = n(137),
			s = n(2);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			var n = -1,
				r = o(e) ? Array(e.length) : [];
			return i(e, function(e, i, o) {
				r[++n] = t(e, i, o)
			}), r
		}
		var i = n(89),
			o = n(47);
		e.exports = r
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.videoUrl = t.channelUrl = t.isVODRestricted = t.accessToken = t.oauthToken = t.channelAPIInfo = t.krakenUserInfo = t.userInfo = t.channelViewerInfo = t.offlinePlaylistInfo = t.streamInfo = t.productInfo = t.videoInfo = t.channelInfo = void 0;
		var o = n(139),
			a = i(o),
			s = n(146),
			u = i(s),
			c = n(147),
			l = i(c),
			f = n(148),
			d = i(f),
			h = n(66),
			p = r(h),
			g = !!("withCredentials" in new XMLHttpRequest),
			v = g ? "json" : "jsonp",
			_ = function(e) {
				return e.replace(/[^A-Za-z0-9_]/g, "")
			},
			y = (0, u["default"])(function(e) {
				if (null === e) return Promise.reject(new Error("No channel info available on null channel ID"));
				var t = $.ajax({
					url: p.apiHost + "/kraken/channels/" + _(e),
					dataType: v,
					timeout: p.apiTimeout
				});
				return Promise.resolve(t)
			}),
			m = (0, u["default"])(function(e) {
				if (null === e) return Promise.reject(new Error("No video info available on null video ID"));
				var t = $.ajax({
						url: p.apiHost + "/kraken/videos/" + _(e),
						dataType: v,
						timeout: p.apiTimeout
					}),
					n = $.ajax({
						url: p.apiHost + "/api/videos/" + _(e),
						dataType: "jsonp",
						timeout: p.apiTimeout
					}).then(function(e) {
						return (0, l["default"])(e, ["muted_segments", "increment_view_count_url", "restrictions", "seek_previews_url"])
					}),
					r = Promise.all([t, n]);
				return r.then(function(e) {
					return (0, a["default"])({}, e[0], e[1])
				})
			}),
			b = (0, u["default"])(function(e) {
				var t = $.ajax({
					url: p.apiHost + "/api/channels/" + _(e) + "/product",
					dataType: v,
					timeout: p.apiTimeout
				});
				return Promise.resolve(t)
			}),
			E = (0, u["default"])(function(e) {
				var t = $.ajax({
					url: p.apiHost + "/kraken/streams/" + _(e),
					dataType: v,
					timeout: p.apiTimeout
				});
				return Promise.resolve(t)
			}),
			w = function(e) {
				var t = $.ajax({
					url: p.spectreHost + "/v1/channels/" + e,
					dataType: "jsonp",
					timeout: p.apiTimeout
				});
				return Promise.resolve(t)
			},
			k = (0, u["default"])(function(e) {
				var t = $.ajax({
					url: p.apiHost + "/api/channels/" + _(e) + "/viewer",
					xhrFields: {
						withCredentials: !0
					},
					dataType: v,
					timeout: p.apiTimeout
				});
				return Promise.resolve(t)
			}),
			O = (0, u["default"])(function() {
				return P().then(function() {
					var e = $.ajax({
						url: p.apiHost + "/api/viewer/info.json",
						xhrFields: {
							withCredentials: !0
						},
						dataType: v,
						timeout: p.apiTimeout
					});
					return Promise.resolve(e)
				})
			}),
			S = (0, u["default"])(function() {
				return P().then(function(e) {
					var t = $.ajax({
						url: p.apiHost + "/kraken/user",
						headers: {
							Accept: "application/vnd.twitchtv.v2+json",
							Authorization: "OAuth " + e.token
						},
						dataType: v,
						timeout: p.apiTimeout
					});
					return Promise.resolve(t)
				})
			}),
			T = (0, u["default"])(function(e) {
				return P().then(function() {
					var t = $.ajax({
						url: p.apiHost + "/api/channels/" + e,
						dataType: v,
						timeout: p.apiTimeout
					});
					return Promise.resolve(t)
				})
			}),
			P = (0, u["default"])(function() {
				var e = $.ajax({
					url: p.apiHost + "/api/viewer/token.json",
					xhrFields: {
						withCredentials: !0
					},
					dataType: v,
					timeout: p.apiTimeout
				});
				return Promise.resolve(e)
			}),
			x = function(e, t) {
				var n = function(n) {
					var r;
					"channel" === e ? r = p.apiHost + "/api/channels/" + _(t) + "/access_token" : "video" === e && (r = p.apiHost + "/api/vods/" + _(t) + "/access_token");
					var i = $.ajax({
						url: r,
						data: {
							oauth_token: n
						},
						xhrFields: {
							withCredentials: !0
						},
						dataType: v,
						timeout: p.apiTimeout
					});
					return Promise.resolve(i)
				};
				return P().then(function(e) {
					return n(e.token)
				}, function() {
					return n()
				})
			},
			A = function(e, t) {
				return null !== e.chansub || e.is_admin ? !1 : (0, d["default"])(t.restrictions, function(e, t) {
					return e || "chansub" === t
				}, !1)
			},
			C = function(e, t) {
				var n = p.twitchHost + "/" + _(e);
				return t && (n += "?" + $.param(t)), n
			},
			N = function(e, t, n) {
				var r = C(e),
					i = t[0],
					o = t.substring(1);
				return r += "/" + _(i) + "/" + _(o), n && (r += "?" + $.param(n)), r
			};
		t.channelInfo = y, t.videoInfo = m, t.productInfo = b, t.streamInfo = E, t.offlinePlaylistInfo = w, t.channelViewerInfo = k, t.userInfo = O, t.krakenUserInfo = S, t.channelAPIInfo = T, t.oauthToken = P, t.accessToken = x, t.isVODRestricted = A, t.channelUrl = C, t.videoUrl = N
	}, function(e, t, n) {
		e.exports = n(140)
	}, function(e, t, n) {
		var r = n(141),
			i = n(142),
			o = n(144),
			a = n(47),
			s = n(60),
			u = n(53),
			c = Object.prototype,
			l = c.propertyIsEnumerable,
			f = !l.call({
				valueOf: 1
			}, "valueOf"),
			d = o(function(e, t) {
				if (f || s(t) || a(t)) return void i(t, u(t), e);
				for (var n in t) r(e, n, t[n])
			});
		e.exports = d
	}, function(e, t, n) {
		function r(e, t, n) {
			var r = e[t];
			a.call(e, t) && i(r, n) && (void 0 !== n || t in e) || (e[t] = n)
		}
		var i = n(24),
			o = Object.prototype,
			a = o.hasOwnProperty;
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			return i(e, t, n)
		}
		var i = n(143);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n, r) {
			n || (n = {});
			for (var o = -1, a = t.length; ++o < a;) {
				var s = t[o],
					u = r ? r(n[s], e[s], s, n, e) : e[s];
				i(n, s, u)
			}
			return n
		}
		var i = n(141);
		e.exports = r
	}, function(e, t, n) {
		function r(e) {
			return o(function(t, n) {
				var r = -1,
					o = n.length,
					a = o > 1 ? n[o - 1] : void 0,
					s = o > 2 ? n[2] : void 0;
				for (a = "function" == typeof a ? (o--, a) : void 0, s && i(n[0], n[1], s) && (a = 3 > o ? void 0 : a, o = 1), t = Object(t); ++r < o;) {
					var u = n[r];
					u && e(t, u, r, a)
				}
				return t
			})
		}
		var i = n(145),
			o = n(61);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t, n) {
			if (!s(n)) return !1;
			var r = typeof t;
			return ("number" == r ? o(n) && a(t, n.length) : "string" == r && t in n) ? i(n[t], e) : !1
		}
		var i = n(24),
			o = n(47),
			a = n(59),
			s = n(15);
		e.exports = r
	}, function(e, t, n) {
		function r(e, t) {
			if ("function" != typeof e || t && "function" != typeof t) throw new TypeError(o);
			var n = function() {
				var r = arguments,
					i = t ? t.apply(this, r) : r[0],
					o = n.cache;
				if (o.has(i)) return o.get(i);
				var a = e.apply(this, r);
				return n.cache = o.set(i, a), a
			};
			return n.cache = new r.Cache, n
		}
		var i = n(8),
			o = "Expected a function";
		r.Cache = i, e.exports = r
	}, function(e, t, n) {
		var r = n(43),
			i = n(51),
			o = n(61),
			a = o(function(e, t) {
				return null == e ? {} : i(e, r(t, 1))
			});
		e.exports = a
	}, function(e, t, n) {
		function r(e, t, n) {
			var r = u(e) ? i : s,
				c = arguments.length < 3;
			return r(e, a(t, 4), n, c, o)
		}
		var i = n(52),
			o = n(89),
			a = n(94),
			s = n(149),
			u = n(2);
		e.exports = r
	}, function(e, t) {
		function n(e, t, n, r, i) {
			return i(e, function(e, i, o) {
				n = r ? (r = !1, e) : t(n, e, i, o)
			}), n
		}
		e.exports = n
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t, n) {
			return t in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		}

		function o(e) {
			var t, n;
			return new s["default"]({
				defaults: (t = {}, i(t, f, "no"), i(t, d, "no"), i(t, h, "yes"), i(t, p, "no"), i(t, g, "http:"), i(t, v, "no"), i(t, y, "no"), i(t, _, "no"), t),
				deviceID: e.deviceID,
				overrides: (n = {}, i(n, y, m()), i(n, p, b("yes")), n),
				platform: "web",
				login: e.login,
				provider: new c["default"](c["default"].SERVICE_URL),
				Promise: Promise
			})
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CLIPS = t.HTML5_TOGGLE = t.THUMBNAIL_PREVIEWS = t.USHER_PROTOCOL = t.MARKERS = t.PREROLL_ADS = t.ABS_V1 = t.NETWORK_PROFILE_COLLECTION = void 0, t.createClient = o;
		var a = n(151),
			s = r(a),
			u = n(159),
			c = r(u),
			l = n(138),
			f = t.NETWORK_PROFILE_COLLECTION = "5fbb67a0-b4ff-4775-b836-e9a348a87481",
			d = t.ABS_V1 = "424531b4-e23d-47d2-87c7-9b90a23ddd06",
			h = t.PREROLL_ADS = "4e61c5c6-8cfb-485e-87f1-fc21c0d03068",
			p = t.MARKERS = "f725b4b2-bd4c-4cc9-a354-d0db1e762955",
			g = t.USHER_PROTOCOL = "fc2b4b0b-32dd-4e55-8e73-d87b9985a70e",
			v = t.THUMBNAIL_PREVIEWS = "36a9f289-f5da-45ad-8b1a-df06bddba96d",
			_ = t.HTML5_TOGGLE = "865ce2f3-52be-4a8c-87fe-d8ad580f4679",
			y = t.CLIPS = "b4d61bdb-c174-47e6-a2f9-a46a4088ac26",
			m = function() {
				return (0, l.krakenUserInfo)().then(function(e) {
					return e.staff ? "yes" : Promise.reject()
				})
			},
			b = function(e) {
				return (0, l.krakenUserInfo)().then(function(t) {
					return t.staff ? e : Promise.reject()
				})
			}
	}, function(e, t, n) {
		function r(e) {
			var t = i(e);
			if (null !== t) throw t;
			this._config = o(e), this._Promise = e.Promise, this._deviceID = e.deviceID, this._platform = e.platform, this._username = e.login || null, this._defaults = a(e.Promise, e.defaults, e.overrides || {}), this._assignments = s(e.Promise, this._config, this._defaults, e.overrides || {}, this._deviceID)
		}

		function i(e) {
			return e.defaults && Object.getPrototypeOf(e.defaults) === Object.prototype ? "string" != typeof e.deviceID || 0 === e.deviceID.length ? new Error("Invalid device ID; expected non-empty string, got `" + e.deviceID + "`") : "string" != typeof e.platform || 0 === e.platform.length ? new Error("Invalid platform; expected non-empty string, got `" + e.platform + "`") : "object" != typeof e.provider || "function" != typeof e.provider.getExperimentConfiguration ? new Error("Invalid provider") : "function" != typeof e.Promise ? new Error("Invalid Promise implementation") : null : new Error("Invalid defaults; expected object, got " + JSON.stringify(e.defaults))
		}

		function o(e) {
			return new e.Promise(function(t, n) {
				e.provider.getExperimentConfiguration(t, n)
			}).then(function(e) {
				var t = c.validate(e);
				if (t) throw t;
				return e
			})
		}

		function a(e, t, n) {
			var r = {};
			for (var i in t) r[i] = function(r) {
				return e.resolve(n[i]).then(function(e) {
					return "string" == typeof e ? e : t[r]
				}, function() {
					return t[r]
				})
			}(i);
			return r
		}

		function s(e, t, n, r, i) {
			var o = {};
			for (var a in n) n.hasOwnProperty(a) && (o[a] = function(o) {
				return t.then(function(e) {
					if (!e.hasOwnProperty(o)) throw new Error("Experiment `" + o + "` is deprecated");
					return c.selectTreatment(o, e[o], i)
				}, function(e) {
					return n[o]
				}).then(function(t) {
					return e.resolve(r[o]).then(function(e) {
						return "string" == typeof e ? e : t
					}, function() {
						return t
					})
				})
			}(a));
			return o
		}

		function u(e, t) {
			var n, r = {};
			for (n in e) e.hasOwnProperty(n) && (r[n] = e[n]);
			for (n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (r[n] = t[n]);
			return r
		}
		var c = n(152),
			l = n(155);
		e.exports = r, r.prototype.get = function(e, t) {
			var n = u(t || {}, {
					mustTrack: !1
				}),
				r = this._assignments[e] || this._Promise.reject(new Error("No experiment with ID `" + e + "`")),
				i = this._Promise.all([this._config, r]).then(function(t) {
					var n = t[0],
						r = t[1],
						i = {
							client_time: (new Date).getTime() / 1e3,
							device_id: this._deviceID,
							experiment_id: n[e].name,
							experiment_group: r,
							platform: this._platform
						};
					null !== this._username && (i.login = this._username);
					var o = new this._Promise(function(e, t) {
						l.sendEvent("experiment_branch", i, e)
					}).then(null, function() {
						return null
					});
					return o
				}.bind(this));
			return this._Promise.all([r, n.mustTrack ? i : null]).then(function(e) {
				return e[0]
			}, function(t) {
				return console.warn(t), this._defaults[e] || null
			}.bind(this))
		}
	}, function(e, t, n) {
		function r(e, t, n) {
			this.name = "InvalidExperimentConfigurationError", this.message = 'Invalid configuration for experiment "' + e + '": ' + n, this.stack = (new Error).stack
		}

		function i(e, t) {
			if (!t.hasOwnProperty("groups")) return new r(e, t, "missing a `groups` property");
			if (0 === t.groups.length) return new r(e, t, "`groups` has no members");
			var n, i;
			for (n = 0; n < t.groups.length; n++)
				if (t.groups[n].hasOwnProperty("value") ? t.groups[n].hasOwnProperty("weight") ? t.groups[n].weight !== Math.floor(t.groups[n].weight) ? i = "has a non-integer weight" : t.groups[n].weight < 0 && (i = "has a negative weight") : i = "is missing a `weight` property" : i = "is missing a `value` property", i) return new r(e, t, "Group " + t.groups[n].value + " " + i);
			return null
		}
		var o = n(153);
		t.validate = function(e) {
			for (var t in e)
				if (e.hasOwnProperty(t)) {
					var n = i(t, e[t]);
					if (null !== n) return n
				}
			return null
		}, t.selectTreatment = function(e, t, n) {
			var r = e + n,
				i = o(r),
				a = i.words[0] >>> 0,
				s = a / Math.pow(2, 32),
				u = t.groups.reduce(function(e, t) {
					return e + t.weight
				}, 0);
			return t.groups.reduce(function(e, t) {
				return null === e.value && (e.current -= t.weight / u, e.current <= 0 && (e.value = t.value)), e
			}, {
				value: null,
				current: s
			}).value
		}
	}, function(e, t, n) {
		! function(r, i) {
			e.exports = t = i(n(154))
		}(this, function(e) {
			return function() {
				var t = e,
					n = t.lib,
					r = n.WordArray,
					i = n.Hasher,
					o = t.algo,
					a = [],
					s = o.SHA1 = i.extend({
						_doReset: function() {
							this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
						},
						_doProcessBlock: function(e, t) {
							for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], s = n[3], u = n[4], c = 0; 80 > c; c++) {
								if (16 > c) a[c] = 0 | e[t + c];
								else {
									var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
									a[c] = l << 1 | l >>> 31;
								}
								var f = (r << 5 | r >>> 27) + u + a[c];
								f += 20 > c ? (i & o | ~i & s) + 1518500249 : 40 > c ? (i ^ o ^ s) + 1859775393 : 60 > c ? (i & o | i & s | o & s) - 1894007588 : (i ^ o ^ s) - 899497514, u = s, s = o, o = i << 30 | i >>> 2, i = r, r = f
							}
							n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + o | 0, n[3] = n[3] + s | 0, n[4] = n[4] + u | 0
						},
						_doFinalize: function() {
							var e = this._data,
								t = e.words,
								n = 8 * this._nDataBytes,
								r = 8 * e.sigBytes;
							return t[r >>> 5] |= 128 << 24 - r % 32, t[(r + 64 >>> 9 << 4) + 14] = Math.floor(n / 4294967296), t[(r + 64 >>> 9 << 4) + 15] = n, e.sigBytes = 4 * t.length, this._process(), this._hash
						},
						clone: function() {
							var e = i.clone.call(this);
							return e._hash = this._hash.clone(), e
						}
					});
				t.SHA1 = i._createHelper(s), t.HmacSHA1 = i._createHmacHelper(s)
			}(), e.SHA1
		})
	}, function(e, t, n) {
		! function(n, r) {
			e.exports = t = r()
		}(this, function() {
			var e = e || function(e, t) {
					var n = {},
						r = n.lib = {},
						i = r.Base = function() {
							function e() {}
							return {
								extend: function(t) {
									e.prototype = this;
									var n = new e;
									return t && n.mixIn(t), n.hasOwnProperty("init") || (n.init = function() {
										n.$super.init.apply(this, arguments)
									}), n.init.prototype = n, n.$super = this, n
								},
								create: function() {
									var e = this.extend();
									return e.init.apply(e, arguments), e
								},
								init: function() {},
								mixIn: function(e) {
									for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
									e.hasOwnProperty("toString") && (this.toString = e.toString)
								},
								clone: function() {
									return this.init.prototype.extend(this)
								}
							}
						}(),
						o = r.WordArray = i.extend({
							init: function(e, n) {
								e = this.words = e || [], n != t ? this.sigBytes = n : this.sigBytes = 4 * e.length
							},
							toString: function(e) {
								return (e || s).stringify(this)
							},
							concat: function(e) {
								var t = this.words,
									n = e.words,
									r = this.sigBytes,
									i = e.sigBytes;
								if (this.clamp(), r % 4)
									for (var o = 0; i > o; o++) {
										var a = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
										t[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8
									} else
									for (var o = 0; i > o; o += 4) t[r + o >>> 2] = n[o >>> 2];
								return this.sigBytes += i, this
							},
							clamp: function() {
								var t = this.words,
									n = this.sigBytes;
								t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
							},
							clone: function() {
								var e = i.clone.call(this);
								return e.words = this.words.slice(0), e
							},
							random: function(t) {
								for (var n, r = [], i = function(t) {
									var t = t,
										n = 987654321,
										r = 4294967295;
									return function() {
										n = 36969 * (65535 & n) + (n >> 16) & r, t = 18e3 * (65535 & t) + (t >> 16) & r;
										var i = (n << 16) + t & r;
										return i /= 4294967296, i += .5, i * (e.random() > .5 ? 1 : -1)
									}
								}, a = 0; t > a; a += 4) {
									var s = i(4294967296 * (n || e.random()));
									n = 987654071 * s(), r.push(4294967296 * s() | 0)
								}
								return new o.init(r, t)
							}
						}),
						a = n.enc = {},
						s = a.Hex = {
							stringify: function(e) {
								for (var t = e.words, n = e.sigBytes, r = [], i = 0; n > i; i++) {
									var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
									r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16))
								}
								return r.join("")
							},
							parse: function(e) {
								for (var t = e.length, n = [], r = 0; t > r; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
								return new o.init(n, t / 2)
							}
						},
						u = a.Latin1 = {
							stringify: function(e) {
								for (var t = e.words, n = e.sigBytes, r = [], i = 0; n > i; i++) {
									var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
									r.push(String.fromCharCode(o))
								}
								return r.join("")
							},
							parse: function(e) {
								for (var t = e.length, n = [], r = 0; t > r; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
								return new o.init(n, t)
							}
						},
						c = a.Utf8 = {
							stringify: function(e) {
								try {
									return decodeURIComponent(escape(u.stringify(e)))
								} catch (t) {
									throw new Error("Malformed UTF-8 data")
								}
							},
							parse: function(e) {
								return u.parse(unescape(encodeURIComponent(e)))
							}
						},
						l = r.BufferedBlockAlgorithm = i.extend({
							reset: function() {
								this._data = new o.init, this._nDataBytes = 0
							},
							_append: function(e) {
								"string" == typeof e && (e = c.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
							},
							_process: function(t) {
								var n = this._data,
									r = n.words,
									i = n.sigBytes,
									a = this.blockSize,
									s = 4 * a,
									u = i / s;
								u = t ? e.ceil(u) : e.max((0 | u) - this._minBufferSize, 0);
								var c = u * a,
									l = e.min(4 * c, i);
								if (c) {
									for (var f = 0; c > f; f += a) this._doProcessBlock(r, f);
									var d = r.splice(0, c);
									n.sigBytes -= l
								}
								return new o.init(d, l)
							},
							clone: function() {
								var e = i.clone.call(this);
								return e._data = this._data.clone(), e
							},
							_minBufferSize: 0
						}),
						f = (r.Hasher = l.extend({
							cfg: i.extend(),
							init: function(e) {
								this.cfg = this.cfg.extend(e), this.reset()
							},
							reset: function() {
								l.reset.call(this), this._doReset()
							},
							update: function(e) {
								return this._append(e), this._process(), this
							},
							finalize: function(e) {
								e && this._append(e);
								var t = this._doFinalize();
								return t
							},
							blockSize: 16,
							_createHelper: function(e) {
								return function(t, n) {
									return new e.init(n).finalize(t)
								}
							},
							_createHmacHelper: function(e) {
								return function(t, n) {
									return new f.HMAC.init(e, n).finalize(t)
								}
							}
						}), n.algo = {});
					return n
				}(Math);
			return e
		})
	}, function(e, t, n) {
		var r = n(156),
			i = n(157),
			o = n(158);
		t.SPADE_URL = "//spade.twitch.tv/", t.sendEvent = function(e, n, a) {
			var s = {
					event: e,
					properties: n
				},
				u = r.stringify(i.parse(JSON.stringify(s)));
			o.fetch(t.SPADE_URL + "?data=" + encodeURIComponent(u), {}, a)
		}
	}, function(e, t, n) {
		! function(r, i) {
			e.exports = t = i(n(154))
		}(this, function(e) {
			return function() {
				var t = e,
					n = t.lib,
					r = n.WordArray,
					i = t.enc;
				i.Base64 = {
					stringify: function(e) {
						var t = e.words,
							n = e.sigBytes,
							r = this._map;
						e.clamp();
						for (var i = [], o = 0; n > o; o += 3)
							for (var a = t[o >>> 2] >>> 24 - o % 4 * 8 & 255, s = t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, u = t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = a << 16 | s << 8 | u, l = 0; 4 > l && n > o + .75 * l; l++) i.push(r.charAt(c >>> 6 * (3 - l) & 63));
						var f = r.charAt(64);
						if (f)
							for (; i.length % 4;) i.push(f);
						return i.join("")
					},
					parse: function(e) {
						var t = e.length,
							n = this._map,
							i = n.charAt(64);
						if (i) {
							var o = e.indexOf(i); - 1 != o && (t = o)
						}
						for (var a = [], s = 0, u = 0; t > u; u++)
							if (u % 4) {
								var c = n.indexOf(e.charAt(u - 1)) << u % 4 * 2,
									l = n.indexOf(e.charAt(u)) >>> 6 - u % 4 * 2,
									f = c | l;
								a[s >>> 2] |= f << 24 - s % 4 * 8, s++
							}
						return r.create(a, s)
					},
					_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
				}
			}(), e.enc.Base64
		})
	}, function(e, t, n) {
		! function(r, i) {
			e.exports = t = i(n(154))
		}(this, function(e) {
			return e.enc.Utf8
		})
	}, function(e, t) {
		function n(e, t) {
			var n = document.head || document.getElementsByTagName("head")[0];
			n || t(new Error("No head element to append script"));
			var r = document.createElement("script");
			r.onload = function() {
				t(null), setTimeout(function() {
					n.removeChild(r)
				}, 0)
			}, r.onerror = function() {
				t(new Error("Unable to load script"))
			}, n.appendChild(r), r.src = e
		}

		function r(e, t) {
			var n = new XMLHttpRequest;
			n.open("GET", e, !0), n.onreadystatechange = function() {
				switch (n.readyState) {
					case i:
						return void(200 <= n.status && n.status < 300 ? t(null, n.responseText) : t(new Error("XHR error: " + n.status + " " + e), null))
				}
			}, n.send()
		}
		var i = 4;
		t.fetch = function(e, t, i) {
			t.injectScript ? n(e, i || function() {}) : r(e, i || function() {})
		}
	}, function(e, t, n) {
		function r(e) {
			this._url = e
		}
		var i = n(158);
		e.exports = r, r.SERVICE_URL = "//minixperiment.twitch.tv/experiments.json", r.prototype.getExperimentConfiguration = function(e, t) {
			i.fetch(this._url, {}, function(n, r) {
				if (null !== n) return void t(n);
				try {
					e(JSON.parse(r))
				} catch (i) {
					t(new Error("Invalid JSON response from server: " + r))
				}
			})
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e) {
			var t = d[e] || e;
			return new Promise(function(e, n) {
				u["default"].changeLanguage(t, function(t, r) {
					t ? n(t) : e(new h(r))
				})
			})
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Nulli18n = void 0;
		var a = function() {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			return function(t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t
			}
		}();
		t.getI18N = o;
		var s = n(161),
			u = r(s),
			c = n(177),
			l = r(c),
			f = n(66),
			d = {
				ar: "ar-SA",
				bg: "bg-BG",
				cs: "cs-CZ",
				da: "da-DK",
				de: "de-DE",
				el: "el-GR",
				en: "en-US",
				es: "es-ES",
				fi: "fi-FI",
				fr: "fr-FR",
				hi: "hi-IN",
				hu: "hu-HU",
				it: "it-IT",
				ja: "ja-JP",
				ko: "ko-KR",
				nl: "nl-NL",
				no: "no-NO",
				pl: "pl-PL",
				pt: "pt-PT",
				ro: "ro-RO",
				ru: "ru-RU",
				sk: "sk-SK",
				sv: "sv-SE",
				th: "th-TH",
				tr: "tr-TR",
				vi: "vi-VN",
				zh: "zh-CN"
			};
		u["default"].use(l["default"]).init({
			fallbackLng: "en-US",
			load: "currentOnly",
			backend: {
				crossDomain: !0,
				loadPath: f.playerHost + "/localization/{{lng}}/strings.json"
			},
			nsSeparator: !1,
			keySeparator: !1
		}), u["default"].addResourceBundle("en-US", u["default"].options.ns[0], n(178));
		var h = function() {
			function e(t) {
				i(this, e), this._translate = t
			}
			return a(e, [{
				key: "translate",
				value: function(e) {
					var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
						n = this._translate(e, t);
					return t.replacements && Object.keys(t.replacements).map(function(e) {
						n = n.replace(e, t.replacements[e])
					}), n
				}
			}]), e
		}();
		t.Nulli18n = function() {
			function e() {
				i(this, e)
			}
			return a(e, [{
				key: "translate",
				value: function(e) {
					arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					return e
				}
			}]), e
		}()
	}, function(e, t, n) {
		e.exports = n(162)["default"]
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var i = n(163),
			o = r(i);
		t["default"] = o["default"]
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
				var i = n[r],
					o = Object.getOwnPropertyDescriptor(t, i);
				o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
			}
			return e
		}

		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : o(e, t))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
			},
			l = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			f = n(164),
			d = i(f),
			h = n(165),
			p = i(h),
			g = n(166),
			v = i(g),
			_ = n(168),
			y = i(_),
			m = n(171),
			b = i(m),
			E = n(172),
			w = i(E),
			k = n(173),
			O = i(k),
			S = n(174),
			T = i(S),
			P = n(175),
			x = i(P),
			A = n(176),
			C = n(169),
			N = i(C),
			j = n(170),
			L = r(j),
			R = function(e) {
				function t() {
					var n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
						r = arguments[1];
					a(this, t);
					var i = s(this, e.call(this));
					return i.options = (0, A.transformOptions)(n), i.services = {}, i.logger = d["default"], i.modules = {}, r && !i.isInitialized && i.init(n, r), i
				}
				return u(t, e), t.prototype.init = function(e, t) {
					function n(e) {
						return e ? "function" == typeof e ? new e : e : void 0
					}
					var r = this;
					if ("function" == typeof e && (t = e, e = {}), e || (e = {}), "v1" === e.compatibilityAPI ? this.options = l({}, (0, A.get)(), (0, A.transformOptions)(L.convertAPIOptions(e)), {}) : "v1" === e.compatibilityJSON ? this.options = l({}, (0, A.get)(), (0, A.transformOptions)(L.convertJSONOptions(e)), {}) : this.options = l({}, (0, A.get)(), this.options, (0, A.transformOptions)(e)), t || (t = function() {}), !this.options.isClone) {
						this.modules.logger ? d["default"].init(n(this.modules.logger), this.options) : d["default"].init(null, this.options);
						var i = new b["default"](this.options);
						this.store = new v["default"](this.options.resources, this.options);
						var o = this.services;
						o.logger = d["default"], o.resourceStore = this.store, o.resourceStore.on("added removed", function(e, t) {
							o.cacheConnector.save()
						}), o.languageUtils = i, o.pluralResolver = new w["default"](i, {
							prepend: this.options.pluralSeparator,
							compatibilityJSON: this.options.compatibilityJSON
						}), o.interpolator = new O["default"](this.options), o.backendConnector = new T["default"](n(this.modules.backend), o.resourceStore, o, this.options), o.backendConnector.on("*", function(e) {
							for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; t > i; i++) n[i - 1] = arguments[i];
							r.emit.apply(r, [e].concat(n))
						}), o.backendConnector.on("loaded", function(e) {
							o.cacheConnector.save()
						}), o.cacheConnector = new x["default"](n(this.modules.cache), o.resourceStore, o, this.options), o.cacheConnector.on("*", function(e) {
							for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; t > i; i++) n[i - 1] = arguments[i];
							r.emit.apply(r, [e].concat(n))
						}), this.modules.languageDetector && (o.languageDetector = n(this.modules.languageDetector), o.languageDetector.init(o, this.options.detection, this.options)), this.translator = new y["default"](this.services, this.options), this.translator.on("*", function(e) {
							for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; t > i; i++) n[i - 1] = arguments[i];
							r.emit.apply(r, [e].concat(n))
						})
					}
					var a = ["getResource", "addResource", "addResources", "addResourceBundle", "removeResourceBundle", "hasResourceBundle", "getResourceBundle"];
					return a.forEach(function(e) {
						r[e] = function() {
							return this.store[e].apply(this.store, arguments)
						}
					}), "v1" === this.options.compatibilityAPI && L.appendBackwardsAPI(this), setTimeout(function() {
						r.changeLanguage(r.options.lng, function(e, n) {
							r.emit("initialized", r.options), r.logger.log("initialized", r.options), t(e, n)
						})
					}, 10), this
				}, t.prototype.loadResources = function(e) {
					var t = this;
					if (e || (e = function() {}), this.options.resources) e(null);
					else {
						var n = function() {
							if (t.language && "cimode" === t.language.toLowerCase()) return {
								v: e()
							};
							var n = [],
								r = function(e) {
									var r = t.services.languageUtils.toResolveHierarchy(e);
									r.forEach(function(e) {
										n.indexOf(e) < 0 && n.push(e)
									})
								};
							r(t.language), t.options.preload && t.options.preload.forEach(function(e) {
								r(e)
							}), t.services.cacheConnector.load(n, t.options.ns, function() {
								t.services.backendConnector.load(n, t.options.ns, e)
							})
						}();
						if ("object" === ("undefined" == typeof n ? "undefined" : c(n))) return n.v
					}
				}, t.prototype.use = function(e) {
					return "backend" === e.type && (this.modules.backend = e), "cache" === e.type && (this.modules.cache = e), ("logger" === e.type || e.log && e.warn && e.warn) && (this.modules.logger = e), "languageDetector" === e.type && (this.modules.languageDetector = e), "postProcessor" === e.type && N["default"].addPostProcessor(e), this
				}, t.prototype.changeLanguage = function(e, t) {
					var n = this,
						r = function(r) {
							e && (n.emit("languageChanged", e), n.logger.log("languageChanged", e)), t && t(r, function() {
								for (var e = arguments.length, t = Array(e), r = 0; e > r; r++) t[r] = arguments[r];
								return n.t.apply(n, t)
							})
						};
					!e && this.services.languageDetector && (e = this.services.languageDetector.detect()), e && (this.language = e, this.languages = this.services.languageUtils.toResolveHierarchy(e), this.translator.changeLanguage(e), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage(e)), this.loadResources(function(e) {
						r(e)
					})
				}, t.prototype.getFixedT = function(e, t) {
					var n = this,
						r = function i(e, t) {
							return t = t || {}, t.lng = t.lng || i.lng, t.ns = t.ns || i.ns, n.t(e, t)
						};
					return r.lng = e, r.ns = t, r
				}, t.prototype.t = function() {
					return this.translator && this.translator.translate.apply(this.translator, arguments)
				}, t.prototype.exists = function() {
					return this.translator && this.translator.exists.apply(this.translator, arguments)
				}, t.prototype.setDefaultNamespace = function(e) {
					this.options.defaultNS = e
				}, t.prototype.loadNamespaces = function(e, t) {
					var n = this;
					return this.options.ns ? ("string" == typeof e && (e = [e]), e.forEach(function(e) {
						n.options.ns.indexOf(e) < 0 && n.options.ns.push(e)
					}), void this.loadResources(t)) : t && t()
				}, t.prototype.loadLanguages = function(e, t) {
					"string" == typeof e && (e = [e]);
					var n = this.options.preload || [],
						r = e.filter(function(e) {
							return n.indexOf(e) < 0
						});
					return r.length ? (this.options.preload = n.concat(r), void this.loadResources(t)) : t()
				}, t.prototype.dir = function(e) {
					e || (e = this.language);
					var t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"];
					return t.indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) ? "ltr" : "rtl"
				}, t.prototype.createInstance = function() {
					var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
						n = arguments[1];
					return new t(e, n)
				}, t.prototype.cloneInstance = function() {
					var e = this,
						n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
						r = arguments[1],
						i = new t(l({}, n, this.options, {
							isClone: !0
						}), r),
						o = ["store", "translator", "services", "language"];
					return o.forEach(function(t) {
						i[t] = e[t]
					}), i
				}, t
			}(p["default"]);
		t["default"] = new R
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			i = {
				type: "logger",
				log: function(e) {
					this._output("log", e)
				},
				warn: function(e) {
					this._output("warn", e)
				},
				error: function(e) {
					this._output("error", e)
				},
				_output: function(e, t) {
					console && console[e] && console[e].apply(console, Array.prototype.slice.call(t))
				}
			},
			o = function() {
				function e(t) {
					var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					n(this, e), this.subs = [], this.init(t, r)
				}
				return e.prototype.init = function(e) {
					var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					this.prefix = t.prefix || "i18next:", this.logger = e || i, this.options = t, this.debug = t.debug === !1 ? !1 : !0
				}, e.prototype.setDebug = function(e) {
					this.debug = e, this.subs.forEach(function(t) {
						t.setDebug(e)
					})
				}, e.prototype.log = function() {
					this.forward(arguments, "log", "", !0)
				}, e.prototype.warn = function() {
					this.forward(arguments, "warn", "", !0)
				}, e.prototype.error = function() {
					this.forward(arguments, "error", "")
				}, e.prototype.deprecate = function() {
					this.forward(arguments, "warn", "WARNING DEPRECATED: ", !0)
				}, e.prototype.forward = function(e, t, n, r) {
					(!r || this.debug) && ("string" == typeof e[0] && (e[0] = n + this.prefix + " " + e[0]), this.logger[t](e))
				}, e.prototype.create = function(t) {
					var n = new e(this.logger, r({
						prefix: this.prefix + ":" + t + ":"
					}, this.options));
					return this.subs.push(n), n
				}, e
			}();
		t["default"] = new o
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = function() {
			function e() {
				n(this, e), this.observers = {}
			}
			return e.prototype.on = function(e, t) {
				var n = this;
				e.split(" ").forEach(function(e) {
					n.observers[e] = n.observers[e] || [], n.observers[e].push(t)
				})
			}, e.prototype.off = function(e, t) {
				var n = this;
				this.observers[e] && this.observers[e].forEach(function() {
					if (t) {
						var r = n.observers[e].indexOf(t);
						r > -1 && n.observers[e].splice(r, 1)
					} else delete n.observers[e]
				})
			}, e.prototype.emit = function(e) {
				for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; t > r; r++) n[r - 1] = arguments[r];
				this.observers[e] && this.observers[e].forEach(function(e) {
					e.apply(void 0, n)
				}), this.observers["*"] && this.observers["*"].forEach(function(t) {
					var r;
					t.apply(t, (r = [e]).concat.apply(r, n))
				})
			}, e
		}();
		t["default"] = r
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
				var i = n[r],
					o = Object.getOwnPropertyDescriptor(t, i);
				o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
			}
			return e
		}

		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : o(e, t))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var c = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			l = n(165),
			f = i(l),
			d = n(167),
			h = r(d),
			p = function(e) {
				function t() {
					var n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
						r = arguments.length <= 1 || void 0 === arguments[1] ? {
							ns: ["translation"],
							defaultNS: "translation"
						} : arguments[1];
					a(this, t);
					var i = s(this, e.call(this));
					return i.data = n, i.options = r, i
				}
				return u(t, e), t.prototype.addNamespaces = function(e) {
					this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
				}, t.prototype.removeNamespaces = function(e) {
					var t = this.options.ns.indexOf(e);
					t > -1 && this.options.ns.splice(t, 1)
				}, t.prototype.getResource = function(e, t, n) {
					var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
						i = r.keySeparator || this.options.keySeparator;
					void 0 === i && (i = ".");
					var o = [e, t];
					return n && "string" != typeof n && (o = o.concat(n)), n && "string" == typeof n && (o = o.concat(i ? n.split(i) : n)), e.indexOf(".") > -1 && (o = e.split(".")), h.getPath(this.data, o)
				}, t.prototype.addResource = function(e, t, n, r) {
					var i = arguments.length <= 4 || void 0 === arguments[4] ? {
							silent: !1
						} : arguments[4],
						o = this.options.keySeparator;
					void 0 === o && (o = ".");
					var a = [e, t];
					n && (a = a.concat(o ? n.split(o) : n)), e.indexOf(".") > -1 && (a = e.split("."), r = t, t = a[1]), this.addNamespaces(t), h.setPath(this.data, a, r), i.silent || this.emit("added", e, t, n, r)
				}, t.prototype.addResources = function(e, t, n) {
					for (var r in n) "string" == typeof n[r] && this.addResource(e, t, r, n[r], {
						silent: !0
					});
					this.emit("added", e, t, n)
				}, t.prototype.addResourceBundle = function(e, t, n, r, i) {
					var o = [e, t];
					e.indexOf(".") > -1 && (o = e.split("."), r = n, n = t, t = o[1]), this.addNamespaces(t);
					var a = h.getPath(this.data, o) || {};
					r ? h.deepExtend(a, n, i) : a = c({}, a, n), h.setPath(this.data, o, a), this.emit("added", e, t, n)
				}, t.prototype.removeResourceBundle = function(e, t) {
					this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t)
				}, t.prototype.hasResourceBundle = function(e, t) {
					return void 0 !== this.getResource(e, t)
				}, t.prototype.getResourceBundle = function(e, t) {
					return t || (t = this.options.defaultNS), "v1" === this.options.compatibilityAPI ? c({}, this.getResource(e, t)) : this.getResource(e, t)
				}, t.prototype.toJSON = function() {
					return this.data
				}, t
			}(f["default"]);
		t["default"] = p
	}, function(e, t) {
		"use strict";

		function n(e) {
			return null == e ? "" : "" + e
		}

		function r(e, t, n) {
			e.forEach(function(e) {
				t[e] && (n[e] = t[e])
			})
		}

		function i(e, t, n) {
			function r(e) {
				return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e
			}
			for (var i = "string" != typeof t ? [].concat(t) : t.split("."); i.length > 1;) {
				if (!e) return {};
				var o = r(i.shift());
				!e[o] && n && (e[o] = new n), e = e[o]
			}
			return e ? {
				obj: e,
				k: r(i.shift())
			} : {}
		}

		function o(e, t, n) {
			var r = i(e, t, Object),
				o = r.obj,
				a = r.k;
			o[a] = n
		}

		function a(e, t, n, r) {
			var o = i(e, t, Object),
				a = o.obj,
				s = o.k;
			a[s] = a[s] || [], r && (a[s] = a[s].concat(n)), r || a[s].push(n)
		}

		function s(e, t) {
			var n = i(e, t),
				r = n.obj,
				o = n.k;
			return r ? r[o] : void 0
		}

		function u(e, t, n) {
			for (var r in t) r in e ? "string" == typeof e[r] || e[r] instanceof String || "string" == typeof t[r] || t[r] instanceof String ? n && (e[r] = t[r]) : u(e[r], t[r], n) : e[r] = t[r];
			return e
		}

		function c(e) {
			return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
		}

		function l(e) {
			return "string" == typeof e ? e.replace(/[&<>"'\/]/g, function(e) {
				return f[e]
			}) : e
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.makeString = n, t.copy = r, t.setPath = o, t.pushPath = a, t.getPath = s, t.deepExtend = u, t.regexEscape = c, t.escape = l;
		var f = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"/": "&#x2F;"
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
				var i = n[r],
					o = Object.getOwnPropertyDescriptor(t, i);
				o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
			}
			return e
		}

		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : o(e, t))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var c = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
			},
			f = n(164),
			d = i(f),
			h = n(165),
			p = i(h),
			g = n(169),
			v = i(g),
			_ = n(170),
			y = r(_),
			m = n(167),
			b = r(m),
			E = function(e) {
				function t(n) {
					var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					a(this, t);
					var i = s(this, e.call(this));
					return b.copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector"], n, i), i.options = r, i.logger = d["default"].create("translator"), i
				}
				return u(t, e), t.prototype.changeLanguage = function(e) {
					e && (this.language = e)
				}, t.prototype.exists = function(e) {
					var t = arguments.length <= 1 || void 0 === arguments[1] ? {
						interpolation: {}
					} : arguments[1];
					return "v1" === this.options.compatibilityAPI && (t = y.convertTOptions(t)), void 0 !== this.resolve(e, t)
				}, t.prototype.extractFromKey = function(e, t) {
					var n = t.nsSeparator || this.options.nsSeparator;
					void 0 === n && (n = ":");
					var r = t.ns || this.options.defaultNS;
					if (n && e.indexOf(n) > -1) {
						var i = e.split(n);
						r = i[0], e = i[1]
					}
					return "string" == typeof r && (r = [r]), {
						key: e,
						namespaces: r
					}
				}, t.prototype.translate = function(e) {
					var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					if ("object" !== ("undefined" == typeof t ? "undefined" : l(t)) ? t = this.options.overloadTranslationOptionHandler(arguments) : "v1" === this.options.compatibilityAPI && (t = y.convertTOptions(t)), void 0 === e || null === e || "" === e) return "";
					"number" == typeof e && (e = String(e)), "string" == typeof e && (e = [e]);
					var n = t.lng || this.language;
					if (n && "cimode" === n.toLowerCase()) return e[e.length - 1];
					var r = t.keySeparator || this.options.keySeparator || ".",
						i = this.extractFromKey(e[e.length - 1], t),
						o = i.key,
						a = i.namespaces,
						s = a[a.length - 1],
						u = this.resolve(e, t),
						f = Object.prototype.toString.apply(u),
						d = ["[object Number]", "[object Function]", "[object RegExp]"],
						h = void 0 !== t.joinArrays ? t.joinArrays : this.options.joinArrays;
					if (u && "string" != typeof u && d.indexOf(f) < 0 && (!h || "[object Array]" !== f)) {
						if (!t.returnObjects && !this.options.returnObjects) return this.logger.warn("accessing an object - but returnObjects options is not enabled!"), this.options.returnedObjectHandler ? this.options.returnedObjectHandler(o, u, t) : "key '" + o + " (" + this.language + ")' returned an object instead of string.";
						var p = "[object Array]" === f ? [] : {};
						for (var g in u) p[g] = this.translate("" + o + r + g, c({
							joinArrays: !1,
							ns: a
						}, t));
						u = p
					} else if (h && "[object Array]" === f) u = u.join(h), u && (u = this.extendTranslation(u, o, t));
					else {
						var v = !1,
							_ = !1;
						if (!this.isValidLookup(u) && t.defaultValue && (v = !0, u = t.defaultValue), this.isValidLookup(u) || (_ = !0, u = o), (_ || v) && (this.logger.log("missingKey", n, s, o, u), this.options.saveMissing)) {
							var m = [];
							if ("fallback" === this.options.saveMissingTo && this.options.fallbackLng && this.options.fallbackLng[0])
								for (var b = 0; b < this.options.fallbackLng.length; b++) m.push(this.options.fallbackLng[b]);
							else "all" === this.options.saveMissingTo ? m = this.languageUtils.toResolveHierarchy(t.lng || this.language) : m.push(t.lng || this.language);
							this.options.missingKeyHandler ? this.options.missingKeyHandler(m, s, o, u) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(m, s, o, u), this.emit("missingKey", m, s, o, u)
						}
						u = this.extendTranslation(u, o, t), _ && u === o && this.options.appendNamespaceToMissingKey && (u = s + ":" + o), _ && this.options.parseMissingKeyHandler && (u = this.options.parseMissingKeyHandler(u))
					}
					return u
				}, t.prototype.extendTranslation = function(e, t, n) {
					var r = this;
					n.interpolation && this.interpolator.init(n);
					var i = n.replace && "string" != typeof n.replace ? n.replace : n;
					this.options.interpolation.defaultVariables && (i = c({}, this.options.interpolation.defaultVariables, i)), e = this.interpolator.interpolate(e, i), e = this.interpolator.nest(e, function() {
						for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
						return r.translate.apply(r, t)
					}, n), n.interpolation && this.interpolator.reset();
					var o = n.postProcess || this.options.postProcess,
						a = "string" == typeof o ? [o] : o;
					return void 0 !== e && a && a.length && n.applyPostProcessor !== !1 && (e = v["default"].handle(a, e, t, n, this)), e
				}, t.prototype.resolve = function(e) {
					var t = this,
						n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
						r = void 0;
					return "string" == typeof e && (e = [e]), e.forEach(function(e) {
						if (!t.isValidLookup(r)) {
							var i = t.extractFromKey(e, n),
								o = i.key,
								a = i.namespaces;
							t.options.fallbackNS && (a = a.concat(t.options.fallbackNS));
							var s = void 0 !== n.count && "string" != typeof n.count,
								u = void 0 !== n.context && "string" == typeof n.context && "" !== n.context,
								c = n.lngs ? n.lngs : t.languageUtils.toResolveHierarchy(n.lng || t.language);
							a.forEach(function(e) {
								t.isValidLookup(r) || c.forEach(function(i) {
									if (!t.isValidLookup(r)) {
										var a = o,
											c = [a],
											l = void 0;
										s && (l = t.pluralResolver.getSuffix(i, n.count)), s && u && c.push(a + l), u && c.push(a += "" + t.options.contextSeparator + n.context), s && c.push(a += l);
										for (var f = void 0; f = c.pop();) t.isValidLookup(r) || (r = t.getResource(i, e, f, n))
									}
								})
							})
						}
					}), r
				}, t.prototype.isValidLookup = function(e) {
					return !(void 0 === e || !this.options.returnNull && null === e || !this.options.returnEmptyString && "" === e)
				}, t.prototype.getResource = function(e, t, n) {
					var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
					return this.resourceStore.getResource(e, t, n, r)
				}, t
			}(p["default"]);
		t["default"] = E
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t["default"] = {
			processors: {},
			addPostProcessor: function(e) {
				this.processors[e.name] = e
			},
			handle: function(e, t, n, r, i) {
				var o = this;
				return e.forEach(function(e) {
					o.processors[e] && (t = o.processors[e].process(t, n, r, i))
				}), t
			}
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			return e.interpolation = {
				unescapeSuffix: "HTML"
			}, e.interpolation.prefix = e.interpolationPrefix || "__", e.interpolation.suffix = e.interpolationSuffix || "__", e.interpolation.escapeValue = e.escapeInterpolation || !1, e.interpolation.nestingPrefix = e.reusePrefix || "$t(", e.interpolation.nestingSuffix = e.reuseSuffix || ")", e
		}

		function o(e) {
			return e.resStore && (e.resources = e.resStore), e.ns && e.ns.defaultNs ? (e.defaultNS = e.ns.defaultNs, e.ns = e.ns.namespaces) : e.defaultNS = e.ns || "translation", e.fallbackToDefaultNS && e.defaultNS && (e.fallbackNS = e.defaultNS), e.saveMissing = e.sendMissing, e.saveMissingTo = e.sendMissingTo || "current", e.returnNull = e.fallbackOnNull ? !1 : !0, e.returnEmptyString = e.fallbackOnEmpty ? !1 : !0, e.returnObjects = e.returnObjectTrees, e.joinArrays = "\n", e.returnedObjectHandler = e.objectTreeKeyHandler, e.parseMissingKeyHandler = e.parseMissingKey, e.appendNamespaceToMissingKey = !0, e.nsSeparator = e.nsseparator, e.keySeparator = e.keyseparator, "sprintf" === e.shortcutFunction && (e.overloadTranslationOptionHandler = function(e) {
				for (var t = [], n = 1; n < e.length; n++) t.push(e[n]);
				return {
					postProcess: "sprintf",
					sprintf: t
				}
			}), e.whitelist = e.lngWhitelist, e.preload = e.preload, "current" === e.load && (e.load = "currentOnly"), "unspecific" === e.load && (e.load = "languageOnly"), e.backend = e.backend || {}, e.backend.loadPath = e.resGetPath || "locales/__lng__/__ns__.json", e.backend.addPath = e.resPostPath || "locales/add/__lng__/__ns__", e.backend.allowMultiLoading = e.dynamicLoad, e.cache = e.cache || {}, e.cache.prefix = "res_", e.cache.expirationTime = 6048e5, e.cache.enabled = e.useLocalStorage ? !0 : !1, e = i(e), e.defaultVariables && (e.interpolation.defaultVariables = e.defaultVariables), e
		}

		function a(e) {
			return e = i(e), e.joinArrays = "\n", e
		}

		function s(e) {
			return (e.interpolationPrefix || e.interpolationSuffix || e.escapeInterpolation) && (e = i(e)), e.nsSeparator = e.nsseparator, e.keySeparator = e.keyseparator, e.returnObjects = e.returnObjectTrees, e
		}

		function u(e) {
			e.lng = function() {
				return l["default"].deprecate("i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup."), e.services.languageUtils.toResolveHierarchy(e.language)[0]
			}, e.preload = function(t, n) {
				l["default"].deprecate("i18next.preload() can be replaced with i18next.loadLanguages()"), e.loadLanguages(t, n)
			}, e.setLng = function(t, n, r) {
				return l["default"].deprecate("i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace."), "function" == typeof n && (r = n, n = {}), n || (n = {}), n.fixLng === !0 && r ? r(null, e.getFixedT(t)) : void e.changeLanguage(t, r)
			}, e.addPostProcessor = function(t, n) {
				l["default"].deprecate("i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })"),
					e.use({
						type: "postProcessor",
						name: t,
						process: n
					})
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.convertAPIOptions = o, t.convertJSONOptions = a, t.convertTOptions = s, t.appendBackwardsAPI = u;
		var c = n(164),
			l = r(c)
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e) {
			return e.charAt(0).toUpperCase() + e.slice(1)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var a = n(164),
			s = r(a),
			u = function() {
				function e(t) {
					i(this, e), this.options = t, this.whitelist = this.options.whitelist || !1, this.logger = s["default"].create("languageUtils")
				}
				return e.prototype.getLanguagePartFromCode = function(e) {
					if (e.indexOf("-") < 0) return e;
					var t = ["NB-NO", "NN-NO", "nb-NO", "nn-NO", "nb-no", "nn-no"],
						n = e.split("-");
					return this.formatLanguageCode(t.indexOf(e) > -1 ? n[1].toLowerCase() : n[0])
				}, e.prototype.formatLanguageCode = function(e) {
					if ("string" == typeof e && e.indexOf("-") > -1) {
						var t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
							n = e.split("-");
						return this.options.lowerCaseLng ? n = n.map(function(e) {
							return e.toLowerCase()
						}) : 2 === n.length ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = o(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(), 2 === n[1].length && (n[1] = n[1].toUpperCase()), "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = o(n[1].toLowerCase())), t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = o(n[2].toLowerCase()))), n.join("-")
					}
					return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
				}, e.prototype.isWhitelisted = function(e) {
					return "languageOnly" === this.options.load && (e = this.getLanguagePartFromCode(e)), !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(e) > -1 ? !0 : !1
				}, e.prototype.toResolveHierarchy = function(e, t) {
					var n = this;
					t = t || this.options.fallbackLng || [], "string" == typeof t && (t = [t]);
					var r = [],
						i = function(e) {
							n.isWhitelisted(e) ? r.push(e) : n.logger.warn("rejecting non-whitelisted language code: " + e)
						};
					return "string" == typeof e && e.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && i(this.formatLanguageCode(e)), "currentOnly" !== this.options.load && i(this.getLanguagePartFromCode(e))) : "string" == typeof e && i(this.formatLanguageCode(e)), t.forEach(function(e) {
						r.indexOf(e) < 0 && i(n.formatLanguageCode(e))
					}), r
				}, e
			}();
		t["default"] = u
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o() {
			var e = {};
			return u.forEach(function(t) {
				t.lngs.forEach(function(n) {
					return e[n] = {
						numbers: t.nr,
						plurals: c[t.fc]
					}
				})
			}), e
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var a = n(164),
			s = r(a),
			u = [{
				lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "tg", "ti", "tr", "uz", "wa"],
				nr: [1, 2],
				fc: 1
			}, {
				lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "es_ar", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "he", "hi", "hu", "hy", "ia", "it", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt", "pt_br", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
				nr: [1, 2],
				fc: 2
			}, {
				lngs: ["ay", "bo", "cgg", "fa", "id", "ja", "jbo", "ka", "kk", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
				nr: [1],
				fc: 3
			}, {
				lngs: ["be", "bs", "dz", "hr", "ru", "sr", "uk"],
				nr: [1, 2, 5],
				fc: 4
			}, {
				lngs: ["ar"],
				nr: [0, 1, 2, 3, 11, 100],
				fc: 5
			}, {
				lngs: ["cs", "sk"],
				nr: [1, 2, 5],
				fc: 6
			}, {
				lngs: ["csb", "pl"],
				nr: [1, 2, 5],
				fc: 7
			}, {
				lngs: ["cy"],
				nr: [1, 2, 3, 8],
				fc: 8
			}, {
				lngs: ["fr"],
				nr: [1, 2],
				fc: 9
			}, {
				lngs: ["ga"],
				nr: [1, 2, 3, 7, 11],
				fc: 10
			}, {
				lngs: ["gd"],
				nr: [1, 2, 3, 20],
				fc: 11
			}, {
				lngs: ["is"],
				nr: [1, 2],
				fc: 12
			}, {
				lngs: ["jv"],
				nr: [0, 1],
				fc: 13
			}, {
				lngs: ["kw"],
				nr: [1, 2, 3, 4],
				fc: 14
			}, {
				lngs: ["lt"],
				nr: [1, 2, 10],
				fc: 15
			}, {
				lngs: ["lv"],
				nr: [1, 2, 0],
				fc: 16
			}, {
				lngs: ["mk"],
				nr: [1, 2],
				fc: 17
			}, {
				lngs: ["mnk"],
				nr: [0, 1, 2],
				fc: 18
			}, {
				lngs: ["mt"],
				nr: [1, 2, 11, 20],
				fc: 19
			}, {
				lngs: ["or"],
				nr: [2, 1],
				fc: 2
			}, {
				lngs: ["ro"],
				nr: [1, 2, 20],
				fc: 20
			}, {
				lngs: ["sl"],
				nr: [5, 1, 2, 3],
				fc: 21
			}],
			c = {
				1: function(e) {
					return Number(e > 1)
				},
				2: function(e) {
					return Number(1 != e)
				},
				3: function(e) {
					return 0
				},
				4: function(e) {
					return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
				},
				5: function(e) {
					return Number(0 === e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && 10 >= e % 100 ? 3 : e % 100 >= 11 ? 4 : 5)
				},
				6: function(e) {
					return Number(1 == e ? 0 : e >= 2 && 4 >= e ? 1 : 2)
				},
				7: function(e) {
					return Number(1 == e ? 0 : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
				},
				8: function(e) {
					return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
				},
				9: function(e) {
					return Number(e >= 2)
				},
				10: function(e) {
					return Number(1 == e ? 0 : 2 == e ? 1 : 7 > e ? 2 : 11 > e ? 3 : 4)
				},
				11: function(e) {
					return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && 20 > e ? 2 : 3)
				},
				12: function(e) {
					return Number(e % 10 != 1 || e % 100 == 11)
				},
				13: function(e) {
					return Number(0 !== e)
				},
				14: function(e) {
					return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
				},
				15: function(e) {
					return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (10 > e % 100 || e % 100 >= 20) ? 1 : 2)
				},
				16: function(e) {
					return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
				},
				17: function(e) {
					return Number(1 == e || e % 10 == 1 ? 0 : 1)
				},
				18: function(e) {
					return Number(0 == e ? 0 : 1 == e ? 1 : 2)
				},
				19: function(e) {
					return Number(1 == e ? 0 : 0 === e || e % 100 > 1 && 11 > e % 100 ? 1 : e % 100 > 10 && 20 > e % 100 ? 2 : 3)
				},
				20: function(e) {
					return Number(1 == e ? 0 : 0 === e || e % 100 > 0 && 20 > e % 100 ? 1 : 2)
				},
				21: function(e) {
					return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
				}
			},
			l = function() {
				function e(t) {
					var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
					i(this, e), this.languageUtils = t, this.options = n, this.logger = s["default"].create("pluralResolver"), this.rules = o()
				}
				return e.prototype.addRule = function(e, t) {
					this.rules[e] = t
				}, e.prototype.getRule = function(e) {
					return this.rules[this.languageUtils.getLanguagePartFromCode(e)]
				}, e.prototype.needsPlural = function(e) {
					var t = this.getRule(e);
					return t && t.numbers.length <= 1 ? !1 : !0
				}, e.prototype.getSuffix = function(e, t) {
					var n = this.getRule(e);
					if (n) {
						if (1 === n.numbers.length) return "";
						var r = n.noAbs ? n.plurals(t) : n.plurals(Math.abs(t)),
							i = n.numbers[r];
						if (2 === n.numbers.length && 1 === n.numbers[0] && (2 === i ? i = "plural" : 1 === i && (i = "")), "v1" === this.options.compatibilityJSON) {
							if (1 === i) return "";
							if ("number" == typeof i) return "_plural_" + i.toString()
						}
						return this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString()
					}
					return this.logger.warn("no plural rule found for: " + e), ""
				}, e
			}();
		t["default"] = l
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var a = n(167),
			s = i(a),
			u = n(164),
			c = r(u),
			l = function() {
				function e() {
					var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
					o(this, e), this.logger = c["default"].create("interpolator"), this.init(t, !0)
				}
				return e.prototype.init = function() {
					var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
						t = arguments[1];
					t && (this.options = e), e.interpolation || (e.interpolation = {
						escapeValue: !0
					});
					var n = e.interpolation;
					this.escapeValue = n.escapeValue, this.prefix = n.prefix ? s.regexEscape(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? s.regexEscape(n.suffix) : n.suffixEscaped || "}}", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? s.regexEscape(n.nestingPrefix) : n.nestingPrefixEscaped || s.regexEscape("$t("), this.nestingSuffix = n.nestingSuffix ? s.regexEscape(n.nestingSuffix) : n.nestingSuffixEscaped || s.regexEscape(")");
					var r = this.prefix + "(.+?)" + this.suffix;
					this.regexp = new RegExp(r, "g");
					var i = this.prefix + this.unescapePrefix + "(.+?)" + this.unescapeSuffix + this.suffix;
					this.regexpUnescape = new RegExp(i, "g");
					var o = this.nestingPrefix + "(.+?)" + this.nestingSuffix;
					this.nestingRegexp = new RegExp(o, "g")
				}, e.prototype.reset = function() {
					this.options && this.init(this.options)
				}, e.prototype.interpolate = function(e, t) {
					function n(e) {
						return e.replace(/\$/g, "$$$$")
					}
					for (var r = void 0, i = void 0; r = this.regexpUnescape.exec(e);) {
						var o = s.getPath(t, r[1].trim());
						e = e.replace(r[0], o)
					}
					for (; r = this.regexp.exec(e);) i = s.getPath(t, r[1].trim()), "string" != typeof i && (i = s.makeString(i)), i || (this.logger.warn("missed to pass in variable " + r[1] + " for interpolating " + e), i = ""), i = n(this.escapeValue ? s.escape(i) : i), e = e.replace(r[0], i), this.regexp.lastIndex = 0;
					return e
				}, e.prototype.nest = function(e, t) {
					function n(e) {
						return e.replace(/\$/g, "$$$$")
					}

					function r(e) {
						if (e.indexOf(",") < 0) return e;
						var t = e.split(",");
						e = t.shift();
						var n = t.join(",");
						n = this.interpolate(n, u);
						try {
							u = JSON.parse(n)
						} catch (r) {
							this.logger.error("failed parsing options string in nesting for key " + e, r)
						}
						return e
					}
					var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
						o = void 0,
						a = void 0,
						u = JSON.parse(JSON.stringify(i));
					for (u.applyPostProcessor = !1; o = this.nestingRegexp.exec(e);) a = t(r.call(this, o[1].trim()), u), "string" != typeof a && (a = s.makeString(a)), a || (this.logger.warn("missed to pass in variable " + o[1] + " for interpolating " + e), a = ""), a = n(this.escapeValue ? s.escape(a) : a), e = e.replace(o[0], a), this.regexp.lastIndex = 0;
					return e
				}, e
			}();
		t["default"] = l
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function o(e, t) {
			for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
				var i = n[r],
					o = Object.getOwnPropertyDescriptor(t, i);
				o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
			}
			return e
		}

		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : o(e, t))
		}

		function c(e, t) {
			for (var n = e.indexOf(t); - 1 !== n;) e.splice(n, 1), n = e.indexOf(t)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var l = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			f = function() {
				function e(e, t) {
					var n = [],
						r = !0,
						i = !1,
						o = void 0;
					try {
						for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
					} catch (u) {
						i = !0, o = u
					} finally {
						try {
							!r && s["return"] && s["return"]()
						} finally {
							if (i) throw o
						}
					}
					return n
				}
				return function(t, n) {
					if (Array.isArray(t)) return t;
					if (Symbol.iterator in Object(t)) return e(t, n);
					throw new TypeError("Invalid attempt to destructure non-iterable instance")
				}
			}(),
			d = n(167),
			h = i(d),
			p = n(164),
			g = r(p),
			v = n(165),
			_ = r(v),
			y = function(e) {
				function t(n, r, i) {
					var o = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
					a(this, t);
					var u = s(this, e.call(this));
					return u.backend = n, u.store = r, u.services = i, u.options = o, u.logger = g["default"].create("backendConnector"), u.state = {}, u.queue = [], u.backend && u.backend.init && u.backend.init(i, o.backend, o), u
				}
				return u(t, e), t.prototype.queueLoad = function(e, t, n) {
					var r = this,
						i = [],
						o = [],
						a = [],
						s = [];
					return e.forEach(function(e) {
						var n = !0;
						t.forEach(function(t) {
							var a = e + "|" + t;
							r.store.hasResourceBundle(e, t) ? r.state[a] = 2 : r.state[a] < 0 || (1 === r.state[a] ? o.indexOf(a) < 0 && o.push(a) : (r.state[a] = 1, n = !1, o.indexOf(a) < 0 && o.push(a), i.indexOf(a) < 0 && i.push(a), s.indexOf(t) < 0 && s.push(t)))
						}), n || a.push(e)
					}), (i.length || o.length) && this.queue.push({
						pending: o,
						loaded: {},
						errors: [],
						callback: n
					}), {
						toLoad: i,
						pending: o,
						toLoadLanguages: a,
						toLoadNamespaces: s
					}
				}, t.prototype.loaded = function(e, t, n) {
					var r = this,
						i = e.split("|"),
						o = f(i, 2),
						a = o[0],
						s = o[1];
					t && this.emit("failedLoading", a, s, t), n && this.store.addResourceBundle(a, s, n), this.state[e] = t ? -1 : 2, this.queue.forEach(function(n) {
						h.pushPath(n.loaded, [a], s), c(n.pending, e), t && n.errors.push(t), 0 !== n.pending.length || n.done || (n.errors.length ? n.callback(n.errors) : n.callback(), r.emit("loaded", n.loaded), n.done = !0)
					}), this.queue = this.queue.filter(function(e) {
						return !e.done
					})
				}, t.prototype.read = function(e, t, n, r, i, o) {
					var a = this;
					return r || (r = 0), i || (i = 250), e.length ? void this.backend[n](e, t, function(s, u) {
						return s && u && 5 > r ? void setTimeout(function() {
							a.read.call(a, e, t, n, ++r, 2 * i, o)
						}, i) : void o(s, u)
					}) : o(null, {})
				}, t.prototype.load = function(e, t, n) {
					var r = this;
					if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), n && n();
					var i = l({}, this.backend.options, this.options.backend);
					"string" == typeof e && (e = this.services.languageUtils.toResolveHierarchy(e)), "string" == typeof t && (t = [t]);
					var o = this.queueLoad(e, t, n);
					return o.toLoad.length ? void(i.allowMultiLoading && this.backend.readMulti ? this.read(o.toLoadLanguages, o.toLoadNamespaces, "readMulti", null, null, function(e, t) {
						e && r.logger.warn("loading namespaces " + o.toLoadNamespaces.join(", ") + " for languages " + o.toLoadLanguages.join(", ") + " via multiloading failed", e), !e && t && r.logger.log("loaded namespaces " + o.toLoadNamespaces.join(", ") + " for languages " + o.toLoadLanguages.join(", ") + " via multiloading", t), o.toLoad.forEach(function(n) {
							var i = n.split("|"),
								o = f(i, 2),
								a = o[0],
								s = o[1],
								u = h.getPath(t, [a, s]);
							if (u) r.loaded(n, e, u);
							else {
								var c = "loading namespace " + s + " for language " + a + " via multiloading failed";
								r.loaded(n, c), r.logger.error(c)
							}
						})
					}) : ! function() {
						var e = function(e) {
							var t = this,
								n = e.split("|"),
								r = f(n, 2),
								i = r[0],
								o = r[1];
							this.read(i, o, "read", null, null, function(n, r) {
								n && t.logger.warn("loading namespace " + o + " for language " + i + " failed", n), !n && r && t.logger.log("loaded namespace " + o + " for language " + i, r), t.loaded(e, n, r)
							})
						};
						o.toLoad.forEach(function(t) {
							e.call(r, t)
						})
					}()) : void(o.pending.length || n())
				}, t.prototype.saveMissing = function(e, t, n, r) {
					this.backend && this.backend.create && this.backend.create(e, t, n, r), this.store.addResource(e[0], t, n, r)
				}, t
			}(_["default"]);
		t["default"] = y
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function o(e, t) {
			for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
				var i = n[r],
					o = Object.getOwnPropertyDescriptor(t, i);
				o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
			}
			return e
		}

		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function u(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : o(e, t))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var c = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
					}
					return e
				},
			l = n(167),
			f = (i(l), n(164)),
			d = r(f),
			h = n(165),
			p = r(h),
			g = function(e) {
				function t(n, r, i) {
					var o = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
					a(this, t);
					var u = s(this, e.call(this));
					return u.cache = n, u.store = r, u.services = i, u.options = o, u.logger = d["default"].create("cacheConnector"), u.cache && u.cache.init && u.cache.init(i, o.cache, o), u
				}
				return u(t, e), t.prototype.load = function(e, t, n) {
					var r = this;
					if (!this.cache) return n && n();
					var i = c({}, this.cache.options, this.options.cache);
					"string" == typeof e && (e = this.services.languageUtils.toResolveHierarchy(e)), "string" == typeof t && (t = [t]), i.enabled ? this.cache.load(e, function(t, i) {
						if (t && r.logger.error("loading languages " + e.join(", ") + " from cache failed", t), i)
							for (var o in i)
								for (var a in i[o])
									if ("i18nStamp" !== a) {
										var s = i[o][a];
										s && r.store.addResourceBundle(o, a, s)
									}
						n && n()
					}) : n && n()
				}, t.prototype.save = function() {
					this.cache && this.options.cache && this.options.cache.enabled && this.cache.save(this.store.data)
				}, t
			}(p["default"]);
		t["default"] = g
	}, function(e, t) {
		"use strict";

		function n() {
			return {
				debug: !1,
				ns: ["translation"],
				defaultNS: ["translation"],
				fallbackLng: ["dev"],
				fallbackNS: !1,
				whitelist: !1,
				load: "all",
				preload: !1,
				keySeparator: ".",
				nsSeparator: ":",
				pluralSeparator: "_",
				contextSeparator: "_",
				saveMissing: !1,
				saveMissingTo: "fallback",
				missingKeyHandler: !1,
				postProcess: !1,
				returnNull: !0,
				returnEmptyString: !0,
				returnObjects: !1,
				joinArrays: !1,
				returnedObjectHandler: function() {},
				parseMissingKeyHandler: !1,
				appendNamespaceToMissingKey: !1,
				overloadTranslationOptionHandler: function(e) {
					return {
						defaultValue: e[1]
					}
				},
				interpolation: {
					escapeValue: !0,
					prefix: "{{",
					suffix: "}}",
					unescapePrefix: "-",
					nestingPrefix: "$t(",
					nestingSuffix: ")",
					defaultVariables: void 0
				}
			}
		}

		function r(e) {
			return "string" == typeof e.ns && (e.ns = [e.ns]), "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]), "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]), e.whitelist && e.whitelist.indexOf("cimode") < 0 && e.whitelist.push("cimode"), e
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.get = n, t.transformOptions = r
	}, function(e, t, n) {
		var r, r;
		! function(t) {
			e.exports = t()
		}(function() {
			return function e(t, n, i) {
				function o(s, u) {
					if (!n[s]) {
						if (!t[s]) {
							var c = "function" == typeof r && r;
							if (!u && c) return r(s, !0);
							if (a) return a(s, !0);
							var l = new Error("Cannot find module '" + s + "'");
							throw l.code = "MODULE_NOT_FOUND", l
						}
						var f = n[s] = {
							exports: {}
						};
						t[s][0].call(f.exports, function(e) {
							var n = t[s][1][e];
							return o(n ? n : e)
						}, f, f.exports, e, t, n, i)
					}
					return n[s].exports
				}
				for (var a = "function" == typeof r && r, s = 0; s < i.length; s++) o(i[s]);
				return o
			}({
				1: [function(e, t, n) {
					"use strict";

					function r(e) {
						if (e && e.__esModule) return e;
						var t = {};
						if (null != e)
							for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
						return t["default"] = e, t
					}

					function i(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}

					function o(e, t, n, r, i) {
						if (r && "object" == typeof r) {
							var o = "",
								a = encodeURIComponent;
							for (var s in r) o += "&" + a(s) + "=" + a(r[s]);
							r = o.slice(1) + (i ? "" : "&_t=" + new Date)
						}
						try {
							var u = new(XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
							u.open(r ? "POST" : "GET", e, 1), t.crossDomain || u.setRequestHeader("X-Requested-With", "XMLHttpRequest"), u.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), u.onreadystatechange = function() {
								u.readyState > 3 && n && n(u.responseText, u)
							}, u.send(r)
						} catch (a) {
							window.console && console.log(a)
						}
					}

					function a() {
						return {
							loadPath: "/locales/{{lng}}/{{ns}}.json",
							addPath: "locales/add/{{lng}}/{{ns}}",
							allowMultiLoading: !1,
							parse: JSON.parse,
							crossDomain: !1,
							ajax: o
						}
					}
					Object.defineProperty(n, "__esModule", {
						value: !0
					});
					var s = function() {
							function e(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(t, n, r) {
								return n && e(t.prototype, n), r && e(t, r), t
							}
						}(),
						u = e("./utils"),
						c = r(u),
						l = function() {
							function e(t) {
								var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
								i(this, e), this.init(t, n), this.type = "backend"
							}
							return s(e, [{
								key: "init",
								value: function(e) {
									var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
									this.services = e, this.options = c.defaults(t, this.options || {}, a())
								}
							}, {
								key: "readMulti",
								value: function(e, t, n) {
									var r = this.services.interpolator.interpolate(this.options.loadPath, {
										lng: e.join("+"),
										ns: t.join("+")
									});
									this.loadUrl(r, n)
								}
							}, {
								key: "read",
								value: function(e, t, n) {
									var r = this.services.interpolator.interpolate(this.options.loadPath, {
										lng: e,
										ns: t
									});
									this.loadUrl(r, n)
								}
							}, {
								key: "loadUrl",
								value: function(e, t) {
									var n = this;
									this.options.ajax(e, this.options, function(r, i) {
										var o = i.status.toString();
										if (0 === o.indexOf("5")) return t("failed loading " + e, !0);
										if (0 === o.indexOf("4")) return t("failed loading " + e, !1);
										var a = void 0,
											s = void 0;
										try {
											a = n.options.parse(r)
										} catch (u) {
											s = "failed parsing " + e + " to json"
										}
										return s ? t(s, !1) : void t(null, a)
									})
								}
							}, {
								key: "create",
								value: function(e, t, n, r) {
									var i = this;
									"string" == typeof e && (e = [e]);
									var o = {};
									o[n] = r || "", e.forEach(function(e) {
										var n = i.services.interpolator.interpolate(i.options.addPath, {
											lng: e,
											ns: t
										});
										i.options.ajax(n, i.options, function(e, t) {}, o)
									})
								}
							}]), e
						}();
					l.type = "backend", n["default"] = l, t.exports = n["default"]
				}, {
					"./utils": 2
				}],
				2: [function(e, t, n) {
					"use strict";

					function r(e) {
						return a.call(s.call(arguments, 1), function(t) {
							if (t)
								for (var n in t) void 0 === e[n] && (e[n] = t[n])
						}), e
					}

					function i(e) {
						return a.call(s.call(arguments, 1), function(t) {
							if (t)
								for (var n in t) e[n] = t[n]
						}), e
					}
					Object.defineProperty(n, "__esModule", {
						value: !0
					}), n.defaults = r, n.extend = i;
					var o = [],
						a = o.forEach,
						s = o.slice
				}, {}]
			}, {}, [1])(1)
		})
	}, function(e, t) {
		e.exports = {
			Live: "Live",
			Advertisement: "Advertisement",
			Pause: "Pause",
			Play: "Play",
			Mute: "Mute",
			Unmute: "Unmute",
			Options: "Options",
			Fullscreen: "Fullscreen",
			"Exit Fullscreen": "Exit Fullscreen",
			"Player Options": "Player Options",
			"Video Quality:": "Video Quality:",
			Source: "Source",
			High: "High",
			Medium: "Medium",
			Low: "Low",
			Mobile: "Mobile",
			"Popout Player": "Popout Player",
			"Show Video Stats": "Show Video Stats",
			"Report Playback Issue": "Report Playback Issue",
			Captions: "Captions",
			"Closed Captioning": "Closed Captioning",
			"Click the CC button to enable live closed captions on this stream.": "Click the CC button to enable live closed captions on this stream.",
			Back: "Back",
			"Introducing Closed Captioning": "Introducing Closed Captioning",
			Save: "Save",
			Select: "Select",
			"Audio and video stutter": "Audio and video stutter",
			"Video stutters, but audio is fine": "Video stutters, but audio is fine",
			"Video is completely black or doesn't load": "Video is completely black or doesn't load",
			"Audio and video aren't synced": "Audio and video aren't synced",
			"Fullscreen playback doesn't work": "Fullscreen playback doesn't work",
			"Advertisement can't be muted or is too loud": "Advertisement can't be muted or is too loud",
			"Advertisement has played too many times": "Advertisement has played too many times",
			Submit: "Submit",
			"Theater Mode": "Theater Mode",
			"Exit Theater Mode": "Exit Theater Mode",
			"Video could not be found, or has been deleted by its owner": "Video could not be found, or has been deleted by its owner",
			"Channel could not be found, or has been deleted by its owner": "Channel could not be found, or has been deleted by its owner",
			"Video is loading": "Video is loading",
			"Video is not available": "Video is not available",
			"Flash is not installed": "Flash is not installed",
			"The broadcaster indicated that the channel is intended for mature audiences.": "The broadcaster indicated that the channel is intended for mature audiences.",
			"Start Watching": "Start Watching",
			"This video is only available to subscribers. Subscribe now to watch and support %s.": "This video is only available to subscribers. Subscribe now to watch and support %s.",
			"This video quality is only available to subscribers. Subscribe now to watch and support %s.": "This video quality is only available to subscribers. Subscribe now to watch and support %s.",
			"Playing on ": "Playing on ",
			" has started a playlist.": " has started a playlist.",
			Offline: "Offline",
			Playlist: "Playlist",
			Subscribe: "Subscribe",
			Close: "Close",
			"The broadcast is down.": "The broadcast is down.",
			"The player will automatically reload when the broadcast is back.": "The player will automatically reload when the broadcast is back.",
			"Copy Video URL at Current Time": "Copy Video URL at Current Time",
			"Thanks for your report": "Thanks for your report",
			"Coming Up": "Coming Up",
			"Now playing: ": "Now playing: ",
			"playing ": "playing ",
			"for": "for",
			Chromecast: "Chromecast",
			"Watch on Twitch": "Watch on Twitch",
			" viewer": " viewer",
			" viewer_plural": " viewers"
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CAST_SENDER_URL = t.BackendChromecast = void 0;
		var o = n(75),
			a = i(o),
			s = n(180),
			u = n(66),
			c = r(u),
			l = n(138),
			f = t.BackendChromecast = {},
			d = t.CAST_SENDER_URL = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js",
			h = 5;
		! function() {
			function e() {
				var e = new s.Deferred,
					t = function() {
						if (window.chrome)
							if (chrome.cast && chrome.cast.isAvailable) e.resolve(!0);
							else {
								window.__onGCastApiAvailable = function(t) {
									e.resolve(t)
								};
								var t = h,
									n = setInterval(function() {
										var r = (chrome.cast && chrome.cast.isAvailable, !1);
										(r || 0 >= t) && (e.resolve(r), clearInterval(n)), t--
									}, 1e3)
							} else e.resolve(!1)
					};
				return $.ajax({
					url: d,
					dataType: "script",
					cache: !0,
					success: t
				}), e.promise
			}

			function t(e) {
				if (e) {
					var t = new chrome.cast.SessionRequest(c.chromecastId),
						n = new chrome.cast.ApiConfig(t, r, o, chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED);
					chrome.cast.initialize(n)
				}
			}

			function n() {
				S = !1, _()
			}

			function r(e) {
				w = e, w.addUpdateListener(i), O && N && g()
			}

			function i() {
				if (w.status === chrome.cast.SessionStatus.CONNECTED) {
					var e = w.receiver;
					return E.volume !== e.volume.level && (E.volume = e.volume.level, b.emit("volumechange")), void(E.muted !== e.volume.muted && (E.muted = e.volume.muted, b.emit("volumechange")))
				}
				return w.status === chrome.cast.SessionStatus.STOPPED ? (u(null), w.removeUpdateListener(i), w = null, P = !1, void _()) : void(w.status === chrome.cast.SessionStatus.DISCONNECTED)
			}

			function o(e) {
				S = e === chrome.cast.ReceiverAvailability.AVAILABLE, _()
			}

			function u(e) {
				k && k.removeUpdateListener(p), k = e, P = !1, _(), k && k.addUpdateListener(p)
			}

			function p() {
				E.currentTime !== k.currentTime && (E.currentTime = k.currentTime, b.emit("timeupdate")), E.volume !== k.volume.level && (E.volume = k.volume.level, b.emit("volumechange")), E.muted !== k.volume.muted && (E.muted = k.volume.muted, b.emit("volumechange")), E.playbackRate !== k.playbackRate && (E.playbackRate = k.playbackRate, b.emit("ratechange"));
				var e = k.playerState;
				E.playerState !== k.playerState && (e === chrome.cast.media.PlayerState.PLAYING ? b.emit("playing") : e === chrome.cast.media.PlayerState.PAUSED ? b.emit("pause") : e === chrome.cast.media.PlayerState.BUFFERING, E.playerState = k.playerState)
			}

			function g() {
				P = !0, _();
				var e = (0, l.channelInfo)(O);
				e.then(function(e) {
					(0, l.offlinePlaylistInfo)(e._id).then(function(t) {
						var n = t || {},
							r = new chrome.cast.media.MediaInfo(N, "application/x-mpegurl");
						r.streamType = chrome.cast.media.StreamType.LIVE;
						var i = new chrome.cast.media.GenericMediaMetadata;
						i.subtitle = e.game, i.title = e.display_name, i.images = [new chrome.cast.Image(e.logo)], r.metadata = i, r.customData = {
							channel: O,
							is_spectre: Boolean(n.active)
						};
						var o = new chrome.cast.media.LoadRequest(r);
						o.autoplay = !0, w.loadMedia(o, u)
					})
				}, function(e) {
					w.stop(), v(e)
				})
			}

			function v(e) {
				e && (T = e, b.emit("error"))
			}

			function _() {
				var e = x,
					t = A;
				k ? (x = m.NETWORK_LOADING, A = m.HAVE_METADATA, b.emit("canplay")) : P ? (x = m.NETWORK_LOADING, A = m.HAVE_NOTHING) : S && O ? (x = m.NETWORK_IDLE, A = m.HAVE_NOTHING) : (x = m.NETWORK_EMPTY, A = m.HAVE_NOTHING), x !== e && (x === m.NETWORK_LOADING ? (b.emit("loadstart"), b.emit("progress")) : x === m.NETWORK_IDLE ? b.emit("suspend") : x === m.NETWORK_EMPTY && b.emit("emptied")), A !== t && (A === m.HAVE_METADATA ? b.emit("loadedmetadata") : A === m.HAVE_NOTHING && b.emit("ended"))
			}

			function y(e) {
				v(e)
			}
			var m = f,
				b = new a["default"],
				E = {},
				w = void 0,
				k = void 0,
				O = void 0,
				S = void 0,
				T = void 0,
				P = void 0,
				x = void 0,
				A = void 0,
				C = !1,
				N = null;
			m.init = function() {
				if (b.removeAllListeners(), !C) {
					C = !0, n();
					var r = e();
					r.then(t)
				}
			}, m.destroy = function() {}, m.addEventListener = function(e, t) {
				b.on(e, t)
			}, m.removeEventListener = function(e, t) {
				b.off(e, t)
			}, m.getNetworkProfile = function() {
				return []
			}, m.getError = function() {
				return T
			}, m.getSrc = function() {}, m.setSrc = function() {}, m.getCurrentSrc = function() {}, m.NETWORK_EMPTY = 0, m.NETWORK_IDLE = 1, m.NETWORK_LOADING = 2, m.NETWORK_NO_SOURCE = 3, m.getNetworkState = function() {
				return x
			}, m.getPreload = function() {}, m.setPreload = function() {}, m.load = function() {
				chrome.cast.requestSession(r, y)
			}, m.getBuffered = function() {
				return {
					length: 0
				}
			}, m.HAVE_NOTHING = 0, m.HAVE_METADATA = 1, m.HAVE_CURRENT_DATA = 2, m.HAVE_FUTURE_DATA = 3, m.HAVE_ENOUGH_DATA = 4, m.getReadyState = function() {
				return A
			}, m.getSeeking = function() {}, m.getCurrentTime = function() {
				return k ? k.getEstimatedTime() : void 0
			}, m.setCurrentTime = function(e) {
				if (k) {
					var t = new chrome.cast.media.SeekRequest;
					t.time = e, k.seek(t)
				}
			}, m.getInitialTime = function() {}, m.getDuration = function() {}, m.getStartOffsetTime = function() {}, m.getPaused = function() {
				return k ? k.playerState === chrome.cast.media.PlayerState.PAUSED : void 0
			}, m.getDefaultPlaybackRate = function() {}, m.setDefaultPlaybackRate = function() {}, m.getPlaybackRate = function() {}, m.setPlaybackRate = function() {}, m.getPlayed = function() {}, m.getSeekable = function() {}, m.getEnded = function() {}, m.getAutoplay = function() {}, m.setAutoplay = function() {}, m.getLoop = function() {}, m.setLoop = function() {}, m.play = function() {
				if (k) {
					var e = new chrome.cast.media.PlayRequest;
					k.play(e)
				} else m.load()
			}, m.pause = function() {
				if (k) {
					var e = new chrome.cast.media.PauseRequest;
					k.pause(e)
				}
			}, m.getControls = function() {}, m.setControls = function() {}, m.getVolume = function() {
				return k ? k.volume.level : void 0
			}, m.setVolume = function(e) {
				if (k) {
					var t = new chrome.cast.Volume(e, null),
						n = new chrome.cast.media.VolumeRequest(t);
					k.setVolume(n)
				}
			}, m.getMuted = function() {
				return k ? k.volume.muted : w ? w.receiver.volume.muted : void 0
			}, m.setMuted = function(e) {
				if (k) {
					var t = new chrome.cast.Volume(null, e),
						n = new chrome.cast.media.VolumeRequest(t);
					k.setVolume(n)
				}
			}, m.getDefaultMuted = function() {}, m.setDefaultMuted = function() {}, m.getQuality = function() {
				return "auto"
			}, m.setQuality = function() {}, m.getQualities = function() {
				return ["auto"]
			}, m.getChannel = function() {
				return O
			}, m.setChannel = function(e, t) {
				O = e, t.streamUrl.then(function(e) {
					N = e, w && O && N && g()
				})
			}, m.getVideo = function() {
				return null
			}, m.setVideo = function() {
				O = null, N = null
			}, m.getStats = function() {}, m.getStatsEnabled = function() {}, m.setStatsEnabled = function() {}, m.getVideoInfo = function() {}, m.getCaption = function() {}, m.getBackend = function() {
				return "chromecast"
			}, m.stop = function() {
				w && w.stop()
			}, m.getDevice = function() {
				return w && w.receiver ? w.receiver.friendlyName : void 0
			}
		}()
	}, function(e, t) {
		"use strict";

		function n() {
			var e = this;
			e.promise = new Promise(function(t, n) {
				e.resolve = t, e.reject = n
			})
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Deferred = n
	}, function(e, t, n) {
		var r, i, o;
		(function(n) {
			"use strict";
			! function(n, a) {
				i = [], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
			}(this, function() {
				function e() {
					try {
						return a in i && i[a]
					} catch (e) {
						return !1
					}
				}
				var t, r = {},
					i = "undefined" != typeof window ? window : n,
					o = i.document,
					a = "localStorage",
					s = "script";
				if (r.disabled = !1, r.version = "1.3.20", r.set = function(e, t) {}, r.get = function(e, t) {}, r.has = function(e) {
						return void 0 !== r.get(e)
					}, r.remove = function(e) {}, r.clear = function() {}, r.transact = function(e, t, n) {
						null == n && (n = t, t = null), null == t && (t = {});
						var i = r.get(e, t);
						n(i), r.set(e, i)
					}, r.getAll = function() {}, r.forEach = function() {}, r.serialize = function(e) {
						return JSON.stringify(e)
					}, r.deserialize = function(e) {
						if ("string" == typeof e) try {
							return JSON.parse(e)
						} catch (t) {
							return e || void 0
						}
					}, e()) t = i[a], r.set = function(e, n) {
					return void 0 === n ? r.remove(e) : (t.setItem(e, r.serialize(n)), n)
				}, r.get = function(e, n) {
					var i = r.deserialize(t.getItem(e));
					return void 0 === i ? n : i
				}, r.remove = function(e) {
					t.removeItem(e)
				}, r.clear = function() {
					t.clear()
				}, r.getAll = function() {
					var e = {};
					return r.forEach(function(t, n) {
						e[t] = n
					}), e
				}, r.forEach = function(e) {
					for (var n = 0; n < t.length; n++) {
						var i = t.key(n);
						e(i, r.get(i))
					}
				};
				else if (o && o.documentElement.addBehavior) {
					var u, c;
					try {
						c = new ActiveXObject("htmlfile"), c.open(), c.write("<" + s + ">document.w=window</" + s + '><iframe src="/favicon.ico"></iframe>'), c.close(), u = c.w.frames[0].document, t = u.createElement("div")
					} catch (l) {
						t = o.createElement("div"), u = o.body
					}
					var f = function(e) {
							return function() {
								var n = Array.prototype.slice.call(arguments, 0);
								n.unshift(t), u.appendChild(t), t.addBehavior("#default#userData"), t.load(a);
								var i = e.apply(r, n);
								return u.removeChild(t), i
							}
						},
						d = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
						h = function(e) {
							return e.replace(/^d/, "___$&").replace(d, "___")
						};
					r.set = f(function(e, t, n) {
						return t = h(t), void 0 === n ? r.remove(t) : (e.setAttribute(t, r.serialize(n)), e.save(a), n)
					}), r.get = f(function(e, t, n) {
						t = h(t);
						var i = r.deserialize(e.getAttribute(t));
						return void 0 === i ? n : i
					}), r.remove = f(function(e, t) {
						t = h(t), e.removeAttribute(t), e.save(a)
					}), r.clear = f(function(e) {
						var t = e.XMLDocument.documentElement.attributes;
						e.load(a);
						for (var n = t.length - 1; n >= 0; n--) e.removeAttribute(t[n].name);
						e.save(a)
					}), r.getAll = function(e) {
						var t = {};
						return r.forEach(function(e, n) {
							t[e] = n
						}), t;
					}, r.forEach = f(function(e, t) {
						for (var n, i = e.XMLDocument.documentElement.attributes, o = 0; n = i[o]; ++o) t(n.name, r.deserialize(e.getAttribute(n.name)))
					})
				}
				try {
					var p = "__storejs__";
					r.set(p, p), r.get(p) != p && (r.disabled = !0), r.remove(p)
				} catch (l) {
					r.disabled = !0
				}
				return r.enabled = !r.disabled, r
			})
		}).call(t, function() {
			return this
		}())
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = {};
		t["default"] = n,
			function() {
				var e = n;
				e.key = function(e) {
					return sessionStorage.key(e)
				}, e.getItem = function(e) {
					var t = sessionStorage.getItem(e);
					if (t) return JSON.parse(t)
				}, e.setItem = function(e, t) {
					var n = JSON.stringify(t);
					sessionStorage.setItem(e, n)
				}, e.removeItem = function(e) {
					sessionStorage.removeItem(e)
				}, e.clear = function() {
					sessionStorage.clear()
				}, Object.defineProperty(e, "length", {
					get: function() {
						return sessionStorage.length
					}
				})
			}()
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function o(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PubSub = t.AVAILABLE_EVENTS = t.EVENT_TOS = t.EVENT_VIEWCOUNT = t.EVENT_OFFLINE = t.EVENT_ONLINE = void 0;
		var a = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			s = n(78),
			u = i(s),
			c = n(75),
			l = i(c),
			f = n(184),
			d = i(f),
			h = n(66),
			p = r(h),
			g = t.EVENT_ONLINE = "online",
			v = t.EVENT_OFFLINE = "offline",
			_ = t.EVENT_VIEWCOUNT = "viewerschange",
			y = t.EVENT_TOS = "tos",
			m = t.AVAILABLE_EVENTS = [g, v, _, y];
		t.PubSub = function() {
			function e(t) {
				var n = this;
				o(this, e), this._eventEmitter = new l["default"], this._options = t, this._isListening = !1, this._onMessage = function(e) {
					n.onPubSubMessage(e)
				}, t.video || (this._pubSub = d["default"].getInstance(p.pubSubEnviroment), this._pubSub.Listen({
					topic: "video-playback." + t.channel,
					success: function() {
						n._isListening = !0, t.debug && console.info("PubSub: successfully listened to video-playback." + t.channel)
					},
					failure: function(e) {
						console.error("PubSub: error listening: " + e)
					},
					message: this._onMessage
				}))
			}
			return a(e, [{
				key: "onPubSubMessage",
				value: function(e) {
					try {
						var t = JSON.parse(e);
						switch (this._options.debug && console.info("PubSub: " + JSON.stringify(t)), t.type) {
							case "stream-up":
								this._eventEmitter.emit(g);
								break;
							case "stream-down":
								this._eventEmitter.emit(v);
								break;
							case "viewcount":
								this._eventEmitter.emit(_, {
									viewers: t.viewers
								});
								break;
							case "tos-strike":
								this._eventEmitter.emit(y);
								break;
							default:
								this._options.debug && console.warn("PubSub: Invalid message - " + JSON.stringify(t))
						}
					} catch (n) {
						console.error("Failed to parse Pubsub message as JSON: " + e)
					}
				}
			}, {
				key: "addEventListener",
				value: function(e, t) {
					(0, u["default"])(m, e) && this._eventEmitter.addListener(e, t)
				}
			}, {
				key: "removeEventListener",
				value: function(e, t) {
					this._eventEmitter.removeListener(e, t)
				}
			}, {
				key: "destroy",
				value: function() {
					var e = this;
					this._isListening && this._pubSub.Unlisten({
						topic: "video-playback." + this._options.channel,
						success: function() {
							e._isListening = !1, e._options.debug && console.info("PubSub: successfully unlistened to video-playback." + e._options.channel)
						},
						failure: function(e) {
							console.error("PubSub: error unlistening: %o", e)
						},
						message: this._onMessage
					})
				}
			}]), e
		}()
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		}

		function s(e) {
			if ("production" !== e && "staging" !== e && "darklaunch" !== e) throw "Invalid Pubsub instance environment";
			return null === window.__Twitch__pubsubInstances[e] && (window.__Twitch__pubsubInstances[e] = new x(e)), window.__Twitch__pubsubInstances[e]
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var u = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			c = n(185),
			l = r(c),
			f = n(186),
			d = r(f),
			h = n(187),
			p = r(h),
			g = n(188),
			v = r(g),
			_ = n(190),
			y = r(_),
			m = n(191),
			b = r(m),
			E = n(193),
			w = r(E),
			k = n(194),
			O = r(k),
			S = d["default"]._getLogger("PubsubDriver"),
			T = /^https?:\/\/([\w-]+\.)*twitch\.tv(:\d+)?\/.*$/,
			P = 1,
			x = function(e) {
				function t(e) {
					i(this, t);
					var n = o(this, Object.getPrototypeOf(t).call(this, e));
					return n._env = p["default"].urlParams.pubsub_environment || e, n._clientReady = !1, n._queuedRequests = [], n._stats = new w["default"]({
						env: n._env
					}), n._numDisconnects = 0, p["default"].inIframe() && T.test(document.referrer) ? (S.debug("Driver is in an iframe"), n._client = new v["default"]({
						parentUrl: document.referrer
					}), n._clientType = "iframe-verified") : (S.debug("Driver is not in an iframe"), n._client = new b["default"]({
						env: n._env,
						stats: n._stats
					}), n._iframeHost = new y["default"](n._client), n._clientType = "ws"), "true" === p["default"].urlParams.force_pubsub_tester ? P = 1 : "false" === p["default"].urlParams.force_pubsub_tester && (P = 0), Math.random() < P && (n._tester = new O["default"]({
						env: n._env,
						driver: n,
						stats: n._stats
					})), n._client.on("unverified", n._clientUnverified, n), n._client.on("verified", n._clientVerified, n), n._client.verify(), n
				}
				return a(t, e), u(t, [{
					key: "connect",
					value: function() {}
				}, {
					key: "Listen",
					value: function(e) {
						this._clientReady ? this._client.Listen(e) : this._queuedRequests.push({
							type: "LISTEN",
							opts: e
						})
					}
				}, {
					key: "Unlisten",
					value: function(e) {
						this._clientReady ? this._client.Unlisten(e) : this._queuedRequests.push({
							type: "UNLISTEN",
							opts: e
						})
					}
				}, {
					key: "_flushQueuedRequests",
					value: function() {
						for (S.debug("Flushing " + this._queuedRequests.length + " queued requests"); this._queuedRequests.length > 0;) {
							var e = this._queuedRequests.shift();
							switch (e.type) {
								case "LISTEN":
									this._client.Listen(e.opts);
									break;
								case "UNLISTEN":
									this._client.Unlisten(e.opts)
							}
						}
					}
				}, {
					key: "_clientConnected",
					value: function() {
						S.debug("Client connected"), this._client.on("disconnected", this._clientDisconnected, this), this._stats.sendStatCounter("connected", 1), this._trigger("connected"), this._clientReady = !0, this._flushQueuedRequests()
					}
				}, {
					key: "_clientDisconnected",
					value: function() {
						S.debug("Client disconnected"), this._trigger("disconnected"), this._clientReady = !1, this._numDisconnects += 1
					}
				}, {
					key: "_clientVerified",
					value: function() {
						S.debug("Client verified (type = " + this._clientType + ")"), this._stats.setPrefix("pubsub-js-client." + this._clientType + "."), this._client.on("connected", this._clientConnected, this), this._client.connect(), window.setInterval(this._sendClientTypeGauge.bind(this), 6e4)
					}
				}, {
					key: "_clientUnverified",
					value: function() {
						S.debug("Unverified IframeClient"), this._client.off("verified", this._clientVerified, this), this._client.off("unverified", this._clientUnverified, this), this._client = new b["default"]({
							env: this._env,
							stats: this._stats
						}), this._clientType = "iframe-unverified", this._client.on("unverified", this._clientUnverified, this), this._client.on("verified", this._clientVerified, this), this._client.verify()
					}
				}, {
					key: "_sendClientTypeGauge",
					value: function() {
						this._stats.sendStatGauge("pubsub-js-client." + this._clientType)
					}
				}]), t
			}(l["default"]);
		window.__Twitch__pubsubInstances = window.__Twitch__pubsubInstances || {
				production: null,
				staging: null,
				darklaunch: null
			}, t["default"] = {
			getInstance: s
		}
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			i = function() {
				function e() {
					n(this, e)
				}
				return r(e, [{
					key: "on",
					value: function(e, t, n) {
						return this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(t, n), this
					}
				}, {
					key: "off",
					value: function(e, t) {
						if (this._events)
							for (var n = this._events[e] || [], r = this._events[e] = [], i = 0; i < n.length; i += 2) n[i] !== t && (r.push(n[i]), r.push(n[i + 1]));
						return this
					}
				}, {
					key: "_trigger",
					value: function(e) {
						if (this._events)
							for (var t = this._events[e] || [], n = 1; n < t.length; n += 2) t[n - 1].apply(t[n], Array.prototype.slice.call(arguments, 1));
						return this
					}
				}, {
					key: "count",
					value: function(e) {
						if (this._events) {
							var t = this._events[e] || [];
							return t.length / 2
						}
						return 0
					}
				}]), e
			}();
		t["default"] = i
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(187),
			s = r(a),
			u = function() {},
			c = u,
			l = {},
			f = {
				DEBUG: 1,
				INFO: 2,
				WARNING: 3,
				ERROR: 4,
				CRITICAL: 5
			},
			d = f.WARNING,
			h = function() {
				function e(t) {
					i(this, e), this._opts = t
				}
				return o(e, [{
					key: "debug",
					value: function(e) {
						d <= f.DEBUG && this._log("DEBUG: " + e)
					}
				}, {
					key: "info",
					value: function(e) {
						d <= f.INFO && this._log("INFO: " + e)
					}
				}, {
					key: "warning",
					value: function(e) {
						d <= f.WARNING && this._log("WARNING: " + e)
					}
				}, {
					key: "error",
					value: function(e) {
						d <= f.ERROR && this._log("ERROR: " + e)
					}
				}, {
					key: "critical",
					value: function(e) {
						d <= f.CRITICAL && this._log("CRITICAL: " + e)
					}
				}, {
					key: "_log",
					value: function(e) {
						var t = this._opts.prefix + e;
						this._opts.logFunc ? this._opts.logFunc(t) : c(t)
					}
				}]), e
			}(),
			p = {
				setLogger: function(e) {
					c = "function" == typeof e ? e : u
				},
				setLevel: function() {
					var e = (s["default"].urlParams.pubsub_log_level || "").toUpperCase();
					if (e) {
						var t = f[e];
						if (t) return d = t,
							function() {}
					}
					return function(e) {
						d = e ? f[e.toUpperCase()] || f.WARNING : f.WARNING
					}
				}(),
				_getLogger: function(e) {
					return l[e] || (l[e] = new h({
						prefix: "pubsub.js [" + e + "] "
					})), l[e]
				},
				_noopLogger: new h({
					prefix: "",
					logFunc: u
				})
			},
			g = window.console;
		g && g.log && (g.log.apply ? p.setLogger(function() {
			g.log.apply(g, arguments)
		}) : p.setLogger(function() {
			for (var e = [], t = 0; t < arguments.length; ++t) e.push(arguments[t]);
			g.log(e.join(" "))
		})), t["default"] = p
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = {};
		n.randomInt = function(e) {
			return Math.floor(Math.random() * e)
		}, n.time = {
			seconds: function(e) {
				return 1e3 * e
			},
			now: function() {
				return (new Date).getTime()
			}
		}, n.urlParams = function() {
			for (var e = {}, t = window.location.search.substr(1), n = t.split("&"), r = 0; r < n.length; ++r) {
				var i = n[r].split("=");
				e[decodeURIComponent(i[0])] = i.length > 1 ? decodeURIComponent(i[1]) : ""
			}
			return e
		}(), n.generateString = function(e) {
			for (var t = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; e > i; i++) t += r.charAt(n.randomInt(r.length));
			return t
		}, n.inIframe = function() {
			try {
				return window.self !== window.top
			} catch (e) {
				return !0
			}
		}, t["default"] = n
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var s = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			u = n(185),
			c = r(u),
			l = n(186),
			f = r(l),
			d = n(187),
			h = r(d),
			p = n(189),
			g = r(p),
			v = 30,
			_ = 3e4,
			y = 1e3,
			m = "pubsub",
			b = f["default"]._getLogger("IframeClient"),
			E = function(e) {
				function t(e) {
					i(this, t);
					var n = o(this, Object.getPrototypeOf(t).call(this, e));
					return n._parentUrl = e.parentUrl, n._pendingResponses = new g["default"], n._listens = new c["default"], window.addEventListener("message", n.receiveMessage.bind(n), !1), n
				}
				return a(t, e), s(t, [{
					key: "connect",
					value: function() {
						window.parent.postMessage({
							twitch_protocol: m,
							type: "connect"
						}, this._parentUrl)
					}
				}, {
					key: "verify",
					value: function() {
						window.parent.postMessage({
							twitch_protocol: m,
							type: "verify"
						}, this._parentUrl), this._verifyTimeout = setTimeout(this._unverified.bind(this), y)
					}
				}, {
					key: "Listen",
					value: function(e) {
						b.debug("listening on " + e.topic);
						var t = this._generateNonce(),
							n = {
								twitch_protocol: m,
								type: "LISTEN",
								nonce: t,
								data: {
									topics: [e.topic],
									auth_token: e.auth
								}
							};
						this._send(t, n, e)
					}
				}, {
					key: "Unlisten",
					value: function(e) {
						if (b.debug("unlistening on " + e.topic + "(" + this._listens.count(e.topic) + " listeners)"), this._listens.count(e.topic) > 1) return this._listens.off(e.topic, e.message), e.success(), void b.debug("now have " + this._listens.count(e.topic) + " listeners");
						var t = this._generateNonce(),
							n = {
								twitch_protocol: m,
								type: "UNLISTEN",
								nonce: t,
								data: {
									topics: [e.topic]
								}
							};
						this._send(t, n, e)
					}
				}, {
					key: "_send",
					value: function(e, t, n) {
						this._pendingResponses.set(e, {
							timeout: setTimeout(this._onResponseTimeout.bind(this), _, e),
							topic: n.topic,
							auth: n.auth,
							message: t,
							callbacks: {
								success: n.success,
								failure: n.failure,
								message: n.message
							}
						}), window.parent.postMessage(t, this._parentUrl)
					}
				}, {
					key: "receiveMessage",
					value: function(e) {
						if (e.data.twitch_protocol == m) switch (b.debug("Received message: " + JSON.stringify(e.data)), e.data.type) {
							case "connected":
								this._trigger("connected");
								break;
							case "disconnected":
								this._trigger("disconnected");
								break;
							case "success":
								this.handleResponse(!0, e.data);
								break;
							case "failure":
								this.handleResponse(!1, e.data);
								break;
							case "message":
								this.handleMessage(e.data.topic, e.data.message);
								break;
							case "verify":
								this._verified()
						}
					}
				}, {
					key: "handleResponse",
					value: function(e, t) {
						if (this._pendingResponses.has(t.nonce)) {
							var n = this._pendingResponses.get(t.nonce);
							b.debug("ResponseInfo: " + JSON.stringify(n)), clearTimeout(n.timeout), this._pendingResponses.remove(t.nonce), e ? ("LISTEN" === n.message.type ? this._listens.on(n.topic, n.callbacks.message, this) : "UNLISTEN" === n.message.type && this._listens.off(n.topic, n.callbacks.message, this), n.callbacks.success()) : n.callbacks.failure(t.error)
						}
					}
				}, {
					key: "handleMessage",
					value: function(e, t) {
						b.debug("received '" + t + "' on topic " + e), this._listens._trigger(e, t)
					}
				}, {
					key: "_onResponseTimeout",
					value: function(e) {
						b.debug("response timed out: " + e)
					}
				}, {
					key: "_verified",
					value: function() {
						b.debug("Verified"), clearTimeout(this._verifyTimeout), this._trigger("verified")
					}
				}, {
					key: "_unverified",
					value: function() {
						window.removeEventListener("message", this.receiveMessage.bind(this), !1), this._trigger("unverified")
					}
				}, {
					key: "_generateNonce",
					value: function() {
						return h["default"].generateString(v)
					}
				}]), t
			}(c["default"]);
		t["default"] = E
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			i = function() {
				function e() {
					n(this, e), this._map = {}, this._size = 0
				}
				return r(e, [{
					key: "set",
					value: function(e, t) {
						this._map.hasOwnProperty(e) || (this._size += 1), this._map[e] = t
					}
				}, {
					key: "get",
					value: function(e) {
						return this._map[e]
					}
				}, {
					key: "has",
					value: function(e) {
						return this._map.hasOwnProperty(e)
					}
				}, {
					key: "remove",
					value: function(e) {
						this._map.hasOwnProperty(e) && (this._size -= 1), delete this._map[e]
					}
				}, {
					key: "size",
					value: function() {
						return this._size
					}
				}, {
					key: "map",
					value: function() {
						return this._map
					}
				}, {
					key: "values",
					value: function() {
						var e = [];
						for (var t in this._map) this._map.hasOwnProperty(t) && e.push(this._map[t]);
						return e
					}
				}]), e
			}();
		t["default"] = i
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(186),
			s = r(a),
			u = "pubsub",
			c = s["default"]._getLogger("IframeHost"),
			l = function() {
				function e(t) {
					i(this, e), this._driver = t, this._sources = [], this._driver.on("connected", this.handleConnected, this), this._driver.on("disconnected", this.handleDisconnected, this), window.addEventListener("message", this.receiveMessage.bind(this), !1)
				}
				return o(e, [{
					key: "receiveMessage",
					value: function(e) {
						if (e.data.twitch_protocol == u) switch (c.debug("Received message: " + JSON.stringify(e.data)), e.data.type) {
							case "LISTEN":
								this.handleListen(e.source, e.data.nonce, e.data.data);
								break;
							case "UNLISTEN":
								this.handleUnlisten(e.source, e.data.nonce, e.data.data);
								break;
							case "connect":
								this._sources.push(e.source), this._driver.connect();
								break;
							case "verify":
								e.source.postMessage({
									twitch_protocol: u,
									type: "verify"
								}, "*")
						}
					}
				}, {
					key: "handleListen",
					value: function(e, t, n) {
						var r = function() {
								e.postMessage({
									twitch_protocol: u,
									type: "success",
									nonce: t
								}, "*")
							},
							i = function(n) {
								e.postMessage({
									twitch_protocol: u,
									type: "failure",
									nonce: t,
									error: n
								}, "*")
							},
							o = function(t) {
								e.postMessage({
									twitch_protocol: u,
									type: "message",
									topic: n.topics[0],
									message: t
								}, "*")
							};
						this._driver.Listen({
							topic: n.topics[0],
							auth: n.auth_token,
							success: r,
							failure: i,
							message: o
						})
					}
				}, {
					key: "handleUnlisten",
					value: function(e, t, n) {
						var r = function() {
								e.postMessage({
									twitch_protocol: u,
									type: "success",
									nonce: t
								}, "*")
							},
							i = function(n) {
								e.postMessage({
									twitch_protocol: u,
									type: "failure",
									nonce: t,
									error: n
								}, "*")
							},
							o = function(t) {
								e.postMessage({
									twitch_protocol: u,
									type: "message",
									topic: n.topics[0],
									message: t
								}, "*")
							};
						this._driver.Unlisten({
							topic: n.topics[0],
							auth: n.auth_token,
							success: r,
							failure: i,
							message: o
						})
					}
				}, {
					key: "handleConnected",
					value: function() {
						for (var e = 0; e < this._sources.length; e++) this._sources[e].postMessage({
							twitch_protocol: u,
							type: "connected"
						}, "*")
					}
				}, {
					key: "handleDisconnected",
					value: function() {
						for (var e = 0; e < this._sources.length; e++) this._sources[e].postMessage({
							twitch_protocol: u,
							type: "disconnected"
						}, "*")
					}
				}]), e
			}();
		t["default"] = l
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var s = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			u = n(185),
			c = r(u),
			l = n(186),
			f = r(l),
			d = n(187),
			h = r(d),
			p = n(192),
			g = r(p),
			v = n(189),
			_ = r(v),
			y = f["default"]._getLogger("WebsocketClient"),
			m = 3e4,
			b = "response timeout",
			E = 30,
			w = 45e3,
			k = "wss://pubsub-edge.twitch.tv:443/v1",
			O = "wss://pubsub-edge-darklaunch.twitch.tv:443/v1",
			S = "ws://localhost:6900/v1",
			T = function(e) {
				function t(e) {
					i(this, t);
					var n = o(this, Object.getPrototypeOf(t).call(this, e));
					switch (n._opts = e, n._env = e.env, n._stats = e.stats, n._env) {
						case "production":
							n._addr = k;
							break;
						case "darklaunch":
							n._addr = O;
							break;
						case "development":
							n._addr = S;
							break;
						default:
							n._addr = k
					}
					return window.WebSocket ? (n._queuedRequests = [], n._pendingResponses = new _["default"], n._pendingReplayResponses = new _["default"], n._listens = new c["default"], n._replays = new _["default"], n._replaysSize = 0, n._firstConnectTime = n._firstListenTime = 0, n._connectCalled = n._reconnecting = !1, n._primarySocket = new g["default"]({
						stats: n._stats,
						addr: n._addr
					}), n._bindPrimary(n._primarySocket), n) : o(n)
				}
				return a(t, e), s(t, [{
					key: "verify",
					value: function() {
						this._trigger("verified")
					}
				}, {
					key: "connect",
					value: function() {
						window.WebSocket && (this._connectCalled ? this._primarySocket._isReady() && this._trigger("connected") : (this._connectCalled = !0, this._primarySocket.connect()))
					}
				}, {
					key: "_bindPrimary",
					value: function(e) {
						e.on("open", this._onPrimaryOpen, this), e.on("response", this._onResponse, this), e.on("message", this._onMessage, this), e.on("reconnect", this._onReconnect, this), e.on("connection_failure", this._onConnectionFailure, this)
					}
				}, {
					key: "_unbindPrimary",
					value: function(e) {
						e.off("open", this._onPrimaryOpen, this), e.off("response", this._onResponse, this), e.off("message", this._onMessage, this), e.off("reconnect", this._onReconnect, this), e.off("connection_failure", this._onConnectionFailure, this)
					}
				}, {
					key: "_onPrimaryOpen",
					value: function() {
						y.debug("primary open: " + this._primarySocket._id), 0 === this._firstConnectTime && (this._firstConnectTime = h["default"].time.now(), this._firstListenTimeout = setTimeout(this._neverListened.bind(this), w)), this._connected = !0, this._trigger("connected"), this._flushQueuedRequests()
					}
				}, {
					key: "_onResponse",
					value: function(e) {
						if (y.debug("primary response: " + JSON.stringify(e)), this._pendingResponses.has(e.nonce)) {
							var t = this._pendingResponses.get(e.nonce);
							y.debug("responseInfo: " + JSON.stringify(t)), clearTimeout(t.timeout), this._pendingResponses.remove(e.nonce), "" === e.error ? ("LISTEN" === t.message.type ? (0 === this._firstListenTime && (clearTimeout(this._firstListenTimeout), this._firstListenTime = h["default"].time.now(), this._stats.sendStatTimer("time_to_first_listen", this._firstListenTime - this._firstConnectTime, .1)), this._replays.set(e.nonce, {
								nonce: e.nonce,
								message: t.callbacks.message,
								topic: t.topic,
								auth: t.auth
							}), this._listens.on(t.topic, t.callbacks.message, this)) : "UNLISTEN" === t.message.type && (this._replays.remove(e.nonce), this._listens.off(t.topic, t.callbacks.message, this)), t.callbacks.success()) : t.callbacks.failure(e.error)
						}
					}
				}, {
					key: "_onResponseTimeout",
					value: function(e) {
						if (this._pendingResponses.has(e)) {
							var t = this._pendingResponses.get(e);
							this._pendingResponses.remove(e), t.opts.failure(b)
						}
					}
				}, {
					key: "_onMessage",
					value: function(e) {
						y.debug("primary message: " + JSON.stringify(e)), this._listens._trigger(e.data.topic, e.data.message)
					}
				}, {
					key: "_onConnectionFailure",
					value: function() {
						y.debug("connection failure"), this._trigger("disconnected"), this._notifyWhenOpen = !0, this._onReconnect()
					}
				}, {
					key: "_onReconnect",
					value: function() {
						y.debug("reconnecting..."), this._reconnecting = !0, this._backupSocket = new g["default"]({
							stats: this._stats,
							addr: this._addr
						}), this._bindBackup(this._backupSocket), setTimeout(this._backupSocket.connect.bind(this._backupSocket), this._jitteredReconnectDelay())
					}
				}, {
					key: "_bindBackup",
					value: function(e) {
						e.on("open", this._onBackupOpen, this), e.on("response", this._onBackupResponse, this)
					}
				}, {
					key: "_unbindBackup",
					value: function(e) {
						e.off("open", this._onBackupOpen, this), e.off("response", this._onBackupResponse, this)
					}
				}, {
					key: "_onBackupOpen",
					value: function() {
						y.debug("Backup socket opened"), this._replays.size() > 0 ? this._replayBackup() : (this._swapSockets(), this._notifyWhenOpen && (y.debug("triggering connected"), this._notifyWhenOpen = !1, this._trigger("connected")))
					}
				}, {
					key: "_replayBackup",
					value: function() {
						for (var e = this._replays.values(), t = 0; t < e.length; t++) {
							var n = {
								type: "LISTEN",
								nonce: this._generateNonce(),
								data: {
									topics: [e[t].topic],
									auth_token: e[t].auth
								}
							};
							this._pendingReplayResponses.set(n.nonce, !0), this._backupSocket.send(n)
						}
					}
				}, {
					key: "_onBackupResponse",
					value: function(e) {
						this._pendingReplayResponses.has(e.nonce) && "" === e.error && (this._pendingReplayResponses.remove(e.nonce), 0 === this._pendingReplayResponses.size() && (this._swapSockets(), this._notifyWhenOpen && (y.debug("triggering connected"), this._notifyWhenOpen = !1, this._trigger("connected"))))
					}
				}, {
					key: "_swapSockets",
					value: function() {
						y.debug("swapping primary " + this._primarySocket._id + " and backup " + this._backupSocket._id), this._unbindPrimary(this._primarySocket), this._unbindBackup(this._backupSocket), this._bindPrimary(this._backupSocket), this._primarySocket.close(), this._primarySocket = this._backupSocket, this._reconnecting = !1, this._flushQueuedRequests()
					}
				}, {
					key: "Listen",
					value: function(e) {
						if (window.WebSocket) {
							y.debug("listening on " + e.topic);
							var t = this._generateNonce(),
								n = {
									type: "LISTEN",
									nonce: t,
									data: {
										topics: [e.topic],
										auth_token: e.auth
									}
								};
							this._queuedSend(t, n, e)
						}
					}
				}, {
					key: "Unlisten",
					value: function(e) {
						if (window.WebSocket) {
							if (y.debug("unlistening on " + e.topic + "(" + this._listens.count(e.topic) + " listeners)"), this._listens.count(e.topic) > 1) {
								this._listens.off(e.topic, e.message);
								for (var t in this._replays.map())
									if (this._replays.get(t).message === e.message) {
										this._replays.remove(t);
										break
									}
								return e.success(), void y.debug("now have " + this._listens.count(e.topic) + " listeners")
							}
							var n = this._generateNonce(),
								r = {
									type: "UNLISTEN",
									nonce: n,
									data: {
										topics: [e.topic]
									}
								};
							this._queuedSend(n, r, e)
						}
					}
				}, {
					key: "_queuedSend",
					value: function(e, t, n) {
						this._reconnecting || this._primarySocket._isReady() === !1 ? (y.debug("queuing"), this._queuedRequests.push({
							nonce: e,
							msg: t,
							opts: n
						})) : (y.debug("sending immediately"), this._send(e, t, n))
					}
				}, {
					key: "_flushQueuedRequests",
					value: function() {
						for (y.debug("flushing " + this._queuedRequests.length + " listen/unlistens"); this._queuedRequests.length > 0;) {
							var e = this._queuedRequests.shift();
							this._send(e.nonce, e.msg, e.opts)
						}
					}
				}, {
					key: "_send",
					value: function(e, t, n) {
						this._pendingResponses.set(e, {
							timeout: setTimeout(this._onResponseTimeout.bind(this), m, e),
							topic: n.topic,
							auth: n.auth,
							message: t,
							callbacks: {
								success: n.success,
								failure: n.failure,
								message: n.message
							}
						}), this._primarySocket.send(t)
					}
				}, {
					key: "_neverListened",
					value: function() {
						this._stats.sendStatCounter("first_listen_timeout", 1)
					}
				}, {
					key: "_generateNonce",
					value: function() {
						return h["default"].generateString(E)
					}
				}, {
					key: "_jitteredReconnectDelay",
					value: function() {
						return h["default"].randomInt(2e3)
					}
				}]), t
			}(c["default"]);
		t["default"] = T
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" != typeof t && "function" != typeof t ? e : t
		}

		function a(e, t) {
			if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var s = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			u = n(185),
			c = r(u),
			l = n(186),
			f = r(l),
			d = n(187),
			h = r(d),
			p = n(193),
			g = (r(p), f["default"]._getLogger("PubsubSocket")),
			v = 120,
			_ = "not_ready",
			y = 3e4,
			m = 24e4,
			b = 1,
			E = .1,
			w = .1,
			k = function(e) {
				function t(e) {
					i(this, t);
					var n = o(this, Object.getPrototypeOf(t).call(this, e));
					return n._opts = e, n._addr = e.addr, n._stats = e.stats, n._connectionAttempts = 0, n._sentPing = n._receivedPong = !1, n._id = "[" + h["default"].generateString(10) + "] ", window.addEventListener("beforeunload", n._beforeUnload.bind(n)), n
				}
				return a(t, e), s(t, [{
					key: "connect",
					value: function() {
						g.debug(this._id + "connecting to " + this._addr), this._connecting = !0, this._socketConnectTime = h["default"].time.now();
						try {
							this._socket = new WebSocket(this._addr), this._socket.onmessage = this._onMessage.bind(this), this._socket.onerror = this._onError.bind(this), this._socket.onclose = this._onClose.bind(this), this._socket.onopen = this._onOpen.bind(this)
						} catch (e) {
							this._stats.sendStatCounter("socket.error.security_err", b), this._trigger("connection_failure")
						}
					}
				}, {
					key: "close",
					value: function() {
						g.debug(this._id + "closing"), this._closing = !0, this._clearTimeouts(), this._socket.close()
					}
				}, {
					key: "send",
					value: function(e) {
						g.debug(this._id + "sending " + JSON.stringify(e)), this._isReady() ? this._socket.send(JSON.stringify(e)) : this._trigger("error", _)
					}
				}, {
					key: "_isReady",
					value: function() {
						return g.debug(this._id + "_isReady called"), this._socket ? this._socket.readyState === WebSocket.OPEN : !1
					}
				}, {
					key: "_onMessage",
					value: function(e) {
						g.debug(this._id + "received message: " + e.data);
						try {
							var t = JSON.parse(e.data);
							switch (t.type) {
								case "RESPONSE":
									this._trigger("response", t);
									break;
								case "MESSAGE":
									this._trigger("message", t);
									break;
								case "PONG":
									this._receivedPong = !0;
									break;
								case "RECONNECT":
									this._trigger("reconnect")
							}
						} catch (n) {
							this._stats.sendStatLogger("onMessage JSON Parse error: " + n)
						}
					}
				}, {
					key: "_onError",
					value: function(e) {
						g.debug(this._id + "error: " + JSON.stringify(e))
					}
				}, {
					key: "_onClose",
					value: function(e) {
						if (g.debug(this._id + "onClose triggered with code " + e.code + "(closing = " + this._closing + ", connecting = " + this._connecting + ")"), this._clearTimeouts(), this._connecting) {
							var t = Math.pow(2, this._connectionAttempts);
							t > v && (t = v), g.debug(this._id + "reconnecting in " + t + " seconds"), this._connectionAttempts += 1, this._nextConnectionAttempt = setTimeout(this.connect.bind(this), 1e3 * t)
						} else if (this._closing) this._closed = !0, this._trigger("connection_failure");
						else {
							if (this._windowUnloading) return;
							g.debug(this._id + "unexpected close"), this._stats.sendStatCounter("socket.error.unexpected_closed", b), this._stats.sendStatCounter("socket.error.close." + e.code, b);
							var n = "pubsub-js-client unexpected_close. code: " + e.code + ", reason: " + e.reason + ", wasClean: " + e.wasClean;
							this._stats.sendStatLogger(n), this._closed = !0, this._trigger("connection_failure")
						}
					}
				}, {
					key: "_onOpen",
					value: function(e) {
						g.debug(this._id + " socket opened"), this._connectionAttempts = 0, this._connecting = !1, this._socketConnectTime && this._stats.sendStatTimer("socket.connect", h["default"].time.now() - this._socketConnectTime, E), this._stats.sendStatCounter("socket.connection_retries." + this._connectionAttempts, w), this._ping(), this._pingInterval = window.setInterval(this._ping.bind(this), m), this._trigger("open")
					}
				}, {
					key: "_ping",
					value: function() {
						g.debug(this._id + "sending PING");
						try {
							this._socket.send(JSON.stringify({
								type: "PING"
							})), this._sentPing = !0, this._pongTimeout && clearTimeout(this._pongTimeout), this._pongTimeout = setTimeout(this._pongTimedOut.bind(this), y)
						} catch (e) {
							this._stats.sendStatCounter("socket.error.ping_send_error", b), this._stats.sendStatLogger("ping error: closed: " + this._closed + ", error: " + e), this.close()
						}
					}
				}, {
					key: "_pongTimedOut",
					value: function() {
						this._sentPing && !this._receivedPong && (g.debug(this._id + "Pong timed out!"), this._stats.sendStatCounter("socket.error.pong_timed_out", b), this.close())
					}
				}, {
					key: "_clearTimeouts",
					value: function() {
						this._sentPing = this._receivedPong = !1, clearTimeout(this._pongTimeout), clearInterval(this._pingInterval), clearTimeout(this._nextConnectionAttempt)
					}
				}, {
					key: "_beforeUnload",
					value: function() {
						this._windowUnloading = !0
					}
				}]), t
			}(c["default"]);
		t["default"] = k
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			i = "https://client-event-reporter-darklaunch.twitch.tv",
			o = "https://client-event-reporter.twitch.tv",
			a = "pubsub-js-client.darklaunch.",
			s = "pubsub-js-client.production.",
			u = 3e4,
			c = function() {
				function e(t) {
					switch (n(this, e), this._env = t.env, this._env) {
						case "production":
							this._addr = o, this._prefix = s;
							break;
						case "darklaunch":
							this._addr = i, this._prefix = a;
							break;
						default:
							this._addr = i,
								this._prefix = a
					}
				}
				return r(e, [{
					key: "setPrefix",
					value: function(e) {
						this._prefix = e
					}
				}, {
					key: "sendStatCounter",
					value: function(e, t) {
						Math.random() < t && $.ajax({
							type: "POST",
							url: this._addr + "/v1/counter",
							timeout: u,
							data: {
								key: this._prefix + e,
								count: "1",
								sample_rate: t
							}
						})
					}
				}, {
					key: "sendStatTimer",
					value: function(e, t, n) {
						Math.random() < n && $.ajax({
							type: "POST",
							url: this._addr + "/v1/timer",
							timeout: u,
							data: {
								key: this._prefix + e,
								milliseconds: t,
								sample_rate: n
							}
						})
					}
				}, {
					key: "sendStatLogger",
					value: function(e) {
						$.ajax({
							type: "POST",
							url: this._addr + "/v1/logger",
							timeout: u,
							data: {
								log_line: e
							}
						})
					}
				}, {
					key: "sendStatGauge",
					value: function(e) {
						$.ajax({
							type: "POST",
							url: this._addr + "/v1/gauge",
							data: {
								key: e
							}
						})
					}
				}]), e
			}();
		t["default"] = c
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(187),
			s = r(a),
			u = n(193),
			c = (r(u), n(186)),
			l = r(c),
			f = "https://pubster.twitch.tv/publish",
			d = "https://pubster-darklaunch.twitch.tv/publish",
			h = "pubsubtest.unique.",
			p = "pubsubtest.shared." + s["default"].randomInt(2),
			g = 1e-4,
			v = 6e4,
			_ = 3e4,
			y = .1,
			m = 1,
			b = l["default"]._getLogger("PubsubTest"),
			E = function() {
				function e(t) {
					switch (i(this, e), b.debug("PubsubTest enabled"), this._env = t.env, this._driver = t.driver, this._stats = t.stats, this._env) {
						case "production":
							this._addr = f;
							break;
						case "darklaunch":
							this._addr = d;
							break;
						default:
							this._env = "production", this._addr = f
					}
					this._statKeys = {
						uniqueSuccess: "test.unique.success",
						uniqueFailure: "test.unique.failure",
						sharedSuccess: "test.shared.success",
						sharedFailure: "test.shared.failure"
					}, this._uniqueKey = h + s["default"].generateString(20), this._sharedKey = p, this._listeningUnique = this._listeningShared = !1, this.sendListens()
				}
				return o(e, [{
					key: "sendListens",
					value: function() {
						this._driver.Listen({
							topic: this._uniqueKey,
							auth: "",
							success: this._gotUniqueOk.bind(this),
							failure: this._gotUniqueFail.bind(this),
							message: this._gotUniqueMessage.bind(this)
						}), this._driver.Listen({
							topic: this._sharedKey,
							auth: "",
							success: this._gotSharedOk.bind(this),
							failure: this._gotSharedFail.bind(this),
							message: this._gotSharedMessage.bind(this)
						})
					}
				}, {
					key: "_gotUniqueOk",
					value: function() {
						this._listeningUnique = !0, this._listeningShared && this.startTesting()
					}
				}, {
					key: "_gotUniqueFail",
					value: function(e) {}
				}, {
					key: "_gotSharedOk",
					value: function() {
						this._listeningShared = !0, this._listeningUnique && this.startTesting()
					}
				}, {
					key: "_gotSharedFail",
					value: function(e) {}
				}, {
					key: "startTesting",
					value: function() {
						b.debug("startTesting"), this._driver.on("connected", this.resumeTesting, this), this._driver.on("disconnected", this.stopTesting, this), this.checkAndSend(), this._publishInterval = window.setInterval(this.checkAndSend.bind(this), v)
					}
				}, {
					key: "resumeTesting",
					value: function() {
						b.debug("resumeTesting"), this.checkAndSend(), this._publishInterval = window.setInterval(this.checkAndSend.bind(this), v)
					}
				}, {
					key: "stopTesting",
					value: function() {
						b.debug("stopTesting"), clearInterval(this._publishInterval), this._receivedUniqueMessage = this._sentUniqueMessage = !1, this._receivedSharedMessage = this._sentSharedMessage = !1
					}
				}, {
					key: "checkAndSend",
					value: function() {
						b.debug("checkAndSend: unique: sent = " + this._sentUniqueMessage + ", received = " + this._receivedUniqueMessage), !this._receivedUniqueMessage && this._sentUniqueMessage && (b.debug("unique failure"), this._stats.sendStatCounter(this._statKeys.uniqueFailure, m)), !this._receivedSharedMessage && this._sentSharedMessage && (b.debug("shared failure"), this._stats.sendStatCounter(this._statKeys.sharedFailure, m)), this._receivedUniqueMessage = this._sentUniqueMessage = !1, this._receivedSharedMessage = this._sentSharedMessage = !1, this._expectedMessage = s["default"].generateString(30), $.ajax({
							type: "POST",
							url: this._addr,
							contentType: "application/json",
							timeout: _,
							data: JSON.stringify({
								topics: [this._uniqueKey],
								data: this._expectedMessage
							}),
							success: function() {
								b.debug("unique message sent"), this._sentUniqueMessage = !0
							}.bind(this)
						}), this._sentUniqueMessageTime = s["default"].time.now(), Math.random() < g && ($.ajax({
							type: "POST",
							url: this._addr,
							contentType: "application/json",
							timeout: _,
							data: JSON.stringify({
								topics: [this._sharedKey],
								data: this._expectedMessage
							}),
							success: function() {
								b.debug("shared message sent"), this._sentSharedMessage = !0
							}.bind(this)
						}), this._sentSharedMessageTime = s["default"].time.now())
					}
				}, {
					key: "_gotUniqueMessage",
					value: function(e) {
						if (b.debug("received unique message: " + e), e === this._expectedMessage) {
							var t = s["default"].time.now() - this._sentUniqueMessageTime;
							this._receivedUniqueMessage = !0, this._stats.sendStatTimer(this._statKeys.uniqueSuccess, t, y), this._stats.sendStatCounter(this._statKeys.uniqueSuccess, y)
						}
					}
				}, {
					key: "_gotSharedMessage",
					value: function(e) {
						if (e === this._expectedMessage) {
							var t = s["default"].time.now() - this._sentSharedMessageTime;
							this._receivedSharedMessage = !0, this._stats.sendStatTimer(this._statKeys.sharedSuccess, t, y), this._stats.sendStatCounter(this._statKeys.sharedSuccess, y)
						}
					}
				}]), e
			}();
		t["default"] = E
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.FullScreen = t.FULLSCREEN_CHANGE = void 0;
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(196),
			s = r(a),
			u = n(75),
			c = r(u),
			l = t.FULLSCREEN_CHANGE = "fullscreenchange";
		t.FullScreen = function() {
			function e(t) {
				i(this, e), this._root = t, this._eventEmitter = new c["default"]
			}
			return o(e, [{
				key: "addEventListener",
				value: function(e, t) {
					this._eventEmitter.addListener(e, t)
				}
			}, {
				key: "removeEventListener",
				value: function(e, t) {
					this._eventEmitter.removeListener(e, t)
				}
			}, {
				key: "canFullScreen",
				value: function() {
					return s["default"].enabled
				}
			}, {
				key: "isFullScreen",
				value: function() {
					return s["default"].element === this._root
				}
			}, {
				key: "setFullScreen",
				value: function(e) {
					if (this.isFullScreen() !== e) {
						var t = this._onFullScreenChange.bind(this);
						s["default"].toggle(this._root, t, t)
					}
				}
			}, {
				key: "_onFullScreenChange",
				value: function() {
					this._eventEmitter.emit(l)
				}
			}, {
				key: "destroy",
				value: function() {
					this._eventEmitter.removeAllListeners()
				}
			}]), e
		}()
	}, function(e, t, n) {
		var r;
		/*! BigScreen
		 * v2.0.5 - 2015-05-02
		 * 
		 * Copyright 2015 Brad Dougherty <me@brad.is>; MIT License
		 */
		! function(i, o, a) {
			"use strict";

			function s(e) {
				var t = null;
				if ("VIDEO" === e.tagName) t = e;
				else {
					var n = e.getElementsByTagName("video");
					n[0] && (t = n[0])
				}
				return t
			}

			function u(e) {
				var t = s(e);
				if (t && t.webkitEnterFullscreen) {
					try {
						t.readyState < t.HAVE_METADATA ? (t.addEventListener("loadedmetadata", function r() {
							t.removeEventListener("loadedmetadata", r, !1), t.webkitEnterFullscreen(), g = !!t.getAttribute("controls")
						}, !1), t.load()) : (t.webkitEnterFullscreen(), g = !!t.getAttribute("controls")), p = t
					} catch (n) {
						return E("not_supported", e)
					}
					return !0
				}
				return E(void 0 === h.request ? "not_supported" : "not_enabled", e)
			}

			function c() {
				w.element || (b(), f())
			}

			function l() {
				a && "webkitfullscreenchange" === h.change && window.addEventListener("resize", c, !1)
			}

			function f() {
				a && "webkitfullscreenchange" === h.change && window.removeEventListener("resize", c, !1)
			}
			var d = /i(Pad|Phone|Pod)/.test(navigator.userAgent) && parseInt(navigator.userAgent.replace(/^.*OS (\d+)_(\d+).*$/, "$1.$2"), 10) >= 7,
				h = function() {
					var e = o.createElement("video"),
						t = {
							request: ["requestFullscreen", "webkitRequestFullscreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullscreen"],
							exit: ["exitFullscreen", "webkitCancelFullScreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"],
							enabled: ["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullScreenEnabled", "msFullscreenEnabled"],
							element: ["fullscreenElement", "webkitFullscreenElement", "webkitCurrentFullScreenElement", "mozFullScreenElement", "msFullscreenElement"],
							change: ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
							error: ["fullscreenerror", "webkitfullscreenerror", "mozfullscreenerror", "MSFullscreenError"]
						},
						n = {};
					for (var r in t)
						for (var i = 0, a = t[r].length; a > i; i++)
							if (t[r][i] in e || t[r][i] in o || "on" + t[r][i].toLowerCase() in o) {
								n[r] = t[r][i];
								break
							}
					return n
				}(),
				p = null,
				g = null,
				v = function() {},
				_ = [],
				y = !1;
			navigator.userAgent.indexOf("Android") > -1 && navigator.userAgent.indexOf("Chrome") > -1 && (y = parseInt(navigator.userAgent.replace(/^.*Chrome\/(\d+).*$/, "$1"), 10) || !0);
			var m = function(e) {
					var t = _[_.length - 1];
					t && (e !== t.element && e !== p || !t.hasEntered) && ("VIDEO" === e.tagName && (p = e), 1 === _.length && w.onenter(w.element), t.enter.call(t.element, e || t.element), t.hasEntered = !0)
				},
				b = function() {
					!p || g || d || (p.setAttribute("controls", "controls"), p.removeAttribute("controls")), p = null, g = null;
					var e = _.pop();
					e && (e.exit.call(e.element), w.element || (_.forEach(function(e) {
						e.exit.call(e.element)
					}), _ = [], w.onexit()))
				},
				E = function(e, t) {
					if (_.length > 0) {
						var n = _.pop();
						t = t || n.element, n.error.call(t, e), w.onerror(t, e)
					}
				},
				w = {
					request: function(e, t, n, r) {
						if (e = e || o.body, _.push({
								element: e,
								enter: t || v,
								exit: n || v,
								error: r || v
							}), void 0 === h.request) return void u(e);
						if (a && o[h.enabled] === !1) return void u(e);
						if (y !== !1 && 32 > y) return void u(e);
						if (a && void 0 === h.enabled) return h.enabled = "webkitFullscreenEnabled", e[h.request](), void setTimeout(function() {
							o[h.element] ? o[h.enabled] = !0 : (o[h.enabled] = !1, u(e))
						}, 250);
						try {
							e[h.request](), setTimeout(function() {
								o[h.element] || E(a ? "not_enabled" : "not_allowed", e)
							}, 100)
						} catch (i) {
							E("not_enabled", e)
						}
					},
					exit: function() {
						f(), o[h.exit]()
					},
					toggle: function(e, t, n, r) {
						w.element ? w.exit() : w.request(e, t, n, r)
					},
					videoEnabled: function(e) {
						if (w.enabled) return !0;
						e = e || o.body;
						var t = s(e);
						return t && void 0 !== t.webkitSupportsFullscreen ? t.readyState < t.HAVE_METADATA ? "maybe" : t.webkitSupportsFullscreen : !1
					},
					onenter: v,
					onexit: v,
					onchange: v,
					onerror: v
				};
			try {
				Object.defineProperties(w, {
					element: {
						enumerable: !0,
						get: function() {
							return p && p.webkitDisplayingFullscreen ? p : o[h.element] || null
						}
					},
					enabled: {
						enumerable: !0,
						get: function() {
							return "webkitCancelFullScreen" !== h.exit || a ? y !== !1 && 32 > y ? !1 : o[h.enabled] || !1 : !0
						}
					}
				}), h.change && o.addEventListener(h.change, function(e) {
					if (w.onchange(w.element), w.element) {
						var t = _[_.length - 2];
						t && t.element === w.element ? b() : (m(w.element), l())
					} else b()
				}, !1), o.addEventListener("webkitbeginfullscreen", function(e) {
					var t = !0;
					if (_.length > 0)
						for (var n = 0, r = _.length; r > n; n++) {
							var i = s(_[n].element);
							if (i === e.srcElement) {
								t = !1;
								break
							}
						}
					t && _.push({
						element: e.srcElement,
						enter: v,
						exit: v,
						error: v
					}), w.onchange(e.srcElement), m(e.srcElement)
				}, !0), o.addEventListener("webkitendfullscreen", function(e) {
					w.onchange(e.srcElement), b(e.srcElement)
				}, !0), h.error && o.addEventListener(h.error, function(e) {
					E("not_allowed")
				}, !1)
			} catch (k) {
				w.element = null, w.enabled = !1
			}
			r = function() {
				return w
			}.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
		}(this, document, self !== top)
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOADSTART = "loadstart", t.PROGRESS = "progress", t.SUSPEND = "suspend", t.ABORT = "abort", t.ERROR = "error", t.EMPTIED = "emptied", t.STALLED = "stalled", t.LOADED_METADATA = "loadedmetadata", t.LOADED_DATA = "loadeddata", t.CAN_PLAY = "canplay", t.PLAYING = "playing", t.WAITING = "waiting", t.SEEKING = "seeking", t.SEEKED = "seeked", t.ENDED = "ended", t.DURATION_CHANGE = "durationchange", t.TIME_UPDATE = "timeupdate", t.PLAY = "play", t.PAUSE = "pause", t.RESIZE = "resize", t.VOLUME_CHANGE = "volumechange"
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.PLAYER_INIT = "init", t.PLAYBACK_STATISTICS = "playbackStatistics", t.SPECTRE_PLAYLIST = "spectrePlaylist", t.CHANSUB_REQUIRED = "chansubRequired", t.LOADED_CHANNEL = "loadedchannel", t.LOADED_VIDEO = "loadedvideo", t.VIDEO_FAILURE = "videoFailure", t.FORMATS = "videoFormats", t.FORMAT_CHANGED = "videoFormatChanged", t.TIME_CHANGE = "timeChange", t.BUFFER_CHANGE = "bufferChange", t.SEGMENT_CHANGE = "segmentChange", t.USHER_FAIL_ERROR = "usherFail", t.CAPTION_UPDATE = "captions", t.SEEK_FAILED = "seekfailed", t.VIEWER_COUNT = "viewerCount", t.VIEWERS_CHANGE = "viewerschange"
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if (e && e.__esModule) return e;
			var t = {};
			if (null != e)
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t["default"] = e, t
		}

		function i(e) {
			function t(e, t) {
				o.hasOwnProperty(e) && a.set(o[e], JSON.stringify(t), {
					expires: u.httpsQualityCarryover,
					domain: "." + u.domain,
					path: "/",
					secure: !1
				})
			}
			var n = "https:" === location.protocol,
				r = e.get,
				i = e.set,
				o = {
					mature: "salt_mature",
					muted: "salt_muted",
					quality: "salt_quality",
					volume: "salt_volume"
				},
				s = {};
			e.get = function(i, u) {
				var c = r.call(e, i, s),
					l = c === s;
				if (l)
					if (n && o.hasOwnProperty(i) && a.all().hasOwnProperty(o[i])) try {
						c = JSON.parse(a.get(o[i])), e.set(i, c)
					} catch (f) {
						c = u
					} else c = u;
				else t(i, c);
				return c
			}, e.set = function(n, r) {
				var o = i.call(e, n, r);
				return t(n, r), o
			}
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.patch = i;
		var o = n(200),
			a = r(o),
			s = n(66),
			u = r(s)
	}, function(e, t, n) {
		var r;
		! function(i, o) {
			var a = function() {
					return a.get.apply(a, arguments)
				},
				s = a.utils = {
					isArray: Array.isArray || function(e) {
						return "[object Array]" === Object.prototype.toString.call(e)
					},
					isPlainObject: function(e) {
						return !!e && "[object Object]" === Object.prototype.toString.call(e)
					},
					toArray: function(e) {
						return Array.prototype.slice.call(e)
					},
					getKeys: Object.keys || function(e) {
						var t = [],
							n = "";
						for (n in e) e.hasOwnProperty(n) && t.push(n);
						return t
					},
					encode: function(e) {
						return String(e).replace(/[,;"\\=\s%]/g, function(e) {
							return encodeURIComponent(e)
						})
					},
					decode: function(e) {
						return decodeURIComponent(e)
					},
					retrieve: function(e, t) {
						return null == e ? t : e
					}
				};
			a.defaults = {}, a.expiresMultiplier = 86400, a.set = function(e, t, n) {
				if (s.isPlainObject(e))
					for (var r in e) e.hasOwnProperty(r) && this.set(r, e[r], t);
				else {
					n = s.isPlainObject(n) ? n : {
						expires: n
					};
					var a = n.expires !== o ? n.expires : this.defaults.expires || "",
						u = typeof a;
					"string" === u && "" !== a ? a = new Date(a) : "number" === u && (a = new Date(+new Date + 1e3 * this.expiresMultiplier * a)), "" !== a && "toGMTString" in a && (a = ";expires=" + a.toGMTString());
					var c = n.path || this.defaults.path;
					c = c ? ";path=" + c : "";
					var l = n.domain || this.defaults.domain;
					l = l ? ";domain=" + l : "";
					var f = n.secure || this.defaults.secure ? ";secure" : "";
					n.secure === !1 && (f = ""), i.cookie = s.encode(e) + "=" + s.encode(t) + a + c + l + f
				}
				return this
			}, a.setDefault = function(e, t, n) {
				if (s.isPlainObject(e)) {
					for (var r in e) this.get(r) === o && this.set(r, e[r], t);
					return a
				}
				return this.get(e) === o ? this.set.apply(this, arguments) : void 0
			}, a.remove = function(e) {
				e = s.isArray(e) ? e : s.toArray(arguments);
				for (var t = 0, n = e.length; n > t; t++) this.set(e[t], "", -1);
				return this
			}, a.empty = function() {
				return this.remove(s.getKeys(this.all()))
			}, a.get = function(e, t) {
				var n = this.all();
				if (s.isArray(e)) {
					for (var r = {}, i = 0, o = e.length; o > i; i++) {
						var a = e[i];
						r[a] = s.retrieve(n[a], t)
					}
					return r
				}
				return s.retrieve(n[e], t)
			}, a.all = function() {
				if ("" === i.cookie) return {};
				for (var e = i.cookie.split("; "), t = {}, n = 0, r = e.length; r > n; n++) {
					var o = e[n].split("="),
						a = s.decode(o.shift()),
						u = s.decode(o.join("="));
					t[a] = u
				}
				return t
			}, a.enabled = function() {
				if (navigator.cookieEnabled) return !0;
				var e = "_" === a.set("_", "_").get("_");
				return a.remove("_"), e
			}, r = function() {
				return a
			}.call(t, n, t, e), !(r !== o && (e.exports = r))
		}("undefined" == typeof document ? null : document)
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			var t = a(e);
			return function(n, r) {
				n({
					type: m,
					stream: g.nullContentStream
				});
				var i = r(),
					o = i.experiments,
					a = i.usher,
					s = o.get(y.USHER_PROTOCOL);
				return Promise.all([s, u()]).then(function(r) {
					var i = c(r, 2),
						o = i[0],
						s = i[1];
					(0, p.fetchChannelAccessToken)(e, s).then(function(e) {
						n({
							type: m,
							stream: new v.LiveContentStream(t, s, e, (0, f["default"])({}, a, {
								protocol: o
							}))
						})
					})
				})
			}
		}

		function o(e) {
			var t = s(e);
			return function(e, n) {
				e({
					type: m,
					stream: g.nullContentStream
				});
				var r = n(),
					i = r.experiments,
					o = r.usher,
					a = i.get(y.USHER_PROTOCOL);
				return Promise.all([a, u()]).then(function(n) {
					var r = c(n, 2),
						i = r[0],
						a = r[1];
					(0, p.fetchVideoAccessToken)(t, a).then(function(n) {
						e({
							type: m,
							stream: new _.VODContentStream(t, a, n, (0, f["default"])({}, o, {
								protocol: i
							}))
						})
					})
				})
			}
		}

		function a(e) {
			return e.replace(/[^A-Za-z0-9_]/g, "")
		}

		function s(e) {
			return e.replace(/[^A-Za-z0-9_]/g, "")
		}

		function u() {
			return (0, h.fetch)({
				url: d.apiHost + "/api/viewer/token.json",
				xhrFields: {
					withCredentials: !0
				}
			}).then(function(e) {
				return e.token
			}, function() {
				return null
			})
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ACTION_SET_STREAM = void 0;
		var c = function() {
			function e(e, t) {
				var n = [],
					r = !0,
					i = !1,
					o = void 0;
				try {
					for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
				} catch (u) {
					i = !0, o = u
				} finally {
					try {
						!r && s["return"] && s["return"]()
					} finally {
						if (i) throw o
					}
				}
				return n
			}
			return function(t, n) {
				if (Array.isArray(t)) return t;
				if (Symbol.iterator in Object(t)) return e(t, n);
				throw new TypeError("Invalid attempt to destructure non-iterable instance")
			}
		}();
		t.setChannel = i, t.setVideo = o;
		var l = n(139),
			f = r(l),
			d = n(66),
			h = n(202),
			p = n(203),
			g = n(204),
			v = n(205),
			_ = n(206),
			y = n(150),
			m = t.ACTION_SET_STREAM = "set stream"
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e) {
			var t = (0, a["default"])({
				dataType: c,
				timeout: s.apiTimeout
			}, e);
			return e.hasOwnProperty("data") && (t.data = Object.keys(e.data).reduce(function(t, n) {
				return null !== e.data[n] && (t[n] = e.data[n]), t
			}, {})), Promise.resolve($.ajax(t))
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.fetch = i;
		var o = n(139),
			a = r(o),
			s = n(66),
			u = !!("withCredentials" in new XMLHttpRequest),
			c = u ? "json" : "jsonp"
	}, function(e, t, n) {
		"use strict";

		function r(e, t) {
			return (0, a.fetch)({
				url: e,
				data: {
					oauth_token: t
				},
				xhrFields: {
					withCredentials: !0
				}
			})
		}

		function i(e, t) {
			var n = s.apiHost + "/api/vods/" + e.substring(1) + "/access_token";
			return r(n, t)
		}

		function o(e, t) {
			var n = s.apiHost + "/api/channels/" + e + "/access_token";
			return r(n, t)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.fetchAccessToken = r, t.fetchVideoAccessToken = i, t.fetchChannelAccessToken = o;
		var a = n(202),
			s = n(66)
	}, function(e, t) {
		"use strict";

		function n(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			i = t.CONTENT_MODE_NONE = null,
			o = function() {
				function e() {
					n(this, e)
				}
				return r(e, [{
					key: "contentType",
					get: function() {
						return i
					}
				}, {
					key: "channel",
					get: function() {
						return ""
					}
				}, {
					key: "videoId",
					get: function() {
						return ""
					}
				}, {
					key: "streamUrl",
					get: function() {
						return Promise.resolve("")
					}
				}]), e
			}();
		t.nullContentStream = new o
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.LiveContentStream = t.CONTENT_MODE_LIVE = void 0;
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(139),
			s = r(a),
			u = n(4),
			c = r(u),
			l = n(66),
			f = n(203),
			d = t.CONTENT_MODE_LIVE = "live";
		t.LiveContentStream = function() {
			function e(t, n, r, o) {
				i(this, e), this._channelName = t, this._oAuthToken = n, this._accessToken = r, this._usherParams = o
			}
			return o(e, [{
				key: "contentType",
				get: function() {
					return d
				}
			}, {
				key: "channel",
				get: function() {
					return this._channelName
				}
			}, {
				key: "videoId",
				get: function() {
					return ""
				}
			}, {
				key: "streamUrl",
				get: function() {
					var e = this;
					return (0, f.fetchChannelAccessToken)(this._channelName, this._oAuthToken).then(function(t) {
						var n = (0, s["default"])({
							token: t.token,
							sig: t.sig,
							allow_source: !0,
							allow_spectre: !0
						}, (0, c["default"])(e._usherParams, ["protocol"]));
						return Promise.resolve("" + e._usherParams.protocol + l.usherHost + "/api/channel/hls/" + e._channelName.toLowerCase() + ".m3u8?" + $.param(n))
					})
				}
			}]), e
		}()
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				"default": e
			}
		}

		function i(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.VODContentStream = t.CONTENT_MODE_VOD = void 0;
		var o = function() {
				function e(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}
				return function(t, n, r) {
					return n && e(t.prototype, n), r && e(t, r), t
				}
			}(),
			a = n(139),
			s = r(a),
			u = n(4),
			c = r(u),
			l = n(66),
			f = n(203),
			d = t.CONTENT_MODE_VOD = "vod";
		t.VODContentStream = function() {
			function e(t, n, r, o) {
				i(this, e), this._vodId = t, this._oAuthToken = n, this._accessToken = r, this._usherParams = o
			}
			return o(e, [{
				key: "contentType",
				get: function() {
					return d
				}
			}, {
				key: "channel",
				get: function() {
					return ""
				}
			}, {
				key: "videoId",
				get: function() {
					return this._vodId
				}
			}, {
				key: "streamUrl",
				get: function() {
					var e = this;
					return (0, f.fetchVideoAccessToken)(this._vodId, this._oAuthToken).then(function(t) {
						var n = (0, s["default"])({
							nauth: t.token,
							nauthsig: t.sig,
							allow_source: !0,
							allow_spectre: !0
						}, (0, c["default"])(e._usherParams, ["protocol"]));
						return Promise.resolve("" + e._usherParams.protocol + l.usherHost + "/vod/" + e._vodId.substring(1) + ".m3u8?" + $.param(n))
					})
				}
			}]), e
		}()
	}])
});