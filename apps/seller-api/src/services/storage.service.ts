import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer, { Multer } from 'multer';
import multerS3 from 'multer-s3';
import { Request } from 'express';
import { config as dotenvConfig } from 'dotenv';
import { usertokentype } from '@ecommerce/types';

dotenvConfig();

const config = {
  region: 'ap-south-1',
  bucketName: 'jobboardprojects3',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
};

class MediaService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      apiVersion: 'v4',
    });
  }

  public createMulterMiddleware(): Multer {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: config.bucketName,
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req: Request, file, cb) => {
          console.log('multer middleware', req.body, req.files);
          const usertoken: usertokentype = req['user'];
          const userid = usertoken.id;
          const fileName = `${userid}/${file.originalname}`;
          cb(null, fileName);
        },
      }),
    });
  }

  public async uploadFileToS3(file: Express.Multer.File, userid: string) {
    const key = `${userid}/${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const result = await this.s3.send(command);
    return {
      result,
      key,
      url: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${key}`,
    };
  }

  public async saveFile(file: Express.Multer.File, userid: string) {
    const uploadedFile = await this.uploadFileToS3(file, userid);
    return uploadedFile;
  }
}
export default MediaService;
