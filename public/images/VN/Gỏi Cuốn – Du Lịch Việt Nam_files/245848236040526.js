window.hrfwidget = {
    appId: '363772567412181',
    pageId: '245848236040526',
    widgets: [{"id":286088,"type":"customer_chat","ref":"__hrf_w_286088"}],
    checkboxs:[],
    customer_chats:[{"id":14798,"growthtool_id":286088,"logged_in_greeting":null,"logged_out_greeting":null,"greeting_dialog_display":"hide"}],
    widgetLocale: 'vi_VN',
    fbSDKVersion: 'v3.3'
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//hstatic.net/harafunnel/widget.js?v=1.1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'hrfwidget-core'));

function confirmOptIn(id) {
        var w = hrfwidget.widgets.filter(function(a) { return a.id == id })

        if (w && w.length > 0) {
            var x = document.getElementById(id);
            var userRef = x.getAttribute('user_ref');
            FB.AppEvents.logEvent('MessengerCheckboxUserConfirmation', null, {
                'app_id': '363772567412181',
                'page_id': '245848236040526',
                'ref': w[0].ref,
                'user_ref': userRef
            });
        }
    }