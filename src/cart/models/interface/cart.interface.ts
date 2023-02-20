import { UserInterface } from 'src/auth/models/interface/user.interface';
import { ProductInterface } from 'src/product/models/interface/product.interface';

export interface CartInterface {
  id?: number;
  product?: ProductInterface;
  amount?: number;
  user?: UserInterface;
}
