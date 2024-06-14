import path from 'path';
import fs from 'fs';
import logger from './LoggerUtil';

export function readJSONFile(filePath: string) {
    const jsonFilePath = path.resolve(process.cwd(), filePath);
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        return jsonData;
    } catch (error) {
        logger.error('Error reading JSON file:', error);
        return null;
    }
}

const jsonData = readJSONFile('src/resources/data/testdata.json');

export function getTestData(environment: string) {
    if (jsonData) {
        const selectedData = jsonData.data.find((item: { env: string }) => item.env === environment);
        return selectedData;
    }
    return null; 
}
logger.info('JSON data read successfully.');

