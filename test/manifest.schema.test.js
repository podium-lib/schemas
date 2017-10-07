'use strict';

const manifest = require('../lib/manifest.schema');
const Joi = require('joi');

/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    const res = Joi.validate('http://www.google.com/metadata', manifest.uri);
    expect(res.error).toBeFalsy();
});

test('manifest.uri - contains relative URI - should not return error', () => {
    const res = Joi.validate('/metadata', manifest.uri);
    expect(res.error).toBeFalsy();
});

test('manifest.uri - contains illegal URI scheme - should return error', () => {
    const res = Joi.validate('gopher://www.google.com/metadata', manifest.uri);
    expect(res.error).toBeTruthy();
});

/**
 * ._name
 */

test('manifest._name - contains legal characters - should not return error', () => {
    const res = Joi.validate('123-FOO_bar', manifest._name);
    expect(res.error).toBeFalsy();
});

test('manifest._name - empty - should return error', () => {
    const res = Joi.validate('', manifest._name);
    expect(res.error).toBeTruthy();
});

test('manifest._name - contains illegal characters - should return error', () => {
    const res = Joi.validate('foo~bar', manifest._name);
    expect(res.error).toBeTruthy();
});

test('manifest._name - not String - should return error', () => {
    const res = Joi.validate(123, manifest._name);
    expect(res.error).toBeTruthy();
});

test('manifest._name - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' abc ', manifest._name);
    expect(res.value).toBe('abc');
});

/**
 * ._version
 */

test('manifest._version - contains String value - should not return error', () => {
    const res = Joi.validate('1.0.0-beta-1', manifest._version);
    expect(res.error).toBeFalsy();
});

test('manifest._version - empty - should return error', () => {
    const res = Joi.validate('', manifest._version);
    expect(res.error).toBeTruthy();
});

test('manifest._version - not String - should return error', () => {
    const res = Joi.validate(123, manifest._version);
    expect(res.error).toBeTruthy();
});

test('manifest._version - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest._version);
    expect(res.value).toBe('1.0.0-beta-1');
});

/**
 * ._content
 */

test('manifest._content - contains String value - should not return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest._content);
    expect(res.error).toBeFalsy();
});

test('manifest._content - empty - should return error', () => {
    const res = Joi.validate('', manifest._content);
    expect(res.error).toBeTruthy();
});

test('manifest._content - not String - should return error', () => {
    const res = Joi.validate(123, manifest._content);
    expect(res.error).toBeTruthy();
});

/**
 * ._fallback
 */

test('manifest._fallback - contains String value - should not return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest._fallback);
    expect(res.error).toBeFalsy();
});

test('manifest._fallback - empty - should return error', () => {
    const res = Joi.validate('', manifest._fallback);
    expect(res.error).toBeTruthy();
});

test('manifest._fallback - not String - should return error', () => {
    const res = Joi.validate(123, manifest._fallback);
    expect(res.error).toBeTruthy();
});

/**
 * ._js
 */

test('manifest._js - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.google.com/js', manifest._js);
    expect(res.error).toBeFalsy();
});

test('manifest._js - empty - should return error', () => {
    const res = Joi.validate('', manifest._js);
    expect(res.error).toBeTruthy();
});

/**
 * ._css
 */

test('manifest._css - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.google.com/css', manifest._css);
    expect(res.error).toBeFalsy();
});

test('manifest._css - empty - should return error', () => {
    const res = Joi.validate('', manifest._css);
    expect(res.error).toBeTruthy();
});

/**
 * ._team
 */

test('manifest._team - contains String value - should not return error', () => {
    const res = Joi.validate('Bananas', manifest._team);
    expect(res.error).toBeFalsy();
});

test('manifest._team - empty - should return error', () => {
    const res = Joi.validate('', manifest._team);
    expect(res.error).toBeTruthy();
});

test('manifest._team - not String - should return error', () => {
    const res = Joi.validate(123, manifest._team);
    expect(res.error).toBeTruthy();
});

/**
 * .schema
 */

test('manifest.schema - contains valid schema - should not return error', () => {
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
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeFalsy();
});

test('manifest.schema - contains invalid schema - should return error', () => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeTruthy();
});

test('manifest.schema - schema contains unknown keys - should strip unknown keys', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.google.com/podlet',
        banan: 'likør',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.value.banan).toBeFalsy();
});
