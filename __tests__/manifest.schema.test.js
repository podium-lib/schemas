'use strict';
 
const { validate } = require('../lib');

/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    expect(validate.uri('http://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uri - contains absolute URI with https scheme - should not return error', () => {
    expect(validate.uri('https://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uri - contains relative URI - should not return error', () => {
    expect(validate.uri('/metadata').error).toBe(false);
});

/**
 * .name
 */

test('manifest.name - contains legal characters - should not return error', () => {
    expect(validate.name('123-FOO_bar').error).toBe(false);
});

test('manifest.name - empty - should return error', () => {
    expect(validate.name('').error).toBeTruthy();
});

test('manifest.name - contains illegal characters - should return error', () => {
    expect(validate.name('foo~bar').error).toBeTruthy();
});

test('manifest.name - not String - should return error', () => {
    expect(validate.name(123).error).toBeTruthy();
});

test('manifest.name - has trailing spaces - should trim trailingspaces', () => {
    expect(validate.name(' abc ')).toEqual({value: 'abc', error: false});
});

/**
 * .version
 */

test('manifest.version - contains String value - should not return error', () => {
    expect(validate.version('1.0.0-beta-1').error).toBe(false);
});

test('manifest.version - empty - should return error', () => {
    expect(validate.version('').error).toBeTruthy();
});

test('manifest.version - not String - should return error', () => {
    expect(validate.version(123).error).toBeTruthy();
});

test('manifest.version - has trailing spaces - should trim trailingspaces', () => {
    expect(validate.version(' 1.0.0-beta-1 ')).toEqual({value: '1.0.0-beta-1', error: false});
});

/**
 * .content
 */

test('manifest.content - contains absolute URI value - should not return error', () => {
    expect(validate.content('http://www.finn.no/content').error).toBe(false);
});

test('manifest.content - contains relative URI value - should not return error', () => {
    expect(validate.content('/content').error).toBe(false);
});

test('manifest.content - empty - should return error', () => {
    expect(validate.content('').error).toBeTruthy();
});

test('manifest.content - not String - should return error', () => {
    expect(validate.content(123).error).toBeTruthy();
});

/**
 * .fallback
 */

test('manifest.fallback - contains absolute URI value - should not return error', () => {
    expect(validate.fallback('http://www.finn.no/fallback').error).toBe(false);
});

test('manifest.fallback - contains relative URI value - should not return error', () => {
    expect(validate.fallback('/fallback').error).toBe(false);
});

test('manifest.fallback - empty - should not return error', () => {
    expect(validate.fallback('').error).toBe(false);
});

test('manifest.fallback - not String - should return error', () => {
    expect(validate.fallback(123).error).toBeTruthy();
});

/**
 * .js
 */

test('manifest.js - contains legal URI value - should not return error', () => {
    expect(validate.js('https://www.finn.no/js').error).toBe(false);
});

test('manifest.js - empty - should not return error', () => {
    expect(validate.js('')).toEqual({value: '', error: false});
});

/**
 * .css
 */

test('manifest.css - contains legal URI value - should not return error', () => {
    expect(validate.css('http://www.finn.no/css').error).toBe(false);
});

test('manifest.css - empty - should not return error', () => {
    expect(validate.css('')).toEqual({value: '', error: false});
});

/**
 * .proxy
 */

test('manifest.proxy - empty object - should not return error', () => {
    expect(validate.proxy({}).error).toBe(false);
});

test('manifest.proxy - not object - should return error', () => {
    expect(validate.proxy('').error).toBeTruthy();
});

test('manifest.proxy - proxy item is absolute url - should not return error', () => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    expect(validate.proxy(item).error).toBe(false);
});

test('manifest.proxy - proxy item is relative url - should not return error', () => {
    const item = {
        a: '/foo/bar',
    };
    expect(validate.proxy(item).error).toBe(false);
});

test('manifest.proxy - proxy item is not a url - should return error', () => {
    const item = {
        a: [undefined],
    };
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
    expect(validate.proxy(item).error).toBeTruthy();
});

/**
 * .team
 */

test('manifest.team - contains String value - should not return error', () => {
    expect(validate.team('Bananas').error).toBe(false);
});

test('manifest.team - empty - should not return error', () => {
    expect(validate.team('').error).toBe(false);
});

test('manifest.team - not String - should return error', () => {
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
    expect(validate.manifest(schema).error).toBe(false);
});

test('manifest.schema - contains invalid schema - should return error', () => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - schema contains unknown keys - should strip unknown keys', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        banan: 'likør',
    };
    const res = validate.manifest(schema)
    expect(res.value.banan).toBeFalsy()
});

test('manifest.schema - optional fields not set - should set defaults', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
    };
    const res = validate.manifest(schema)
    expect(res.value.fallback).toBe('');
    expect(res.value.team).toBe('');
    expect(res.value.assets.css).toBe('');
    expect(res.value.assets.js).toBe('');
    expect(res.value.proxy).toEqual({});
});
