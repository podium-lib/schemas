'use strict';

const Ajv = require('ajv');

const manifest = require('./manifest.schema.js');
const hostOptionsSchema = require('./host.schema.js');
const validate = require('./validate')
const schema = require('./manifest.schema.json.js');

// @TODO export the schema so it can be served as JSON, possibly export a static json file as well during deploy

const ajv = new Ajv({removeAdditional: true, useDefaults: true });

module.exports.validate = ajv.compile(schema);

module.exports.validate2 = validate;

// TODO: This is just for compatibility with Podium 3 - it should be removed when migration is complete
module.exports.manifest = manifest;
// TODO: This is just for compatibility with Podium 1 - it should be removed when migration is complete
module.exports.hostOptionsSchema = hostOptionsSchema;
