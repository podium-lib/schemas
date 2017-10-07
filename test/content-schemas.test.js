'use strict';

const Joi = require('joi');
const { contentSchema } = require('../');

test('assetUris: works when no asset URIs', () => {
    const obj = {
        html: 'asdf',
    };

    expect(() => Joi.attempt(obj, contentSchema)).not.toThrowError();
});

test('assetUris: breaks if empty list of asset URIs', () => {
    const obj = {
        html: 'asdf',
        assetUris: [],
    };
    const res = Joi.validate(obj, contentSchema);
    expect(res.error).toBeTruthy();
    expect(res.error.isJoi).toBe(true);
});

test('assetUris: breaks when malformed URI', () => {
    const obj = {
        html: 'asdf',
        assetUris: ['lofoo'],
    };
    const res = Joi.validate(obj, contentSchema);
    expect(res.error).toBeTruthy();
    expect(res.error.isJoi).toBe(true);
});

test('assetUris: works with single URI', () => {
    const obj = {
        html: 'asdf',
        assetUris: ['http://cdn.example.org'],
    };
    const res = Joi.validate(obj, contentSchema);
    expect(res.error).toBeFalsy();
});

test('assetUris: works with multiple URIs', () => {
    const obj = {
        html: 'asdf',
        assetUris: ['http://cdn.example.org/1', 'http://cdn.example.org/2'],
    };
    const res = Joi.validate(obj, contentSchema);
    expect(res.error).toBeFalsy();
});
