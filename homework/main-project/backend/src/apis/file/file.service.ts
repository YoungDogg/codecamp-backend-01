import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: process.env.GOOGLE_KEY_FILE_NAME,
      projectId: process.env.GOOGLE_PROJECTID,
    }).bucket(process.env.GOOGLE_BUCKET);

    const waitedFiles = await Promise.all(files);

    const result = await Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () =>
              resolve(`${process.env.GOOGLE_BUCKET}/${file.filename}`),
            )
            .on('error', (error) => reject(error));
        });
      }),
    );
    return result;
  }
}
