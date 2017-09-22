'use strict';

const Joi = require('joi');


/**
  * Schema for common "uri"
  */

const uri = Joi.string().uri({ scheme: ['http'], allowRelative: true });


/**
  * Schema for "name"
  * Regex: https://regexper.com/#%2F%5E%5Ba-zA-Z0-9_-%5D%7B2%2C100%7D%24%2F
  */

const name = Joi.string().regex(/^[a-zA-Z0-9_-]{2,100}$/).trim().required();


/**
  * Schema for "version"
  */

const version = Joi.string().trim().required();


/**
  * Schema for "content"
  * Defined to be both a URI to a content resource and a String with content
  */

const content = Joi.string().required();


/**
  * Schema for "fallback"
  * Defined to be both a URI to a fallback content resource and a String with
  * fallback content
  */

const fallback = Joi.string().optional();


/**
  * Schema for "js"
  */

const js = uri.optional();


/**
  * Schema for "css"
  */

const css = uri.optional();


/**
  * Schema for "team"
  */

const team = Joi.string().optional();


/**
  * Schema for "team"
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
            .optional(),
        team,
    })
    .options({ stripUnknown: true });

module.exports.uri = uri;

module.exports._name = name;
module.exports._version = version;
module.exports._content = content;
module.exports._fallback = fallback;
module.exports._js = js;
module.exports._css = css;
module.exports._team = team;
