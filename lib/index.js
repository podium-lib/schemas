'use strict';

const Ajv = require('ajv');

const manifest = require('./manifest.schema.js');
const hostOptionsSchema = require('./host.schema.js');
const schema = require('./manifest.schema.json.js');

const ajv = new Ajv({removeAdditional: true, useDefaults: true });

module.exports.validate = ajv.compile(schema);
// TODO: This is just for compatibility with Podium 3 - it should be removed when migration is complete
module.exports.manifest = manifest;
// TODO: This is just for compatibility with Podium 1 - it should be removed when migration is complete
module.exports.hostOptionsSchema = hostOptionsSchema;
