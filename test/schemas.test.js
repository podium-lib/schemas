'use strict';

const Joi = require('joi');
const { responseSchema, metadataSchema } = require('../');

test('responseSchema smoketest 1', () => {
    const obj = {};
    const res = Joi.validate(obj, responseSchema);
    expect(res.error.isJoi).toBe(true);
});

test('responseSchema smoketest 2', () => {
    const obj = {};
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeTruthy();
    expect(res.error.isJoi).toBe(true);
});

test('responseSchema smoketest 3', () => {
    const obj = {
        id: 'lol',
        version: 'lal',
    };
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeTruthy();
    expect(res.error.isJoi).toBe(true);
});

test('responseSchema smoketest 4', () => {
    const obj = {
        id: 'lol',
        version: 'lal',
        hash: 'lal',
        data: { html: 'asdf' },
    };
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeFalsy();
});

test('responseSchema smoketest 5', () => {
    const obj = {
        id: 'lol',
        version: 'lal',
        data: {},
    };
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeTruthy();
});

test('allow maxDataAge and maxAge', () => {
    const obj = {
        id: 'lol',
        version: 'lal',
        hash: 'lal',
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
    expect(res.error).toBeFalsy();
});

test('reject maxDataAge when above maxAge', () => {
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
    expect(res.error).toBeTruthy();
});

test('accept arguments key to fallbacks', () => {
    const obj = {
        fallbacks: {
            sup: {
                html: '<h1>Sup</h1>',
            },
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    expect(res.error).toBeFalsy();
});

test('accept empty arguments key to fallbacks', () => {
    const obj = {
        fallbacks: {
            default: {
                html: '<h1>Sup</h1>',
            },
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    expect(res.error).toBeFalsy();
});

test('enforce content in fallback', () => {
    const obj = {
        fallbacks: {
            default: {},
        },
        maxAge: 60,
    };
    const res = Joi.validate(obj, metadataSchema);
    expect(res.error).toBeTruthy();
});
