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
        rollupOptions: {
            // Ha csak vanilla JS a három fájl, nem kell külön resolve/commonjs
            plugins: [
                babel({
                    babelHelpers: 'bundled',
                    presets: [
                        ['@babel/preset-env', {
                            targets: 'IE 11',
                            useBuiltIns: 'usage',
                            corejs: 3
                        }]
                    ]
                })
            ],
            output: {
                extend: true, // ha már létezne window.Pod, ne írja felül
            }
        }
    }
});