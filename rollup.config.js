import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser"
export default {
  input: 'lib/vue-custom-hooks/index.js',
  output: {
  	name: 'vue-custom-hooks',
    file: 'lib/vue-custom-hooks.js',
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