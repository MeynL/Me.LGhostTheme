! function (a) {
    var b = require("./lunr.min.js");
    a.fn.ghostHunter = function (b) {
        var c = a.extend({}, a.fn.ghostHunter.defaults, b);
        if (c.results) return d.init(this, c), d
    }, a.fn.ghostHunter.defaults = {
        resultsData: !1,
        onPageLoad: !1,
        onKeyUp: !1,
        result_template: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",
        info_template: "<p>Number of posts found: {{amount}}</p>",
        displaySearchInfo: !0,
        zeroResultsInfo: !0,
        before: !1,
        onComplete: !1,
        includepages: !1,
        filterfields: !1
    };
    var c = function (a) {
            var b = new Date(a),
                c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return b.getDate() + " " + c[b.getMonth()] + " " + b.getFullYear()
        },
        d = {
            isInit: !1,
            init: function (a, c) {
                var d = this;
                this.target = a, this.results = c.results, this.blogData = {}, this.result_template = c.result_template, this.info_template = c.info_template, this.zeroResultsInfo = c.zeroResultsInfo, this.displaySearchInfo = c.displaySearchInfo, this.before = c.before, this.onComplete = c.onComplete, this.includepages = c.includepages, this.filterfields = c.filterfields, this.index = b(function () {
                    this.field("title", {
                        boost: 10
                    }), this.field("description"), this.field("link"), this.field("markdown", {
                        boost: 5
                    }), this.field("pubDate"), this.field("tag"), this.ref("id")
                }), c.onPageLoad ? d.loadAPI() : a.focus(function () {
                    d.loadAPI()
                }), a.closest("form").submit(function (b) {
                    b.preventDefault(), d.find(a.val())
                }), c.onKeyUp && a.keyup(function () {
                    d.find(a.val())
                })
            },
            loadAPI: function () {
                if (this.isInit) return !1;
                var b = this.index,
                    d = this.blogData;
                obj = {
                    limit: "all",
                    include: "tags"
                }, this.includepages && (obj.filter = "(page:true,page:false)"), a.get(ghost.url.api("posts", obj)).done(function (a) {
                    searchData = a.posts, searchData.forEach(function (a) {
                        var e = a.tags.map(function (a) {
                            return a.name
                        });
                        null == a.meta_description && (a.meta_description = "");
                        var f = e.join(", ");
                        f.length < 1 && (f = "undefined");
                        var g = {
                            id: String(a.id),
                            title: String(a.title),
                            description: String(a.meta_description),
                            markdown: String(a.markdown),
                            pubDate: String(a.created_at),
                            tag: f,
                            link: String(a.url)
                        };
                        g.prettyPubDate = c(g.pubDate);
                        var h = c(g.pubDate);
                        b.add(g), d[a.id] = {
                            title: a.title,
                            description: a.meta_description,
                            pubDate: h,
                            link: a.url
                        }
                    })
                }), this.isInit = !0
            },
            find: function (b) {
                var c = this.index.search(b),
                    d = a(this.results),
                    e = [];
                d.empty(), this.before && this.before(), (this.zeroResultsInfo || c.length > 0) && this.displaySearchInfo && d.append(this.format(this.info_template, {
                    amount: c.length
                }));
                for (var f = 0; f < c.length; f++) {
                    var g = c[f].ref,
                        h = this.blogData[g];
                    d.append(this.format(this.result_template, h)), e.push(h)
                }
                this.onComplete && this.onComplete(e)
            },
            clear: function () {
                a(this.results).empty(), this.target.val("")
            },
            format: function (a, b) {
                return a.replace(/{{([^{}]*)}}/g, function (a, c) {
                    var d = b[c];
                    return "string" == typeof d || "number" == typeof d ? d : a
                })
            }
        }
}(jQuery);