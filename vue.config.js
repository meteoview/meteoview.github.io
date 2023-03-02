const { defineConfig } = require('@vue/cli-service')

module.exports = module.exports = {
	devServer: {
		port: 80
	},
	publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
};
