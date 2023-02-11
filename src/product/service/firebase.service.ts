import { Injectable } from '@nestjs/common';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
  firebaseConfig,
  initializeFirebaseApp,
} from 'src/firebase/firebase.config';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FirebaseService {
  async uploadFile(file: Express.Multer.File, path: string) {
    const name = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    const fileName = `${uuidv4()}${name}.${fileExtension}`;
    const storage = getStorage(initializeFirebaseApp(firebaseConfig));
    const fileRef = ref(storage, `${path}/${fileName}`);
    const metaData = {
      contentType: 'image/jpeg',
    };

    const uploaded = await uploadBytesResumable(fileRef, file.buffer, metaData);

    // const url = await getDownloadURL(uploaded.metadata.fullPath)
    return `https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/${path}%2F${uploaded.metadata.name}?alt=media&token=2eeca2b8-483f-4953-ac5d-b8c594f9b4ee`;
  }
}
