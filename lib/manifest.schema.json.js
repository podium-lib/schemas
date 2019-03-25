'use strict';

// @TODO refactor back to .json once the url pattern handling is figured out

// /*
// Use the url pattern that joi have generated for us until now, the other default patterns (uri, uri-template, uri-reference and url don't pass all the tests)
const Uri = require('joi/lib/types/string/uri');

const urlFormat = { pattern: Uri.createUriRegex('http|https', true).source };
// */

// Other alternatives, from ajv: https://github.com/epoberezkin/ajv/blob/d10720734d806fd25606dafd47b64e97ee7d1e7d/lib/compile/formats.js#L39-L42
// const urlFormat = {format: 'uri'}; // 20 tests fail
// const urlFormat = {format: 'uri-reference'}; // 3 tests fail
// const urlFormat = {format: 'url'}; // 20 tests fail

module.exports = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    additionalProperties: false,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            pattern: '^[a-zA-Z0-9_-]*$',
        },
        version: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1, ...urlFormat },
        fallback: { type: 'string', default: '', ...urlFormat },
        assets: {
            type: 'object',
            properties: {
                css: { type: 'string', default: '', ...urlFormat },
                js: { type: 'string', default: '', ...urlFormat },
            },
            default: { css: '', js: '' },
        },
        proxy: {
            type: 'object',
            default: {},
            maxProperties: 4,
            patternProperties: {
                '.*': {
                    type: 'string',
                    ...urlFormat,
                },
            },
        },
        team: { type: 'string', default: '' },
    },
    required: ['name', 'version', 'content'],
};
