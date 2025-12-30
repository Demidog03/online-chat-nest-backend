import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import UsersService from './users.service';
import { UsersRegisterReqDto } from './dto/users-register.req.dto';
import SETTINGS from '../../lib/constants/settings';
import { UsersLoginReqDto } from './dto/users-login.req.dto';
import { JwtAuthGuard } from '../../lib/guards/jwt-auth.guard';
import { UsersProfileResponseDto } from './dto/users-profile.res.dto';
import { Users } from './users.entity';
import { CurrentUser } from '../../lib/decorators/current-user.decorator';
import { UsersUpdateProfileRequestDto } from './dto/users-updateProfile.req.dto';
import { UsersUpdateProfileResponseDto } from './dto/users-updateProfile.res.dto';

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

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: Users,
    @Body(SETTINGS.VALIDATION_PIPE) body: UsersUpdateProfileRequestDto,
  ): Promise<UsersUpdateProfileResponseDto | null> {
    return await this.usersService.updateProfile(user.id, body);
  }
}
