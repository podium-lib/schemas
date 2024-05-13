import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const schema = join(currentDirectory, '../schema/manifest.schema.json');
const file = fs.readFileSync(schema, 'utf-8');

// The JSON schema is the source of truth.
// The JSDoc typedefs are for buildtime checks and DX.

/**
 * @typedef {object} PodletCssSchema
 * @property {string} value
 * @property {string} [type="text/css"]
 * @property {string} [crossorigin]
 * @property {boolean} [disabled=false]
 * @property {string} [hreflang]
 * @property {string} [title]
 * @property {string} [media]
 * @property {string} [rel="stylesheet"]
 * @property {string} [as]
 * @property {"lazy" | "beforeInteractive" | "afterInteractive"} [strategy]
 * @property {"content" | "fallback" | "all"} [scope]
 */
/**
 * @typedef {object} PodletJavaScriptSchema
 * @property {string} value
 * @property {string} [type]
 * @property {string} [referrerpolicy]
 * @property {string} [crossorigin]
 * @property {string} [integrity]
 * @property {boolean} [nomodule=false]
 * @property {boolean} [async=false]
 * @property {boolean} [defer=false]
 * @property {"lazy" | "beforeInteractive" | "afterInteractive"} [strategy]
 * @property {"content" | "fallback" | "all"} [scope]
 */

/**
 * @typedef {object} PodletProxySchema
 * @property {string} target
 * @property {string} name
 */

/**
 * @typedef {object} PodletManifestSchema
 * @property {string} name
 * @property {string} version
 * @property {string} content
 * @property {string} [fallback=""]
 * @property {Array<PodletJavaScriptSchema>} [js=[]]
 * @property {Array<PodletCssSchema>} [css=[]]
 * @property {Record<string, string> | Array<PodletProxySchema>} [proxy={}]
 * @property {string} [team=""]
 */

export default JSON.parse(file);
