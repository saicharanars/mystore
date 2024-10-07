import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config as dotenvConfig } from 'dotenv';
import sharp from 'sharp';
dotenvConfig();

const config = {
  region: 'ap-south-1',
  bucketName: 'mystore-s3',
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

  public async resizeImage(file: Express.Multer.File) {
    const buffer = await sharp(file.buffer)
      .toFormat('avif', { quality: 50 })
      .toBuffer();
    return buffer;
  }

  public async uploadFileToS3(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    userId: string
  ) {
    const modifiedFileName = fileName
      .replace(/\s+/g, '-')
      .replace(/[^\w.-]/g, '');

    const fileNameWithoutExt = modifiedFileName
      .split('.')
      .slice(0, -1)
      .join('.');
    const key = `${userId}/${fileNameWithoutExt}.avif`;

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: fileBuffer, // Upload the buffer
      ACL: 'public-read',
      ContentType: mimeType,
    });

    console.log('Uploading file to S3 with key:', key);
    const result = await this.s3.send(command);

    return {
      result,
      key,
      url: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${key}`,
    };
  }

  public async saveFile(file: Express.Multer.File, userid: string) {
    const resizedImage = await this.resizeImage(file);

    const bufferToUpload = resizedImage || file.buffer;

    const uploadedFile = await this.uploadFileToS3(
      bufferToUpload,
      file.originalname,
      file.mimetype,
      userid
    );

    console.log('File successfully saved to S3:', uploadedFile.url);
    return uploadedFile;
  }
}

export default MediaService;
