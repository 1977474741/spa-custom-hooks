import { babel } from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify"
export default {
  input: 'lib/vue-custom-hooks/index.js',
  output: {
  	name: 'vue-custom-hooks',
    file: 'lib/vue-custom-hooks.js',
    format: 'umd',
  },
  plugins: [
	  babel({
      // presets: [
      //   ['@babel/preset-env',
      //   {
      //     "modules": false,
      //     "useBuiltIns": "entry",
      //   }]
      // ]
    }),
	  uglify()
  ],
};