import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRoles } from '../interface/user.roles';

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
  role: string;

  @Column({ nullable: true })
  address: string;
}
