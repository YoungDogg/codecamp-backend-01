import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { getToday } from 'src/common/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

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
          const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
          file
            .createReadStream()
            .pipe(storage.file(fname).createWriteStream())
            .on('finish', () =>
              resolve(`${process.env.GOOGLE_BUCKET}/${fname}`),
            )
            .on('error', (error) => reject(error));
        });
      }),
    );
    return result;
  }
}
