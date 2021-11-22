#!/user/bin/env node

const webpack = require('webpack');
const minimist = require('minimist');
const builtInWebpackConfig = require('../webpack.config');
const args

webpack(builtInWebpackConfig, (err, stats) => {
    if (err || stats.hasErrors) {
        return console.log('build failed.');
    }

    console.log('build success')
})