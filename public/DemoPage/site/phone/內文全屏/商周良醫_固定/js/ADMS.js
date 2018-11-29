if (typeof (jQuery) == "undefined") {
    var head = document.getElementsByTagName("head").item(0), s = document.createElement("script");
    s.setAttribute("type", "text/javascript"), s.setAttribute("src", "//code.jquery.com/jquery-3.3.1.min.js"), head.appendChild(s);
    s.onload = function () { handler() };
} else {
    $(function () {
        handler();
    });
}

function handler(pid) {
    pid = pid || null;
    var retval = []
    if (pid != null) {
        panel = { pid: pid }
        retval.push(panel);
    } else {
        $('ins').each(function () {
            pid = $(this).attr('pid');
            if (typeof pid !== typeof undefined && pid !== false) {
                panel = { pid: pid }
                retval.push(panel);
                var style = $(this).attr('style') || null;
                if (null !== style) {
                    $(this).attr('style', 'text-decoration: none;' + $(this).attr('style'));
                } else {
                    $(this).attr('style', 'text-decoration: none;');
                } 
            }
        });
    }

    try {
        $.ajax({
            type: 'Post',
            url: '//admsapi.businessweekly.com.tw/api/ADMS/',
            datatype: 'json',
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                if ($("#gtm_isAD").length > 0) {
                    ADMSSetCookie("gtm_isAD", $("#gtm_isAD").val());
                } else {
                    ADMSdelCookie("gtm_isAD");
                }
                if ($("#gtm_keywords_hidden").length > 0) {
                    ADMSSetCookie("gtm_keywords_hidden", encodeURI($("#gtm_keywords_hidden").val()));
                } else {
                    ADMSdelCookie("gtm_keywords_hidden");
                }
                if ($("#adms_group_list").length > 0) {
                    ADMSSetCookie("adms_group_list", $("#adms_group_list").val());
                } else {
                    ADMSdelCookie("adms_group_list");
                }
                if ($("#gtm_siteid").length > 0) {
                    ADMSSetCookie("gtm_siteid", $("#gtm_siteid").val());
                } else {
                    ADMSdelCookie("gtm_siteid");
                }
                var AssigndatetimeParam = getUrlVar('assigndatetime');
                ADMSSetCookie("assigndatetime",AssigndatetimeParam );
                var materialid = getUrlVar('materialid');
                ADMSSetCookie("materialid", materialid);
            }, 
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(retval),
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].MaterialHtml != null) {
                        if (result[i].FrequencyAmount > 0 || result[i].FrequencyAmount == -1) {
                            if (result[i].MaterialHtml != null) {
                                var FrequencyAmount = (result[i].FrequencyAmount == -1) ? 0 : parseInt(ADMSgetCookie(result[i].ServingId)) || 0;
                                ADMSSetCookie(result[i].ServingId, FrequencyAmount + 1);
                                ADMSSetCookie(result[i].ServingId + "-T", new Date().getTime());
                            }
                        }

                        if (result[i].MaterialHtml.indexOf("@Reload") >= 0) {
                            result[i].MaterialHtml = result[i].MaterialHtml.replace("@Reload", "");
                            var head = document.getElementsByTagName("head").item(0), s = document.createElement("script");
                            s.setAttribute("type", "text/javascript"), s.setAttribute("src", "//www.businessweekly.com.tw/assets/js/jquery.idle.home.js"), head.appendChild(s);
                        }

                        result[i].MaterialHtml = processhtml(result[i].MaterialHtml);

                        html = $($.parseHTML(result[i].MaterialHtml, document, true));
                        scripts = html.filter('script');
                        if (scripts.length == 0 && result[i].MaterialHtml.indexOf("document.write") == -1) {
                            $("ins[pid='" + result[i].PanelId + "']").html(result[i].MaterialHtml);
                        } else {
                            var frame = document.createElement("iframe"),
                                defaultStyle = "margin:0;padding:0;overflow:hidden;background-color:transparent;";
                            frame.setAttribute("style", defaultStyle + "border:none;width:100%;height:100%;");
                            frame.setAttribute("scrolling", "no");
                            frame.setAttribute("class", "ADMS");
                            $("ins[pid='" + result[i].PanelId + "']").html(frame);
                            frame.contentDocument.open();
                            frame.contentDocument.write(result[i].MaterialHtml);
                            if (frame.contentDocument != null && frame.contentDocument.body) {
                                frame.contentDocument.body.setAttribute("style", defaultStyle);
                            }
                            frame.contentDocument.close();
                        }
                        $("ins[pid='" + result[i].PanelId + "']")
                            .attr("WID", result[i].WebSiteId)
                            .attr("CID", result[i].ChanelId)
                            .attr("AID", result[i].ActivityId)
                            .attr("POID", result[i].PurchaseOrderId)
                            .attr("SID", result[i].ServingId)
                            .attr("MID", result[i].MaterialId)
                            .attr("KeyWord", result[i].KeyWord)
                            .attr("SiteChannelId", result[i].SiteChannelId)
                            .attr("SiteId", result[i].SiteId);
                    }
                }
                InitScrollShowlLog();
            },
            error: function (req, err) { console.log(err); }
        });
    } catch (err) {
        console.log('Error: ' + err.message);
    }
}
function InitScrollShowlLog() {
    var scrollView = {}
    scrollView.init = function (el, h) {
        scrollView.el = $(el);
        scrollView.h = h;
        var win_h = window.innerHeight;
        scrollView.check(scrollView.el, scrollView.h, win_h);

        window.onscroll = function () {
            var sc_base =
                scrollView.check(scrollView.el, scrollView.h, win_h);
        }
        window.onresize = function () {
            win_h = window.innerHeight;
        }
    }
    scrollView.check = function (el, h, win_h) {
        el.each(function () {
            var $this = $(this)
            var thisTop = $this.offset().top;
            var thisHeight = $this.height();
            var thisPoint = thisTop + (thisHeight * h)
            var y = document.documentElement.scrollTop || document.body.scrollTop;
            var scBase = y + win_h;
            if (scBase >= thisPoint) {
                if ($this.hasClass('active') == false) {
                    $this.addClass('active');
                    scrollView.callback($this);
                }
            }
        })
    }
    scrollView.callback = function (tar) {
        // 要執行的程式放在這
        // tar 可抓取到 被捲動促發的 item 的本身，回傳為 dom

        //demo 取tar的id 塞進 count div 內
        var Wid = $(tar).attr('wid') || null;
        var Cid = $(tar).attr('cid') || null;
        var Pid = $(tar).attr('pid') || null;
        var Aid = $(tar).attr('aid') || null;
        var POid = $(tar).attr('poid') || null;
        var Sid = $(tar).attr('sid') || null;
        var Mid = $(tar).attr('mid') || null;
        var siteid = $(tar).attr('siteid') || null;
        var SiteChannelId = $(tar).attr('SiteChannelId') || null;
        var KeyWord = $(tar).attr('KeyWord') || null;
        null !== Wid && null !== Cid && null !== Pid && null !== Aid && null !== POid && null !== Sid && null !== Mid && SetImpressionReal(Wid, Cid, Pid, Aid, POid, Sid, Mid, siteid, SiteChannelId, KeyWord)

    }
    scrollView.init('ins', 1);
}
function getUrlVar(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}
function processhtml(html) {
    result = html;
    var b = /src=\"([^\"]*?)\"/gi
    var s = result.match(b)
    if (s != null && (s.indexOf("bwnet") > 0 || s.indexOf("businessweekly"))) {
        for (var i = 0; i < s.length; i++) {
            result = result.replace(s[i], s[i].replace(/\https:/g, "").replace(/\http:/g, ""))
        }
    }
    return result;
}
function ADMSSetCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.businessweekly.com.tw;path=/";;
}
function ADMSgetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;

}
function ADMSdelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = ADMSgetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function SetCwinHeight(id) {
    if ($("div#" + id + " ins iframe.ADMS").length > 0) {
        var iframeid = $("div#" + id + " ins iframe.ADMS")[0]; //iframe id
        var divid = $("div#" + id)[0];
        if (iframeid && divid) {
            if (iframeid && !window.opera) {
                if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
                    if (iframeid.contentDocument.body.offsetHeight > iframeid.height) {
                        divid.setAttribute("style", "height:" + iframeid.contentDocument.body.offsetHeight + "px");;
                    }
                } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
                    if (iframeid.Document.body.scrollHeight > iframeid.height) {
                        divid.setAttribute("style", "height:" + iframeid.contentDocument.body.offsetHeight + "px");;
                    }
                }
            }
        }
    }
}
function SetImpressionReal(Wid, Cid, Pid, Aid, POid, Sid, Mid, SiteId, SiteChannelId, KeyWord) {
    var AssigndatetimeParam = getUrlVar('assigndatetime');
    if (AssigndatetimeParam.length > 0) {
        return;
    }
    var materialid = getUrlVar('materialid');
    if (materialid.length > 0) {
        return;
    }

    var retval = {
        w: Wid,
        c: Cid,
        p: Pid,
        a: Aid,
        po: POid,
        s: Sid,
        m: Mid,
        SiteId: SiteId,
        SiteChannelId: SiteChannelId,
        KeyWord: KeyWord
    };

    try {
        $.ajax({
            type: 'Post',
            url: '//admsapi.businessweekly.com.tw/Home/SetImpressionReal/',
            datatype: 'json',
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(retval),
            error: function (req, err) {
                console.log('Error:' + err.message);
            }
        });
    } catch (err) {
        console.log('Error: ' + err.message);
    }
}