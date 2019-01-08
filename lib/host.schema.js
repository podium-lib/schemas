'use strict';

const Joi = require('joi');

const hostOptionsSchema = Joi.object()
    .keys({
        name: Joi.string().required(),
        version: Joi.string().required(),
        entrypoints: Joi.array().items(Joi.string()),
        ajaxRouter: Joi.func().optional(),
        prepareContext: Joi.func().default((context /* , req, res */) =>
            Promise.resolve(Object.assign({}, context)),
        ),
        render: Joi.func().required(),
        fallback: Joi.func().required(),
    })
    .unknown(false);

module.exports = hostOptionsSchema;
