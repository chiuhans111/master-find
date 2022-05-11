module.exports = {

    pluginOptions: {
        electronBuilder: {
            chainWebpackMainProcess: config => {


                // Chain webpack config for electron main process only
            },
            chainWebpackRendererProcess: config => {
                // Chain webpack config for electron renderer process only
                // The following example will set IS_ELECTRON to true in your app
                config.plugin('define').tap(args => {
                    args[0]['IS_ELECTRON'] = true
                    return args
                })

                config.module.rule('js').exclude.add(/\.worker\.js$/)
                config.module
                    .rule('worker-loader')
                    .test(/\.worker\.js$/)
                    .use('worker-loader')
                    .loader('worker-loader')
                    .options({
                        // name: '[name]:[hash:8].js',
                        // inline: true,
                        // fallback: false,
                        // publicPath: '/scripts/workers/'
                    })
            },
            // Use this to change the entrypoint of your app's main process
            mainProcessFile: 'src/background.js',
            // Provide an array of files that, when changed, will recompile the main process and restart Electron
            // Your main process file will be added by default
            // mainProcessWatch: ['src/myFile1', 'src/myFile2'],
            // [1.0.0-rc.4+] Provide a list of arguments that Electron will be launched with during "electron:serve",
            // which can be accessed from the main process (src/background.js).
            // Note that it is ignored when --debug flag is used with "electron:serve", as you must launch Electron yourself
            // mainProcessArgs: ['--arg-name', 'arg-value']
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                win: {
                    target:[
                        {
                            target: "portable"
                        }
                    ]
                }
            }

        }
    },

}