var script = document.createElement('script');
script.onload = function () {
    fbInboxFillPage('https://www.facebook.com/trangtindulichvietnam/','https://facebookinbox-omni-onapp.haravan.com/facebookinbox/static/images/fb-icon-1.png','#e24fc5','#ffffff','#ffffff','0','Trò Chuyện Trực Tuyến',true,true),facebookShowPanelButton();
};
script.src = "https://facebookinbox-omni-onapp.haravan.com/facebookinbox/static/javascripts/fb-box.js?v=1574404765042";
document.getElementsByTagName('head')[0].appendChild(script);