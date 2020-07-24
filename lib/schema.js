import path from 'path';
import url from 'url';
import fs from 'fs';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const file = fs.readFileSync(path.resolve(dirname, 'manifest.schema.json'), 'utf-8');
export default JSON.parse(file);
