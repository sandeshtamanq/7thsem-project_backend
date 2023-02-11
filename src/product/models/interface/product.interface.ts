import { UserInterface } from 'src/auth/models/interface/user.interface';
import { BrandInterface } from 'src/brand/models/interface/brand.interface';

export interface ProductInterface {
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productAmount?: number;
  addedBy?: UserInterface;
  productImage?: string;
  brandName?: BrandInterface;
}