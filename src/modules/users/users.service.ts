import { Injectable } from '@nestjs/common';
import { UsersRegisterReqDto } from './dto/users-register.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async register(body: UsersRegisterReqDto) {
    const newUser = this.usersRepository.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return await this.usersRepository.save(newUser);

    // INSERT INTO users (name, email, password) VALUES ('', '', '');
  }
}

export default UsersService;
