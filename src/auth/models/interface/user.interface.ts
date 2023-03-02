import { CartInterface } from 'src/cart/models/interface/cart.interface';
import { ProductInterface } from 'src/product/models/interface/product.interface';
import { UserRoles } from './user.roles';

export interface UserInterface {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: number;
  password?: string;
  address?: string;
  role?: UserRoles;
  createdAt?: Date;
  products?: ProductInterface[];
  cart?: CartInterface[];
}
