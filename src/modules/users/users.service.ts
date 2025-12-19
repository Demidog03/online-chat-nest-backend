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
import { JwtService } from '@nestjs/jwt';
import MESSAGES from '../../lib/constants/messages';
import { UsersProfileResponseDto } from './dto/users-profile.res.dto';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private jwtService: JwtService,
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

    const createdUser = await this.usersRepository.save(newUser);

    const { id, name, email } = createdUser;

    return { id, name, email };

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

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };

    // JWT Tokens - accessToken, refreshToken

    // AUTHENTICATION
    // AUTHORIZATION
  }

  async findById(id: number): Promise<Users | null> {
    // SELECT * from USERS where id = 1231
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async getProfile(id: number): Promise<UsersProfileResponseDto | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default UsersService;
