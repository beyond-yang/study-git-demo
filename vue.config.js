// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('./package');

const port = 8086; // dev port

function resolve(dir) {
  return path.join(__dirname, dir);
}

/**
 * 判断是否是生产环境
 * @returns {boolean}
 */
function isProd() {
  return process.env.NODE_ENV === 'production';
}
// 图片公用地址前缀，请配置成微应用部署在三方服务器的完整根地址
const publicPath = isProd() ? `http://10.100.245.116:8076/${name}/` : `http://localhost:${port}`;

module.exports = {
  devServer: {
    host: 'localhost',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  publicPath, // 其中name为项目名称
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap: false,
  // 自定义webpack配置
  configureWebpack: (config) => {
    // 生产环境
    if (isProd()) {
      // 去除 console
      Object.assign(
        config.optimization.minimizer[0].options.terserOptions.compress, {
          drop_console: true,
        },
      );
    }

    return {
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
      output: {
        // 把子应用打包成 umd 库格式
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${name}`,
      },
      externals: {},
      plugins: [],
    };
  },
  chainWebpack: (config) => {
    config.module.rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      })
      .end();
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      });
  },
  // 可全局引用element的变量
  css: {
    loaderOptions: {
      sass: {
      },
    },
  },
};
