// DTO - Data Transfer Object - определяет структуру и валидацию данных транзакции (request, response)
// Интерфейс в котором можно делать валидацию
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import REGEX from '../../../lib/constants/regex';
import MESSAGES from '../../../lib/constants/messages';

export class UsersRegisterReqDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  confirmPassword: string;
}
