import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRegisterReqDto } from './dto/users-register.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersLoginReqDto } from './dto/users-login.req.dto';
import MESSAGES from '../../lib/constants/messages';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async register(body: UsersRegisterReqDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.usersRepository.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return await this.usersRepository.save(newUser);

    // INSERT INTO users (name, email, hash(password)) VALUES ('', '', '');
  }

  async login(body: UsersLoginReqDto) {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException(MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    const isPasswordMatch = await user.comparePassword(body.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException(MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // AUTHENTICATION
    // AUTHORIZATION
  }
}

export default UsersService;
