'use strict';

const manifest = require('../lib/manifest.schema');
const test = require('ava');
const Joi = require('joi');



/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', t => {
    const res = Joi.validate('http://www.google.com/metadata', manifest.uri);
    t.falsy(res.error);
});

test('manifest.uri - contains relative URI - should not return error', t => {
    const res = Joi.validate('/metadata', manifest.uri);
    t.falsy(res.error);
});

test('manifest.uri - contains illegal URI scheme - should return error', t => {
    const res = Joi.validate('gopher://www.google.com/metadata', manifest.uri);
    t.truthy(res.error);
});



/**
 * ._name
 */

test('manifest._name - contains legal characters - should not return error', t => {
    const res = Joi.validate('123-FOO_bar', manifest._name);
    t.falsy(res.error);
});

test('manifest._name - empty - should return error', t => {
    const res = Joi.validate('', manifest._name);
    t.truthy(res.error);
});

test('manifest._name - contains illegal characters - should return error', t => {
    const res = Joi.validate('foo~bar', manifest._name);
    t.truthy(res.error);
});

test('manifest._name - not String - should return error', t => {
    const res = Joi.validate(123, manifest._name);
    t.truthy(res.error);
});

test('manifest._name - has trailing spaces - should trim trailingspaces', t => {
    const res = Joi.validate(' abc ', manifest._name);
    t.true(res.value === 'abc');
});



/**
 * ._version
 */

test('manifest._version - contains String value - should not return error', t => {
    const res = Joi.validate('1.0.0-beta-1', manifest._version);
    t.falsy(res.error);
});

test('manifest._version - empty - should return error', t => {
    const res = Joi.validate('', manifest._version);
    t.truthy(res.error);
});

test('manifest._version - not String - should return error', t => {
    const res = Joi.validate(123, manifest._version);
    t.truthy(res.error);
});

test('manifest._version - has trailing spaces - should trim trailingspaces', t => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest._version);
    t.true(res.value === '1.0.0-beta-1');
});



/**
 * ._content
 */

test('manifest._content - contains String value - should not return error', t => {
    const res = Joi.validate('<section>banan</section>', manifest._content);
    t.falsy(res.error);
});

test('manifest._content - empty - should return error', t => {
    const res = Joi.validate('', manifest._content);
    t.truthy(res.error);
});

test('manifest._content - not String - should return error', t => {
    const res = Joi.validate(123, manifest._content);
    t.truthy(res.error);
});



/**
 * ._fallback
 */

test('manifest._fallback - contains String value - should not return error', t => {
    const res = Joi.validate('<section>banan</section>', manifest._fallback);
    t.falsy(res.error);
});

test('manifest._fallback - empty - should return error', t => {
    const res = Joi.validate('', manifest._fallback);
    t.truthy(res.error);
});

test('manifest._fallback - not String - should return error', t => {
    const res = Joi.validate(123, manifest._fallback);
    t.truthy(res.error);
});



/**
 * ._js
 */

test('manifest._js - contains legal URI value - should not return error', t => {
    const res = Joi.validate('http://www.google.com/js', manifest._js);
    t.falsy(res.error);
});

test('manifest._js - empty - should return error', t => {
    const res = Joi.validate('', manifest._js);
    t.truthy(res.error);
});



/**
 * ._css
 */

test('manifest._css - contains legal URI value - should not return error', t => {
    const res = Joi.validate('http://www.google.com/css', manifest._css);
    t.falsy(res.error);
});

test('manifest._css - empty - should return error', t => {
    const res = Joi.validate('', manifest._css);
    t.truthy(res.error);
});



/**
 * ._team
 */

test('manifest._team - contains String value - should not return error', t => {
    const res = Joi.validate('Bananas', manifest._team);
    t.falsy(res.error);
});

test('manifest._team - empty - should return error', t => {
    const res = Joi.validate('', manifest._team);
    t.truthy(res.error);
});

test('manifest._team - not String - should return error', t => {
    const res = Joi.validate(123, manifest._team);
    t.truthy(res.error);
});



/**
 * .schema
 */

test('manifest.schema - contains valid schema - should not return error', t => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.google.com/podlet',
        fallback: 'http://www.google.com/fallback',
        assets: {
            js: 'http://www.google.com/podlet/js',
            css: 'http://www.google.com/podlet/css',
        },
        team: 'The A-Team',
    }
    const res = Joi.validate(schema, manifest.schema);
    t.falsy(res.error);
});

test('manifest.schema - contains invalid schema - should return error', t => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    }
    const res = Joi.validate(schema, manifest.schema);
    t.truthy(res.error);
});

test('manifest.schema - schema contains unknown keys - should strip unknown keys', t => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.google.com/podlet',
        banan: 'likør'
    }
    const res = Joi.validate(schema, manifest.schema);
    t.falsy(res.value.banan);
});
