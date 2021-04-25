import findUp from 'find-up';
import fs from 'fs';

const schema = findUp.sync('schema/manifest.schema.json');
const file = fs.readFileSync(schema, 'utf-8');

export default JSON.parse(file);
