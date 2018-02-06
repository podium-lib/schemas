'use strict';

const manifest = require('../lib/manifest.schema');
const Joi = require('joi');

/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeFalsy();
});

test('manifest.uri - contains relative URI - should not return error', () => {
    const res = Joi.validate('/metadata', manifest.uri);
    expect(res.error).toBeFalsy();
});

test('manifest.uri - contains illegal URI scheme - should return error', () => {
    const res = Joi.validate('gopher://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeTruthy();
});

/**
 * .name
 */

test('manifest.name - contains legal characters - should not return error', () => {
    const res = Joi.validate('123-FOO_bar', manifest.name);
    expect(res.error).toBeFalsy();
});

test('manifest.name - empty - should return error', () => {
    const res = Joi.validate('', manifest.name);
    expect(res.error).toBeTruthy();
});

test('manifest.name - contains illegal characters - should return error', () => {
    const res = Joi.validate('foo~bar', manifest.name);
    expect(res.error).toBeTruthy();
});

test('manifest.name - not String - should return error', () => {
    const res = Joi.validate(123, manifest.name);
    expect(res.error).toBeTruthy();
});

test('manifest.name - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' abc ', manifest.name);
    expect(res.value).toBe('abc');
});

/**
 * .version
 */

test('manifest.version - contains String value - should not return error', () => {
    const res = Joi.validate('1.0.0-beta-1', manifest.version);
    expect(res.error).toBeFalsy();
});

test('manifest.version - empty - should return error', () => {
    const res = Joi.validate('', manifest.version);
    expect(res.error).toBeTruthy();
});

test('manifest.version - not String - should return error', () => {
    const res = Joi.validate(123, manifest.version);
    expect(res.error).toBeTruthy();
});

test('manifest.version - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest.version);
    expect(res.value).toBe('1.0.0-beta-1');
});

/**
 * .content
 */

test('manifest.content - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/content', manifest.content);
    expect(res.error).toBeFalsy();
});

test('manifest.content - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/content', manifest.content);
    expect(res.error).toBeFalsy();
});

test('manifest.content - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.content);
    expect(res.error).toBeTruthy();
});

test('manifest.content - empty - should return error', () => {
    const res = Joi.validate('', manifest.content);
    expect(res.error).toBeTruthy();
});

test('manifest.content - not String - should return error', () => {
    const res = Joi.validate(123, manifest.content);
    expect(res.error).toBeTruthy();
});

/**
 * .fallback
 */

test('manifest.fallback - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();
});

test('manifest.fallback - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();
});

test('manifest.fallback - empty - should not return error', () => {
    const res = Joi.validate('', manifest.fallback);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();
});

test('manifest.fallback - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.fallback);
    expect(res.error).toBeTruthy();
});

test('manifest.fallback - not String - should return error', () => {
    const res = Joi.validate(123, manifest.fallback);
    expect(res.error).toBeTruthy();
});

/**
 * .js
 */

test('manifest.js - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/js', manifest.js);
    expect(res.error).toBeFalsy();
});

test('manifest.js - empty - should not return error', () => {
    const res = Joi.validate('', manifest.js);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();
});

/**
 * .css
 */

test('manifest.css - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/css', manifest.css);
    expect(res.error).toBeFalsy();
});

test('manifest.css - empty - should not return error', () => {
    const res = Joi.validate('', manifest.css);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();
});

/**
 * .team
 */

test('manifest.team - contains String value - should not return error', () => {
    const res = Joi.validate('Bananas', manifest.team);
    expect(res.error).toBeFalsy();
});

test('manifest.team - empty - should not return error', () => {
    const res = Joi.validate('', manifest.team);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();
});

test('manifest.team - not String - should return error', () => {
    const res = Joi.validate(123, manifest.team);
    expect(res.error).toBeTruthy();
});

/**
 * .schema
 */

test('manifest.schema - contains valid schema - should not return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
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
        content: 'http://www.finn.no/content',
        banan: 'likør',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.value.banan).toBeFalsy();
});

test('manifest.schema - optional fields not set - should set defaults', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.value.fallback).toBe('');
    expect(res.value.team).toBe('');
    expect(res.value.assets.css).toBe('');
    expect(res.value.assets.js).toBe('');
});
