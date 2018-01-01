$(document).ready(function () {
    $.connection.hub.url = window.messaging.url + 'signalr';
    var testHub = $.connection.testHub;

    testHub.client.showCount = function (count) {
        console.log('clients connected: ' + count);
    }

    $.connection.hub.start().done(function () {
        
    });
});