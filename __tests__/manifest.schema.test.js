'use strict';

const Joi = require('joi');
const manifest = require('../lib/manifest.schema');
 
const { validate, validate2 } = require('../lib');

const createValidData = data => ({
    name: 'hello',
    version: '1.0.0',
    content: '/',
    ...data,
});

test('test data - createValidData returns a valid schema', () => {
    const data = createValidData({});
    validate(data);
    expect(validate.errors).toBeFalsy();
});

/**
 * .name
 */

test('manifest.name - contains legal characters - should not return error', () => {
    const name = '123-FOO_bar';

    const res = Joi.validate(name, manifest.name);
    expect(res.error).toBeFalsy();

    expect(validate2.name(name).errors).toBeFalsy();

    const data = createValidData({ name });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.name - empty - should return error', () => {
    const res = Joi.validate('', manifest.name);
    expect(res.error).toBeTruthy();

    const data = createValidData({ name: '' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.name - contains illegal characters - should return error', () => {
    const res = Joi.validate('foo~bar', manifest.name);
    expect(res.error).toBeTruthy();

    const data = createValidData({ name: 'foo~bar' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.name - not String - should return error', () => {
    const res = Joi.validate(123, manifest.name);
    expect(res.error).toBeTruthy();

    const data = createValidData({ name: 123 });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.name - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' abc ', manifest.name);
    expect(res.value).toBe('abc');

    const data = createValidData({ name: ' abc ' });
    validate(data);
    // expect(data.name).toBe('abc');
    expect(validate.errors).toBeTruthy();
});

/**
 * .version
 */

test('manifest.version - contains String value - should not return error', () => {
    const res = Joi.validate('1.0.0-beta-1', manifest.version);
    expect(res.error).toBeFalsy();

    const data = createValidData({ version: '1.0.0-beta-1' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.version - empty - should return error', () => {
    const res = Joi.validate('', manifest.version);
    expect(res.error).toBeTruthy();

    const data = createValidData({ version: '' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.version - not String - should return error', () => {
    const res = Joi.validate(123, manifest.version);
    expect(res.error).toBeTruthy();

    const data = createValidData({ version: 123 });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.version - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest.version);
    expect(res.value).toBe('1.0.0-beta-1');

    const data = createValidData({ version: ' 1.0.0-beta-1 ' });
    validate(data);
    expect(data.version).toBe('1.0.0-beta-1');
    expect(validate.errors).toBeFalsy();
});

/**
 * .content
 */

test('manifest.content - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/content', manifest.content);
    expect(res.error).toBeFalsy();

    const data = createValidData({ content: 'http://www.finn.no/content' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/content', manifest.uri);
    expect(res.error).toBeFalsy();

    const data = createValidData({ content: 'http://www.finn.no/content' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.uri - contains absolute URI with https scheme - should not return error', () => {
    const res = Joi.validate('https://www.finn.no/content', manifest.uri);
    expect(res.error).toBeFalsy();

    const data = createValidData({ content: 'https://www.finn.no/content' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.uri - contains relative URI - should not return error', () => {
    const res = Joi.validate('/content', manifest.uri);
    expect(res.error).toBeFalsy();

    const data = createValidData({ content: '/content' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.uri - contains illegal URI scheme - should return error', () => {
    const res = Joi.validate('gopher://www.finn.no/content', manifest.uri);
    expect(res.error).toBeTruthy();

    const data = createValidData({ content: 'gopher://www.finn.no/content' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.content - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/content', manifest.content);
    expect(res.error).toBeFalsy();

    const data = createValidData({ content: '/content' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.content - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.content);
    expect(res.error).toBeTruthy();

    const data = createValidData({ content: '<section>banan</section>' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.content - empty - should return error', () => {
    const res = Joi.validate('', manifest.content);
    expect(res.error).toBeTruthy();

    const data = createValidData({ content: '' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.content - not String - should return error', () => {
    const res = Joi.validate(123, manifest.content);
    expect(res.error).toBeTruthy();

    const data = createValidData({ content: 123 });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

/**
 * .fallback
 */

test('manifest.fallback - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    const data = createValidData({ fallback: 'http://www.finn.no/fallback' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.fallback - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    const data = createValidData({ fallback: '/fallback' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.fallback - empty - should not return error', () => {
    const res = Joi.validate('', manifest.fallback);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = createValidData({ fallback: '' });
    validate(data);
    expect(data.fallback).toBe('');
    expect(validate.errors).toBeFalsy();
});

test('manifest.fallback - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.fallback);
    expect(res.error).toBeTruthy();

    const data = createValidData({ fallback: '<section>banan</section>' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.fallback - not String - should return error', () => {
    const res = Joi.validate(123, manifest.fallback);
    expect(res.error).toBeTruthy();

    const data = createValidData({ fallback: 123 });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

/**
 * .js
 */

test('manifest.js - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/js', manifest.js);
    expect(res.error).toBeFalsy();

    const data = createValidData({ assets: { js: 'http://www.finn.no/js' } });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.js - empty - should not return error', () => {
    const res = Joi.validate('', manifest.js);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = createValidData({ assets: { js: '' } });
    validate(data);
    expect(data.assets.js).toBe('');
    expect(validate.errors).toBeFalsy();
});

/**
 * .css
 */

test('manifest.css - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/css', manifest.css);
    expect(res.error).toBeFalsy();

    const data = createValidData({
        assets: {
            css: 'http://www.finn.no/css',
        },
    });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.css - empty - should not return error', () => {
    const res = Joi.validate('', manifest.css);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = createValidData({ assets: { css: '' } });
    validate(data);
    expect(data.assets.css).toBe('');
    expect(validate.errors).toBeFalsy();
});

/**
 * .proxy
 */

test('manifest.proxy - empty object - should not return error', () => {
    const res = Joi.validate({}, manifest.proxy);
    expect(res.error).toBeFalsy();

    const data = createValidData({ proxy: {} });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.proxy - not object - should return error', () => {
    const res = Joi.validate('foo', manifest.proxy);
    expect(res.error).toBeTruthy();

    const data = createValidData({ proxy: 'foo' });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.proxy - proxy item is absolute url - should not return error', () => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    const data = createValidData({ proxy: item });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.proxy - proxy item is relative url - should not return error', () => {
    const item = {
        a: '/foo/bar',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    const data = createValidData({ proxy: item });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.proxy - proxy item is not a url - should return error', () => {
    const item = {
        a: [undefined],
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeTruthy();

    const data = createValidData({ proxy: item });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

test('manifest.proxy - more than 4 items - should return error', () => {
    const item = {
        a: 'http://www.finn.no/foo/a',
        b: 'http://www.finn.no/foo/b',
        c: 'http://www.finn.no/foo/c',
        d: 'http://www.finn.no/foo/d',
        e: 'http://www.finn.no/foo/e',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeTruthy();

    const data = createValidData({ proxy: item });
    validate(data);
    expect(validate.errors).toBeTruthy();
});

/**
 * .team
 */

test('manifest.team - contains String value - should not return error', () => {
    const res = Joi.validate('Bananas', manifest.team);
    expect(res.error).toBeFalsy();

    const data = createValidData({ team: 'Bananas' });
    validate(data);
    expect(validate.errors).toBeFalsy();
});

test('manifest.team - empty - should not return error', () => {
    const res = Joi.validate('', manifest.team);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = createValidData({ team: '' });
    validate(data);
    expect(data.team).toBe('');
    expect(validate.errors).toBeFalsy();
});

test('manifest.team - not String - should return error', () => {
    const res = Joi.validate(123, manifest.team);
    expect(res.error).toBeTruthy();

    const data = createValidData({ team: 123 });
    validate(data);
    expect(validate.errors).toBeTruthy();
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
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeFalsy();

    validate(schema);
    expect(validate.errors).toBeFalsy();
});

test('manifest.schema - contains invalid schema - should return error', () => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeTruthy();

    validate(schema);
    expect(validate.errors).toBeTruthy();
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

    validate(schema);
    expect(schema.banan).toBeFalsy();
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
    expect(res.value.proxy).toEqual({});

    validate(schema);
    expect(schema.fallback).toBe('');
    expect(schema.team).toBe('');
    expect(schema.assets.css).toBe('');
    expect(schema.assets.js).toBe('');
    expect(schema.proxy).toEqual({});
});
