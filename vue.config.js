const path = require('path')
module.exports = {
	publicPath: './',
    assetsDir: 'static',
    outputDir: 'dist',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.0.146:8080/jeecg-boot',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},
    configureWebpack:{
        resolve: {
            alias: {
               '@':path.resolve(__dirname,'src'),
               'components':path.resolve(__dirname,'src/components'),
			   'api':path.resolve(__dirname,'src/api'),
            }
          }
    }
}