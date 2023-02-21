import { ProductEntity } from 'src/product/models/entity/product.entity';
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
  products?: ProductEntity[];
}
