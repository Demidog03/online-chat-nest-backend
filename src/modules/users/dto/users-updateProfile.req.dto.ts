import { IsNotEmpty } from 'class-validator';

export class UsersUpdateProfileRequestDto {
  @IsNotEmpty()
  name: string;
}
