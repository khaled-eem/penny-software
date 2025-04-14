import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

const apiUrl = process.env.NG_APP_API_URL || '';

const envFile = `
export const environment = {
  production: false,
  apiUrl: '${apiUrl}'
};
`;

writeFileSync(join(__dirname, '../apps/frontend/src/environments/environment.ts'), envFile);

console.log(' environment.ts generated from .env');
