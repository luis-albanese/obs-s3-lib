import { 
  S3Client as S3, 
  GetObjectCommand, 
  ListObjectsV2Command, 
  PutObjectCommand, 
  DeleteObjectCommand 
} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { Config } from './config';

export class S3Client {
  private s3Client: S3;

  constructor(private config: Config) {
    this.s3Client = new S3({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      endpoint: config.s3BucketUrl,
    });
  }

  getFileUrl(key: string): string {
    return `${this.config.s3BucketUrl}/${key}`;
  }

  async uploadFile(localFilePath: string, s3Key: string): Promise<void> {
    const fileStream = fs.createReadStream(localFilePath);
    const uploadCommand = new PutObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: s3Key,
      Body: fileStream,
    });
    await this.s3Client.send(uploadCommand);
  }

  async downloadFile(s3Key: string, localFilePath: string): Promise<void> {
    const fileStream = fs.createWriteStream(localFilePath);
    const getObjectCommand = new GetObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: s3Key,
    });
    const data = await this.s3Client.send(getObjectCommand);
    const streamToString = async (stream: any) => {
      return new Promise((resolve, reject) => {
        let result = '';
        stream.on('data', (chunk: any) => {
          result += chunk.toString();
        });
        stream.on('end', () => {
          resolve(result);
        });
        stream.on('error', (err: any) => {
          reject(err);
        });
      });
    };
    const fileContent = await streamToString(data.Body);
    fileStream.write(fileContent);
    fileStream.end();
  }

  async listObjects(prefix: string): Promise<string[]> {
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: this.config.s3Bucket,
      Prefix: prefix,
    });
    const data = await this.s3Client.send(listObjectsCommand);
    return data.Contents?.map(obj => obj.Key || '') || [];
  }

  async deleteS3Object(key: string): Promise<void> {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: key,
    });
    await this.s3Client.send(deleteObjectCommand);
  }
}