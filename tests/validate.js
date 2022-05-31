import tap from 'tap';
import { 
    uriStrict,
    manifest,
    fallback,
    version,
    content,
    proxy,
    team,
    name,
    uri,
    css,
    js,
} from '../src/validate.js';

//
// .uri
//

tap.test('manifest.uri - contains absolute URI with http scheme', (t) => {
    t.notOk(uri('http://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

tap.test('manifest.uri - contains absolute URI with https scheme', (t) => {
    t.notOk(uri('https://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

tap.test('manifest.uri - contains relative URI', (t) => {
    t.notOk(uri('/metadata').error, 'should not return error');
    t.end();
});

tap.test('manifest.uri - empty', (t) => {
    t.ok(uri('').error, 'should return error')
    t.end();
});

//
// .uriStrict
//

tap.test('manifest.uriStrict - contains absolute URI with http scheme', (t) => {
    t.notOk(uriStrict('http://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

tap.test('manifest.uriStrict - contains absolute URI with https scheme', (t) => {
    t.notOk(uriStrict('https://www.finn.no/metadata').error, 'should not return error');
    t.end();
});

tap.test('manifest.uriStrict - contains relative URI', (t) => {
    t.ok(uriStrict('/metadata').error, 'should return error')
    t.end();
});

tap.test('manifest.uriStrict - empty - should return error', (t) => {
    t.ok(uriStrict('').error, 'should return error')
    t.end();
});

//
// .name
//

tap.test('manifest.name - contains legal characters', (t) => {
    t.notOk(name('123-FOO_bar').error, 'should not return error');
    t.end();
});

tap.test('manifest.name - empty', (t) => {
    t.ok(name('').error, 'should return error')
    t.end();
});

tap.test('manifest.name - contains illegal characters', (t) => {
    t.ok(name('foo~bar').error, 'should return error')
    t.end();
});

tap.test('manifest.name - not String', (t) => {
    t.ok(name(123).error, 'should return error')
    t.end();
});

tap.test('manifest.name - has trailing spaces', (t) => {
    t.same(name(' abc '), {value: 'abc', error: false}, 'should trim trailingspaces');
    t.end();
});

//
// .version
//

tap.test('manifest.version - contains String value', (t) => {
    t.notOk(version('1.0.0-beta-1').error, 'should not return error');
    t.end();
});

tap.test('manifest.version - empty', (t) => {
    t.ok(version('').error, 'should return error');
    t.end();
});

tap.test('manifest.version - not String', (t) => {
    t.ok(version(123).error, 'should return error');
    t.end();
});

tap.test('manifest.version - has trailing spaces', (t) => {
    t.same(version(' 1.0.0-beta-1 '), {value: '1.0.0-beta-1', error: false}, 'should trim trailingspaces');
    t.end();
});

//
// .content
//

tap.test('manifest.content - contains absolute URI value', (t) => {
    t.notOk(content('http://www.finn.no/content').error, 'should not return error');
    t.end();
});

tap.test('manifest.content - contains relative URI value', (t) => {
    t.notOk(content('/content').error, 'should not return error');
    t.end();
});

tap.test('manifest.content - empty', (t) => {
    t.ok(content('').error, 'should return error');
    t.end();
});

tap.test('manifest.content - not String', (t) => {
    t.ok(content(123).error, 'should return error');
    t.end();
});

//
// .fallback
//

tap.test('manifest.fallback - contains absolute URI value', (t) => {
    t.notOk(fallback('http://www.finn.no/fallback').error, 'should not return error');
    t.end();
});

tap.test('manifest.fallback - contains relative URI value', (t) => {
    t.notOk(fallback('/fallback').error, 'should not return error');
    t.end();
});

tap.test('manifest.fallback - empty', (t) => {
    t.notOk(fallback('').error, 'should not return error');
    t.end();
});

tap.test('manifest.fallback - not String', (t) => {
    t.ok(fallback(123).error, 'should return error');
    t.end();
});

//
// .js
//

tap.test('manifest.js - contains legal URI value', (t) => {
    t.notOk(js([{ value: 'https://www.finn.no/js', type: 'module' }]).error, 'should not return error');
    t.end();
});

tap.test('manifest.js - empty array', (t) => {
    t.same(js([]), {value: [], error: false}, 'should not return error');
    t.end();
});

//
// .css
//

tap.test('manifest.css - contains legal URI value', (t) => {
    t.notOk(css([{ value: 'https://www.finn.no/css', type: 'text/css' }]).error, 'should not return error');
    t.end();
});

tap.test('manifest.css - empty array', (t) => {
    t.same(css([]), {value: [], error: false}, 'should not return error');
    t.end();
});

//
// .proxy
//

tap.test('manifest.proxy - empty array', (t) => {
    t.notOk(proxy([]).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - not array or object', (t) => {
    t.ok(proxy('').error, 'should return error');
    t.ok(proxy(2).error, 'should return error');
    t.ok(proxy(true).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is valid object', (t) => {
    const item = {
        target: 'http://www.finn.no/foo',
        name: 'foo',
    };
    t.notOk(proxy([item]).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is invalid object', (t) => {
    const item = {
        foo: 'http://www.finn.no/foo',
        bar: 'foo',
    };
    t.ok(proxy([item]).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is missing "name" property', (t) => {
    const item = {
        target: 'http://www.finn.no/foo',
    };
    t.ok(proxy([item]).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is missing "target" property', (t) => {
    const item = {
        name: "foo",
    };
    t.ok(proxy([item]).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item has illegal value for "target" property', (t) => {
    const item = {
        target: 2,
        name: "foo",
    };
    t.ok(proxy([item]).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item has illegal value for "name" property', (t) => {
    const item = {
        target: 'http://www.finn.no/foo',
        name: 2,
    };
    t.ok(proxy([item]).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - proxy item has relative url for "target" property', (t) => {
    const item = {
        target: '/foo',
        name: 'foo',
    };
    t.notOk(proxy([item]).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - proxy has more than 4 items', (t) => {
    const item = {
        target: 'http://www.finn.no/foo',
        name: 'foo',
    };
    t.ok(proxy([item, item, item, item, item]).error, 'should return error');
    t.end();
});

//
// .proxy - LEGACY OBJECT SUPPORT
//

tap.test('manifest.proxy - empty object', (t) => {
    t.notOk(proxy({}).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is absolute url', (t) => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    t.notOk(proxy(item).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is relative url', (t) => {
    const item = {
        a: '/foo/bar',
    };
    t.notOk(proxy(item).error, 'should not return error');
    t.end();
});

tap.test('manifest.proxy - proxy item is not a url', (t) => {
    const item = {
        a: [undefined],
    };
    t.ok(proxy(item).error, 'should return error');
    t.end();
});

tap.test('manifest.proxy - more than 4 items', (t) => {
    const item = {
        a: 'http://www.finn.no/foo/a',
        b: 'http://www.finn.no/foo/b',
        c: 'http://www.finn.no/foo/c',
        d: 'http://www.finn.no/foo/d',
        e: 'http://www.finn.no/foo/e',
    };
    t.ok(proxy(item).error, 'should return error');
    t.end();
});

//
// .team
//

tap.test('manifest.team - contains String value', (t) => {
    t.notOk(team('Bananas').error, 'should not return error');
    t.end();
});

tap.test('manifest.team - empty', (t) => {
    t.notOk(team('').error, 'should not return error');
    t.end();
});

tap.test('manifest.team - not String', (t) => {
    t.ok(team(123).error, 'should return error');
    t.end();
});

//
// .schema
//

tap.test('manifest.schema - contains valid schema', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        css: [],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    t.notOk(manifest(schema).error, 'should not return error');
    t.end();
});

tap.test('manifest.schema - css and js is array of objects', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
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
    t.notOk(manifest(schema).error, 'should not return error');
    t.end();
});

tap.test('manifest.schema - css object is missing value', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
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
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - js object is missing value', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
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
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - js is not an array', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        css: [],
        js: '',
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - css contain illegal types', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        css: [1, true],
        js: [],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - js is not an array', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
        css: [],
        js: [[], false],
        proxy: {
            a: 'http://www.finn.no/foo',
        },
        team: 'The A-Team',
    };
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - css and js objects has extra properties', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        fallback: 'http://www.finn.no/fallback',
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

    t.notOk(manifest(schema).error, 'should not return error');

    const res = manifest(schema);
    t.equal(res.value.css[0].foo, 'bar');
    t.equal(res.value.css[1].bar, 'foo');
    t.equal(res.value.js[0].foo, 'bar');
    t.equal(res.value.js[1].bar, 'foo');
    t.end();
});

tap.test('manifest.schema - contains invalid schema', (t) => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    t.ok(manifest(schema).error, 'should return error');
    t.end();
});

tap.test('manifest.schema - schema contains unknown keys', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
        banan: 'likør',
    };
    const res = manifest(schema)
    t.notOk(res.value.banan, 'should strip unknown keys');
    t.end();
});

tap.test('manifest.schema - optional fields not set - should set defaults', (t) => {
    const schema = {
        name: 'foo-bar',
        version: '1.0.0',
        content: 'http://www.finn.no/content',
    };
    const res = manifest(schema)
    t.equal(res.value.fallback, '');
    t.equal(res.value.team, '');
    t.same(res.value.css, []);
    t.same(res.value.js, []);
    t.same(res.value.proxy, {});
    t.end();
});
