'use strict';

const Joi = require('joi');

/**
 * Schema for common "uri"
 */

const uri = Joi.string().uri({
    scheme: ['http', 'https'],
    allowRelative: true,
});

/**
 * Schema for "name"
 * Regex: https://regexper.com/#%2F%5E%5Ba-zA-Z0-9_-%5D%7B2%2C100%7D%24%2F
 */

const name = Joi.string()
    .regex(/^[a-zA-Z0-9_-]{2,100}$/)
    .trim()
    .required();

/**
 * Schema for "version"
 */

const version = Joi.string()
    .trim()
    .required();

/**
 * Schema for "content"
 */

const content = uri.required();

/**
 * Schema for "fallback"
 */

const fallback = uri
    .optional()
    .allow('')
    .default('');

/**
 * Schema for "js"
 */

const js = uri
    .optional()
    .allow('')
    .default('');

/**
 * Schema for "css"
 */

const css = uri
    .optional()
    .allow('')
    .default('');

/**
 * Schema for "team"
 */

const team = Joi.string()
    .optional()
    .allow('')
    .default('');

/**
 * Schema for "proxyItem"
 */

const proxyItem = Joi.object()
    .keys({
        pathname: Joi.string()
            .uri({ relativeOnly: true })
            .required(),
        href: uri.required(),
    })
    .options({ stripUnknown: true });

/**
 * Schema for "proxy"
 */

const proxy = Joi.array()
    .max(4)
    .items(proxyItem)
    .optional()
    .default([]);

/**
 * Schema for the complete "manifest"
 */

module.exports.schema = Joi.object()
    .keys({
        name,
        version,
        content,
        fallback,
        assets: Joi.object()
            .keys({
                js,
                css,
            })
            .optional()
            .default({
                js: '',
                css: '',
            }),
        proxy,
        team,
    })
    .options({ stripUnknown: true });

module.exports.uri = uri;
module.exports.name = name;
module.exports.version = version;
module.exports.content = content;
module.exports.fallback = fallback;
module.exports.js = js;
module.exports.css = css;
module.exports.proxyItem = proxyItem;
module.exports.proxy = proxy;
module.exports.team = team;
