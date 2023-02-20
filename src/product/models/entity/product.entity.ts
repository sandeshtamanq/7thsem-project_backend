import { UserEntity } from 'src/auth/models/entity/user.entity';
import { BrandEntity } from 'src/brand/models/entity/brand.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productAmount: number;

  @Column()
  productImage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne((type) => UserEntity, (user) => user.products)
  addedBy: UserEntity;

  @ManyToOne((type) => BrandEntity, (brand) => brand.products, {
    onDelete: 'CASCADE',
  })
  brandName: BrandEntity;
<<<<<<< HEAD

  @ManyToMany((type) => CartEntity, (cart) => cart.products)
  carts: CartEntity[];
=======
>>>>>>> parent of ad307e2... cart module added with GET and POST requests
}
