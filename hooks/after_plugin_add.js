
var androidHelper = require('./lib/android-helper');

module.exports = function(context) {
    var platforms = context.opts.cordova.platforms;

    // Modify the Gradle build file to add a task that will upload the debug symbols
    // at build time.
    if (platforms.indexOf('android') !== -1) {
        androidHelper.removeLambdaFromGradle();
        androidHelper.addLambdaToGradle();
    }
};
