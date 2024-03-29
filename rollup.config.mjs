import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
export default {
    input: 'lib/spa-custom-hooks/index.js',
    output: [
        {
            name: 'CustomHook',
            file: 'lib/spa-custom-hooks.js',
            format: 'cjs',
        },
        {
            name: 'CustomHook',
            file: 'lib/spa-custom-hooks.mjs',
            format: 'es',
        },
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled',
            configFile: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: ['IE >= 8'],
                    },
                ],
            ],
        }),
        terser({
            compress: {
                pure_funcs: ['console.log'],
            },
        }),
    ],
};
