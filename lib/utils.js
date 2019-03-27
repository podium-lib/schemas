'use strict';

// @TODO probably move createValidator here?

const Uri = require('joi/lib/types/string/uri');

// Other alternatives, from ajv: https://github.com/epoberezkin/ajv/blob/d10720734d806fd25606dafd47b64e97ee7d1e7d/lib/compile/formats.js#L39-L42
// const urlFormat = {format: 'uri'}; // 20 tests fail
// const urlFormat = {format: 'uri-reference'}; // 3 tests fail
// const urlFormat = {format: 'url'}; // 20 tests fail
const uriFormat = { type: 'string', pattern: Uri.createUriRegex('http|https', true).source };

module.exports.uriFormat = uriFormat