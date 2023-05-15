import { UserEntity } from '../../../auth/models/entity/user.entity';
import { ProductEntity } from 'src/product/models/entity/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentMode {
  CASHONDELIVER = 'cash on delivery',
  KHALTI = 'khalti',
  ESEWA = 'esewa',
}

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => ProductEntity, { cascade: true })
  @JoinTable()
  products: ProductEntity[];

  @Column()
  amount: number;

  @Column({ default: false })
  payment: boolean;

  @Column({ default: PaymentMode.CASHONDELIVER })
  paymentMode: PaymentMode;

  @Column()
  totalSum: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column()
  userId: number;
}
