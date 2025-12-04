// Entity - описание/модель таблицы в виде кода
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users', orderBy: { createAt: 'DESC' } })
export class Users extends BaseEntity {
  // Автоинкрементный первичный ключ
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Колонну для отображения даты создания
  @CreateDateColumn()
  createdAt: Date;

  // Колонну для отображения даты обновления
  @UpdateDateColumn()
  updatedAt: Date;
}
