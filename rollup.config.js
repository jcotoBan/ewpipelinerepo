import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "src/main.js",

    external: [
        'create-response',
        'http-request',
        'cookies',
        'text-encode-transform',
        'url-search-params',
        'streams',
        'log',
        'resolvable'
    ],

    preserveModules: false,

    output: {
        dir: "dist",
        format: "es"
    },

    plugins: [
        commonjs(),
        resolve()
    ]
};