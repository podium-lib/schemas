'use strict';

const Ajv = require('ajv');
const manifestSchema = require('./manifest.schema.json');

const createValidator = (schema, ajvOptions) => {
    const ajv = new Ajv(ajvOptions);
    const validate = ajv.compile({
        $schema: 'http://json-schema.org/draft-07/schema#',
        ...schema,
    });

    return data => {
        const valid = validate(data);
        return { value: data, error: !valid && validate.errors };
    };
};
const withTrimmer = validator => data =>
    validator(
        Object.prototype.toString.call(data) === '[object String]'
            ? data.trim()
            : data,
    );

const manifest = createValidator(manifestSchema, {
    removeAdditional: true,
    useDefaults: true,
});
const uriStrict = createValidator({type: 'string', format: 'uri'})
const uri = createValidator({type: 'string', format: 'uri-reference', 'minLength': 1})
const name = withTrimmer(createValidator(manifestSchema.properties.name));
const version = withTrimmer(createValidator(manifestSchema.properties.version));
const content = createValidator(manifestSchema.properties.content);
const fallback = createValidator(manifestSchema.properties.fallback);
const js = createValidator(manifestSchema.properties.assets.properties.js);
const css = createValidator(manifestSchema.properties.assets.properties.css);
const proxy = createValidator(manifestSchema.properties.proxy);
const team = createValidator(manifestSchema.properties.team);

module.exports.manifest = manifest;
module.exports.uriStrict = uriStrict;
module.exports.uri = uri;
module.exports.name = name;
module.exports.version = version;
module.exports.content = content;
module.exports.fallback = fallback;
module.exports.js = js;
module.exports.css = css;
module.exports.proxy = proxy;
module.exports.team = team;
