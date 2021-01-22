'use strict';

const { test } = require('tap');
const { validate } = require('../lib');

//
// .uri
//

test('manifest.uri - contains absolute URI with http scheme', (t) => {
    t.false(validate.uri('http://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

test('manifest.uri - contains absolute URI with https scheme', (t) => {
    t.false(validate.uri('https://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

test('manifest.uri - contains relative URI', (t) => {
    t.false(validate.uri('/metadata').error, 'should not return error');
    t.end();
});

test('manifest.uri - empty', (t) => {
    t.true(validate.uri('').error, 'should return error')
    t.end();
});

//
// .uriStrict
//

test('manifest.uriStrict - contains absolute URI with http scheme', (t) => {
    t.false(validate.uriStrict('http://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

test('manifest.uriStrict - contains absolute URI with https scheme', (t) => {
    t.false(validate.uriStrict('https://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

test('manifest.uriStrict - contains relative URI', (t) => {
    t.true(validate.uriStrict('/metadata').error, 'should return error')
    t.end();
});

test('manifest.uriStrict - empty - should return error', (t) => {
    t.true(validate.uriStrict('').error, 'should return error')
    t.end();
});

//
// .name
//

test('manifest.name - contains legal characters', (t) => {
    t.false(validate.name('123-FOO_bar').error, 'should not return error');
    t.end();
});

test('manifest.name - empty', (t) => {
    t.true(validate.name('').error, 'should return error')
    t.end();
});

test('manifest.name - contains illegal characters', (t) => {
    t.true(validate.name('foo~bar').error, 'should return error')
    t.end();
});

test('manifest.name - not String', (t) => {
    t.true(validate.name(123).error, 'should return error')
    t.end();
});

test('manifest.name - has trailing spaces', (t) => {
    t.deepEqual(validate.name(' abc '), {value: 'abc', error: false}, 'should trim trailingspaces');
    t.end();
});

//
// .version
//

test('manifest.version - contains String value', (t) => {
    t.false(validate.version('1.0.0-beta-1').error, 'should not return error');
    t.end();
});

test('manifest.version - empty', (t) => {
    t.true(validate.version('').error, 'should return error');
    t.end();
});

test('manifest.version - not String', (t) => {
    t.true(validate.version(123).error, 'should return error');
    t.end();
});

test('manifest.version - has trailing spaces', (t) => {
    t.deepEqual(validate.version(' 1.0.0-beta-1 '), {value: '1.0.0-beta-1', error: false}, 'should trim trailingspaces');
    t.end();
});

//
// .content
//

test('manifest.content - contains absolute URI value', (t) => {
    t.false(validate.content('http://www.finn.no/content').error, 'should not return error');
    t.end();
});

test('manifest.content - contains relative URI value', (t) => {
    t.false(validate.content('/content').error, 'should not return error');
    t.end();
});

test('manifest.content - empty', (t) => {
    t.true(validate.content('').error, 'should return error');
    t.end();
});

test('manifest.content - not String', (t) => {
    t.true(validate.content(123).error, 'should return error');
    t.end();
});

//
// .fallback
//

test('manifest.fallback - contains absolute URI value', (t) => {
    t.false(validate.fallback('http://www.finn.no/fallback').error, 'should not return error');
    t.end();
});

test('manifest.fallback - contains relative URI value', (t) => {
    t.false(validate.fallback('/fallback').error, 'should not return error');
    t.end();
});

test('manifest.fallback - empty', (t) => {
    t.false(validate.fallback('').error, 'should not return error');
    t.end();
});

test('manifest.fallback - not String', (t) => {
    t.true(validate.fallback(123).error, 'should return error');
    t.end();
});

//
// .js
//

test('manifest.js - contains legal URI value', (t) => {
    t.false(validate.js('https://www.finn.no/js').error, 'should not return error');
    t.end();
});

test('manifest.js - empty', (t) => {
    t.deepEqual(validate.js(''), {value: '', error: false}, 'should not return error');
    t.end();
});

//
// .css
//

test('manifest.css - contains legal URI value', (t) => {
    t.false(validate.css('http://www.finn.no/css').error, 'should not return error');
    t.end();
});

test('manifest.css - empty', (t) => {
    t.deepEqual(validate.css(''), {value: '', error: false}, 'should not return error');
    t.end();
});

//
// .proxy
//

test('manifest.proxy - empty object', (t) => {
    t.false(validate.proxy({}).error, 'should not return error');
    t.end();
});

test('manifest.proxy - not object', (t) => {
    t.true(validate.proxy('').error, 'should return error');
    t.end();
});

test('manifest.proxy - proxy item is absolute url', (t) => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    t.false(validate.proxy(item).error, 'should not return error');
    t.end();
});

test('manifest.proxy - proxy item is relative url', (t) => {
    const item = {
        a: '/foo/bar',
    };
    t.false(validate.proxy(item).error, 'should not return error');
    t.end();
});

test('manifest.proxy - proxy item is not a url', (t) => {
    const item = {
        a: [undefined],
    };
    t.true(validate.proxy(item).error, 'should return error');
    t.end();
});

test('manifest.proxy - more than 4 items', (t) => {
    const item = {
        a: 'http://www.finn.no/foo/a',
        b: 'http://www.finn.no/foo/b',
        c: 'http://www.finn.no/foo/c',
        d: 'http://www.finn.no/foo/d',
        e: 'http://www.finn.no/foo/e',
    };
    t.true(validate.proxy(item).error, 'should return error');
    t.end();
});

//
// .team
//

test('manifest.team - contains String value', (t) => {
    t.false(validate.team('Bananas').error, 'should not return error');
    t.end();
});

test('manifest.team - empty', (t) => {
    t.false(validate.team('').error, 'should not return error');
    t.end();
});

test('manifest.team - not String', (t) => {
    t.true(validate.team(123).error, 'should return error');
    t.end();
});

//
// .schema
//

test('manifest.schema - contains valid schema', (t) => {
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
    t.false(validate.manifest(schema).error, 'should not return error');
    t.end();
});

test('manifest.schema - css and js is array of objects', (t) => {
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
    t.false(validate.manifest(schema).error, 'should not return error');
    t.end();
});

test('manifest.schema - css object is missing value', (t) => {
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
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - js object is missing value', (t) => {
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
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - js is not an array', (t) => {
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
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - css contain illegal types', (t) => {
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
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - js is not an array', (t) => {
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
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - css and js objects has extra properties', (t) => {
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

    t.false(validate.manifest(schema).error, 'should not return error');

    const res = validate.manifest(schema);
    t.equal(res.value.css[0].foo, 'bar');
    t.equal(res.value.css[1].bar, 'foo');
    t.equal(res.value.js[0].foo, 'bar');
    t.equal(res.value.js[1].bar, 'foo');
    t.end();
});

test('manifest.schema - contains invalid schema', (t) => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    t.true(validate.manifest(schema).error, 'should return error');
    t.end();
});

test('manifest.schema - schema contains unknown keys', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        banan: 'likør',
    };
    const res = validate.manifest(schema)
    t.false(res.value.banan, 'should strip unknown keys');
    t.end();
});

test('manifest.schema - optional fields not set - should set defaults', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
    };
    const res = validate.manifest(schema)
    t.equal(res.value.fallback, '');
    t.equal(res.value.team, '');
    t.equal(res.value.assets.css, '');
    t.equal(res.value.assets.js, '');
    t.same(res.value.css, []);
    t.same(res.value.js, []);
    t.same(res.value.proxy, {});
    t.end();
});