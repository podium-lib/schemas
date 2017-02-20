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

/**
 * Resouce entries describe resources that a podlet exposes as URLs.
 * For example a recommendations podlet, like the one on the frontpage
 * might have the resources `/realestate-recommendations.json` and
 * `/job-recommendations.json`.
 *
 * Since we want frontend JS, that is code that is running in the browser
 * to know the paths it should communicate with, it becomes important that
 * these resources define paths that will be proxied all the way out to
 * the layout server.
 *
 * What the manifest is really saying is, "the client expects to find
 * a resource on this path". And then any code using the podlet needs
 * to honour this by proxying that exact path.
 *
 * For this reason, we should probably put podlet-id and version in
 * paths.
 */
const resourceEntry = Joi
    .object().keys({
        path: Joi
            .string()
            .required(),
        method: Joi
            .string()
            .default('GET')
            .optional(),
        params: Joi.any(),
    })
    .unknown(false);

const metadataSchema = Joi
    .object().keys({
        fallback: contentSchema,
        maxDataAge: Joi
            .number()
            .unit('seconds')
            .min(0)
            .max(60 * 60 * 60)
            .less(Joi.ref('maxAge'))
            .optional(),
        maxAge: Joi
            .number()
            .unit('seconds')
            .min(0)
            .max(60 * 60 * 60)
            .required(),
        resources: Joi
            .array()
            .items(resourceEntry)
            .optional(),
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
