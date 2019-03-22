'use strict';

const Joi = require('joi');
const manifest = require('../lib/manifest.schema');

const {validate} = require('../lib');

// Ajv unfortunately really really likes to mutate things, I don't like what it's making me do in these tests… - sad developer

const findError = (dataPath) => validate.errors && validate.errors.find(error => error.dataPath === dataPath)

/**
 * .uri
 */

test('manifest.uri - contains absolute URI with http scheme - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/metadata', manifest.uri);
    expect(res.error).toBeFalsy();
});

test('manifest.uri - contains absolute URI with https scheme - should not return error', () => {
    const res = Joi.validate('https://www.finn.no/metadata', manifest.uri);
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

    validate({name: '123-FOO_bar'})
    expect(findError('.name')).toBeFalsy()
});

test('manifest.name - empty - should return error', () => {
    const res = Joi.validate('', manifest.name);
    expect(res.error).toBeTruthy();

    validate({name: ''})
    expect(findError('.name')).toBeTruthy()
});

test('manifest.name - contains illegal characters - should return error', () => {
    const res = Joi.validate('foo~bar', manifest.name);
    expect(res.error).toBeTruthy();

    validate({name: 'foo~bar'})
    expect(findError('.name')).toBeTruthy()
});

test('manifest.name - not String - should return error', () => {
    const res = Joi.validate(123, manifest.name);
    expect(res.error).toBeTruthy();

    validate({name: 123})
    expect(findError('.name')).toBeTruthy()
});

test('manifest.name - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' abc ', manifest.name);
    expect(res.value).toBe('abc');

    const data = {name: ' abc '}
    validate(data)
    expect(findError('.name')).toBeFalsy()
    expect(data.name).toBe('abc');
});

/**
 * .version
 */

test('manifest.version - contains String value - should not return error', () => {
    const res = Joi.validate('1.0.0-beta-1', manifest.version);
    expect(res.error).toBeFalsy();

    validate({version: '1.0.0-beta-1'})
    expect(findError('.version')).toBeFalsy()
});

test('manifest.version - empty - should return error', () => {
    const res = Joi.validate('', manifest.version);
    expect(res.error).toBeTruthy();

    validate({version: ''})
    expect(findError('.version')).toBeTruthy()
});

test('manifest.version - not String - should return error', () => {
    const res = Joi.validate(123, manifest.version);
    expect(res.error).toBeTruthy();

    validate({version: 123})
    expect(findError('.version')).toBeTruthy()
});

test('manifest.version - has trailing spaces - should trim trailingspaces', () => {
    const res = Joi.validate(' 1.0.0-beta-1 ', manifest.version);
    expect(res.value).toBe('1.0.0-beta-1');

    const data = {version: ' 1.0.0-beta-1 '}
    validate(data)
    expect(findError('.version')).toBeFalsy()
    expect(data.version).toBe('1.0.0-beta-1');
});

/**
 * .content
 */

test('manifest.content - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/content', manifest.content);
    expect(res.error).toBeFalsy();

    validate({content: 'http://www.finn.no/content'})
    expect(findError('.content')).toBeFalsy()
});

test('manifest.content - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/content', manifest.content);
    expect(res.error).toBeFalsy();

    validate({content: '/content'})
    expect(findError('.content')).toBeFalsy()
});

test('manifest.content - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.content);
    expect(res.error).toBeTruthy();

    validate({content: '<section>banan</section>'})
    expect(findError('.content')).toBeTruthy()
});

test('manifest.content - empty - should return error', () => {
    const res = Joi.validate('', manifest.content);
    expect(res.error).toBeTruthy();

    validate({content: ''})
    expect(findError('.content')).toBeTruthy()
});

test('manifest.content - not String - should return error', () => {
    const res = Joi.validate(123, manifest.content);
    expect(res.error).toBeTruthy();

    validate({content: 123})
    expect(findError('.content')).toBeTruthy()
});

/**
 * .fallback
 */

test('manifest.fallback - contains absolute URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    validate({fallback: 'http://www.finn.no/fallback'})
    expect(findError('.fallback')).toBeFalsy()
});

test('manifest.fallback - contains relative URI value - should not return error', () => {
    const res = Joi.validate('/fallback', manifest.fallback);
    expect(res.error).toBeFalsy();

    validate({fallback: '/fallback'})
    expect(findError('.fallback')).toBeFalsy()
});

test('manifest.fallback - empty - should not return error', () => {
    const res = Joi.validate('', manifest.fallback);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = {fallback: ''}
    validate(data)
    expect(data.fallback).toBe('')
    expect(findError('.fallback')).toBeFalsy()
});

test('manifest.fallback - contains String value - should return error', () => {
    const res = Joi.validate('<section>banan</section>', manifest.fallback);
    expect(res.error).toBeTruthy();

    validate({fallback: '<section>banan</section>'})
    expect(findError('.fallback')).toBeTruthy()
});

test('manifest.fallback - not String - should return error', () => {
    const res = Joi.validate(123, manifest.fallback);
    expect(res.error).toBeTruthy();

    validate({fallback: 123})
    expect(findError('.fallback')).toBeTruthy()
});

/**
 * .js
 */

test('manifest.js - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/js', manifest.js);
    expect(res.error).toBeFalsy();

    validate({js: 'http://www.finn.no/js'})
    expect(findError('.js')).toBeFalsy()
});

test('manifest.js - empty - should not return error', () => {
    const res = Joi.validate('', manifest.js);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = {js: ''}
    validate(data)
    expect(data.js).toBe('')
    expect(findError('.js')).toBeFalsy()
});

/**
 * .css
 */

test('manifest.css - contains legal URI value - should not return error', () => {
    const res = Joi.validate('http://www.finn.no/css', manifest.css);
    expect(res.error).toBeFalsy();

    validate({css: 'http://www.finn.no/css'})
    expect(findError('.css')).toBeFalsy()
});

test('manifest.css - empty - should not return error', () => {
    const res = Joi.validate('', manifest.css);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = {css: ''}
    validate(data)
    expect(data.css).toBe('')
    expect(findError('.css')).toBeFalsy()
});

/**
 * .proxy
 */

test('manifest.proxy - empty object - should not return error', () => {
    const res = Joi.validate({}, manifest.proxy);
    expect(res.error).toBeFalsy();

    validate({proxy: {}})
    expect(findError('.proxy')).toBeFalsy()
});

test('manifest.proxy - not object - should return error', () => {
    const res = Joi.validate('foo', manifest.proxy);
    expect(res.error).toBeTruthy();

    validate({proxy: 'foo'})
    expect(findError('.proxy')).toBeTruthy()
});

test('manifest.proxy - proxy item is absolute url - should not return error', () => {
    const item = {
        a: 'http://www.finn.no/foo',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    validate({proxy: item})
    expect(findError('.proxy')).toBeFalsy()
});

test('manifest.proxy - proxy item is relative url - should not return error', () => {
    const item = {
        a: '/foo/bar',
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeFalsy();

    validate({proxy: item})
    expect(findError('.proxy')).toBeFalsy()
});

test('manifest.proxy - proxy item is not a url - should return error', () => {
    const item = {
        a: [undefined],
    };
    const res = Joi.validate(item, manifest.proxy);
    expect(res.error).toBeTruthy();

    validate({proxy: item})
    expect(findError('.proxy')).toBeTruthy()
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

    validate({proxy: item})
    expect(findError('.proxy')).toBeTruthy()
});

/**
 * .team
 */

test('manifest.team - contains String value - should not return error', () => {
    const res = Joi.validate('Bananas', manifest.team);
    expect(res.error).toBeFalsy();

    validate({team: 'Bananas'})
    expect(findError('.team')).toBeFalsy()
});

test('manifest.team - empty - should not return error', () => {
    const res = Joi.validate('', manifest.team);
    expect(res.value).toBe('');
    expect(res.error).toBeFalsy();

    const data = {team: ''}
    validate(data)
    expect(data.team).toBe('')
    expect(findError('.team')).toBeFalsy()
});

test('manifest.team - not String - should return error', () => {
    const res = Joi.validate(123, manifest.team);
    expect(res.error).toBeTruthy();

    validate({team: 123})
    expect(findError('.team')).toBeTruthy()
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

    validate(schema)
    expect(validate.errors).toBeFalsy()
});

test('manifest.schema - contains invalid schema - should return error', () => {
    const schema = {
        version: 1,
        team: 'The A-Team',
    };
    const res = Joi.validate(schema, manifest.schema);
    expect(res.error).toBeTruthy();

    validate(schema)
    expect(validate.errors).toBeTruthy()
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

    validate(schema)
    expect(schema.banan).toBeFalsy()
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

    validate(schema)
    expect(schema.fallback).toBe('');
    expect(schema.team).toBe('');
    expect(schema.assets.css).toBe('');
    expect(schema.assets.js).toBe('');
    expect(schema.proxy).toEqual({});
});
