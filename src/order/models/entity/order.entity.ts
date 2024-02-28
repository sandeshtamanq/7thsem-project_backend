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
import { PaymentMode } from './paymentmode.enum';

export enum DeliveryStatus {
  DELIVERED = 'delivered',
  PENDING = 'pending',
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

  @Column({ default: PaymentMode.CASHONDELIVERY })
  paymentMode: PaymentMode;

  @Column()
  totalSum: number;

  @Column({ nullable: true })
  pidx: string;

  @Column({ default: DeliveryStatus.PENDING })
  deliveryStatus: DeliveryStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  userId: number;
}
