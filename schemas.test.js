'use strict';

const test = require('ava');
const Joi = require('joi');
const { responseSchema, metadataSchema } = require('./index');

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
    t.truthy(res.error, 'error is not set');
});
