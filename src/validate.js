import Ajv from 'ajv';
import formats from 'ajv-formats';
import schema from './schema.js';

const createValidator = (jsonSchema, ajvOptions = {
    allowUnionTypes: true,
}) => {
    const ajv = new Ajv(ajvOptions);
    formats(ajv); // Needed to support "uri"
    const validate = ajv.compile({
        $schema: 'http://json-schema.org/draft-07/schema#',
        ...jsonSchema,
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

export const manifest = createValidator(schema, {
    removeAdditional: true,
    allowUnionTypes: true,
    useDefaults: true,
});

export const uriStrict = createValidator({type: 'string', format: 'uri'});
export const fallback = createValidator(schema.properties.fallback);
export const version = withTrimmer(createValidator(schema.properties.version));
export const content = createValidator(schema.properties.content);
export const proxy = createValidator(schema.properties.proxy);
export const team = createValidator(schema.properties.team);
export const name = withTrimmer(createValidator(schema.properties.name));
export const uri = createValidator({type: 'string', format: 'uri-reference', 'minLength': 1});
export const css = createValidator(schema.properties.css);
export const js = createValidator(schema.properties.js);
