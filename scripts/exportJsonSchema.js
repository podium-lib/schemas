'use strict';

/* eslint-disable no-console */

/**
 * Exports the json schema to a manifest.json file.
 * This makes it easier for other tools, on possibly other platforms to use 
 * the same contract everywhere.
 */

const fs = require('fs');
const path = require('path');
const schema = require('../lib/manifest.schema.json.js');

const target = path.resolve(__dirname, '../manifest.json');


fs.writeFile(target, JSON.stringify(schema, null, 2), (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log(`The schema was exported to ./${path.relative(process.cwd(), target)}!`);
}); 