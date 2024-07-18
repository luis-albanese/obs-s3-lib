import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  s3BucketUrl: string;
  s3Bucket: string;
}

export function loadConfig(): Config {
  return {
    accessKeyId: process.env.ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    region: process.env.REGION || '',
    s3BucketUrl: process.env.S3_BUCKET_URL || '',
    s3Bucket: process.env.S3_BUCKET || ''
  };
}