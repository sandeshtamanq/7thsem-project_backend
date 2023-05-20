import { UserEntity } from 'src/auth/models/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'searches' })
export class SearchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  search: string;

  @ManyToOne(() => UserEntity, (user) => user.searches, { onDelete: 'CASCADE' })
  user: UserEntity[];

  @Column()
  userId: number;
}
