export default {
    input: 'src/validate.js',
    external: [
        'ajv-formats',
        'path',
        'url',
        'ajv',
        'fs',
    ],
    output: [
        {
            exports: 'auto',
            format: 'cjs',
            dir: 'dist/',
            preserveModules: true,
        }
    ],
};
