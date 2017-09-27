var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('http://127.0.0.1:3000/')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .end();