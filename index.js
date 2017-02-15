'use strict';

// fixme: we will move this into a separate package so can be used by
// producers and consumers. Also maybe use jsonschema, so java and
// whatever can use the schema.

const Joi = require('joi');

const contentSchema = Joi
    .object().keys({
        html: Joi.string().required(),
        assetId: Joi.string().optional(),
        // fixme: this should be a collection of assets presumably?
        // Keepeing it like this to unbreak other packages. In future,
        // maybe something like
        // assets: Joi.array().items(Joi.string()).optional()
    })
    .unknown(false);

const metadataSchema = Joi
    .object().keys({
        fallback: contentSchema,
        maxAge: Joi
            .number()
            .unit('seconds')
            .min(0)
            .max(60 * 60 * 60)
            .required(),
    })
    .unknown(false);

const responseSchema = Joi
    .object().keys({
        id: Joi.string().required(),
        version: Joi.string().required(),
        data: contentSchema.required(),
        metadata: metadataSchema.optional(),
    })
    .unknown(false);

module.exports.metadataSchema = metadataSchema;
module.exports.responseSchema = responseSchema;
