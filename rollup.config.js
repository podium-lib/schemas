export default {
    input: 'lib/validate.js',
    external: [
        'ajv-formats',
        'ajv',
        'path',
        'url',
        'fs',
    ],
    output: [
        {
            exports: 'auto',
            format: 'cjs',
            dir: 'dist/cjs/src/',
            preserveModules: true,
        },
        {
            exports: 'auto',
            format: 'esm',
            dir: 'dist/esm/src/',
            preserveModules: true,
        },
    ],
};
