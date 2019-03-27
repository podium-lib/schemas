'use strict';

const Joi = require('joi');
const manifest = require('../lib/manifest.schema');
 
const { validate } = require('../lib');

/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeFalsy();

    expect(validate.uri('http://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uri - contains absolute URI with https scheme - should not return error', () => {
    const res = Joi.validate('https://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeFalsy();

    expect(validate.uri('https://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uri - contains relative URI - should not return error', () => {
    const res = Joi.validate('/metadata', manifest.uri);
    expect(res.error).toBeFalsy();

    expect(validate.uri('/metadata').error).toBe(false);
});

test('manifest.uri - contains illegal URI scheme - should return error', () => {
    const res = Joi.validate('gopher://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeTruthy();

    expect(validate.uri('gopher://www.finn.no/metadata').error).toBeTruthy();
});

/**
 * .name
 */

test('manifest.name - contains legal characters - should not return error', () => {
    const res = Joi.validate('123-FOO_bar', manifest.name);
    expect(res.error).toBeFalsy();

    expect(validate.name('123-FOO_bar').error).toBe(false);
});

test('manifest.name - empty - should return error', () => {
    const res = Joi.validate('', manifest.name);
    expect(res.error).toBeTruthy();

    expect(validate.name('').error).toBeTruthy();
});

test('manifest.name - contains illegal characters - should return error', () => {
    const res = Joi.validate('foo~bar', manifest.name);
    expect(res.error).toBeTruthy();

    expect(validate.name('foo~bar').error).toBeTruthy();
});

test('manifest.name - not String - should return error', () => {
    const res = Joi.validate(123, manifest.name);
    expect(res.error).toBeTruthy();

    expect(validate.name(123).error).toBeTruthy();
});

test('manifest.name - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' abc ', manifest.name);
    expect(res.value).toBe('abc');

    expect(validate.name(' abc ')).toEqual({value: 'abc', error: false});
});

/**
 * .version
 */

test('manifest.version - contains String value - should not return error', () => {
    const res = Joi.validate('1.0.0-beta-1', manifest.version);
    expect(res.error).toBeFalsy();

    expect(validate.version('1.0.0-beta-1').error).toBe(false);
});

test('manifest.version - empty - should return error', () => {
    const res = Joi.validate('', manifest.version);
    expect(res.error).toBeTruthy();

    expect(validate.version('').error).toBeTruthy();
});

test('manifest.version - not String - should return error', () => {
    const res = Joi.validate(123, manifest.version);
    expect(res.error).toBeTruthy();

    expect(validate.version(123).error).toBeTruthy();
});

test('manifest.version - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest.version);
    expect(res.value).toBe('1.0.0-beta-1');

    expect(validate.version(' 1.0.0-beta-1 ')).toEqual({value: '1.0.0-beta-1', error: false});
});

/**
 * .content
 */

test('manifest.content - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/content', manifest.content);
    expect(res.error).toBeFalsy();

    expect(validate.content('http://www.finn.no/content').error).toBe(false);
});

test('manifest.content - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/content', manifest.content);
    expect(res.error).toBeFalsy();

    expect(validate.content('/content').error).toBe(false);
});

test('manifest.content - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.content);
    expect(res.error).toBeTruthy();

    expect(validate.content('<section>banan</section>').error).toBeTruthy();
});

test('manifest.content - empty - should return error', () => {
    const res = Joi.validate('', manifest.content);
    expect(res.error).toBeTruthy();

    expect(validate.content('').error).toBeTruthy();
});

test('manifest.content - not String - should return error', () => {
    const res = Joi.validate(123, manifest.content);
    expect(res.error).toBeTruthy();

    expect(validate.content(123).error).toBeTruthy();
});

/**
 * .fallback
 */

test('manifest.fallback - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    expect(validate.fallback('http://www.finn.no/fallback').error).toBe(false);
});

test('manifest.fallback - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    expect(validate.fallback('/fallback').error).toBe(false);
});

test('manifest.fallback - empty - should not return error', () => {
    const res = Joi.validate('', manifest.fallback);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    expect(validate.fallback('').error).toBe(false);
});

test('manifest.fallback - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.fallback);
    expect(res.error).toBeTruthy();

    expect(validate.fallback('<section>banan</section>').error).toBeTruthy();
});

test('manifest.fallback - not String - should return error', () => {
    const res = Joi.validate(123, manifest.fallback);
    expect(res.error).toBeTruthy();

    expect(validate.fallback(123).error).toBeTruthy();
});

/**
 * .js
 */

test('manifest.js - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/js', manifest.js);
    expect(res.error).toBeFalsy();

    expect(validate.js('https://www.finn.no/js').error).toBe(false);
});

test('manifest.js - empty - should not return error', () => {
    const res = Joi.validate('', manifest.js);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    expect(validate.js('')).toEqual({value: '', error: false});
});

/**
 * .css
 */

test('manifest.css - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/css', manifest.css);
    expect(res.error).toBeFalsy();

    expect(validate.css('http://www.finn.no/css').error).toBe(false);
});

test('manifest.css - empty - should not return error', () => {
    const res = Joi.validate('', manifest.css);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    expect(validate.css('')).toEqual({value: '', error: false});
});

/**
 * .proxy
 */

test('manifest.proxy - empty object - should not return error', () => {
    const res = Joi.validate({}, manifest.proxy);
    expect(res.error).toBeFalsy();

    expect(validate.proxy({}).error).toBe(false);
});

test('manifest.proxy - not object - should return error', () => {
    const res = Joi.validate('foo', manifest.proxy);
    expect(res.error).toBeTruthy();

    expect(validate.proxy('').error).toBeTruthy();
});

test('manifest.proxy - proxy item is absolute url - should not return error', () => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    expect(validate.proxy(item).error).toBe(false);
});

test('manifest.proxy - proxy item is relative url - should not return error', () => {
    const item = {
        a: '/foo/bar',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    expect(validate.proxy(item).error).toBe(false);
});

test('manifest.proxy - proxy item is not a url - should return error', () => {
    const item = {
        a: [undefined],
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeTruthy();

    expect(validate.proxy(item).error).toBeTruthy();
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

    expect(validate.proxy(item).error).toBeTruthy();
});

/**
 * .team
 */

test('manifest.team - contains String value - should not return error', () => {
    const res = Joi.validate('Bananas', manifest.team);
    expect(res.error).toBeFalsy();

    expect(validate.team('Bananas').error).toBe(false);
});

test('manifest.team - empty - should not return error', () => {
    const res = Joi.validate('', manifest.team);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    expect(validate.team('').error).toBe(false);
});

test('manifest.team - not String - should return error', () => {
    const res = Joi.validate(123, manifest.team);
    expect(res.error).toBeTruthy();

    expect(validate.team(123).error).toBeTruthy();
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

    expect(validate.manifest(schema).error).toBe(false);
});

test('manifest.schema - contains invalid schema - should return error', () => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeTruthy();

    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - schema contains unknown keys - should strip unknown keys', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        banan: 'likør',
    };
    let res = Joi.validate(schema, manifest.schema);
    expect(res.value.banan).toBeFalsy();

    res = validate.manifest(schema)
    expect(res.value.banan).toBeFalsy()
});

test('manifest.schema - optional fields not set - should set defaults', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
    };
    let res = Joi.validate(schema, manifest.schema);
    expect(res.value.fallback).toBe('');
    expect(res.value.team).toBe('');
    expect(res.value.assets.css).toBe('');
    expect(res.value.assets.js).toBe('');
    expect(res.value.proxy).toEqual({});

    res = validate.manifest(schema)
    expect(res.value.fallback).toBe('');
    expect(res.value.team).toBe('');
    expect(res.value.assets.css).toBe('');
    expect(res.value.assets.js).toBe('');
    expect(res.value.proxy).toEqual({});
});
