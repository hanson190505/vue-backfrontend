'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const JavaScriptObfuscator = require('webpack-obfuscator')

const encryption = false; // 打包后的代码是否加密

module.exports = {
    outputDir: process.env.outputDir,
    publicPath: '/cms/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        port: 8080,
        // host: "localhost",
        https: false,
        // 自动启动浏览器
        open: false,
        // proxy: "http://192.168.3.45:8000",
        // proxy: {
        //     target: "http://192.168.3.45:8000", //设置调用的接口域名和端口
        //     changeOrigin: true, //是否跨域
        //     ws: true,
        // },
        // proxy: {
        //     '/apis': {
        //         // 测试环境
        //         target: 'http://web.juhe.cn:8080/', // 接口域名
        //         changeOrigin: true, //是否跨域
        //         ws: true,
        //     }
        // }
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

if (process.env.NODE_ENV == 'production' && encryption == false) {
    console.log('执行生产环境配置无加密----')
    module.exports = {
        publicPath: '/cms/', // //基本路径
        assetsDir: 'assets', //静态资源目录(js,css,img,fonts)这些文件都可以写里面
        productionSourceMap: false, //生产环境是否生成 sourceMap 文件，一般情况不建议打开
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

        },
    }
}


if (process.env.NODE_ENV == 'production' && encryption == true) {
    console.log('执行生产环境配置并加密代码++++')
    module.exports = {
        publicPath: '/cms', // //基本路径
        outputDir: 'dist', //打包的时候生成的一个文件名
        assetsDir: 'assets', //静态资源目录(js,css,img,fonts)这些文件都可以写里面
        productionSourceMap: false, //生产环境是否生成 sourceMap 文件，一般情况不建议打开
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

        },
        configureWebpack: {
            plugins: [
                new JavaScriptObfuscator({
                    rotateUnicodeArray: true, // 必须为true
                    compact: true, // 紧凑 从输出混淆代码中删除换行符。
                    controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。 启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
                    controlFlowFlatteningThreshold: 0.75,
                    deadCodeInjection: false, // 此选项大大增加了混淆代码的大小（最多200％） 此功能将随机的死代码块（即：不会执行的代码）添加到混淆输出中，从而使得更难以进行反向工程设计。
                    deadCodeInjectionThreshold: 0.4,
                    debugProtection: true, // 调试保护  如果您打开开发者工具，可以冻结您的浏览器。 
                    debugProtectionInterval: true, // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，这使得使用“开发人员工具”的其他功能变得更加困难。它是如何工作的？一个调用调试器的特殊代码;在整个混淆的源代码中反复插入。
                    disableConsoleOutput: true, // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
                    domainLock: [], // 锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得有人只需复制并粘贴源代码并在别处运行就变得非常困难。多个域和子域可以将代码锁定到多个域或子域。例如，要锁定它以使代码仅在www.example.com上运行添加www.example.com，以使其在example.com的任何子域上运行，请使用.example.com。
                    identifierNamesGenerator: 'hexadecimal', // 使用此选项可控制标识符（变量名称，函数名称等）的混淆方式。
                    identifiersPrefix: '', // 此选项使所有全局标识符都具有特定前缀。
                    inputFileName: '',
                    log: false,
                    renameGlobals: false, // 不要启动 通过声明启用全局变量和函数名称的混淆。 
                    reservedNames: [], // 禁用模糊处理和生成标识符，这些标识符与传递的RegExp模式匹配。例如，如果添加^ someName，则混淆器将确保以someName开头的所有变量，函数名和函数参数都不会被破坏。
                    reservedStrings: [], // 禁用字符串文字的转换，字符串文字与传递的RegExp模式匹配。例如，如果添加^ some * string，则混淆器将确保以某些字符串开头的所有字符串都不会移动到`stringArray`。
                    rotateStringArray: true, // 
                    seed: 0, // 默认情况下（seed = 0），每次混淆代码时都会得到一个新结果（即：不同的变量名，插入stringArray的不同变量等）。如果需要可重复的结果，请将种子设置为特定的整数。
                    selfDefending: false, // 此选项使输出代码能够抵抗格式化和变量重命名。如果试图在混淆代码上使用JavaScript美化器，代码将不再起作用，使得理解和修改它变得更加困难。需要紧凑代码设置。
                    sourceMap: false, // 请确保不要上传嵌入了内嵌源代码的混淆源代码，因为它包含原始源代码。源映射可以帮助您调试混淆的Java Script源代码。如果您希望或需要在生产中进行调试，可以将单独的源映射文件上载到秘密位置，然后将浏览器指向该位置。
                    sourceMapBaseUrl: '', // 这会将源的源映射嵌入到混淆代码的结果中。如果您只想在计算机上进行本地调试，则非常有用。
                    sourceMapFileName: '',
                    sourceMapMode: 'separate',
                    stringArray: true, // 将stringArray数组移位固定和随机（在代码混淆时生成）的位置。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
                    stringArrayEncoding: false, // 此选项可能会略微降低脚本速度。使用Base64或RC4对stringArray的所有字符串文字进行编码，并插入一个特殊的函数，用于在运行时将其解码回来。
                    stringArrayThreshold: 0.75, // 您可以使用此设置调整字符串文字将插入stringArray的概率（从0到1）。此设置在大型代码库中很有用，因为对stringArray函数的重复调用会降低代码的速度。
                    target: 'browser', // 您可以将混淆代码的目标环境设置为以下之一： Browser 、Browser No Eval 、Node 目前浏览器和节点的输出是相同的。
                    transformObjectKeys: false, // 转换（混淆）对象键。例如，此代码var a = {enabled：true};使用此选项进行模糊处理时，将隐藏已启用的对象键：var a = {};a [_0x2ae0 [（'0x0'）] = true;。 理想情况下与String Array设置一起使用。
                    unicodeEscapeSequence: true, // 将所有字符串转换为其unicode表示形式。例如，字符串“Hello World！”将被转换为“'\ x48 \ x65 \ x6c \ x6c \ x6f \ x20 \ x57 \ x6f \ x72 \ x6c \ x64 \ x21”。
                }, ['abc.js']) // abc.js 是不混淆的代码
            ]
        },
    }
}