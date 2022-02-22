import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  file: FileUpload;
}

@Injectable()
export class FileService {
  async upload({ file }: IFile) {
    //스토리지에 이미지 업로드
    const storage = new Storage({
      keyFilename: 'gcp-file-storage.json',
      projectId: 'codecampproj',
    })
      .bucket('codecamp_bucket')
      .file(file.filename);

    // console.log(file);

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.createWriteStream())
        .on('finish', () => resolve(`/codecamp_bucket/${file.filename}`)) // on이 뭐야?
        .on('error', (error) => reject(error));
    });

    // const result = await axios.post();

    return result;
  }
}
