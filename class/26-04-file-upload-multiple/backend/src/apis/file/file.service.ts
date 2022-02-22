import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    //스토리지에 이미지 업로드
    const storage = new Storage({
      keyFilename: process.env.GOOGLE_KEY_FILE_NAME,
      projectId: process.env.GOOGLE_PROJECTID,
    }).bucket(process.env.GOOGLE_BUCKET);

    const waitedFiles = await Promise.all(files); // 파일들이 다 받아질 때까지 기다렸다가

    const result = await Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () =>
              resolve(`/${process.env.GOOGLE_BUCKET}/${file.filename}`),
            ) // on이 뭐야? 분기점
            .on('error', (error) => reject(error));
        });
      }),
    );

    // console.log(file);

    // const result = await axios.post();

    return result;
  }
}
