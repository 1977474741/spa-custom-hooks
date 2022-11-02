import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser"
export default {
  input: 'lib/spa-custom-hooks/index.js',
  output: {
  	name: 'spa-custom-hooks',
    file: 'lib/spa-custom-hooks.js',
    format: 'umd',
  },
  plugins: [
	  babel(),
	  terser({
      compress:{
        pure_funcs: ['console.log'],

      }
    })
  ]
};