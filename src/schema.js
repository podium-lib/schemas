import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const schema = join(currentDirectory, '../schema/manifest.schema.json');
const file = fs.readFileSync(schema, 'utf-8');

export default JSON.parse(file);
