import fs from 'fs';
import * as path from 'path'

const readFromJson = async (filename) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, `../jsonData/${filename}.json`)));
}

export { 
    readFromJson,
};