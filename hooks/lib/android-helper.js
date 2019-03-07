var utilities = require('./utilities');

module.exports = {

    addLambdaToGradle: function () {
        utilities.readBuildGradle()
            .then((buildGradle) => {
                buildGradle = buildGradle.replace(/\n\/\/ lambda Plugin - Start lambda Build Tools[\s\S]*\/\/ lambda Plugin - End lambda Build Tools\n/, '');
                buildGradle = buildGradle.replace(/\n\/\/ lambda Plugin - Start lambda Build Tools[\s\S]*\/\/ lambda Plugin - End lambda Build Tools/, '');
                return Promise.resolve(buildGradle);
            })
            .then((buildGradle) => {
                buildGradle += [
                    '',
                    '// lambda Plugin - Start lambda Build Tools ',
                    '',
                    'android {',
                    '    compileOptions {',
                    '        incremental true',
                    '        sourceCompatibility JavaVersion.VERSION_1_8',
                    '        targetCompatibility JavaVersion.VERSION_1_8',
                    '    }',
                    '}',
                    '',
                    'buildscript {',
                    '    repositories {',
                    '        mavenCentral()',
                    '    }',
                    '    dependencies {',
                    '        classpath "me.tatarka:gradle-retrolambda:3.7.0"',
                    '    }',
                    '}',
                    '',
                    'apply plugin: "me.tatarka.retrolambda"',
                    '// lambda Plugin - End lambda Build Tools'
                ].join('\n');
                return utilities.writeBuildGradle(buildGradle);
            })
            .then(() => {
                console.log('> add lambda to build.gradle and saved!');
            });
    },

    removeLambdaFromGradle: function () {
        utilities.readBuildGradle()
            .then((buildGradle) => {
                buildGradle = buildGradle.replace(/\n\/\/ lambda Plugin - Start lambda Build Tools[\s\S]*\/\/ lambda Plugin - End lambda Build Tools\n/, '');
                buildGradle = buildGradle.replace(/\n\/\/ lambda Plugin - Start lambda Build Tools[\s\S]*\/\/ lambda Plugin - End lambda Build Tools/, '');
                return utilities.writeBuildGradle(buildGradle);
            })
            .then(() => {
                console.log('> remove lambda from build.gradle and saved!');
            });
    }
};
