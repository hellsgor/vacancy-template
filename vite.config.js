import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { fileURLToPath } from 'url'
import { resolve } from 'path'
import path from 'node:path';
import glob from "glob";
import { splitVendorChunkPlugin } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    target: ['es2015'],
    // modulePreload: {
    //     polyfill: false,
    // },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    root: resolve(__dirname, 'src'),
    server: {
        port: 8080,
        hot: true,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/components'),
        }),
        ViteImageOptimizer({
            png: {
                quality: 75,
            },
            jpeg: {
                quality: 75,
            },
            jpg: {
                quality: 75,
            },
            tiff: {
                quality: 75,
            },
        }),
    ],
    build: {
        minify: false,
        outDir: '../dist2',
        emptyOutDir: true,
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync('src/**/*.html').map(file => [
                    // This remove `src/` as well as the file extension from each
                    // file, so e.g. src/nested/foo.js becomes nested/foo
                    path.relative(
                        'src',
                        file.slice(0, file.length - path.extname(file).length)
                    ),
                    // This expands the relative paths to absolute paths, so e.g.
                    // src/nested/foo becomes /project/src/nested/foo.js
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                compact: true,
                assetFileNames: (assetInfo) => {
                    var info = assetInfo.name.split(".");
                    var extType = info[info.length - 1];
                    if (/jpg|jpeg|svg|gif|tiff|png|ico/i.test(extType)) {
                        extType = "img";
                    } else if (/woff|woff2/.test(extType)) {
                        extType = "css";
                    }
                    return `static/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
            }
        },
    },
})