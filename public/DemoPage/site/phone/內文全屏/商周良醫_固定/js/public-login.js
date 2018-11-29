// iframe 會員登入
// 先記錄視窗寬高，開啟會員登入燈箱時，送高度給iframe
var w_height = $(window).height();
var targetUrl = "https://member.businessweekly.com.tw";

function iframeLogin() {
    var $btn = $('.js-iframe-login');
    var returnUrl = ''; // 從哪一頁開啟燈箱
    var isSocial = null; // 有true或false就移掉網址的socailmember
    var memberUrl = "";//導頁的目標網址
    var loginType = "login";//登入框內容
    var sitetype = ""; //視窗樣式
    //returnUrl拿掉socailmember
    function GetOriginUrl() {
        var url = location.href.split('socailmember')[0];
        return url.substring(0, url.length - 1);
    }
    function openIframe() {
        // iframe css
        $('head').append('' +
            '<style>' +
            '#iframe-login {' +
            'z-index: 1003;' +
            'width: 100%;' +
            'height: 100%;' +
            'overflow: hidden;' +
            'top: 0;' +
            'right: 0;' +
            'bottom: 0;' +
            'left: 0;' +
            '}' +
            '#iframe-login iframe {' +
            'overflow: hidden;' +
            'width: 100%;' +
            'width: 100vw;' +
            'height: 100%;' +
            '}' +
            'body {' +
            'width: 100%;' +
            '}' +
            '</style>' +
            '');

        if ($('html.safari10').length > 0 || $('html.safari9') > 0) {
            $('head').append('' +
                '<style>' +
                '#iframe-login {' +
                'position: absolute;' +
                '}' +
                '</style>' +
                '');
        } else {
            $('head').append('' +
                '<style>' +
                '#iframe-login {' +
                'position: fixed;' +
                '}' +
                '</style>' +
                '');
        }

        $btn.on('click', function (e) {
            e.preventDefault();
            //loginType = e.target.dataset.type === "register" ? "register" : "login";
            switch (e.target.dataset.type) {
                case "register":
                    loginType = "1";
                    break;
                case "sub-login":
                    loginType = "2";
                    break;
                default:
                    loginType = "0";
                    break;
            }
            sitetype = e.target.dataset.sitetype;
            // 收起漢堡導覽列，解知識庫的bug
            $('html, body').removeClass('-burger-fixed');
            $('#wrap, .footer-wrap').removeClass('-black-bg');
            $('#burger-nav').removeClass('-show');
            //*** 判斷iframe網址
            var href = window.location.search.substring(1); // 抓網址的所有參數

            // 有socailmember，isSocial改為true
            if (href.indexOf('socailmember') > -1) isSocial = true;
            
            var aryRemove = ["socailmember", "socailurl"];
            if (isSocial !== null) {
                returnUrl = GetOriginUrl();
                memberUrl = window.location.search.split('socailurl=')[1];
            }
            else {
                returnUrl = this.dataset.url || location.href;
                var email = this.dataset.email || "";
                var pwd = this.dataset.pwd || "";
                var rurl = this.dataset.rurl || "";
                if (email != "" && pwd != "" && rurl != "") {
                    memberUrl = '/Account/LoginAuto?email=' + email + '&pwd=' + pwd + '&rurl=' + rurl + '&sitetype=' + sitetype;
                }
            }
            // iframe的網址
            var iframe_href = function () {
                if (memberUrl != "") {
                    return targetUrl + memberUrl;
                }
                //return targetUrl + '/Account/Login?returnUrl=' + returnUrl + '&isLogin=' + isLogin;
                return targetUrl + '/Account/Login?a=1&loginType=' + loginType + '&sitetype=' + sitetype + '&returnUrl=' + encodeURIComponent(returnUrl);
            };

            var t = $(window).scrollTop();
            function disScroll() {
                window.scrollTo(0, t);
            }

            if ($('#iframe-login').length <= 0) {
                $('body').prepend('' +
                    '<div id="iframe-login">' +
                    ' <form id= "ExternalLoginForm" action= "' + targetUrl + '/Account/ExternalLogin" role= "form" method= "post">' +
                    ' <input id="provider" name="provider" type="hidden" value="">' +
                    ' </form>' +
                    '<iframe frameborder="0" scrolling="no" src="' + iframe_href() + '"></iframe>' +
                    '</div>' +
                    '').css({
                        'position': 'absolute',
                        'height': w_height
                    });
                if ($(window).width() >= 480) {
                    window.addEventListener('scroll', disScroll);
                }
            }
            // 收到message時要執行的function
            function receiveMessage(e) {
                // 檢查來源網址是否正確
                if (e.origin !== targetUrl) {
                    console.log('資料來源：' + e.origin);
                    return;
                }
                else {
                    switch (e.data) {
                        // 關閉燈箱
                        case "closeModal":
                            $('#iframe-login').fadeOut(400);
                            setTimeout(function () {
                                $('#iframe-login').detach();
                                $('body').attr('style', '');
                                if ($(window).width() >= 480) {
                                    window.removeEventListener('scroll', disScroll);
                                }
                            }, 400);
                            if (window.location.href.indexOf('socailmember') > -1) {
                                window.location = GetOriginUrl();
                            }
                            break;
                        // 會員登入成功
                        case "reload":
                            window.location.reload();
                            break;
                        // 如果msg是送social的data，觸發socail的click
                        case "trigger_fb":
                            $("#provider").val('Facebook');
                            $("#ExternalLoginForm").submit();
                            break;
                        case "trigger_google":
                            $("#provider").val('Google');
                            $("#ExternalLoginForm").submit();
                            break;
                        case "reload":
                            window.location.reload();
                            break;
                        default:
                            console.log(e.data);
                            break;
                    }
                    // 如果iframe的頁面進到註冊頁或驗證頁，進行轉址
                    while (e.data[0] === 'change_url') {
                        window.location = e.data[1];
                        break;
                    }
                }
            }
            // 監聽 message 事件，收到事件時就執行 receiveMessage 這個function
            if (window.addEventListener) {
                window.addEventListener("message", receiveMessage);
            }
            else if (window.attachEvent) { // ie8
                window.attachEvent('message', receiveMessage);
                alert('ie8不支援此功能，請使用chrome或firefox瀏覽器。');
            }
        });

        // 網址有socialmember，就開啟燈箱
        if (location.href.indexOf('socailmember') > -1) {
            $btn.trigger('click');
        }
    }

    // 沒有引用bootstrap.min.js就先引用
    if ($('script[src$="bootstrap.min.js"]').length === 0 && $('script[src$="bootstrap.js"]').length === 0) {
        $('head').prepend('<link rel="stylesheet" href="https://ibw.bwnet.com.tw/assets/member/assets/vendor/modal/modal.css">');
        $.getScript('https://ibw.bwnet.com.tw/assets/member/assets/vendor/modal/modal.min.js', function () {
            openIframe();
        });
    }
    // 有引用bootstrap就直接執行
    else {
        openIframe();
    }
}

function MemberLoginOff() {
    $('#memberLogOff').prepend('' +
        '<form action="' + targetUrl + '/Account/LogOff" class="form-red" id="memberLogOffForm" method="post" role="form" style="display:none;">' +
        ' <input type="hidden" name="rurl" value="' + location.href + '">' +
        '</form>' +
        '');
    $('#memberLogOff').on('click', function () { $('#memberLogOffForm').submit() });
}
$(function () {
    iframeLogin();
    MemberLoginOff();
});
