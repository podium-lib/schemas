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

test('manifest.uri - empty - should return error', () => {
    expect(validate.uri('').error).toBeTruthy();
});

/**
 * .uriStrict
 */

test('manifest.uriStrict - contains absolute URI with http scheme - should not return error', () => {
    expect(validate.uriStrict('http://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uriStrict - contains absolute URI with https scheme - should not return error', () => {
    expect(validate.uriStrict('https://www.finn.no/metadata').error).toBe(false);
});

test('manifest.uriStrict - contains relative URI - should return error', () => {
    expect(validate.uriStrict('/metadata').error).toBeTruthy();
});

test('manifest.uriStrict - empty - should return error', () => {
    expect(validate.uriStrict('').error).toBeTruthy();
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
        css: [],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBe(false);
});

test('manifest.schema - css and js is array of objects - should not return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [
            { value: 'http://www.finn.no/podlet/css/a', type: 'module' },
            { value: 'http://www.finn.no/podlet/css/b', type: 'module' },
        ],
        js: [
            { value: 'http://www.finn.no/podlet/js/a', type: 'module' },
            { value: 'http://www.finn.no/podlet/js/b', type: 'module' },
        ],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBe(false);
});

test('manifest.schema - css object is missing value - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [
            { type: 'module' },
            { value: 'http://www.finn.no/podlet/css/b', type: 'module' },
        ],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - css object is missing type - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [
            { value: 'http://www.finn.no/podlet/css/a', type: 'module' },
            { value: 'http://www.finn.no/podlet/css/b' },
        ],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - js object is missing value - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [],
        js: [
            { type: 'module' },
            { value: 'http://www.finn.no/podlet/js/b', type: 'module' },
        ],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - js object is missing type - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [],
        js: [
            { value: 'http://www.finn.no/podlet/js/a' },
            { value: 'http://www.finn.no/podlet/js/b', type: 'module' },
        ],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - js is not an array - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [],
        js: '',
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - css contain illegal types - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [1, true],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - js is not an array - should return error', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [],
        js: [[], false],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    expect(validate.manifest(schema).error).toBeTruthy();
});

test('manifest.schema - css and js objects has extra properties - should be kept', () => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        assets: {
            js: 'http://www.finn.no/podlet/js',
            css: 'http://www.finn.no/podlet/css',
        },
        css: [
            { value: 'http://www.finn.no/podlet/css/a', type: 'module', foo: 'bar' },
            { value: 'http://www.finn.no/podlet/css/b', type: 'module', bar: 'foo' },
        ],
        js: [
            { value: 'http://www.finn.no/podlet/js/a', type: 'module', foo: 'bar' },
            { value: 'http://www.finn.no/podlet/js/b', type: 'module', bar: 'foo' },
        ],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };

    expect(validate.manifest(schema).error).toBe(false);

    const res = validate.manifest(schema);
    expect(res.value.css[0].foo).toEqual('bar');
    expect(res.value.css[1].bar).toEqual('foo');
    expect(res.value.js[0].foo).toEqual('bar');
    expect(res.value.js[1].bar).toEqual('foo');
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
    expect(res.value.css).toEqual([]);
    expect(res.value.js).toEqual([]);
    expect(res.value.proxy).toEqual({});
});