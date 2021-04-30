// const path = require('path');
// module.exports={
//     entry:'./lib/vue-custom-hooks/index.js',
//     output: {
// 	    filename: 'vue-custom-hooks.js',
// 	    libraryTarget: 'umd',
// 	    library: 'vue-custom-hooks',
// 	    path: path.resolve(__dirname, 'lib/')
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loader: "babel-loader",
// 				include: [
// 		          path.resolve('lib/vue-custom-hooks/index.js'),
// 		        ],
// 			}
// 		]
// 	}
// }
import babel from 'rollup-plugin-babel';
// rollup.config.js
export default {
  input: 'lib/vue-custom-hooks/index.js',
  output: {
  	name: 'vue-custom-hooks',
    file: 'lib/vue-custom-hooks.js',
    format: 'umd',
  },
  plugins: [
  	babel({
  		babelrc: false,
        include: 'lib/vue-custom-hooks/**',
    }),
  ]
};