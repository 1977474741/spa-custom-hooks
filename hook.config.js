const path = require('path');
module.exports={
    entry:'./lib/vue-custom-hooks/index.js',
    output: {
	    filename: 'vue-custom-hooks.js',
	    libraryTarget: 'umd',
	    library: 'vue-custom-hooks',
	    path: path.resolve(__dirname, 'lib/')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				include: [
		          path.resolve('lib/vue-custom-hooks/'),
		        ],
			}
		]
	}
}