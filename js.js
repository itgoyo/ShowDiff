+ (function(t, e) {
    var s = e.body,
    a = e.querySelector.bind(e),
    n = e.querySelectorAll.bind(e),
    o = a("html"),
    c = a("#gotop"),
    l = a("#menu"),
    r = a("#header"),
    d = a("#mask"),
    h = a("#menu-toggle"),
    f = a("#menu-off"),
    u = a("#loading"),
    v = t.requestAnimationFrame,
    m = 12,
    g = Array.prototype.forEach,
    L = "ontouchstart" in t && /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent) ? "touchstart": "click",
    p = /micromessenger/i.test(navigator.userAgent),
    w = function() {},
    y = function(t) {
        var e = t.offsetLeft,
        i = t.offsetTop;
        if (t.offsetParent) {
            var s = arguments.callee(t.offsetParent);
            e += s.x,
            i += s.y
        }
        return {
            x: e,
            y: i
        }
    },
    $ = navigator.userAgent.match(/firefox/i) || navigator.msPointerEnabled ? e.documentElement: s,
    x = {
        goTop: function(t) {
            var e = $.scrollTop,
            i = arguments.length > 2 ? arguments[1] : Math.abs(e - t) / m;
            e && e > t ? ($.scrollTop = Math.max(e - i, 0), v(arguments.callee.bind(this, t, i))) : t && e < t ? ($.scrollTop = Math.min(e + i, t), v(arguments.callee.bind(this, t, i))) : this.toc.actived(t)
        },
        toggleGotop: function(e) {
            e > t.innerHeight / 2 ? c.classList.add("in") : c.classList.remove("in")
        },
        toggleMenu: function(e) {
            var i = a("#main");
            if (e) {
                if (l.classList.remove("hide"), t.innerWidth < 1241) if (d.classList.add("in"), l.classList.add("show"), p) {
                    var s = $.scrollTop;
                    i.classList.add("lock"),
                    i.scrollTop = s
                } else o.classList.add("lock")
            } else if (l.classList.remove("show"), d.classList.remove("in"), p) {
                var s = i.scrollTop;
                i.classList.remove("lock"),
                $.scrollTop = s
            } else o.classList.remove("lock")
        },
        fixedHeader: function(t) {
            t > r.clientHeight ? r.classList.add("fixed") : r.classList.remove("fixed")
        },
        toc: function() {
            var t = a("#post-toc");
            if (!t || !t.children.length) return {
                fixed: w,
                actived: w
            };
            var e = a(".post-header").clientHeight,
            s = r.clientHeight,
            n = a("#post-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
            return t.querySelector('a[href="#' + n[0].id + '"]').parentNode.classList.add("active"),
            {
                fixed: function(i) {
                    i >= e - s ? t.classList.add("fixed") : t.classList.remove("fixed")
                },
                actived: function(e) {
                    for (i = 0, len = n.length; i < len; i++) if (e > y(n[i]).y - s - 5) {
                        t.querySelector("li.active").classList.remove("active");
                        var a = t.querySelector('a[href="#' + n[i].id + '"]').parentNode;
                        a.classList.add("active")
                    }
                    e < y(n[0]).y && (t.querySelector("li.active").classList.remove("active"), t.querySelector('a[href="#' + n[0].id + '"]').parentNode.classList.add("active"))
                }
            }
        } (),
        hideOnMask: [],
        modal: function(t) {
            this.$modal = a(t),
            this.$off = this.$modal.querySelector(".close");
            var e = this;
            this.show = function() {
                d.classList.add("in"),
                e.$modal.classList.add("ready"),
                setTimeout(function() {
                    e.$modal.classList.add("in")
                },
                0)
            },
            this.onHide = w,
            this.hide = function() {
                e.onHide(),
                d.classList.remove("in"),
                e.$modal.classList.remove("in"),
                setTimeout(function() {
                    e.$modal.classList.remove("ready")
                },
                300)
            },
            this.toggle = function() {
                return e.$modal.classList.contains("in") ? e.hide() : e.show()
            },
            x.hideOnMask.push(this.hide),
            this.$off && this.$off.addEventListener(L, this.hide)
        },
        share: function() {
            var t = a("#pageShare"),
            i = a("#shareFab"),
            s = new this.modal("#globalShare");
            a("#menuShare").addEventListener(L, s.toggle),
            i && (i.addEventListener(L,
            function() {
                t.classList.toggle("in")
            },
            !1), e.addEventListener(L,
            function(e) { ! i.contains(e.target) && t.classList.remove("in")
            },
            !1));
            var o = new this.modal("#wxShare");
            o.onHide = s.hide,
            g.call(n(".wxFab"),
            function(t) {
                t.addEventListener(L, o.toggle)
            })
        },
        search: function() {
            function t() {
                e.classList.toggle("in")
            }
            var e = a("#search-wrap");
            a("#search").addEventListener(L, t)
        },
        reward: function() {
            var t = new this.modal("#reward");
            a("#rewardBtn").addEventListener(L, t.toggle);
            var e = a("#rewardToggle"),
            i = a("#rewardCode");
            e && e.addEventListener("change",
            function() {
                i.src = this.checked ? this.dataset.alipay: this.dataset.wechat
            })
        },
        waterfall: function() {
            t.innerWidth < 760 || g.call(n(".waterfall"),
            function(t) {
                var e = t.querySelectorAll(".waterfall-item"),
                i = [0, 0];
                g.call(e,
                function(t) {
                    var e = i[0] <= i[1] ? 0 : 1;
                    t.style.cssText = "top:" + i[e] + "px;left:" + (e > 0 ? "50%": 0),
                    i[e] += t.offsetHeight
                }),
                t.style.height = Math.max(i[0], i[1]) + "px",
                t.classList.add("in")
            })
        },
        tabBar: function(t) {
            t.parentNode.parentNode.classList.toggle("expand")
        },
        page: function() {
            var t = n(".fade, .fade-scale"),
            e = !1;
            return {
                loaded: function() {
                    g.call(t,
                    function(t) {
                        t.classList.add("in")
                    }),
                    e = !0
                },
                unload: function() {
                    g.call(t,
                    function(t) {
                        t.classList.remove("in")
                    }),
                    e = !1
                },
                visible: e
            }
        } (),
        lightbox: function() {
            function i(i) {
                this.$img = i.querySelector("img"),
                this.$overlay = i.querySelector("overlay"),
                this.margin = 40,
                this.title = this.$img.title || this.$img.alt || "",
                this.isZoom = !1;
                var a, n, o, c, l;
                this.calcRect = function() {
                    c = s.clientWidth,
                    l = s.clientHeight;
                    var t = l - 2 * this.margin,
                    e = a,
                    i = n,
                    r = (this.margin, e > c ? c / e: 1),
                    d = i > t ? t / i: 1,
                    h = Math.min(r, d);
                    return e *= h,
                    i *= h,
                    {
                        w: e,
                        h: i,
                        t: (l - i) / 2 - o.top,
                        l: (c - e) / 2 - o.left + this.$img.offsetLeft
                    }
                },
                this.setImgRect = function(t) {
                    this.$img.style.cssText = "width: " + t.w + "px; max-width: " + t.w + "px; height:" + t.h + "px; top: " + t.t + "px; left: " + t.l + "px"
                },
                this.setFrom = function() {
                    this.setImgRect({
                        w: o.width,
                        h: o.height,
                        t: 0,
                        l: (i.offsetWidth - o.width) / 2
                    })
                },
                this.setTo = function() {
                    this.setImgRect(this.calcRect())
                },
                this.addTitle = function() {
                    this.title && (this.$caption = e.createElement("div"), this.$caption.innerHTML = this.title, this.$caption.className = "overlay-title", i.appendChild(this.$caption))
                },
                this.removeTitle = function() {
                    this.$caption && i.removeChild(this.$caption)
                };
                var r = this;
                this.zoomIn = function() {
                    a = this.$img.naturalWidth || this.$img.width,
                    n = this.$img.naturalHeight || this.$img.height,
                    o = this.$img.getBoundingClientRect(),
                    i.style.height = o.height + "px",
                    i.classList.add("ready"),
                    this.setFrom(),
                    this.addTitle(),
                    this.$img.classList.add("zoom-in"),
                    setTimeout(function() {
                        i.classList.add("active"),
                        r.setTo(),
                        r.isZoom = !0
                    },
                    0)
                },
                this.zoomOut = function() {
                    this.isZoom = !1,
                    i.classList.remove("active"),
                    this.$img.classList.add("zoom-in"),
                    this.setFrom(),
                    setTimeout(function() {
                        r.$img.classList.remove("zoom-in"),
                        r.$img.style.cssText = "",
                        r.removeTitle(),
                        i.classList.remove("ready"),
                        i.removeAttribute("style")
                    },
                    300)
                },
                i.addEventListener("click",
                function(t) {
                    r.isZoom ? r.zoomOut() : "IMG" === t.target.tagName && r.zoomIn()
                }),
                e.addEventListener("scroll",
                function() {
                    r.isZoom && r.zoomOut()
                }),
                t.addEventListener("resize",
                function() {
                    r.isZoom && r.zoomOut()
                })
            }
            g.call(n(".img-lightbox"),
            function(t) {
                new i(t)
            })
        } (),
        loadScript: function(t) {
            t.forEach(function(t) {
                var i = e.createElement("script");
                i.src = t,
                i.async = !0,
                s.appendChild(i)
            })
        }
    };
    t.addEventListener("load",
    function() {
        u.classList.remove("active"),
        x.page.loaded(),
        t.lazyScripts && t.lazyScripts.length && x.loadScript(t.lazyScripts)
    }),
    t.addEventListener("DOMContentLoaded",
    function() {
        x.waterfall();
        var t = $.scrollTop;
        x.toc.fixed(t),
        x.toc.actived(t),
        x.page.loaded()
    });
    var E = !1;
    a('a[href^="mailto"]').addEventListener(L,
    function() {
        E = !0
    }),
    t.addEventListener("beforeunload",
    function(t) {
        E ? E = !1 : x.page.unload()
    }),
    t.addEventListener("pageshow",
    function() { ! x.page.visible && x.page.loaded()
    }),
    t.addEventListener("resize",
    function() {
        t.BLOG.even = L = "ontouchstart" in t ? "touchstart": "click",
        x.toggleMenu(),
        x.waterfall()
    }),
    c.addEventListener(L,
    function() {
        v(x.goTop.bind(x, 0))
    },
    !1),
    h.addEventListener(L,
    function(t) {
        x.toggleMenu(!0),
        t.preventDefault()
    },
    !1),
    f.addEventListener(L,
    function() {
        l.classList.add("hide")
    },
    !1),
    d.addEventListener(L,
    function(t) {
        x.toggleMenu(),
        x.hideOnMask.forEach(function(t) {
            t()
        }),
        t.preventDefault()
    },
    !1),
    e.addEventListener("scroll",
    function() {
        var t = $.scrollTop;
        x.toggleGotop(t),
        x.fixedHeader(t),
        x.toc.fixed(t),
        x.toc.actived(t)
    },
    !1),
    t.BLOG.SHARE && x.share(),
    t.BLOG.REWARD && x.reward(),
    x.noop = w,
    x.even = L,
    x.$ = a,
    x.$$ = n,
    Object.keys(x).reduce(function(t, e) {
        return t[e] = x[e],
        t
    },
    t.BLOG),
    t.Waves ? (Waves.init(), Waves.attach(".global-share li", ["waves-block"]), Waves.attach(".article-tag-list-link, #page-nav a, #page-nav span", ["waves-button"])) : console.error("Waves loading failed.")
})(window, document);
