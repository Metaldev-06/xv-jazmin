const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathEnv = './src/environments/environment.development.ts';

const cloudinaryName = process.env['CLOUDINARY_NAME'];
const cloudinaryKey = process.env['CLOUDINARY_KEY'];
const cloudinarySecret = process.env['CLOUDINARY_SECRET'];
const baseUrl = process.env['BASE_URL'];

if (!cloudinaryName || !cloudinaryKey || !cloudinarySecret) {
  throw new Error('CLOUDINARY credentials are not set in the environment variables.');
}

const envFileContent = `
export const environment = {
  CLOUDINARY_NAME="${cloudinaryName}",
  CLOUDINARY_KEY="${cloudinaryKey}",
  CLOUDINARY_SECRET="${cloudinarySecret}",
  baseUrl: "${baseUrl}",
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
writeFileSync(targetPathEnv, envFileContent, { encoding: 'utf8' });
