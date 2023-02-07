import { ProductEntity } from 'src/product/models/entity/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'brands' })
@Unique(['brandName'])
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brandName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany((type) => ProductEntity, (product) => product.brandName)
  products: ProductEntity[];

  @BeforeInsert()
  capitalize() {
    let temp = this.brandName;
    temp = temp.charAt(0).toUpperCase() + temp.slice(1);
    this.brandName = temp;
  }
}
