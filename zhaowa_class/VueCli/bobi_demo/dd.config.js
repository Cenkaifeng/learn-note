const CleanPluginForComm = require('./plugins/clean')
module.exports = {
    plugins: {
        commands: [CleanPluginForComm('hello options')]
    }
}