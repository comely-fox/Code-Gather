/**
 * config Object
 * ## 每个属性对应一个任务
 *
 * server => browser.js
 * clean => clean.js
 * css => css.js
 * js => script.js
 * html => pages.js
 * image => image.js
 * copy => copy.js
 */

const output = 'dist'
const isDevMode = process.env.NODE_ENV === 'development'
const config = {
  mode: {
    is_dev: isDevMode,
    is_pro: !isDevMode
  },
  output, // 文件输出目录
  server: {
    // enabled: boolean 开启服务器
    enabled: isDevMode,

    // baseDir: string 服务器根目录
    baseDir: output,

    // project: string
    // 可指定一个项目. 如要服务所有项目， 因设置 "directory: true" 、 "project: ''"
    project: '',

    // 是否已目录形式浏览
    directory: true,

    // 手动指定端口
    port: 80,

    // 是否自动打开浏览器
    open: true,

    // 监控哪些文件类型
    watchType: ['css', 'js', 'html', 'htm'],

    // 已何种浏览器打开, 如为空， 则使用默认浏览器打开
    browser: ['chrome']
  },
  clean: {
    // dir: string[]
    dir: [output]
  },
  css: {
    // css所在的父文件夹
    dir: ['styles', 'style', 'css'],
    src() {
      return this.dir.map((v) => `src/**/${v}/**/*.@(scss|css)`)
    },
    exclude: []
  },
  js: {
    // js所在的前辈文件夹
    dir: ['scripts', 'scripts', 'js'],
    src() {
      return this.dir.map((v) => `src/**/${v}/**/*.js`)
    },
    // 排除掉不需要加工的js文件
    exclude: ['jquery', 'require', 'swiper', 'layer', 'bigpicture', 'widgets']
  },
  html: {
    src() {
      return [''].map(() => 'src/**/*.@(html|htm|ico)')
    },
    redress: ['pages']
  },
  image: {
    dir: ['images'],
    src() {
      return this.dir.map((v) => `src/**/${v}/**/*.@(jpe?g|png|gif|svg|bmp)`)
    }
  },
  copy: {
    // 将需要拷贝的文件夹拷贝到输出目录
    dir: ['assets', 'font', 'images', 'mobile', 'theme'],
    src() {
      return this.dir.map((v) => `src/**/${v}/**/*`)
    }
  }
}

module.exports = config
