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
        // 🔎 Debug:
        minify: false,          // ne tömörítsen (így nem lesz bo/ae/ar)
        sourcemap: true,        // külön .map fájl
        // vagy: sourcemap: 'inline'  // a .map beágyazva a bundle végébe
        esbuild: {
            keepNames: true,      // őrizze meg a függvényneveket a stack trace-ben
        },
        rollupOptions: {
            // Ha csak vanilla JS a három fájl, nem kell külön resolve/commonjs
            plugins: [
                babel({
                    babelHelpers: 'bundled',
                    presets: [
                        ['@babel/preset-env', {
                            targets: 'IE 11',
                            // useBuiltIns: 'usage',
                            // corejs: 3,
                            bugfixes: true,
                            modules: false,
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