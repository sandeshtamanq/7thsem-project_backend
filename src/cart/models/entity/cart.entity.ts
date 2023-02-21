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

  @ManyToMany(() => ProductEntity, (product) => product.carts)
  @JoinTable()
  products: ProductEntity[];

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;
}
