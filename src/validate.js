import { Ajv } from 'ajv';
import formats from 'ajv-formats';
import schema from './schema.js';

/**
 * @typedef {import("./schema.js").PodletManifestSchema} PodletManifestSchema
 * @typedef {import("./schema.js").PodletCssSchema} PodletCssSchema
 * @typedef {import("./schema.js").PodletJavaScriptSchema} PodletJavaScriptSchema
 * @typedef {import("./schema.js").PodletProxySchema} PodletProxySchema
 */

/**
 * @template T
 * @typedef {(data: T) => { value: T; error: false | Array<import('ajv').ErrorObject>; }} PodiumSchemaValidator
 */

/**
 * @template [T=any]
 * @param {object} jsonSchema
 * @param {import('ajv').Options} ajvOptions
 * @returns {PodiumSchemaValidator<T>}
 */
const createValidator = (
    jsonSchema,
    ajvOptions = {
        allowUnionTypes: true,
    },
) => {
    const ajv = new Ajv(ajvOptions);
    // @ts-expect-error It is in fact callable
    formats(ajv); // Needed to support "uri"

    const validate = ajv.compile({
        $schema: 'http://json-schema.org/draft-07/schema#',
        ...jsonSchema,
    });

    /**
     * @type {PodiumSchemaValidator<T>}
     */
    const validator = (data) => {
        const valid = validate(data);
        return { value: data, error: !valid && validate.errors };
    };
    return validator;
};

/**
 * @template [T=any]
 * @param {PodiumSchemaValidator<T>} validator
 * @returns {PodiumSchemaValidator<T>}
 */
const withTrimmer = (validator) => (data) =>
    validator(
        Object.prototype.toString.call(data) === '[object String]'
            ? /** @type {T} */ (/** @type {string} */ (data).trim())
            : data,
    );

/** @type {PodiumSchemaValidator<PodletManifestSchema>} */
export const manifest = createValidator(schema, {
    removeAdditional: true,
    allowUnionTypes: true,
    useDefaults: true,
});

/** @type {PodiumSchemaValidator<string>} */
export const uriStrict = createValidator({ type: 'string', format: 'uri' });

/** @type {PodiumSchemaValidator<string>} */
export const fallback = createValidator(schema.properties.fallback);

/** @type {PodiumSchemaValidator<string>} */
export const version = withTrimmer(createValidator(schema.properties.version));

/** @type {PodiumSchemaValidator<string>} */
export const content = createValidator(schema.properties.content);

/** @type {PodiumSchemaValidator<Record<string, string> | Array<PodletProxySchema>>} */
export const proxy = createValidator(schema.properties.proxy);

/** @type {PodiumSchemaValidator<string>} */
export const team = createValidator(schema.properties.team);

/** @type {PodiumSchemaValidator<string>} */
export const name = withTrimmer(createValidator(schema.properties.name));

/** @type {PodiumSchemaValidator<string>} */
export const uri = createValidator({
    type: 'string',
    format: 'uri-reference',
    minLength: 1,
});

/** @type {PodiumSchemaValidator<Array<PodletCssSchema>>} */
export const css = createValidator(schema.properties.css);

/** @type {PodiumSchemaValidator<Array<PodletJavaScriptSchema>>} */
export const js = createValidator(schema.properties.js);
