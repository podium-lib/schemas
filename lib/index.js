'use strict';

const manifest = require('./manifest.schema.js');
const hostOptionsSchema = require('./host.schema.js');

module.exports.manifest = manifest;
// TODO: This is just for compatibility with Podium 1 - it should be removed when migration is complete
module.exports.hostOptionsSchema = hostOptionsSchema;
