let fs = require('fs');

fs.copyFile('before/browser/SplashScreenProxy.js', 'platforms/browser/platform_www/plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js', err => {
    if(err) throw err;
});
