import { UserEntity } from 'src/auth/models/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productAmount: number;

  @ManyToOne((type) => UserEntity, (user) => user.products)
  addedBy: UserEntity;
}
