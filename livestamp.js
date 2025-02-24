// Livestamp.js / v1.1.2 / (c) 2012 Matt Bradley / MIT License
(function (d, g) {
  var h = 1E3,
    i = !1,
    e = d([]),
    j = function (b, a) {
      var c = b.data("livestampdata");
      "number" == typeof a && (a *= 1E3);
      b.removeAttr("data-livestamp").removeData("livestamp");
      a = g(a);
      g.isMoment(a) && !isNaN(+a) && (c = d.extend({}, {
        original: b.contents()
      }, c), c.moment = g(a), b.data("livestampdata", c).empty(), e.push(b[0]))
    },
    k = function () {
      i || (f.update(), setTimeout(k, h))
    },
    f = {
      update: function () {
        d("[data-livestamp]").each(function () {
          var a = d(this);
          j(a, a.data("livestamp"))
        });
        var b = [];
        e.each(function () {
          var a = d(this),
            c = a.data("livestampdata");
          if (void 0 === c) b.push(this);
          else if (g.isMoment(c.moment)) {
            var e = a.html(),
              c = c.moment.fromNow();
            if (e != c) {
              var f = d.Event("change.livestamp");
              a.trigger(f, [e, c]);
              f.isDefaultPrevented() || a.html(c)
            }
          }
        });
        e = e.not(b)
      },
      pause: function () {
        i = !0
      },
      resume: function () {
        i = !1;
        k()
      },
      interval: function (b) {
        if (void 0 === b) return h;
        h = b
      }
    },
    l = {
      add: function (b, a) {
        "number" == typeof a && (a *= 1E3);
        a = g(a);
        g.isMoment(a) && !isNaN(+a) && (b.each(function () {
          j(d(this), a)
        }), f.update());
        return b
      },
      destroy: function (b) {
        e = e.not(b);
        b.each(function () {
          var a =
            d(this),
            c = a.data("livestampdata");
          if (void 0 === c) return b;
          a.html(c.original ? c.original : "").removeData("livestampdata")
        });
        return b
      },
      isLivestamp: function (b) {
        return void 0 !== b.data("livestampdata")
      }
    };
  d.livestamp = f;
  d(function () {
    f.resume()
  });
  d.fn.livestamp = function (b, a) {
    l[b] || (a = b, b = "add");
    return l[b](this, a)
  }
})(jQuery, moment);