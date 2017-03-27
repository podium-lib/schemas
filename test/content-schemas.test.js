'use strict';

const test = require('ava');
const Joi = require('joi');
const { contentSchema } = require('../');

test('assetUris: works when no asset URIs', t => {
    const obj = {
        html: 'asdf',
    };

    t.notThrows(() => Joi.attempt(obj, contentSchema));
});

test('assetUris: breaks if empty list of asset URIs', t => {
    const obj = {
        html: 'asdf',
        assetUris: [],
    };
    const res = Joi.validate(obj, contentSchema);
    t.truthy(res.error, 'error property is set');
    t.true(res.error.isJoi, 'object declares itself as joi error');
});

test('assetUris: breaks when malformed URI', t => {
    const obj = {
        html: 'asdf',
        assetUris: ['lofoo'],
    };
    const res = Joi.validate(obj, contentSchema);
    t.truthy(res.error, 'error property is set');
    t.true(res.error.isJoi, 'object declares itself as joi error');
});

test('assetUris: works with single URI', t => {
    const obj = {
        html: 'asdf',
        assetUris: ['http://cdn.example.org'],
    };
    const res = Joi.validate(obj, contentSchema);
    t.falsy(res.error, 'error property is set');
});

test('assetUris: works with multiple URIs', t => {
    const obj = {
        html: 'asdf',
        assetUris: ['http://cdn.example.org/1', 'http://cdn.example.org/2'],
    };
    const res = Joi.validate(obj, contentSchema);
    t.falsy(res.error, 'error property is set');
});
