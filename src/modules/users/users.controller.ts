import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import UsersService from './users.service';
import { UsersRegisterReqDto } from './dto/users-register.req.dto';
import SETTINGS from '../../lib/constants/settings';
import { UsersLoginReqDto } from './dto/users-login.req.dto';
import { JwtAuthGuard } from '../../lib/guards/jwt-auth.guard';
import { UsersProfileResponseDto } from './dto/users-profile.res.dto';
import { Users } from './users.entity';
import { CurrentUser } from '../../lib/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async register(
    @Body(SETTINGS.VALIDATION_PIPE)
    body: UsersRegisterReqDto,
  ) {
    return await this.usersService.register(body);
  }

  @Post('/login')
  async login(
    @Body(SETTINGS.VALIDATION_PIPE)
    body: UsersLoginReqDto,
  ) {
    return await this.usersService.login(body);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUser() user: Users,
  ): Promise<UsersProfileResponseDto | null> {
    return await this.usersService.getProfile(user.id);
  }
}
