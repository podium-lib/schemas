'use strict';

const { uriFormat } = require('./utils');

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
        content: { ...uriFormat, minLength: 1 },
        fallback: { ...uriFormat, default: '' },
        assets: {
            type: 'object',
            properties: {
                css: { ...uriFormat, default: '' },
                js: { ...uriFormat, default: '' },
            },
            default: { css: '', js: '' },
        },
        proxy: {
            type: 'object',
            default: {},
            maxProperties: 4,
            patternProperties: { '.*': uriFormat },
        },
        team: { type: 'string', default: '' },
    },
    required: ['name', 'version', 'content'],
};
