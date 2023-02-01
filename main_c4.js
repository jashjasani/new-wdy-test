/*! For license information please see app-17efa13459c502f120c7.js.LICENSE.txt */ (() => {
  var t = {
    924(t, e, r) {
      "use strict";
      function n() {}
      r.d(e, { H: () => lR }),
        (n.prototype = {
          on: function (t, e, r) {
            var n = this.e || (this.e = {});
            return (n[t] || (n[t] = [])).push({ fn: e, ctx: r }), this;
          },
          once: function (t, e, r) {
            var n = this;
            function i() {
              n.off(t, i), e.apply(r, arguments);
            }
            return (i._ = e), this.on(t, i, r);
          },
          emit: function (t) {
            for (
              var e = [].slice.call(arguments, 1),
                r = ((this.e || (this.e = {}))[t] || []).slice(),
                n = 0,
                i = r.length;
              n < i;
              n++
            )
              r[n].fn.apply(r[n].ctx, e);
            return this;
          },
          off: function (t, e) {
            var r = this.e || (this.e = {}),
              n = r[t],
              i = [];
            if (n && e)
              for (var s = 0, o = n.length; s < o; s++)
                n[s].fn !== e && n[s].fn._ !== e && i.push(n[s]);
            return i.length ? (r[t] = i) : delete r[t], this;
          },
        });
      var i = n;
      i.TinyEmitter = n;
      var s = function (t) {
        (this.wrap = document.querySelector("[data-router-wrapper]")),
          (this.properties = t),
          (this.Transition = t.transition
            ? new t.transition.class(this.wrap, t.transition.name)
            : null);
      };
      (s.prototype.setup = function () {
        this.onEnter && this.onEnter(),
          this.onEnterCompleted && this.onEnterCompleted();
      }),
        (s.prototype.add = function () {
          this.wrap.insertAdjacentHTML(
            "beforeend",
            this.properties.view.outerHTML
          );
        }),
        (s.prototype.update = function () {
          document.title = this.properties.page.title;
        }),
        (s.prototype.show = function (t) {
          var e = this;
          return new Promise(function (r) {
            try {
              function n(t) {
                e.onEnterCompleted && e.onEnterCompleted(), r();
              }
              return (
                e.update(),
                e.onEnter && e.onEnter(),
                Promise.resolve(
                  e.Transition
                    ? Promise.resolve(e.Transition.show(t)).then(n)
                    : n()
                )
              );
            } catch (i) {
              return Promise.reject(i);
            }
          });
        }),
        (s.prototype.hide = function (t) {
          var e = this;
          return new Promise(function (r) {
            try {
              function n(t) {
                e.onLeaveCompleted && e.onLeaveCompleted(), r();
              }
              return (
                e.onLeave && e.onLeave(),
                Promise.resolve(
                  e.Transition
                    ? Promise.resolve(e.Transition.hide(t)).then(n)
                    : n()
                )
              );
            } catch (i) {
              return Promise.reject(i);
            }
          });
        });
      var o = new window.DOMParser(),
        a = function (t, e) {
          (this.renderers = t), (this.transitions = e);
        };
      (a.prototype.getOrigin = function (t) {
        var e = t.match(/(https?:\/\/[\w\-.]+)/);
        return e ? e[1].replace(/https?:\/\//, "") : null;
      }),
        (a.prototype.getPathname = function (t) {
          var e = t.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
          return e ? e[1] : "/";
        }),
        (a.prototype.getAnchor = function (t) {
          var e = t.match(/(#.*)$/);
          return e ? e[1] : null;
        }),
        (a.prototype.getParams = function (t) {
          var e = t.match(/\?([\w_\-.=&]+)/);
          if (!e) return null;
          for (var r = e[1].split("&"), n = {}, i = 0; i < r.length; i++) {
            var s = r[i].split("=");
            n[s[0]] = s[1];
          }
          return n;
        }),
        (a.prototype.getDOM = function (t) {
          return "string" == typeof t ? o.parseFromString(t, "text/html") : t;
        }),
        (a.prototype.getView = function (t) {
          return t.querySelector("[data-router-view]");
        }),
        (a.prototype.getSlug = function (t) {
          return t.getAttribute("data-router-view");
        }),
        (a.prototype.getRenderer = function (t) {
          if (!this.renderers) return Promise.resolve(s);
          if (t in this.renderers) {
            var e = this.renderers[t];
            return "function" != typeof e || s.isPrototypeOf(e)
              ? "function" == typeof e.then
                ? Promise.resolve(e).then(function (t) {
                    return t.default;
                  })
                : Promise.resolve(e)
              : Promise.resolve(e()).then(function (t) {
                  return t.default;
                });
          }
          return Promise.resolve(s);
        }),
        (a.prototype.getTransition = function (t) {
          return this.transitions
            ? t in this.transitions
              ? { class: this.transitions[t], name: t }
              : "default" in this.transitions
              ? { class: this.transitions.default, name: "default" }
              : null
            : null;
        }),
        (a.prototype.getProperties = function (t) {
          var e = this.getDOM(t),
            r = this.getView(e),
            n = this.getSlug(r);
          return {
            page: e,
            view: r,
            slug: n,
            renderer: this.getRenderer(n, this.renderers),
            transition: this.getTransition(n, this.transitions),
          };
        }),
        (a.prototype.getLocation = function (t) {
          return {
            href: t,
            anchor: this.getAnchor(t),
            origin: this.getOrigin(t),
            params: this.getParams(t),
            pathname: this.getPathname(t),
          };
        });
      var u = (function (t) {
          function e(e) {
            var r = this;
            void 0 === e && (e = {});
            var n = e.renderers,
              i = e.transitions;
            t.call(this),
              (this.Helpers = new a(n, i)),
              (this.Transitions = i),
              (this.Contextual = !1),
              (this.location = this.Helpers.getLocation(
                window.location.href
              )),
              (this.properties = this.Helpers.getProperties(
                document.cloneNode(!0)
              )),
              (this.popping = !1),
              (this.running = !1),
              (this.trigger = null),
              (this.cache = new Map()),
              this.cache.set(this.location.href, this.properties),
              this.properties.renderer.then(function (t) {
                (r.From = new t(r.properties)), r.From.setup();
              }),
              (this._navigate = this.navigate.bind(this)),
              window.addEventListener("popstate", this.popState.bind(this)),
              (this.links = document.querySelectorAll(
                "a:not([target]):not([data-router-disabled])"
              )),
              this.attach(this.links);
          }
          return (
            t && (e.__proto__ = t),
            ((e.prototype = Object.create(t && t.prototype)).constructor = e),
            (e.prototype.attach = function (t) {
              for (var e = 0, r = t; e < r.length; e += 1)
                r[e].addEventListener("click", this._navigate);
            }),
            (e.prototype.detach = function (t) {
              for (var e = 0, r = t; e < r.length; e += 1)
                r[e].removeEventListener("click", this._navigate);
            }),
            (e.prototype.navigate = function (t) {
              if (!t.metaKey && !t.ctrlKey) {
                t.preventDefault();
                var e =
                  !!t.currentTarget.hasAttribute("data-transition") &&
                  t.currentTarget.dataset.transition;
                this.redirect(t.currentTarget.href, e, t.currentTarget);
              }
            }),
            (e.prototype.redirect = function (t, e, r) {
              if (
                (void 0 === e && (e = !1),
                void 0 === r && (r = "script"),
                (this.trigger = r),
                !this.running && t !== this.location.href)
              ) {
                var n = this.Helpers.getLocation(t);
                (this.Contextual = !1),
                  e &&
                    ((this.Contextual =
                      this.Transitions.contextual[e].prototype),
                    (this.Contextual.name = e)),
                  n.origin !== this.location.origin ||
                  (n.anchor && n.pathname === this.location.pathname)
                    ? (window.location.href = t)
                    : ((this.location = n), this.beforeFetch());
              }
            }),
            (e.prototype.popState = function () {
              (this.trigger = "popstate"), (this.Contextual = !1);
              var t = this.Helpers.getLocation(window.location.href);
              this.location.pathname === t.pathname &&
              (this.location.anchor || t.anchor)
                ? (this.location = t)
                : ((this.popping = !0),
                  (this.location = t),
                  this.beforeFetch());
            }),
            (e.prototype.pushState = function () {
              this.popping ||
                window.history.pushState(
                  this.location,
                  "",
                  this.location.href
                );
            }),
            (e.prototype.fetch = function () {
              try {
                var t = this;
                return Promise.resolve(
                  fetch(t.location.href, {
                    mode: "same-origin",
                    method: "GET",
                    headers: { "X-Requested-With": "Highway" },
                    credentials: "same-origin",
                  })
                ).then(function (e) {
                  if (e.status >= 200 && e.status < 300) return e.text();
                  window.location.href = t.location.href;
                });
              } catch (e) {
                return Promise.reject(e);
              }
            }),
            (e.prototype.beforeFetch = function () {
              try {
                var t = this;
                function e() {
                  t.afterFetch();
                }
                t.pushState(),
                  (t.running = !0),
                  t.emit("NAVIGATE_OUT", {
                    from: {
                      page: t.From.properties.page,
                      view: t.From.properties.view,
                    },
                    trigger: t.trigger,
                    location: t.location,
                  });
                var r = { trigger: t.trigger, contextual: t.Contextual },
                  n = t.cache.has(t.location.href)
                    ? Promise.resolve(t.From.hide(r)).then(function () {
                        t.properties = t.cache.get(t.location.href);
                      })
                    : Promise.resolve(
                        Promise.all([t.fetch(), t.From.hide(r)])
                      ).then(function (e) {
                        (t.properties = t.Helpers.getProperties(e[0])),
                          t.cache.set(t.location.href, t.properties);
                      });
                return Promise.resolve(n && n.then ? n.then(e) : e());
              } catch (i) {
                return Promise.reject(i);
              }
            }),
            (e.prototype.afterFetch = function () {
              try {
                var t = this;
                return Promise.resolve(t.properties.renderer).then(function (
                  e
                ) {
                  return (
                    (t.To = new e(t.properties)),
                    t.To.add(),
                    t.emit("NAVIGATE_IN", {
                      to: {
                        page: t.To.properties.page,
                        view: t.To.wrap.lastElementChild,
                      },
                      trigger: t.trigger,
                      location: t.location,
                    }),
                    Promise.resolve(
                      t.To.show({
                        trigger: t.trigger,
                        contextual: t.Contextual,
                      })
                    ).then(function () {
                      (t.popping = !1),
                        (t.running = !1),
                        t.detach(t.links),
                        (t.links = document.querySelectorAll(
                          "a:not([target]):not([data-router-disabled])"
                        )),
                        t.attach(t.links),
                        t.emit("NAVIGATE_END", {
                          to: {
                            page: t.To.properties.page,
                            view: t.To.wrap.lastElementChild,
                          },
                          from: {
                            page: t.From.properties.page,
                            view: t.From.properties.view,
                          },
                          trigger: t.trigger,
                          location: t.location,
                        }),
                        (t.From = t.To),
                        (t.trigger = null);
                    })
                  );
                });
              } catch (e) {
                return Promise.reject(e);
              }
            }),
            e
          );
        })(i),
        l = function (t, e) {
          (this.wrap = t), (this.name = e);
        };
      (l.prototype.show = function (t) {
        var e = this,
          r = t.trigger,
          n = t.contextual,
          i = this.wrap.lastElementChild,
          s = this.wrap.firstElementChild;
        return new Promise(function (t) {
          n
            ? (i.setAttribute("data-transition-in", n.name),
              i.removeAttribute("data-transition-out", n.name),
              n.in && n.in({ to: i, from: s, trigger: r, done: t }))
            : (i.setAttribute("data-transition-in", e.name),
              i.removeAttribute("data-transition-out", e.name),
              e.in && e.in({ to: i, from: s, trigger: r, done: t }));
        });
      }),
        (l.prototype.hide = function (t) {
          var e = this,
            r = t.trigger,
            n = t.contextual,
            i = this.wrap.firstElementChild;
          return new Promise(function (t) {
            n
              ? (i.setAttribute("data-transition-out", n.name),
                i.removeAttribute("data-transition-in", n.name),
                n.out && n.out({ from: i, trigger: r, done: t }))
              : (i.setAttribute("data-transition-out", e.name),
                i.removeAttribute("data-transition-in", e.name),
                e.out && e.out({ from: i, trigger: r, done: t }));
          });
        }),
        console.log("Highway v2.2.0");
      let h = { Core: u, Helpers: a, Renderer: s, Transition: l };
      function c(t) {
        if (void 0 === t)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function f(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      var p,
        d,
        $,
        g,
        m,
        _,
        v,
        D,
        y,
        x,
        b,
        w,
        E,
        C,
        F,
        T,
        A,
        S,
        P,
        k,
        O,
        B,
        L,
        R,
        M,
        z,
        N = {
          autoSleep: 120,
          force3D: "auto",
          nullTargetWarn: 1,
          units: { lineHeight: "" },
        },
        I = { duration: 0.5, overwrite: !1, delay: 0 },
        j = 1e8,
        U = 1e-8,
        Y = 2 * Math.PI,
        X = Y / 4,
        q = 0,
        V = Math.sqrt,
        G = Math.cos,
        W = Math.sin,
        H = function (t) {
          return "string" == typeof t;
        },
        Z = function (t) {
          return "function" == typeof t;
        },
        K = function (t) {
          return "number" == typeof t;
        },
        Q = function (t) {
          return void 0 === t;
        },
        J = function (t) {
          return "object" == typeof t;
        },
        tt = function (t) {
          return !1 !== t;
        },
        te = function () {
          return "undefined" != typeof window;
        },
        tr = function (t) {
          return Z(t) || H(t);
        },
        tn =
          ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        ti = Array.isArray,
        ts = /(?:-?\.?\d|\.)+/gi,
        to = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        ta = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        tu = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        tl = /[+-]=-?[.\d]+/,
        th = /[^,'"\[\]\s]+/gi,
        tc = /[\d.+\-=]+(?:e[-+]\d*)*/i,
        tf = {},
        tp = {},
        td = function (t) {
          return (tp = tO(t, tf)) && ra;
        },
        t$ = function (t, e) {
          return console.warn(
            "Invalid property",
            t,
            "set to",
            e,
            "Missing plugin? gsap.registerPlugin()"
          );
        },
        tg = function (t, e) {
          return !e && console.warn(t);
        },
        tm = function (t, e) {
          return (t && (tf[t] = e) && tp && (tp[t] = e)) || tf;
        },
        t_ = function () {
          return 0;
        },
        tv = {},
        tD = [],
        ty = {},
        t8 = {},
        tx = {},
        t0 = 30,
        tb = [],
        tw = "",
        tE = function (t) {
          var e,
            r,
            n = t[0];
          if ((J(n) || Z(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
            for (r = tb.length; r-- && !tb[r].targetTest(n); );
            e = tb[r];
          }
          for (r = t.length; r--; )
            (t[r] && (t[r]._gsap || (t[r]._gsap = new e5(t[r], e)))) ||
              t.splice(r, 1);
          return t;
        },
        tC = function (t) {
          return t._gsap || tE(ea(t))[0]._gsap;
        },
        t1 = function (t, e, r) {
          return (r = t[e]) && Z(r)
            ? t[e]()
            : (Q(r) && t.getAttribute && t.getAttribute(e)) || r;
        },
        tF = function (t, e) {
          return (t = t.split(",")).forEach(e) || t;
        },
        tT = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        tA = function (t) {
          return Math.round(1e7 * t) / 1e7 || 0;
        },
        t3 = function (t, e) {
          for (var r = e.length, n = 0; 0 > t.indexOf(e[n]) && ++n < r; );
          return n < r;
        },
        t4 = function () {
          var t,
            e,
            r = tD.length,
            n = tD.slice(0);
          for (ty = {}, tD.length = 0, t = 0; t < r; t++)
            (e = n[t]) &&
              e._lazy &&
              (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        tS = function (t, e, r, n) {
          tD.length && t4(), t.render(e, r, n), tD.length && t4();
        },
        t6 = function (t) {
          var e = parseFloat(t);
          return (e || 0 === e) && (t + "").match(th).length < 2
            ? e
            : H(t)
            ? t.trim()
            : t;
        },
        tP = function (t) {
          return t;
        },
        t2 = function (t, e) {
          for (var r in e) r in t || (t[r] = e[r]);
          return t;
        },
        tk = function (t, e) {
          for (var r in e)
            r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
        },
        tO = function (t, e) {
          for (var r in e) t[r] = e[r];
          return t;
        },
        tB = function t(e, r) {
          for (var n in r)
            "__proto__" !== n &&
              "constructor" !== n &&
              "prototype" !== n &&
              (e[n] = J(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
          return e;
        },
        t5 = function (t, e) {
          var r,
            n = {};
          for (r in t) r in e || (n[r] = t[r]);
          return n;
        },
        t7 = function (t) {
          var e = t.parent || A,
            r = t.keyframes ? tk : t2;
          if (tt(t.inherit))
            for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp);
          return t;
        },
        tL = function (t, e, r, n) {
          void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
          var i = e._prev,
            s = e._next;
          i ? (i._next = s) : t[r] === e && (t[r] = s),
            s ? (s._prev = i) : t[n] === e && (t[n] = i),
            (e._next = e._prev = e.parent = null);
        },
        tR = function (t, e) {
          t.parent &&
            (!e || t.parent.autoRemoveChildren) &&
            t.parent.remove(t),
            (t._act = 0);
        },
        tM = function (t, e) {
          if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
          return t;
        },
        tz = function (t) {
          for (var e = t.parent; e && e.parent; )
            (e._dirty = 1), e.totalDuration(), (e = e.parent);
          return t;
        },
        tN = function t(e) {
          return !e || (e._ts && t(e.parent));
        },
        tI = function (t) {
          return t._repeat
            ? tj(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
        },
        tj = function (t, e) {
          var r = Math.floor((t /= e));
          return t && r === t ? r - 1 : r;
        },
        tU = function (t, e) {
          return (
            (t - e._start) * e._ts +
            (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
          );
        },
        tY = function (t) {
          return (t._end = tA(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || U) || 0)
          ));
        },
        tX = function (t, e) {
          var r = t._dp;
          return (
            r &&
              r.smoothChildTiming &&
              t._ts &&
              ((t._start = tA(
                r._time -
                  (t._ts > 0
                    ? e / t._ts
                    : -(
                        ((t._dirty ? t.totalDuration() : t._tDur) - e) /
                        t._ts
                      ))
              )),
              tY(t),
              r._dirty || tM(r, t)),
            t
          );
        },
        tq = function (t, e) {
          var r;
          if (
            ((e._time || (e._initted && !e._dur)) &&
              ((r = tU(t.rawTime(), e)),
              (!e._dur || er(0, e.totalDuration(), r) - e._tTime > U) &&
                e.render(r, !0)),
            tM(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
          ) {
            if (t._dur < t.duration())
              for (r = t; r._dp; )
                r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
            t._zTime = -0.00000001;
          }
        },
        tV = function (t, e, r, n) {
          return (
            e.parent && tR(e),
            (e._start = tA(
              (K(r) ? r : r || t !== A ? tJ(t, r, e) : t._time) + e._delay
            )),
            (e._end = tA(
              e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            (function (t, e, r, n, i) {
              void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
              var s,
                o = t[n];
              if (i) for (s = e[i]; o && o[i] > s; ) o = o._prev;
              o
                ? ((e._next = o._next), (o._next = e))
                : ((e._next = t[r]), (t[r] = e)),
                e._next ? (e._next._prev = e) : (t[n] = e),
                (e._prev = o),
                (e.parent = e._dp = t);
            })(t, e, "_first", "_last", t._sort ? "_start" : 0),
            t9(e) || (t._recent = e),
            n || tq(t, e),
            t
          );
        },
        tG = function (t, e) {
          return (
            (tf.ScrollTrigger || t$("scrollTrigger", e)) &&
            tf.ScrollTrigger.create(e, t)
          );
        },
        tW = function (t, e, r, n) {
          return (
            eI(t, e),
            t._initted
              ? !r &&
                t._pt &&
                ((t._dur && !1 !== t.vars.lazy) ||
                  (!t._dur && t.vars.lazy)) &&
                B !== e1.frame
                ? (tD.push(t), (t._lazy = [e, n]), 1)
                : void 0
              : 1
          );
        },
        tH = function t(e) {
          var r = e.parent;
          return (
            r && r._ts && r._initted && !r._lock && (0 > r.rawTime() || t(r))
          );
        },
        t9 = function (t) {
          var e = t.data;
          return "isFromStart" === e || "isStart" === e;
        },
        tZ = function (t, e, r, n) {
          var i = t._repeat,
            s = tA(e) || 0,
            o = t._tTime / t._tDur;
          return (
            o && !n && (t._time *= s / t._dur),
            (t._dur = s),
            (t._tDur = i
              ? i < 0
                ? 1e10
                : tA(s * (i + 1) + t._rDelay * i)
              : s),
            o && !n ? tX(t, (t._tTime = t._tDur * o)) : t.parent && tY(t),
            r || tM(t.parent, t),
            t
          );
        },
        tK = function (t) {
          return t instanceof eL ? tM(t) : tZ(t, t._dur);
        },
        tQ = { _start: 0, endTime: t_, totalDuration: t_ },
        tJ = function t(e, r, n) {
          var i,
            s,
            o,
            a = e.labels,
            u = e._recent || tQ,
            l = e.duration() >= j ? u.endTime(!1) : e._dur;
          return H(r) && (isNaN(r) || r in a)
            ? ((s = r.charAt(0)),
              (o = "%" === r.substr(-1)),
              (i = r.indexOf("=")),
              "<" === s || ">" === s
                ? (i >= 0 && (r = r.replace(/=/, "")),
                  ("<" === s ? u._start : u.endTime(u._repeat >= 0)) +
                    (parseFloat(r.substr(1)) || 0) *
                      (o ? (i < 0 ? u : n).totalDuration() / 100 : 1))
                : i < 0
                ? (r in a || (a[r] = l), a[r])
                : ((s = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                  o &&
                    n &&
                    (s = (s / 100) * (ti(n) ? n[0] : n).totalDuration()),
                  i > 1 ? t(e, r.substr(0, i - 1), n) + s : l + s))
            : null == r
            ? l
            : +r;
        },
        et = function (t, e, r) {
          var n,
            i,
            s = K(e[1]),
            o = (s ? 2 : 1) + (t < 2 ? 0 : 1),
            a = e[o];
          if ((s && (a.duration = e[1]), (a.parent = r), t)) {
            for (n = a, i = r; i && !("immediateRender" in n); )
              (n = i.vars.defaults || {}),
                (i = tt(i.vars.inherit) && i.parent);
            (a.immediateRender = tt(n.immediateRender)),
              t < 2 ? (a.runBackwards = 1) : (a.startAt = e[o - 1]);
          }
          return new eX(e[0], a, e[o + 1]);
        },
        ee = function (t, e) {
          return t || 0 === t ? e(t) : e;
        },
        er = function (t, e, r) {
          return r < t ? t : r > e ? e : r;
        },
        en = function (t) {
          if ("string" != typeof t) return "";
          var e = tc.exec(t);
          return e ? t.substr(e.index + e[0].length) : "";
        },
        ei = [].slice,
        es = function (t, e) {
          return (
            t &&
            J(t) &&
            "length" in t &&
            ((!e && !t.length) || (t.length - 1 in t && J(t[0]))) &&
            !t.nodeType &&
            t !== S
          );
        },
        eo = function (t, e, r) {
          return (
            void 0 === r && (r = []),
            t.forEach(function (t) {
              var n;
              return (H(t) && !e) || es(t, 1)
                ? (n = r).push.apply(n, ea(t))
                : r.push(t);
            }) || r
          );
        },
        ea = function (t, e, r) {
          return !H(t) || r || (!P && eF())
            ? ti(t)
              ? eo(t, r)
              : es(t)
              ? ei.call(t, 0)
              : t
              ? [t]
              : []
            : ei.call((e || k).querySelectorAll(t), 0);
        },
        eu = function (t) {
          return t.sort(function () {
            return 0.5 - Math.random();
          });
        },
        el = function (t) {
          if (Z(t)) return t;
          var e = J(t) ? t : { each: t },
            r = eP(e.ease),
            n = e.from || 0,
            i = parseFloat(e.base) || 0,
            s = {},
            o = n > 0 && n < 1,
            a = isNaN(n) || o,
            u = e.axis,
            l = n,
            h = n;
          return (
            H(n)
              ? (l = h = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
              : !o && a && ((l = n[0]), (h = n[1])),
            function (t, o, c) {
              var f,
                p,
                d,
                $,
                g,
                m,
                _,
                v,
                D,
                y = (c || e).length,
                x = s[y];
              if (!x) {
                if (!(D = "auto" === e.grid ? 0 : (e.grid || [1, j])[1])) {
                  for (
                    _ = -j;
                    _ < (_ = c[D++].getBoundingClientRect().left) && D < y;

                  );
                  D--;
                }
                for (
                  x = s[y] = [],
                    f = a ? Math.min(D, y) * l - 0.5 : n % D,
                    p = a ? (y * h) / D - 0.5 : (n / D) | 0,
                    _ = 0,
                    v = j,
                    m = 0;
                  m < y;
                  m++
                )
                  (d = (m % D) - f),
                    ($ = p - ((m / D) | 0)),
                    (x[m] = g =
                      u ? Math.abs("y" === u ? $ : d) : V(d * d + $ * $)),
                    g > _ && (_ = g),
                    g < v && (v = g);
                "random" === n && eu(x),
                  (x.max = _ - v),
                  (x.min = v),
                  (x.v = y =
                    (parseFloat(e.amount) ||
                      parseFloat(e.each) *
                        (D > y
                          ? y - 1
                          : u
                          ? "y" === u
                            ? y / D
                            : D
                          : Math.max(D, y / D)) ||
                      0) * ("edges" === n ? -1 : 1)),
                  (x.b = y < 0 ? i - y : i),
                  (x.u = en(e.amount || e.each) || 0),
                  (r = r && y < 0 ? eS(r) : r);
              }
              return (
                (y = (x[t] - x.min) / x.max || 0),
                tA(x.b + (r ? r(y) : y) * x.v) + x.u
              );
            }
          );
        },
        eh = function (t) {
          var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
          return function (r) {
            var n = Math.round(parseFloat(r) / t) * t * e;
            return (n - (n % 1)) / e + (K(r) ? 0 : en(r));
          };
        },
        ec = function (t, e) {
          var r,
            n,
            i = ti(t);
          return (
            !i &&
              J(t) &&
              ((r = i = t.radius || j),
              t.values
                ? ((t = ea(t.values)), (n = !K(t[0])) && (r *= r))
                : (t = eh(t.increment))),
            ee(
              e,
              i
                ? Z(t)
                  ? function (e) {
                      return Math.abs((n = t(e)) - e) <= r ? n : e;
                    }
                  : function (e) {
                      for (
                        var i,
                          s,
                          o = parseFloat(n ? e.x : e),
                          a = parseFloat(n ? e.y : 0),
                          u = j,
                          l = 0,
                          h = t.length;
                        h--;

                      )
                        (i = n
                          ? (i = t[h].x - o) * i + (s = t[h].y - a) * s
                          : Math.abs(t[h] - o)) < u && ((u = i), (l = h));
                      return (
                        (l = !r || u <= r ? t[l] : e),
                        n || l === e || K(e) ? l : l + en(e)
                      );
                    }
                : eh(t)
            )
          );
        },
        ef = function (t, e, r, n) {
          return ee(ti(t) ? !e : !0 === r ? ((r = 0), !1) : !n, function () {
            return ti(t)
              ? t[~~(Math.random() * t.length)]
              : (n =
                  (r = r || 1e-5) < 1
                    ? Math.pow(10, (r + "").length - 2)
                    : 1) &&
                  Math.floor(
                    Math.round(
                      (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                    ) *
                      r *
                      n
                  ) / n;
          });
        },
        ep = function (t, e, r) {
          return ee(r, function (r) {
            return t[~~e(r)];
          });
        },
        ed = function (t) {
          for (
            var e, r, n, i, s = 0, o = "";
            ~(e = t.indexOf("random(", s));

          )
            (n = t.indexOf(")", e)),
              (i = "[" === t.charAt(e + 7)),
              (r = t.substr(e + 7, n - e - 7).match(i ? th : ts)),
              (o +=
                t.substr(s, e - s) +
                ef(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
              (s = n + 1);
          return o + t.substr(s, t.length - s);
        },
        e$ = function (t, e, r, n, i) {
          var s = e - t,
            o = n - r;
          return ee(i, function (e) {
            return r + (((e - t) / s) * o || 0);
          });
        },
        eg = function (t, e, r) {
          var n,
            i,
            s,
            o = t.labels,
            a = j;
          for (n in o)
            (i = o[n] - e) < 0 == !!r &&
              i &&
              a > (i = Math.abs(i)) &&
              ((s = n), (a = i));
          return s;
        },
        em = function (t, e, r) {
          var n,
            i,
            s = t.vars,
            o = s[e];
          if (o)
            return (
              (n = s[e + "Params"]),
              (i = s.callbackScope || t),
              r && tD.length && t4(),
              n ? o.apply(i, n) : o.call(i)
            );
        },
        e_ = function (t) {
          return (
            tR(t),
            t.scrollTrigger && t.scrollTrigger.kill(!1),
            1 > t.progress() && em(t, "onInterrupt"),
            t
          );
        },
        ev = function (t) {
          var e = (t = (!t.name && t.default) || t).name,
            r = Z(t),
            n =
              e && !r && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            i = {
              init: t_,
              render: eQ,
              add: ez,
              kill: rt,
              modifier: eJ,
              rawVars: 0,
            },
            s = {
              targetTest: 0,
              get: 0,
              getSetter: eH,
              aliases: {},
              register: 0,
            };
          if ((eF(), t !== n)) {
            if (t8[e]) return;
            t2(n, t2(t5(t, i), s)),
              tO(n.prototype, tO(i, t5(t, s))),
              (t8[(n.prop = e)] = n),
              t.targetTest && (tb.push(n), (tv[e] = 1)),
              (e =
                ("css" === e
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
          }
          tm(e, n), t.register && t.register(ra, n, rn);
        },
        eD = 255,
        ey = {
          aqua: [0, eD, eD],
          lime: [0, eD, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, eD],
          navy: [0, 0, 128],
          white: [eD, eD, eD],
          olive: [128, 128, 0],
          yellow: [eD, eD, 0],
          orange: [eD, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [eD, 0, 0],
          pink: [eD, 192, 203],
          cyan: [0, eD, eD],
          transparent: [eD, eD, eD, 0],
        },
        e8 = function (t, e, r) {
          return (
            ((6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1
              ? e + (r - e) * t * 6
              : t < 0.5
              ? r
              : 3 * t < 2
              ? e + (r - e) * (2 / 3 - t) * 6
              : e) *
              eD +
              0.5) |
            0
          );
        },
        ex = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            h,
            c,
            f,
            p = t ? (K(t) ? [t >> 16, (t >> 8) & eD, t & eD] : 0) : ey.black;
          if (!p) {
            if (
              ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ey[t])
            )
              p = ey[t];
            else if ("#" === t.charAt(0)) {
              if (
                (t.length < 6 &&
                  ((n = t.charAt(1)),
                  (t =
                    "#" +
                    n +
                    n +
                    (i = t.charAt(2)) +
                    i +
                    (s = t.charAt(3)) +
                    s +
                    (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
                9 === t.length)
              )
                return [
                  (p = parseInt(t.substr(1, 6), 16)) >> 16,
                  (p >> 8) & eD,
                  p & eD,
                  parseInt(t.substr(7), 16) / 255,
                ];
              p = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                (t >> 8) & eD,
                t & eD,
              ];
            } else if ("hsl" === t.substr(0, 3)) {
              if (((p = f = t.match(ts)), e)) {
                if (~t.indexOf("="))
                  return (
                    (p = t.match(to)), r && p.length < 4 && (p[3] = 1), p
                  );
              } else
                (o = (+p[0] % 360) / 360),
                  (a = +p[1] / 100),
                  (n =
                    2 * (u = +p[2] / 100) -
                    (i = u <= 0.5 ? u * (a + 1) : u + a - u * a)),
                  p.length > 3 && (p[3] *= 1),
                  (p[0] = e8(o + 1 / 3, n, i)),
                  (p[1] = e8(o, n, i)),
                  (p[2] = e8(o - 1 / 3, n, i));
            } else p = t.match(ts) || ey.transparent;
            p = p.map(Number);
          }
          return (
            e &&
              !f &&
              ((n = p[0] / eD),
              (u =
                ((l = Math.max(n, (i = p[1] / eD), (s = p[2] / eD))) +
                  (h = Math.min(n, i, s))) /
                2),
              l === h
                ? (o = a = 0)
                : ((c = l - h),
                  (a = u > 0.5 ? c / (2 - l - h) : c / (l + h)),
                  (o =
                    l === n
                      ? (i - s) / c + (i < s ? 6 : 0)
                      : l === i
                      ? (s - n) / c + 2
                      : (n - i) / c + 4),
                  (o *= 60)),
              (p[0] = ~~(o + 0.5)),
              (p[1] = ~~(100 * a + 0.5)),
              (p[2] = ~~(100 * u + 0.5))),
            r && p.length < 4 && (p[3] = 1),
            p
          );
        },
        e0 = function (t) {
          var e = [],
            r = [],
            n = -1;
          return (
            t.split(ew).forEach(function (t) {
              var i = t.match(ta) || [];
              e.push.apply(e, i), r.push((n += i.length + 1));
            }),
            (e.c = r),
            e
          );
        },
        eb = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a = "",
            u = (t + a).match(ew),
            l = e ? "hsla(" : "rgba(",
            h = 0;
          if (!u) return t;
          if (
            ((u = u.map(function (t) {
              return (
                (t = ex(t, e, 1)) &&
                l +
                  (e
                    ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                    : t.join(",")) +
                  ")"
              );
            })),
            r && ((s = e0(t)), (n = r.c).join(a) !== s.c.join(a)))
          )
            for (
              o = (i = t.replace(ew, "1").split(ta)).length - 1;
              h < o;
              h++
            )
              a +=
                i[h] +
                (~n.indexOf(h)
                  ? u.shift() || l + "0,0,0,0)"
                  : (s.length ? s : u.length ? u : r).shift());
          if (!i)
            for (o = (i = t.split(ew)).length - 1; h < o; h++)
              a += i[h] + u[h];
          return a + i[o];
        },
        ew = (function () {
          var t,
            e =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
          for (t in ey) e += "|" + t + "\\b";
          return RegExp(e + ")", "gi");
        })(),
        eE = /hsl[a]?\(/,
        eC = function (t) {
          var e,
            r = t.join(" ");
          if (((ew.lastIndex = 0), ew.test(r)))
            return (
              (e = eE.test(r)),
              (t[1] = eb(t[1], e)),
              (t[0] = eb(t[0], e, e0(t[1]))),
              !0
            );
        },
        e1 =
          ((D = 500),
          (y = 33),
          (b = x = (v = Date.now)()),
          (E = w = 1e3 / 240),
          (C = []),
          (F = function t(e) {
            var r,
              n,
              i,
              s,
              o = v() - b,
              a = !0 === e;
            if (
              (o > D && (x += o - y),
              ((r = (i = (b += o) - x) - E) > 0 || a) &&
                ((s = ++g.frame),
                (m = i - 1e3 * g.time),
                (g.time = i /= 1e3),
                (E += r + (r >= w ? 4 : w - r)),
                (n = 1)),
              a || (p = d(t)),
              n)
            )
              for (_ = 0; _ < C.length; _++) C[_](i, m, s, e);
          }),
          (g = {
            time: 0,
            frame: 0,
            tick: function () {
              F(!0);
            },
            deltaRatio: function (t) {
              return m / (1e3 / (t || 60));
            },
            wake: function () {
              O &&
                (!P &&
                  te() &&
                  ((k = (S = P = window).document || {}),
                  (tf.gsap = ra),
                  (S.gsapVersions || (S.gsapVersions = [])).push(ra.version),
                  td(tp || S.GreenSockGlobals || (!S.gsap && S) || {}),
                  ($ = S.requestAnimationFrame)),
                p && g.sleep(),
                (d =
                  $ ||
                  function (t) {
                    return setTimeout(t, (E - 1e3 * g.time + 1) | 0);
                  }),
                (R = 1),
                F(2));
            },
            sleep: function () {
              ($ ? S.cancelAnimationFrame : clearTimeout)(p),
                (R = 0),
                (d = t_);
            },
            lagSmoothing: function (t, e) {
              y = Math.min(e, (D = t || 1e8), 0);
            },
            fps: function (t) {
              (w = 1e3 / (t || 240)), (E = 1e3 * g.time + w);
            },
            add: function (t) {
              0 > C.indexOf(t) && C.push(t), eF();
            },
            remove: function (t) {
              var e;
              ~(e = C.indexOf(t)) && C.splice(e, 1) && _ >= e && _--;
            },
            _listeners: C,
          })),
        eF = function () {
          return !R && e1.wake();
        },
        eT = {},
        eA = /^[\d.\-M][\d.\-,\s]/,
        e3 = /["']/g,
        e4 = function (t) {
          for (
            var e,
              r,
              n,
              i = {},
              s = t.substr(1, t.length - 3).split(":"),
              o = s[0],
              a = 1,
              u = s.length;
            a < u;
            a++
          )
            (r = s[a]),
              (e = a !== u - 1 ? r.lastIndexOf(",") : r.length),
              (n = r.substr(0, e)),
              (i[o] = isNaN(n) ? n.replace(e3, "").trim() : +n),
              (o = r.substr(e + 1).trim());
          return i;
        },
        eS = function (t) {
          return function (e) {
            return 1 - t(1 - e);
          };
        },
        e6 = function t(e, r) {
          for (var n, i = e._first; i; )
            i instanceof eL
              ? t(i, r)
              : !i.vars.yoyoEase ||
                (i._yoyo && i._repeat) ||
                i._yoyo === r ||
                (i.timeline
                  ? t(i.timeline, r)
                  : ((n = i._ease),
                    (i._ease = i._yEase),
                    (i._yEase = n),
                    (i._yoyo = r))),
              (i = i._next);
        },
        eP = function (t, e) {
          var r, n, i, s, o, a, u;
          return (
            (t &&
              (Z(t)
                ? t
                : eT[t] ||
                  ((u = eT[(a = ((r = t) + "").split("("))[0]]) &&
                  a.length > 1 &&
                  u.config
                    ? u.config.apply(
                        null,
                        ~r.indexOf("{")
                          ? [e4(a[1])]
                          : ((i = (n = r).indexOf("(") + 1),
                            (s = n.indexOf(")")),
                            (o = n.indexOf("(", i)),
                            n.substring(
                              i,
                              ~o && o < s ? n.indexOf(")", s + 1) : s
                            ))
                              .split(",")
                              .map(t6)
                      )
                    : eT._CE && eA.test(r)
                    ? eT._CE("", r)
                    : u))) ||
            e
          );
        },
        e2 = function (t, e, r, n) {
          void 0 === r &&
            (r = function (t) {
              return 1 - e(1 - t);
            }),
            void 0 === n &&
              (n = function (t) {
                return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
              });
          var i,
            s = { easeIn: e, easeOut: r, easeInOut: n };
          return (
            tF(t, function (t) {
              for (var e in ((eT[t] = tf[t] = s),
              (eT[(i = t.toLowerCase())] = r),
              s))
                eT[
                  i +
                    ("easeIn" === e
                      ? ".in"
                      : "easeOut" === e
                      ? ".out"
                      : ".inOut")
                ] = eT[t + "." + e] = s[e];
            }),
            s
          );
        },
        ek = function (t) {
          return function (e) {
            return e < 0.5
              ? (1 - t(1 - 2 * e)) / 2
              : 0.5 + t(2 * (e - 0.5)) / 2;
          };
        },
        eO = function t(e, r, n) {
          var i = r >= 1 ? r : 1,
            s = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
            o = (s / Y) * (Math.asin(1 / i) || 0),
            a = function (t) {
              return 1 === t
                ? 1
                : i * Math.pow(2, -10 * t) * W((t - o) * s) + 1;
            },
            u =
              "out" === e
                ? a
                : "in" === e
                ? function (t) {
                    return 1 - a(1 - t);
                  }
                : ek(a);
          return (
            (s = Y / s),
            (u.config = function (r, n) {
              return t(e, r, n);
            }),
            u
          );
        },
        eB = function t(e, r) {
          void 0 === r && (r = 1.70158);
          var n = function (t) {
              return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
            },
            i =
              "out" === e
                ? n
                : "in" === e
                ? function (t) {
                    return 1 - n(1 - t);
                  }
                : ek(n);
          return (
            (i.config = function (r) {
              return t(e, r);
            }),
            i
          );
        };
      tF("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var r = e < 5 ? e + 1 : e;
        e2(
          t + ",Power" + (r - 1),
          e
            ? function (t) {
                return Math.pow(t, r);
              }
            : function (t) {
                return t;
              },
          function (t) {
            return 1 - Math.pow(1 - t, r);
          },
          function (t) {
            return t < 0.5
              ? Math.pow(2 * t, r) / 2
              : 1 - Math.pow(2 * (1 - t), r) / 2;
          }
        );
      }),
        (eT.Linear.easeNone = eT.none = eT.Linear.easeIn),
        e2("Elastic", eO("in"), eO("out"), eO()),
        (M = 1 / 2.75),
        e2(
          "Bounce",
          function (t) {
            return 1 - z(1 - t);
          },
          (z = function (t) {
            return t < M
              ? 7.5625 * t * t
              : t < 0.7272727272727273
              ? 7.5625 * Math.pow(t - 1.5 / 2.75, 2) + 0.75
              : t < 0.9090909090909092
              ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
              : 7.5625 * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
          })
        ),
        e2("Expo", function (t) {
          return t ? Math.pow(2, 10 * (t - 1)) : 0;
        }),
        e2("Circ", function (t) {
          return -(V(1 - t * t) - 1);
        }),
        e2("Sine", function (t) {
          return 1 === t ? 1 : 1 - G(t * X);
        }),
        e2("Back", eB("in"), eB("out"), eB()),
        (eT.SteppedEase =
          eT.steps =
          tf.SteppedEase =
            {
              config: function (t, e) {
                void 0 === t && (t = 1);
                var r = 1 / t,
                  n = t + (e ? 0 : 1),
                  i = e ? 1 : 0;
                return function (t) {
                  return (((n * er(0, 0.99999999, t)) | 0) + i) * r;
                };
              },
            }),
        (I.ease = eT["quad.out"]),
        tF(
          "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
          function (t) {
            return (tw += t + "," + t + "Params,");
          }
        );
      var e5 = function (t, e) {
          (this.id = q++),
            (t._gsap = this),
            (this.target = t),
            (this.harness = e),
            (this.get = e ? e.get : t1),
            (this.set = e ? e.getSetter : eH);
        },
        e7 = (function () {
          function t(t) {
            (this.vars = t),
              (this._delay = +t.delay || 0),
              (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
              (this._ts = 1),
              tZ(this, +t.duration, 1, 1),
              (this.data = t.data),
              R || e1.wake();
          }
          var e = t.prototype;
          return (
            (e.delay = function (t) {
              return t || 0 === t
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + t - this._delay),
                  (this._delay = t),
                  this)
                : this._delay;
            }),
            (e.duration = function (t) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0
                      ? t + (t + this._rDelay) * this._repeat
                      : t
                  )
                : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
              return arguments.length
                ? ((this._dirty = 0),
                  tZ(
                    this,
                    this._repeat < 0
                      ? t
                      : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (e.totalTime = function (t, e) {
              if ((eF(), !arguments.length)) return this._tTime;
              var r = this._dp;
              if (r && r.smoothChildTiming && this._ts) {
                for (
                  tX(this, t), !r._dp || r.parent || tq(r, this);
                  r && r.parent;

                )
                  r.parent._time !==
                    r._start +
                      (r._ts >= 0
                        ? r._tTime / r._ts
                        : -((r.totalDuration() - r._tTime) / r._ts)) &&
                    r.totalTime(r._tTime, !0),
                    (r = r.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && t < this._tDur) ||
                    (this._ts < 0 && t > 0) ||
                    (!this._tDur && !t)) &&
                  tV(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime === t &&
                  (this._dur || e) &&
                  (!this._initted || Math.abs(this._zTime) !== U) &&
                  (t || this._initted || (!this.add && !this._ptLookup))) ||
                  (this._ts || (this._pTime = t), tS(this, t, e)),
                this
              );
            }),
            (e.time = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), t + tI(this)) %
                      (this._dur + this._rDelay) || (t ? this._dur : 0),
                    e
                  )
                : this._time;
            }),
            (e.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.ratio;
            }),
            (e.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                      tI(this),
                    e
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.ratio;
            }),
            (e.iteration = function (t, e) {
              var r = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (t - 1) * r, e)
                : this._repeat
                ? tj(this._tTime, r) + 1
                : 1;
            }),
            (e.timeScale = function (t) {
              if (!arguments.length)
                return -0.00000001 === this._rts ? 0 : this._rts;
              if (this._rts === t) return this;
              var e =
                this.parent && this._ts
                  ? tU(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +t || 0),
                (this._ts = this._ps || -0.00000001 === t ? 0 : this._rts),
                tz(this.totalTime(er(-this._delay, this._tDur, e), !0)),
                tY(this),
                this
              );
            }),
            (e.paused = function (t) {
              return arguments.length
                ? (this._ps !== t &&
                    ((this._ps = t),
                    t
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (eF(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            Math.abs(this._zTime) !== U &&
                            (this._tTime -= U)
                        ))),
                  this)
                : this._ps;
            }),
            (e.startTime = function (t) {
              if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return (
                  e &&
                    (e._sort || !this.parent) &&
                    tV(e, this, t - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (e.endTime = function (t) {
              return (
                this._start +
                (tt(t) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (e.rawTime = function (t) {
              var e = this.parent || this._dp;
              return e
                ? t &&
                  (!this._ts ||
                    (this._repeat && this._time && 1 > this.totalProgress()))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? tU(e.rawTime(t), this)
                  : this._tTime
                : this._tTime;
            }),
            (e.globalTime = function (t) {
              for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
                (r = e._start + r / (e._ts || 1)), (e = e._dp);
              return r;
            }),
            (e.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t === 1 / 0 ? -2 : t), tK(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (e.repeatDelay = function (t) {
              if (arguments.length) {
                var e = this._time;
                return (this._rDelay = t), tK(this), e ? this.time(e) : this;
              }
              return this._rDelay;
            }),
            (e.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
              return this.totalTime(tJ(this, t), tt(e));
            }),
            (e.restart = function (t, e) {
              return this.play().totalTime(t ? -this._delay : 0, tt(e));
            }),
            (e.play = function (t, e) {
              return (
                null != t && this.seek(t, e), this.reversed(!1).paused(!1)
              );
            }),
            (e.reverse = function (t, e) {
              return (
                null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
              );
            }),
            (e.pause = function (t, e) {
              return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
              return this.paused(!1);
            }),
            (e.reversed = function (t) {
              return arguments.length
                ? (!!t !== this.reversed() &&
                    this.timeScale(-this._rts || (t ? -0.00000001 : 0)),
                  this)
                : this._rts < 0;
            }),
            (e.invalidate = function () {
              return (
                (this._initted = this._act = 0),
                (this._zTime = -0.00000001),
                this
              );
            }),
            (e.isActive = function () {
              var t,
                e = this.parent || this._dp,
                r = this._start;
              return !(
                e &&
                !(
                  this._ts &&
                  this._initted &&
                  e.isActive() &&
                  (t = e.rawTime(!0)) >= r &&
                  t < this.endTime(!0) - U
                )
              );
            }),
            (e.eventCallback = function (t, e, r) {
              var n = this.vars;
              return arguments.length > 1
                ? (e
                    ? ((n[t] = e),
                      r && (n[t + "Params"] = r),
                      "onUpdate" === t && (this._onUpdate = e))
                    : delete n[t],
                  this)
                : n[t];
            }),
            (e.then = function (t) {
              var e = this;
              return new Promise(function (r) {
                var n = Z(t) ? t : tP,
                  i = function () {
                    var t = e.then;
                    (e.then = null),
                      Z(n) &&
                        (n = n(e)) &&
                        (n.then || n === e) &&
                        (e.then = t),
                      r(n),
                      (e.then = t);
                  };
                (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
                (!e._tTime && e._ts < 0)
                  ? i()
                  : (e._prom = i);
              });
            }),
            (e.kill = function () {
              e_(this);
            }),
            t
          );
        })();
      t2(e7.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -0.00000001,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var eL = (function (t) {
        function e(e, r) {
          var n;
          return (
            void 0 === e && (e = {}),
            ((n = t.call(this, e) || this).labels = {}),
            (n.smoothChildTiming = !!e.smoothChildTiming),
            (n.autoRemoveChildren = !!e.autoRemoveChildren),
            (n._sort = tt(e.sortChildren)),
            A && tV(e.parent || A, c(n), r),
            e.reversed && n.reverse(),
            e.paused && n.paused(!0),
            e.scrollTrigger && tG(c(n), e.scrollTrigger),
            n
          );
        }
        f(e, t);
        var r = e.prototype;
        return (
          (r.to = function (t, e, r) {
            return et(0, arguments, this), this;
          }),
          (r.from = function (t, e, r) {
            return et(1, arguments, this), this;
          }),
          (r.fromTo = function (t, e, r, n) {
            return et(2, arguments, this), this;
          }),
          (r.set = function (t, e, r) {
            return (
              (e.duration = 0),
              (e.parent = this),
              t7(e).repeatDelay || (e.repeat = 0),
              (e.immediateRender = !!e.immediateRender),
              new eX(t, e, tJ(this, r), 1),
              this
            );
          }),
          (r.call = function (t, e, r) {
            return tV(this, eX.delayedCall(0, t, e), r);
          }),
          (r.staggerTo = function (t, e, r, n, i, s, o) {
            return (
              (r.duration = e),
              (r.stagger = r.stagger || n),
              (r.onComplete = s),
              (r.onCompleteParams = o),
              (r.parent = this),
              new eX(t, r, tJ(this, i)),
              this
            );
          }),
          (r.staggerFrom = function (t, e, r, n, i, s, o) {
            return (
              (r.runBackwards = 1),
              (t7(r).immediateRender = tt(r.immediateRender)),
              this.staggerTo(t, e, r, n, i, s, o)
            );
          }),
          (r.staggerFromTo = function (t, e, r, n, i, s, o, a) {
            return (
              (n.startAt = r),
              (t7(n).immediateRender = tt(n.immediateRender)),
              this.staggerTo(t, e, n, i, s, o, a)
            );
          }),
          (r.render = function (t, e, r) {
            var n,
              i,
              s,
              o,
              a,
              u,
              l,
              h,
              c,
              f,
              p,
              d,
              $ = this._time,
              g = this._dirty ? this.totalDuration() : this._tDur,
              m = this._dur,
              _ = t <= 0 ? 0 : tA(t),
              v = this._zTime < 0 != t < 0 && (this._initted || !m);
            if (
              (this !== A && _ > g && t >= 0 && (_ = g),
              _ !== this._tTime || r || v)
            ) {
              if (
                ($ !== this._time &&
                  m &&
                  ((_ += this._time - $), (t += this._time - $)),
                (n = _),
                (c = this._start),
                (u = !(h = this._ts)),
                v && (m || ($ = this._zTime), (t || !e) && (this._zTime = t)),
                this._repeat)
              ) {
                if (
                  ((p = this._yoyo),
                  (a = m + this._rDelay),
                  this._repeat < -1 && t < 0)
                )
                  return this.totalTime(100 * a + t, e, r);
                if (
                  ((n = tA(_ % a)),
                  _ === g
                    ? ((o = this._repeat), (n = m))
                    : ((o = ~~(_ / a)) && o === _ / a && ((n = m), o--),
                      n > m && (n = m)),
                  (f = tj(this._tTime, a)),
                  !$ && this._tTime && f !== o && (f = o),
                  p && 1 & o && ((n = m - n), (d = 1)),
                  o !== f && !this._lock)
                ) {
                  var D = p && 1 & f,
                    y = D === (p && 1 & o);
                  if (
                    (o < f && (D = !D),
                    ($ = D ? 0 : m),
                    (this._lock = 1),
                    (this.render($ || (d ? 0 : tA(o * a)), e, !m)._lock = 0),
                    (this._tTime = _),
                    !e && this.parent && em(this, "onRepeat"),
                    this.vars.repeatRefresh &&
                      !d &&
                      (this.invalidate()._lock = 1),
                    ($ && $ !== this._time) ||
                      !this._ts !== u ||
                      (this.vars.onRepeat && !this.parent && !this._act) ||
                      ((m = this._dur),
                      (g = this._tDur),
                      y &&
                        ((this._lock = 2),
                        ($ = D ? m : -0.0001),
                        this.render($, !0),
                        this.vars.repeatRefresh && !d && this.invalidate()),
                      (this._lock = 0),
                      !this._ts && !u))
                  )
                    return this;
                  e6(this, d);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  (l = (function (t, e, r) {
                    var n;
                    if (r > e)
                      for (n = t._first; n && n._start <= r; ) {
                        if (!n._dur && "isPause" === n.data && n._start > e)
                          return n;
                        n = n._next;
                      }
                    else
                      for (n = t._last; n && n._start >= r; ) {
                        if (!n._dur && "isPause" === n.data && n._start < e)
                          return n;
                        n = n._prev;
                      }
                  })(this, tA($), tA(n))) &&
                  (_ -= n - (n = l._start)),
                (this._tTime = _),
                (this._time = n),
                (this._act = !h),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = t),
                  ($ = 0)),
                !$ && n && !e && (em(this, "onStart"), this._tTime !== _))
              )
                return this;
              if (n >= $ && t >= 0)
                for (i = this._first; i; ) {
                  if (
                    ((s = i._next),
                    (i._act || n >= i._start) && i._ts && l !== i)
                  ) {
                    if (i.parent !== this) return this.render(t, e, r);
                    if (
                      (i.render(
                        i._ts > 0
                          ? (n - i._start) * i._ts
                          : (i._dirty ? i.totalDuration() : i._tDur) +
                              (n - i._start) * i._ts,
                        e,
                        r
                      ),
                      n !== this._time || (!this._ts && !u))
                    ) {
                      (l = 0), s && (_ += this._zTime = -0.00000001);
                      break;
                    }
                  }
                  i = s;
                }
              else {
                i = this._last;
                for (var x = t < 0 ? t : n; i; ) {
                  if (
                    ((s = i._prev),
                    (i._act || x <= i._end) && i._ts && l !== i)
                  ) {
                    if (i.parent !== this) return this.render(t, e, r);
                    if (
                      (i.render(
                        i._ts > 0
                          ? (x - i._start) * i._ts
                          : (i._dirty ? i.totalDuration() : i._tDur) +
                              (x - i._start) * i._ts,
                        e,
                        r
                      ),
                      n !== this._time || (!this._ts && !u))
                    ) {
                      (l = 0), s && (_ += this._zTime = x ? -0.00000001 : U);
                      break;
                    }
                  }
                  i = s;
                }
              }
              if (
                l &&
                !e &&
                (this.pause(),
                (l.render(n >= $ ? 0 : -0.00000001)._zTime = n >= $ ? 1 : -1),
                this._ts)
              )
                return (this._start = c), tY(this), this.render(t, e, r);
              this._onUpdate && !e && em(this, "onUpdate", !0),
                ((_ === g && g >= this.totalDuration()) || (!_ && $)) &&
                  ((c !== this._start &&
                    Math.abs(h) === Math.abs(this._ts)) ||
                    this._lock ||
                    ((t || !m) &&
                      ((_ === g && this._ts > 0) || (!_ && this._ts < 0)) &&
                      tR(this, 1),
                    e ||
                      (t < 0 && !$) ||
                      (!_ && !$ && g) ||
                      (em(
                        this,
                        _ === g && t >= 0
                          ? "onComplete"
                          : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(_ < g && this.timeScale() > 0) &&
                        this._prom())));
            }
            return this;
          }),
          (r.add = function (t, e) {
            var r = this;
            if ((K(e) || (e = tJ(this, e, t)), !(t instanceof e7))) {
              if (ti(t))
                return (
                  t.forEach(function (t) {
                    return r.add(t, e);
                  }),
                  this
                );
              if (H(t)) return this.addLabel(t, e);
              if (!Z(t)) return this;
              t = eX.delayedCall(0, t);
            }
            return this !== t ? tV(this, t, e) : this;
          }),
          (r.getChildren = function (t, e, r, n) {
            void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === r && (r = !0),
              void 0 === n && (n = -j);
            for (var i = [], s = this._first; s; )
              s._start >= n &&
                (s instanceof eX
                  ? e && i.push(s)
                  : (r && i.push(s),
                    t && i.push.apply(i, s.getChildren(!0, e, r)))),
                (s = s._next);
            return i;
          }),
          (r.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
              if (e[r].vars.id === t) return e[r];
          }),
          (r.remove = function (t) {
            return H(t)
              ? this.removeLabel(t)
              : Z(t)
              ? this.killTweensOf(t)
              : (tL(this, t),
                t === this._recent && (this._recent = this._last),
                tM(this));
          }),
          (r.totalTime = function (e, r) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = tA(
                    e1.time -
                      (this._ts > 0
                        ? e / this._ts
                        : -((this.totalDuration() - e) / this._ts))
                  )),
                t.prototype.totalTime.call(this, e, r),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (r.addLabel = function (t, e) {
            return (this.labels[t] = tJ(this, e)), this;
          }),
          (r.removeLabel = function (t) {
            return delete this.labels[t], this;
          }),
          (r.addPause = function (t, e, r) {
            var n = eX.delayedCall(0, e || t_, r);
            return (
              (n.data = "isPause"),
              (this._hasPause = 1),
              tV(this, n, tJ(this, t))
            );
          }),
          (r.removePause = function (t) {
            var e = this._first;
            for (t = tJ(this, t); e; )
              e._start === t && "isPause" === e.data && tR(e), (e = e._next);
          }),
          (r.killTweensOf = function (t, e, r) {
            for (var n = this.getTweensOf(t, r), i = n.length; i--; )
              eR !== n[i] && n[i].kill(t, e);
            return this;
          }),
          (r.getTweensOf = function (t, e) {
            for (var r, n = [], i = ea(t), s = this._first, o = K(e); s; )
              s instanceof eX
                ? t3(s._targets, i) &&
                  (o
                    ? (!eR || (s._initted && s._ts)) &&
                      s.globalTime(0) <= e &&
                      s.globalTime(s.totalDuration()) > e
                    : !e || s.isActive()) &&
                  n.push(s)
                : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r),
                (s = s._next);
            return n;
          }),
          (r.tweenTo = function (t, e) {
            e = e || {};
            var r,
              n = this,
              i = tJ(n, t),
              s = e,
              o = s.startAt,
              a = s.onStart,
              u = s.onStartParams,
              l = s.immediateRender,
              h = eX.to(
                n,
                t2(
                  {
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: i,
                    overwrite: "auto",
                    duration:
                      e.duration ||
                      Math.abs(
                        (i - (o && "time" in o ? o.time : n._time)) /
                          n.timeScale()
                      ) ||
                      U,
                    onStart: function () {
                      if ((n.pause(), !r)) {
                        var t =
                          e.duration ||
                          Math.abs(
                            (i - (o && "time" in o ? o.time : n._time)) /
                              n.timeScale()
                          );
                        h._dur !== t &&
                          tZ(h, t, 0, 1).render(h._time, !0, !0),
                          (r = 1);
                      }
                      a && a.apply(h, u || []);
                    },
                  },
                  e
                )
              );
            return l ? h.render(0) : h;
          }),
          (r.tweenFromTo = function (t, e, r) {
            return this.tweenTo(e, t2({ startAt: { time: tJ(this, t) } }, r));
          }),
          (r.recent = function () {
            return this._recent;
          }),
          (r.nextLabel = function (t) {
            return void 0 === t && (t = this._time), eg(this, tJ(this, t));
          }),
          (r.previousLabel = function (t) {
            return void 0 === t && (t = this._time), eg(this, tJ(this, t), 1);
          }),
          (r.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.previousLabel(this._time + U);
          }),
          (r.shiftChildren = function (t, e, r) {
            void 0 === r && (r = 0);
            for (var n, i = this._first, s = this.labels; i; )
              i._start >= r && ((i._start += t), (i._end += t)),
                (i = i._next);
            if (e) for (n in s) s[n] >= r && (s[n] += t);
            return tM(this);
          }),
          (r.invalidate = function () {
            var e = this._first;
            for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (r.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r; )
              (e = r._next), this.remove(r), (r = e);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              t && (this.labels = {}),
              tM(this)
            );
          }),
          (r.totalDuration = function (t) {
            var e,
              r,
              n,
              i = 0,
              s = this,
              o = s._last,
              a = j;
            if (arguments.length)
              return s.timeScale(
                (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                  (s.reversed() ? -t : t)
              );
            if (s._dirty) {
              for (n = s.parent; o; )
                (e = o._prev),
                  o._dirty && o.totalDuration(),
                  (r = o._start) > a && s._sort && o._ts && !s._lock
                    ? ((s._lock = 1), (tV(s, o, r - o._delay, 1)._lock = 0))
                    : (a = r),
                  r < 0 &&
                    o._ts &&
                    ((i -= r),
                    ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                      ((s._start += r / s._ts),
                      (s._time -= r),
                      (s._tTime -= r)),
                    s.shiftChildren(-r, !1, -1 / 0),
                    (a = 0)),
                  o._end > i && o._ts && (i = o._end),
                  (o = e);
              tZ(s, s === A && s._time > i ? s._time : i, 1, 1),
                (s._dirty = 0);
            }
            return s._tDur;
          }),
          (e.updateRoot = function (t) {
            if (
              (A._ts && (tS(A, tU(t, A)), (B = e1.frame)), e1.frame >= t0)
            ) {
              t0 += N.autoSleep || 120;
              var e = A._first;
              if ((!e || !e._ts) && N.autoSleep && e1._listeners.length < 2) {
                for (; e && !e._ts; ) e = e._next;
                e || e1.sleep();
              }
            }
          }),
          e
        );
      })(e7);
      t2(eL.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var eR,
        eM = function (t, e, r, n, i, s, o) {
          var a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $ = new rn(this._pt, t, e, 0, 1, eK, null, i),
            g = 0,
            m = 0;
          for (
            $.b = r,
              $.e = n,
              r += "",
              (p = ~(n += "").indexOf("random(")) && (n = ed(n)),
              s && (s((d = [r, n]), t, e), (r = d[0]), (n = d[1])),
              u = r.match(tu) || [];
            (a = tu.exec(n));

          )
            (h = a[0]),
              (c = n.substring(g, a.index)),
              l ? (l = (l + 1) % 5) : "rgba(" === c.substr(-5) && (l = 1),
              h !== u[m++] &&
                ((f = parseFloat(u[m - 1]) || 0),
                ($._pt = {
                  _next: $._pt,
                  p: c || 1 === m ? c : ",",
                  s: f,
                  c:
                    "=" === h.charAt(1)
                      ? parseFloat(h.substr(2)) *
                        ("-" === h.charAt(0) ? -1 : 1)
                      : parseFloat(h) - f,
                  m: l && l < 4 ? Math.round : 0,
                }),
                (g = tu.lastIndex));
          return (
            ($.c = g < n.length ? n.substring(g, n.length) : ""),
            ($.fp = o),
            (tl.test(n) || p) && ($.e = 0),
            (this._pt = $),
            $
          );
        },
        ez = function (t, e, r, n, i, s, o, a, u) {
          Z(n) && (n = n(i || 0, t, s));
          var l,
            h = t[e],
            c =
              "get" !== r
                ? r
                : Z(h)
                ? u
                  ? t[
                      e.indexOf("set") || !Z(t["get" + e.substr(3)])
                        ? e
                        : "get" + e.substr(3)
                    ](u)
                  : t[e]()
                : h,
            f = Z(h) ? (u ? eG : eV) : eq;
          if (
            (H(n) &&
              (~n.indexOf("random(") && (n = ed(n)),
              "=" === n.charAt(1) &&
                ((l =
                  parseFloat(c) +
                  parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) +
                  (en(c) || 0)) ||
                  0 === l) &&
                (n = l)),
            c !== n)
          )
            return isNaN(c * n) || "" === n
              ? (h || e in t || t$(e, n),
                eM.call(this, t, e, c, n, f, a || N.stringFilter, u))
              : ((l = new rn(
                  this._pt,
                  t,
                  e,
                  +c || 0,
                  n - (c || 0),
                  "boolean" == typeof h ? eZ : e9,
                  0,
                  f
                )),
                u && (l.fp = u),
                o && l.modifier(o, this, t),
                (this._pt = l));
        },
        eN = function (t, e, r, n, i, s) {
          var o, a, u, l;
          if (
            t8[t] &&
            !1 !==
              (o = new t8[t]()).init(
                i,
                o.rawVars
                  ? e[t]
                  : (function (t, e, r, n, i) {
                      if (
                        (Z(t) && (t = ej(t, i, e, r, n)),
                        !J(t) || (t.style && t.nodeType) || ti(t) || tn(t))
                      )
                        return H(t) ? ej(t, i, e, r, n) : t;
                      var s,
                        o = {};
                      for (s in t) o[s] = ej(t[s], i, e, r, n);
                      return o;
                    })(e[t], n, i, s, r),
                r,
                n,
                s
              ) &&
            ((r._pt = a =
              new rn(r._pt, i, t, 0, 1, o.render, o, 0, o.priority)),
            r !== L)
          )
            for (
              u = r._ptLookup[r._targets.indexOf(i)], l = o._props.length;
              l--;

            )
              u[o._props[l]] = a;
          return o;
        },
        eI = function t(e, r) {
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $,
            g = e.vars,
            m = g.ease,
            _ = g.startAt,
            v = g.immediateRender,
            D = g.lazy,
            y = g.onUpdate,
            x = g.onUpdateParams,
            b = g.callbackScope,
            w = g.runBackwards,
            E = g.yoyoEase,
            C = g.keyframes,
            F = g.autoRevert,
            S = e._dur,
            P = e._startAt,
            k = e._targets,
            O = e.parent,
            B = O && "nested" === O.data ? O.parent._targets : k,
            L = "auto" === e._overwrite && !T,
            R = e.timeline;
          if (
            (!R || (C && m) || (m = "none"),
            (e._ease = eP(m, I.ease)),
            (e._yEase = E ? eS(eP(!0 === E ? m : E, I.ease)) : 0),
            E &&
              e._yoyo &&
              !e._repeat &&
              ((E = e._yEase), (e._yEase = e._ease), (e._ease = E)),
            (e._from = !R && !!g.runBackwards),
            !R)
          ) {
            if (
              ((d = (h = k[0] ? tC(k[0]).harness : 0) && g[h.prop]),
              (n = t5(g, tv)),
              P && P.render(-1, !0).kill(),
              _)
            ) {
              if (
                (tR(
                  (e._startAt = eX.set(
                    k,
                    t2(
                      {
                        data: "isStart",
                        overwrite: !1,
                        parent: O,
                        immediateRender: !0,
                        lazy: tt(D),
                        startAt: null,
                        delay: 0,
                        onUpdate: y,
                        onUpdateParams: x,
                        callbackScope: b,
                        stagger: 0,
                      },
                      _
                    )
                  ))
                ),
                !(r < 0) || v || F || e._startAt.render(-1, !0),
                v)
              ) {
                if ((r > 0 && !F && (e._startAt = 0), S && r <= 0))
                  return void (r && (e._zTime = r));
              } else !1 === F && (e._startAt = 0);
            } else if (w && S) {
              if (P) F || (e._startAt = 0);
              else if (
                (r && (v = !1),
                (s = t2(
                  {
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: v && tt(D),
                    immediateRender: v,
                    stagger: 0,
                    parent: O,
                  },
                  n
                )),
                d && (s[h.prop] = d),
                tR((e._startAt = eX.set(k, s))),
                r < 0 && e._startAt.render(-1, !0),
                v)
              ) {
                if (!r) return;
              } else t(e._startAt, U);
            }
            for (
              e._pt = 0, D = (S && tt(D)) || (D && !S), i = 0;
              i < k.length;
              i++
            ) {
              if (
                ((l = (a = k[i])._gsap || tE(k)[i]._gsap),
                (e._ptLookup[i] = f = {}),
                ty[l.id] && tD.length && t4(),
                (p = B === k ? i : B.indexOf(a)),
                h &&
                  !1 !== (c = new h()).init(a, d || n, e, p, B) &&
                  ((e._pt = o =
                    new rn(
                      e._pt,
                      a,
                      c.name,
                      0,
                      1,
                      c.render,
                      c,
                      0,
                      c.priority
                    )),
                  c._props.forEach(function (t) {
                    f[t] = o;
                  }),
                  c.priority && (u = 1)),
                !h || d)
              )
                for (s in n)
                  t8[s] && (c = eN(s, n, e, p, a, B))
                    ? c.priority && (u = 1)
                    : (f[s] = o =
                        ez.call(
                          e,
                          a,
                          s,
                          "get",
                          n[s],
                          p,
                          B,
                          0,
                          g.stringFilter
                        ));
              e._op && e._op[i] && e.kill(a, e._op[i]),
                L &&
                  e._pt &&
                  ((eR = e),
                  A.killTweensOf(a, f, e.globalTime(r)),
                  ($ = !e.parent),
                  (eR = 0)),
                e._pt && D && (ty[l.id] = 1);
            }
            u && rr(e), e._onInit && e._onInit(e);
          }
          (e._onUpdate = y), (e._initted = (!e._op || e._pt) && !$);
        },
        ej = function (t, e, r, n, i) {
          return Z(t)
            ? t.call(e, r, n, i)
            : H(t) && ~t.indexOf("random(")
            ? ed(t)
            : t;
        },
        eU = tw + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        eY = (eU + ",id,stagger,delay,duration,paused,scrollTrigger").split(
          ","
        ),
        eX = (function (t) {
          function e(e, r, n, i) {
            "number" == typeof r && ((n.duration = r), (r = n), (n = null));
            var s,
              o,
              a,
              u,
              l,
              h,
              f,
              p,
              d,
              $ = (s = t.call(this, i ? r : t7(r)) || this).vars,
              g = $.duration,
              m = $.delay,
              _ = $.immediateRender,
              v = $.stagger,
              D = $.overwrite,
              y = $.keyframes,
              x = $.defaults,
              b = $.scrollTrigger,
              w = $.yoyoEase,
              E = r.parent || A,
              C = (ti(e) || tn(e) ? K(e[0]) : "length" in r) ? [e] : ea(e);
            if (
              ((s._targets = C.length
                ? tE(C)
                : tg(
                    "GSAP target " + e + " not found. https://greensock.com",
                    !N.nullTargetWarn
                  ) || []),
              (s._ptLookup = []),
              (s._overwrite = D),
              y || v || tr(g) || tr(m))
            ) {
              if (
                ((r = s.vars),
                (o = s.timeline =
                  new eL({ data: "nested", defaults: x || {} })).kill(),
                (o.parent = o._dp = c(s)),
                (o._start = 0),
                y)
              )
                t7(t2(o.vars.defaults, { ease: "none" })),
                  v
                    ? C.forEach(function (t, e) {
                        return y.forEach(function (r, n) {
                          return o.to(t, r, n ? ">" : e * v);
                        });
                      })
                    : y.forEach(function (t) {
                        return o.to(C, t, ">");
                      });
              else {
                if (((l = C.length), (p = v ? el(v) : t_), J(v)))
                  for (h in v)
                    ~eU.indexOf(h) && (d || (d = {}), (d[h] = v[h]));
                for (a = 0; a < l; a++) {
                  for (h in ((u = {}), r)) 0 > eY.indexOf(h) && (u[h] = r[h]);
                  (u.stagger = 0),
                    w && (u.yoyoEase = w),
                    d && tO(u, d),
                    (f = C[a]),
                    (u.duration = +ej(g, c(s), a, f, C)),
                    (u.delay = (+ej(m, c(s), a, f, C) || 0) - s._delay),
                    !v &&
                      1 === l &&
                      u.delay &&
                      ((s._delay = m = u.delay),
                      (s._start += m),
                      (u.delay = 0)),
                    o.to(f, u, p(a, f, C));
                }
                o.duration() ? (g = m = 0) : (s.timeline = 0);
              }
              g || s.duration((g = o.duration()));
            } else s.timeline = 0;
            return (
              !0 !== D || T || ((eR = c(s)), A.killTweensOf(C), (eR = 0)),
              tV(E, c(s), n),
              r.reversed && s.reverse(),
              r.paused && s.paused(!0),
              (_ ||
                (!g &&
                  !y &&
                  s._start === tA(E._time) &&
                  tt(_) &&
                  tN(c(s)) &&
                  "nested" !== E.data)) &&
                ((s._tTime = -0.00000001), s.render(Math.max(0, -m))),
              b && tG(c(s), b),
              s
            );
          }
          f(e, t);
          var r = e.prototype;
          return (
            (r.render = function (t, e, r) {
              var n,
                i,
                s,
                o,
                a,
                u,
                l,
                h,
                c,
                f = this._time,
                p = this._tDur,
                d = this._dur,
                $ = t > p - U && t >= 0 ? p : t < U ? 0 : t;
              if (d) {
                if (
                  $ !== this._tTime ||
                  !t ||
                  r ||
                  (!this._initted && this._tTime) ||
                  (this._startAt && this._zTime < 0 != t < 0)
                ) {
                  if (((n = $), (h = this.timeline), this._repeat)) {
                    if (((o = d + this._rDelay), this._repeat < -1 && t < 0))
                      return this.totalTime(100 * o + t, e, r);
                    if (
                      ((n = tA($ % o)),
                      $ === p
                        ? ((s = this._repeat), (n = d))
                        : ((s = ~~($ / o)) && s === $ / o && ((n = d), s--),
                          n > d && (n = d)),
                      (u = this._yoyo && 1 & s) &&
                        ((c = this._yEase), (n = d - n)),
                      (a = tj(this._tTime, o)),
                      n === f && !r && this._initted)
                    )
                      return this;
                    s !== a &&
                      (h && this._yEase && e6(h, u),
                      !this.vars.repeatRefresh ||
                        u ||
                        this._lock ||
                        ((this._lock = r = 1),
                        (this.render(tA(o * s), !0).invalidate()._lock = 0)));
                  }
                  if (!this._initted) {
                    if (tW(this, t < 0 ? t : n, r, e))
                      return (this._tTime = 0), this;
                    if (d !== this._dur) return this.render(t, e, r);
                  }
                  if (
                    ((this._tTime = $),
                    (this._time = n),
                    !this._act &&
                      this._ts &&
                      ((this._act = 1), (this._lazy = 0)),
                    (this.ratio = l = (c || this._ease)(n / d)),
                    this._from && (this.ratio = l = 1 - l),
                    n && !f && !e && (em(this, "onStart"), this._tTime !== $))
                  )
                    return this;
                  for (i = this._pt; i; ) i.r(l, i.d), (i = i._next);
                  (h &&
                    h.render(
                      t < 0 ? t : !n && u ? -0.00000001 : h._dur * l,
                      e,
                      r
                    )) ||
                    (this._startAt && (this._zTime = t)),
                    this._onUpdate &&
                      !e &&
                      (t < 0 &&
                        this._startAt &&
                        this._startAt.render(t, !0, r),
                      em(this, "onUpdate")),
                    this._repeat &&
                      s !== a &&
                      this.vars.onRepeat &&
                      !e &&
                      this.parent &&
                      em(this, "onRepeat"),
                    ($ !== this._tDur && $) ||
                      this._tTime !== $ ||
                      (t < 0 &&
                        this._startAt &&
                        !this._onUpdate &&
                        this._startAt.render(t, !0, !0),
                      (t || !d) &&
                        (($ === this._tDur && this._ts > 0) ||
                          (!$ && this._ts < 0)) &&
                        tR(this, 1),
                      !e &&
                        (!(t < 0) || f) &&
                        ($ || f) &&
                        (em(
                          this,
                          $ === p ? "onComplete" : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !($ < p && this.timeScale() > 0) &&
                          this._prom()));
                }
              } else
                !(function (t, e, r, n) {
                  var i,
                    s,
                    o,
                    a = t.ratio,
                    u =
                      e < 0 ||
                      (!e &&
                        ((!t._start && tH(t) && (t._initted || !t9(t))) ||
                          ((t._ts < 0 || t._dp._ts < 0) && !t9(t))))
                        ? 0
                        : 1,
                    l = t._rDelay,
                    h = 0;
                  if (
                    (l &&
                      t._repeat &&
                      ((h = er(0, t._tDur, e)),
                      (s = tj(h, l)),
                      (o = tj(t._tTime, l)),
                      t._yoyo && 1 & s && (u = 1 - u),
                      s !== o &&
                        ((a = 1 - u),
                        t.vars.repeatRefresh &&
                          t._initted &&
                          t.invalidate())),
                    u !== a || n || t._zTime === U || (!e && t._zTime))
                  ) {
                    if (!t._initted && tW(t, e, n, r)) return;
                    for (
                      o = t._zTime,
                        t._zTime = e || (r ? U : 0),
                        r || (r = e && !o),
                        t.ratio = u,
                        t._from && (u = 1 - u),
                        t._time = 0,
                        t._tTime = h,
                        i = t._pt;
                      i;

                    )
                      i.r(u, i.d), (i = i._next);
                    t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                      t._onUpdate && !r && em(t, "onUpdate"),
                      h && t._repeat && !r && t.parent && em(t, "onRepeat"),
                      (e >= t._tDur || e < 0) &&
                        t.ratio === u &&
                        (u && tR(t, 1),
                        r ||
                          (em(t, u ? "onComplete" : "onReverseComplete", !0),
                          t._prom && t._prom()));
                  } else t._zTime || (t._zTime = e);
                })(this, t, e, r);
              return this;
            }),
            (r.targets = function () {
              return this._targets;
            }),
            (r.invalidate = function () {
              return (
                (this._pt =
                  this._op =
                  this._startAt =
                  this._onUpdate =
                  this._lazy =
                  this.ratio =
                    0),
                (this._ptLookup = []),
                this.timeline && this.timeline.invalidate(),
                t.prototype.invalidate.call(this)
              );
            }),
            (r.kill = function (t, e) {
              if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
                return (
                  (this._lazy = this._pt = 0), this.parent ? e_(this) : this
                );
              if (this.timeline) {
                var r = this.timeline.totalDuration();
                return (
                  this.timeline.killTweensOf(
                    t,
                    e,
                    eR && !0 !== eR.vars.overwrite
                  )._first || e_(this),
                  this.parent &&
                    r !== this.timeline.totalDuration() &&
                    tZ(this, (this._dur * this.timeline._tDur) / r, 0, 1),
                  this
                );
              }
              var n,
                i,
                s,
                o,
                a,
                u,
                l,
                h = this._targets,
                c = t ? ea(t) : h,
                f = this._ptLookup,
                p = this._pt;
              if (
                (!e || "all" === e) &&
                (function (t, e) {
                  for (
                    var r = t.length, n = r === e.length;
                    n && r-- && t[r] === e[r];

                  );
                  return r < 0;
                })(h, c)
              )
                return "all" === e && (this._pt = 0), e_(this);
              for (
                n = this._op = this._op || [],
                  "all" !== e &&
                    (H(e) &&
                      ((a = {}),
                      tF(e, function (t) {
                        return (a[t] = 1);
                      }),
                      (e = a)),
                    (e = (function (t, e) {
                      var r,
                        n,
                        i,
                        s,
                        o = t[0] ? tC(t[0]).harness : 0,
                        a = o && o.aliases;
                      if (!a) return e;
                      for (n in ((r = tO({}, e)), a))
                        if ((n in r))
                          for (i = (s = a[n].split(",")).length; i--; )
                            r[s[i]] = r[n];
                      return r;
                    })(h, e))),
                  l = h.length;
                l--;

              )
                if (~c.indexOf(h[l]))
                  for (a in ((i = f[l]),
                  "all" === e
                    ? ((n[l] = e), (o = i), (s = {}))
                    : ((s = n[l] = n[l] || {}), (o = e)),
                  o))
                    (u = i && i[a]) &&
                      (("kill" in u.d && !0 !== u.d.kill(a)) ||
                        tL(this, u, "_pt"),
                      delete i[a]),
                      "all" !== s && (s[a] = 1);
              return this._initted && !this._pt && p && e_(this), this;
            }),
            (e.to = function (t, r) {
              return new e(t, r, arguments[2]);
            }),
            (e.from = function (t, e) {
              return et(1, arguments);
            }),
            (e.delayedCall = function (t, r, n, i) {
              return new e(r, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: r,
                onReverseComplete: r,
                onCompleteParams: n,
                onReverseCompleteParams: n,
                callbackScope: i,
              });
            }),
            (e.fromTo = function (t, e, r) {
              return et(2, arguments);
            }),
            (e.set = function (t, r) {
              return (
                (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r)
              );
            }),
            (e.killTweensOf = function (t, e, r) {
              return A.killTweensOf(t, e, r);
            }),
            e
          );
        })(e7);
      t2(eX.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        tF("staggerTo,staggerFrom,staggerFromTo", function (t) {
          eX[t] = function () {
            var e = new eL(),
              r = ei.call(arguments, 0);
            return (
              r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
            );
          };
        });
      var eq = function (t, e, r) {
          return (t[e] = r);
        },
        eV = function (t, e, r) {
          return t[e](r);
        },
        eG = function (t, e, r, n) {
          return t[e](n.fp, r);
        },
        eW = function (t, e, r) {
          return t.setAttribute(e, r);
        },
        eH = function (t, e) {
          return Z(t[e]) ? eV : Q(t[e]) && t.setAttribute ? eW : eq;
        },
        e9 = function (t, e) {
          return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
        },
        eZ = function (t, e) {
          return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        eK = function (t, e) {
          var r = e._pt,
            n = "";
          if (!t && e.b) n = e.b;
          else if (1 === t && e.e) n = e.e;
          else {
            for (; r; )
              (n =
                r.p +
                (r.m
                  ? r.m(r.s + r.c * t)
                  : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
                n),
                (r = r._next);
            n += e.c;
          }
          e.set(e.t, e.p, n, e);
        },
        eQ = function (t, e) {
          for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
        },
        eJ = function (t, e, r, n) {
          for (var i, s = this._pt; s; )
            (i = s._next), s.p === n && s.modifier(t, e, r), (s = i);
        },
        rt = function (t) {
          for (var e, r, n = this._pt; n; )
            (r = n._next),
              (n.p !== t || n.op) && n.op !== t
                ? n.dep || (e = 1)
                : tL(this, n, "_pt"),
              (n = r);
          return !e;
        },
        re = function (t, e, r, n) {
          n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
        },
        rr = function (t) {
          for (var e, r, n, i, s = t._pt; s; ) {
            for (e = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
            (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s),
              (s._next = r) ? (r._prev = s) : (i = s),
              (s = e);
          }
          t._pt = n;
        },
        rn = (function () {
          function t(t, e, r, n, i, s, o, a, u) {
            (this.t = e),
              (this.s = n),
              (this.c = i),
              (this.p = r),
              (this.r = s || e9),
              (this.d = o || this),
              (this.set = a || eq),
              (this.pr = u || 0),
              (this._next = t),
              t && (t._prev = this);
          }
          return (
            (t.prototype.modifier = function (t, e, r) {
              (this.mSet = this.mSet || this.set),
                (this.set = re),
                (this.m = t),
                (this.mt = r),
                (this.tween = e);
            }),
            t
          );
        })();
      tF(
        tw +
          "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (t) {
          return (tv[t] = 1);
        }
      ),
        (tf.TweenMax = tf.TweenLite = eX),
        (tf.TimelineLite = tf.TimelineMax = eL),
        (A = new eL({
          sortChildren: !1,
          defaults: I,
          autoRemoveChildren: !0,
          id: "root",
          smoothChildTiming: !0,
        })),
        (N.stringFilter = eC);
      var ri = {
        registerPlugin: function () {
          for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          e.forEach(function (t) {
            return ev(t);
          });
        },
        timeline: function (t) {
          return new eL(t);
        },
        getTweensOf: function (t, e) {
          return A.getTweensOf(t, e);
        },
        getProperty: function (t, e, r, n) {
          H(t) && (t = ea(t)[0]);
          var i = tC(t || {}).get,
            s = r ? tP : t6;
          return (
            "native" === r && (r = ""),
            t
              ? e
                ? s(((t8[e] && t8[e].get) || i)(t, e, r, n))
                : function (e, r, n) {
                    return s(((t8[e] && t8[e].get) || i)(t, e, r, n));
                  }
              : t
          );
        },
        quickSetter: function (t, e, r) {
          if ((t = ea(t)).length > 1) {
            var n = t.map(function (t) {
                return ra.quickSetter(t, e, r);
              }),
              i = n.length;
            return function (t) {
              for (var e = i; e--; ) n[e](t);
            };
          }
          t = t[0] || {};
          var s = t8[e],
            o = tC(t),
            a = (o.harness && (o.harness.aliases || {})[e]) || e,
            u = s
              ? function (e) {
                  var n = new s();
                  (L._pt = 0),
                    n.init(t, r ? e + r : e, L, 0, [t]),
                    n.render(1, n),
                    L._pt && eQ(1, L);
                }
              : o.set(t, a);
          return s
            ? u
            : function (e) {
                return u(t, a, r ? e + r : e, o, 1);
              };
        },
        isTweening: function (t) {
          return A.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
          return t && t.ease && (t.ease = eP(t.ease, I.ease)), tB(I, t || {});
        },
        config: function (t) {
          return tB(N, t || {});
        },
        registerEffect: function (t) {
          var e = t.name,
            r = t.effect,
            n = t.plugins,
            i = t.defaults,
            s = t.extendTimeline;
          (n || "").split(",").forEach(function (t) {
            return (
              t &&
              !t8[t] &&
              !tf[t] &&
              tg(e + " effect requires " + t + " plugin.")
            );
          }),
            (tx[e] = function (t, e, n) {
              return r(ea(t), t2(e || {}, i), n);
            }),
            s &&
              (eL.prototype[e] = function (t, r, n) {
                return this.add(tx[e](t, J(r) ? r : (n = r) && {}, this), n);
              });
        },
        registerEase: function (t, e) {
          eT[t] = eP(e);
        },
        parseEase: function (t, e) {
          return arguments.length ? eP(t, e) : eT;
        },
        getById: function (t) {
          return A.getById(t);
        },
        exportRoot: function (t, e) {
          void 0 === t && (t = {});
          var r,
            n,
            i = new eL(t);
          for (
            i.smoothChildTiming = tt(t.smoothChildTiming),
              A.remove(i),
              i._dp = 0,
              i._time = i._tTime = A._time,
              r = A._first;
            r;

          )
            (n = r._next),
              (!e &&
                !r._dur &&
                r instanceof eX &&
                r.vars.onComplete === r._targets[0]) ||
                tV(i, r, r._start - r._delay),
              (r = n);
          return tV(A, i, 0), i;
        },
        utils: {
          wrap: function t(e, r, n) {
            var i = r - e;
            return ti(e)
              ? ep(e, t(0, e.length), r)
              : ee(n, function (t) {
                  return ((i + ((t - e) % i)) % i) + e;
                });
          },
          wrapYoyo: function t(e, r, n) {
            var i = r - e,
              s = 2 * i;
            return ti(e)
              ? ep(e, t(0, e.length - 1), r)
              : ee(n, function (t) {
                  return (
                    e + ((t = (s + ((t - e) % s)) % s || 0) > i ? s - t : t)
                  );
                });
          },
          distribute: el,
          random: ef,
          snap: ec,
          normalize: function (t, e, r) {
            return e$(t, e, 0, 1, r);
          },
          getUnit: en,
          clamp: function (t, e, r) {
            return ee(r, function (r) {
              return er(t, e, r);
            });
          },
          splitColor: ex,
          toArray: ea,
          selector: function (t) {
            return (
              (t = ea(t)[0] || tg("Invalid scope") || {}),
              function (e) {
                var r = t.current || t.nativeElement || t;
                return ea(
                  e,
                  r.querySelectorAll
                    ? r
                    : r === t
                    ? tg("Invalid scope") || k.createElement("div")
                    : t
                );
              }
            );
          },
          mapRange: e$,
          pipe: function () {
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            return function (t) {
              return e.reduce(function (t, e) {
                return e(t);
              }, t);
            };
          },
          unitize: function (t, e) {
            return function (r) {
              return t(parseFloat(r)) + (e || en(r));
            };
          },
          interpolate: function t(e, r, n, i) {
            var s = isNaN(e + r)
              ? 0
              : function (t) {
                  return (1 - t) * e + t * r;
                };
            if (!s) {
              var o,
                a,
                u,
                l,
                h,
                c = H(e),
                f = {};
              if ((!0 === n && (i = 1) && (n = null), c))
                (e = { p: e }), (r = { p: r });
              else if (ti(e) && !ti(r)) {
                for (u = [], h = (l = e.length) - 2, a = 1; a < l; a++)
                  u.push(t(e[a - 1], e[a]));
                l--,
                  (s = function (t) {
                    var e = Math.min(h, ~~(t *= l));
                    return u[e](t - e);
                  }),
                  (n = r);
              } else i || (e = tO(ti(e) ? [] : {}, e));
              if (!u) {
                for (o in r) ez.call(f, e, o, "get", r[o]);
                s = function (t) {
                  return eQ(t, f) || (c ? e.p : e);
                };
              }
            }
            return ee(n, s);
          },
          shuffle: eu,
        },
        install: td,
        effects: tx,
        ticker: e1,
        updateRoot: eL.updateRoot,
        plugins: t8,
        globalTimeline: A,
        core: {
          PropTween: rn,
          globals: tm,
          Tween: eX,
          Timeline: eL,
          Animation: e7,
          getCache: tC,
          _removeLinkedListItem: tL,
          suppressOverwrites: function (t) {
            return (T = t);
          },
        },
      };
      tF("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return (ri[t] = eX[t]);
      }),
        e1.add(eL.updateRoot),
        (L = ri.to({}, { duration: 0 }));
      var rs = function (t, e) {
          for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
            r = r._next;
          return r;
        },
        ro = function (t, e) {
          return {
            name: t,
            rawVars: 1,
            init: function (t, r, n) {
              n._onInit = function (t) {
                var n, i;
                if (
                  (H(r) &&
                    ((n = {}),
                    tF(r, function (t) {
                      return (n[t] = 1);
                    }),
                    (r = n)),
                  e)
                ) {
                  for (i in ((n = {}), r)) n[i] = e(r[i]);
                  r = n;
                }
                !(function (t, e) {
                  var r,
                    n,
                    i,
                    s = t._targets;
                  for (r in e)
                    for (n = s.length; n--; )
                      (i = t._ptLookup[n][r]) &&
                        (i = i.d) &&
                        (i._pt && (i = rs(i, r)),
                        i && i.modifier && i.modifier(e[r], t, s[n], r));
                })(t, r);
              };
            },
          };
        },
        ra =
          ri.registerPlugin(
            {
              name: "attr",
              init: function (t, e, r, n, i) {
                var s, o;
                for (s in e)
                  (o = this.add(
                    t,
                    "setAttribute",
                    (t.getAttribute(s) || 0) + "",
                    e[s],
                    n,
                    i,
                    0,
                    0,
                    s
                  )) && (o.op = s),
                    this._props.push(s);
              },
            },
            {
              name: "endArray",
              init: function (t, e) {
                for (var r = e.length; r--; ) this.add(t, r, t[r] || 0, e[r]);
              },
            },
            ro("roundProps", eh),
            ro("modifiers"),
            ro("snap", ec)
          ) || ri;
      (eX.version = eL.version = ra.version = "3.8.0"),
        (O = 1),
        te() && eF(),
        eT.Power0,
        eT.Power1,
        eT.Power2,
        eT.Power3,
        eT.Power4,
        eT.Linear,
        eT.Quad,
        eT.Cubic,
        eT.Quart,
        eT.Quint,
        eT.Strong,
        eT.Elastic,
        eT.Back,
        eT.SteppedEase,
        eT.Bounce,
        eT.Sine,
        eT.Expo,
        eT.Circ;
      var ru,
        rl,
        rh,
        rc,
        rf,
        rp,
        rd,
        r$ = {},
        rg = 180 / Math.PI,
        rm = Math.PI / 180,
        r_ = Math.atan2,
        rv = /([A-Z])/g,
        rD = /(?:left|right|width|margin|padding|x)/i,
        ry = /[\s,\(]\S/,
        r8 = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        rx = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        r0 = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        rb = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
          );
        },
        rw = function (t, e) {
          var r = e.s + e.c * t;
          e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        rE = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        rC = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        r1 = function (t, e, r) {
          return (t.style[e] = r);
        },
        rF = function (t, e, r) {
          return t.style.setProperty(e, r);
        },
        rT = function (t, e, r) {
          return (t._gsap[e] = r);
        },
        rA = function (t, e, r) {
          return (t._gsap.scaleX = t._gsap.scaleY = r);
        },
        r3 = function (t, e, r, n, i) {
          var s = t._gsap;
          (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
        },
        r4 = function (t, e, r, n, i) {
          var s = t._gsap;
          (s[e] = r), s.renderTransform(i, s);
        },
        rS = "transform",
        r6 = rS + "Origin",
        rP = function (t, e) {
          var r = rl.createElementNS
            ? rl.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(
                  /^https/,
                  "http"
                ),
                t
              )
            : rl.createElement(t);
          return r.style ? r : rl.createElement(t);
        },
        r2 = function t(e, r, n) {
          var i = getComputedStyle(e);
          return (
            i[r] ||
            i.getPropertyValue(r.replace(rv, "-$1").toLowerCase()) ||
            i.getPropertyValue(r) ||
            (!n && t(e, rO(r) || r, 1)) ||
            ""
          );
        },
        rk = "O,Moz,ms,Ms,Webkit".split(","),
        rO = function (t, e, r) {
          var n = (e || rf).style,
            i = 5;
          if (t in n && !r) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            i-- && !(rk[i] + t in n);

          );
          return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? rk[i] : "") + t;
        },
        rB = function () {
          "undefined" != typeof window &&
            window.document &&
            ((rh = (rl = (ru = window).document).documentElement),
            (rf = rP("div") || { style: {} }),
            rP("div"),
            (r6 = (rS = rO(rS)) + "Origin"),
            (rf.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (rd = !!rO("perspective")),
            (rc = 1));
        },
        r5 = function t(e) {
          var r,
            n = rP(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            i = this.parentNode,
            s = this.nextSibling,
            o = this.style.cssText;
          if (
            (rh.appendChild(n),
            n.appendChild(this),
            (this.style.display = "block"),
            e)
          )
            try {
              (r = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (a) {}
          else this._gsapBBox && (r = this._gsapBBox());
          return (
            i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
            rh.removeChild(n),
            (this.style.cssText = o),
            r
          );
        },
        r7 = function (t, e) {
          for (var r = e.length; r--; )
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
        },
        rL = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (r) {
            e = r5.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === r5 ||
              (e = r5.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +r7(t, ["x", "cx", "x1"]) || 0,
                  y: +r7(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        rR = function (t) {
          return !(
            !t.getCTM ||
            (t.parentNode && !t.ownerSVGElement) ||
            !rL(t)
          );
        },
        rM = function (t, e) {
          if (e) {
            var r = t.style;
            e in r$ && e !== r6 && (e = rS),
              r.removeProperty
                ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                    (e = "-" + e),
                  r.removeProperty(e.replace(rv, "-$1").toLowerCase()))
                : r.removeAttribute(e);
          }
        },
        rz = function (t, e, r, n, i, s) {
          var o = new rn(t._pt, e, r, 0, 1, s ? rC : rE);
          return (t._pt = o), (o.b = n), (o.e = i), t._props.push(r), o;
        },
        rN = { deg: 1, rad: 1, turn: 1 },
        rI = function t(e, r, n, i) {
          var s,
            o,
            a,
            u,
            l = parseFloat(n) || 0,
            h = (n + "").trim().substr((l + "").length) || "px",
            c = rf.style,
            f = rD.test(r),
            p = "svg" === e.tagName.toLowerCase(),
            d = (p ? "client" : "offset") + (f ? "Width" : "Height"),
            $ = "px" === i,
            g = "%" === i;
          return i === h || !l || rN[i] || rN[h]
            ? l
            : ("px" === h || $ || (l = t(e, r, n, "px")),
              (u = e.getCTM && rR(e)),
              (g || "%" === h) && (r$[r] || ~r.indexOf("adius"))
                ? ((s = u ? e.getBBox()[f ? "width" : "height"] : e[d]),
                  tT(g ? (l / s) * 100 : (l / 100) * s))
                : ((c[f ? "width" : "height"] = 100 + ($ ? h : i)),
                  (o =
                    ~r.indexOf("adius") || ("em" === i && e.appendChild && !p)
                      ? e
                      : e.parentNode),
                  u && (o = (e.ownerSVGElement || {}).parentNode),
                  (o && o !== rl && o.appendChild) || (o = rl.body),
                  (a = o._gsap) && g && a.width && f && a.time === e1.time
                    ? tT((l / a.width) * 100)
                    : ((g || "%" === h) && (c.position = r2(e, "position")),
                      o === e && (c.position = "static"),
                      o.appendChild(rf),
                      (s = rf[d]),
                      o.removeChild(rf),
                      (c.position = "absolute"),
                      f &&
                        g &&
                        (((a = tC(o)).time = e1.time), (a.width = o[d])),
                      tT($ ? (s * l) / 100 : s && l ? (100 / s) * l : 0))));
        },
        rj = function (t, e, r, n) {
          var i;
          return (
            rc || rB(),
            e in r8 &&
              "transform" !== e &&
              ~(e = r8[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            r$[e] && "transform" !== e
              ? ((i = rK(t, n)),
                (i =
                  "transformOrigin" !== e
                    ? i[e]
                    : i.svg
                    ? i.origin
                    : rQ(r2(t, r6)) + " " + i.zOrigin + "px"))
              : (!(i = t.style[e]) ||
                  "auto" === i ||
                  n ||
                  ~(i + "").indexOf("calc(")) &&
                (i =
                  (rq[e] && rq[e](t, e, r)) ||
                  r2(t, e) ||
                  t1(t, e) ||
                  ("opacity" === e ? 1 : 0)),
            r && !~(i + "").trim().indexOf(" ") ? rI(t, e, i, r) + r : i
          );
        },
        rU = function (t, e, r, n) {
          if (!r || "none" === r) {
            var i = rO(e, t, 1),
              s = i && r2(t, i, 1);
            s && s !== r
              ? ((e = i), (r = s))
              : "borderColor" === e && (r = r2(t, "borderTopColor"));
          }
          var o,
            a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $,
            g,
            m,
            _ = new rn(this._pt, t.style, e, 0, 1, eK),
            v = 0,
            D = 0;
          if (
            ((_.b = r),
            (_.e = n),
            (r += ""),
            "auto" == (n += "") &&
              ((t.style[e] = n), (n = r2(t, e) || n), (t.style[e] = r)),
            eC((o = [r, n])),
            (n = o[1]),
            (u = (r = o[0]).match(ta) || []),
            (n.match(ta) || []).length)
          ) {
            for (; (a = ta.exec(n)); )
              (f = a[0]),
                (d = n.substring(v, a.index)),
                h
                  ? (h = (h + 1) % 5)
                  : ("rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5)) ||
                    (h = 1),
                f !== (c = u[D++] || "") &&
                  ((l = parseFloat(c) || 0),
                  (g = c.substr((l + "").length)),
                  (m = "=" === f.charAt(1) ? +(f.charAt(0) + "1") : 0) &&
                    (f = f.substr(2)),
                  (p = parseFloat(f)),
                  ($ = f.substr((p + "").length)),
                  (v = ta.lastIndex - $.length),
                  $ ||
                    (($ = $ || N.units[e] || g),
                    v === n.length && ((n += $), (_.e += $))),
                  g !== $ && (l = rI(t, e, c, $) || 0),
                  (_._pt = {
                    _next: _._pt,
                    p: d || 1 === D ? d : ",",
                    s: l,
                    c: m ? m * p : p - l,
                    m: (h && h < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            _.c = v < n.length ? n.substring(v, n.length) : "";
          } else _.r = "display" === e && "none" === n ? rC : rE;
          return tl.test(n) && (_.e = 0), (this._pt = _), _;
        },
        rY = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        rX = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var r,
              n,
              i,
              s = e.t,
              o = s.style,
              a = e.u,
              u = s._gsap;
            if ("all" === a || !0 === a) (o.cssText = ""), (n = 1);
            else
              for (i = (a = a.split(",")).length; --i > -1; )
                r$[(r = a[i])] &&
                  ((n = 1), (r = "transformOrigin" === r ? r6 : rS)),
                  rM(s, r);
            n &&
              (rM(s, rS),
              u &&
                (u.svg && s.removeAttribute("transform"),
                rK(s, 1),
                (u.uncache = 1)));
          }
        },
        rq = {
          clearProps: function (t, e, r, n, i) {
            if ("isFromStart" !== i.data) {
              var s = (t._pt = new rn(t._pt, e, r, 0, 0, rX));
              return (
                (s.u = n), (s.pr = -10), (s.tween = i), t._props.push(r), 1
              );
            }
          },
        },
        rV = [1, 0, 0, 1, 0, 0],
        rG = {},
        rW = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        rH = function (t) {
          var e = r2(t, rS);
          return rW(e) ? rV : e.substr(7).match(to).map(tT);
        },
        r9 = function (t, e) {
          var r,
            n,
            i,
            s,
            o = t._gsap || tC(t),
            a = t.style,
            u = rH(t);
          return o.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (u = [
                (i = t.transform.baseVal.consolidate().matrix).a,
                i.b,
                i.c,
                i.d,
                i.e,
                i.f,
              ]).join(",")
              ? rV
              : u
            : (u !== rV ||
                t.offsetParent ||
                t === rh ||
                o.svg ||
                ((i = a.display),
                (a.display = "block"),
                ((r = t.parentNode) && t.offsetParent) ||
                  ((s = 1), (n = t.nextSibling), rh.appendChild(t)),
                (u = rH(t)),
                i ? (a.display = i) : rM(t, "display"),
                s &&
                  (n
                    ? r.insertBefore(t, n)
                    : r
                    ? r.appendChild(t)
                    : rh.removeChild(t))),
              e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
        },
        rZ = function (t, e, r, n, i, s) {
          var o,
            a,
            u,
            l = t._gsap,
            h = i || r9(t, !0),
            c = l.xOrigin || 0,
            f = l.yOrigin || 0,
            p = l.xOffset || 0,
            d = l.yOffset || 0,
            $ = h[0],
            g = h[1],
            m = h[2],
            _ = h[3],
            v = h[4],
            D = h[5],
            y = e.split(" "),
            x = parseFloat(y[0]) || 0,
            b = parseFloat(y[1]) || 0;
          r
            ? h !== rV &&
              (a = $ * _ - g * m) &&
              ((u = x * (-g / a) + b * ($ / a) - ($ * D - g * v) / a),
              (x = x * (_ / a) + b * (-m / a) + (m * D - _ * v) / a),
              (b = u))
            : ((x =
                (o = rL(t)).x +
                (~y[0].indexOf("%") ? (x / 100) * o.width : x)),
              (b =
                o.y +
                (~(y[1] || y[0]).indexOf("%") ? (b / 100) * o.height : b))),
            n || (!1 !== n && l.smooth)
              ? ((v = x - c),
                (D = b - f),
                (l.xOffset = p + (v * $ + D * m) - v),
                (l.yOffset = d + (v * g + D * _) - D))
              : (l.xOffset = l.yOffset = 0),
            (l.xOrigin = x),
            (l.yOrigin = b),
            (l.smooth = !!n),
            (l.origin = e),
            (l.originIsAbsolute = !!r),
            (t.style[r6] = "0px 0px"),
            s &&
              (rz(s, l, "xOrigin", c, x),
              rz(s, l, "yOrigin", f, b),
              rz(s, l, "xOffset", p, l.xOffset),
              rz(s, l, "yOffset", d, l.yOffset)),
            t.setAttribute("data-svg-origin", x + " " + b);
        },
        rK = function (t, e) {
          var r = t._gsap || new e5(t);
          if ("x" in r && !e && !r.uncache) return r;
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $,
            g,
            m,
            _,
            v,
            D,
            y,
            x,
            b,
            w,
            E,
            C,
            F,
            T,
            A,
            S,
            P,
            k,
            O,
            B,
            L = t.style,
            R = r.scaleX < 0,
            M = r2(t, r6) || "0";
          return (
            (n = i = s = u = l = h = c = f = p = 0),
            (o = a = 1),
            (r.svg = !(!t.getCTM || !rR(t))),
            (g = r9(t, r.svg)),
            r.svg &&
              ((C =
                (!r.uncache || "0px 0px" === M) &&
                !e &&
                t.getAttribute("data-svg-origin")),
              rZ(t, C || M, !!C || r.originIsAbsolute, !1 !== r.smooth, g)),
            (d = r.xOrigin || 0),
            ($ = r.yOrigin || 0),
            g !== rV &&
              ((D = g[0]),
              (y = g[1]),
              (x = g[2]),
              (b = g[3]),
              (n = w = g[4]),
              (i = E = g[5]),
              6 === g.length
                ? ((o = Math.sqrt(D * D + y * y)),
                  (a = Math.sqrt(b * b + x * x)),
                  (u = D || y ? r_(y, D) * rg : 0),
                  (c = x || b ? r_(x, b) * rg + u : 0) &&
                    (a *= Math.abs(Math.cos(c * rm))),
                  r.svg &&
                    ((n -= d - (d * D + $ * x)), (i -= $ - (d * y + $ * b))))
                : ((B = g[6]),
                  (k = g[7]),
                  (A = g[8]),
                  (S = g[9]),
                  (P = g[10]),
                  (O = g[11]),
                  (n = g[12]),
                  (i = g[13]),
                  (s = g[14]),
                  (l = (m = r_(B, P)) * rg),
                  m &&
                    ((C = w * (_ = Math.cos(-m)) + A * (v = Math.sin(-m))),
                    (F = E * _ + S * v),
                    (T = B * _ + P * v),
                    (A = -(w * v) + A * _),
                    (S = -(E * v) + S * _),
                    (P = -(B * v) + P * _),
                    (O = -(k * v) + O * _),
                    (w = C),
                    (E = F),
                    (B = T)),
                  (h = (m = r_(-x, P)) * rg),
                  m &&
                    ((_ = Math.cos(-m)),
                    (O = b * (v = Math.sin(-m)) + O * _),
                    (D = C = D * _ - A * v),
                    (y = F = y * _ - S * v),
                    (x = T = x * _ - P * v)),
                  (u = (m = r_(y, D)) * rg),
                  m &&
                    ((C = D * (_ = Math.cos(m)) + y * (v = Math.sin(m))),
                    (F = w * _ + E * v),
                    (y = y * _ - D * v),
                    (E = E * _ - w * v),
                    (D = C),
                    (w = F)),
                  l &&
                    Math.abs(l) + Math.abs(u) > 359.9 &&
                    ((l = u = 0), (h = 180 - h)),
                  (o = tT(Math.sqrt(D * D + y * y + x * x))),
                  (a = tT(Math.sqrt(E * E + B * B))),
                  (c = Math.abs((m = r_(w, E))) > 2e-4 ? m * rg : 0),
                  (p = O ? 1 / (O < 0 ? -O : O) : 0)),
              r.svg &&
                ((C = t.getAttribute("transform")),
                (r.forceCSS =
                  t.setAttribute("transform", "") || !rW(r2(t, rS))),
                C && t.setAttribute("transform", C))),
            Math.abs(c) > 90 &&
              270 > Math.abs(c) &&
              (R
                ? ((o *= -1),
                  (c += u <= 0 ? 180 : -180),
                  (u += u <= 0 ? 180 : -180))
                : ((a *= -1), (c += c <= 0 ? 180 : -180))),
            (r.x =
              n -
              ((r.xPercent =
                n &&
                (r.xPercent ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-n)
                    ? -50
                    : 0)))
                ? (t.offsetWidth * r.xPercent) / 100
                : 0) +
              "px"),
            (r.y =
              i -
              ((r.yPercent =
                i &&
                (r.yPercent ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-i)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * r.yPercent) / 100
                : 0) +
              "px"),
            (r.z = s + "px"),
            (r.scaleX = tT(o)),
            (r.scaleY = tT(a)),
            (r.rotation = tT(u) + "deg"),
            (r.rotationX = tT(l) + "deg"),
            (r.rotationY = tT(h) + "deg"),
            (r.skewX = c + "deg"),
            (r.skewY = f + "deg"),
            (r.transformPerspective = p + "px"),
            (r.zOrigin = parseFloat(M.split(" ")[2]) || 0) && (L[r6] = rQ(M)),
            (r.xOffset = r.yOffset = 0),
            (r.force3D = N.force3D),
            (r.renderTransform = r.svg ? nn : rd ? nr : nt),
            (r.uncache = 0),
            r
          );
        },
        rQ = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        rJ = function (t, e, r) {
          var n = en(e);
          return tT(parseFloat(e) + parseFloat(rI(t, "x", r + "px", n))) + n;
        },
        nt = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            nr(t, e);
        },
        ne = "0deg",
        nr = function (t, e) {
          var r = e || this,
            n = r.xPercent,
            i = r.yPercent,
            s = r.x,
            o = r.y,
            a = r.z,
            u = r.rotation,
            l = r.rotationY,
            h = r.rotationX,
            c = r.skewX,
            f = r.skewY,
            p = r.scaleX,
            d = r.scaleY,
            $ = r.transformPerspective,
            g = r.force3D,
            m = r.target,
            _ = r.zOrigin,
            v = "",
            D = ("auto" === g && t && 1 !== t) || !0 === g;
          if (_ && (h !== ne || l !== ne)) {
            var y,
              x = parseFloat(l) * rm,
              b = Math.sin(x),
              w = Math.cos(x);
            (y = Math.cos((x = parseFloat(h) * rm))),
              (s = rJ(m, s, -(b * y * _))),
              (o = rJ(m, o, -(-Math.sin(x) * _))),
              (a = rJ(m, a, -(w * y * _) + _));
          }
          "0px" !== $ && (v += "perspective(" + $ + ") "),
            (n || i) && (v += "translate(" + n + "%, " + i + "%) "),
            (D || "0px" !== s || "0px" !== o || "0px" !== a) &&
              (v +=
                "0px" !== a || D
                  ? "translate3d(" + s + ", " + o + ", " + a + ") "
                  : "translate(" + s + ", " + o + ") "),
            u !== ne && (v += "rotate(" + u + ") "),
            l !== ne && (v += "rotateY(" + l + ") "),
            h !== ne && (v += "rotateX(" + h + ") "),
            (c === ne && f === ne) || (v += "skew(" + c + ", " + f + ") "),
            (1 === p && 1 === d) || (v += "scale(" + p + ", " + d + ") "),
            (m.style[rS] = v || "translate(0, 0)");
        },
        nn = function (t, e) {
          var r,
            n,
            i,
            s,
            o,
            a = e || this,
            u = a.xPercent,
            l = a.yPercent,
            h = a.x,
            c = a.y,
            f = a.rotation,
            p = a.skewX,
            d = a.skewY,
            $ = a.scaleX,
            g = a.scaleY,
            m = a.target,
            _ = a.xOrigin,
            v = a.yOrigin,
            D = a.xOffset,
            y = a.yOffset,
            x = a.forceCSS,
            b = parseFloat(h),
            w = parseFloat(c);
          (f = parseFloat(f)),
            (p = parseFloat(p)),
            (d = parseFloat(d)) && ((p += d = parseFloat(d)), (f += d)),
            f || p
              ? ((f *= rm),
                (p *= rm),
                (r = Math.cos(f) * $),
                (n = Math.sin(f) * $),
                (i = -(Math.sin(f - p) * g)),
                (s = Math.cos(f - p) * g),
                p &&
                  ((d *= rm),
                  (i *= o = Math.sqrt(1 + (o = Math.tan(p - d)) * o)),
                  (s *= o),
                  d &&
                    ((r *= o = Math.sqrt(1 + (o = Math.tan(d)) * o)),
                    (n *= o))),
                (r = tT(r)),
                (n = tT(n)),
                (i = tT(i)),
                (s = tT(s)))
              : ((r = $), (s = g), (n = i = 0)),
            ((b && !~(h + "").indexOf("px")) ||
              (w && !~(c + "").indexOf("px"))) &&
              ((b = rI(m, "x", h, "px")), (w = rI(m, "y", c, "px"))),
            (_ || v || D || y) &&
              ((b = tT(b + _ - (_ * r + v * i) + D)),
              (w = tT(w + v - (_ * n + v * s) + y))),
            (u || l) &&
              ((b = tT(b + (u / 100) * (o = m.getBBox()).width)),
              (w = tT(w + (l / 100) * o.height))),
            (o =
              "matrix(" +
              r +
              "," +
              n +
              "," +
              i +
              "," +
              s +
              "," +
              b +
              "," +
              w +
              ")"),
            m.setAttribute("transform", o),
            x && (m.style[rS] = o);
        },
        ni = function (t, e, r, n, i, s) {
          var o,
            a,
            u = H(i),
            l = parseFloat(i) * (u && ~i.indexOf("rad") ? rg : 1),
            h = s ? l * s : l - n,
            c = n + h + "deg";
          return (
            u &&
              ("short" === (o = i.split("_")[1]) &&
                (h %= 360) != h % 180 &&
                (h += h < 0 ? 360 : -360),
              "cw" === o && h < 0
                ? (h = ((h + 36e9) % 360) - 360 * ~~(h / 360))
                : "ccw" === o &&
                  h > 0 &&
                  (h = ((h - 36e9) % 360) - 360 * ~~(h / 360))),
            (t._pt = a = new rn(t._pt, e, r, n, h, r0)),
            (a.e = c),
            (a.u = "deg"),
            t._props.push(r),
            a
          );
        },
        ns = function (t, e) {
          for (var r in e) t[r] = e[r];
          return t;
        },
        no = function (t, e, r) {
          var n,
            i,
            s,
            o,
            a,
            u,
            l,
            h = ns({}, r._gsap),
            c = r.style;
          for (i in (h.svg
            ? ((s = r.getAttribute("transform")),
              r.setAttribute("transform", ""),
              (c[rS] = e),
              (n = rK(r, 1)),
              rM(r, rS),
              r.setAttribute("transform", s))
            : ((s = getComputedStyle(r)[rS]),
              (c[rS] = e),
              (n = rK(r, 1)),
              (c[rS] = s)),
          r$))
            (s = h[i]) !== (o = n[i]) &&
              0 >
                "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) &&
              ((a = en(s) !== (l = en(o)) ? rI(r, i, s, l) : parseFloat(s)),
              (u = parseFloat(o)),
              (t._pt = new rn(t._pt, n, i, a, u - a, rx)),
              (t._pt.u = l || 0),
              t._props.push(i));
          ns(n, h);
        };
      tF("padding,margin,Width,Radius", function (t, e) {
        var r = "Right",
          n = "Bottom",
          i = "Left",
          s = (
            e < 3 ? ["Top", r, n, i] : ["Top" + i, "Top" + r, n + r, n + i]
          ).map(function (r) {
            return e < 2 ? t + r : "border" + r + t;
          });
        rq[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
          var o, a;
          if (arguments.length < 4)
            return 5 ===
              (a = (o = s.map(function (e) {
                return rj(t, e, r);
              })).join(" ")).split(o[0]).length
              ? o[0]
              : a;
          (o = (n + "").split(" ")),
            (a = {}),
            s.forEach(function (t, e) {
              return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
            }),
            t.init(e, a, i);
        };
      });
      var na,
        nu,
        nl,
        nh = {
          name: "css",
          register: rB,
          targetTest: function (t) {
            return t.style && t.nodeType;
          },
          init: function (t, e, r, n, i) {
            var s,
              o,
              a,
              u,
              l,
              h,
              c,
              f,
              p,
              d,
              $,
              g,
              m,
              _,
              v,
              D,
              y,
              x,
              b,
              w = this._props,
              E = t.style,
              C = r.vars.startAt;
            for (c in (rc || rB(), e))
              if (
                "autoRound" !== c &&
                ((o = e[c]), !t8[c] || !eN(c, e, r, n, t, i))
              ) {
                if (
                  ((l = typeof o),
                  (h = rq[c]),
                  "function" === l && (l = typeof (o = o.call(r, n, t, i))),
                  "string" === l && ~o.indexOf("random(") && (o = ed(o)),
                  h)
                )
                  h(this, t, c, o, r) && (v = 1);
                else if ("--" === c.substr(0, 2))
                  (s = (getComputedStyle(t).getPropertyValue(c) + "").trim()),
                    (o += ""),
                    (ew.lastIndex = 0),
                    ew.test(s) || ((f = en(s)), (p = en(o))),
                    p ? f !== p && (s = rI(t, c, s, p) + p) : f && (o += f),
                    this.add(E, "setProperty", s, o, n, i, 0, 0, c),
                    w.push(c);
                else if ("undefined" !== l) {
                  if (
                    (C && c in C
                      ? ((s =
                          "function" == typeof C[c]
                            ? C[c].call(r, n, t, i)
                            : C[c]),
                        c in N.units && !en(s) && (s += N.units[c]),
                        H(s) && ~s.indexOf("random(") && (s = ed(s)),
                        "=" === (s + "").charAt(1) && (s = rj(t, c)))
                      : (s = rj(t, c)),
                    (u = parseFloat(s)),
                    (d =
                      "string" === l && "=" === o.charAt(1)
                        ? +(o.charAt(0) + "1")
                        : 0) && (o = o.substr(2)),
                    (a = parseFloat(o)),
                    c in r8 &&
                      ("autoAlpha" === c &&
                        (1 === u &&
                          "hidden" === rj(t, "visibility") &&
                          a &&
                          (u = 0),
                        rz(
                          this,
                          E,
                          "visibility",
                          u ? "inherit" : "hidden",
                          a ? "inherit" : "hidden",
                          !a
                        )),
                      "scale" !== c &&
                        "transform" !== c &&
                        ~(c = r8[c]).indexOf(",") &&
                        (c = c.split(",")[0])),
                    ($ = c in r$))
                  ) {
                    if (
                      (g ||
                        (((m = t._gsap).renderTransform &&
                          !e.parseTransform) ||
                          rK(t, e.parseTransform),
                        (_ = !1 !== e.smoothOrigin && m.smooth),
                        ((g = this._pt =
                          new rn(
                            this._pt,
                            E,
                            rS,
                            0,
                            1,
                            m.renderTransform,
                            m,
                            0,
                            -1
                          )).dep = 1)),
                      "scale" === c)
                    )
                      (this._pt = new rn(
                        this._pt,
                        m,
                        "scaleY",
                        m.scaleY,
                        (d ? d * a : a - m.scaleY) || 0
                      )),
                        w.push("scaleY", c),
                        (c += "X");
                    else {
                      if ("transformOrigin" === c) {
                        (y = void 0),
                          (x = void 0),
                          (b = void 0),
                          (x = (y = (D = o).split(" "))[0]),
                          (b = y[1] || "50%"),
                          ("top" !== x &&
                            "bottom" !== x &&
                            "left" !== b &&
                            "right" !== b) ||
                            ((D = x), (x = b), (b = D)),
                          (y[0] = rY[x] || x),
                          (y[1] = rY[b] || b),
                          (o = y.join(" ")),
                          m.svg
                            ? rZ(t, o, 0, _, 0, this)
                            : ((p = parseFloat(o.split(" ")[2]) || 0) !==
                                m.zOrigin &&
                                rz(this, m, "zOrigin", m.zOrigin, p),
                              rz(this, E, c, rQ(s), rQ(o)));
                        continue;
                      }
                      if ("svgOrigin" === c) {
                        rZ(t, o, 1, _, 0, this);
                        continue;
                      }
                      if (c in rG) {
                        ni(this, m, c, u, o, d);
                        continue;
                      }
                      if ("smoothOrigin" === c) {
                        rz(this, m, "smooth", m.smooth, o);
                        continue;
                      }
                      if ("force3D" === c) {
                        m[c] = o;
                        continue;
                      }
                      if ("transform" === c) {
                        no(this, o, t);
                        continue;
                      }
                    }
                  } else c in E || (c = rO(c) || c);
                  if (
                    $ ||
                    ((a || 0 === a) &&
                      (u || 0 === u) &&
                      !ry.test(o) &&
                      c in E)
                  )
                    a || (a = 0),
                      (f = (s + "").substr((u + "").length)) !==
                        (p = en(o) || (c in N.units ? N.units[c] : f)) &&
                        (u = rI(t, c, s, p)),
                      (this._pt = new rn(
                        this._pt,
                        $ ? m : E,
                        c,
                        u,
                        d ? d * a : a - u,
                        $ ||
                        ("px" !== p && "zIndex" !== c) ||
                        !1 === e.autoRound
                          ? rx
                          : rw
                      )),
                      (this._pt.u = p || 0),
                      f !== p &&
                        "%" !== p &&
                        ((this._pt.b = s), (this._pt.r = rb));
                  else if (c in E) rU.call(this, t, c, s, o);
                  else {
                    if (!(c in t)) {
                      t$(c, o);
                      continue;
                    }
                    this.add(t, c, s || t[c], o, n, i);
                  }
                  w.push(c);
                }
              }
            v && rr(this);
          },
          get: rj,
          aliases: r8,
          getSetter: function (t, e, r) {
            var n = r8[e];
            return (
              n && 0 > n.indexOf(",") && (e = n),
              e in r$ && e !== r6 && (t._gsap.x || rj(t, "x"))
                ? r && rp === r
                  ? "scale" === e
                    ? rA
                    : rT
                  : ((rp = r || {}), "scale" === e ? r3 : r4)
                : t.style && !Q(t.style[e])
                ? r1
                : ~e.indexOf("-")
                ? rF
                : eH(t, e)
            );
          },
          core: { _removeProperty: rM, _getMatrix: r9 },
        };
      (ra.utils.checkPrefix = rO),
        (nl = tF(
          (na = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
            "," +
            (nu = "rotation,rotationX,rotationY,skewX,skewY") +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (t) {
            r$[t] = 1;
          }
        )),
        tF(nu, function (t) {
          (N.units[t] = "deg"), (rG[t] = 1);
        }),
        (r8[nl[13]] = na + "," + nu),
        tF(
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
          function (t) {
            var e = t.split(":");
            r8[e[1]] = nl[e[0]];
          }
        ),
        tF(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            N.units[t] = "px";
          }
        ),
        ra.registerPlugin(nh);
      var nc,
        nf,
        np,
        nd,
        n$,
        ng,
        nm,
        n_,
        nv,
        nD,
        ny,
        n8,
        nx,
        n0,
        nb,
        nw,
        nE,
        nC,
        n1,
        nF,
        nT,
        nA,
        n3,
        n4,
        nS,
        n6,
        nP,
        n2,
        nk = ra.registerPlugin(nh) || ra,
        nO = (nk.core.Tween, 1),
        nB = [],
        n5 = [],
        n7 = Date.now,
        nL = n7(),
        nR = 0,
        nM = 1,
        nz = function (t) {
          return t;
        },
        nN = function (t) {
          return (
            ny(t)[0] || (nH(t) ? console.warn("Element not found:", t) : null)
          );
        },
        nI = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        nj = function () {
          return "undefined" != typeof window;
        },
        nU = function () {
          return (
            nc || (nj() && (nc = window.gsap) && nc.registerPlugin && nc)
          );
        },
        nY = function (t) {
          return !!~nm.indexOf(t);
        },
        nX = function (t, e) {
          return ~nB.indexOf(t) && nB[nB.indexOf(t) + 1][e];
        },
        nq = function (t, e) {
          var r = e.s,
            n = e.sc,
            i = n5.indexOf(t),
            s = n === id.sc ? 1 : 2;
          return (
            ~i || (i = n5.push(t) - 1),
            n5[i + s] ||
              (n5[i + s] =
                nX(t, r) ||
                (nY(t)
                  ? n
                  : function (e) {
                      return arguments.length ? (t[r] = e) : t[r];
                    }))
          );
        },
        nV = function (t) {
          return (
            nX(t, "getBoundingClientRect") ||
            (nY(t)
              ? function () {
                  return (
                    (iV.width = np.innerWidth),
                    (iV.height = np.innerHeight),
                    iV
                  );
                }
              : function () {
                  return im(t);
                })
          );
        },
        nG = function (t, e) {
          var r = e.s,
            n = e.d2,
            i = e.d,
            s = e.a;
          return (s = nX(t, (r = "scroll" + n)))
            ? s() - nV(t)()[i]
            : nY(t)
            ? (ng[r] || n$[r]) -
              (np["inner" + n] || n$["client" + n] || ng["client" + n])
            : t[r] - t["offset" + n];
        },
        nW = function (t, e) {
          for (var r = 0; r < nT.length; r += 3)
            (!e || ~e.indexOf(nT[r + 1])) && t(nT[r], nT[r + 1], nT[r + 2]);
        },
        nH = function (t) {
          return "string" == typeof t;
        },
        n9 = function (t) {
          return "function" == typeof t;
        },
        nZ = function (t) {
          return "number" == typeof t;
        },
        nK = function (t) {
          return "object" == typeof t;
        },
        nQ = function (t) {
          return n9(t) && t();
        },
        nJ = function (t, e) {
          return function () {
            var r = nQ(t),
              n = nQ(e);
            return function () {
              nQ(r), nQ(n);
            };
          };
        },
        it = function (t, e, r) {
          return t && t.progress(e ? 0 : 1) && r && t.pause();
        },
        ie = function (t, e) {
          var r = e(t);
          r && r.totalTime && (t.callbackAnimation = r);
        },
        ir = Math.abs,
        ii = "left",
        is = "right",
        io = "bottom",
        ia = "width",
        iu = "height",
        il = "padding",
        ih = "margin",
        ic = "Width",
        ip = {
          s: "scrollLeft",
          p: ii,
          p2: "Left",
          os: is,
          os2: "Right",
          d: ia,
          d2: ic,
          a: "x",
          sc: function (t) {
            return arguments.length
              ? np.scrollTo(t, id.sc())
              : np.pageXOffset ||
                  nd.scrollLeft ||
                  n$.scrollLeft ||
                  ng.scrollLeft ||
                  0;
          },
        },
        id = {
          s: "scrollTop",
          p: "top",
          p2: "Top",
          os: io,
          os2: "Bottom",
          d: iu,
          d2: "Height",
          a: "y",
          op: ip,
          sc: function (t) {
            return arguments.length
              ? np.scrollTo(ip.sc(), t)
              : np.pageYOffset ||
                  nd.scrollTop ||
                  n$.scrollTop ||
                  ng.scrollTop ||
                  0;
          },
        },
        i$ = function (t) {
          return np.getComputedStyle(t);
        },
        ig = function (t, e) {
          for (var r in e) r in t || (t[r] = e[r]);
          return t;
        },
        im = function (t, e) {
          var r =
              e &&
              "matrix(1, 0, 0, 1, 0, 0)" !== i$(t)[nE] &&
              nc
                .to(t, {
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  rotation: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  skewX: 0,
                  skewY: 0,
                })
                .progress(1),
            n = t.getBoundingClientRect();
          return r && r.progress(0).kill(), n;
        },
        i_ = function (t, e) {
          var r = e.d2;
          return t["offset" + r] || t["client" + r] || 0;
        },
        iv = function (t) {
          var e,
            r = [],
            n = t.labels,
            i = t.duration();
          for (e in n) r.push(n[e] / i);
          return r;
        },
        iD = function (t) {
          var e = nc.utils.snap(t),
            r =
              Array.isArray(t) &&
              t.slice(0).sort(function (t, e) {
                return t - e;
              });
          return r
            ? function (t, n) {
                var i;
                if (!n) return e(t);
                if (n > 0) {
                  for (t -= 1e-4, i = 0; i < r.length; i++)
                    if (r[i] >= t) return r[i];
                  return r[i - 1];
                }
                for (i = r.length, t += 1e-4; i--; )
                  if (r[i] <= t) return r[i];
                return r[0];
              }
            : function (r, n) {
                var i = e(r);
                return !n || 0.001 > Math.abs(i - r) || i - r < 0 == n < 0
                  ? i
                  : e(n < 0 ? r - t : r + t);
              };
        },
        iy = function (t, e, r, n) {
          return r.split(",").forEach(function (r) {
            return t(e, r, n);
          });
        },
        i8 = function (t, e, r) {
          return t.addEventListener(e, r, { passive: !0 });
        },
        ix = function (t, e, r) {
          return t.removeEventListener(e, r);
        },
        i0 = {
          startColor: "green",
          endColor: "red",
          indent: 0,
          fontSize: "16px",
          fontWeight: "normal",
        },
        ib = { toggleActions: "play", anticipatePin: 0 },
        iw = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
        iE = function (t, e) {
          if (nH(t)) {
            var r = t.indexOf("="),
              n = ~r
                ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1))
                : 0;
            ~r &&
              (t.indexOf("%") > r && (n *= e / 100),
              (t = t.substr(0, r - 1))),
              (t =
                n +
                (t in iw
                  ? iw[t] * e
                  : ~t.indexOf("%")
                  ? (parseFloat(t) * e) / 100
                  : parseFloat(t) || 0));
          }
          return t;
        },
        iC = function (t, e, r, n, i, s, o, a) {
          var u = i.startColor,
            l = i.endColor,
            h = i.fontSize,
            c = i.indent,
            f = i.fontWeight,
            p = nd.createElement("div"),
            d = nY(r) || "fixed" === nX(r, "pinType"),
            $ = -1 !== t.indexOf("scroller"),
            g = d ? ng : r,
            m = -1 !== t.indexOf("start"),
            _ = m ? u : l,
            v =
              "border-color:" +
              _ +
              ";font-size:" +
              h +
              ";color:" +
              _ +
              ";font-weight:" +
              f +
              ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
          return (
            (v += "position:" + (($ || a) && d ? "fixed;" : "absolute;")),
            ($ || a || !d) &&
              (v += (n === id ? is : io) + ":" + (s + parseFloat(c)) + "px;"),
            o &&
              (v +=
                "box-sizing:border-box;text-align:left;width:" +
                o.offsetWidth +
                "px;"),
            (p._isStart = m),
            p.setAttribute(
              "class",
              "gsap-marker-" + t + (e ? " marker-" + e : "")
            ),
            (p.style.cssText = v),
            (p.innerText = e || 0 === e ? t + "-" + e : t),
            g.children[0]
              ? g.insertBefore(p, g.children[0])
              : g.appendChild(p),
            (p._offset = p["offset" + n.op.d2]),
            i1(p, 0, n, m),
            p
          );
        },
        i1 = function (t, e, r, n) {
          var i = { display: "block" },
            s = r[n ? "os2" : "p2"],
            o = r[n ? "p2" : "os2"];
          (t._isFlipped = n),
            (i[r.a + "Percent"] = n ? -100 : 0),
            (i[r.a] = n ? "1px" : 0),
            (i["border" + s + ic] = 1),
            (i["border" + o + ic] = 0),
            (i[r.p] = e + "px"),
            nc.set(t, i);
        },
        iF = [],
        iT = {},
        iA = function () {
          return n7() - nR > 20 && iN();
        },
        i3 = function () {
          var t = n7();
          nR !== t
            ? (iN(), nR || iO("scrollStart"), (nR = t))
            : nD || (nD = nv(iN));
        },
        i4 = function () {
          return !nb && !n4 && !nd.fullscreenElement && n_.restart(!0);
        },
        iS = {},
        i6 = [],
        iP = [],
        i2 = function (t) {
          var e,
            r = nc.ticker.frame,
            n = [],
            i = 0;
          if (nP !== r || nO) {
            for (i7(); i < iP.length; i += 4)
              (e = np.matchMedia(iP[i]).matches) !== iP[i + 3] &&
                ((iP[i + 3] = e),
                e
                  ? n.push(i)
                  : i7(1, iP[i]) || (n9(iP[i + 2]) && iP[i + 2]()));
            for (i5(), i = 0; i < n.length; i++)
              (n6 = iP[(e = n[i])]), (iP[e + 2] = iP[e + 1](t));
            (n6 = 0), nf && iR(0, 1), (nP = r), iO("matchMedia");
          }
        },
        ik = function t() {
          return ix(iZ, "scrollEnd", t) || iR(!0);
        },
        iO = function (t) {
          return (
            (iS[t] &&
              iS[t].map(function (t) {
                return t();
              })) ||
            i6
          );
        },
        iB = [],
        i5 = function (t) {
          for (var e = 0; e < iB.length; e += 5)
            (t && iB[e + 4] !== t) ||
              ((iB[e].style.cssText = iB[e + 1]),
              iB[e].getBBox &&
                iB[e].setAttribute("transform", iB[e + 2] || ""),
              (iB[e + 3].uncache = 1));
        },
        i7 = function (t, e) {
          var r;
          for (nC = 0; nC < iF.length; nC++)
            (r = iF[nC]),
              (e && r.media !== e) || (t ? r.kill(1) : r.revert());
          e && i5(e), e || iO("revert");
        },
        iL = function () {
          return n5.forEach(function (t) {
            return "function" == typeof t && (t.rec = 0);
          });
        },
        iR = function (t, e) {
          if (!nR || t) {
            n2 = !0;
            var r = iO("refreshInit");
            nA && iZ.sort(),
              e || i7(),
              iF.forEach(function (t) {
                return t.refresh();
              }),
              r.forEach(function (t) {
                return t && t.render && t.render(-1);
              }),
              iL(),
              n_.pause(),
              (n2 = !1),
              iO("refresh");
          } else i8(iZ, "scrollEnd", ik);
        },
        iM = 0,
        iz = 1,
        iN = function () {
          if (!n2) {
            var t = iF.length,
              e = n7(),
              r = e - nL >= 50,
              n = t && iF[0].scroll();
            if (
              ((iz = iM > n ? -1 : 1),
              (iM = n),
              r &&
                (nR && !nw && e - nR > 200 && ((nR = 0), iO("scrollEnd")),
                (nx = nL),
                (nL = e)),
              iz < 0)
            ) {
              for (nC = t; nC-- > 0; ) iF[nC] && iF[nC].update(0, r);
              iz = 1;
            } else for (nC = 0; nC < t; nC++) iF[nC] && iF[nC].update(0, r);
            nD = 0;
          }
        },
        iI = [
          ii,
          "top",
          io,
          is,
          "marginBottom",
          "marginRight",
          "marginTop",
          "marginLeft",
          "display",
          "flexShrink",
          "float",
          "zIndex",
          "grid-column-start",
          "grid-column-end",
          "grid-row-start",
          "grid-row-end",
          "grid-area",
          "justify-self",
          "align-self",
          "place-self",
        ],
        ij = iI.concat([
          ia,
          iu,
          "boxSizing",
          "maxWidth",
          "maxHeight",
          "position",
          ih,
          il,
          "paddingTop",
          "paddingRight",
          "paddingBottom",
          "paddingLeft",
        ]),
        iU = function (t, e, r, n) {
          if (t.parentNode !== e) {
            for (var i, s = iI.length, o = e.style, a = t.style; s--; )
              o[(i = iI[s])] = r[i];
            (o.position =
              "absolute" === r.position ? "absolute" : "relative"),
              "inline" === r.display && (o.display = "inline-block"),
              (a.bottom = a.right = "auto"),
              (o.overflow = "visible"),
              (o.boxSizing = "border-box"),
              (o.width = i_(t, ip) + "px"),
              (o.height = i_(t, id) + "px"),
              (o.padding = a.margin = a.top = a.left = "0"),
              iX(n),
              (a.width = a.maxWidth = r.width),
              (a.height = a.maxHeight = r.height),
              (a.padding = r.padding),
              t.parentNode.insertBefore(e, t),
              e.appendChild(t);
          }
        },
        iY = /([A-Z])/g,
        iX = function (t) {
          if (t) {
            var e,
              r,
              n = t.t.style,
              i = t.length,
              s = 0;
            for (
              (t.t._gsap || nc.core.getCache(t.t)).uncache = 1;
              s < i;
              s += 2
            )
              (r = t[s + 1]),
                (e = t[s]),
                r
                  ? (n[e] = r)
                  : n[e] &&
                    n.removeProperty(e.replace(iY, "-$1").toLowerCase());
          }
        },
        iq = function (t) {
          for (var e = ij.length, r = t.style, n = [], i = 0; i < e; i++)
            n.push(ij[i], r[ij[i]]);
          return (n.t = t), n;
        },
        iV = { left: 0, top: 0 },
        iG = function (t, e, r, n, i, s, o, a, u, l, h, c, f) {
          n9(t) && (t = t(a)),
            nH(t) &&
              "max" === t.substr(0, 3) &&
              (t = c + ("=" === t.charAt(4) ? iE("0" + t.substr(3), r) : 0));
          var p,
            d,
            $,
            g = f ? f.time() : 0;
          if ((f && f.seek(0), nZ(t))) o && i1(o, r, n, !0);
          else {
            n9(e) && (e = e(a));
            var m,
              _,
              v,
              D,
              y = t.split(" ");
            ($ = nN(e) || ng),
              (m = im($) || {}).left ||
                m.top ||
                "none" !== i$($).display ||
                ((D = $.style.display),
                ($.style.display = "block"),
                (m = im($)),
                D
                  ? ($.style.display = D)
                  : $.style.removeProperty("display")),
              (_ = iE(y[0], m[n.d])),
              (v = iE(y[1] || "0", r)),
              (t = m[n.p] - u[n.p] - l + _ + i - v),
              o && i1(o, v, n, r - v < 20 || (o._isStart && v > 20)),
              (r -= r - v);
          }
          if (s) {
            var x = t + r,
              b = s._isStart;
            (p = "scroll" + n.d2),
              i1(
                s,
                x,
                n,
                (b && x > 20) ||
                  (!b &&
                    (h ? Math.max(ng[p], n$[p]) : s.parentNode[p]) <= x + 1)
              ),
              h &&
                ((u = im(o)),
                h &&
                  (s.style[n.op.p] = u[n.op.p] - n.op.m - s._offset + "px"));
          }
          return (
            f &&
              $ &&
              ((p = im($)),
              f.seek(c),
              (d = im($)),
              (f._caScrollDist = p[n.p] - d[n.p]),
              (t = (t / f._caScrollDist) * c)),
            f && f.seek(g),
            f ? t : Math.round(t)
          );
        },
        iW = /(?:webkit|moz|length|cssText|inset)/i,
        iH = function (t, e, r, n) {
          if (t.parentNode !== e) {
            var i,
              s,
              o = t.style;
            if (e === ng) {
              for (i in ((t._stOrig = o.cssText), (s = i$(t))))
                +i ||
                  iW.test(i) ||
                  !s[i] ||
                  "string" != typeof o[i] ||
                  "0" === i ||
                  (o[i] = s[i]);
              (o.top = r), (o.left = n);
            } else o.cssText = t._stOrig;
            (nc.core.getCache(t).uncache = 1), e.appendChild(t);
          }
        },
        i9 = function (t, e) {
          var r,
            n,
            i = nq(t, e),
            s = "_scroll" + e.p2,
            o = function e(o, a, u, l, h) {
              var c = e.tween,
                f = a.onComplete,
                p = {};
              return (
                c && c.kill(),
                (r = Math.round(u)),
                (a[s] = o),
                (a.modifiers = p),
                (p[s] = function (t) {
                  return (
                    (t = nI(i())) !== r && t !== n && Math.abs(t - r) > 2
                      ? (c.kill(), (e.tween = 0))
                      : (t = u + l * c.ratio + h * c.ratio * c.ratio),
                    (n = r),
                    (r = nI(t))
                  );
                }),
                (a.onComplete = function () {
                  (e.tween = 0), f && f.call(c);
                }),
                (c = e.tween = nc.to(t, a))
              );
            };
          return (
            (t[s] = i),
            t.addEventListener(
              "wheel",
              function () {
                return o.tween && o.tween.kill() && (o.tween = 0);
              },
              { passive: !0 }
            ),
            o
          );
        };
      ip.op = id;
      var iZ = (function () {
        function t(e, r) {
          nf ||
            t.register(nc) ||
            console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
            this.init(e, r);
        }
        return (
          (t.prototype.init = function (e, r) {
            if (
              ((this.progress = this.start = 0),
              this.vars && this.kill(1),
              nM)
            ) {
              var n,
                i,
                s,
                o,
                a,
                u,
                l,
                h,
                c,
                f,
                p,
                d,
                $,
                g,
                m,
                _,
                v,
                D,
                y,
                x,
                b,
                w,
                E,
                C,
                F,
                T,
                A,
                S,
                P,
                k,
                O,
                B,
                L,
                R,
                M,
                z,
                N,
                I,
                j,
                U,
                Y,
                X,
                q,
                V,
                G,
                W,
                H,
                Z,
                K,
                Q = (e = ig(
                  nH(e) || nZ(e) || e.nodeType ? { trigger: e } : e,
                  ib
                )),
                J = Q.onUpdate,
                tt = Q.toggleClass,
                te = Q.id,
                tr = Q.onToggle,
                tn = Q.onRefresh,
                ti = Q.scrub,
                ts = Q.trigger,
                to = Q.pin,
                ta = Q.pinSpacing,
                tu = Q.invalidateOnRefresh,
                tl = Q.anticipatePin,
                th = Q.onScrubComplete,
                tc = Q.onSnapComplete,
                tf = Q.once,
                tp = Q.snap,
                td = Q.pinReparent,
                t$ = Q.pinSpacer,
                tg = Q.containerAnimation,
                tm = Q.fastScrollEnd,
                t_ = Q.preventOverlaps,
                tv =
                  e.horizontal ||
                  (e.containerAnimation && !1 !== e.horizontal)
                    ? ip
                    : id,
                tD = !ti && 0 !== ti,
                ty = nN(e.scroller || np),
                t8 = nc.core.getCache(ty),
                tx = nY(ty),
                t0 =
                  "fixed" ===
                  ("pinType" in e
                    ? e.pinType
                    : nX(ty, "pinType") || (tx && "fixed")),
                tb = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack],
                tw = tD && e.toggleActions.split(" "),
                tE = "markers" in e ? e.markers : ib.markers,
                tC = tx ? 0 : parseFloat(i$(ty)["border" + tv.p2 + ic]) || 0,
                t1 = this,
                tF =
                  e.onRefreshInit &&
                  function () {
                    return e.onRefreshInit(t1);
                  },
                tT =
                  ((n = ty),
                  (i = tx),
                  (o = (s = tv).d),
                  (a = s.d2),
                  (u = s.a),
                  (u = nX(n, "getBoundingClientRect"))
                    ? function () {
                        return u()[o];
                      }
                    : function () {
                        return (i ? np["inner" + a] : n["client" + a]) || 0;
                      }),
                tA =
                  ((l = ty),
                  !(h = tx) || ~nB.indexOf(l)
                    ? nV(l)
                    : function () {
                        return iV;
                      }),
                t3 = 0,
                t4 = nq(ty, tv);
              if (
                ((t1.media = n6),
                (tl *= 45),
                (t1.scroller = ty),
                (t1.scroll = tg ? tg.time.bind(tg) : t4),
                (d = t4()),
                (t1.vars = e),
                (r = r || e.animation),
                "refreshPriority" in e && (nA = 1),
                (t8.tweenScroll = t8.tweenScroll || {
                  top: i9(ty, id),
                  left: i9(ty, ip),
                }),
                (t1.tweenTo = c = t8.tweenScroll[tv.p]),
                r &&
                  ((r.vars.lazy = !1),
                  r._initted ||
                    (!1 !== r.vars.immediateRender &&
                      !1 !== e.immediateRender &&
                      r.render(0, !0, !0)),
                  (t1.animation = r.pause()),
                  (r.scrollTrigger = t1),
                  (j = nZ(ti) && ti) &&
                    (I = nc.to(r, {
                      ease: "power3",
                      duration: j,
                      onComplete: function () {
                        return th && th(t1);
                      },
                    })),
                  (z = 0),
                  te || (te = r.vars.id)),
                iF.push(t1),
                tp &&
                  ((nK(tp) && !tp.push) || (tp = { snapTo: tp }),
                  "scrollBehavior" in ng.style &&
                    nc.set(tx ? [ng, n$] : ty, { scrollBehavior: "auto" }),
                  (p = n9(tp.snapTo)
                    ? tp.snapTo
                    : "labels" === tp.snapTo
                    ? ((K = r),
                      function (t) {
                        return nc.utils.snap(iv(K), t);
                      })
                    : "labelsDirectional" === tp.snapTo
                    ? ((W = r),
                      function (t, e) {
                        return iD(iv(W))(t, e.direction);
                      })
                    : !1 !== tp.directional
                    ? function (t, e) {
                        return iD(tp.snapTo)(t, e.direction);
                      }
                    : nc.utils.snap(tp.snapTo)),
                  (U = nK((U = tp.duration || { min: 0.1, max: 2 }))
                    ? n8(U.min, U.max)
                    : n8(U, U)),
                  (Y = nc
                    .delayedCall(tp.delay || j / 2 || 0.1, function () {
                      if (
                        10 > Math.abs(t1.getVelocity()) &&
                        !nw &&
                        t3 !== t4()
                      ) {
                        var t = r && !tD ? r.totalProgress() : t1.progress,
                          e = ((t - N) / (n7() - nx)) * 1e3 || 0,
                          n = nc.utils.clamp(
                            -t1.progress,
                            1 - t1.progress,
                            (ir(e / 2) * e) / 0.185
                          ),
                          i = t1.progress + (!1 === tp.inertia ? 0 : n),
                          s = n8(0, 1, p(i, t1)),
                          o = t4(),
                          a = Math.round(g + s * b),
                          u = tp,
                          l = u.onStart,
                          h = u.onInterrupt,
                          f = u.onComplete,
                          d = c.tween;
                        if (o <= m && o >= g && a !== o) {
                          if (d && !d._initted && d.data <= ir(a - o)) return;
                          !1 === tp.inertia && (n = s - t1.progress),
                            c(
                              a,
                              {
                                duration: U(
                                  ir(
                                    (0.185 * Math.max(ir(i - t), ir(s - t))) /
                                      e /
                                      0.05 || 0
                                  )
                                ),
                                ease: tp.ease || "power3",
                                data: ir(a - o),
                                onInterrupt: function () {
                                  return Y.restart(!0) && h && h(t1);
                                },
                                onComplete: function () {
                                  (t3 = t4()),
                                    (z = N =
                                      r && !tD
                                        ? r.totalProgress()
                                        : t1.progress),
                                    tc && tc(t1),
                                    f && f(t1);
                                },
                              },
                              o,
                              n * b,
                              a - o - n * b
                            ),
                            l && l(t1, c.tween);
                        }
                      } else t1.isActive && Y.restart(!0);
                    })
                    .pause())),
                te && (iT[te] = t1),
                (ts = t1.trigger = nN(ts || to)),
                (to = !0 === to ? ts : nN(to)),
                nH(tt) && (tt = { targets: ts, className: tt }),
                to &&
                  (!1 === ta ||
                    ta === ih ||
                    (ta =
                      !(!ta && "flex" === i$(to.parentNode).display) && il),
                  (t1.pin = to),
                  !1 !== e.force3D && nc.set(to, { force3D: !0 }),
                  (f = nc.core.getCache(to)).spacer
                    ? (w = f.pinState)
                    : (t$ &&
                        ((t$ = nN(t$)) &&
                          !t$.nodeType &&
                          (t$ = t$.current || t$.nativeElement),
                        (f.spacerIsNative = !!t$),
                        t$ && (f.spacerState = iq(t$))),
                      (f.spacer = F = t$ || nd.createElement("div")),
                      F.classList.add("pin-spacer"),
                      te && F.classList.add("pin-spacer-" + te),
                      (f.pinState = w = iq(to))),
                  (t1.spacer = F = f.spacer),
                  (O = (M = i$(to))[ta + tv.os2]),
                  (A = nc.getProperty(to)),
                  (S = nc.quickSetter(to, tv.a, "px")),
                  iU(to, F, M),
                  (C = iq(to))),
                tE &&
                  ((x = nK(tE) ? ig(tE, i0) : i0),
                  (D = iC("scroller-start", te, ty, tv, x, 0)),
                  (y = iC("scroller-end", te, ty, tv, x, 0, D)),
                  (T = D["offset" + tv.op.d2]),
                  (_ = iC("start", te, ty, tv, x, T, 0, tg)),
                  (v = iC("end", te, ty, tv, x, T, 0, tg)),
                  tg && (G = nc.quickSetter([_, v], tv.a, "px")),
                  t0 ||
                    (nB.length && !0 === nX(ty, "fixedMarkers")) ||
                    ((Z = i$((H = tx ? ng : ty)).position),
                    (H.style.position =
                      "absolute" === Z || "fixed" === Z ? Z : "relative"),
                    nc.set([D, y], { force3D: !0 }),
                    (L = nc.quickSetter(D, tv.a, "px")),
                    (R = nc.quickSetter(y, tv.a, "px")))),
                tg)
              ) {
                var tS = tg.vars.onUpdate,
                  t6 = tg.vars.onUpdateParams;
                tg.eventCallback("onUpdate", function () {
                  t1.update(0, 0, 1), tS && tS.apply(t6 || []);
                });
              }
              (t1.previous = function () {
                return iF[iF.indexOf(t1) - 1];
              }),
                (t1.next = function () {
                  return iF[iF.indexOf(t1) + 1];
                }),
                (t1.revert = function (t) {
                  var e = !1 !== t || !t1.enabled,
                    n = nb;
                  e !== t1.isReverted &&
                    (e &&
                      (t1.scroll.rec || (t1.scroll.rec = t4()),
                      (q = Math.max(t4(), t1.scroll.rec || 0)),
                      (X = t1.progress),
                      (V = r && r.progress())),
                    _ &&
                      [_, v, D, y].forEach(function (t) {
                        return (t.style.display = e ? "none" : "block");
                      }),
                    e && (nb = 1),
                    t1.update(e),
                    (nb = n),
                    !to ||
                      (e
                        ? (function (t, e, r) {
                            iX(r);
                            var n = t._gsap;
                            if (n.spacerIsNative) iX(n.spacerState);
                            else if (t.parentNode === e) {
                              var i = e.parentNode;
                              i && (i.insertBefore(t, e), i.removeChild(e));
                            }
                          })(to, F, w)
                        : (td && t1.isActive) || iU(to, F, i$(to), B)),
                    (t1.isReverted = e));
                }),
                (t1.refresh = function (n, i) {
                  if ((!nb && t1.enabled) || i) {
                    if (to && n && nR) i8(t, "scrollEnd", ik);
                    else {
                      (nb = 1),
                        I && I.pause(),
                        tu && r && r.progress(0).invalidate(),
                        t1.isReverted || t1.revert();
                      for (
                        var s,
                          o,
                          a,
                          u,
                          l,
                          h,
                          c,
                          f,
                          p,
                          x,
                          T = tT(),
                          S = tA(),
                          O = tg ? tg.duration() : nG(ty, tv),
                          L = 0,
                          R = 0,
                          M = e.end,
                          z = e.endTrigger || ts,
                          N =
                            e.start ||
                            (0 !== e.start && ts
                              ? to
                                ? "0 0"
                                : "0 100%"
                              : 0),
                          j = e.pinnedContainer && nN(e.pinnedContainer),
                          U = (ts && Math.max(0, iF.indexOf(t1))) || 0,
                          Y = U;
                        Y--;

                      )
                        (h = iF[Y]).end || h.refresh(0, 1) || (nb = 1),
                          (c = h.pin) &&
                            (c === ts || c === to) &&
                            !h.isReverted &&
                            (x || (x = []), x.unshift(h), h.revert());
                      for (
                        n9(N) && (N = N(t1)),
                          g =
                            iG(
                              N,
                              ts,
                              T,
                              tv,
                              t4(),
                              _,
                              D,
                              t1,
                              S,
                              tC,
                              t0,
                              O,
                              tg
                            ) || (to ? -0.001 : 0),
                          n9(M) && (M = M(t1)),
                          nH(M) &&
                            !M.indexOf("+=") &&
                            (~M.indexOf(" ")
                              ? (M = (nH(N) ? N.split(" ")[0] : "") + M)
                              : ((L = iE(M.substr(2), T)),
                                (M = nH(N) ? N : g + L),
                                (z = ts))),
                          b =
                            (m =
                              Math.max(
                                g,
                                iG(
                                  M || (z ? "100% 0" : O),
                                  z,
                                  T,
                                  tv,
                                  t4() + L,
                                  v,
                                  y,
                                  t1,
                                  S,
                                  tC,
                                  t0,
                                  O,
                                  tg
                                )
                              ) || -0.001) - g ||
                            ((g -= 0.01) && 0.001),
                          L = 0,
                          Y = U;
                        Y--;

                      )
                        (c = (h = iF[Y]).pin) &&
                          h.start - h._pinPush < g &&
                          !tg &&
                          ((s = h.end - h.start),
                          (c !== ts && c !== j) || nZ(N) || (L += s),
                          c === to && (R += s));
                      if (
                        ((g += L),
                        (m += L),
                        (t1._pinPush = R),
                        _ &&
                          L &&
                          (((s = {})[tv.a] = "+=" + L),
                          j && (s[tv.p] = "-=" + t4()),
                          nc.set([_, v], s)),
                        to)
                      )
                        (s = i$(to)),
                          (u = tv === id),
                          (a = t4()),
                          (P = parseFloat(A(tv.a)) + R),
                          !O &&
                            m > 1 &&
                            ((tx ? ng : ty).style["overflow-" + tv.a] =
                              "scroll"),
                          iU(to, F, s),
                          (C = iq(to)),
                          (o = im(to, !0)),
                          (f = t0 && nq(ty, u ? ip : id)()),
                          ta &&
                            (((B = [ta + tv.os2, b + R + "px"]).t = F),
                            (Y = ta === il ? i_(to, tv) + b + R : 0) &&
                              B.push(tv.d, Y + "px"),
                            iX(B),
                            t0 && t4(q)),
                          t0 &&
                            (((l = {
                              top: o.top + (u ? a - g : f) + "px",
                              left: o.left + (u ? f : a - g) + "px",
                              boxSizing: "border-box",
                              position: "fixed",
                            }).width = l.maxWidth =
                              Math.ceil(o.width) + "px"),
                            (l.height = l.maxHeight =
                              Math.ceil(o.height) + "px"),
                            (l.margin =
                              l.marginTop =
                              l.marginRight =
                              l.marginBottom =
                              l.marginLeft =
                                "0"),
                            (l.padding = s.padding),
                            (l.paddingTop = s.paddingTop),
                            (l.paddingRight = s.paddingRight),
                            (l.paddingBottom = s.paddingBottom),
                            (l.paddingLeft = s.paddingLeft),
                            (E = (function (t, e, r) {
                              for (
                                var n, i = [], s = t.length, o = r ? 8 : 0;
                                o < s;
                                o += 2
                              )
                                (n = t[o]),
                                  i.push(n, n in e ? e[n] : t[o + 1]);
                              return (i.t = t.t), i;
                            })(w, l, td))),
                          r
                            ? ((p = r._initted),
                              n3(1),
                              r.render(r.duration(), !0, !0),
                              (k = A(tv.a) - P + b + R),
                              b !== k && E.splice(E.length - 2, 2),
                              r.render(0, !0, !0),
                              p || r.invalidate(),
                              n3(0))
                            : (k = b);
                      else if (ts && t4() && !tg)
                        for (o = ts.parentNode; o && o !== ng; )
                          o._pinOffset &&
                            ((g -= o._pinOffset), (m -= o._pinOffset)),
                            (o = o.parentNode);
                      x &&
                        x.forEach(function (t) {
                          return t.revert(!1);
                        }),
                        (t1.start = g),
                        (t1.end = m),
                        (d = $ = t4()),
                        tg || (d < q && t4(q), (t1.scroll.rec = 0)),
                        t1.revert(!1),
                        (nb = 0),
                        r &&
                          tD &&
                          r._initted &&
                          r.progress() !== V &&
                          r.progress(V, !0).render(r.time(), !0, !0),
                        X !== t1.progress &&
                          (r && !tD && r.totalProgress(X, !0),
                          (t1.progress = X),
                          t1.update(0, 0, 1)),
                        to &&
                          ta &&
                          (F._pinOffset = Math.round(t1.progress * k)),
                        tn && tn(t1);
                    }
                  }
                }),
                (t1.getVelocity = function () {
                  return ((t4() - $) / (n7() - nx)) * 1e3 || 0;
                }),
                (t1.endAnimation = function () {
                  it(t1.callbackAnimation),
                    r &&
                      (I
                        ? I.progress(1)
                        : r.paused()
                        ? tD || it(r, t1.direction < 0, 1)
                        : it(r, r.reversed()));
                }),
                (t1.getTrailing = function (t) {
                  var e = iF.indexOf(t1),
                    r =
                      t1.direction > 0
                        ? iF.slice(0, e).reverse()
                        : iF.slice(e + 1);
                  return nH(t)
                    ? r.filter(function (e) {
                        return e.vars.preventOverlaps === t;
                      })
                    : r;
                }),
                (t1.update = function (t, e, n) {
                  if (!tg || n || t) {
                    var i,
                      s,
                      o,
                      a,
                      u,
                      l,
                      h,
                      f = t1.scroll(),
                      p = t ? 0 : (f - g) / b,
                      _ = p < 0 ? 0 : p > 1 ? 1 : p || 0,
                      v = t1.progress;
                    if (
                      (e &&
                        (($ = d),
                        (d = tg ? t4() : f),
                        tp &&
                          ((N = z), (z = r && !tD ? r.totalProgress() : _))),
                      tl &&
                        !_ &&
                        to &&
                        !nb &&
                        !nO &&
                        nR &&
                        g < f + ((f - $) / (n7() - nx)) * tl &&
                        (_ = 1e-4),
                      _ !== v && t1.enabled)
                    ) {
                      if (
                        ((a =
                          (u =
                            (i = t1.isActive = !!_ && _ < 1) !=
                            (!!v && v < 1)) || !!_ != !!v),
                        (t1.direction = _ > v ? 1 : -1),
                        (t1.progress = _),
                        a &&
                          !nb &&
                          ((s = _ && !v ? 0 : 1 === _ ? 1 : 1 === v ? 2 : 3),
                          tD &&
                            ((o =
                              (!u && "none" !== tw[s + 1] && tw[s + 1]) ||
                              tw[s]),
                            (h =
                              r &&
                              ("complete" === o ||
                                "reset" === o ||
                                o in r)))),
                        t_ &&
                          u &&
                          (h || ti || !r) &&
                          (n9(t_)
                            ? t_(t1)
                            : t1.getTrailing(t_).forEach(function (t) {
                                return t.endAnimation();
                              })),
                        tD ||
                          (!I || nb || nO
                            ? r && r.totalProgress(_, !!nb)
                            : ((I.vars.totalProgress = _),
                              I.invalidate().restart())),
                        to)
                      ) {
                        if ((t && ta && (F.style[ta + tv.os2] = O), t0)) {
                          if (a) {
                            if (
                              ((l =
                                !t &&
                                _ > v &&
                                m + 1 > f &&
                                f + 1 >= nG(ty, tv)),
                              td)
                            ) {
                              if (!t && (i || l)) {
                                var y = im(to, !0),
                                  x = f - g;
                                iH(
                                  to,
                                  ng,
                                  y.top + (tv === id ? x : 0) + "px",
                                  y.left + (tv === id ? 0 : x) + "px"
                                );
                              } else iH(to, F);
                            }
                            iX(i || l ? E : C),
                              (k !== b && _ < 1 && i) ||
                                S(P + (1 !== _ || l ? 0 : k));
                          }
                        } else S(P + k * _);
                      }
                      !tp || c.tween || nb || nO || Y.restart(!0),
                        tt &&
                          (u || (tf && _ && (_ < 1 || !nS))) &&
                          ny(tt.targets).forEach(function (t) {
                            return t.classList[i || tf ? "add" : "remove"](
                              tt.className
                            );
                          }),
                        !J || tD || t || J(t1),
                        a && !nb
                          ? (tD &&
                              (h &&
                                ("complete" === o
                                  ? r.pause().totalProgress(1)
                                  : "reset" === o
                                  ? r.restart(!0).pause()
                                  : "restart" === o
                                  ? r.restart(!0)
                                  : r[o]()),
                              J && J(t1)),
                            (!u && nS) ||
                              (tr && u && ie(t1, tr),
                              tb[s] && ie(t1, tb[s]),
                              tf && (1 === _ ? t1.kill(!1, 1) : (tb[s] = 0)),
                              u ||
                                (tb[(s = 1 === _ ? 1 : 3)] && ie(t1, tb[s]))),
                            tm &&
                              !i &&
                              Math.abs(t1.getVelocity()) >
                                (nZ(tm) ? tm : 2500) &&
                              (it(t1.callbackAnimation),
                              I ? I.progress(1) : it(r, !_, 1)))
                          : tD && J && !nb && J(t1);
                    }
                    if (R) {
                      var w = tg
                        ? (f / tg.duration()) * (tg._caScrollDist || 0)
                        : f;
                      L(w + (D._isFlipped ? 1 : 0)), R(w);
                    }
                    G && G((-f / tg.duration()) * (tg._caScrollDist || 0));
                  }
                }),
                (t1.enable = function (e, r) {
                  t1.enabled ||
                    ((t1.enabled = !0),
                    i8(ty, "resize", i4),
                    i8(ty, "scroll", i3),
                    tF && i8(t, "refreshInit", tF),
                    !1 !== e && ((t1.progress = X = 0), (d = $ = t3 = t4())),
                    !1 !== r && t1.refresh());
                }),
                (t1.getTween = function (t) {
                  return t && c ? c.tween : I;
                }),
                (t1.disable = function (e, r) {
                  if (
                    t1.enabled &&
                    (!1 !== e && t1.revert(),
                    (t1.enabled = t1.isActive = !1),
                    r || (I && I.pause()),
                    (q = 0),
                    f && (f.uncache = 1),
                    tF && ix(t, "refreshInit", tF),
                    Y &&
                      (Y.pause(), c.tween && c.tween.kill() && (c.tween = 0)),
                    !tx)
                  ) {
                    for (var n = iF.length; n--; )
                      if (iF[n].scroller === ty && iF[n] !== t1) return;
                    ix(ty, "resize", i4), ix(ty, "scroll", i3);
                  }
                }),
                (t1.kill = function (t, e) {
                  t1.disable(t, e), I && I.kill(), te && delete iT[te];
                  var n = iF.indexOf(t1);
                  iF.splice(n, 1),
                    n === nC && iz > 0 && nC--,
                    (n = 0),
                    iF.forEach(function (t) {
                      return t.scroller === t1.scroller && (n = 1);
                    }),
                    n || (t1.scroll.rec = 0),
                    r &&
                      ((r.scrollTrigger = null),
                      t && r.render(-1),
                      e || r.kill()),
                    _ &&
                      [_, v, D, y].forEach(function (t) {
                        return t.parentNode && t.parentNode.removeChild(t);
                      }),
                    to &&
                      (f && (f.uncache = 1),
                      (n = 0),
                      iF.forEach(function (t) {
                        return t.pin === to && n++;
                      }),
                      n || (f.spacer = 0));
                }),
                t1.enable(!1, !1),
                r && r.add && !b
                  ? nc.delayedCall(0.01, function () {
                      return g || m || t1.refresh();
                    }) &&
                    (b = 0.01) &&
                    (g = m = 0)
                  : t1.refresh();
            } else this.update = this.refresh = this.kill = nz;
          }),
          (t.register = function (e) {
            if (
              !nf &&
              ((nc = e || nU()),
              nj() &&
                window.document &&
                ((np = window),
                (n$ = (nd = document).documentElement),
                (ng = nd.body)),
              nc &&
                ((ny = nc.utils.toArray),
                (n8 = nc.utils.clamp),
                (n3 = nc.core.suppressOverwrites || nz),
                nc.core.globals("ScrollTrigger", t),
                ng))
            ) {
              (nv =
                np.requestAnimationFrame ||
                function (t) {
                  return setTimeout(t, 16);
                }),
                i8(np, "wheel", i3),
                (nm = [np, nd, n$, ng]),
                i8(nd, "scroll", i3);
              var r,
                n = ng.style,
                i = n.borderTopStyle;
              (n.borderTopStyle = "solid"),
                (r = im(ng)),
                (id.m = Math.round(r.top + id.sc()) || 0),
                (ip.m = Math.round(r.left + ip.sc()) || 0),
                i
                  ? (n.borderTopStyle = i)
                  : n.removeProperty("border-top-style"),
                (n0 = setInterval(iA, 200)),
                nc.delayedCall(0.5, function () {
                  return (nO = 0);
                }),
                i8(nd, "touchcancel", nz),
                i8(ng, "touchstart", nz),
                iy(i8, nd, "pointerdown,touchstart,mousedown", function () {
                  return (nw = 1);
                }),
                iy(i8, nd, "pointerup,touchend,mouseup", function () {
                  return (nw = 0);
                }),
                (nE = nc.utils.checkPrefix("transform")),
                ij.push(nE),
                (nf = n7()),
                (n_ = nc.delayedCall(0.2, iR).pause()),
                (nT = [
                  nd,
                  "visibilitychange",
                  function () {
                    var t = np.innerWidth,
                      e = np.innerHeight;
                    nd.hidden
                      ? ((n1 = t), (nF = e))
                      : (n1 === t && nF === e) || i4();
                  },
                  nd,
                  "DOMContentLoaded",
                  iR,
                  np,
                  "load",
                  function () {
                    return nR || iR();
                  },
                  np,
                  "resize",
                  i4,
                ]),
                nW(i8);
            }
            return nf;
          }),
          (t.defaults = function (t) {
            for (var e in t) ib[e] = t[e];
          }),
          (t.kill = function () {
            (nM = 0),
              iF.slice(0).forEach(function (t) {
                return t.kill(1);
              });
          }),
          (t.config = function (t) {
            "limitCallbacks" in t && (nS = !!t.limitCallbacks);
            var e = t.syncInterval;
            (e && clearInterval(n0)) || ((n0 = e) && setInterval(iA, e)),
              "autoRefreshEvents" in t &&
                (nW(ix) || nW(i8, t.autoRefreshEvents || "none"),
                (n4 = -1 === (t.autoRefreshEvents + "").indexOf("resize")));
          }),
          (t.scrollerProxy = function (t, e) {
            var r = nN(t),
              n = n5.indexOf(r),
              i = nY(r);
            ~n && n5.splice(n, i ? 6 : 2),
              i ? nB.unshift(np, e, ng, e, n$, e) : nB.unshift(r, e);
          }),
          (t.matchMedia = function (t) {
            var e, r, n, i, s;
            for (r in t)
              (n = iP.indexOf(r)),
                (i = t[r]),
                (n6 = r),
                "all" === r
                  ? i()
                  : (e = np.matchMedia(r)) &&
                    (e.matches && (s = i()),
                    ~n
                      ? ((iP[n + 1] = nJ(iP[n + 1], i)),
                        (iP[n + 2] = nJ(iP[n + 2], s)))
                      : ((n = iP.length),
                        iP.push(r, i, s),
                        e.addListener
                          ? e.addListener(i2)
                          : e.addEventListener("change", i2)),
                    (iP[n + 3] = e.matches)),
                (n6 = 0);
            return iP;
          }),
          (t.clearMatchMedia = function (t) {
            t || (iP.length = 0), (t = iP.indexOf(t)) >= 0 && iP.splice(t, 4);
          }),
          (t.isInViewport = function (t, e, r) {
            var n = (nH(t) ? nN(t) : t).getBoundingClientRect(),
              i = n[r ? ia : iu] * e || 0;
            return r
              ? n.right - i > 0 && n.left + i < np.innerWidth
              : n.bottom - i > 0 && n.top + i < np.innerHeight;
          }),
          (t.positionInViewport = function (t, e, r) {
            nH(t) && (t = nN(t));
            var n = t.getBoundingClientRect(),
              i = n[r ? ia : iu],
              s =
                null == e
                  ? i / 2
                  : e in iw
                  ? iw[e] * i
                  : ~e.indexOf("%")
                  ? (parseFloat(e) * i) / 100
                  : parseFloat(e) || 0;
            return r
              ? (n.left + s) / np.innerWidth
              : (n.top + s) / np.innerHeight;
          }),
          t
        );
      })();
      (iZ.version = "3.8.0"),
        (iZ.saveStyles = function (t) {
          return t
            ? ny(t).forEach(function (t) {
                if (t && t.style) {
                  var e = iB.indexOf(t);
                  e >= 0 && iB.splice(e, 5),
                    iB.push(
                      t,
                      t.style.cssText,
                      t.getBBox && t.getAttribute("transform"),
                      nc.core.getCache(t),
                      n6
                    );
                }
              })
            : iB;
        }),
        (iZ.revert = function (t, e) {
          return i7(!t, e);
        }),
        (iZ.create = function (t, e) {
          return new iZ(t, e);
        }),
        (iZ.refresh = function (t) {
          return t ? i4() : (nf || iZ.register()) && iR(!0);
        }),
        (iZ.update = iN),
        (iZ.clearScrollMemory = iL),
        (iZ.maxScroll = function (t, e) {
          return nG(t, e ? ip : id);
        }),
        (iZ.getScrollFunc = function (t, e) {
          return nq(nN(t), e ? ip : id);
        }),
        (iZ.getById = function (t) {
          return iT[t];
        }),
        (iZ.getAll = function () {
          return iF.slice(0);
        }),
        (iZ.isScrolling = function () {
          return !!nR;
        }),
        (iZ.snapDirectional = iD),
        (iZ.addEventListener = function (t, e) {
          var r = iS[t] || (iS[t] = []);
          ~r.indexOf(e) || r.push(e);
        }),
        (iZ.removeEventListener = function (t, e) {
          var r = iS[t],
            n = r && r.indexOf(e);
          n >= 0 && r.splice(n, 1);
        }),
        (iZ.batch = function (t, e) {
          var r,
            n = [],
            i = {},
            s = e.interval || 0.016,
            o = e.batchMax || 1e9,
            a = function (t, e) {
              var r = [],
                n = [],
                i = nc
                  .delayedCall(s, function () {
                    e(r, n), (r = []), (n = []);
                  })
                  .pause();
              return function (t) {
                r.length || i.restart(!0),
                  r.push(t.trigger),
                  n.push(t),
                  o <= r.length && i.progress(1);
              };
            };
          for (r in e)
            i[r] =
              "on" === r.substr(0, 2) && n9(e[r]) && "onRefreshInit" !== r
                ? a(0, e[r])
                : e[r];
          return (
            n9(o) &&
              ((o = o()),
              i8(iZ, "refresh", function () {
                return (o = e.batchMax());
              })),
            ny(t).forEach(function (t) {
              var e = {};
              for (r in i) e[r] = i[r];
              (e.trigger = t), n.push(iZ.create(e));
            }),
            n
          );
        }),
        (iZ.sort = function (t) {
          return iF.sort(
            t ||
              function (t, e) {
                return (
                  -1e6 * (t.vars.refreshPriority || 0) +
                  t.start -
                  (e.start + -1e6 * (e.vars.refreshPriority || 0))
                );
              }
          );
        }),
        nU() && nc.registerPlugin(iZ);
      var iK,
        iQ,
        iJ,
        st,
        se,
        sr,
        sn,
        si = function () {
          return "undefined" != typeof window;
        },
        ss = function () {
          return (
            iK || (si() && (iK = window.gsap) && iK.registerPlugin && iK)
          );
        },
        so = function (t) {
          return "string" == typeof t;
        },
        sa = function (t) {
          return "function" == typeof t;
        },
        su = function (t, e) {
          var r = "x" === e ? "Width" : "Height",
            n = "scroll" + r,
            i = "client" + r;
          return t === iJ || t === st || t === se
            ? Math.max(st[n], se[n]) - (iJ["inner" + r] || st[i] || se[i])
            : t[n] - t["offset" + r];
        },
        sl = function (t, e) {
          var r = "scroll" + ("x" === e ? "Left" : "Top");
          return (
            t === iJ &&
              (null != t.pageXOffset
                ? (r = "page" + e.toUpperCase() + "Offset")
                : (t = null != st[r] ? st : se)),
            function () {
              return t[r];
            }
          );
        },
        sh = function (t, e) {
          if (!(t = sr(t)[0]) || !t.getBoundingClientRect)
            return (
              console.warn("scrollTo target doesn't exist. Using 0") || {
                x: 0,
                y: 0,
              }
            );
          var r = t.getBoundingClientRect(),
            n = !e || e === iJ || e === se,
            i = n
              ? {
                  top:
                    st.clientTop -
                    (iJ.pageYOffset || st.scrollTop || se.scrollTop || 0),
                  left:
                    st.clientLeft -
                    (iJ.pageXOffset || st.scrollLeft || se.scrollLeft || 0),
                }
              : e.getBoundingClientRect(),
            s = { x: r.left - i.left, y: r.top - i.top };
          return !n && e && ((s.x += sl(e, "x")()), (s.y += sl(e, "y")())), s;
        },
        sc = function (t, e, r, n, i) {
          return isNaN(t) || "object" == typeof t
            ? so(t) && "=" === t.charAt(1)
              ? parseFloat(t.substr(2)) * ("-" === t.charAt(0) ? -1 : 1) +
                n -
                i
              : "max" === t
              ? su(e, r) - i
              : Math.min(su(e, r), sh(t, e)[r] - i)
            : parseFloat(t) - i;
        },
        sf = function () {
          (iK = ss()),
            si() &&
              iK &&
              document.body &&
              ((iJ = window),
              (se = document.body),
              (st = document.documentElement),
              (sr = iK.utils.toArray),
              iK.config({ autoKillThreshold: 7 }),
              (sn = iK.config()),
              (iQ = 1));
        },
        sp = {
          version: "3.8.0",
          name: "scrollTo",
          rawVars: 1,
          register: function (t) {
            (iK = t), sf();
          },
          init: function (t, e, r, n, i) {
            iQ || sf();
            var s = this,
              o = iK.getProperty(t, "scrollSnapType");
            (s.isWin = t === iJ),
              (s.target = t),
              (s.tween = r),
              (e = (function (t, e, r, n) {
                if ((sa(t) && (t = t(e, r, n)), "object" != typeof t))
                  return so(t) && "max" !== t && "=" !== t.charAt(1)
                    ? { x: t, y: t }
                    : { y: t };
                if (t.nodeType) return { y: t, x: t };
                var i,
                  s = {};
                for (i in t)
                  s[i] =
                    "onAutoKill" !== i && sa(t[i]) ? t[i](e, r, n) : t[i];
                return s;
              })(e, n, t, i)),
              (s.vars = e),
              (s.autoKill = !!e.autoKill),
              (s.getX = sl(t, "x")),
              (s.getY = sl(t, "y")),
              (s.x = s.xPrev = s.getX()),
              (s.y = s.yPrev = s.getY()),
              o &&
                "none" !== o &&
                ((s.snap = 1),
                (s.snapInline = t.style.scrollSnapType),
                (t.style.scrollSnapType = "none")),
              null != e.x
                ? (s.add(
                    s,
                    "x",
                    s.x,
                    sc(e.x, t, "x", s.x, e.offsetX || 0),
                    n,
                    i
                  ),
                  s._props.push("scrollTo_x"))
                : (s.skipX = 1),
              null != e.y
                ? (s.add(
                    s,
                    "y",
                    s.y,
                    sc(e.y, t, "y", s.y, e.offsetY || 0),
                    n,
                    i
                  ),
                  s._props.push("scrollTo_y"))
                : (s.skipY = 1);
          },
          render: function (t, e) {
            for (
              var r,
                n,
                i,
                s,
                o,
                a = e._pt,
                u = e.target,
                l = e.tween,
                h = e.autoKill,
                c = e.xPrev,
                f = e.yPrev,
                p = e.isWin,
                d = e.snap,
                $ = e.snapInline;
              a;

            )
              a.r(t, a.d), (a = a._next);
            (r = p || !e.skipX ? e.getX() : c),
              (i = (n = p || !e.skipY ? e.getY() : f) - f),
              (s = r - c),
              (o = sn.autoKillThreshold),
              e.x < 0 && (e.x = 0),
              e.y < 0 && (e.y = 0),
              h &&
                (!e.skipX &&
                  (s > o || s < -o) &&
                  r < su(u, "x") &&
                  (e.skipX = 1),
                !e.skipY &&
                  (i > o || i < -o) &&
                  n < su(u, "y") &&
                  (e.skipY = 1),
                e.skipX &&
                  e.skipY &&
                  (l.kill(),
                  e.vars.onAutoKill &&
                    e.vars.onAutoKill.apply(
                      l,
                      e.vars.onAutoKillParams || []
                    ))),
              p
                ? iJ.scrollTo(e.skipX ? r : e.x, e.skipY ? n : e.y)
                : (e.skipY || (u.scrollTop = e.y),
                  e.skipX || (u.scrollLeft = e.x)),
              d &&
                (1 === t || 0 === t) &&
                ((n = u.scrollTop),
                (r = u.scrollLeft),
                $
                  ? (u.style.scrollSnapType = $)
                  : u.style.removeProperty("scroll-snap-type"),
                (u.scrollTop = n + 1),
                (u.scrollLeft = r + 1),
                (u.scrollTop = n),
                (u.scrollLeft = r)),
              (e.xPrev = e.x),
              (e.yPrev = e.y);
          },
          kill: function (t) {
            var e = "scrollTo" === t;
            (e || "scrollTo_x" === t) && (this.skipX = 1),
              (e || "scrollTo_y" === t) && (this.skipY = 1);
          },
        };
      (sp.max = su),
        (sp.getOffset = sh),
        (sp.buildGetter = sl),
        ss() && iK.registerPlugin(sp);
      var sd,
        s$,
        sg,
        sm,
        s_,
        sv = function () {
          return "undefined" != typeof window;
        },
        sD = function () {
          return (
            sd || (sv() && (sd = window.gsap) && sd.registerPlugin && sd)
          );
        },
        sy = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        s8 = {
          rect: ["width", "height"],
          circle: ["r", "r"],
          ellipse: ["rx", "ry"],
          line: ["x2", "y2"],
        },
        sx = function (t) {
          return Math.round(1e4 * t) / 1e4;
        },
        s0 = function (t) {
          return parseFloat(t) || 0;
        },
        sb = function (t, e) {
          var r = s0(t);
          return ~t.indexOf("%") ? (r / 100) * e : r;
        },
        sw = function (t, e) {
          return s0(t.getAttribute(e));
        },
        sE = Math.sqrt,
        sC = function (t, e, r, n, i, s) {
          return sE(
            Math.pow((s0(r) - s0(t)) * i, 2) +
              Math.pow((s0(n) - s0(e)) * s, 2)
          );
        },
        s1 = function (t) {
          return console.warn(t);
        },
        sF = function (t) {
          return "non-scaling-stroke" === t.getAttribute("vector-effect");
        },
        sT = function (t) {
          if (!(t = s$(t)[0])) return 0;
          var e,
            r,
            n,
            i,
            s,
            o,
            a,
            u = t.tagName.toLowerCase(),
            l = t.style,
            h = 1,
            c = 1;
          sF(t) &&
            ((h = sE((c = t.getScreenCTM()).a * c.a + c.b * c.b)),
            (c = sE(c.d * c.d + c.c * c.c)));
          try {
            r = t.getBBox();
          } catch (f) {
            s1(
              "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
            );
          }
          var p = r || { x: 0, y: 0, width: 0, height: 0 },
            d = p.x,
            $ = p.y,
            g = p.width,
            m = p.height;
          if (
            ((r && (g || m)) ||
              !s8[u] ||
              ((g = sw(t, s8[u][0])),
              (m = sw(t, s8[u][1])),
              "rect" !== u && "line" !== u && ((g *= 2), (m *= 2)),
              "line" === u &&
                ((d = sw(t, "x1")),
                ($ = sw(t, "y1")),
                (g = Math.abs(g - d)),
                (m = Math.abs(m - $)))),
            "path" === u)
          )
            (i = l.strokeDasharray),
              (l.strokeDasharray = "none"),
              (e = t.getTotalLength() || 0),
              h !== c &&
                s1(
                  "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
                ),
              (e *= (h + c) / 2),
              (l.strokeDasharray = i);
          else if ("rect" === u) e = 2 * g * h + 2 * m * c;
          else if ("line" === u) e = sC(d, $, d + g, $ + m, h, c);
          else if ("polyline" === u || "polygon" === u)
            for (
              n = t.getAttribute("points").match(sy) || [],
                "polygon" === u && n.push(n[0], n[1]),
                e = 0,
                s = 2;
              s < n.length;
              s += 2
            )
              e += sC(n[s - 2], n[s - 1], n[s], n[s + 1], h, c) || 0;
          else
            ("circle" !== u && "ellipse" !== u) ||
              (e =
                Math.PI *
                (3 * ((o = (g / 2) * h) + (a = (m / 2) * c)) -
                  sE((3 * o + a) * (o + 3 * a))));
          return e || 0;
        },
        sA = function (t, e) {
          if (!(t = s$(t)[0])) return [0, 0];
          e || (e = sT(t) + 1);
          var r = sg.getComputedStyle(t),
            n = r.strokeDasharray || "",
            i = s0(r.strokeDashoffset),
            s = n.indexOf(",");
          return (
            s < 0 && (s = n.indexOf(" ")),
            (n = s < 0 ? e : s0(n.substr(0, s))) > e && (n = e),
            [-i || 0, n - i || 0]
          );
        },
        s3 = function () {
          sv() &&
            (document,
            (sg = window),
            (s_ = sd = sD()),
            (s$ = sd.utils.toArray),
            (sm =
              -1 !== ((sg.navigator || {}).userAgent || "").indexOf("Edge")));
        },
        s4 = {
          version: "3.9.1",
          name: "drawSVG",
          register: function (t) {
            (sd = t), s3();
          },
          init: function (t, e, r, n, i) {
            if (!t.getBBox) return !1;
            s_ || s3();
            var s,
              o,
              a,
              u,
              l,
              h,
              c,
              f,
              p,
              d = sT(t);
            return (
              (this._style = t.style),
              (this._target = t),
              e + "" == "true"
                ? (e = "0 100%")
                : e
                ? -1 === (e + "").indexOf(" ") && (e = "0 " + e)
                : (e = "0 0"),
              (o =
                ((u = e),
                (l = d),
                (h = (s = sA(t, d))[0]),
                (p = u.indexOf(" ")) < 0
                  ? ((c = void 0 !== h ? h + "" : u), (f = u))
                  : ((c = u.substr(0, p)), (f = u.substr(p + 1))),
                (c = sb(c, l)) > (f = sb(f, l)) ? [f, c] : [c, f])),
              (this._length = sx(d)),
              (this._dash = sx(s[1] - s[0])),
              (this._offset = sx(-s[0])),
              (this._dashPT = this.add(
                this,
                "_dash",
                this._dash,
                sx(o[1] - o[0])
              )),
              (this._offsetPT = this.add(
                this,
                "_offset",
                this._offset,
                sx(-o[0])
              )),
              sm &&
                (a = sg.getComputedStyle(t)).strokeLinecap !==
                  a.strokeLinejoin &&
                ((o = s0(a.strokeMiterlimit)),
                this.add(t.style, "strokeMiterlimit", o, o + 0.01)),
              (this._live = sF(t) || ~(e + "").indexOf("live")),
              (this._nowrap = ~(e + "").indexOf("nowrap")),
              this._props.push("drawSVG"),
              1
            );
          },
          render: function (t, e) {
            var r,
              n,
              i,
              s,
              o = e._pt,
              a = e._style;
            if (o) {
              for (
                e._live &&
                (r = sT(e._target)) !== e._length &&
                ((n = r / e._length),
                (e._length = r),
                e._offsetPT && ((e._offsetPT.s *= n), (e._offsetPT.c *= n)),
                e._dashPT
                  ? ((e._dashPT.s *= n), (e._dashPT.c *= n))
                  : (e._dash *= n));
                o;

              )
                o.r(t, o.d), (o = o._next);
              (i = e._dash || (t && 1 !== t && 1e-4) || 0),
                (r = e._length - i + 0.1),
                (s = e._offset),
                i &&
                  s &&
                  i + Math.abs(s % e._length) > e._length - 0.2 &&
                  (s += s < 0 ? 0.1 : -0.1) &&
                  (r += 0.1),
                (a.strokeDashoffset = i ? s : s + 0.001),
                (a.strokeDasharray =
                  r < 0.2
                    ? "none"
                    : i
                    ? i + "px," + (e._nowrap ? 999999 : r) + "px"
                    : "0px, 999999px");
            }
          },
          getLength: sT,
          getPosition: sA,
        };
      function sS() {
        if (!(this instanceof sS)) return new sS();
        (this.size = 0),
          (this.uid = 0),
          (this.selectors = []),
          (this.selectorObjects = {}),
          (this.indexes = Object.create(this.indexes)),
          (this.activeIndexes = []);
      }
      sD() && sd.registerPlugin(s4),
        nk.registerPlugin(iZ, sp, s4),
        nk.config({ defaults: { ease: "none" } });
      var s6 = window.document.documentElement,
        sP =
          s6.matches ||
          s6.webkitMatchesSelector ||
          s6.mozMatchesSelector ||
          s6.oMatchesSelector ||
          s6.msMatchesSelector;
      (sS.prototype.matchesSelector = function (t, e) {
        return sP.call(t, e);
      }),
        (sS.prototype.querySelectorAll = function (t, e) {
          return e.querySelectorAll(t);
        }),
        (sS.prototype.indexes = []);
      var s2 = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      sS.prototype.indexes.push({
        name: "ID",
        selector: function (t) {
          var e;
          if ((e = t.match(s2))) return e[0].slice(1);
        },
        element: function (t) {
          if (t.id) return [t.id];
        },
      });
      var sk = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      sS.prototype.indexes.push({
        name: "CLASS",
        selector: function (t) {
          var e;
          if ((e = t.match(sk))) return e[0].slice(1);
        },
        element: function (t) {
          var e = t.className;
          if (e) {
            if ("string" == typeof e) return e.split(/\s/);
            if ("object" == typeof e && "baseVal" in e)
              return e.baseVal.split(/\s/);
          }
        },
      });
      var sO,
        sB = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
      sS.prototype.indexes.push({
        name: "TAG",
        selector: function (t) {
          var e;
          if ((e = t.match(sB))) return e[0].toUpperCase();
        },
        element: function (t) {
          return [t.nodeName.toUpperCase()];
        },
      }),
        (sS.prototype.indexes.default = {
          name: "UNIVERSAL",
          selector: function () {
            return !0;
          },
          element: function () {
            return [!0];
          },
        }),
        (sO =
          "function" == typeof window.Map
            ? window.Map
            : (function () {
                function t() {
                  this.map = {};
                }
                return (
                  (t.prototype.get = function (t) {
                    return this.map[t + " "];
                  }),
                  (t.prototype.set = function (t, e) {
                    this.map[t + " "] = e;
                  }),
                  t
                );
              })());
      var s5 =
        /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
      function s7(t, e) {
        var r,
          n,
          i,
          s,
          o,
          a,
          u = (t = t.slice(0).concat(t.default)).length,
          l = e,
          h = [];
        do
          if ((s5.exec(""), (i = s5.exec(l)) && ((l = i[3]), i[2] || !l))) {
            for (r = 0; r < u; r++)
              if ((o = (a = t[r]).selector(i[1]))) {
                for (n = h.length, s = !1; n--; )
                  if (h[n].index === a && h[n].key === o) {
                    s = !0;
                    break;
                  }
                s || h.push({ index: a, key: o });
                break;
              }
          }
        while (i);
        return h;
      }
      function sL(t, e) {
        var r, n, i;
        for (r = 0, n = t.length; r < n; r++)
          if (((i = t[r]), e.isPrototypeOf(i))) return i;
      }
      function sR(t, e) {
        return t.id - e.id;
      }
      (sS.prototype.logDefaultIndexUsed = function () {}),
        (sS.prototype.add = function (t, e) {
          var r,
            n,
            i,
            s,
            o,
            a,
            u,
            l,
            h = this.activeIndexes,
            c = this.selectors,
            f = this.selectorObjects;
          if ("string" == typeof t) {
            for (
              f[(r = { id: this.uid++, selector: t, data: e }).id] = r,
                u = s7(this.indexes, t),
                n = 0;
              n < u.length;
              n++
            )
              (s = (l = u[n]).key),
                (o = sL(h, (i = l.index))) ||
                  (((o = Object.create(i)).map = new sO()), h.push(o)),
                i === this.indexes.default && this.logDefaultIndexUsed(r),
                (a = o.map.get(s)) || ((a = []), o.map.set(s, a)),
                a.push(r);
            this.size++, c.push(t);
          }
        }),
        (sS.prototype.remove = function (t, e) {
          if ("string" == typeof t) {
            var r,
              n,
              i,
              s,
              o,
              a,
              u,
              l,
              h = this.activeIndexes,
              c = (this.selectors = []),
              f = this.selectorObjects,
              p = {},
              d = 1 === arguments.length;
            for (r = s7(this.indexes, t), i = 0; i < r.length; i++)
              for (n = r[i], s = h.length; s--; )
                if (((a = h[s]), n.index.isPrototypeOf(a))) {
                  if ((u = a.map.get(n.key)))
                    for (o = u.length; o--; )
                      (l = u[o]).selector === t &&
                        (d || l.data === e) &&
                        (u.splice(o, 1), (p[l.id] = !0));
                  break;
                }
            for (i in p) delete f[i], this.size--;
            for (i in f) c.push(f[i].selector);
          }
        }),
        (sS.prototype.queryAll = function (t) {
          if (!this.selectors.length) return [];
          var e,
            r,
            n,
            i,
            s,
            o,
            a,
            u,
            l = {},
            h = [],
            c = this.querySelectorAll(this.selectors.join(", "), t);
          for (e = 0, n = c.length; e < n; e++)
            for (
              s = c[e], r = 0, i = (o = this.matches(s)).length;
              r < i;
              r++
            )
              l[(u = o[r]).id]
                ? (a = l[u.id])
                : ((a = {
                    id: u.id,
                    selector: u.selector,
                    data: u.data,
                    elements: [],
                  }),
                  (l[u.id] = a),
                  h.push(a)),
                a.elements.push(s);
          return h.sort(sR);
        }),
        (sS.prototype.matches = function (t) {
          if (!t) return [];
          var e,
            r,
            n,
            i,
            s,
            o,
            a,
            u,
            l,
            h,
            c,
            f = this.activeIndexes,
            p = {},
            d = [];
          for (e = 0, i = f.length; e < i; e++)
            if ((u = (a = f[e]).element(t))) {
              for (r = 0, s = u.length; r < s; r++)
                if ((l = a.map.get(u[r])))
                  for (n = 0, o = l.length; n < o; n++)
                    !p[(c = (h = l[n]).id)] &&
                      this.matchesSelector(t, h.selector) &&
                      ((p[c] = !0), d.push(h));
            }
          return d.sort(sR);
        });
      let sM = {},
        sz = {},
        sN = ["mouseenter", "mouseleave", "pointerenter", "pointerleave"];
      function sI(t) {
        void 0 === sz[t] && (sz[t] = []);
      }
      function sj(t) {
        return "string" == typeof t ? document.querySelectorAll(t) : t;
      }
      function sU(t) {
        let e = (function (t, e) {
          let r = [],
            n = e;
          do {
            if (1 !== n.nodeType) break;
            let i = t.matches(n);
            i.length && r.push({ delegatedTarget: n, stack: i });
          } while ((n = n.parentElement));
          return r;
        })(sM[t.type], t.target);
        if (e.length)
          for (let r = 0; r < e.length; r++)
            for (let n = 0; n < e[r].stack.length; n++)
              -1 !== sN.indexOf(t.type)
                ? (sY(t, e[r].delegatedTarget),
                  t.target === e[r].delegatedTarget && e[r].stack[n].data(t))
                : (sY(t, e[r].delegatedTarget), e[r].stack[n].data(t));
      }
      function sY(t, e) {
        Object.defineProperty(t, "currentTarget", {
          configurable: !0,
          enumerable: !0,
          get: () => e,
        });
      }
      function sX(t) {
        return JSON.parse(JSON.stringify(t));
      }
      var sq = new (class {
        bindAll(t, e) {
          void 0 === e &&
            (e = Object.getOwnPropertyNames(Object.getPrototypeOf(t)));
          for (let r = 0; r < e.length; r++) t[e[r]] = t[e[r]].bind(t);
        }
        on(t, e, r, n) {
          let i = t.split(" ");
          for (let s = 0; s < i.length; s++)
            if ("function" != typeof e || void 0 !== r) {
              if (
                (e.nodeType && 1 === e.nodeType) ||
                e === window ||
                e === document
              )
                e.addEventListener(i[s], r, n);
              else {
                e = sj(e);
                for (let o = 0; o < e.length; o++)
                  e[o].addEventListener(i[s], r, n);
              }
            } else sI(i[s]), sz[i[s]].push(e);
        }
        delegate(t, e, r) {
          let n = t.split(" ");
          for (let i = 0; i < n.length; i++) {
            let s = sM[n[i]];
            void 0 === s &&
              ((s = new sS()),
              (sM[n[i]] = s),
              -1 !== sN.indexOf(n[i])
                ? document.addEventListener(n[i], sU, !0)
                : document.addEventListener(n[i], sU)),
              s.add(e, r);
          }
        }
        off(t, e, r, n) {
          let i = t.split(" ");
          for (let s = 0; s < i.length; s++) {
            if (void 0 === e) {
              sz[i[s]] = [];
              continue;
            }
            if ("function" == typeof e) {
              sI(i[s]);
              for (let o = 0; o < sz[i[s]].length; o++)
                sz[i[s]][o] === e && sz[i[s]].splice(o, 1);
              continue;
            }
            let a = sM[i[s]];
            if (void 0 === a || (a.remove(e, r), 0 !== a.size)) {
              if (void 0 === e.removeEventListener) {
                e = sj(e);
                for (let u = 0; u < e.length; u++)
                  e[u].removeEventListener(i[s], r, n);
              } else e.removeEventListener(i[s], r, n);
            } else
              delete sM[i[s]],
                -1 !== sN.indexOf(i[s])
                  ? document.removeEventListener(i[s], sU, !0)
                  : document.removeEventListener(i[s], sU);
          }
        }
        emit(t, ...e) {
          !(function (t, e) {
            if (sz[t]) for (let r = 0; r < sz[t].length; r++) sz[t][r](...e);
          })(t, e);
        }
        debugDelegated() {
          return sX(sM);
        }
        debugBus() {
          return sX(sz);
        }
      })();
      let sV = sq;
      function sG(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
        return n;
      }
      var sW = function (t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : document;
          return e.querySelector(t);
        },
        sH = function (t) {
          var e,
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : document;
          return (
            (function (t) {
              if (Array.isArray(t)) return sG(t);
            })((e = r.querySelectorAll(t))) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol &&
                  null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return sG(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                if (
                  ("Object" === r &&
                    t.constructor &&
                    (r = t.constructor.name),
                  "Map" === r || "Set" === r)
                )
                  return Array.from(t);
                if (
                  "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                )
                  return sG(t, e);
              }
            })(e) ||
            (function () {
              throw TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        },
        s9 = function (t) {
          return t.getBoundingClientRect();
        },
        sZ = { body: document.body, menu: sW(".js-clip-menu") },
        sK = { ww: window.innerWidth, wh: window.innerHeight, maxScroll: 0 },
        sQ = {
          isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
          isSafari:
            navigator.userAgent.indexOf("Safari") > -1 &&
            -1 >= navigator.userAgent.indexOf("Chrome"),
          isMobile:
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            ("MacIntel" === navigator.platform &&
              navigator.maxTouchPoints > 1),
          isSmall: window.matchMedia("(max-width: 649px)").matches,
          isPortrait: window.matchMedia("(orientation: portrait)").matches,
        };
      let sJ = {
        dom: sZ,
        bounds: sK,
        flags: { locked: !1, infiniteScroll: !1 },
        fromPage: { routes: [], total: 0 },
        device: sQ,
        features: {
          hasWheelEvent: "onwheel" in document,
          hasMouseWheelEvent: "onmousewheel" in document,
          hasTouch: "ontouchstart" in document,
          hasTouchWin:
            navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
          hasPointer: !!window.navigator.msPointerEnabled,
          hasKeyDown: "onkeydown" in document,
          hasSmoothScroll: !sQ.isMobile,
        },
      };
      var ot = sJ.features,
        oe = sJ.device,
        or = oe.isWindows,
        on = oe.isFirefox,
        oi = sJ.flags,
        os = sJ.device.isMobile,
        oo = r(198),
        oa = r.n(oo),
        ou = sJ.bounds,
        ol = sJ.device,
        oh = ol.isMobile,
        oc = sJ.dom,
        of = sJ.bounds,
        op = sJ.flags;
      function od(t) {
        let e = t[0],
          r = t[1],
          n = t[2];
        return Math.sqrt(e * e + r * r + n * n);
      }
      function o$(t, e) {
        return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
      }
      function og(t, e, r) {
        return (
          (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), (t[2] = e[2] + r[2]), t
        );
      }
      function om(t, e, r) {
        return (
          (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), (t[2] = e[2] - r[2]), t
        );
      }
      function o_(t, e, r) {
        return (t[0] = e[0] * r), (t[1] = e[1] * r), (t[2] = e[2] * r), t;
      }
      function ov(t) {
        let e = t[0],
          r = t[1],
          n = t[2];
        return e * e + r * r + n * n;
      }
      function oD(t, e) {
        let r = e[0],
          n = e[1],
          i = e[2],
          s = r * r + n * n + i * i;
        return (
          s > 0 && (s = 1 / Math.sqrt(s)),
          (t[0] = e[0] * s),
          (t[1] = e[1] * s),
          (t[2] = e[2] * s),
          t
        );
      }
      function oy(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
      }
      function o8(t, e, r) {
        let n = e[0],
          i = e[1],
          s = e[2],
          o = r[0],
          a = r[1],
          u = r[2];
        return (
          (t[0] = i * u - s * a),
          (t[1] = s * o - n * u),
          (t[2] = n * a - i * o),
          t
        );
      }
      sJ.features;
      let ox = (function () {
        let t = [0, 0, 0],
          e = [0, 0, 0];
        return function (r, n) {
          o$(t, r), o$(e, n), oD(t, t), oD(e, e);
          let i = oy(t, e);
          return i > 1 ? 0 : i < -1 ? Math.PI : Math.acos(i);
        };
      })();
      class o0 extends Array {
        constructor(t = 0, e = t, r = t) {
          return super(t, e, r), this;
        }
        get x() {
          return this[0];
        }
        get y() {
          return this[1];
        }
        get z() {
          return this[2];
        }
        set x(t) {
          this[0] = t;
        }
        set y(t) {
          this[1] = t;
        }
        set z(t) {
          this[2] = t;
        }
        set(t, e = t, r = t) {
          var n, i, s, o;
          return t.length
            ? this.copy(t)
            : ((n = this),
              (i = t),
              (s = e),
              (o = r),
              (n[0] = i),
              (n[1] = s),
              (n[2] = o),
              this);
        }
        copy(t) {
          return o$(this, t), this;
        }
        add(t, e) {
          return e ? og(this, t, e) : og(this, this, t), this;
        }
        sub(t, e) {
          return e ? om(this, t, e) : om(this, this, t), this;
        }
        multiply(t) {
          var e, r, n;
          return (
            t.length
              ? ((r = this),
                (n = t),
                ((e = this)[0] = r[0] * n[0]),
                (e[1] = r[1] * n[1]),
                (e[2] = r[2] * n[2]))
              : o_(this, this, t),
            this
          );
        }
        divide(t) {
          var e, r, n;
          return (
            t.length
              ? ((r = this),
                (n = t),
                ((e = this)[0] = r[0] / n[0]),
                (e[1] = r[1] / n[1]),
                (e[2] = r[2] / n[2]))
              : o_(this, this, 1 / t),
            this
          );
        }
        inverse(t = this) {
          var e, r;
          return (
            (r = t),
            ((e = this)[0] = 1 / r[0]),
            (e[1] = 1 / r[1]),
            (e[2] = 1 / r[2]),
            this
          );
        }
        len() {
          return od(this);
        }
        distance(t) {
          var e, r;
          let n, i, s;
          return t
            ? ((e = this),
              (n = (r = t)[0] - e[0]),
              (i = r[1] - e[1]),
              Math.sqrt(n * n + i * i + (s = r[2] - e[2]) * s))
            : od(this);
        }
        squaredLen() {
          return ov(this);
        }
        squaredDistance(t) {
          var e, r;
          let n, i, s;
          return t
            ? ((e = this),
              (n = (r = t)[0] - e[0]),
              (i = r[1] - e[1]),
              n * n + i * i + (s = r[2] - e[2]) * s)
            : ov(this);
        }
        negate(t = this) {
          var e, r;
          return (
            (r = t),
            ((e = this)[0] = -r[0]),
            (e[1] = -r[1]),
            (e[2] = -r[2]),
            this
          );
        }
        cross(t, e) {
          return e ? o8(this, t, e) : o8(this, this, t), this;
        }
        scale(t) {
          return o_(this, this, t), this;
        }
        normalize() {
          return oD(this, this), this;
        }
        dot(t) {
          return oy(this, t);
        }
        equals(t) {
          var e, r;
          return (
            (r = t), (e = this)[0] === r[0] && e[1] === r[1] && e[2] === r[2]
          );
        }
        applyMatrix4(t) {
          var e, r, n;
          let i, s, o, a;
          return (
            (e = this),
            (r = this),
            (n = t),
            (i = r[0]),
            (s = r[1]),
            (o = r[2]),
            (a = (a = n[3] * i + n[7] * s + n[11] * o + n[15]) || 1),
            (e[0] = (n[0] * i + n[4] * s + n[8] * o + n[12]) / a),
            (e[1] = (n[1] * i + n[5] * s + n[9] * o + n[13]) / a),
            (e[2] = (n[2] * i + n[6] * s + n[10] * o + n[14]) / a),
            this
          );
        }
        scaleRotateMatrix4(t) {
          var e, r, n;
          let i, s, o, a;
          return (
            (e = this),
            (r = this),
            (n = t),
            (i = r[0]),
            (s = r[1]),
            (o = r[2]),
            (a = (a = n[3] * i + n[7] * s + n[11] * o + n[15]) || 1),
            (e[0] = (n[0] * i + n[4] * s + n[8] * o) / a),
            (e[1] = (n[1] * i + n[5] * s + n[9] * o) / a),
            (e[2] = (n[2] * i + n[6] * s + n[10] * o) / a),
            this
          );
        }
        applyQuaternion(t) {
          var e, r, n;
          let i, s, o, a, u, l, h, c, f, p, d, $, g;
          return (
            (e = this),
            (r = this),
            (n = t),
            (i = r[0]),
            (s = r[1]),
            (o = r[2]),
            (a = n[0]),
            (h = (u = n[1]) * o - (l = n[2]) * s),
            (c = l * i - a * o),
            (f = a * s - u * i),
            (p = u * f - l * c),
            (d = l * h - a * f),
            ($ = a * c - u * h),
            (h *= g = 2 * n[3]),
            (c *= g),
            (f *= g),
            (p *= 2),
            (d *= 2),
            ($ *= 2),
            (e[0] = i + h + p),
            (e[1] = s + c + d),
            (e[2] = o + f + $),
            this
          );
        }
        angle(t) {
          return ox(this, t);
        }
        lerp(t, e) {
          var r, n, i, s;
          let o, a, u;
          return (
            (r = this),
            (n = this),
            (i = t),
            (s = e),
            (o = n[0]),
            (a = n[1]),
            (u = n[2]),
            (r[0] = o + s * (i[0] - o)),
            (r[1] = a + s * (i[1] - a)),
            (r[2] = u + s * (i[2] - u)),
            this
          );
        }
        clone() {
          return new o0(this[0], this[1], this[2]);
        }
        fromArray(t, e = 0) {
          return (
            (this[0] = t[e]), (this[1] = t[e + 1]), (this[2] = t[e + 2]), this
          );
        }
        toArray(t = [], e = 0) {
          return (
            (t[e] = this[0]), (t[e + 1] = this[1]), (t[e + 2] = this[2]), t
          );
        }
        transformDirection(t) {
          let e = this[0],
            r = this[1],
            n = this[2];
          return (
            (this[0] = t[0] * e + t[4] * r + t[8] * n),
            (this[1] = t[1] * e + t[5] * r + t[9] * n),
            (this[2] = t[2] * e + t[6] * r + t[10] * n),
            this.normalize()
          );
        }
      }
      let ob = new o0(),
        ow = 1;
      class oE {
        constructor({
          canvas: t = document.createElement("canvas"),
          width: e = 300,
          height: r = 150,
          dpr: n = 1,
          alpha: i = !1,
          depth: s = !0,
          stencil: o = !1,
          antialias: a = !1,
          premultipliedAlpha: u = !1,
          preserveDrawingBuffer: l = !1,
          powerPreference: h = "default",
          autoClear: c = !0,
          webgl: f = 2,
        } = {}) {
          let p = {
            alpha: i,
            depth: s,
            stencil: o,
            antialias: a,
            premultipliedAlpha: u,
            preserveDrawingBuffer: l,
            powerPreference: h,
          };
          (this.dpr = n),
            (this.alpha = i),
            (this.color = !0),
            (this.depth = s),
            (this.stencil = o),
            (this.premultipliedAlpha = u),
            (this.autoClear = c),
            (this.id = ow++),
            2 === f && (this.gl = t.getContext("webgl2", p)),
            (this.isWebgl2 = !!this.gl),
            this.gl || (this.gl = t.getContext("webgl", p)),
            this.gl || console.error("unable to create webgl context"),
            (this.gl.renderer = this),
            this.setSize(e, r),
            (this.state = {}),
            (this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO }),
            (this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD }),
            (this.state.cullFace = null),
            (this.state.frontFace = this.gl.CCW),
            (this.state.depthMask = !0),
            (this.state.depthFunc = this.gl.LESS),
            (this.state.premultiplyAlpha = !1),
            (this.state.flipY = !1),
            (this.state.unpackAlignment = 4),
            (this.state.framebuffer = null),
            (this.state.viewport = { width: null, height: null }),
            (this.state.textureUnits = []),
            (this.state.activeTextureUnit = 0),
            (this.state.boundBuffer = null),
            (this.state.uniformLocations = new Map()),
            (this.extensions = {}),
            this.isWebgl2
              ? (this.getExtension("EXT_color_buffer_float"),
                this.getExtension("OES_texture_float_linear"))
              : (this.getExtension("OES_texture_float"),
                this.getExtension("OES_texture_float_linear"),
                this.getExtension("OES_texture_half_float"),
                this.getExtension("OES_texture_half_float_linear"),
                this.getExtension("OES_element_index_uint"),
                this.getExtension("OES_standard_derivatives"),
                this.getExtension("EXT_sRGB"),
                this.getExtension("WEBGL_depth_texture"),
                this.getExtension("WEBGL_draw_buffers")),
            (this.vertexAttribDivisor = this.getExtension(
              "ANGLE_instanced_arrays",
              "vertexAttribDivisor",
              "vertexAttribDivisorANGLE"
            )),
            (this.drawArraysInstanced = this.getExtension(
              "ANGLE_instanced_arrays",
              "drawArraysInstanced",
              "drawArraysInstancedANGLE"
            )),
            (this.drawElementsInstanced = this.getExtension(
              "ANGLE_instanced_arrays",
              "drawElementsInstanced",
              "drawElementsInstancedANGLE"
            )),
            (this.createVertexArray = this.getExtension(
              "OES_vertex_array_object",
              "createVertexArray",
              "createVertexArrayOES"
            )),
            (this.bindVertexArray = this.getExtension(
              "OES_vertex_array_object",
              "bindVertexArray",
              "bindVertexArrayOES"
            )),
            (this.deleteVertexArray = this.getExtension(
              "OES_vertex_array_object",
              "deleteVertexArray",
              "deleteVertexArrayOES"
            )),
            (this.drawBuffers = this.getExtension(
              "WEBGL_draw_buffers",
              "drawBuffers",
              "drawBuffersWEBGL"
            )),
            (this.parameters = {}),
            (this.parameters.maxTextureUnits = this.gl.getParameter(
              this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS
            )),
            (this.parameters.maxAnisotropy = this.getExtension(
              "EXT_texture_filter_anisotropic"
            )
              ? this.gl.getParameter(
                  this.getExtension("EXT_texture_filter_anisotropic")
                    .MAX_TEXTURE_MAX_ANISOTROPY_EXT
                )
              : 0);
        }
        setSize(t, e) {
          (this.width = t),
            (this.height = e),
            (this.gl.canvas.width = t * this.dpr),
            (this.gl.canvas.height = e * this.dpr),
            Object.assign(this.gl.canvas.style, {
              width: t + "px",
              height: e + "px",
            });
        }
        setViewport(t, e) {
          (this.state.viewport.width === t &&
            this.state.viewport.height === e) ||
            ((this.state.viewport.width = t),
            (this.state.viewport.height = e),
            this.gl.viewport(0, 0, t, e));
        }
        enable(t) {
          !0 !== this.state[t] && (this.gl.enable(t), (this.state[t] = !0));
        }
        disable(t) {
          !1 !== this.state[t] && (this.gl.disable(t), (this.state[t] = !1));
        }
        setBlendFunc(t, e, r, n) {
          (this.state.blendFunc.src === t &&
            this.state.blendFunc.dst === e &&
            this.state.blendFunc.srcAlpha === r &&
            this.state.blendFunc.dstAlpha === n) ||
            ((this.state.blendFunc.src = t),
            (this.state.blendFunc.dst = e),
            (this.state.blendFunc.srcAlpha = r),
            (this.state.blendFunc.dstAlpha = n),
            void 0 !== r
              ? this.gl.blendFuncSeparate(t, e, r, n)
              : this.gl.blendFunc(t, e));
        }
        setBlendEquation(t, e) {
          (t = t || this.gl.FUNC_ADD),
            (this.state.blendEquation.modeRGB === t &&
              this.state.blendEquation.modeAlpha === e) ||
              ((this.state.blendEquation.modeRGB = t),
              (this.state.blendEquation.modeAlpha = e),
              void 0 !== e
                ? this.gl.blendEquationSeparate(t, e)
                : this.gl.blendEquation(t));
        }
        setCullFace(t) {
          this.state.cullFace !== t &&
            ((this.state.cullFace = t), this.gl.cullFace(t));
        }
        setFrontFace(t) {
          this.state.frontFace !== t &&
            ((this.state.frontFace = t), this.gl.frontFace(t));
        }
        setDepthMask(t) {
          this.state.depthMask !== t &&
            ((this.state.depthMask = t), this.gl.depthMask(t));
        }
        setDepthFunc(t) {
          this.state.depthFunc !== t &&
            ((this.state.depthFunc = t), this.gl.depthFunc(t));
        }
        activeTexture(t) {
          this.state.activeTextureUnit !== t &&
            ((this.state.activeTextureUnit = t),
            this.gl.activeTexture(this.gl.TEXTURE0 + t));
        }
        bindFramebuffer({
          target: t = this.gl.FRAMEBUFFER,
          buffer: e = null,
        } = {}) {
          this.state.framebuffer !== e &&
            ((this.state.framebuffer = e), this.gl.bindFramebuffer(t, e));
        }
        getExtension(t, e, r) {
          return e && this.gl[e]
            ? this.gl[e].bind(this.gl)
            : (this.extensions[t] ||
                (this.extensions[t] = this.gl.getExtension(t)),
              e
                ? this.extensions[t]
                  ? this.extensions[t][r].bind(this.extensions[t])
                  : null
                : this.extensions[t]);
        }
        sortOpaque(t, e) {
          return t.renderOrder !== e.renderOrder
            ? t.renderOrder - e.renderOrder
            : t.program.id !== e.program.id
            ? t.program.id - e.program.id
            : t.zDepth !== e.zDepth
            ? t.zDepth - e.zDepth
            : e.id - t.id;
        }
        sortTransparent(t, e) {
          return t.renderOrder !== e.renderOrder
            ? t.renderOrder - e.renderOrder
            : t.zDepth !== e.zDepth
            ? e.zDepth - t.zDepth
            : e.id - t.id;
        }
        sortUI(t, e) {
          return t.renderOrder !== e.renderOrder
            ? t.renderOrder - e.renderOrder
            : t.program.id !== e.program.id
            ? t.program.id - e.program.id
            : e.id - t.id;
        }
        getRenderList({ scene: t, camera: e, frustumCull: r, sort: n }) {
          let i = [];
          if (
            (e && r && e.updateFrustum(),
            t.traverse((t) => {
              if (!t.visible) return !0;
              t.draw &&
                ((r && t.frustumCulled && e && !e.frustumIntersectsMesh(t)) ||
                  i.push(t));
            }),
            n)
          ) {
            let s = [],
              o = [],
              a = [];
            i.forEach((t) => {
              t.program.transparent
                ? t.program.depthTest
                  ? o.push(t)
                  : a.push(t)
                : s.push(t),
                (t.zDepth = 0),
                0 === t.renderOrder &&
                  t.program.depthTest &&
                  e &&
                  (t.worldMatrix.getTranslation(ob),
                  ob.applyMatrix4(e.projectionViewMatrix),
                  (t.zDepth = ob.z));
            }),
              s.sort(this.sortOpaque),
              o.sort(this.sortTransparent),
              a.sort(this.sortUI),
              (i = s.concat(o, a));
          }
          return i;
        }
        render({
          scene: t,
          camera: e,
          target: r = null,
          update: n = !0,
          sort: i = !0,
          frustumCull: s = !0,
          clear: o,
        }) {
          null === r
            ? (this.bindFramebuffer(),
              this.setViewport(this.width * this.dpr, this.height * this.dpr))
            : (this.bindFramebuffer(r), this.setViewport(r.width, r.height)),
            (o || (this.autoClear && !1 !== o)) &&
              (this.depth &&
                (!r || r.depth) &&
                (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)),
              this.gl.clear(
                (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
                  (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
                  (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
              )),
            n && t.updateMatrixWorld(),
            e && e.updateMatrixWorld(),
            this.getRenderList({
              scene: t,
              camera: e,
              frustumCull: s,
              sort: i,
            }).forEach((t) => {
              t.draw({ camera: e });
            });
        }
      }
      let oC = new o0(),
        o1 = 1,
        oF = 1,
        oT = !1;
      class oA {
        constructor(t, e = {}) {
          for (let r in (t.canvas ||
            console.error("gl not passed as first argument to Geometry"),
          (this.gl = t),
          (this.attributes = e),
          (this.id = o1++),
          (this.VAOs = {}),
          (this.drawRange = { start: 0, count: 0 }),
          (this.instancedCount = 0),
          this.gl.renderer.bindVertexArray(null),
          (this.gl.renderer.currentGeometry = null),
          (this.glState = this.gl.renderer.state),
          e))
            this.addAttribute(r, e[r]);
        }
        addAttribute(t, e) {
          if (
            ((this.attributes[t] = e),
            (e.id = oF++),
            (e.size = e.size || 1),
            (e.type =
              e.type ||
              (e.data.constructor === Float32Array
                ? this.gl.FLOAT
                : e.data.constructor === Uint16Array
                ? this.gl.UNSIGNED_SHORT
                : this.gl.UNSIGNED_INT)),
            (e.target =
              "index" === t
                ? this.gl.ELEMENT_ARRAY_BUFFER
                : this.gl.ARRAY_BUFFER),
            (e.normalized = e.normalized || !1),
            (e.stride = e.stride || 0),
            (e.offset = e.offset || 0),
            (e.count =
              e.count ||
              (e.stride
                ? e.data.byteLength / e.stride
                : e.data.length / e.size)),
            (e.divisor = e.instanced || 0),
            (e.needsUpdate = !1),
            e.buffer ||
              ((e.buffer = this.gl.createBuffer()), this.updateAttribute(e)),
            e.divisor)
          ) {
            if (
              ((this.isInstanced = !0),
              this.instancedCount &&
                this.instancedCount !== e.count * e.divisor)
            )
              return (
                console.warn(
                  "geometry has multiple instanced buffers of different length"
                ),
                (this.instancedCount = Math.min(
                  this.instancedCount,
                  e.count * e.divisor
                ))
              );
            this.instancedCount = e.count * e.divisor;
          } else
            "index" === t
              ? (this.drawRange.count = e.count)
              : this.attributes.index ||
                (this.drawRange.count = Math.max(
                  this.drawRange.count,
                  e.count
                ));
        }
        updateAttribute(t) {
          this.glState.boundBuffer !== t.buffer &&
            (this.gl.bindBuffer(t.target, t.buffer),
            (this.glState.boundBuffer = t.buffer)),
            this.gl.bufferData(t.target, t.data, this.gl.STATIC_DRAW),
            (t.needsUpdate = !1);
        }
        setIndex(t) {
          this.addAttribute("index", t);
        }
        setDrawRange(t, e) {
          (this.drawRange.start = t), (this.drawRange.count = e);
        }
        setInstancedCount(t) {
          this.instancedCount = t;
        }
        createVAO(t) {
          (this.VAOs[t.attributeOrder] =
            this.gl.renderer.createVertexArray()),
            this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),
            this.bindAttributes(t);
        }
        bindAttributes(t) {
          t.attributeLocations.forEach((t, { name: e, type: r }) => {
            if (!this.attributes[e])
              return void console.warn(
                `active attribute ${e} not being supplied`
              );
            let n = this.attributes[e];
            this.gl.bindBuffer(n.target, n.buffer),
              (this.glState.boundBuffer = n.buffer);
            let i = 1;
            35674 === r && (i = 2),
              35675 === r && (i = 3),
              35676 === r && (i = 4);
            let s = n.size / i,
              o = 1 === i ? 0 : i * i * i,
              a = 1 === i ? 0 : i * i;
            for (let u = 0; u < i; u++)
              this.gl.vertexAttribPointer(
                t + u,
                s,
                n.type,
                n.normalized,
                n.stride + o,
                n.offset + u * a
              ),
                this.gl.enableVertexAttribArray(t + u),
                this.gl.renderer.vertexAttribDivisor(t + u, n.divisor);
          }),
            this.attributes.index &&
              this.gl.bindBuffer(
                this.gl.ELEMENT_ARRAY_BUFFER,
                this.attributes.index.buffer
              );
        }
        draw({ program: t, mode: e = this.gl.TRIANGLES }) {
          this.gl.renderer.currentGeometry !==
            `${this.id}_${t.attributeOrder}` &&
            (this.VAOs[t.attributeOrder] || this.createVAO(t),
            this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),
            (this.gl.renderer.currentGeometry = `${this.id}_${t.attributeOrder}`)),
            t.attributeLocations.forEach((t, { name: e }) => {
              let r = this.attributes[e];
              r.needsUpdate && this.updateAttribute(r);
            }),
            this.isInstanced
              ? this.attributes.index
                ? this.gl.renderer.drawElementsInstanced(
                    e,
                    this.drawRange.count,
                    this.attributes.index.type,
                    this.attributes.index.offset + 2 * this.drawRange.start,
                    this.instancedCount
                  )
                : this.gl.renderer.drawArraysInstanced(
                    e,
                    this.drawRange.start,
                    this.drawRange.count,
                    this.instancedCount
                  )
              : this.attributes.index
              ? this.gl.drawElements(
                  e,
                  this.drawRange.count,
                  this.attributes.index.type,
                  this.attributes.index.offset + 2 * this.drawRange.start
                )
              : this.gl.drawArrays(
                  e,
                  this.drawRange.start,
                  this.drawRange.count
                );
        }
        getPosition() {
          let t = this.attributes.position;
          return t.data
            ? t
            : oT
            ? void 0
            : (console.warn(
                "No position buffer data found to compute bounds"
              ),
              (oT = !0));
        }
        computeBoundingBox(t) {
          t || (t = this.getPosition());
          let e = t.data,
            r = t.offset || 0,
            n = t.stride || t.size;
          this.bounds ||
            (this.bounds = {
              min: new o0(),
              max: new o0(),
              center: new o0(),
              scale: new o0(),
              radius: 1 / 0,
            });
          let i = this.bounds.min,
            s = this.bounds.max,
            o = this.bounds.center,
            a = this.bounds.scale;
          i.set(1 / 0), s.set(-1 / 0);
          for (let u = r, l = e.length; u < l; u += n) {
            let h = e[u],
              c = e[u + 1],
              f = e[u + 2];
            (i.x = Math.min(h, i.x)),
              (i.y = Math.min(c, i.y)),
              (i.z = Math.min(f, i.z)),
              (s.x = Math.max(h, s.x)),
              (s.y = Math.max(c, s.y)),
              (s.z = Math.max(f, s.z));
          }
          a.sub(s, i), o.add(i, s).divide(2);
        }
        computeBoundingSphere(t) {
          t || (t = this.getPosition());
          let e = t.data,
            r = t.offset || 0,
            n = t.stride || t.size;
          this.bounds || this.computeBoundingBox(t);
          let i = 0;
          for (let s = r, o = e.length; s < o; s += n)
            oC.fromArray(e, s),
              (i = Math.max(i, this.bounds.center.squaredDistance(oC)));
          this.bounds.radius = Math.sqrt(i);
        }
        remove() {
          for (let t in this.VAOs)
            this.gl.renderer.deleteVertexArray(this.VAOs[t]),
              delete this.VAOs[t];
          for (let e in this.attributes)
            this.gl.deleteBuffer(this.attributes[e].buffer),
              delete this.attributes[e];
        }
      }
      class o3 extends oA {
        constructor(t, { attributes: e = {} } = {}) {
          Object.assign(e, {
            position: {
              size: 2,
              data: new Float32Array([-1, -1, 3, -1, -1, 3]),
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
          }),
            super(t, e);
        }
      }
      let o4 = 1,
        oS = {};
      class o6 {
        constructor(
          t,
          {
            vertex: e,
            fragment: r,
            uniforms: n = {},
            transparent: i = !1,
            cullFace: s = t.BACK,
            frontFace: o = t.CCW,
            depthTest: a = !0,
            depthWrite: u = !0,
            depthFunc: l = t.LESS,
          } = {}
        ) {
          t.canvas ||
            console.error("gl not passed as fist argument to Program"),
            (this.gl = t),
            (this.uniforms = n),
            (this.id = o4++),
            e || console.warn("vertex shader not supplied"),
            r || console.warn("fragment shader not supplied"),
            (this.transparent = i),
            (this.cullFace = s),
            (this.frontFace = o),
            (this.depthTest = a),
            (this.depthWrite = u),
            (this.depthFunc = l),
            (this.blendFunc = {}),
            (this.blendEquation = {}),
            this.transparent &&
              !this.blendFunc.src &&
              (this.gl.renderer.premultipliedAlpha
                ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
                : this.setBlendFunc(
                    this.gl.SRC_ALPHA,
                    this.gl.ONE_MINUS_SRC_ALPHA
                  ));
          let h = t.createShader(t.VERTEX_SHADER);
          t.shaderSource(h, e),
            t.compileShader(h),
            "" !== t.getShaderInfoLog(h) &&
              console.warn(`${t.getShaderInfoLog(h)}
Vertex Shader
${o2(e)}`);
          let c = t.createShader(t.FRAGMENT_SHADER);
          if (
            (t.shaderSource(c, r),
            t.compileShader(c),
            "" !== t.getShaderInfoLog(c) &&
              console.warn(`${t.getShaderInfoLog(c)}
Fragment Shader
${o2(r)}`),
            (this.program = t.createProgram()),
            t.attachShader(this.program, h),
            t.attachShader(this.program, c),
            t.linkProgram(this.program),
            !t.getProgramParameter(this.program, t.LINK_STATUS))
          )
            return console.warn(t.getProgramInfoLog(this.program));
          t.deleteShader(h),
            t.deleteShader(c),
            (this.uniformLocations = new Map());
          let f = t.getProgramParameter(this.program, t.ACTIVE_UNIFORMS);
          for (let p = 0; p < f; p++) {
            let d = t.getActiveUniform(this.program, p);
            this.uniformLocations.set(
              d,
              t.getUniformLocation(this.program, d.name)
            );
            let $ = d.name.match(/(\w+)/g);
            (d.uniformName = $[0]),
              3 === $.length
                ? ((d.isStructArray = !0),
                  (d.structIndex = Number($[1])),
                  (d.structProperty = $[2]))
                : 2 === $.length &&
                  isNaN(Number($[1])) &&
                  ((d.isStruct = !0), (d.structProperty = $[1]));
          }
          this.attributeLocations = new Map();
          let g = [],
            m = t.getProgramParameter(this.program, t.ACTIVE_ATTRIBUTES);
          for (let _ = 0; _ < m; _++) {
            let v = t.getActiveAttrib(this.program, _),
              D = t.getAttribLocation(this.program, v.name);
            (g[D] = v.name), this.attributeLocations.set(v, D);
          }
          this.attributeOrder = g.join("");
        }
        setBlendFunc(t, e, r, n) {
          (this.blendFunc.src = t),
            (this.blendFunc.dst = e),
            (this.blendFunc.srcAlpha = r),
            (this.blendFunc.dstAlpha = n),
            t && (this.transparent = !0);
        }
        setBlendEquation(t, e) {
          (this.blendEquation.modeRGB = t),
            (this.blendEquation.modeAlpha = e);
        }
        applyState() {
          this.depthTest
            ? this.gl.renderer.enable(this.gl.DEPTH_TEST)
            : this.gl.renderer.disable(this.gl.DEPTH_TEST),
            this.cullFace
              ? this.gl.renderer.enable(this.gl.CULL_FACE)
              : this.gl.renderer.disable(this.gl.CULL_FACE),
            this.blendFunc.src
              ? this.gl.renderer.enable(this.gl.BLEND)
              : this.gl.renderer.disable(this.gl.BLEND),
            this.cullFace && this.gl.renderer.setCullFace(this.cullFace),
            this.gl.renderer.setFrontFace(this.frontFace),
            this.gl.renderer.setDepthMask(this.depthWrite),
            this.gl.renderer.setDepthFunc(this.depthFunc),
            this.blendFunc.src &&
              this.gl.renderer.setBlendFunc(
                this.blendFunc.src,
                this.blendFunc.dst,
                this.blendFunc.srcAlpha,
                this.blendFunc.dstAlpha
              ),
            this.gl.renderer.setBlendEquation(
              this.blendEquation.modeRGB,
              this.blendEquation.modeAlpha
            );
        }
        use({ flipFaces: t = !1 } = {}) {
          let e = -1;
          this.gl.renderer.currentProgram === this.id ||
            (this.gl.useProgram(this.program),
            (this.gl.renderer.currentProgram = this.id)),
            this.uniformLocations.forEach((t, r) => {
              let n = r.uniformName,
                i = this.uniforms[n];
              if (
                (r.isStruct &&
                  ((i = i[r.structProperty]), (n += `.${r.structProperty}`)),
                r.isStructArray &&
                  ((i = i[r.structIndex][r.structProperty]),
                  (n += `[${r.structIndex}].${r.structProperty}`)),
                !i)
              )
                return oO(`Active uniform ${n} has not been supplied`);
              if (i && void 0 === i.value)
                return oO(`${n} uniform is missing a value parameter`);
              if (i.value.texture)
                return (e += 1), i.value.update(e), oP(this.gl, r.type, t, e);
              if (i.value.length && i.value[0].texture) {
                let s = [];
                return (
                  i.value.forEach((t) => {
                    (e += 1), t.update(e), s.push(e);
                  }),
                  oP(this.gl, r.type, t, s)
                );
              }
              oP(this.gl, r.type, t, i.value);
            }),
            this.applyState(),
            t &&
              this.gl.renderer.setFrontFace(
                this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW
              );
        }
        remove() {
          this.gl.deleteProgram(this.program);
        }
      }
      function oP(t, e, r, n) {
        n = n.length
          ? (function (t) {
              let e = t.length,
                r = t[0].length;
              if (void 0 === r) return t;
              let n = e * r,
                i = oS[n];
              i || (oS[n] = i = new Float32Array(n));
              for (let s = 0; s < e; s++) i.set(t[s], s * r);
              return i;
            })(n)
          : n;
        let i = t.renderer.state.uniformLocations.get(r);
        if (n.length) {
          if (void 0 === i || i.length !== n.length)
            t.renderer.state.uniformLocations.set(r, n.slice(0));
          else {
            if (
              (function (t, e) {
                if (t.length !== e.length) return !1;
                for (let r = 0, n = t.length; r < n; r++)
                  if (t[r] !== e[r]) return !1;
                return !0;
              })(i, n)
            )
              return;
            i.set
              ? i.set(n)
              : (function (t, e) {
                  for (let r = 0, n = t.length; r < n; r++) t[r] = e[r];
                })(i, n),
              t.renderer.state.uniformLocations.set(r, i);
          }
        } else {
          if (i === n) return;
          t.renderer.state.uniformLocations.set(r, n);
        }
        switch (e) {
          case 5126:
            return n.length ? t.uniform1fv(r, n) : t.uniform1f(r, n);
          case 35664:
            return t.uniform2fv(r, n);
          case 35665:
            return t.uniform3fv(r, n);
          case 35666:
            return t.uniform4fv(r, n);
          case 35670:
          case 5124:
          case 35678:
          case 35680:
            return n.length ? t.uniform1iv(r, n) : t.uniform1i(r, n);
          case 35671:
          case 35667:
            return t.uniform2iv(r, n);
          case 35672:
          case 35668:
            return t.uniform3iv(r, n);
          case 35673:
          case 35669:
            return t.uniform4iv(r, n);
          case 35674:
            return t.uniformMatrix2fv(r, !1, n);
          case 35675:
            return t.uniformMatrix3fv(r, !1, n);
          case 35676:
            return t.uniformMatrix4fv(r, !1, n);
        }
      }
      function o2(t) {
        let e = t.split("\n");
        for (let r = 0; r < e.length; r++) e[r] = r + 1 + ": " + e[r];
        return e.join("\n");
      }
      let ok = 0;
      function oO(t) {
        ok > 100 ||
          (console.warn(t),
          ++ok > 100 &&
            console.warn("More than 100 program warnings - stopping logs."));
      }
      let oB = {
        black: "#000000",
        white: "#ffffff",
        red: "#ff0000",
        green: "#00ff00",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        cyan: "#00ffff",
        yellow: "#ffff00",
        orange: "#ff8000",
      };
      function o5(t) {
        4 === t.length &&
          (t = t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3]);
        let e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return (
          e ||
            console.warn(`Unable to convert hex string ${t} to rgb values`),
          [
            parseInt(e[1], 16) / 255,
            parseInt(e[2], 16) / 255,
            parseInt(e[3], 16) / 255,
          ]
        );
      }
      function o7(t) {
        var e;
        return void 0 === t
          ? [0, 0, 0]
          : 3 === arguments.length
          ? arguments
          : isNaN(t)
          ? "#" === t[0]
            ? o5(t)
            : oB[t.toLowerCase()]
            ? o5(oB[t.toLowerCase()])
            : (console.warn("Color format not recognised"), [0, 0, 0])
          : [
              (((e = parseInt((e = t))) >> 16) & 255) / 255,
              ((e >> 8) & 255) / 255,
              (255 & e) / 255,
            ];
      }
      class oL extends Array {
        constructor(t) {
          return Array.isArray(t) ? super(...t) : super(...o7(...arguments));
        }
        get r() {
          return this[0];
        }
        get g() {
          return this[1];
        }
        get b() {
          return this[2];
        }
        set r(t) {
          this[0] = t;
        }
        set g(t) {
          this[1] = t;
        }
        set b(t) {
          this[2] = t;
        }
        set(t) {
          return Array.isArray(t)
            ? this.copy(t)
            : this.copy(o7(...arguments));
        }
        copy(t) {
          return (this[0] = t[0]), (this[1] = t[1]), (this[2] = t[2]), this;
        }
      }
      function oR(t, e, r) {
        let n = e[0],
          i = e[1],
          s = e[2],
          o = e[3],
          a = r[0],
          u = r[1],
          l = r[2],
          h = r[3];
        return (
          (t[0] = n * h + o * a + i * l - s * u),
          (t[1] = i * h + o * u + s * a - n * l),
          (t[2] = s * h + o * l + n * u - i * a),
          (t[3] = o * h - n * a - i * u - s * l),
          t
        );
      }
      let oM = function (t, e) {
        let r = e[0],
          n = e[1],
          i = e[2],
          s = e[3],
          o = r * r + n * n + i * i + s * s;
        return (
          o > 0 && (o = 1 / Math.sqrt(o)),
          (t[0] = r * o),
          (t[1] = n * o),
          (t[2] = i * o),
          (t[3] = s * o),
          t
        );
      };
      function oz(t, e, r) {
        let n = e[0],
          i = e[1],
          s = e[2],
          o = e[3],
          a = e[4],
          u = e[5],
          l = e[6],
          h = e[7],
          c = e[8],
          f = e[9],
          p = e[10],
          d = e[11],
          $ = e[12],
          g = e[13],
          m = e[14],
          _ = e[15],
          v = r[0],
          D = r[1],
          y = r[2],
          x = r[3];
        return (
          (t[0] = v * n + D * a + y * c + x * $),
          (t[1] = v * i + D * u + y * f + x * g),
          (t[2] = v * s + D * l + y * p + x * m),
          (t[3] = v * o + D * h + y * d + x * _),
          (v = r[4]),
          (D = r[5]),
          (y = r[6]),
          (x = r[7]),
          (t[4] = v * n + D * a + y * c + x * $),
          (t[5] = v * i + D * u + y * f + x * g),
          (t[6] = v * s + D * l + y * p + x * m),
          (t[7] = v * o + D * h + y * d + x * _),
          (v = r[8]),
          (D = r[9]),
          (y = r[10]),
          (x = r[11]),
          (t[8] = v * n + D * a + y * c + x * $),
          (t[9] = v * i + D * u + y * f + x * g),
          (t[10] = v * s + D * l + y * p + x * m),
          (t[11] = v * o + D * h + y * d + x * _),
          (v = r[12]),
          (D = r[13]),
          (y = r[14]),
          (x = r[15]),
          (t[12] = v * n + D * a + y * c + x * $),
          (t[13] = v * i + D * u + y * f + x * g),
          (t[14] = v * s + D * l + y * p + x * m),
          (t[15] = v * o + D * h + y * d + x * _),
          t
        );
      }
      function oN(t, e) {
        let r = e[0],
          n = e[1],
          i = e[2],
          s = e[4],
          o = e[5],
          a = e[6],
          u = e[8],
          l = e[9],
          h = e[10];
        return (
          (t[0] = Math.hypot(r, n, i)),
          (t[1] = Math.hypot(s, o, a)),
          (t[2] = Math.hypot(u, l, h)),
          t
        );
      }
      let oI = (function () {
        let t = [0, 0, 0];
        return function (e, r) {
          let n = t;
          oN(n, r);
          let i = 1 / n[0],
            s = 1 / n[1],
            o = 1 / n[2],
            a = r[0] * i,
            u = r[1] * s,
            l = r[2] * o,
            h = r[4] * i,
            c = r[5] * s,
            f = r[6] * o,
            p = r[8] * i,
            d = r[9] * s,
            $ = r[10] * o,
            g = a + c + $,
            m = 0;
          return (
            g > 0
              ? ((m = 2 * Math.sqrt(g + 1)),
                (e[3] = 0.25 * m),
                (e[0] = (f - d) / m),
                (e[1] = (p - l) / m),
                (e[2] = (u - h) / m))
              : a > c && a > $
              ? ((m = 2 * Math.sqrt(1 + a - c - $)),
                (e[3] = (f - d) / m),
                (e[0] = 0.25 * m),
                (e[1] = (u + h) / m),
                (e[2] = (p + l) / m))
              : c > $
              ? ((m = 2 * Math.sqrt(1 + c - a - $)),
                (e[3] = (p - l) / m),
                (e[0] = (u + h) / m),
                (e[1] = 0.25 * m),
                (e[2] = (f + d) / m))
              : ((m = 2 * Math.sqrt(1 + $ - a - c)),
                (e[3] = (u - h) / m),
                (e[0] = (p + l) / m),
                (e[1] = (f + d) / m),
                (e[2] = 0.25 * m)),
            e
          );
        };
      })();
      class oj extends Array {
        constructor(
          t = 1,
          e = 0,
          r = 0,
          n = 0,
          i = 0,
          s = 1,
          o = 0,
          a = 0,
          u = 0,
          l = 0,
          h = 1,
          c = 0,
          f = 0,
          p = 0,
          d = 0,
          $ = 1
        ) {
          return super(t, e, r, n, i, s, o, a, u, l, h, c, f, p, d, $), this;
        }
        get x() {
          return this[12];
        }
        get y() {
          return this[13];
        }
        get z() {
          return this[14];
        }
        get w() {
          return this[15];
        }
        set x(t) {
          this[12] = t;
        }
        set y(t) {
          this[13] = t;
        }
        set z(t) {
          this[14] = t;
        }
        set w(t) {
          this[15] = t;
        }
        set(t, e, r, n, i, s, o, a, u, l, h, c, f, p, d, $) {
          var g, m, _, v, D, y, x, b, w, E, C, F, T, A, S, P, k;
          return t.length
            ? this.copy(t)
            : ((g = this),
              (m = t),
              (_ = e),
              (v = r),
              (D = n),
              (y = i),
              (x = s),
              (b = o),
              (w = a),
              (E = u),
              (C = l),
              (F = h),
              (T = c),
              (A = f),
              (S = p),
              (P = d),
              (k = $),
              (g[0] = m),
              (g[1] = _),
              (g[2] = v),
              (g[3] = D),
              (g[4] = y),
              (g[5] = x),
              (g[6] = b),
              (g[7] = w),
              (g[8] = E),
              (g[9] = C),
              (g[10] = F),
              (g[11] = T),
              (g[12] = A),
              (g[13] = S),
              (g[14] = P),
              (g[15] = k),
              this);
        }
        translate(t, e = this) {
          var r, n, i;
          let s, o, a, u, l, h, c, f, p, d, $, g, m, _, v;
          return (
            (r = this),
            (n = e),
            (m = (i = t)[0]),
            (_ = i[1]),
            (v = i[2]),
            n === r
              ? ((r[12] = n[0] * m + n[4] * _ + n[8] * v + n[12]),
                (r[13] = n[1] * m + n[5] * _ + n[9] * v + n[13]),
                (r[14] = n[2] * m + n[6] * _ + n[10] * v + n[14]),
                (r[15] = n[3] * m + n[7] * _ + n[11] * v + n[15]))
              : ((s = n[0]),
                (o = n[1]),
                (a = n[2]),
                (u = n[3]),
                (l = n[4]),
                (h = n[5]),
                (c = n[6]),
                (f = n[7]),
                (p = n[8]),
                (d = n[9]),
                ($ = n[10]),
                (g = n[11]),
                (r[0] = s),
                (r[1] = o),
                (r[2] = a),
                (r[3] = u),
                (r[4] = l),
                (r[5] = h),
                (r[6] = c),
                (r[7] = f),
                (r[8] = p),
                (r[9] = d),
                (r[10] = $),
                (r[11] = g),
                (r[12] = s * m + l * _ + p * v + n[12]),
                (r[13] = o * m + h * _ + d * v + n[13]),
                (r[14] = a * m + c * _ + $ * v + n[14]),
                (r[15] = u * m + f * _ + g * v + n[15])),
            this
          );
        }
        rotate(t, e, r = this) {
          var n, i, s, o;
          let a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $,
            g,
            m,
            _,
            v,
            D,
            y,
            x,
            b,
            w,
            E,
            C,
            F,
            T,
            A,
            S,
            P,
            k,
            O,
            B;
          return (
            (n = this),
            (i = r),
            (s = t),
            (P = (o = e)[0]),
            1e-6 > Math.abs((B = Math.hypot(P, (k = o[1]), (O = o[2])))) ||
              ((P *= B = 1 / B),
              (k *= B),
              (O *= B),
              (a = Math.sin(s)),
              (l = 1 - (u = Math.cos(s))),
              (h = i[0]),
              (c = i[1]),
              (f = i[2]),
              (p = i[3]),
              (d = i[4]),
              ($ = i[5]),
              (g = i[6]),
              (m = i[7]),
              (_ = i[8]),
              (v = i[9]),
              (D = i[10]),
              (y = i[11]),
              (x = P * P * l + u),
              (b = k * P * l + O * a),
              (w = O * P * l - k * a),
              (E = P * k * l - O * a),
              (C = k * k * l + u),
              (F = O * k * l + P * a),
              (T = P * O * l + k * a),
              (A = k * O * l - P * a),
              (S = O * O * l + u),
              (n[0] = h * x + d * b + _ * w),
              (n[1] = c * x + $ * b + v * w),
              (n[2] = f * x + g * b + D * w),
              (n[3] = p * x + m * b + y * w),
              (n[4] = h * E + d * C + _ * F),
              (n[5] = c * E + $ * C + v * F),
              (n[6] = f * E + g * C + D * F),
              (n[7] = p * E + m * C + y * F),
              (n[8] = h * T + d * A + _ * S),
              (n[9] = c * T + $ * A + v * S),
              (n[10] = f * T + g * A + D * S),
              (n[11] = p * T + m * A + y * S),
              i !== n &&
                ((n[12] = i[12]),
                (n[13] = i[13]),
                (n[14] = i[14]),
                (n[15] = i[15]))),
            this
          );
        }
        scale(t, e = this) {
          var r, n, i;
          let s, o, a;
          return (
            (r = this),
            (n = e),
            (s = (i = "number" == typeof t ? [t, t, t] : t)[0]),
            (o = i[1]),
            (a = i[2]),
            (r[0] = n[0] * s),
            (r[1] = n[1] * s),
            (r[2] = n[2] * s),
            (r[3] = n[3] * s),
            (r[4] = n[4] * o),
            (r[5] = n[5] * o),
            (r[6] = n[6] * o),
            (r[7] = n[7] * o),
            (r[8] = n[8] * a),
            (r[9] = n[9] * a),
            (r[10] = n[10] * a),
            (r[11] = n[11] * a),
            (r[12] = n[12]),
            (r[13] = n[13]),
            (r[14] = n[14]),
            (r[15] = n[15]),
            this
          );
        }
        multiply(t, e) {
          return e ? oz(this, t, e) : oz(this, this, t), this;
        }
        identity() {
          var t;
          return (
            ((t = this)[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1),
            this
          );
        }
        copy(t) {
          var e, r;
          return (
            (r = t),
            ((e = this)[0] = r[0]),
            (e[1] = r[1]),
            (e[2] = r[2]),
            (e[3] = r[3]),
            (e[4] = r[4]),
            (e[5] = r[5]),
            (e[6] = r[6]),
            (e[7] = r[7]),
            (e[8] = r[8]),
            (e[9] = r[9]),
            (e[10] = r[10]),
            (e[11] = r[11]),
            (e[12] = r[12]),
            (e[13] = r[13]),
            (e[14] = r[14]),
            (e[15] = r[15]),
            this
          );
        }
        fromPerspective({ fov: t, aspect: e, near: r, far: n } = {}) {
          var i, s, o, a, u;
          let l, h;
          return (
            (i = this),
            (s = t),
            (o = e),
            (a = r),
            (u = n),
            (l = 1 / Math.tan(s / 2)),
            (h = 1 / (a - u)),
            (i[0] = l / o),
            (i[1] = 0),
            (i[2] = 0),
            (i[3] = 0),
            (i[4] = 0),
            (i[5] = l),
            (i[6] = 0),
            (i[7] = 0),
            (i[8] = 0),
            (i[9] = 0),
            (i[10] = (u + a) * h),
            (i[11] = -1),
            (i[12] = 0),
            (i[13] = 0),
            (i[14] = 2 * u * a * h),
            (i[15] = 0),
            this
          );
        }
        fromOrthogonal({
          left: t,
          right: e,
          bottom: r,
          top: n,
          near: i,
          far: s,
        }) {
          var o, a, u, l, h, c, f;
          let p, d, $;
          return (
            (o = this),
            (a = t),
            (u = e),
            (l = r),
            (h = n),
            (c = i),
            (f = s),
            (p = 1 / (a - u)),
            (d = 1 / (l - h)),
            ($ = 1 / (c - f)),
            (o[0] = -2 * p),
            (o[1] = 0),
            (o[2] = 0),
            (o[3] = 0),
            (o[4] = 0),
            (o[5] = -2 * d),
            (o[6] = 0),
            (o[7] = 0),
            (o[8] = 0),
            (o[9] = 0),
            (o[10] = 2 * $),
            (o[11] = 0),
            (o[12] = (a + u) * p),
            (o[13] = (h + l) * d),
            (o[14] = (f + c) * $),
            (o[15] = 1),
            this
          );
        }
        fromQuaternion(t) {
          var e, r;
          let n, i, s, o, a, u, l, h, c, f, p, d, $, g, m, _;
          return (
            (e = this),
            (n = (r = t)[0]),
            (i = r[1]),
            (s = r[2]),
            (o = r[3]),
            (a = n + n),
            (u = i + i),
            (l = s + s),
            (h = n * a),
            (c = i * a),
            (f = i * u),
            (p = s * a),
            (d = s * u),
            ($ = s * l),
            (g = o * a),
            (m = o * u),
            (_ = o * l),
            (e[0] = 1 - f - $),
            (e[1] = c + _),
            (e[2] = p - m),
            (e[3] = 0),
            (e[4] = c - _),
            (e[5] = 1 - h - $),
            (e[6] = d + g),
            (e[7] = 0),
            (e[8] = p + m),
            (e[9] = d - g),
            (e[10] = 1 - h - f),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            this
          );
        }
        setPosition(t) {
          return (this.x = t[0]), (this.y = t[1]), (this.z = t[2]), this;
        }
        inverse(t = this) {
          var e, r;
          let n,
            i,
            s,
            o,
            a,
            u,
            l,
            h,
            c,
            f,
            p,
            d,
            $,
            g,
            m,
            _,
            v,
            D,
            y,
            x,
            b,
            w,
            E,
            C,
            F,
            T,
            A,
            S,
            P;
          return (
            (e = this),
            (n = (r = t)[0]),
            (i = r[1]),
            (s = r[2]),
            (o = r[3]),
            (a = r[4]),
            (u = r[5]),
            (l = r[6]),
            (h = r[7]),
            (c = r[8]),
            (f = r[9]),
            (p = r[10]),
            (d = r[11]),
            ($ = r[12]),
            (g = r[13]),
            (m = r[14]),
            (_ = r[15]),
            (v = n * u - i * a),
            (D = n * l - s * a),
            (y = n * h - o * a),
            (x = i * l - s * u),
            (b = i * h - o * u),
            (w = s * h - o * l),
            (E = c * g - f * $),
            (C = c * m - p * $),
            (F = c * _ - d * $),
            (T = f * m - p * g),
            (A = f * _ - d * g),
            (P =
              v * (S = p * _ - d * m) -
              D * A +
              y * T +
              x * F -
              b * C +
              w * E) &&
              ((P = 1 / P),
              (e[0] = (u * S - l * A + h * T) * P),
              (e[1] = (s * A - i * S - o * T) * P),
              (e[2] = (g * w - m * b + _ * x) * P),
              (e[3] = (p * b - f * w - d * x) * P),
              (e[4] = (l * F - a * S - h * C) * P),
              (e[5] = (n * S - s * F + o * C) * P),
              (e[6] = (m * y - $ * w - _ * D) * P),
              (e[7] = (c * w - p * y + d * D) * P),
              (e[8] = (a * A - u * F + h * E) * P),
              (e[9] = (i * F - n * A - o * E) * P),
              (e[10] = ($ * b - g * y + _ * v) * P),
              (e[11] = (f * y - c * b - d * v) * P),
              (e[12] = (u * C - a * T - l * E) * P),
              (e[13] = (n * T - i * C + s * E) * P),
              (e[14] = (g * D - $ * x - m * v) * P),
              (e[15] = (c * x - f * D + p * v) * P)),
            this
          );
        }
        compose(t, e, r) {
          var n, i, s, o;
          let a, u, l, h, c, f, p, d, $, g, m, _, v, D, y, x, b, w, E;
          return (
            (n = this),
            (i = t),
            (s = e),
            (o = r),
            (a = i[0]),
            (u = i[1]),
            (l = i[2]),
            (h = i[3]),
            (c = a + a),
            (f = u + u),
            (p = l + l),
            (d = a * c),
            ($ = a * f),
            (g = a * p),
            (m = u * f),
            (_ = u * p),
            (v = l * p),
            (D = h * c),
            (y = h * f),
            (x = h * p),
            (b = o[0]),
            (w = o[1]),
            (E = o[2]),
            (n[0] = (1 - (m + v)) * b),
            (n[1] = ($ + x) * b),
            (n[2] = (g - y) * b),
            (n[3] = 0),
            (n[4] = ($ - x) * w),
            (n[5] = (1 - (d + v)) * w),
            (n[6] = (_ + D) * w),
            (n[7] = 0),
            (n[8] = (g + y) * E),
            (n[9] = (_ - D) * E),
            (n[10] = (1 - (d + m)) * E),
            (n[11] = 0),
            (n[12] = s[0]),
            (n[13] = s[1]),
            (n[14] = s[2]),
            (n[15] = 1),
            this
          );
        }
        getRotation(t) {
          return oI(t, this), this;
        }
        getTranslation(t) {
          var e, r;
          return (
            (r = this),
            ((e = t)[0] = r[12]),
            (e[1] = r[13]),
            (e[2] = r[14]),
            this
          );
        }
        getScaling(t) {
          return oN(t, this), this;
        }
        getMaxScaleOnAxis() {
          var t;
          let e, r, n, i, s, o, a, u, l;
          return (
            (t = this),
            (e = t[0]),
            (r = t[1]),
            (n = t[2]),
            (i = t[4]),
            (s = t[5]),
            (o = t[6]),
            (a = t[8]),
            (u = t[9]),
            Math.sqrt(
              Math.max(
                e * e + r * r + n * n,
                i * i + s * s + o * o,
                a * a + u * u + (l = t[10]) * l
              )
            )
          );
        }
        lookAt(t, e, r) {
          var n, i, s, o;
          let a, u, l, h, c, f, p, d, $, g, m, _, v;
          return (
            (n = this),
            (i = t),
            (s = e),
            (o = r),
            (a = i[0]),
            (u = i[1]),
            (l = i[2]),
            (h = o[0]),
            (c = o[1]),
            (f = o[2]),
            (p = a - s[0]),
            0 == (g = p * p + (d = u - s[1]) * d + ($ = l - s[2]) * $)
              ? ($ = 1)
              : ((p *= g = 1 / Math.sqrt(g)), (d *= g), ($ *= g)),
            (m = c * $ - f * d),
            0 ==
              (g =
                m * m + (_ = f * p - h * $) * _ + (v = h * d - c * p) * v) &&
              (f ? (h += 1e-6) : c ? (f += 1e-6) : (c += 1e-6),
              (m = c * $ - f * d),
              (g =
                m * m + (_ = f * p - h * $) * _ + (v = h * d - c * p) * v)),
            (m *= g = 1 / Math.sqrt(g)),
            (_ *= g),
            (v *= g),
            (n[0] = m),
            (n[1] = _),
            (n[2] = v),
            (n[3] = 0),
            (n[4] = d * v - $ * _),
            (n[5] = $ * m - p * v),
            (n[6] = p * _ - d * m),
            (n[7] = 0),
            (n[8] = p),
            (n[9] = d),
            (n[10] = $),
            (n[11] = 0),
            (n[12] = a),
            (n[13] = u),
            (n[14] = l),
            (n[15] = 1),
            this
          );
        }
        determinant() {
          var t;
          let e, r, n, i, s, o, a, u, l, h, c, f, p, d, $, g;
          return (
            (t = this),
            (e = t[0]),
            (r = t[1]),
            (n = t[2]),
            (i = t[3]),
            (s = t[4]),
            (o = t[5]),
            (a = t[6]),
            (u = t[7]),
            (l = t[8]),
            (h = t[9]),
            (c = t[10]),
            (f = t[11]),
            (p = t[12]),
            (d = t[13]),
            ($ = t[14]),
            (e * o - r * s) * (c * (g = t[15]) - f * $) -
              (e * a - n * s) * (h * g - f * d) +
              (e * u - i * s) * (h * $ - c * d) +
              (r * a - n * o) * (l * g - f * p) -
              (r * u - i * o) * (l * $ - c * p) +
              (n * u - i * a) * (l * d - h * p)
          );
        }
        fromArray(t, e = 0) {
          return (
            (this[0] = t[e]),
            (this[1] = t[e + 1]),
            (this[2] = t[e + 2]),
            (this[3] = t[e + 3]),
            (this[4] = t[e + 4]),
            (this[5] = t[e + 5]),
            (this[6] = t[e + 6]),
            (this[7] = t[e + 7]),
            (this[8] = t[e + 8]),
            (this[9] = t[e + 9]),
            (this[10] = t[e + 10]),
            (this[11] = t[e + 11]),
            (this[12] = t[e + 12]),
            (this[13] = t[e + 13]),
            (this[14] = t[e + 14]),
            (this[15] = t[e + 15]),
            this
          );
        }
        toArray(t = [], e = 0) {
          return (
            (t[e] = this[0]),
            (t[e + 1] = this[1]),
            (t[e + 2] = this[2]),
            (t[e + 3] = this[3]),
            (t[e + 4] = this[4]),
            (t[e + 5] = this[5]),
            (t[e + 6] = this[6]),
            (t[e + 7] = this[7]),
            (t[e + 8] = this[8]),
            (t[e + 9] = this[9]),
            (t[e + 10] = this[10]),
            (t[e + 11] = this[11]),
            (t[e + 12] = this[12]),
            (t[e + 13] = this[13]),
            (t[e + 14] = this[14]),
            (t[e + 15] = this[15]),
            t
          );
        }
      }
      let oU = new oj();
      class oY {
        constructor() {
          (this.parent = null),
            (this.children = []),
            (this.visible = !0),
            (this.matrix = new oj()),
            (this.worldMatrix = new oj()),
            (this.matrixAutoUpdate = !0),
            (this.position = new o0()),
            (this.quaternion = new (class t extends Array {
              constructor(t = 0, e = 0, r = 0, n = 1) {
                return super(t, e, r, n), (this.onChange = () => {}), this;
              }
              get x() {
                return this[0];
              }
              get y() {
                return this[1];
              }
              get z() {
                return this[2];
              }
              get w() {
                return this[3];
              }
              set x(t) {
                (this[0] = t), this.onChange();
              }
              set y(t) {
                (this[1] = t), this.onChange();
              }
              set z(t) {
                (this[2] = t), this.onChange();
              }
              set w(t) {
                (this[3] = t), this.onChange();
              }
              identity() {
                var t;
                return (
                  ((t = this)[0] = 0),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 1),
                  this.onChange(),
                  this
                );
              }
              set(t, e, r, n) {
                var i, s, o, a, u;
                return t.length
                  ? this.copy(t)
                  : ((i = this),
                    (s = t),
                    (o = e),
                    (a = r),
                    (u = n),
                    (i[0] = s),
                    (i[1] = o),
                    (i[2] = a),
                    (i[3] = u),
                    this.onChange(),
                    this);
              }
              rotateX(t) {
                var e, r, n;
                let i, s, o, a, u, l;
                return (
                  (e = this),
                  (r = this),
                  (n = t),
                  (n *= 0.5),
                  (i = r[0]),
                  (s = r[1]),
                  (o = r[2]),
                  (a = r[3]),
                  (u = Math.sin(n)),
                  (l = Math.cos(n)),
                  (e[0] = i * l + a * u),
                  (e[1] = s * l + o * u),
                  (e[2] = o * l - s * u),
                  (e[3] = a * l - i * u),
                  this.onChange(),
                  this
                );
              }
              rotateY(t) {
                var e, r, n;
                let i, s, o, a, u, l;
                return (
                  (e = this),
                  (r = this),
                  (n = t),
                  (n *= 0.5),
                  (i = r[0]),
                  (s = r[1]),
                  (o = r[2]),
                  (a = r[3]),
                  (u = Math.sin(n)),
                  (l = Math.cos(n)),
                  (e[0] = i * l - o * u),
                  (e[1] = s * l + a * u),
                  (e[2] = o * l + i * u),
                  (e[3] = a * l - s * u),
                  this.onChange(),
                  this
                );
              }
              rotateZ(t) {
                var e, r, n;
                let i, s, o, a, u, l;
                return (
                  (e = this),
                  (r = this),
                  (n = t),
                  (n *= 0.5),
                  (i = r[0]),
                  (s = r[1]),
                  (o = r[2]),
                  (a = r[3]),
                  (u = Math.sin(n)),
                  (l = Math.cos(n)),
                  (e[0] = i * l + s * u),
                  (e[1] = s * l - i * u),
                  (e[2] = o * l + a * u),
                  (e[3] = a * l - o * u),
                  this.onChange(),
                  this
                );
              }
              inverse(t = this) {
                var e, r;
                let n, i, s, o, a, u;
                return (
                  (e = this),
                  (n = (r = t)[0]),
                  (i = r[1]),
                  (u = (a = n * n + i * i + (s = r[2]) * s + (o = r[3]) * o)
                    ? 1 / a
                    : 0),
                  (e[0] = -n * u),
                  (e[1] = -i * u),
                  (e[2] = -s * u),
                  (e[3] = o * u),
                  this.onChange(),
                  this
                );
              }
              conjugate(t = this) {
                var e, r;
                return (
                  (r = t),
                  ((e = this)[0] = -r[0]),
                  (e[1] = -r[1]),
                  (e[2] = -r[2]),
                  (e[3] = r[3]),
                  this.onChange(),
                  this
                );
              }
              copy(t) {
                var e, r;
                return (
                  (e = this),
                  (r = t),
                  (e[0] = r[0]),
                  (e[1] = r[1]),
                  (e[2] = r[2]),
                  (e[3] = r[3]),
                  this.onChange(),
                  this
                );
              }
              normalize(t = this) {
                return oM(this, t), this.onChange(), this;
              }
              multiply(t, e) {
                return (
                  e ? oR(this, t, e) : oR(this, this, t),
                  this.onChange(),
                  this
                );
              }
              dot(t) {
                var e, r;
                return (
                  (e = this),
                  (r = t),
                  e[0] * r[0] + e[1] * r[1] + e[2] * r[2] + e[3] * r[3]
                );
              }
              fromMatrix3(t) {
                return (
                  (function (t, e) {
                    let r,
                      n = e[0] + e[4] + e[8];
                    if (n > 0)
                      (r = Math.sqrt(n + 1)),
                        (t[3] = 0.5 * r),
                        (r = 0.5 / r),
                        (t[0] = (e[5] - e[7]) * r),
                        (t[1] = (e[6] - e[2]) * r),
                        (t[2] = (e[1] - e[3]) * r);
                    else {
                      let i = 0;
                      e[4] > e[0] && (i = 1), e[8] > e[3 * i + i] && (i = 2);
                      let s = (i + 1) % 3,
                        o = (i + 2) % 3;
                      (r = Math.sqrt(
                        e[3 * i + i] - e[3 * s + s] - e[3 * o + o] + 1
                      )),
                        (t[i] = 0.5 * r),
                        (r = 0.5 / r),
                        (t[3] = (e[3 * s + o] - e[3 * o + s]) * r),
                        (t[s] = (e[3 * s + i] + e[3 * i + s]) * r),
                        (t[o] = (e[3 * o + i] + e[3 * i + o]) * r);
                    }
                  })(this, t),
                  this.onChange(),
                  this
                );
              }
              fromEuler(t) {
                return (
                  (function (t, e, r = "YXZ") {
                    let n = Math.sin(0.5 * e[0]),
                      i = Math.cos(0.5 * e[0]),
                      s = Math.sin(0.5 * e[1]),
                      o = Math.cos(0.5 * e[1]),
                      a = Math.sin(0.5 * e[2]),
                      u = Math.cos(0.5 * e[2]);
                    "XYZ" === r
                      ? ((t[0] = n * o * u + i * s * a),
                        (t[1] = i * s * u - n * o * a),
                        (t[2] = i * o * a + n * s * u),
                        (t[3] = i * o * u - n * s * a))
                      : "YXZ" === r
                      ? ((t[0] = n * o * u + i * s * a),
                        (t[1] = i * s * u - n * o * a),
                        (t[2] = i * o * a - n * s * u),
                        (t[3] = i * o * u + n * s * a))
                      : "ZXY" === r
                      ? ((t[0] = n * o * u - i * s * a),
                        (t[1] = i * s * u + n * o * a),
                        (t[2] = i * o * a + n * s * u),
                        (t[3] = i * o * u - n * s * a))
                      : "ZYX" === r
                      ? ((t[0] = n * o * u - i * s * a),
                        (t[1] = i * s * u + n * o * a),
                        (t[2] = i * o * a - n * s * u),
                        (t[3] = i * o * u + n * s * a))
                      : "YZX" === r
                      ? ((t[0] = n * o * u + i * s * a),
                        (t[1] = i * s * u + n * o * a),
                        (t[2] = i * o * a - n * s * u),
                        (t[3] = i * o * u - n * s * a))
                      : "XZY" === r &&
                        ((t[0] = n * o * u - i * s * a),
                        (t[1] = i * s * u - n * o * a),
                        (t[2] = i * o * a + n * s * u),
                        (t[3] = i * o * u + n * s * a));
                  })(this, t, t.order),
                  this
                );
              }
              fromAxisAngle(t, e) {
                var r, n, i;
                let s;
                return (
                  (r = this),
                  (n = t),
                  (i = e),
                  (s = Math.sin((i *= 0.5))),
                  (r[0] = s * n[0]),
                  (r[1] = s * n[1]),
                  (r[2] = s * n[2]),
                  (r[3] = Math.cos(i)),
                  this
                );
              }
              slerp(t, e) {
                var r, n, i, s;
                let o, a, u, l, h, c, f, p, d, $, g, m, _;
                return (
                  (r = this),
                  (n = this),
                  (i = t),
                  (s = e),
                  (c = n[0]),
                  (f = n[1]),
                  (p = n[2]),
                  (d = n[3]),
                  ($ = i[0]),
                  (g = i[1]),
                  (a = c * $ + f * g + p * (m = i[2]) + d * (_ = i[3])) < 0 &&
                    ((a = -a), ($ = -$), (g = -g), (m = -m), (_ = -_)),
                  1 - a > 1e-6
                    ? ((l =
                        Math.sin((1 - s) * o) /
                        (u = Math.sin((o = Math.acos(a))))),
                      (h = Math.sin(s * o) / u))
                    : ((l = 1 - s), (h = s)),
                  (r[0] = l * c + h * $),
                  (r[1] = l * f + h * g),
                  (r[2] = l * p + h * m),
                  (r[3] = l * d + h * _),
                  this
                );
              }
              fromArray(t, e = 0) {
                return (
                  (this[0] = t[e]),
                  (this[1] = t[e + 1]),
                  (this[2] = t[e + 2]),
                  (this[3] = t[e + 3]),
                  this
                );
              }
              toArray(t = [], e = 0) {
                return (
                  (t[e] = this[0]),
                  (t[e + 1] = this[1]),
                  (t[e + 2] = this[2]),
                  (t[e + 3] = this[3]),
                  t
                );
              }
            })()),
            (this.scale = new o0(1)),
            (this.rotation = new (class t extends Array {
              constructor(t = 0, e = t, r = t, n = "YXZ") {
                return (
                  super(t, e, r),
                  (this.order = n),
                  (this.onChange = () => {}),
                  this
                );
              }
              get x() {
                return this[0];
              }
              get y() {
                return this[1];
              }
              get z() {
                return this[2];
              }
              set x(t) {
                (this[0] = t), this.onChange();
              }
              set y(t) {
                (this[1] = t), this.onChange();
              }
              set z(t) {
                (this[2] = t), this.onChange();
              }
              set(t, e = t, r = t) {
                return t.length
                  ? this.copy(t)
                  : ((this[0] = t),
                    (this[1] = e),
                    (this[2] = r),
                    this.onChange(),
                    this);
              }
              copy(t) {
                return (
                  (this[0] = t[0]),
                  (this[1] = t[1]),
                  (this[2] = t[2]),
                  this.onChange(),
                  this
                );
              }
              reorder(t) {
                return (this.order = t), this.onChange(), this;
              }
              fromRotationMatrix(t, e = this.order) {
                return (
                  (function (t, e, r = "YXZ") {
                    "XYZ" === r
                      ? ((t[1] = Math.asin(Math.min(Math.max(e[8], -1), 1))),
                        0.99999 > Math.abs(e[8])
                          ? ((t[0] = Math.atan2(-e[9], e[10])),
                            (t[2] = Math.atan2(-e[4], e[0])))
                          : ((t[0] = Math.atan2(e[6], e[5])), (t[2] = 0)))
                      : "YXZ" === r
                      ? ((t[0] = Math.asin(-Math.min(Math.max(e[9], -1), 1))),
                        0.99999 > Math.abs(e[9])
                          ? ((t[1] = Math.atan2(e[8], e[10])),
                            (t[2] = Math.atan2(e[1], e[5])))
                          : ((t[1] = Math.atan2(-e[2], e[0])), (t[2] = 0)))
                      : "ZXY" === r
                      ? ((t[0] = Math.asin(Math.min(Math.max(e[6], -1), 1))),
                        0.99999 > Math.abs(e[6])
                          ? ((t[1] = Math.atan2(-e[2], e[10])),
                            (t[2] = Math.atan2(-e[4], e[5])))
                          : ((t[1] = 0), (t[2] = Math.atan2(e[1], e[0]))))
                      : "ZYX" === r
                      ? ((t[1] = Math.asin(-Math.min(Math.max(e[2], -1), 1))),
                        0.99999 > Math.abs(e[2])
                          ? ((t[0] = Math.atan2(e[6], e[10])),
                            (t[2] = Math.atan2(e[1], e[0])))
                          : ((t[0] = 0), (t[2] = Math.atan2(-e[4], e[5]))))
                      : "YZX" === r
                      ? ((t[2] = Math.asin(Math.min(Math.max(e[1], -1), 1))),
                        0.99999 > Math.abs(e[1])
                          ? ((t[0] = Math.atan2(-e[9], e[5])),
                            (t[1] = Math.atan2(-e[2], e[0])))
                          : ((t[0] = 0), (t[1] = Math.atan2(e[8], e[10]))))
                      : "XZY" === r &&
                        ((t[2] = Math.asin(-Math.min(Math.max(e[4], -1), 1))),
                        0.99999 > Math.abs(e[4])
                          ? ((t[0] = Math.atan2(e[6], e[5])),
                            (t[1] = Math.atan2(e[8], e[0])))
                          : ((t[0] = Math.atan2(-e[9], e[10])), (t[1] = 0)));
                  })(this, t, e),
                  this
                );
              }
              fromQuaternion(t, e = this.order) {
                return oU.fromQuaternion(t), this.fromRotationMatrix(oU, e);
              }
              toArray(t = [], e = 0) {
                return (
                  (t[e] = this[0]),
                  (t[e + 1] = this[1]),
                  (t[e + 2] = this[2]),
                  t
                );
              }
            })()),
            (this.up = new o0(0, 1, 0)),
            (this.rotation.onChange = () =>
              this.quaternion.fromEuler(this.rotation)),
            (this.quaternion.onChange = () =>
              this.rotation.fromQuaternion(this.quaternion));
        }
        setParent(t, e = !0) {
          this.parent &&
            t !== this.parent &&
            this.parent.removeChild(this, !1),
            (this.parent = t),
            e && t && t.addChild(this, !1);
        }
        addChild(t, e = !0) {
          ~this.children.indexOf(t) || this.children.push(t),
            e && t.setParent(this, !1);
        }
        removeChild(t, e = !0) {
          ~this.children.indexOf(t) &&
            this.children.splice(this.children.indexOf(t), 1),
            e && t.setParent(null, !1);
        }
        updateMatrixWorld(t) {
          this.matrixAutoUpdate && this.updateMatrix(),
            (this.worldMatrixNeedsUpdate || t) &&
              (null === this.parent
                ? this.worldMatrix.copy(this.matrix)
                : this.worldMatrix.multiply(
                    this.parent.worldMatrix,
                    this.matrix
                  ),
              (this.worldMatrixNeedsUpdate = !1),
              (t = !0));
          for (let e = 0, r = this.children.length; e < r; e++)
            this.children[e].updateMatrixWorld(t);
        }
        updateMatrix() {
          this.matrix.compose(this.quaternion, this.position, this.scale),
            (this.worldMatrixNeedsUpdate = !0);
        }
        traverse(t) {
          if (!t(this))
            for (let e = 0, r = this.children.length; e < r; e++)
              this.children[e].traverse(t);
        }
        decompose() {
          this.matrix.getTranslation(this.position),
            this.matrix.getRotation(this.quaternion),
            this.matrix.getScaling(this.scale),
            this.rotation.fromQuaternion(this.quaternion);
        }
        lookAt(t, e = !1) {
          e
            ? this.matrix.lookAt(this.position, t, this.up)
            : this.matrix.lookAt(t, this.position, this.up),
            this.matrix.getRotation(this.quaternion),
            this.rotation.fromQuaternion(this.quaternion);
        }
      }
      function oX(t, e, r) {
        let n = e[0],
          i = e[1],
          s = e[2],
          o = e[3],
          a = e[4],
          u = e[5],
          l = e[6],
          h = e[7],
          c = e[8],
          f = r[0],
          p = r[1],
          d = r[2],
          $ = r[3],
          g = r[4],
          m = r[5],
          _ = r[6],
          v = r[7],
          D = r[8];
        return (
          (t[0] = f * n + p * o + d * l),
          (t[1] = f * i + p * a + d * h),
          (t[2] = f * s + p * u + d * c),
          (t[3] = $ * n + g * o + m * l),
          (t[4] = $ * i + g * a + m * h),
          (t[5] = $ * s + g * u + m * c),
          (t[6] = _ * n + v * o + D * l),
          (t[7] = _ * i + v * a + D * h),
          (t[8] = _ * s + v * u + D * c),
          t
        );
      }
      let oq = 0;
      class oV extends oY {
        constructor(
          t,
          {
            geometry: e,
            program: r,
            mode: n = t.TRIANGLES,
            frustumCulled: i = !0,
            renderOrder: s = 0,
          } = {}
        ) {
          super(),
            t.canvas ||
              console.error("gl not passed as first argument to Mesh"),
            (this.gl = t),
            (this.id = oq++),
            (this.geometry = e),
            (this.program = r),
            (this.mode = n),
            (this.frustumCulled = i),
            (this.renderOrder = s),
            (this.modelViewMatrix = new oj()),
            (this.normalMatrix = new (class t extends Array {
              constructor(
                t = 1,
                e = 0,
                r = 0,
                n = 0,
                i = 1,
                s = 0,
                o = 0,
                a = 0,
                u = 1
              ) {
                return super(t, e, r, n, i, s, o, a, u), this;
              }
              set(t, e, r, n, i, s, o, a, u) {
                var l, h, c, f, p, d, $, g, m, _;
                return t.length
                  ? this.copy(t)
                  : ((l = this),
                    (h = t),
                    (c = e),
                    (f = r),
                    (p = n),
                    (d = i),
                    ($ = s),
                    (g = o),
                    (m = a),
                    (_ = u),
                    (l[0] = h),
                    (l[1] = c),
                    (l[2] = f),
                    (l[3] = p),
                    (l[4] = d),
                    (l[5] = $),
                    (l[6] = g),
                    (l[7] = m),
                    (l[8] = _),
                    this);
              }
              translate(t, e = this) {
                var r, n, i;
                let s, o, a, u, l, h, c, f, p, d, $;
                return (
                  (r = this),
                  (n = e),
                  (i = t),
                  (s = n[0]),
                  (o = n[1]),
                  (a = n[2]),
                  (u = n[3]),
                  (l = n[4]),
                  (h = n[5]),
                  (c = n[6]),
                  (f = n[7]),
                  (p = n[8]),
                  (d = i[0]),
                  ($ = i[1]),
                  (r[0] = s),
                  (r[1] = o),
                  (r[2] = a),
                  (r[3] = u),
                  (r[4] = l),
                  (r[5] = h),
                  (r[6] = d * s + $ * u + c),
                  (r[7] = d * o + $ * l + f),
                  (r[8] = d * a + $ * h + p),
                  this
                );
              }
              rotate(t, e = this) {
                var r, n, i;
                let s, o, a, u, l, h, c, f, p, d, $;
                return (
                  (r = this),
                  (n = e),
                  (i = t),
                  (s = n[0]),
                  (o = n[1]),
                  (a = n[2]),
                  (u = n[3]),
                  (l = n[4]),
                  (h = n[5]),
                  (c = n[6]),
                  (f = n[7]),
                  (p = n[8]),
                  (d = Math.sin(i)),
                  ($ = Math.cos(i)),
                  (r[0] = $ * s + d * u),
                  (r[1] = $ * o + d * l),
                  (r[2] = $ * a + d * h),
                  (r[3] = $ * u - d * s),
                  (r[4] = $ * l - d * o),
                  (r[5] = $ * h - d * a),
                  (r[6] = c),
                  (r[7] = f),
                  (r[8] = p),
                  this
                );
              }
              scale(t, e = this) {
                var r, n, i;
                let s, o;
                return (
                  (r = this),
                  (n = e),
                  (s = (i = t)[0]),
                  (o = i[1]),
                  (r[0] = s * n[0]),
                  (r[1] = s * n[1]),
                  (r[2] = s * n[2]),
                  (r[3] = o * n[3]),
                  (r[4] = o * n[4]),
                  (r[5] = o * n[5]),
                  (r[6] = n[6]),
                  (r[7] = n[7]),
                  (r[8] = n[8]),
                  this
                );
              }
              multiply(t, e) {
                return e ? oX(this, t, e) : oX(this, this, t), this;
              }
              identity() {
                var t;
                return (
                  ((t = this)[0] = 1),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = 1),
                  (t[5] = 0),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = 1),
                  this
                );
              }
              copy(t) {
                var e, r;
                return (
                  (r = t),
                  ((e = this)[0] = r[0]),
                  (e[1] = r[1]),
                  (e[2] = r[2]),
                  (e[3] = r[3]),
                  (e[4] = r[4]),
                  (e[5] = r[5]),
                  (e[6] = r[6]),
                  (e[7] = r[7]),
                  (e[8] = r[8]),
                  this
                );
              }
              fromMatrix4(t) {
                var e, r;
                return (
                  (r = t),
                  ((e = this)[0] = r[0]),
                  (e[1] = r[1]),
                  (e[2] = r[2]),
                  (e[3] = r[4]),
                  (e[4] = r[5]),
                  (e[5] = r[6]),
                  (e[6] = r[8]),
                  (e[7] = r[9]),
                  (e[8] = r[10]),
                  this
                );
              }
              fromQuaternion(t) {
                var e, r;
                let n, i, s, o, a, u, l, h, c, f, p, d, $, g, m, _;
                return (
                  (e = this),
                  (n = (r = t)[0]),
                  (i = r[1]),
                  (s = r[2]),
                  (o = r[3]),
                  (a = n + n),
                  (u = i + i),
                  (l = s + s),
                  (h = n * a),
                  (c = i * a),
                  (f = i * u),
                  (p = s * a),
                  (d = s * u),
                  ($ = s * l),
                  (g = o * a),
                  (m = o * u),
                  (_ = o * l),
                  (e[0] = 1 - f - $),
                  (e[3] = c - _),
                  (e[6] = p + m),
                  (e[1] = c + _),
                  (e[4] = 1 - h - $),
                  (e[7] = d - g),
                  (e[2] = p - m),
                  (e[5] = d + g),
                  (e[8] = 1 - h - f),
                  this
                );
              }
              fromBasis(t, e, r) {
                return (
                  this.set(
                    t[0],
                    t[1],
                    t[2],
                    e[0],
                    e[1],
                    e[2],
                    r[0],
                    r[1],
                    r[2]
                  ),
                  this
                );
              }
              inverse(t = this) {
                var e, r;
                let n, i, s, o, a, u, l, h, c, f, p, d, $;
                return (
                  (e = this),
                  (n = (r = t)[0]),
                  (i = r[1]),
                  (s = r[2]),
                  (o = r[3]),
                  (a = r[4]),
                  (u = r[5]),
                  (l = r[6]),
                  (h = r[7]),
                  (f = (c = r[8]) * a - u * h),
                  ($ =
                    n * f +
                    i * (p = -c * o + u * l) +
                    s * (d = h * o - a * l)) &&
                    (($ = 1 / $),
                    (e[0] = f * $),
                    (e[1] = (-c * i + s * h) * $),
                    (e[2] = (u * i - s * a) * $),
                    (e[3] = p * $),
                    (e[4] = (c * n - s * l) * $),
                    (e[5] = (-u * n + s * o) * $),
                    (e[6] = d * $),
                    (e[7] = (-h * n + i * l) * $),
                    (e[8] = (a * n - i * o) * $)),
                  this
                );
              }
              getNormalMatrix(t) {
                var e, r;
                let n,
                  i,
                  s,
                  o,
                  a,
                  u,
                  l,
                  h,
                  c,
                  f,
                  p,
                  d,
                  $,
                  g,
                  m,
                  _,
                  v,
                  D,
                  y,
                  x,
                  b,
                  w,
                  E,
                  C,
                  F,
                  T,
                  A,
                  S,
                  P;
                return (
                  (e = this),
                  (n = (r = t)[0]),
                  (i = r[1]),
                  (s = r[2]),
                  (o = r[3]),
                  (a = r[4]),
                  (u = r[5]),
                  (l = r[6]),
                  (h = r[7]),
                  (c = r[8]),
                  (f = r[9]),
                  (p = r[10]),
                  (d = r[11]),
                  ($ = r[12]),
                  (g = r[13]),
                  (m = r[14]),
                  (_ = r[15]),
                  (v = n * u - i * a),
                  (D = n * l - s * a),
                  (y = n * h - o * a),
                  (x = i * l - s * u),
                  (b = i * h - o * u),
                  (w = s * h - o * l),
                  (E = c * g - f * $),
                  (C = c * m - p * $),
                  (F = c * _ - d * $),
                  (T = f * m - p * g),
                  (A = f * _ - d * g),
                  (P =
                    v * (S = p * _ - d * m) -
                    D * A +
                    y * T +
                    x * F -
                    b * C +
                    w * E) &&
                    ((P = 1 / P),
                    (e[0] = (u * S - l * A + h * T) * P),
                    (e[1] = (l * F - a * S - h * C) * P),
                    (e[2] = (a * A - u * F + h * E) * P),
                    (e[3] = (s * A - i * S - o * T) * P),
                    (e[4] = (n * S - s * F + o * C) * P),
                    (e[5] = (i * F - n * A - o * E) * P),
                    (e[6] = (g * w - m * b + _ * x) * P),
                    (e[7] = (m * y - $ * w - _ * D) * P),
                    (e[8] = ($ * b - g * y + _ * v) * P)),
                  this
                );
              }
            })()),
            (this.beforeRenderCallbacks = []),
            (this.afterRenderCallbacks = []);
        }
        onBeforeRender(t) {
          return this.beforeRenderCallbacks.push(t), this;
        }
        onAfterRender(t) {
          return this.afterRenderCallbacks.push(t), this;
        }
        draw({ camera: t } = {}) {
          this.beforeRenderCallbacks.forEach(
            (e) => e && e({ mesh: this, camera: t })
          ),
            t &&
              (this.program.uniforms.modelMatrix ||
                Object.assign(this.program.uniforms, {
                  modelMatrix: { value: null },
                  viewMatrix: { value: null },
                  modelViewMatrix: { value: null },
                  normalMatrix: { value: null },
                  projectionMatrix: { value: null },
                  cameraPosition: { value: null },
                }),
              (this.program.uniforms.projectionMatrix.value =
                t.projectionMatrix),
              (this.program.uniforms.cameraPosition.value = t.worldPosition),
              (this.program.uniforms.viewMatrix.value = t.viewMatrix),
              this.modelViewMatrix.multiply(t.viewMatrix, this.worldMatrix),
              this.normalMatrix.getNormalMatrix(this.modelViewMatrix),
              (this.program.uniforms.modelMatrix.value = this.worldMatrix),
              (this.program.uniforms.modelViewMatrix.value =
                this.modelViewMatrix),
              (this.program.uniforms.normalMatrix.value = this.normalMatrix));
          let e = this.program.cullFace && 0 > this.worldMatrix.determinant();
          this.program.use({ flipFaces: e }),
            this.geometry.draw({ mode: this.mode, program: this.program }),
            this.afterRenderCallbacks.forEach(
              (e) => e && e({ mesh: this, camera: t })
            );
        }
      }
      var oG = sJ.bounds,
        oW = sW,
        oH = [
          ["#8e6796", "#aa7194", "#c9837c", "#c9837c"],
          ["#d69f99", "#c5a0a3", "#969dac", "#899daf"],
          ["#d9bd9a", "#c0c9c0", "#6eb2b2", "#42a4ab"],
          ["#81381b", "#140f06", "#0f0b05", "#110f0b"],
          ["#5b2c15", "#452411", "#140f06", "#110f0b"],
          ["#c9837c", "#1c0b01", "#0f0b05", "#0f0b05"],
          ["#d69f99", "#c5a0a3", "#969dac", "#899daf"],
        ],
        o9 = sH,
        oZ = sW,
        oK = s9,
        oQ = sJ.bounds,
        oJ = sJ.flags,
        at = r(862),
        ae = r.n(at),
        ar = sW,
        an = sH,
        ai = sJ.dom,
        as = sJ.device,
        ao = sW,
        aa = sH,
        au = s9,
        al = sJ.bounds,
        ah = sH,
        ac = sW,
        af = sH;
      sJ.bounds;
      let ap = new oj(),
        ad = new o0(),
        a$ = new o0();
      class ag extends oY {
        constructor(
          t,
          {
            near: e = 0.1,
            far: r = 100,
            fov: n = 45,
            aspect: i = 1,
            left: s,
            right: o,
            bottom: a,
            top: u,
            zoom: l = 1,
          } = {}
        ) {
          super(),
            Object.assign(this, {
              near: e,
              far: r,
              fov: n,
              aspect: i,
              left: s,
              right: o,
              bottom: a,
              top: u,
              zoom: l,
            }),
            (this.projectionMatrix = new oj()),
            (this.viewMatrix = new oj()),
            (this.projectionViewMatrix = new oj()),
            (this.worldPosition = new o0()),
            (this.type = s || o ? "orthographic" : "perspective"),
            "orthographic" === this.type
              ? this.orthographic()
              : this.perspective();
        }
        perspective({
          near: t = this.near,
          far: e = this.far,
          fov: r = this.fov,
          aspect: n = this.aspect,
        } = {}) {
          return (
            Object.assign(this, { near: t, far: e, fov: r, aspect: n }),
            this.projectionMatrix.fromPerspective({
              fov: r * (Math.PI / 180),
              aspect: n,
              near: t,
              far: e,
            }),
            (this.type = "perspective"),
            this
          );
        }
        orthographic({
          near: t = this.near,
          far: e = this.far,
          left: r = this.left,
          right: n = this.right,
          bottom: i = this.bottom,
          top: s = this.top,
          zoom: o = this.zoom,
        } = {}) {
          return (
            Object.assign(this, {
              near: t,
              far: e,
              left: r,
              right: n,
              bottom: i,
              top: s,
              zoom: o,
            }),
            (r /= o),
            (n /= o),
            (i /= o),
            (s /= o),
            this.projectionMatrix.fromOrthogonal({
              left: r,
              right: n,
              bottom: i,
              top: s,
              near: t,
              far: e,
            }),
            (this.type = "orthographic"),
            this
          );
        }
        updateMatrixWorld() {
          return (
            super.updateMatrixWorld(),
            this.viewMatrix.inverse(this.worldMatrix),
            this.worldMatrix.getTranslation(this.worldPosition),
            this.projectionViewMatrix.multiply(
              this.projectionMatrix,
              this.viewMatrix
            ),
            this
          );
        }
        lookAt(t) {
          return super.lookAt(t, !0), this;
        }
        project(t) {
          return (
            t.applyMatrix4(this.viewMatrix),
            t.applyMatrix4(this.projectionMatrix),
            this
          );
        }
        unproject(t) {
          return (
            t.applyMatrix4(ap.inverse(this.projectionMatrix)),
            t.applyMatrix4(this.worldMatrix),
            this
          );
        }
        updateFrustum() {
          this.frustum ||
            (this.frustum = [
              new o0(),
              new o0(),
              new o0(),
              new o0(),
              new o0(),
              new o0(),
            ]);
          let t = this.projectionViewMatrix;
          (this.frustum[0].set(
            t[3] - t[0],
            t[7] - t[4],
            t[11] - t[8]
          ).constant = t[15] - t[12]),
            (this.frustum[1].set(
              t[3] + t[0],
              t[7] + t[4],
              t[11] + t[8]
            ).constant = t[15] + t[12]),
            (this.frustum[2].set(
              t[3] + t[1],
              t[7] + t[5],
              t[11] + t[9]
            ).constant = t[15] + t[13]),
            (this.frustum[3].set(
              t[3] - t[1],
              t[7] - t[5],
              t[11] - t[9]
            ).constant = t[15] - t[13]),
            (this.frustum[4].set(
              t[3] - t[2],
              t[7] - t[6],
              t[11] - t[10]
            ).constant = t[15] - t[14]),
            (this.frustum[5].set(
              t[3] + t[2],
              t[7] + t[6],
              t[11] + t[10]
            ).constant = t[15] + t[14]);
          for (let e = 0; e < 6; e++) {
            let r = 1 / this.frustum[e].distance();
            this.frustum[e].multiply(r), (this.frustum[e].constant *= r);
          }
        }
        frustumIntersectsMesh(t) {
          if (
            !t.geometry.attributes.position ||
            ((t.geometry.bounds && t.geometry.bounds.radius !== 1 / 0) ||
              t.geometry.computeBoundingSphere(),
            !t.geometry.bounds)
          )
            return !0;
          let e = ad;
          e.copy(t.geometry.bounds.center), e.applyMatrix4(t.worldMatrix);
          let r =
            t.geometry.bounds.radius * t.worldMatrix.getMaxScaleOnAxis();
          return this.frustumIntersectsSphere(e, r);
        }
        frustumIntersectsSphere(t, e) {
          let r = a$;
          for (let n = 0; n < 6; n++) {
            let i = this.frustum[n];
            if (r.copy(i).dot(t) + i.constant < -e) return !1;
          }
          return !0;
        }
      }
      let am = new Uint8Array(4);
      function a_(t) {
        return 0 == (t & (t - 1));
      }
      let av = 1;
      class aD {
        constructor(
          t,
          {
            image: e,
            target: r = t.TEXTURE_2D,
            type: n = t.UNSIGNED_BYTE,
            format: i = t.RGBA,
            internalFormat: s = i,
            wrapS: o = t.CLAMP_TO_EDGE,
            wrapT: a = t.CLAMP_TO_EDGE,
            generateMipmaps: u = !0,
            minFilter: l = u ? t.NEAREST_MIPMAP_LINEAR : t.LINEAR,
            magFilter: h = t.LINEAR,
            premultiplyAlpha: c = !1,
            unpackAlignment: f = 4,
            flipY: p = r == t.TEXTURE_2D,
            anisotropy: d = 0,
            level: $ = 0,
            width: g,
            height: m = g,
          } = {}
        ) {
          (this.gl = t),
            (this.id = av++),
            (this.image = e),
            (this.target = r),
            (this.type = n),
            (this.format = i),
            (this.internalFormat = s),
            (this.minFilter = l),
            (this.magFilter = h),
            (this.wrapS = o),
            (this.wrapT = a),
            (this.generateMipmaps = u),
            (this.premultiplyAlpha = c),
            (this.unpackAlignment = f),
            (this.flipY = p),
            (this.anisotropy = Math.min(
              d,
              this.gl.renderer.parameters.maxAnisotropy
            )),
            (this.level = $),
            (this.width = g),
            (this.height = m),
            (this.texture = this.gl.createTexture()),
            (this.store = { image: null }),
            (this.glState = this.gl.renderer.state),
            (this.state = {}),
            (this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR),
            (this.state.magFilter = this.gl.LINEAR),
            (this.state.wrapS = this.gl.REPEAT),
            (this.state.wrapT = this.gl.REPEAT),
            (this.state.anisotropy = 0);
        }
        bind() {
          this.glState.textureUnits[this.glState.activeTextureUnit] !==
            this.id &&
            (this.gl.bindTexture(this.target, this.texture),
            (this.glState.textureUnits[this.glState.activeTextureUnit] =
              this.id));
        }
        update(t = 0) {
          let e = !(this.image === this.store.image && !this.needsUpdate);
          if (
            ((e || this.glState.textureUnits[t] !== this.id) &&
              (this.gl.renderer.activeTexture(t), this.bind()),
            e)
          ) {
            if (
              ((this.needsUpdate = !1),
              this.flipY !== this.glState.flipY &&
                (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY),
                (this.glState.flipY = this.flipY)),
              this.premultiplyAlpha !== this.glState.premultiplyAlpha &&
                (this.gl.pixelStorei(
                  this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                  this.premultiplyAlpha
                ),
                (this.glState.premultiplyAlpha = this.premultiplyAlpha)),
              this.unpackAlignment !== this.glState.unpackAlignment &&
                (this.gl.pixelStorei(
                  this.gl.UNPACK_ALIGNMENT,
                  this.unpackAlignment
                ),
                (this.glState.unpackAlignment = this.unpackAlignment)),
              this.minFilter !== this.state.minFilter &&
                (this.gl.texParameteri(
                  this.target,
                  this.gl.TEXTURE_MIN_FILTER,
                  this.minFilter
                ),
                (this.state.minFilter = this.minFilter)),
              this.magFilter !== this.state.magFilter &&
                (this.gl.texParameteri(
                  this.target,
                  this.gl.TEXTURE_MAG_FILTER,
                  this.magFilter
                ),
                (this.state.magFilter = this.magFilter)),
              this.wrapS !== this.state.wrapS &&
                (this.gl.texParameteri(
                  this.target,
                  this.gl.TEXTURE_WRAP_S,
                  this.wrapS
                ),
                (this.state.wrapS = this.wrapS)),
              this.wrapT !== this.state.wrapT &&
                (this.gl.texParameteri(
                  this.target,
                  this.gl.TEXTURE_WRAP_T,
                  this.wrapT
                ),
                (this.state.wrapT = this.wrapT)),
              this.anisotropy &&
                this.anisotropy !== this.state.anisotropy &&
                (this.gl.texParameterf(
                  this.target,
                  this.gl.renderer.getExtension(
                    "EXT_texture_filter_anisotropic"
                  ).TEXTURE_MAX_ANISOTROPY_EXT,
                  this.anisotropy
                ),
                (this.state.anisotropy = this.anisotropy)),
              this.image)
            ) {
              if (
                (this.image.width &&
                  ((this.width = this.image.width),
                  (this.height = this.image.height)),
                this.target === this.gl.TEXTURE_CUBE_MAP)
              )
                for (let r = 0; r < 6; r++)
                  this.gl.texImage2D(
                    this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + r,
                    this.level,
                    this.internalFormat,
                    this.format,
                    this.type,
                    this.image[r]
                  );
              else if (ArrayBuffer.isView(this.image))
                this.gl.texImage2D(
                  this.target,
                  this.level,
                  this.internalFormat,
                  this.width,
                  this.height,
                  0,
                  this.format,
                  this.type,
                  this.image
                );
              else if (this.image.isCompressedTexture)
                for (let n = 0; n < this.image.length; n++)
                  this.gl.compressedTexImage2D(
                    this.target,
                    n,
                    this.internalFormat,
                    this.image[n].width,
                    this.image[n].height,
                    0,
                    this.image[n].data
                  );
              else
                this.gl.texImage2D(
                  this.target,
                  this.level,
                  this.internalFormat,
                  this.format,
                  this.type,
                  this.image
                );
              this.generateMipmaps &&
                (this.gl.renderer.isWebgl2 ||
                (a_(this.image.width) && a_(this.image.height))
                  ? this.gl.generateMipmap(this.target)
                  : ((this.generateMipmaps = !1),
                    (this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE),
                    (this.minFilter = this.gl.LINEAR))),
                this.onUpdate && this.onUpdate();
            } else if (this.target === this.gl.TEXTURE_CUBE_MAP)
              for (let i = 0; i < 6; i++)
                this.gl.texImage2D(
                  this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                  0,
                  this.gl.RGBA,
                  1,
                  1,
                  0,
                  this.gl.RGBA,
                  this.gl.UNSIGNED_BYTE,
                  am
                );
            else
              this.width
                ? this.gl.texImage2D(
                    this.target,
                    this.level,
                    this.internalFormat,
                    this.width,
                    this.height,
                    0,
                    this.format,
                    this.type,
                    null
                  )
                : this.gl.texImage2D(
                    this.target,
                    0,
                    this.gl.RGBA,
                    1,
                    1,
                    0,
                    this.gl.RGBA,
                    this.gl.UNSIGNED_BYTE,
                    am
                  );
            this.store.image = this.image;
          }
        }
      }
      class ay {
        constructor(
          t,
          {
            width: e = t.canvas.width,
            height: r = t.canvas.height,
            target: n = t.FRAMEBUFFER,
            color: i = 1,
            depth: s = !0,
            stencil: o = !1,
            depthTexture: a = !1,
            wrapS: u = t.CLAMP_TO_EDGE,
            wrapT: l = t.CLAMP_TO_EDGE,
            minFilter: h = t.LINEAR,
            magFilter: c = h,
            type: f = t.UNSIGNED_BYTE,
            format: p = t.RGBA,
            internalFormat: d = p,
            unpackAlignment: $,
            premultiplyAlpha: g,
          } = {}
        ) {
          (this.gl = t),
            (this.width = e),
            (this.height = r),
            (this.depth = s),
            (this.buffer = this.gl.createFramebuffer()),
            (this.target = n),
            this.gl.bindFramebuffer(this.target, this.buffer),
            (this.textures = []);
          let m = [];
          for (let _ = 0; _ < i; _++)
            this.textures.push(
              new aD(t, {
                width: e,
                height: r,
                wrapS: u,
                wrapT: l,
                minFilter: h,
                magFilter: c,
                type: f,
                format: p,
                internalFormat: d,
                unpackAlignment: $,
                premultiplyAlpha: g,
                flipY: !1,
                generateMipmaps: !1,
              })
            ),
              this.textures[_].update(),
              this.gl.framebufferTexture2D(
                this.target,
                this.gl.COLOR_ATTACHMENT0 + _,
                this.gl.TEXTURE_2D,
                this.textures[_].texture,
                0
              ),
              m.push(this.gl.COLOR_ATTACHMENT0 + _);
          m.length > 1 && this.gl.renderer.drawBuffers(m),
            (this.texture = this.textures[0]),
            a &&
            (this.gl.renderer.isWebgl2 ||
              this.gl.renderer.getExtension("WEBGL_depth_texture"))
              ? ((this.depthTexture = new aD(t, {
                  width: e,
                  height: r,
                  minFilter: this.gl.NEAREST,
                  magFilter: this.gl.NEAREST,
                  format: this.gl.DEPTH_COMPONENT,
                  internalFormat: t.renderer.isWebgl2
                    ? this.gl.DEPTH_COMPONENT16
                    : this.gl.DEPTH_COMPONENT,
                  type: this.gl.UNSIGNED_INT,
                })),
                this.depthTexture.update(),
                this.gl.framebufferTexture2D(
                  this.target,
                  this.gl.DEPTH_ATTACHMENT,
                  this.gl.TEXTURE_2D,
                  this.depthTexture.texture,
                  0
                ))
              : (s &&
                  !o &&
                  ((this.depthBuffer = this.gl.createRenderbuffer()),
                  this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.depthBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.DEPTH_COMPONENT16,
                    e,
                    r
                  ),
                  this.gl.framebufferRenderbuffer(
                    this.target,
                    this.gl.DEPTH_ATTACHMENT,
                    this.gl.RENDERBUFFER,
                    this.depthBuffer
                  )),
                o &&
                  !s &&
                  ((this.stencilBuffer = this.gl.createRenderbuffer()),
                  this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.stencilBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.STENCIL_INDEX8,
                    e,
                    r
                  ),
                  this.gl.framebufferRenderbuffer(
                    this.target,
                    this.gl.STENCIL_ATTACHMENT,
                    this.gl.RENDERBUFFER,
                    this.stencilBuffer
                  )),
                s &&
                  o &&
                  ((this.depthStencilBuffer = this.gl.createRenderbuffer()),
                  this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.depthStencilBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.DEPTH_STENCIL,
                    e,
                    r
                  ),
                  this.gl.framebufferRenderbuffer(
                    this.target,
                    this.gl.DEPTH_STENCIL_ATTACHMENT,
                    this.gl.RENDERBUFFER,
                    this.depthStencilBuffer
                  ))),
            this.gl.bindFramebuffer(this.target, null);
        }
        setSize(t, e) {
          if (this.width !== t || this.height !== e) {
            (this.width = t),
              (this.height = e),
              this.gl.bindFramebuffer(this.target, this.buffer);
            for (let r = 0; r < this.textures.length; r++)
              (this.textures[r].width = t),
                (this.textures[r].height = e),
                (this.textures[r].needsUpdate = !0),
                this.textures[r].update(),
                this.gl.framebufferTexture2D(
                  this.target,
                  this.gl.COLOR_ATTACHMENT0 + r,
                  this.gl.TEXTURE_2D,
                  this.textures[r].texture,
                  0
                );
            this.depthTexture
              ? ((this.depthTexture.width = t),
                (this.depthTexture.height = e),
                (this.depthTexture.needsUpdate = !0),
                this.depthTexture.update(),
                this.gl.framebufferTexture2D(
                  this.target,
                  this.gl.DEPTH_ATTACHMENT,
                  this.gl.TEXTURE_2D,
                  this.depthTexture.texture,
                  0
                ))
              : (this.depthBuffer &&
                  (this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.depthBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.DEPTH_COMPONENT16,
                    t,
                    e
                  )),
                this.stencilBuffer &&
                  (this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.stencilBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.STENCIL_INDEX8,
                    t,
                    e
                  )),
                this.depthStencilBuffer &&
                  (this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.depthStencilBuffer
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.DEPTH_STENCIL,
                    t,
                    e
                  ))),
              this.gl.bindFramebuffer(this.target, null);
          }
        }
      }
      class a8 {
        constructor(
          t,
          {
            width: e,
            height: r,
            dpr: n,
            wrapS: i = t.CLAMP_TO_EDGE,
            wrapT: s = t.CLAMP_TO_EDGE,
            minFilter: o = t.LINEAR,
            magFilter: a = t.LINEAR,
            geometry: u = new o3(t),
            targetOnly: l = null,
          } = {}
        ) {
          (this.gl = t),
            (this.options = {
              wrapS: i,
              wrapT: s,
              minFilter: o,
              magFilter: a,
            }),
            (this.passes = []),
            (this.geometry = u),
            (this.uniform = { value: null }),
            (this.targetOnly = l);
          let h = (this.fbo = {
            read: null,
            write: null,
            swap() {
              let t = h.read;
              (h.read = h.write), (h.write = t);
            },
          });
          this.resize({ width: e, height: r, dpr: n });
        }
        addPass({
          vertex: t = ax,
          fragment: e = a0,
          uniforms: r = {},
          textureUniform: n = "tMap",
          enabled: i = !0,
        } = {}) {
          r[n] = { value: this.fbo.read.texture };
          let s = new o6(this.gl, { vertex: t, fragment: e, uniforms: r }),
            o = {
              mesh: new oV(this.gl, { geometry: this.geometry, program: s }),
              program: s,
              uniforms: r,
              enabled: i,
              textureUniform: n,
            };
          return this.passes.push(o), o;
        }
        resize({ width: t, height: e, dpr: r } = {}) {
          r && (this.dpr = r),
            t && ((this.width = t), (this.height = e || t)),
            (r = this.dpr || this.gl.renderer.dpr),
            (t = Math.floor((this.width || this.gl.renderer.width) * r)),
            (e = Math.floor((this.height || this.gl.renderer.height) * r)),
            (this.options.width = t),
            (this.options.height = e),
            (this.fbo.read = new ay(this.gl, this.options)),
            (this.fbo.write = new ay(this.gl, this.options));
        }
        render({
          scene: t,
          camera: e,
          texture: r,
          target: n = null,
          update: i = !0,
          sort: s = !0,
          frustumCull: o = !0,
        }) {
          let a = this.passes.filter((t) => t.enabled);
          r ||
            (this.gl.renderer.render({
              scene: t,
              camera: e,
              target:
                a.length || (!n && this.targetOnly) ? this.fbo.write : n,
              update: i,
              sort: s,
              frustumCull: o,
            }),
            this.fbo.swap()),
            a.forEach((t, e) => {
              (t.mesh.program.uniforms[t.textureUniform].value =
                !e && r ? r : this.fbo.read.texture),
                this.gl.renderer.render({
                  scene: t.mesh,
                  target:
                    e !== a.length - 1 || (!n && this.targetOnly)
                      ? this.fbo.write
                      : n,
                  clear: !0,
                }),
                this.fbo.swap();
            }),
            (this.uniform.value = this.fbo.read.texture);
        }
      }
      let ax =
          "\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n",
        a0 =
          "\n    precision highp float;\n\n    uniform sampler2D tMap;\n    varying vec2 vUv;\n\n    void main() {\n        gl_FragColor = texture2D(tMap, vUv);\n    }\n";
      function ab(t, e, r) {
        return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), t;
      }
      function aw(t, e, r) {
        return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), t;
      }
      function aE(t, e, r) {
        return (t[0] = e[0] * r), (t[1] = e[1] * r), t;
      }
      function aC(t) {
        var e = t[0],
          r = t[1];
        return Math.sqrt(e * e + r * r);
      }
      function a1(t, e) {
        return t[0] * e[1] - t[1] * e[0];
      }
      class aF extends Array {
        constructor(t = 0, e = t) {
          return super(t, e), this;
        }
        get x() {
          return this[0];
        }
        get y() {
          return this[1];
        }
        set x(t) {
          this[0] = t;
        }
        set y(t) {
          this[1] = t;
        }
        set(t, e = t) {
          var r, n, i;
          return t.length
            ? this.copy(t)
            : ((r = this), (n = t), (i = e), (r[0] = n), (r[1] = i), this);
        }
        copy(t) {
          var e, r;
          return (r = t), ((e = this)[0] = r[0]), (e[1] = r[1]), this;
        }
        add(t, e) {
          return e ? ab(this, t, e) : ab(this, this, t), this;
        }
        sub(t, e) {
          return e ? aw(this, t, e) : aw(this, this, t), this;
        }
        multiply(t) {
          var e, r, n;
          return (
            t.length
              ? ((r = this),
                (n = t),
                ((e = this)[0] = r[0] * n[0]),
                (e[1] = r[1] * n[1]))
              : aE(this, this, t),
            this
          );
        }
        divide(t) {
          var e, r, n;
          return (
            t.length
              ? ((r = this),
                (n = t),
                ((e = this)[0] = r[0] / n[0]),
                (e[1] = r[1] / n[1]))
              : aE(this, this, 1 / t),
            this
          );
        }
        inverse(t = this) {
          var e, r;
          return (r = t), ((e = this)[0] = 1 / r[0]), (e[1] = 1 / r[1]), this;
        }
        len() {
          return aC(this);
        }
        distance(t) {
          var e, r, n, i;
          return t
            ? ((e = this),
              Math.sqrt((n = (r = t)[0] - e[0]) * n + (i = r[1] - e[1]) * i))
            : aC(this);
        }
        squaredLen() {
          return this.squaredDistance();
        }
        squaredDistance(t) {
          var e, r, n, i, s, o, a;
          return t
            ? ((e = this),
              (n = (r = t)[0] - e[0]) * n + (i = r[1] - e[1]) * i)
            : ((s = this), (o = s[0]), o * o + (a = s[1]) * a);
        }
        negate(t = this) {
          var e, r;
          return (r = t), ((e = this)[0] = -r[0]), (e[1] = -r[1]), this;
        }
        cross(t, e) {
          return e ? a1(t, e) : a1(this, t);
        }
        scale(t) {
          return aE(this, this, t), this;
        }
        normalize() {
          var t, e, r, n, i;
          return (
            (t = this),
            (i = (r = (e = this)[0]) * r + (n = e[1]) * n) > 0 &&
              (i = 1 / Math.sqrt(i)),
            (t[0] = e[0] * i),
            (t[1] = e[1] * i),
            this
          );
        }
        dot(t) {
          var e, r;
          return (r = t), (e = this)[0] * r[0] + e[1] * r[1];
        }
        equals(t) {
          var e, r;
          return (r = t), (e = this)[0] === r[0] && e[1] === r[1];
        }
        applyMatrix3(t) {
          var e, r, n, i, s;
          return (
            (e = this),
            (n = t),
            (i = (r = this)[0]),
            (s = r[1]),
            (e[0] = n[0] * i + n[3] * s + n[6]),
            (e[1] = n[1] * i + n[4] * s + n[7]),
            this
          );
        }
        applyMatrix4(t) {
          var e, r, n;
          let i, s;
          return (
            (e = this),
            (r = this),
            (n = t),
            (i = r[0]),
            (s = r[1]),
            (e[0] = n[0] * i + n[4] * s + n[12]),
            (e[1] = n[1] * i + n[5] * s + n[13]),
            this
          );
        }
        lerp(t, e) {
          var r, n, i, s, o, a;
          return (
            (r = this),
            (n = this),
            (i = t),
            (s = e),
            (o = n[0]),
            (a = n[1]),
            (r[0] = o + s * (i[0] - o)),
            (r[1] = a + s * (i[1] - a)),
            this
          );
        }
        clone() {
          return new aF(this[0], this[1]);
        }
        fromArray(t, e = 0) {
          return (this[0] = t[e]), (this[1] = t[e + 1]), this;
        }
        toArray(t = [], e = 0) {
          return (t[e] = this[0]), (t[e + 1] = this[1]), t;
        }
      }
      let aT = new aF(),
        aA = new aF(),
        a3 = new aF(),
        a4 = new o0(),
        aS = new o0(),
        a6 = new o0(),
        aP = new o0(),
        a2 = new o0(),
        ak = new o0(),
        aO = new o0(),
        aB = new o0(),
        a5 = new o0(),
        a7 = new o0(),
        aL = new o0(),
        aR = new oj();
      class aM {
        constructor() {
          (this.origin = new o0()), (this.direction = new o0());
        }
        castMouse(t, e = [0, 0]) {
          if ("orthographic" === t.type) {
            let { left: r, right: n, bottom: i, top: s, zoom: o } = t,
              a = r / o + ((n - r) / o) * (0.5 * e[0] + 0.5),
              u = i / o + ((s - i) / o) * (0.5 * e[1] + 0.5);
            this.origin.set(a, u, 0),
              this.origin.applyMatrix4(t.worldMatrix),
              (this.direction.x = -t.worldMatrix[8]),
              (this.direction.y = -t.worldMatrix[9]),
              (this.direction.z = -t.worldMatrix[10]);
          } else
            t.worldMatrix.getTranslation(this.origin),
              this.direction.set(e[0], e[1], 0.5),
              t.unproject(this.direction),
              this.direction.sub(this.origin).normalize();
        }
        intersectBounds(t, { maxDistance: e, output: r = [] } = {}) {
          Array.isArray(t) || (t = [t]);
          let n = aR,
            i = a4,
            s = aS,
            o = r;
          return (
            (o.length = 0),
            t.forEach((t) => {
              (t.geometry.bounds && t.geometry.bounds.radius !== 1 / 0) ||
                t.geometry.computeBoundingSphere();
              let r = t.geometry.bounds,
                a;
              if (
                (n.inverse(t.worldMatrix),
                e &&
                  (s.copy(this.direction).scaleRotateMatrix4(n),
                  (a = e * s.len())),
                i.copy(this.origin).applyMatrix4(n),
                s.copy(this.direction).transformDirection(n),
                e && i.distance(r.center) - r.radius > a)
              )
                return;
              let u = 0;
              if ("sphere" === t.geometry.raycast) {
                if (
                  i.distance(r.center) > r.radius &&
                  !(u = this.intersectSphere(r, i, s))
                )
                  return;
              } else if (
                (i.x < r.min.x ||
                  i.x > r.max.x ||
                  i.y < r.min.y ||
                  i.y > r.max.y ||
                  i.z < r.min.z ||
                  i.z > r.max.z) &&
                !(u = this.intersectBox(r, i, s))
              )
                return;
              (e && u > a) ||
                (t.hit || (t.hit = { localPoint: new o0(), point: new o0() }),
                t.hit.localPoint.copy(s).multiply(u).add(i),
                t.hit.point
                  .copy(t.hit.localPoint)
                  .applyMatrix4(t.worldMatrix),
                (t.hit.distance = t.hit.point.distance(this.origin)),
                o.push(t));
            }),
            o.sort((t, e) => t.hit.distance - e.hit.distance),
            o
          );
        }
        intersectMeshes(
          t,
          {
            cullFace: e = !0,
            maxDistance: r,
            includeUV: n = !0,
            includeNormal: i = !0,
            output: s = [],
          } = {}
        ) {
          let o = this.intersectBounds(t, { maxDistance: r, output: s });
          if (!o.length) return o;
          let a = aR,
            u = a4,
            l = aS,
            h = a6,
            c = aP,
            f = a2,
            p = ak,
            d = aO,
            $ = aB,
            g = aT,
            m = aA,
            _ = a3;
          for (let v = o.length - 1; v >= 0; v--) {
            let D = o[v],
              y;
            a.inverse(D.worldMatrix),
              r &&
                (l.copy(this.direction).scaleRotateMatrix4(a),
                (y = r * l.len())),
              u.copy(this.origin).applyMatrix4(a),
              l.copy(this.direction).transformDirection(a);
            let x,
              b,
              w,
              E = 0,
              C = D.geometry,
              F = C.attributes,
              T = F.index,
              A = Math.max(0, C.drawRange.start),
              S = Math.min(
                T ? T.count : F.position.count,
                C.drawRange.start + C.drawRange.count
              );
            for (let P = A; P < S; P += 3) {
              let k = T ? T.data[P] : P,
                O = T ? T.data[P + 1] : P + 1,
                B = T ? T.data[P + 2] : P + 2;
              h.fromArray(F.position.data, 3 * k),
                c.fromArray(F.position.data, 3 * O),
                f.fromArray(F.position.data, 3 * B);
              let L = this.intersectTriangle(h, c, f, e, u, l, d);
              L &&
                ((r && L > y) ||
                  ((!E || L < E) &&
                    ((E = L), (x = k), (b = O), (w = B), p.copy(d))));
            }
            E || o.splice(v, 1),
              D.hit.localPoint.copy(l).multiply(E).add(u),
              D.hit.point.copy(D.hit.localPoint).applyMatrix4(D.worldMatrix),
              (D.hit.distance = D.hit.point.distance(this.origin)),
              D.hit.faceNormal ||
                ((D.hit.localFaceNormal = new o0()),
                (D.hit.faceNormal = new o0()),
                (D.hit.uv = new aF()),
                (D.hit.localNormal = new o0()),
                (D.hit.normal = new o0())),
              D.hit.localFaceNormal.copy(p),
              D.hit.faceNormal
                .copy(D.hit.localFaceNormal)
                .transformDirection(D.worldMatrix),
              (n || i) &&
                (h.fromArray(F.position.data, 3 * x),
                c.fromArray(F.position.data, 3 * b),
                f.fromArray(F.position.data, 3 * w),
                this.getBarycoord(D.hit.localPoint, h, c, f, $)),
              n &&
                F.uv &&
                (g.fromArray(F.uv.data, 2 * x),
                m.fromArray(F.uv.data, 2 * b),
                _.fromArray(F.uv.data, 2 * w),
                D.hit.uv.set(
                  g.x * $.x + m.x * $.y + _.x * $.z,
                  g.y * $.x + m.y * $.y + _.y * $.z
                )),
              i &&
                F.normal &&
                (h.fromArray(F.normal.data, 3 * x),
                c.fromArray(F.normal.data, 3 * b),
                f.fromArray(F.normal.data, 3 * w),
                D.hit.localNormal.set(
                  h.x * $.x + c.x * $.y + f.x * $.z,
                  h.y * $.x + c.y * $.y + f.y * $.z,
                  h.z * $.x + c.z * $.y + f.z * $.z
                ),
                D.hit.normal
                  .copy(D.hit.localNormal)
                  .transformDirection(D.worldMatrix));
          }
          return o.sort((t, e) => t.hit.distance - e.hit.distance), o;
        }
        intersectSphere(t, e = this.origin, r = this.direction) {
          let n = a6;
          n.sub(t.center, e);
          let i = n.dot(r),
            s = n.dot(n) - i * i,
            o = t.radius * t.radius;
          if (s > o) return 0;
          let a = Math.sqrt(o - s),
            u = i - a,
            l = i + a;
          return u < 0 && l < 0 ? 0 : u < 0 ? l : u;
        }
        intersectBox(t, e = this.origin, r = this.direction) {
          let n,
            i,
            s,
            o,
            a,
            u,
            l = 1 / r.x,
            h = 1 / r.y,
            c = 1 / r.z,
            f = t.min,
            p = t.max;
          return (
            (n = ((l >= 0 ? f.x : p.x) - e.x) * l),
            (i = ((l >= 0 ? p.x : f.x) - e.x) * l),
            (s = ((h >= 0 ? f.y : p.y) - e.y) * h),
            n > (o = ((h >= 0 ? p.y : f.y) - e.y) * h) || s > i
              ? 0
              : (s > n && (n = s),
                o < i && (i = o),
                (a = ((c >= 0 ? f.z : p.z) - e.z) * c),
                n > (u = ((c >= 0 ? p.z : f.z) - e.z) * c) || a > i
                  ? 0
                  : (a > n && (n = a),
                    u < i && (i = u),
                    i < 0 ? 0 : n >= 0 ? n : i))
          );
        }
        intersectTriangle(
          t,
          e,
          r,
          n = !0,
          i = this.origin,
          s = this.direction,
          o = aO
        ) {
          let a = aB,
            u = a5,
            l = a7;
          a.sub(e, t), u.sub(r, t), o.cross(a, u);
          let h,
            c = s.dot(o);
          if (!c) return 0;
          if (c > 0) {
            if (n) return 0;
            h = 1;
          } else (h = -1), (c = -c);
          l.sub(i, t);
          let f = h * s.dot(u.cross(l, u));
          if (f < 0) return 0;
          let p = h * s.dot(a.cross(l));
          if (p < 0 || f + p > c) return 0;
          let d = -h * l.dot(o);
          return d < 0 ? 0 : d / c;
        }
        getBarycoord(t, e, r, n, i = aB) {
          let s = a5,
            o = a7,
            a = aL;
          s.sub(n, e), o.sub(r, e), a.sub(t, e);
          let u = s.dot(s),
            l = s.dot(o),
            h = s.dot(a),
            c = o.dot(o),
            f = o.dot(a),
            p = u * c - l * l;
          if (0 === p) return i.set(-2, -1, -1);
          let d = 1 / p,
            $ = (c * h - l * f) * d,
            g = (u * f - l * h) * d;
          return i.set(1 - $ - g, g, $);
        }
      }
      class az extends oA {
        constructor(
          t,
          {
            width: e = 1,
            height: r = 1,
            widthSegments: n = 1,
            heightSegments: i = 1,
            attributes: s = {},
          } = {}
        ) {
          let o = n,
            a = i,
            u = (o + 1) * (a + 1),
            l = o * a * 6,
            h = new Float32Array(3 * u),
            c = new Float32Array(3 * u),
            f = new Float32Array(2 * u),
            p = l > 65536 ? new Uint32Array(l) : new Uint16Array(l);
          az.buildPlane(h, c, f, p, e, r, 0, o, a),
            Object.assign(s, {
              position: { size: 3, data: h },
              normal: { size: 3, data: c },
              uv: { size: 2, data: f },
              index: { data: p },
            }),
            super(t, s);
        }
        static buildPlane(
          t,
          e,
          r,
          n,
          i,
          s,
          o,
          a,
          u,
          l = 0,
          h = 1,
          c = 2,
          f = 1,
          p = -1,
          d = 0,
          $ = 0
        ) {
          let g = d,
            m = i / a,
            _ = s / u;
          for (let v = 0; v <= u; v++) {
            let D = v * _ - s / 2;
            for (let y = 0; y <= a; y++, d++) {
              let x = y * m - i / 2;
              if (
                ((t[3 * d + l] = x * f),
                (t[3 * d + h] = D * p),
                (t[3 * d + c] = o / 2),
                (e[3 * d + l] = 0),
                (e[3 * d + h] = 0),
                (e[3 * d + c] = o >= 0 ? 1 : -1),
                (r[2 * d] = y / a),
                (r[2 * d + 1] = 1 - v / u),
                v === u || y === a)
              )
                continue;
              let b = g + y + v * (a + 1),
                w = g + y + (v + 1) * (a + 1),
                E = g + y + (v + 1) * (a + 1) + 1,
                C = g + y + v * (a + 1) + 1;
              (n[6 * $] = b),
                (n[6 * $ + 1] = w),
                (n[6 * $ + 2] = C),
                (n[6 * $ + 3] = w),
                (n[6 * $ + 4] = E),
                (n[6 * $ + 5] = C),
                $++;
            }
          }
        }
      }
      function aN(t) {
        return (aN =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function aI(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function aj(t, e) {
        return (aj =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function aU(t) {
        return (aU = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var aY = sJ.bounds,
        aX = s9,
        aq = sW,
        aV = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && aj(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = aU(e);
                if (r) {
                  var i = aU(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === aN(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "mount",
                value: function (t, e, r, n) {
                  var i = this,
                    s = t.gl,
                    o = t.scene;
                  (this.el = e),
                    (this.offset = { x: 0, y: 0, focus: 0 }),
                    (this.progress = 1),
                    (this.my = 1 - (n % 6) * 0.05),
                    (this.tl = nk.timeline({
                      paused: !0,
                      defaults: { duration: 0.5, ease: "expo" },
                    }));
                  var a = new aD(s, {
                      generateMipmaps: !1,
                      minFilter: s.LINEAR,
                    }),
                    u = e.dataset.src,
                    l = new Image();
                  (l.crossOrigin = "*"),
                    (l.src = u),
                    (this.name = u),
                    (this.uniforms = {
                      u_texture: { value: a },
                      u_focusSize: { value: new aF(aY.ww, aY.wh) },
                      u_res: { value: new aF(1, 1) },
                      u_pos: { value: new aF(0, 0) },
                      u_scale: { value: 1 },
                      u_progress: { value: 0 },
                      u_alpha: { value: 0 },
                    }),
                    l.decode().then(function () {
                      (a.image = l),
                        nk.to(i.uniforms.u_alpha, {
                          value: 1,
                          duration: 0.5,
                          ease: "power1",
                          delay: 0.5 * Math.random(),
                        });
                    });
                  var h = new o6(s, {
                    vertex:
                      "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nuniform float u_diff;\nuniform float u_progress;\nuniform float u_scale;\n\nuniform vec2 u_pos;\nuniform vec2 u_focusSize;\nuniform vec2 u_res;\n\nvarying vec2 vUv;\n\nvoid main(){\n	vec3 pos = position;\n\n	pos.xy *= u_scale;\n\n	vec4 mPos = modelViewMatrix * vec4(pos, 1.);\n\n	vUv = uv;\n	gl_Position = projectionMatrix * mPos;\n}",
                    fragment:
                      "precision mediump float;\n#define GLSLIFY 1\n\nuniform float u_alpha;\n\nuniform sampler2D u_texture;\n\nuniform vec2 u_res;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n\n    vec4 texture = texture2D(u_texture, uv);\n\n    gl_FragColor = texture * u_alpha;\n}",
                    uniforms: this.uniforms,
                    cullFace: null,
                    depthTest: !1,
                    transparent: !0,
                  });
                  (this.mesh = new oV(s, {
                    geometry: r,
                    program: h,
                    renderOrder: 1,
                  })),
                    this.addChild(this.mesh),
                    this.setParent(o);
                },
              },
              {
                key: "tick",
                value: function (t) {
                  var e = t.x,
                    r = t.y,
                    n = t.max,
                    i = void 0 === n ? { x: 0, y: 0 } : n,
                    s = this.rect,
                    o = s.bottom,
                    a = s.right,
                    u = this.uniforms.u_pos,
                    l =
                      nk.utils.wrap(-(i.x - a), a, void 0 === e ? 0 : e) -
                      this.offset.x,
                    h =
                      nk.utils.wrap(
                        -(i.y - o),
                        o,
                        (void 0 === r ? 0 : r) * this.my
                      ) - this.offset.y;
                  (this.position.y =
                    h * this.progress +
                    this.offset.focus * (1 - this.progress)),
                    (this.position.x = l * this.progress),
                    (u.value.x = l),
                    (u.value.y = h);
                },
              },
              {
                key: "focus",
                value: function (e) {
                  let nextPageLink = this.text.getAttribute("data-link");
                  function setState(link) {
                    document.title = nextPageLink;
                    window.history.pushState('',window.location.hostname);
                  }
                  function updatePage() {
                    // Set the scroll position to the top of the page
                    window.scrollTo(0, 0);
                  
                    // Remove the first .content-wrapper element
                    var firstContentWrapper = document.querySelector(".content-wrapper.first");
                    if (firstContentWrapper) {
                      firstContentWrapper.parentNode.removeChild(firstContentWrapper);
                    }
                  
                    // Remove the "second" class and add the "first" class to the second .content-wrapper element
                    var secondContentWrapper = document.querySelector(".content-wrapper.second");
                    if (secondContentWrapper) {
                      secondContentWrapper.classList.remove("second");
                      secondContentWrapper.classList.add("first");
                    }
                  
                    // Set the opacity of the .overlay element to 0
                    var overlay = document.querySelector(".overlay");
                    if (overlay) {
                      overlay.style.opacity = "0";
                    }
                  
                    // Remove the "animating" class from the <html> element
                    document.querySelector("html").classList.remove("animating");
                  }
                  function pageTransition() {
                    document.querySelector("html").classList.add("animating");
                    // GSAP
                    let tl = gsap.timeline({
                      onComplete: updatePage,
                    });
                    tl.from(".content-wrapper.second", {
                      y: "110vh",
                      delay: 0.2,
                      duration: 0.8,
                      ease: "power2.out",
                    });
                    tl.to(
                      ".overlay",
                      {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power1.out",
                      },
                      0
                    );
                    tl.to(
                      ".content-wrapper.first",
                      {
                        scale: 0.95,
                        duration: 0.3,
                        ease: "power1.out",
                      },
                      0
                    );
                  }
                  function updateCurrentClass() {
                    // Get all elements with the class "menu_link"
                    var menuLinks = document.getElementsByClassName("menu_link");
                  
                    // Remove the "w--current" class from all elements
                    for (var i = 0; i < menuLinks.length; i++) {
                      menuLinks[i].classList.remove("w--current");
                    }
                  
                    // Loop through all elements again and add the "w--current" class to the element that has the same href as the current page's URL
                    for (var i = 0; i < menuLinks.length; i++) {
                      if (menuLinks[i].getAttribute("href") === window.location.pathname) {
                        menuLinks[i].classList.add("w--current");
                      }
                    }
                  }
                  fetch(nextPageLink)
                    .then((response) => response.text())
                    .then((responseText) => {
                      
                      let parser = new DOMParser();
                      let responseDoc = parser.parseFromString(
                        responseText,
                        "text/html"
                      );
                      let replaceableDiv =
                        responseDoc.body.querySelector(".content-wrapper");
                      let pageTitle =
                        responseDoc.querySelector("title").textContent;
                      document.title = pageTitle;
                      // setState(window.location.href);
                      document.querySelector("#workStyles").remove()
                      console.log(typeof(replaceableDiv));
                      console.log(replaceableDiv);
                      //let element = replaceableDiv.classList.add("second");
                      let element1 = document
                        .querySelector(".main-wrapper")
                        console.log("Element 1",typeof(element1))
                        console.log("Element ",typeof(element));
                        replaceableDiv.className="content-wrapper second"
                        element1.appendChild(replaceableDiv.cloneNode(true))
                    })
                    .catch((error) => console.error(error))
                    .finally(() => {
                      updateCurrentClass();
                      pageTransition();
                    })

                  this.focused ||
                    ((this.focused = !0),
                    (this.mesh.frustumCulled = !1),
                    (this.mesh.renderOrder = 10),
                    aX(aq(".js-grid-focused")));
                  
                }
              },
              {
                key: "blur",
                value: function () {
                  this.focused &&
                    ((this.focused = !1),
                    this.tl
                      .clear()
                      .to(this, { progress: 1 })
                      .to(
                        this.scale,
                        { x: this.rect.width, y: this.rect.height },
                        0
                      )
                      .to(this.text, { alpha: 0 }, 0)
                      .set(this.mesh, { frustumCulled: !0, renderOrder: 1 })
                      .restart());
                },
              },
              {
                key: "resize",
                value: function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : this.el;
                  this.rect = aX(t);
                  var e = aY.ww,
                    r = aY.wh,
                    n = this.rect,
                    i = n.left,
                    s = n.top,
                    o = n.width,
                    a = n.height,
                    u = this.uniforms.u_res;
                  (this.offset.x = i + o / 2 - e / 2),
                    (this.offset.y = s + a / 2 - r / 2),
                    (this.position.x = this.offset.x),
                    (this.position.y = this.offset.y),
                    (this.scale.x = o),
                    (this.scale.y = a),
                    (u.value.x = o),
                    (u.value.y = a);
                },
              },
            ]),
            aI(n.prototype, i),
            s && aI(n, s),
            a
          );
        })(oY);
      function aG(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function aW(t, e, r) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r),
          t
        );
      }
      var aH = sJ.bounds,
        a9 = (sJ.dom, sJ.device),
        aZ = sW,
        aK = sH,
        aQ = s9;
      new ((function () {
        var t, e, r;
        function n() {
          var t = this;
          !(function (t, e) {
            if (!(t instanceof e))
              throw TypeError("Cannot call a class as a function");
          })(this, n),
            aW(this, "resize", function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : aQ(t.el),
                r = aQ(aZ(".js-grid-bounds")),
                n = r.width,
                i = r.height;
              (t.max.x = n),
                (t.max.y = i),
                t.camera.orthographic({
                  near: 0.1,
                  far: 10,
                  left: -(e.width / 2),
                  right: e.width / 2,
                  top: e.height / 2,
                  bottom: -(e.height / 2),
                }),
                t.renderer.setSize(e.width, e.height),
                t.post.resize(),
                t.pass.uniforms.u_res.value.set(
                  t.gl.canvas.width,
                  t.gl.canvas.height
                );
              var s = 0.5 * aQ(aZ(".js-grid-content")).height;
              t.tiles &&
                t.tiles.forEach(function (e, r) {
                  e.resize(t.elems[r]),
                    (e.offset.focus = s),
                    (e.text = t.texts[r]);
                });
            }),
            aW(this, "move", function (e) {
              var r = e.dX,
                n = e.dY;
              (t.tY -= 0.5 * n), (t.tX += 0.5 * r);
            }),
            aW(this, "tick", function () {
              var e = t.tX - t.cX,
                r = t.tY - t.cY;
              (t.cX += 0.085 * e),
                (t.cX = Math.round(100 * t.cX) / 100),
                (t.cY += 0.085 * r),
                (t.cY = Math.round(100 * t.cY) / 100),
                t.tiles.forEach(function (e) {
                  return e.tick({ x: t.cX, y: t.cY, max: t.max });
                }),
                t.post.render({ scene: t.scene, camera: t.camera });
            }),
            aW(this, "onMouseMove", function (e) {
              var r = e.x,
                n = e.y;
              t.isDragging &&
                ((t.tX = t.on.x + 2.5 * r), (t.tY = t.on.y - 2.5 * n));
            }),
            aW(this, "onMouseDown", function (e) {
              var r = e.x,
                n = e.y;
              e.target.closest(".js-grid") &&
                !t.isDragging &&
                ((t.isDragging = !0),
                (t.on.x = t.tX - 2.5 * r),
                (t.on.y = t.tY + 2.5 * n));
            }),
            aW(this, "click", function (e) {
              var r = e.x,
                n = e.y,
                i = e.click,
                s = e.target;
                console.log(e);
                document.elementFromPoint(r, n).click();
              if (
                (t.isDragging && (t.isDragging = !1),
                i && s.closest(".js-grid"))
              ) {
                var o = aH.ww,
                  a = aH.wh;
                (t.mouse.x = (r / o) * 2 - 1),
                  (t.mouse.y = (-n / a) * 2 + 1),
                  t.raycast.castMouse(t.camera, t.mouse);
                var u = t.tiles.map(function (t) {
                    return t.children[0];
                  }),
                  l = t.raycast.intersectBounds(u);
                  //t.focusedTile.focus()
                  console.log(l.toString());
                  
                console.log(u),
                  (0 === l.length || t.focusedTile) && t.focused
                    ? (t.focusedTile.blur(), (t.focused = !1), t.fade())
                    : ((t.focusedTile = l[0].parent),
                      t.focusedTile.focus(),
                      (t.focused = !0),
                      t.fade(t.tiles, 0, 0.8, 1.25));
              }
            }),
            aW(this, "mount", function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : aZ(".js-grid");
              (t.el = e),
                (t.elems = aK(".js-tile")),
                (t.texts = aK(".js-grid-text")),
                t.tiles || t.createTiles(t.elems),
                t.resize(aQ(e)),
                sV.on("resize", t.resize),
                sV.on("tick", t.tick),
                sV.on("mouseup", t.click),
                sV.on("mousemove", t.onMouseMove),
                sV.on("mousedown", t.onMouseDown),
                a9.isMobile || sV.on("vs", t.move),
                e.appendChild(t.gl.canvas);
            }),
            aW(this, "unmount", function () {
              sV.off("resize", t.resize),
                sV.off("tick", t.tick),
                sV.off("mouseup", t.click),
                sV.off("mousemove", t.onMouseMove),
                sV.off("mousedown", t.onMouseDown),
                a9.isMobile || sV.off("vs", t.move);
            }),
            (this.tX = 0),
            (this.tY = 0),
            (this.cX = 0),
            (this.cY = 0),
            (this.max = { x: 0, y: 0 }),
            (this.on = { x: 0, y: 0 }),
            (this.isDragging = !1),
            (this.renderer = new oE({
              dpr: nk.utils.clamp(1, 1.5, window.devicePixelRatio),
              alpha: !0,
            })),
            (this.gl = this.renderer.gl),
            this.gl.clearColor(229, 229, 229, 1),
            this.gl.canvas.classList.add("gl", "z-5"),
            (this.camera = new ag(this.gl)),
            this.camera.position.set(0, 0, 5),
            this.camera.lookAt([0, 0, 0]),
            (this.post = new a8(this.gl)),
            (this.pass = this.post.addPass({
              vertex:
                "#define GLSLIFY 1\nattribute vec2 uv;\nattribute vec2 position;\n\nuniform float u_scale;\n\nvarying vec2 vUv;\nvoid main() {\n    vec2 pos = position;\n\n    pos.xy *= u_scale;\n\n    vUv = uv;\n    gl_Position = vec4(pos, 0, 1);\n}",
              fragment:
                "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\n\nuniform float u_diff;\nuniform float u_time;\n\nvarying vec2 vUv;\nvoid main() {\n    vec2 uv = vUv;\n\n    gl_FragColor = texture2D(tMap, uv);\n}",
              uniforms: {
                u_res: { value: new aF(0, 0) },
                u_scale: { value: 1 },
                u_diff: { value: 0 },
              },
            })),
            (this.scene = new oY()),
            (this.mouse = new aF(0, 0)),
            (this.raycast = new aM(this.gl)),
            (this.tl = nk.timeline({
              paused: !0,
              defaults: { duration: 0.35, ease: "power3" },
            })),
            (this.texts = aK(".js-grid-text")),
            sV.on("grid-mount", this.mount),
            sV.on("grid-unmount", this.unmount);
        }
        return (
          (t = n),
          (e = [
            {
              key: "createTiles",
              value: function (t) {
                var e = this,
                  r = new az(this.gl, {
                    widthSegments: 1,
                    heightSegments: 1,
                    width: 1,
                    height: 1,
                  });
                this.tiles = t.map(function (t, n) {
                  var i = new aV();
                  return i.mount(e, t, r, n), (i.text = e.texts[n]), i;
                });
              },
            },
            {
              key: "fade",
              value: function () {
                var t = this,
                  e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : this.tiles,
                  r =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 1,
                  n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 1,
                  i =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 1;
                this.tl.clear().to(this.pass.uniforms.u_scale, { value: i }),
                  e.forEach(function (e) {
                    var i = e.uniforms;
                    t.tl.to(i.u_scale, { value: n, ease: "expo" }, 0),
                      e.focused || t.tl.to(i.u_alpha, { value: r }, 0);
                  }),
                  this.tl.restart();
              },
            },
          ]),
          aG(t.prototype, e),
          r && aG(t, r),
          n
        );
      })())();
      var aJ = sW,
        ut = sH,
        ue = sJ.flags;
      r(248);
      var ur = sW,
        un = ["sun", "sun-cloud", "snow", "rain", "cloud-wind"];
      sJ.dom, sJ.flags;
      var ui = sW,
        us = sH,
        uo = s9,
        ua = sJ.bounds;
      function uu(t) {
        return (uu =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function ul(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function uh(t, e) {
        return (uh =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function uc(t) {
        return (uc = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var uf,
        up,
        ud = sJ.dom,
        u$ = sJ.flags,
        ug = sJ.device,
        um = sH,
        u_ = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && uh(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = uc(e);
                if (r) {
                  var i = uc(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === uu(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "onEnter",
                value: function () {
                  (uf = this),
                    sV.on("transition:end first", this.onTransitionCompleted),
                    sV.emit("menu-clip"),
                    (this.el = this.wrap.lastElementChild),
                    ud.currentPage &&
                      ud.body.classList.remove(
                        "page-".concat(ud.currentPage.id)
                      ),
                    (ud.currentPage = this.el),
                    ud.body.classList.add("page-".concat(ud.currentPage.id)),
                    up && !up.inited() && up.initial();
                },
              },
              {
                key: "onEnterCompleted",
                value: function () {
                  this.initSmooth(), this.initLazy();
                },
              },
              {
                key: "onLeave",
                value: function () {
                  (u$.locked = !0),
                    sV.off(
                      "transition:end first",
                      this.onTransitionCompleted
                    );
                },
              },
              {
                key: "onLeaveCompleted",
                value: function () {
                  this.smooth && this.smooth.unmount(),
                    this.lazy && this.lazy.unmount(),
                    this.projectHovers && this.projectHovers.unmount(),
                    this.carousels &&
                      this.carousels.forEach(function (t) {
                        return t();
                      });
                },
              },
              {
                key: "onTransitionCompleted",
                value: function () {
                  iZ.getAll().forEach(function (t) {
                    return t.kill();
                  }),
                    (function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : ai.body,
                        e = an(".js-s-fades", t);
                      e.length &&
                        e.forEach(function (t) {
                          var e = ar(".js-fade-story", t);
                          if (null == t.dataset.landscape || !as.isPortrait) {
                            var r = nk
                              .timeline({
                                scrollTrigger: {
                                  trigger: t,
                                  start: "top+=33% bottom",
                                },
                                defaults: { ease: "expo" },
                              })
                              .fromTo(
                                an(".js-fade", t),
                                { y: "3rem", alpha: 0 },
                                { y: 0, alpha: 1, duration: 1, stagger: 0.1 }
                              );
                            e &&
                              r
                                .from(
                                  ar("circle", e),
                                  { drawSVG: 0, duration: 0.75 },
                                  0.1
                                )
                                .from(e, { scale: 0, duration: 0.5 }, 0.1);
                          }
                        }),
                        (e = an(".js-s-lines", t)).length &&
                          e.forEach(function (t) {
                            nk.fromTo(
                              new (ae())(t, { type: "lines" }).lines,
                              { y: "3rem", alpha: 0 },
                              {
                                y: 0,
                                alpha: 1,
                                duration: 1,
                                stagger: 0.05,
                                ease: "expo",
                                scrollTrigger: { trigger: t },
                              }
                            );
                          }),
                        (e = an(".js-s-p-lines", t)).length &&
                          e.forEach(function (t) {
                            var e,
                              r = an("p", t);
                            (e = r.length
                              ? r
                                  .map(function (t) {
                                    return new (ae())(t, {
                                      type: "lines",
                                    }).lines;
                                  })
                                  .flat()
                              : new (ae())(t, { type: "lines" }).lines),
                              nk.fromTo(
                                e,
                                { y: "3rem", alpha: 0 },
                                {
                                  y: 0,
                                  alpha: 1,
                                  duration: 1,
                                  stagger: 0.05,
                                  ease: "expo",
                                  scrollTrigger: { trigger: t },
                                }
                              );
                          }),
                        (e = an(".js-vid", t)).length &&
                          e.forEach(function (t) {
                            iZ.create({
                              trigger: t,
                              onToggle: function (e) {
                                e.isActive ? t.play() : t.pause();
                              },
                            });
                          });
                      var r = ar(".js-s-toggle-next", t);
                      if (r) {
                        var n = ar(".js-s-next", t),
                          i = ar(".js-p-hero", n);
                        iZ.create({
                          trigger: r,
                          onToggle: function (e) {
                            e.isActive
                              ? nk.set(
                                  n,
                                  { autoAlpha: 1 },
                                  t.classList.remove("is-active")
                                )
                              : nk.set(
                                  n,
                                  { autoAlpha: 0 },
                                  t.classList.add("is-active")
                                );
                          },
                        }),
                          nk.fromTo(
                            i,
                            { scale: 1.15 },
                            {
                              scale: 1,
                              scrollTrigger: {
                                trigger: r,
                                endTrigger: ar(".js-p-next-end", t),
                                end: "bottom bottom",
                                scrub: !0,
                              },
                            }
                          );
                      }
                    })(uf.el),
                    uf.initProjectHovers(),
                    (u$.locked = !1);
                },
              },
              {
                key: "initSmooth",
                value: function () {
                  var t = um("[data-smooth-item]", this.el);
                  t.length &&
                    (this.smooth = (function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : o9("[data-smooth-item]"),
                        e = arguments.length > 1 ? arguments[1] : void 0,
                        r =
                          arguments.length > 2 &&
                          void 0 !== arguments[2] &&
                          arguments[2],
                        n = 0,
                        i = !1,
                        s = null;
                      oJ.infiniteScroll = r;
                      var o = t.length - 1,
                        a = r && [
                          oZ(".js-replace", e),
                          oZ(".js-replacement", e),
                        ];
                      function u() {
                        s = t.map(function (t, e) {
                          nk.set(t, { y: 0 });
                          var r = oK(t),
                            n = r.top,
                            i = r.bottom,
                            s = n - oQ.wh;
                          return (
                            e === o && (oQ.maxScroll = i - oQ.wh),
                            { el: t, start: s, end: i, out: !0 }
                          );
                        });
                      }
                      function l(t) {
                        (n = t.cY),
                          i ||
                            (oJ.infiniteScroll
                              ? (function t() {
                                  if (!oJ.locked) {
                                    var e = oQ.maxScroll + oQ.wh;
                                    s.length &&
                                      s.forEach(function (t, r) {
                                        var s = t.el,
                                          o = t.start,
                                          u = t.end,
                                          l = nk.utils.wrap(-(e - u), u, n);
                                        f(o, u, l) || i
                                          ? (t.out && (t.out = !1), c(s, l))
                                          : t.out ||
                                            ((t.out = !0),
                                            c(s, l),
                                            0 !== r ||
                                              t.replaced ||
                                              (function t(e) {
                                                e.replaced = !0;
                                                var r = a[1];
                                                (r.style.pointerEvents =
                                                  "auto"),
                                                  (r.style.opacity = 1),
                                                  a[0].remove();
                                                var n = oZ("[data-src]", r),
                                                  i = n.dataset.src;
                                                if (i) {
                                                  var s = new Image();
                                                  (s.src = i),
                                                    s
                                                      .decode()
                                                      .then(function () {
                                                        n.appendChild(s),
                                                          n.classList.add(
                                                            "is-loaded"
                                                          );
                                                      });
                                                }
                                              })(t));
                                      });
                                  }
                                })()
                              : h());
                      }
                      function h() {
                        oJ.locked ||
                          (s.length &&
                            s.forEach(function (t) {
                              var e = t.el;
                              f(t.start, t.end) || i
                                ? (t.out && (t.out = !1), c(e, n))
                                : t.out || ((t.out = !0), c(e, n));
                            }));
                      }
                      function c(t) {
                        var e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : n;
                        t.style.transform = "translate3d(0, ".concat(
                          -e,
                          "px, 0)"
                        );
                      }
                      function f(t, e) {
                        var r =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : n;
                        return r > t && r < e;
                      }
                      function p() {
                        (i = !0),
                          u(),
                          sV.emit("resize:on-reset"),
                          requestAnimationFrame(function () {
                            h(), (i = !1);
                          });
                      }
                      return (
                        a &&
                          ((a[1].style.pointerEvents = "none"),
                          (a[1].style.opacity = 0)),
                        u(),
                        sV.on("tick", l),
                        sV.on("resize resize:scroll", p),
                        {
                          unmount: function t() {
                            sV.off("tick", l),
                              sV.off("resize resize:scroll", p),
                              (s = null),
                              sV.emit("scroll:on-reset");
                          },
                        }
                      );
                    })(t, this.el, void 0 !== this.el.dataset.infinite));
                },
              },
              {
                key: "initLazy",
                value: function () {
                  var t = um("[data-lazy-src]", this.el);
                  t.length &&
                    (this.lazy = (function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : ah("[data-lazy-src]"),
                        e = new IntersectionObserver(function t(r) {
                          r.forEach(function (t) {
                            return (
                              t.isIntersecting &&
                              ((function t(e) {
                                var r = e.dataset.lazySrc;
                                if (r) {
                                  var n = new Image();
                                  e.classList.contains("media-fill") ||
                                    e.classList.add("media-fill"),
                                    (n.alt = ""),
                                    (n.src = r),
                                    n.decode().then(function () {
                                      e.appendChild(n),
                                        e.classList.add("is-loaded");
                                    });
                                }
                              })(t.target),
                              e.unobserve(t.target))
                            );
                          });
                        });
                      return (
                        t.forEach(function (t) {
                          return e.observe(t);
                        }),
                        {
                          unmount: function t() {
                            e.disconnect();
                          },
                        }
                      );
                    })(t));
                },
              },
              {
                key: "initProjectHovers",
                value: function () {
                  if (!ug.isSmall && !ug.isMobile) {
                    var t = um(".js-m-move-wrap", this.el);
                    t.length &&
                      (this.projectHovers = (function () {
                        var t,
                          e,
                          r =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : us(".js-m-move-wrap"),
                          n = 0,
                          i = 0,
                          s = 0,
                          o = 0,
                          a = 0,
                          u = [0, 0],
                          l = !1;
                        function h() {
                          (a = uo(ui(".js-scroll-height")).height),
                            (t = r.map(function (t, e) {
                              var r = ui(".js-m-move", t),
                                n = uo(r),
                                i = n.left,
                                s = n.top,
                                o = n.height,
                                a = i + n.width / 2,
                                u = s + o / 2,
                                l = 1;
                              return (
                                s <= ua.wh && ((u += ua.wh), (l = 0)),
                                { item: r, ox: a, oy: u, si: l }
                              );
                            }));
                        }
                        function c(t) {
                          var r = t.cY;
                          if (l) {
                            var h = e,
                              c = h.ox,
                              f = h.oy,
                              p = h.item,
                              d = h.si;
                            0 === d
                              ? (u[0] = nk.utils.wrap(0, a - ua.wh, r))
                              : (u[1] = nk.utils.wrap(0, a, r)),
                              (s = n - c),
                              (o = i - (f - u[d])),
                              (p.style.transform = "translate3d("
                                .concat(s, "px, ")
                                .concat(o, "px, 0)"));
                          }
                        }
                        function f(t) {
                          var e = t.x,
                            r = t.y;
                          (n = e), (i = r);
                        }
                        function p(a) {
                          var u = a.currentTarget;
                          (s = n), (o = i), (e = t[r.indexOf(u)]), (l = !0);
                        }
                        function d() {
                          l = !1;
                        }
                        return (
                          h(),
                          sV.on("mouseenter", r, p),
                          sV.on("mouseleave", r, d),
                          sV.on("mousemove", f),
                          sV.on("resize:on-reset", h),
                          sV.on("tick", c),
                          {
                            unmount: function t() {
                              sV.off("mouseenter", r, p),
                                sV.off("mouseleave", r, d),
                                sV.off("mousemove", f),
                                sV.off("resize:on-reset", h),
                                sV.off("tick", c);
                            },
                          }
                        );
                      })(t));
                  }
                },
              },
            ]),
            ul(n.prototype, i),
            s && ul(n, s),
            a
          );
        })(h.Renderer);
      function uv(t) {
        return (uv =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uD(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function uy() {
        return (uy =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = u0(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function u8(t, e) {
        return (u8 =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function ux(t) {
        if (void 0 === t)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function u0(t) {
        return (u0 = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var ub = null,
        uw = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && u8(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = u0(e);
                if (r) {
                  var i = u0(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === uv(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return ux(e);
                })(this, t);
              });
          function a() {
            !(function t(e, r) {
              if (!(e instanceof r))
                throw TypeError("Cannot call a class as a function");
            })(this, a);
            for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            var n,
              i,
              s,
              u = "toWorks";
            return (
              (i = ux((n = o.call.apply(o, [this].concat(e))))),
              (s = function () {
                lR.redirect(location.origin + "/work");
              }),
              u in i
                ? Object.defineProperty(i, u, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (i[u] = s),
              n
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "onEnter",
                value: function () {
                  var t, e, r, n;
                  uy(u0(a.prototype), "onEnter", this).call(this),
                    (e = ur(".js-time")),
                    (r = ur(".js-icon")),
                    (n = ur(".js-temp")),
                    (t = (t = new Date())
                      .toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "America/New_York",
                      })
                      .replace(/^0+/, "")),
                    (e.textContent = t),
                    fetch(
                      "https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=72729c771be1b04aeb9f497754d67c5a"
                    )
                      .then(function (t) {
                        return t.json();
                      })
                      .then(function (t) {
                        var e, i, s;
                        return (
                          (e = t),
                          (n.textContent = "".concat(
                            parseInt(e.main.temp),
                            "\xc2\xb0C"
                          )),
                          void (((s = new Image()).src =
                            "/static/icons/".concat(
                              (i = e.weather[0].description).includes("clear")
                                ? un[0]
                                : i.includes("cloud")
                                ? un[1]
                                : i.includes("snow")
                                ? un[2]
                                : i.includes("rain")
                                ? un[3]
                                : un[1],
                              ".svg"
                            )),
                          r.appendChild(s))
                        );
                      });
                },
              },
              {
                key: "onLeave",
                value: function () {
                  sV.off("scroll", this.toWorks),
                    uy(u0(a.prototype), "onLeave", this).call(this);
                },
              },
              {
                key: "onEnterCompleted",
                value: function () {
                  uy(u0(a.prototype), "onEnterCompleted", this).call(this),
                    ub ||
                      (ub = (function () {
                        var t,
                          e = new oE(),
                          r = e.gl;
                        function n() {
                          e.setSize(oG.ww, oG.wh);
                        }
                        r.clearColor(1, 1, 1, 1), n();
                        var i = new o3(r),
                          s =
                            ((t = new Date()),
                            (500 <=
                              (t = parseFloat(
                                (t = t
                                  .toLocaleString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "America/New_York",
                                  })
                                  .replace(/^0+/, "")
                                  .replace(/\D/g, ""))
                              )) && t <= 900
                              ? "1"
                              : 900 <= t && t <= 1200
                              ? "2"
                              : 1200 <= t && t <= 1500
                              ? "3"
                              : 1500 <= t && t <= 1700
                              ? "4"
                              : 1700 <= t && t <= 2e3
                              ? "5"
                              : 2e3 <= t && t <= 2400
                              ? "6"
                              : 0 <= t && t <= 500
                              ? "7"
                              : void 0) - 1),
                          o = new o6(r, {
                            vertex:
                              "#define GLSLIFY 1\nattribute vec2 uv;\nattribute vec2 position;\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 0, 1);\n}",
                            fragment:
                              "precision highp float;\n#define GLSLIFY 1\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nuniform float u_time;\n\nuniform vec3 u_color1;\nuniform vec3 u_color2;\nuniform vec3 u_color3;\nuniform vec3 u_color4;\n\nvarying vec2 vUv;\nvoid main() {\n    vec2 uv = vUv;\n\n    float noise = snoise(uv * .75 + (u_time / 15.)) * .75;\n\n    float progress1 = smoothstep(0.0, 0.25, uv.y);\n    vec3 mix1 = mix(u_color1, u_color2, progress1);\n    float progress2 = smoothstep(0., .5, uv.y);\n    vec3 mix2 = mix(mix1, u_color3, progress2);\n    float progress3 = smoothstep(0.25, 1.0, uv.y);\n    vec3 final = mix(mix2, u_color4, progress3 + noise);\n\n    gl_FragColor.rgb = final;\n    gl_FragColor.a = 1.;\n}",
                            uniforms: {
                              u_time: { value: 0 },
                              u_color1: { value: new oL(oH[s][0]) },
                              u_color2: { value: new oL(oH[s][1]) },
                              u_color3: { value: new oL(oH[s][2]) },
                              u_color4: { value: new oL(oH[s][3]) },
                            },
                          }),
                          a = new oV(r, { geometry: i, program: o });
                        function u(t) {
                          var r = t.time;
                          (o.uniforms.u_time.value = r),
                            e.render({ scene: a });
                        }
                        return {
                          mount: function () {
                            var t =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : oW(".js-gradient");
                            sV.on("resize", n),
                              sV.on("tick", u),
                              t.appendChild(r.canvas),
                              r.canvas.classList.add("gl"),
                              n();
                          },
                          unmount: function () {
                            sV.off("resize", n), sV.off("tick", u);
                          },
                        };
                      })()),
                    ub.mount(),
                    sV.on("scroll", this.toWorks);
                },
              },
              {
                key: "onLeaveCompleted",
                value: function () {
                  uy(u0(a.prototype), "onLeaveCompleted", this).call(this),
                    ub.unmount();
                },
              },
              {
                key: "load",
                value: function () {
                  uy(u0(a.prototype), "load", this).call(this);
                },
              },
            ]),
            uD(n.prototype, i),
            s && uD(n, s),
            a
          );
        })(u_);
      function uE(t) {
        return (uE =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uC(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function u1() {
        return (u1 =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = uA(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function uF(t, e) {
        return (uF =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function uT(t) {
        if (void 0 === t)
          throw ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function uA(t) {
        return (uA = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      function u3(t, e, r) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = r),
          t
        );
      }
      var u4,
        uS = sW,
        u6 = sJ.device,
        uP = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && uF(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = uA(e);
                if (r) {
                  var i = uA(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === uE(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return uT(e);
                })(this, t);
              });
          function a() {
            var t;
            !(function t(e, r) {
              if (!(e instanceof r))
                throw TypeError("Cannot call a class as a function");
            })(this, a);
            for (var e = arguments.length, r = Array(e), n = 0; n < e; n++)
              r[n] = arguments[n];
            return (
              u3(
                uT((t = o.call.apply(o, [this].concat(r)))),
                "initStory",
                function () {
                  var e = uS(".js-story", t.el);
                  e &&
                    (t.story = (function t() {
                      var e =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : aJ(".js-story"),
                        r = [aJ(".js-story-open"), ut(".js-story-close", e)],
                        n = aJ(".js-story-bg", e),
                        i = aJ(".js-story-content", e),
                        s = nk
                          .timeline({
                            defaults: { duration: 0.75, ease: "power4" },
                          })
                          .set(n, { alpha: 0 })
                          .set(i, { yPercent: 100 }),
                        o = null;
                      function a() {
                        (ue.locked = !0),
                          o
                            ? o.mount()
                            : (o = (function t(e) {
                                var r,
                                  n,
                                  i,
                                  s = ao(".js-story-slides", e),
                                  o = aa(".js-story-slide", e),
                                  a = ao(".js-story-next", e),
                                  u = ao(".js-story-previous", e),
                                  l = "is-deactivated",
                                  h = o.length - 1,
                                  c = 0,
                                  f = 0,
                                  p = 0,
                                  d = 0,
                                  $ = 0,
                                  g = 0,
                                  m = 0,
                                  _ = !1,
                                  v = !1;
                                function D() {
                                  (n = au(s).left),
                                    (i = []),
                                    (r = o.map(function (t, r) {
                                      nk.set(t, { x: 0 });
                                      var s = au(t),
                                        o = s.left,
                                        a = s.right,
                                        u = s.width,
                                        l = nk.quickSetter(t, "x", "px");
                                      return (
                                        r === h && (p = o - n),
                                        i.push(o - n),
                                        {
                                          el: e,
                                          left: o,
                                          width: u,
                                          xSet: l,
                                          start: o - al.ww,
                                          end: a,
                                          out: !0,
                                        }
                                      );
                                    }));
                                }
                                function y(t) {
                                  var e = t.x,
                                    r = t.y;
                                  t.target.closest("button") ||
                                    ((_ = !0),
                                    (d = e),
                                    ($ = r),
                                    (g = c + 2 * e));
                                }
                                function x(t) {
                                  var e = t.x,
                                    r = t.y,
                                    n = t.e;
                                  _ &&
                                    (Math.abs(e - d) > Math.abs(r - $) &&
                                      n.cancelable &&
                                      (n.preventDefault(),
                                      n.stopPropagation()),
                                    (c = g - 2 * e),
                                    (c = nk.utils.clamp(0, p, c)));
                                }
                                function b() {
                                  _ &&
                                    ((_ = !1),
                                    (c = nk.utils.snap(i, c)),
                                    (m = i.indexOf(c)),
                                    C());
                                }
                                function w() {
                                  (c = i[(m = Math.min(h, m + 1))]), C();
                                }
                                function E() {
                                  (c = i[(m = Math.max(0, m - 1))]), C();
                                }
                                function C() {
                                  0 === m
                                    ? u.classList.add(l)
                                    : u.classList.remove(l),
                                    m === h
                                      ? a.classList.add(l)
                                      : a.classList.remove(l);
                                }
                                function F() {
                                  (f += 0.125 * (c - f)),
                                    (f = Math.round(100 * f) / 100),
                                    v || T();
                                }
                                function T() {
                                  r.length &&
                                    r.forEach(function (t) {
                                      var e,
                                        r,
                                        n,
                                        i,
                                        s,
                                        o,
                                        a = t.start,
                                        u = t.end,
                                        l = t.width,
                                        h = t.left,
                                        c = t.xSet,
                                        p =
                                          ((e = a),
                                          (r = u),
                                          (n = l),
                                          (i = h),
                                          (o = 0),
                                          (s = f > e && f < r) &&
                                            (o = nk.utils.clamp(
                                              0,
                                              1,
                                              1 + (f - i - n) / (al.ww + n)
                                            )),
                                          { isVisible: s, progress: o }),
                                        d = p.isVisible;
                                      p.progress,
                                        d || v
                                          ? (t.out && (t.out = !1), c(-f))
                                          : t.out || ((t.out = !0), c(-f));
                                    });
                                }
                                function A() {
                                  (v = !0), D(), T(), (v = !1);
                                }
                                function S() {
                                  sV.on("mouseup", b),
                                    sV.on("mousedown", y),
                                    sV.on("mousemove", x),
                                    sV.on("resize", A),
                                    sV.on("tick", F),
                                    sV.on("click", a, w),
                                    sV.on("click", u, E);
                                }
                                return (
                                  D(),
                                  S(),
                                  {
                                    mount: S,
                                    unmount: function () {
                                      sV.off("mouseup", b),
                                        sV.off("mousedown", y),
                                        sV.off("mousemove", x),
                                        sV.off("resize", A),
                                        sV.off("tick", F),
                                        sV.off("click", a, w),
                                        sV.off("click", u, E);
                                    },
                                  }
                                );
                              })(e)),
                          s
                            .clear()
                            .set(e, { autoAlpha: 1 })
                            .to(n, { alpha: 1 })
                            .to(i, { yPercent: 0 }, 0)
                            .restart();
                      }
                      function u() {
                        (ue.locked = !1),
                          o.unmount(),
                          s
                            .clear()
                            .to(n, { alpha: 0 })
                            .to(i, { yPercent: 100 }, 0)
                            .set(e, { autoAlpha: 0 })
                            .restart();
                      }
                      return (
                        sV.on("click", r[0], a),
                        sV.on("click", r[1], u),
                        {
                          unmount: function t() {
                            sV.off("click", r[0], a),
                              sV.off("click", r[1], u),
                              o && o.unmount();
                          },
                        }
                      );
                    })(e));
                }
              ),
              u3(uT(t), "topClip", function () {
                var e = uS(".js-s-case-top", t.el);
                if (e) {
                  var r = 1,
                    n = !1;
                  iZ.create({
                    trigger: e,
                    endTrigger: uS(".js-s-case-top-end", t.el),
                    start: "top top",
                    end: "top top",
                    onUpdate: function (i) {
                      t.leave ||
                        ((r = 1 - i.progress),
                        u6.isSmall
                          ? nk.set(e, {
                              clipPath: "inset("
                                .concat(8 * r, "rem 0 0 0 round ")
                                .concat(1.2 * r, "rem ")
                                .concat(1.2 * r, "rem 0 0)"),
                            })
                          : nk.set(e, {
                              clipPath: "inset("
                                .concat(8 * r, "rem ")
                                .concat(2 * r, "rem 0 ")
                                .concat(2 * r, "rem round ")
                                .concat(1.2 * r, "rem ")
                                .concat(1.2 * r, "rem 0 0)"),
                            }),
                        1 !== i.progress || n
                          ? n &&
                            ((n = !1), t.el.classList.remove("is-active"))
                          : (n || (n = !0), t.el.classList.add("is-active")));
                    },
                  });
                }
              }),
              u3(uT(t), "onESC", function (e) {
                var r = e.key;
                (t.escaped = !0),
                  document.removeEventListener("keyup", t.onESC),
                  "ESCAPE" === r.toUpperCase() &&
                    lR.redirect(location.origin + "/work");
              }),
              t
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "setup",
                value: function () {
                  u1(uA(a.prototype), "setup", this).call(this);
                },
              },
              {
                key: "onEnter",
                value: function () {
                  u1(uA(a.prototype), "onEnter", this).call(this),
                    (u4 = this);
                },
              },
              {
                key: "onLeave",
                value: function () {
                  (this.leave = !0),
                    this.el.classList.remove("is-active"),
                    u1(uA(a.prototype), "onLeave", this).call(this),
                    this.story && this.story.unmount();
                },
              },
              {
                key: "onEnterCompleted",
                value: function () {
                  u1(uA(a.prototype), "onEnterCompleted", this).call(this),
                    document.addEventListener("keyup", this.onESC);
                },
              },
              {
                key: "onLeaveCompleted",
                value: function () {
                  u1(uA(a.prototype), "onLeaveCompleted", this).call(this),
                    this.escaped ||
                      document.removeEventListener("keyup", this.onESC);
                },
              },
              {
                key: "onTransitionCompleted",
                value: function () {
                  u1(uA(a.prototype), "onTransitionCompleted", this).call(
                    this
                  ),
                    u4.initStory(),
                    u4.topClip();
                },
              },
              {
                key: "load",
                value: function () {
                  u1(uA(a.prototype), "load", this).call(this);
                },
              },
            ]),
            uC(n.prototype, i),
            s && uC(n, s),
            a
          );
        })(u_);
      function u2(t) {
        return (u2 =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uk(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function uO() {
        return (uO =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = u5(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function uB(t, e) {
        return (uB =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function u5(t) {
        return (u5 = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      sJ.flags;
      var u7 = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && uB(t, e);
        })(a, t);
        var e,
          r,
          n,
          i,
          s,
          o =
            ((e = a),
            (r = (function () {
              if (
                "undefined" == typeof Reflect ||
                !Reflect.construct ||
                Reflect.construct.sham
              )
                return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                n = u5(e);
              if (r) {
                var i = u5(this).constructor;
                t = Reflect.construct(n, arguments, i);
              } else t = n.apply(this, arguments);
              return (function t(e, r) {
                if (r && ("object" === u2(r) || "function" == typeof r))
                  return r;
                if (void 0 !== r)
                  throw TypeError(
                    "Derived constructors may only return object or undefined"
                  );
                return (function (t) {
                  if (void 0 === t)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return t;
                })(e);
              })(this, t);
            });
        function a() {
          return (
            (function t(e, r) {
              if (!(e instanceof r))
                throw TypeError("Cannot call a class as a function");
            })(this, a),
            o.apply(this, arguments)
          );
        }
        return (
          (n = a),
          (i = [
            {
              key: "setup",
              value: function () {
                uO(u5(a.prototype), "setup", this).call(this);
              },
            },
            {
              key: "onEnter",
              value: function () {
                uO(u5(a.prototype), "onEnter", this).call(this);
              },
            },
            {
              key: "onLeave",
              value: function () {
                uO(u5(a.prototype), "onLeave", this).call(this);
              },
            },
            {
              key: "onEnterCompleted",
              value: function () {
                uO(u5(a.prototype), "onEnterCompleted", this).call(this),
                  (this.aboutLists = (function () {
                    var t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : af(".js-about-list-trigger"),
                      e = null;
                    function r(t) {
                      (e = ac(".js-about-list", t.currentTarget)) &&
                        (nk.set(e, { display: "flex" }),
                        sV.emit("resize", !0));
                    }
                    function n() {
                      nk.set(e, { display: "none" }), sV.emit("resize", !0);
                    }
                    return (
                      sV.on("mouseenter", t, r),
                      sV.on("mouseleave", t, n),
                      {
                        unmount: function e() {
                          sV.off("mouseenter", t, r),
                            sV.off("mouseleave", t, n);
                        },
                      }
                    );
                  })());
              },
            },
            {
              key: "onLeaveCompleted",
              value: function () {
                uO(u5(a.prototype), "onLeaveCompleted", this).call(this),
                  this.aboutLists.unmount();
              },
            },
            {
              key: "onTransitionCompleted",
              value: function () {
                uO(u5(a.prototype), "onTransitionCompleted", this).call(this);
              },
            },
            {
              key: "load",
              value: function () {
                uO(u5(a.prototype), "load", this).call(this);
              },
            },
          ]),
          uk(n.prototype, i),
          s && uk(n, s),
          a
        );
      })(u_);
      function uL(t) {
        return (uL =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uR(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function uM() {
        return (uM =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = uN(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function uz(t, e) {
        return (uz =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function uN(t) {
        return (uN = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var uI = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && uz(t, e);
        })(a, t);
        var e,
          r,
          n,
          i,
          s,
          o =
            ((e = a),
            (r = (function () {
              if (
                "undefined" == typeof Reflect ||
                !Reflect.construct ||
                Reflect.construct.sham
              )
                return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                n = uN(e);
              if (r) {
                var i = uN(this).constructor;
                t = Reflect.construct(n, arguments, i);
              } else t = n.apply(this, arguments);
              return (function t(e, r) {
                if (r && ("object" === uL(r) || "function" == typeof r))
                  return r;
                if (void 0 !== r)
                  throw TypeError(
                    "Derived constructors may only return object or undefined"
                  );
                return (function (t) {
                  if (void 0 === t)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return t;
                })(e);
              })(this, t);
            });
        function a() {
          return (
            (function t(e, r) {
              if (!(e instanceof r))
                throw TypeError("Cannot call a class as a function");
            })(this, a),
            o.apply(this, arguments)
          );
        }
        return (
          (n = a),
          (i = [
            {
              key: "onEnter",
              value: function () {
                uM(uN(a.prototype), "onEnter", this).call(this);
              },
            },
            {
              key: "onLeave",
              value: function () {
                uM(uN(a.prototype), "onLeave", this).call(this);
              },
            },
            {
              key: "onEnterCompleted",
              value: function () {
                uM(uN(a.prototype), "onEnterCompleted", this).call(this),
                  sV.emit("grid-mount");
              },
            },
            {
              key: "onLeaveCompleted",
              value: function () {
                uM(uN(a.prototype), "onLeaveCompleted", this).call(this),
                  sV.emit("grid-unmount");
              },
            },
            {
              key: "load",
              value: function () {
                uM(uN(a.prototype), "load", this).call(this);
              },
            },
          ]),
          uR(n.prototype, i),
          s && uR(n, s),
          a
        );
      })(u_);
      function uj(t) {
        return (uj =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uU(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function uY() {
        return (uY =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = uq(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function uX(t, e) {
        return (uX =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function uq(t) {
        return (uq = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var uV = sW,
        uG = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && uX(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = uq(e);
                if (r) {
                  var i = uq(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === uj(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "onEnter",
                value: function () {
                  var t = this;
                  uY(uq(a.prototype), "onEnter", this).call(this);
                  var e = uV("form");
                  e.onsubmit = function (r) {
                    r.preventDefault(),
                      "Aotearoa2022" !== uV("#access-code").value
                        ? e.classList.add("is-error")
                        : (t.setCookie("protected", "protected", 30),
                          nk.to(t.el, {
                            alpha: 0,
                            duration: 0.5,
                            ease: "power1",
                            onComplete: function () {
                              return location.reload();
                            },
                          }));
                  };
                },
              },
              {
                key: "setCookie",
                value: function (t, e, r) {
                  var n = "";
                  if (r) {
                    var i = new Date();
                    i.setTime(i.getTime() + 24 * r * 36e5),
                      (n = "; expires=" + i.toUTCString());
                  }
                  document.cookie = t + "=" + (e || "") + n + "; path=/";
                },
              },
            ]),
            uU(n.prototype, i),
            s && uU(n, s),
            a
          );
        })(u_);
      function uW(t) {
        return (uW =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function uH(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function u9(t, e) {
        return (u9 =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function uZ(t) {
        return (uZ = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var uK = sW,
        uQ = sH,
        uJ = sJ.dom,
        lt = sJ.fromPage,
        le = sJ.device,
        lr = nk.timeline({ paused: !0, defaults: { force3D: !0 } }),
        ln = nk.timeline({ paused: !0, defaults: { force3D: !0 } }),
        li = null,
        ls = null,
        lo = null,
        la = 0,
        lu = 0,
        ll = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && u9(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = uZ(e);
                if (r) {
                  var i = uZ(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === uW(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "in",
                value: function (t) {
                  var e = t.to,
                    r = t.done;
                  sV.emit("scroll:on-reset"), r(), (lo = uK(".js-t-mask", e));
                  var n = uQ(".js-t-item", e),
                    i = uQ(".js-t-l", e),
                    s = uK(".js-t-intro", e),
                    o = le.isSmall
                      ? uQ(".js-t-about-mob", e)
                      : uQ(".js-t-about-desk", e),
                    a = la;
                  (la = new Date()),
                    (lu =
                      nk.utils.clamp(
                        0,
                        400,
                        400 -
                          Math.abs(la.getMilliseconds() - a.getMilliseconds())
                      ) / 1e3),
                    ln
                      .clear()
                      .set(e, { zIndex: 10 })
                      .fromTo(
                        lo,
                        { yPercent: 100 },
                        { yPercent: 0, duration: 0.75, ease: "power4" },
                        lu
                      )
                      .add(function () {
                        lt.routes[0].remove(),
                          lr.clear(),
                          sV.emit("resize:scroll"),
                          sV.emit("transition:end");
                      })
                      .set(uJ.body, { clearProps: "pointerEvents" }, "+=0.1"),
                    i.length &&
                      ln.from(
                        i,
                        {
                          alpha: 0,
                          yPercent: -10,
                          rotationX: -15,
                          duration: 1,
                          stagger: 0.035,
                          ease: "expo",
                        },
                        0.5 + lu
                      ),
                    s &&
                      ln.from(
                        new (ae())(s, { types: "lines" }).lines,
                        {
                          alpha: 0,
                          duration: 1,
                          stagger: 0.05,
                          ease: "power1",
                        },
                        0.75 + lu
                      ),
                    n.length &&
                      ln.fromTo(
                        n,
                        { y: "4.5rem", alpha: 0 },
                        {
                          y: 0,
                          alpha: 1,
                          duration: 0.75,
                          stagger: 0.075,
                          ease: "expo",
                        },
                        0.4 + lu
                      ),
                    o.length &&
                      ln.fromTo(
                        o,
                        { y: "4.5rem", alpha: 0 },
                        {
                          y: 0,
                          alpha: 1,
                          duration: 0.75,
                          stagger: 0.075,
                          ease: "expo",
                        },
                        0.4 + lu
                      ),
                    ln.restart();
                },
              },
              {
                key: "out",
                value: function (t) {
                  (lt.routes = uQ("[data-router-view]")),
                    (lt.total = lt.routes.length);
                  var e = 2 === lt.total,
                    r = e ? lt.routes[1] : t.from;
                  (li = uK(".js-t-fade", r)),
                    (ls = uK(".js-t-mask", r)),
                    (la = new Date()),
                    lr
                      .clear()
                      .set(uJ.body, { pointerEvents: "none" })
                      .fromTo(
                        li,
                        { alpha: 0 },
                        { alpha: 1, duration: 0.25, ease: "power1" },
                        0
                      ),
                    ls.closest("#case") ||
                      lr
                        .set(ls, { transformOrigin: "bottom" }, 0)
                        .fromTo(
                          ls,
                          { scale: 1 },
                          { scale: 0.965, duration: 0.75, ease: "power3" },
                          0
                        ),
                    lr
                      .add(function () {
                        return (
                          e && (lt.routes[0].remove(), lt.routes.shift())
                        );
                      })
                      .add(function () {
                        return t.done();
                      }, 0),
                    lr.restart();
                },
              },
            ]),
            uH(n.prototype, i),
            s && uH(n, s),
            a
          );
        })(h.Transition);
      function lh(t) {
        return (lh =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function lc(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
        return n;
      }
      function lf(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function lp(t, e) {
        return (lp =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function ld(t) {
        return (ld = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var l$ = sW,
        lg = sJ.dom,
        lm =
          (sJ.flags, nk.timeline({ paused: !0, defaults: { force3D: !0 } })),
        l_ = nk.timeline({ paused: !0, defaults: { force3D: !0 } }),
        lv = null,
        lD = null,
        ly = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && lp(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = ld(e);
                if (r) {
                  var i = ld(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === lh(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "in",
                value: function (t) {
                  var e = t.to,
                    r = t.done;
                  sV.emit("scroll:on-reset"), r(), (lD = l$(".js-t-mask", e));
                  var n,
                    i = l$(".js-t-title", e);
                  i && (i = new (ae())(i, { type: "words" }).words);
                  var s = l$(".js-t-small", e),
                    o =
                      s && i
                        ? [s].concat(
                            (function (t) {
                              if (Array.isArray(t)) return lc(t);
                            })((n = i)) ||
                              (function (t) {
                                if (
                                  ("undefined" != typeof Symbol &&
                                    null != t[Symbol.iterator]) ||
                                  null != t["@@iterator"]
                                )
                                  return Array.from(t);
                              })(n) ||
                              (function (t, e) {
                                if (t) {
                                  if ("string" == typeof t) return lc(t, e);
                                  var r = Object.prototype.toString
                                    .call(t)
                                    .slice(8, -1);
                                  if (
                                    ("Object" === r &&
                                      t.constructor &&
                                      (r = t.constructor.name),
                                    "Map" === r || "Set" === r)
                                  )
                                    return Array.from(t);
                                  if (
                                    "Arguments" === r ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                      r
                                    )
                                  )
                                    return lc(t, e);
                                }
                              })(n) ||
                              (function () {
                                throw TypeError(
                                  "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                );
                              })()
                          )
                        : null;
                  l_
                    .clear()
                    .set(e, { zIndex: 10 })
                    .fromTo(
                      lD,
                      { yPercent: 100 },
                      { yPercent: 0, duration: 0.75, ease: "power4" },
                      0
                    )
                    .add(function () {
                      lm.clear(),
                        sV.emit("resize:scroll"),
                        sV.emit("transition:end");
                    })
                    .set(lg.body, { clearProps: "pointerEvents" }, "+=0.1"),
                    o &&
                      l_.fromTo(
                        o,
                        { y: "4.5rem", alpha: 0 },
                        {
                          y: 0,
                          alpha: 1,
                          duration: 0.75,
                          stagger: 0.075,
                          ease: "expo",
                        },
                        0.25
                      ),
                    l_.restart();
                },
              },
              {
                key: "out",
                value: function (t) {
                  var e = t.from,
                    r = t.done;
                  (lv = l$(".js-t-fade", e)),
                    lm
                      .clear()
                      .set(lg.body, { pointerEvents: "none" })
                      .fromTo(
                        lv,
                        { alpha: 0 },
                        { alpha: 1, duration: 0.25, ease: "power1" },
                        0
                      )
                      .add(function () {
                        return r();
                      })
                      .restart();
                },
              },
            ]),
            lf(n.prototype, i),
            s && lf(n, s),
            a
          );
        })(h.Transition);
      function l8(t) {
        return (l8 =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function lx(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
        return n;
      }
      function l0(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function lb(t, e) {
        return (lb =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function lw(t) {
        return (lw = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      var lE = sW,
        lC = sH,
        l1 = s9,
        lF = sJ.dom,
        lT = sJ.fromPage,
        lA = nk.timeline({
          paused: !0,
          delay: 0.1,
          defaults: { duration: 0.4, ease: "power3" },
        }),
        l3 = nk.timeline({ paused: !0, defaults: { force3D: !0 } }),
        l4 = null,
        lS = null,
        l6 = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              e && lb(t, e);
          })(a, t);
          var e,
            r,
            n,
            i,
            s,
            o =
              ((e = a),
              (r = (function () {
                if (
                  "undefined" == typeof Reflect ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              function () {
                var t,
                  n = lw(e);
                if (r) {
                  var i = lw(this).constructor;
                  t = Reflect.construct(n, arguments, i);
                } else t = n.apply(this, arguments);
                return (function t(e, r) {
                  if (r && ("object" === l8(r) || "function" == typeof r))
                    return r;
                  if (void 0 !== r)
                    throw TypeError(
                      "Derived constructors may only return object or undefined"
                    );
                  return (function (t) {
                    if (void 0 === t)
                      throw ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      );
                    return t;
                  })(e);
                })(this, t);
              });
          function a() {
            return (
              (function t(e, r) {
                if (!(e instanceof r))
                  throw TypeError("Cannot call a class as a function");
              })(this, a),
              o.apply(this, arguments)
            );
          }
          return (
            (n = a),
            (i = [
              {
                key: "in",
                value: function (t) {
                  var e,
                    r = t.to,
                    n = t.done;
                  sV.emit("scroll:on-reset"),
                    n(),
                    (lS = lE(".js-t-mask", r)),
                    l3
                      .clear()
                      .set(r, { zIndex: 10 })
                      .fromTo(
                        lS,
                        { yPercent: 100 },
                        { yPercent: 0, duration: 0.5, ease: "power3" },
                        0
                      )
                      .add(function () {
                        l4 && r.prepend(l4.cloneNode(!0)),
                          lT.routes[0].remove(),
                          lA.clear(),
                          sV.emit("resize:scroll"),
                          sV.emit("transition:end");
                      })
                      .set(lF.body, { clearProps: "pointerEvents" }, "+=0.1")
                      .fromTo(
                        [lE(".js-t-small", r)].concat(
                          (function (t) {
                            if (Array.isArray(t)) return lx(t);
                          })(
                            (e = new (ae())(lE(".js-t-title", r), {
                              type: "words",
                            }).words)
                          ) ||
                            (function (t) {
                              if (
                                ("undefined" != typeof Symbol &&
                                  null != t[Symbol.iterator]) ||
                                null != t["@@iterator"]
                              )
                                return Array.from(t);
                            })(e) ||
                            (function (t, e) {
                              if (t) {
                                if ("string" == typeof t) return lx(t, e);
                                var r = Object.prototype.toString
                                  .call(t)
                                  .slice(8, -1);
                                if (
                                  ("Object" === r &&
                                    t.constructor &&
                                    (r = t.constructor.name),
                                  "Map" === r || "Set" === r)
                                )
                                  return Array.from(t);
                                if (
                                  "Arguments" === r ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                    r
                                  )
                                )
                                  return lx(t, e);
                              }
                            })(e) ||
                            (function () {
                              throw TypeError(
                                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                              );
                            })()
                        ),
                        { y: "4.5rem", alpha: 0 },
                        {
                          y: 0,
                          alpha: 1,
                          duration: 1,
                          stagger: 0.1,
                          ease: "expo",
                        },
                        0.25
                      ),
                    l3.restart(),
                    lF.body.classList.remove("is-loading");
                },
              },
              {
                key: "out",
                value: function (t) {
                  lF.body.classList.add("is-loading"),
                    (lT.routes = lC("[data-router-view]")),
                    (lT.total = lT.routes.length);
                  var e = 2 === lT.total,
                    r = e ? lT.routes[1] : t.from;
                  (l4 = lE(".js-t-hero", r)) &&
                    l4.classList.remove("js-t-hero"),
                    l4.parentNode.classList.add("is-active");
                  var n = lE(".js-t-bottom", r);
                  n.classList.add("is-out"),
                    lA
                      .clear()
                      .set(lF.body, { pointerEvents: "none" })
                      .to(n, { y: -l1(n).bottom }, 0)
                      .add(function () {
                        return (
                          e && (lT.routes[0].remove(), lT.routes.shift())
                        );
                      }, 0.4)
                      .add(function () {
                        return t.done();
                      }, 0.4)
                      .restart();
                },
              },
            ]),
            l0(n.prototype, i),
            s && l0(n, s),
            a
          );
        })(h.Transition);
      function lP(t) {
        return (lP =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function l2(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      function lk() {
        return (lk =
          "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (t, e, r) {
                var n = (function t(e, r) {
                  for (
                    ;
                    !Object.prototype.hasOwnProperty.call(e, r) &&
                    null !== (e = lB(e));

                  );
                  return e;
                })(t, e);
                if (n) {
                  var i = Object.getOwnPropertyDescriptor(n, e);
                  return i.get
                    ? i.get.call(arguments.length < 3 ? t : r)
                    : i.value;
                }
              }).apply(this, arguments);
      }
      function lO(t, e) {
        return (lO =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t;
          })(t, e);
      }
      function lB(t) {
        return (lB = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            })(t);
      }
      (function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
          e = t.el,
          r = void 0 === e ? window : e,
          n = t.mouseMultiplier,
          i = void 0 === n ? 0.45 : n,
          s = t.touchMultiplier,
          o = void 0 === s ? 3 : s,
          a = t.firefoxMultiplier,
          u = void 0 === a ? 20 : a,
          l = t.keyStep,
          h = void 0 === l ? 120 : l,
          c = { mouse: or ? 2 * i : i, firefox: or ? 2 * u : u },
          f = ot.hasWheelEvent,
          p = ot.hasMouseWheelEvent,
          d = ot.hasTouch,
          $ = ot.hasKeyDown,
          g = 0,
          m = 0,
          _ = 0,
          v = 0,
          D = 0,
          y = 0;
        function x(t) {
          (g += _),
            (m += v),
            sV.emit("vs", { y: m, x: g, dY: v, dX: _, oE: t });
        }
        f &&
          sV.on(
            "wheel",
            r,
            function t(e) {
              var r = c.mouse,
                n = c.firefox;
              (_ = e.wheelDeltaX || -1 * e.deltaX),
                (v = e.wheelDeltaY || -1 * e.deltaY),
                on && 1 === e.deltaMode && ((_ *= n), (v *= n)),
                (_ *= r),
                (v *= r),
                x(e);
            },
            { passive: !0 }
          ),
          p &&
            sV.on(
              "mousewheel",
              r,
              function t(e) {
                (_ = e.wheelDeltaX ? e.wheelDeltaX : 0),
                  (v = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta),
                  x(e);
              },
              { passive: !0 }
            ),
          d &&
            (sV.on(
              "touchstart",
              r,
              function t(e) {
                var r = e.targetTouches ? e.targetTouches[0] : e;
                (D = r.pageX), (y = r.pageY);
              },
              { passive: !0 }
            ),
            sV.on(
              "touchmove",
              r,
              function t(e) {
                var r = e.targetTouches ? e.targetTouches[0] : e;
                (_ = (r.pageX - D) * o),
                  (v = (r.pageY - y) * o),
                  (D = r.pageX),
                  (y = r.pageY),
                  x(e);
              },
              { passive: !0 }
            )),
          $ &&
            sV.on("keydown", document, function t(e) {
              if ("INPUT" !== document.activeElement.nodeName) {
                switch (((_ = v = 0), e.keyCode)) {
                  case 38:
                    v = h;
                    break;
                  case 40:
                    v = -h;
                    break;
                  case 37:
                    _ = h;
                    break;
                  case 39:
                    _ = -h;
                    break;
                  case 32:
                    v = (window.innerHeight - 40) * (e.shiftKey ? 1 : -1);
                    break;
                  default:
                    return;
                }
                x(e);
              }
            });
      })(),
        sV.on("vs", function (t) {
          var e = t.dY,
            r = t.dX;
          oi.locked || sV.emit("scroll", { y: -1 * e, x: r });
        }),
        (function () {
          var t,
            e,
            r,
            n = 0,
            i = 0,
            s = 0,
            o = null,
            a = {
              move: os ? "touchmove" : "mousemove",
              down: os ? "touchstart" : "mousedown",
              up: os ? "touchend" : "mouseup",
            };
          function u(t) {
            (n = t.changedTouches ? t.changedTouches[0].clientX : t.clientX),
              (i = t.changedTouches
                ? t.changedTouches[0].clientY
                : t.clientY),
              (o = t.target);
          }
          (t = a.move),
            (e = a.down),
            (r = a.up),
            sV.on(t, window, function t(e) {
              u(e), sV.emit("mousemove", { x: n, y: i, target: o, e: e });
            }),
            sV.on(e, window, function t(e) {
              u(e), (s = n), sV.emit("mousedown", { x: n, y: i, target: o });
            }),
            sV.on(r, window, function t(e) {
              u(e),
                sV.emit("mouseup", {
                  x: n,
                  y: i,
                  target: o,
                  click: 10 > Math.abs(n - s),
                });
            });
        })(),
        (function () {
          function t() {
            var t = window.innerWidth;
            (oh && t === ou.ww) ||
              ((ou.ww = t),
              (ou.wh = window.innerHeight),
              (ol.isSmall = window.matchMedia("(max-width: 649px)").matches),
              (ol.isPortrait = window.matchMedia(
                "(orientation: portrait)"
              ).matches),
              e(),
              sV.emit("resize"));
          }
          function e() {
            document.documentElement.style.setProperty(
              "--vh",
              "".concat(ou.wh / 100, "px")
            );
          }
          e(),
            sV.on("resize", window, oa()(t, 200)),
            sV.on("orientationchange", window, t);
        })(),
        (function () {
          var t = { tY: 0, cY: 0, ease: 0.2 };
          function e() {
            t.tY = nk.utils.clamp(0, of.maxScroll, t.tY);
          }
          function r() {
            (t.cY = t.tY = 0), iZ.refresh();
          }
          iZ.defaults({ scroller: oc.body }),
            iZ.scrollerProxy(oc.body, {
              scrollTop: function () {
                return t.cY;
              },
              scrollLeft: function () {
                return t.cY;
              },
              getBoundingClientRect: function () {
                return { top: 0, left: 0, width: of.ww, height: of.wh };
              },
            }),
            nk.ticker.fps(-1),
            nk.ticker.add(function e(r) {
              (t.cY += (t.tY - t.cY) * t.ease),
                (t.cY = Math.round(100 * t.cY) / 100),
                iZ.update(),
                sV.emit("tick", { cY: t.cY, time: r });
            }),
            sV.on("resize:on-reset", function n() {
              var i = t.tY;
              r(), e(), (t.cY = t.tY = i);
            }),
            sV.on("scroll", function r(n) {
              var i = n.y;
              op.locked || ((t.tY += i), op.infiniteScroll || e());
            }),
            sV.on("scroll:to", function e(r) {
              var n = r.currentTarget;
              if (n) {
                var i = qs(n.dataset.to);
                if (i) {
                  var s = i.offsetTop;
                  nk.to(t, {
                    tY: s > 0 ? s : i.parentNode.offsetTop,
                    ease: "power1.in",
                    duration: 0.5,
                  });
                }
              }
            }),
            sV.on("scroll:on-reset", r);
        })();
      var l5 = function () {
          var t = nk.parseEase(),
            e = function (t) {
              return function (e) {
                var r = 0.5 + e / 2;
                return function (e) {
                  return t(2 * (1 - e) * e * r + e * e);
                };
              };
            };
          for (var r in t) t[r].config || (t[r].config = e(t[r]));
        },
        l7 = sJ.features,
        lL = sJ.dom;
      "scrollRestoration" in history &&
        (history.scrollRestoration = "manual"),
        l7.hasSmoothScroll && lL.body.classList.add("is-smooth");
      var lR = new ((function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && lO(t, e);
        })(a, t);
        var e,
          r,
          n,
          i,
          s,
          o =
            ((e = a),
            (r = (function () {
              if (
                "undefined" == typeof Reflect ||
                !Reflect.construct ||
                Reflect.construct.sham
              )
                return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                n = lB(e);
              if (r) {
                var i = lB(this).constructor;
                t = Reflect.construct(n, arguments, i);
              } else t = n.apply(this, arguments);
              return (function t(e, r) {
                if (r && ("object" === lP(r) || "function" == typeof r))
                  return r;
                if (void 0 !== r)
                  throw TypeError(
                    "Derived constructors may only return object or undefined"
                  );
                return (function (t) {
                  if (void 0 === t)
                    throw ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return t;
                })(e);
              })(this, t);
            });
        function a() {
          var t;
          return (
            (function (t, e) {
              if (!(t instanceof e))
                throw TypeError("Cannot call a class as a function");
            })(this, a),
            (t = o.call(this, {
              renderers: {
                home: uw,
                case: uP,
                about: u7,
                archive: uI,
                protected: uG,
                default: u_,
              },
              transitions: {
                default: ll,
                contextual: { case: ly, nextCase: l6 },
              },
            })),
            l5(),
            t
          );
        }
        return (
          (n = a),
          (i = [
            {
              key: "navigate",
              value: function (t) {
                (sJ.dom.lastClicked = t.currentTarget),
                  lk(lB(a.prototype), "navigate", this).call(this, t);
              },
            },
          ]),
          l2(n.prototype, i),
          s && l2(n, s),
          a
        );
      })(h.Core))();
    },
    862: function (t, e) {
      var r, n, i, s;
      function o(t) {
        return (o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      (s = function (t) {
        "use strict";
        var e,
          r,
          n,
          i =
            /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/,
          s = /(?:\r|\n|\t\t)/g,
          a = /(?:\s\s+)/g,
          u = function (t) {
            return r.getComputedStyle(t);
          },
          l = Array.isArray,
          h = [].slice,
          c = function (t, r) {
            var n;
            return l(t)
              ? t
              : "string" === (n = o(t)) && !r && t
              ? h.call(e.querySelectorAll(t), 0)
              : t && "object" === n && "length" in t
              ? h.call(t, 0)
              : t
              ? [t]
              : [];
          },
          f = function (t) {
            return "absolute" === t.position || !0 === t.absolute;
          },
          p = function (t, e) {
            for (var r, n = e.length; --n > -1; )
              if (((r = e[n]), t.substr(0, r.length) === r)) return r.length;
          },
          d = function (t, e) {
            void 0 === t && (t = "");
            var r = ~t.indexOf("++"),
              n = 1;
            return (
              r && (t = t.split("++").join("")),
              function () {
                return (
                  "<" +
                  e +
                  " style='position:relative;display:inline-block;'" +
                  (t ? " class='" + t + (r ? n++ : "") + "'>" : ">")
                );
              }
            );
          },
          $ = function t(e, r, n) {
            var i = e.nodeType;
            if (1 === i || 9 === i || 11 === i)
              for (e = e.firstChild; e; e = e.nextSibling) t(e, r, n);
            else
              (3 !== i && 4 !== i) ||
                (e.nodeValue = e.nodeValue.split(r).join(n));
          },
          g = function (t, e) {
            for (var r = e.length; --r > -1; ) t.push(e[r]);
          },
          m = function (t, e, r) {
            for (var n; t && t !== e; ) {
              if ((n = t._next || t.nextSibling))
                return n.textContent.charAt(0) === r;
              t = t.parentNode || t._parent;
            }
          },
          _ = function t(e) {
            var r,
              n,
              i = c(e.childNodes),
              s = i.length;
            for (r = 0; r < s; r++)
              (n = i[r])._isSplit
                ? t(n)
                : (r && 3 === n.previousSibling.nodeType
                    ? (n.previousSibling.nodeValue +=
                        3 === n.nodeType
                          ? n.nodeValue
                          : n.firstChild.nodeValue)
                    : 3 !== n.nodeType && e.insertBefore(n.firstChild, n),
                  e.removeChild(n));
          },
          v = function (t, e) {
            return parseFloat(e[t]) || 0;
          },
          D = function (t, r, n, i, s, o, a) {
            var l,
              h,
              c,
              p,
              d,
              D,
              y,
              x,
              b,
              w,
              E,
              C,
              F = u(t),
              T = v("paddingLeft", F),
              A = -999,
              S = v("borderBottomWidth", F) + v("borderTopWidth", F),
              P = v("borderLeftWidth", F) + v("borderRightWidth", F),
              k = v("paddingTop", F) + v("paddingBottom", F),
              O = v("paddingLeft", F) + v("paddingRight", F),
              B = 0.2 * v("fontSize", F),
              L = F.textAlign,
              R = [],
              M = [],
              z = [],
              N = r.wordDelimiter || " ",
              I = r.tag ? r.tag : r.span ? "span" : "div",
              j = r.type || r.split || "chars,words,lines",
              U = s && ~j.indexOf("lines") ? [] : null,
              Y = ~j.indexOf("words"),
              X = ~j.indexOf("chars"),
              q = f(r),
              V = r.linesClass,
              G = ~(V || "").indexOf("++"),
              W = [];
            for (
              G && (V = V.split("++").join("")),
                c = (h = t.getElementsByTagName("*")).length,
                d = [],
                l = 0;
              l < c;
              l++
            )
              d[l] = h[l];
            if (U || q)
              for (l = 0; l < c; l++)
                ((D = (p = d[l]).parentNode === t) || q || (X && !Y)) &&
                  ((C = p.offsetTop),
                  U &&
                    D &&
                    Math.abs(C - A) > B &&
                    ("BR" !== p.nodeName || 0 === l) &&
                    ((y = []), U.push(y), (A = C)),
                  q &&
                    ((p._x = p.offsetLeft),
                    (p._y = C),
                    (p._w = p.offsetWidth),
                    (p._h = p.offsetHeight)),
                  U &&
                    (((p._isSplit && D) ||
                      (!X && D) ||
                      (Y && D) ||
                      (!Y &&
                        p.parentNode.parentNode === t &&
                        !p.parentNode._isSplit)) &&
                      (y.push(p),
                      (p._x -= T),
                      m(p, t, N) && (p._wordEnd = !0)),
                    "BR" === p.nodeName &&
                      ((p.nextSibling && "BR" === p.nextSibling.nodeName) ||
                        0 === l) &&
                      U.push([])));
            for (l = 0; l < c; l++)
              (D = (p = d[l]).parentNode === t),
                "BR" !== p.nodeName
                  ? (q &&
                      ((b = p.style),
                      Y ||
                        D ||
                        ((p._x += p.parentNode._x),
                        (p._y += p.parentNode._y)),
                      (b.left = p._x + "px"),
                      (b.top = p._y + "px"),
                      (b.position = "absolute"),
                      (b.display = "block"),
                      (b.width = p._w + 1 + "px"),
                      (b.height = p._h + "px")),
                    !Y && X
                      ? p._isSplit
                        ? ((p._next = p.nextSibling),
                          p.parentNode.appendChild(p))
                        : p.parentNode._isSplit
                        ? ((p._parent = p.parentNode),
                          !p.previousSibling &&
                            p.firstChild &&
                            (p.firstChild._isFirst = !0),
                          p.nextSibling &&
                            " " === p.nextSibling.textContent &&
                            !p.nextSibling.nextSibling &&
                            W.push(p.nextSibling),
                          (p._next =
                            p.nextSibling && p.nextSibling._isFirst
                              ? null
                              : p.nextSibling),
                          p.parentNode.removeChild(p),
                          d.splice(l--, 1),
                          c--)
                        : D ||
                          ((C = !p.nextSibling && m(p.parentNode, t, N)),
                          p.parentNode._parent &&
                            p.parentNode._parent.appendChild(p),
                          C &&
                            p.parentNode.appendChild(e.createTextNode(" ")),
                          "span" === I && (p.style.display = "inline"),
                          R.push(p))
                      : p.parentNode._isSplit &&
                        !p._isSplit &&
                        "" !== p.innerHTML
                      ? M.push(p)
                      : X &&
                        !p._isSplit &&
                        ("span" === I && (p.style.display = "inline"),
                        R.push(p)))
                  : U || q
                  ? (p.parentNode && p.parentNode.removeChild(p),
                    d.splice(l--, 1),
                    c--)
                  : Y || t.appendChild(p);
            for (l = W.length; --l > -1; ) W[l].parentNode.removeChild(W[l]);
            if (U) {
              for (
                q &&
                  ((w = e.createElement(I)),
                  t.appendChild(w),
                  (E = w.offsetWidth + "px"),
                  (C = w.offsetParent === t ? 0 : t.offsetLeft),
                  t.removeChild(w)),
                  b = t.style.cssText,
                  t.style.cssText = "display:none;";
                t.firstChild;

              )
                t.removeChild(t.firstChild);
              for (
                x = " " === N && (!q || (!Y && !X)), l = 0;
                l < U.length;
                l++
              ) {
                for (
                  y = U[l],
                    (w = e.createElement(I)).style.cssText =
                      "display:block;text-align:" +
                      L +
                      ";position:" +
                      (q ? "absolute;" : "relative;"),
                    V && (w.className = V + (G ? l + 1 : "")),
                    z.push(w),
                    c = y.length,
                    h = 0;
                  h < c;
                  h++
                )
                  "BR" !== y[h].nodeName &&
                    ((p = y[h]),
                    w.appendChild(p),
                    x && p._wordEnd && w.appendChild(e.createTextNode(" ")),
                    q &&
                      (0 === h &&
                        ((w.style.top = p._y + "px"),
                        (w.style.left = T + C + "px")),
                      (p.style.top = "0px"),
                      C && (p.style.left = p._x - C + "px")));
                0 === c
                  ? (w.innerHTML = "&nbsp;")
                  : Y || X || (_(w), $(w, "\xa0", " ")),
                  q && ((w.style.width = E), (w.style.height = p._h + "px")),
                  t.appendChild(w);
              }
              t.style.cssText = b;
            }
            q &&
              (a > t.clientHeight &&
                ((t.style.height = a - k + "px"),
                t.clientHeight < a && (t.style.height = a + S + "px")),
              o > t.clientWidth &&
                ((t.style.width = o - O + "px"),
                t.clientWidth < o && (t.style.width = o + P + "px"))),
              g(n, R),
              Y && g(i, M),
              g(s, z);
          },
          y = function (t, r, n, o) {
            var u,
              l,
              h,
              c,
              d,
              g,
              m,
              _,
              v = r.tag ? r.tag : r.span ? "span" : "div",
              D = ~(r.type || r.split || "chars,words,lines").indexOf(
                "chars"
              ),
              y = f(r),
              x = r.wordDelimiter || " ",
              b = " " !== x ? "" : y ? "&#173; " : " ",
              w = "</" + v + ">",
              E = 1,
              C = r.specialChars
                ? "function" == typeof r.specialChars
                  ? r.specialChars
                  : p
                : null,
              F = e.createElement("div"),
              T = t.parentNode;
            for (
              T.insertBefore(F, t),
                F.textContent = t.nodeValue,
                T.removeChild(t),
                m =
                  -1 !==
                  (u = (function t(e) {
                    var r = e.nodeType,
                      n = "";
                    if (1 === r || 9 === r || 11 === r) {
                      if ("string" == typeof e.textContent)
                        return e.textContent;
                      for (e = e.firstChild; e; e = e.nextSibling) n += t(e);
                    } else if (3 === r || 4 === r) return e.nodeValue;
                    return n;
                  })((t = F))).indexOf("<"),
                !1 !== r.reduceWhiteSpace &&
                  (u = u.replace(a, " ").replace(s, "")),
                m && (u = u.split("<").join("{{LT}}")),
                d = u.length,
                l = (" " === u.charAt(0) ? b : "") + n(),
                h = 0;
              h < d;
              h++
            )
              if (
                ((g = u.charAt(h)), C && (_ = C(u.substr(h), r.specialChars)))
              )
                (g = u.substr(h, _ || 1)),
                  (l += D && " " !== g ? o() + g + "</" + v + ">" : g),
                  (h += _ - 1);
              else if (g === x && u.charAt(h - 1) !== x && h) {
                for (l += E ? w : "", E = 0; u.charAt(h + 1) === x; )
                  (l += b), h++;
                h === d - 1
                  ? (l += b)
                  : ")" !== u.charAt(h + 1) && ((l += b + n()), (E = 1));
              } else
                "{" === g && "{{LT}}" === u.substr(h, 6)
                  ? ((l += D ? o() + "{{LT}}</" + v + ">" : "{{LT}}"),
                    (h += 5))
                  : (g.charCodeAt(0) >= 55296 && 56319 >= g.charCodeAt(0)) ||
                    (u.charCodeAt(h + 1) >= 65024 &&
                      65039 >= u.charCodeAt(h + 1))
                  ? ((c =
                      ((u.substr(h, 12).split(i) || [])[1] || "").length ||
                      2),
                    (l +=
                      D && " " !== g
                        ? o() + u.substr(h, c) + "</" + v + ">"
                        : u.substr(h, c)),
                    (h += c - 1))
                  : (l += D && " " !== g ? o() + g + "</" + v + ">" : g);
            (t.outerHTML = l + (E ? w : "")), m && $(T, "{{LT}}", "<");
          },
          x = function t(e, r, n, i) {
            var s,
              o,
              a = c(e.childNodes),
              l = a.length,
              h = f(r);
            if (3 !== e.nodeType || l > 1) {
              for (r.absolute = !1, s = 0; s < l; s++)
                (3 !== (o = a[s]).nodeType || /\S+/.test(o.nodeValue)) &&
                  (h &&
                    3 !== o.nodeType &&
                    "inline" === u(o).display &&
                    ((o.style.display = "inline-block"),
                    (o.style.position = "relative")),
                  (o._isSplit = !0),
                  t(o, r, n, i));
              return (r.absolute = h), void (e._isSplit = !0);
            }
            y(e, r, n, i);
          },
          b = (function () {
            function t(t, i) {
              n || ((e = document), (r = window), (n = 1)),
                (this.elements = c(t)),
                (this.chars = []),
                (this.words = []),
                (this.lines = []),
                (this._originals = []),
                (this.vars = i || {}),
                this.split(i);
            }
            var i = t.prototype;
            return (
              (i.split = function (t) {
                this.isSplit && this.revert(),
                  (this.vars = t = t || this.vars),
                  (this._originals.length =
                    this.chars.length =
                    this.words.length =
                    this.lines.length =
                      0);
                for (
                  var e,
                    r,
                    n,
                    i = this.elements.length,
                    s = t.tag ? t.tag : t.span ? "span" : "div",
                    o = d(t.wordsClass, s),
                    a = d(t.charsClass, s);
                  --i > -1;

                )
                  (n = this.elements[i]),
                    (this._originals[i] = n.innerHTML),
                    (e = n.clientHeight),
                    (r = n.clientWidth),
                    x(n, t, o, a),
                    D(n, t, this.chars, this.words, this.lines, r, e);
                return (
                  this.chars.reverse(),
                  this.words.reverse(),
                  this.lines.reverse(),
                  (this.isSplit = !0),
                  this
                );
              }),
              (i.revert = function () {
                var t = this._originals;
                if (!t) throw "revert() call wasn't scoped properly.";
                return (
                  this.elements.forEach(function (e, r) {
                    return (e.innerHTML = t[r]);
                  }),
                  (this.chars = []),
                  (this.words = []),
                  (this.lines = []),
                  (this.isSplit = !1),
                  this
                );
              }),
              (t.create = function (e, r) {
                return new t(e, r);
              }),
              t
            );
          })();
        (b.version = "3.0.0"),
          (t.SplitText = b),
          (t.default = b),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
        "object" === o(e)
          ? s(e)
          : ((n = [e]),
            void 0 ===
              (i = "function" == typeof (r = s) ? r.apply(e, n) : r) ||
              (t.exports = i));
    },
    198(t, e, r) {
      var n = /^\s+|\s+$/g,
        i = /^[-+]0x[0-9a-f]+$/i,
        s = /^0b[01]+$/i,
        o = /^0o[0-7]+$/i,
        a = parseInt,
        u = "object" == typeof r.g && r.g && r.g.Object === Object && r.g,
        l = "object" == typeof self && self && self.Object === Object && self,
        h = u || l || Function("return this")(),
        c = Object.prototype.toString,
        f = Math.max,
        p = Math.min,
        d = function () {
          return h.Date.now();
        };
      function $(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e);
      }
      function g(t) {
        if ("number" == typeof t) return t;
        if (
          "symbol" == typeof (e = t) ||
          ((r = e) && "object" == typeof r && "[object Symbol]" == c.call(e))
        )
          return NaN;
        if ($(t)) {
          var e,
            r,
            u = "function" == typeof t.valueOf ? t.valueOf() : t;
          t = $(u) ? u + "" : u;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(n, "");
        var l = s.test(t);
        return l || o.test(t)
          ? a(t.slice(2), l ? 2 : 8)
          : i.test(t)
          ? NaN
          : +t;
      }
      t.exports = function (t, e, r) {
        var n,
          i,
          s,
          o,
          a,
          u,
          l = 0,
          h = !1,
          c = !1,
          m = !0;
        if ("function" != typeof t) throw TypeError("Expected a function");
        function _(e) {
          var r = n,
            s = i;
          return (n = i = void 0), (l = e), (o = t.apply(s, r));
        }
        function v(t) {
          var r = t - u;
          return void 0 === u || r >= e || r < 0 || (c && t - l >= s);
        }
        function D() {
          var t,
            r,
            n = d();
          if (v(n)) return y(n);
          a = setTimeout(
            D,
            ((r = e - ((t = n) - u)), c ? p(r, s - (t - l)) : r)
          );
        }
        function y(t) {
          return (a = void 0), m && n ? _(t) : ((n = i = void 0), o);
        }
        function x() {
          var t,
            r = d(),
            s = v(r);
          if (((n = arguments), (i = this), (u = r), s)) {
            if (void 0 === a)
              return (l = t = u), (a = setTimeout(D, e)), h ? _(t) : o;
            if (c) return (a = setTimeout(D, e)), _(u);
          }
          return void 0 === a && (a = setTimeout(D, e)), o;
        }
        return (
          (e = g(e) || 0),
          $(r) &&
            ((h = !!r.leading),
            (s = (c = "maxWait" in r) ? f(g(r.maxWait) || 0, e) : s),
            (m = "trailing" in r ? !!r.trailing : m)),
          (x.cancel = function () {
            void 0 !== a && clearTimeout(a),
              (l = 0),
              (n = u = i = a = void 0);
          }),
          (x.flush = function () {
            return void 0 === a ? o : y(d());
          }),
          x
        );
      };
    },
    248(t) {
      var e = (function (t) {
        "use strict";
        var e,
          r = Object.prototype,
          n = r.hasOwnProperty,
          i = "function" == typeof Symbol ? Symbol : {},
          s = i.iterator || "@@iterator",
          o = i.asyncIterator || "@@asyncIterator",
          a = i.toStringTag || "@@toStringTag";
        function u(t, e, r) {
          return (
            Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          u({}, "");
        } catch (l) {
          u = function (t, e, r) {
            return (t[e] = r);
          };
        }
        function h(t, e, r, n) {
          var i,
            s,
            o,
            a,
            u = Object.create(
              (e && e.prototype instanceof m ? e : m).prototype
            ),
            l = new A(n || []);
          return (
            (u._invoke =
              ((i = t),
              (s = r),
              (o = l),
              (a = f),
              function (t, e) {
                if (a === d) throw Error("Generator is already running");
                if (a === $) {
                  if ("throw" === t) throw e;
                  return P();
                }
                for (o.method = t, o.arg = e; ; ) {
                  var r = o.delegate;
                  if (r) {
                    var n = C(r, o);
                    if (n) {
                      if (n === g) continue;
                      return n;
                    }
                  }
                  if ("next" === o.method) o.sent = o._sent = o.arg;
                  else if ("throw" === o.method) {
                    if (a === f) throw ((a = $), o.arg);
                    o.dispatchException(o.arg);
                  } else "return" === o.method && o.abrupt("return", o.arg);
                  a = d;
                  var u = c(i, s, o);
                  if ("normal" === u.type) {
                    if (((a = o.done ? $ : p), u.arg === g)) continue;
                    return { value: u.arg, done: o.done };
                  }
                  "throw" === u.type &&
                    ((a = $), (o.method = "throw"), (o.arg = u.arg));
                }
              })),
            u
          );
        }
        function c(t, e, r) {
          try {
            return { type: "normal", arg: t.call(e, r) };
          } catch (n) {
            return { type: "throw", arg: n };
          }
        }
        t.wrap = h;
        var f = "suspendedStart",
          p = "suspendedYield",
          d = "executing",
          $ = "completed",
          g = {};
        function m() {}
        function _() {}
        function v() {}
        var D = {};
        u(D, s, function () {
          return this;
        });
        var y = Object.getPrototypeOf,
          x = y && y(y(S([])));
        x && x !== r && n.call(x, s) && (D = x);
        var b = (v.prototype = m.prototype = Object.create(D));
        function w(t) {
          ["next", "throw", "return"].forEach(function (e) {
            u(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function E(t, e) {
          var r;
          this._invoke = function (i, s) {
            function o() {
              return new e(function (r, o) {
                !(function r(i, s, o, a) {
                  var u = c(t[i], t, s);
                  if ("throw" !== u.type) {
                    var l = u.arg,
                      h = l.value;
                    return h && "object" == typeof h && n.call(h, "__await")
                      ? e.resolve(h.__await).then(
                          function (t) {
                            r("next", t, o, a);
                          },
                          function (t) {
                            r("throw", t, o, a);
                          }
                        )
                      : e.resolve(h).then(
                          function (t) {
                            (l.value = t), o(l);
                          },
                          function (t) {
                            return r("throw", t, o, a);
                          }
                        );
                  }
                  a(u.arg);
                })(i, s, r, o);
              });
            }
            return (r = r ? r.then(o, o) : o());
          };
        }
        function C(t, r) {
          var n = t.iterator[r.method];
          if (n === e) {
            if (((r.delegate = null), "throw" === r.method)) {
              if (
                t.iterator.return &&
                ((r.method = "return"),
                (r.arg = e),
                C(t, r),
                "throw" === r.method)
              )
                return g;
              (r.method = "throw"),
                (r.arg = TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return g;
          }
          var i = c(n, t.iterator, r.arg);
          if ("throw" === i.type)
            return (
              (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), g
            );
          var s = i.arg;
          return s
            ? s.done
              ? ((r[t.resultName] = s.value),
                (r.next = t.nextLoc),
                "return" !== r.method && ((r.method = "next"), (r.arg = e)),
                (r.delegate = null),
                g)
              : s
            : ((r.method = "throw"),
              (r.arg = TypeError("iterator result is not an object")),
              (r.delegate = null),
              g);
        }
        function F(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function T(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function A(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(F, this),
            this.reset(!0);
        }
        function S(t) {
          if (t) {
            var r = t[s];
            if (r) return r.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var i = -1,
                o = function r() {
                  for (; ++i < t.length; )
                    if (n.call(t, i))
                      return (r.value = t[i]), (r.done = !1), r;
                  return (r.value = e), (r.done = !0), r;
                };
              return (o.next = o);
            }
          }
          return { next: P };
        }
        function P() {
          return { value: e, done: !0 };
        }
        return (
          (_.prototype = v),
          u(b, "constructor", v),
          u(v, "constructor", _),
          (_.displayName = u(v, a, "GeneratorFunction")),
          (t.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === _ || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (t.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, v)
                : ((t.__proto__ = v), u(t, a, "GeneratorFunction")),
              (t.prototype = Object.create(b)),
              t
            );
          }),
          (t.awrap = function (t) {
            return { __await: t };
          }),
          w(E.prototype),
          u(E.prototype, o, function () {
            return this;
          }),
          (t.AsyncIterator = E),
          (t.async = function (e, r, n, i, s) {
            void 0 === s && (s = Promise);
            var o = new E(h(e, r, n, i), s);
            return t.isGeneratorFunction(r)
              ? o
              : o.next().then(function (t) {
                  return t.done ? t.value : o.next();
                });
          }),
          w(b),
          u(b, a, "Generator"),
          u(b, s, function () {
            return this;
          }),
          u(b, "toString", function () {
            return "[object Generator]";
          }),
          (t.keys = function (t) {
            var e = [];
            for (var r in t) e.push(r);
            return (
              e.reverse(),
              function r() {
                for (; e.length; ) {
                  var n = e.pop();
                  if (n in t) return (r.value = n), (r.done = !1), r;
                }
                return (r.done = !0), r;
              }
            );
          }),
          (t.values = S),
          (A.prototype = {
            constructor: A,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = e),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = e),
                this.tryEntries.forEach(T),
                !t)
              )
                for (var r in this)
                  "t" === r.charAt(0) &&
                    n.call(this, r) &&
                    !isNaN(+r.slice(1)) &&
                    (this[r] = e);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var r = this;
              function i(n, i) {
                return (
                  (a.type = "throw"),
                  (a.arg = t),
                  (r.next = n),
                  i && ((r.method = "next"), (r.arg = e)),
                  !!i
                );
              }
              for (var s = this.tryEntries.length - 1; s >= 0; --s) {
                var o = this.tryEntries[s],
                  a = o.completion;
                if ("root" === o.tryLoc) return i("end");
                if (o.tryLoc <= this.prev) {
                  var u = n.call(o, "catchLoc"),
                    l = n.call(o, "finallyLoc");
                  if (u && l) {
                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                  } else if (u) {
                    if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                  } else {
                    if (!l)
                      throw Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var i = this.tryEntries[r];
                if (
                  i.tryLoc <= this.prev &&
                  n.call(i, "finallyLoc") &&
                  this.prev < i.finallyLoc
                ) {
                  var s = i;
                  break;
                }
              }
              s &&
                ("break" === t || "continue" === t) &&
                s.tryLoc <= e &&
                e <= s.finallyLoc &&
                (s = null);
              var o = s ? s.completion : {};
              return (
                (o.type = t),
                (o.arg = e),
                s
                  ? ((this.method = "next"), (this.next = s.finallyLoc), g)
                  : this.complete(o)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                g
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t)
                  return this.complete(r.completion, r.afterLoc), T(r), g;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.tryLoc === t) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var i = n.arg;
                    T(r);
                  }
                  return i;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function (t, r, n) {
              return (
                (this.delegate = {
                  iterator: S(t),
                  resultName: r,
                  nextLoc: n,
                }),
                "next" === this.method && (this.arg = e),
                g
              );
            },
          }),
          t
        );
      })(t.exports);
      try {
        regeneratorRuntime = e;
      } catch (r) {
        "object" == typeof globalThis
          ? (globalThis.regeneratorRuntime = e)
          : Function("r", "regeneratorRuntime = r")(e);
      }
    },
  },
  e = {};
function r(n) {
  var i = e[n];
  if (void 0 !== i) return i.exports;
  var s = (e[n] = { exports: {} });
  return t[n].call(s.exports, s, s.exports, r), s.exports;
}
(r.n = (t) => {
  var e = t && t.__esModule ? () => t.default : () => t;
  return r.d(e, { a: e }), e;
}),
  (r.d = (t, e) => {
    for (var n in e)
      r.o(e, n) &&
        !r.o(t, n) &&
        Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
  }),
  (r.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
  (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
  r(248),
  r(924);
})();