import { UserEntity } from 'src/auth/models/entity/user.entity';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany((type) => ProductEntity, (product) => product.cart)
  @JoinTable()
  products: ProductEntity[];
}
