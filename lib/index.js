'use strict';

// fixme: we will move this into a separate package so can be used by
// producers and consumers. Also maybe use jsonschema, so java and
// whatever can use the schema.

const Joi = require('joi');

const contextSchema = Joi
    .object().keys({
        domain: Joi.string().required(),
        baseUrl: Joi.string().required(),
        deviceType: Joi.string().allow('mobile', 'tablet', 'desktop')
            .required(),
        query: Joi.object(),
        token: Joi.string().optional(),
        userId: Joi.string().optional(),
        sessionId: Joi.string().optional(),
        locale: Joi.string().optional()
            .default('nb-NO'),
        cdnHost: Joi.string().optional()
            .default('/'),
        extras: Joi.object()
            .keys({
                cdnHost: Joi.string().optional(),
            })
            .unknown(true),
        traceId: Joi.string().optional(),
        payload: Joi.any(), //fixme decide what to expect here

    })
    .unknown(false);

const contentSchema = Joi
    .object().keys({
        html: Joi.required(), // fixme: should be string, data from podlets are wrong
        debug: Joi.optional(), // fixme: should this be allowed? what is type?
        assetUris: Joi
            .array()
            .items(Joi
                .string()
                .uri()
                .required())
            .optional(),
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
            .default('get')
            .lowercase()
            .optional(),
        params: Joi.array()
            .optional()
            .items(Joi.string()),
    })
    .unknown(false);

const resourceMountEntry = Joi
    .object().keys({
        path: Joi
            .string()
            .required(),
        method: Joi
            .string()
            .default('get')
            .lowercase()
            .optional(),
        params: Joi.array()
            .optional()
            .items(Joi.string()),
        respond: Joi.func(),
    })
    .unknown(false);
const maxAge = Joi
    .number()
    .unit('seconds')
    .min(0)
    .max(60 * 60 * 60)
    .required();

const maxDataAge = Joi
    .number()
    .unit('seconds')
    .min(0)
    .max(60 * 60 * 60)
    .less(Joi.ref('maxAge'))
    .optional();

const metadataSchema = Joi
    .object().keys({
        fallbacks: Joi
            .object()
            .pattern(/.*/, contentSchema),
        fallbackVariations: Joi
            .object()
            .optional(),
        maxDataAge,
        maxAge,
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

const hostOptionsSchema = Joi.object().keys({
    id: Joi.string().required(),
    version: Joi.string().required(),
    options: Joi.object()
        .keys({
            maxAge,
            maxDataAge,
        })
        .default({}),
    entrypoints: Joi.array().items(Joi.string()),
    resources: Joi.array()
        .default([])
        .items(resourceMountEntry),
    prepareContext: Joi.func()
        .default((context/* , req*/) => Promise.resolve(Object.assign({}, context))),
    render: Joi.func().required(),
    fallbackVariations: Joi.object().default({}),
    fallback: Joi.func().required(),
})
.unknown(false);

module.exports.contextSchema = contextSchema;
module.exports.hostOptionsSchema = hostOptionsSchema;
module.exports.metadataSchema = metadataSchema;
module.exports.responseSchema = responseSchema;
module.exports.contentSchema = contentSchema;
