'use strict';

const test = require('ava');
const Joi = require('joi');
const { contextSchema, responseSchema, metadataSchema } = require('../');

test('responseSchema smoketest 1', t => {
    const obj = {};
    const res = Joi.validate(obj, responseSchema);
    t.true(res.error.isJoi);
});

test('responseSchema smoketest 2', t => {
    const obj = {};
    const res = Joi.validate(obj, responseSchema);
    t.truthy(res.error, 'error property is set');
    t.true(res.error.isJoi, 'object declares itself as joi error');
});

test('responseSchema smoketest 3', t => {
    const obj = {
        id: 'lol',
        version: 'lal',
    };
    const res = Joi.validate(obj, responseSchema);
    t.truthy(res.error, 'error property is set');
    t.true(res.error.isJoi, 'object declares itself as joi error');
});

test('responseSchema smoketest 4', t => {
    const obj = {
        id: 'lol',
        version: 'lal',
        data: { html: 'asdf' },
    };
    const res = Joi.validate(obj, responseSchema);
    t.falsy(res.error, 'error property is not set');
});

test('responseSchema smoketest 5', t => {
    const obj = {
        id: 'lol',
        version: 'lal',
        data: {},
    };
    const res = Joi.validate(obj, responseSchema);
    t.truthy(res.error, 'error is set');
});

test('allow maxDataAge and maxAge', t => {
    const obj = {
        id: 'lol',
        version: 'lal',
        data: {
            html: 'tralla',
        },
        metadata: {
            fallbacks: {
                default: { html: 'manifest fallback' },
            },
            maxDataAge: 10,
            maxAge: 20,
        },
    };
    const res = Joi.validate(obj, responseSchema);
    t.falsy(res.error, 'error is not set');
});

test('reject maxDataAge when above maxAge', t => {
    const obj = {
        id: 'lol',
        version: 'lal',
        data: {
            html: 'tralla',
        },
        metadata: {
            maxDataAge: 30,
            maxAge: 20,
        },
    };
    const res = Joi.validate(obj, responseSchema);
    t.truthy(res.error, 'error is set');
});

test('accept arguments key to fallbacks', t => {
    const obj = {
        fallbacks: {
            sup: {
                html: '<h1>Sup</h1>',
            },
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    t.falsy(res.error, 'error is not set');
});

test('accept empty arguments key to fallbacks', t => {
    const obj = {
        fallbacks: {
            default: {
                html: '<h1>Sup</h1>',
            },
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    t.falsy(res.error, 'error is not set');
});

test('enforce content in fallback', t => {
    const obj = {
        fallbacks: {
            default: {},
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    t.truthy(res.error, 'error is set');
});

test('should be valid context schema', t => {
    const obj = {
        domain: 'finn.no',
        baseUrl: 'https://www.finn.no',
        deviceType: 'mobile',
    };
    const res = Joi.validate(obj, contextSchema);
    t.falsy(res.error, 'error is not set');
});
