'use strict';

// fixme: we will move this into a separate package so can be used by
// producers and consumers. Also maybe use jsonschema, so java and
// whatever can use the schema.

const manifest = require('./manifest.schema.js');
const Joi = require('joi');

const responseSchema = Joi.object().keys({
    name: Joi.string().required(),
    version: Joi.string().required(),
    hash: Joi.string().required(),
});

const hostOptionsSchema = Joi.object()
    .keys({
        name: Joi.string().required(),
        version: Joi.string().required(),
        entrypoints: Joi.array().items(Joi.string()),
        ajaxRouter: Joi.func().optional(),
        prepareContext: Joi.func().default((context /* , req, res*/) =>
            Promise.resolve(Object.assign({}, context))
        ),
        render: Joi.func().required(),
        fallback: Joi.func().required(),
    })
    .unknown(false);

module.exports.hostOptionsSchema = hostOptionsSchema;
module.exports.responseSchema = responseSchema;
module.exports.manifest = manifest;
