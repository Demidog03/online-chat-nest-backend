// Entity - описание/модель таблицы в виде кода
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users', orderBy: { createdAt: 'DESC' } })
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

  // Перед любым создание пользователя хэшируй пароль
  @BeforeInsert()
  async setPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
