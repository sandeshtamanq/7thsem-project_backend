import { CartEntity } from 'src/cart/models/entity/cart.entity';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import { ReviewEntity } from 'src/product/models/entity/review.entity';
import { SearchEntity } from 'src/search/models/entity/search.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRoles } from '../interface/user.roles';
import { OrderEntity } from 'src/order/models/entity/order.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'bigint' })
  contactNumber: number;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.addedBy)
  products: ProductEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];

  @OneToMany(() => SearchEntity, (search) => search.user)
  searches: SearchEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
