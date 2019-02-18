module.exports = {
  devServer: {
    proxy: {
      '/api': {
        //接口地址
        target: 'http://fuck.u/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // '^/api': 'api'  //通过pathRewrite重写地址，将前缀/api转为/
        }
      },
      '/upload-files': {
        //接口地址
        target: 'http://www.51renc.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // '^/upload-files': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    }
  }
}