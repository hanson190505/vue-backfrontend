'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        port: 8080,
        // host: "localhost",
        https: false,
        // 自动启动浏览器
        open: false,
        proxy: "http://192.168.3.45:8000"
        // proxy: {
        //     target: "http://192.168.3.45:8000", //设置调用的接口域名和端口
        //     changeOrigin: true, //是否跨域
        //     ws: true,
        // },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        },
    },
    chainWebpack(config) {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

    }
}