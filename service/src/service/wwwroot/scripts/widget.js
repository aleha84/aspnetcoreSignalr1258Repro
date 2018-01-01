
window.messaging = {
    loaded: false,
    url: '',
    reconnect: {
        count: 20,
        timeout: 20000
    },
    init: function () {
        if (window.messaging.loaded)
            return;

        window.messaging.url = 'http://localhost:8081/';

        [
            //{ url: 'scripts/jquery.min.js', check: function () { return !window.jQuery } },
            { url: 'scripts/jquery.signalr.min.js' },
            { url: 'signalr/hubs' },
            { url: 'scripts/messaging.js?v=1.0' }
        ].forEach(function (item) {
            var isCss = item.isCss || false;
            if (item.check && !item.check()) {
                return;
            }
            var element = document.createElement(isCss ? "link" : "script");
            if (isCss) {
                element.setAttribute('href', window.messaging.url + item.url);
                element.setAttribute('media', 'all');
                element.setAttribute('rel', 'stylesheet');
                element.setAttribute('type', 'text/css');
            } else {
                element.type = "text/javascript";
                element.setAttribute('src', window.messaging.url + item.url);
                element.async = false;
            }
            element.onload = function () {
                //console.log(this);
            }
            var head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild(element);
        });

    }
}

window.messaging.init();