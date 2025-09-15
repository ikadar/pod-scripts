// vite.config.js
import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/pod-prince.js',
            name: 'Pod',
            formats: ['iife'],
            fileName: () => 'pod.bundle.js',
        },
        // helpful while debugging
        minify: false,
        sourcemap: true,
        esbuild: { keepNames: true },
        // ALSO tell esbuild to aim at ES5 just in case:
        target: 'es5',
        rollupOptions: {
            plugins: [
                babel({
                    // ensure Babel runs on your source files
                    extensions: ['.js'],
                    include: ['src/**/*'],
                    exclude: /node_modules/,
                    babelHelpers: 'bundled',
                    // no polyfills (Prince hates many core-js shims)
                    presets: [
                        ['@babel/preset-env', {
                            targets: 'ie 11',
                            bugfixes: true,
                            modules: false,
                            // IMPORTANT: no useBuiltIns/corejs
                        }]
                    ],
                    // explicitly include a few transforms that matter for Prince:
                    plugins: [
                        '@babel/plugin-transform-shorthand-properties',
                        '@babel/plugin-transform-destructuring',
                        '@babel/plugin-transform-parameters',
                        '@babel/plugin-transform-spread',
                        '@babel/plugin-transform-arrow-functions',
                        '@babel/plugin-transform-classes',
                    ]
                })
            ],
            output: {
                extend: true,
            }
        }
    }
});