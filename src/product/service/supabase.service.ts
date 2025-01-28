import { Injectable } from '@nestjs/common';
import uuidv4 from '../../utils/uuidv4';
import { supabase } from '../../supabase/supabase.config';

@Injectable()
export class SupabaseService {
  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    const name = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    const fileName = `${uuidv4()}${name}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME) // Replace with your bucket name
      .upload(`${path}/${fileName}`, file.buffer);

    console.log('error', error);
    if (error !== null) {
      throw Error();
    }
    console.log(data);
    return `https://ybonnsfzftauatzjnirb.supabase.co/storage/v1/object/public/${data.fullPath}`;
  }
}
