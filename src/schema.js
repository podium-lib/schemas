import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const schema = join(__dirname, '../schema/manifest.schema.json');
const file = fs.readFileSync(schema, 'utf-8');

export default JSON.parse(file);
