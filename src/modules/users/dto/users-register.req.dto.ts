// DTO - Data Transfer Object - определяет структуру и валидацию данных транзакции (request, response)
// Интерфейс в котором можно делать валидацию
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class UsersRegisterReqDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  confirmPassword: string;
}
