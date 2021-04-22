export default {
    input: 'lib/validate.js',
    external: [
        'ajv-formats',
        'find-up',
        'ajv',
        'fs',
    ],
    output: [
        {
            exports: 'auto',
            format: 'cjs',
            dir: 'dist/cjs/',
            preserveModules: true,
        },
        {
            exports: 'auto',
            format: 'esm',
            dir: 'dist/esm/',
            preserveModules: true,
        },
    ],
};
