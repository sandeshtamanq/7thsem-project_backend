import { UserEntity } from 'src/auth/models/entity/user.entity';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => ProductEntity, (product) => product.carts, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.cart, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  userId: number;

  @Column()
  productId: number;
}
