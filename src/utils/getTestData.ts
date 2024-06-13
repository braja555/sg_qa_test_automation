import path from 'path';
import fs from 'fs';

export function readJSONFile(filePath: string) {
    // Resolve the path relative to the main script file to ensure portability
    const jsonFilePath = path.resolve(process.cwd(), filePath);
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        return jsonData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

const jsonData = readJSONFile('src/resources/data/testdata.json');

export function getTestData(environment: string) {
    if (jsonData) {
        const selectedData = jsonData.data.find((item: { env: string }) => item.env === environment);
        return selectedData;
    }
    return null; // Return null if JSON data is not available
}
