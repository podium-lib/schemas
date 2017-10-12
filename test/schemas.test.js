'use strict';

const Joi = require('joi');
const { responseSchema } = require('../');

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
        name: 'lol',
        version: 'lal',
    };
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeTruthy();
    expect(res.error.isJoi).toBe(true);
});

test('responseSchema smoketest 4', () => {
    const obj = {
        name: 'lol',
        version: 'lal',
        data: {},
    };
    const res = Joi.validate(obj, responseSchema);
    expect(res.error).toBeTruthy();
});
