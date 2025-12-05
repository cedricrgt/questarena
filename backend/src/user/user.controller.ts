import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthentificationService } from '../authentification/authentification.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthentificationService,
  ) {}

  @Get('search')
  search(@Query('q') query: string) {
    return this.userService.searchUsers(query);
  }

  @Get('leaderboard')
  leaderboard(@Query('limit') limit?: string) {
    const top = limit ? parseInt(limit) : 10;
    return this.userService.getLeaderboard(top);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const userCreateInput = {
      ...createUserDto,
      password_hash: createUserDto.password,
    };
    return this.userService.create(userCreateInput);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Headers('authorization') authHeader: string,
  ) {
    // Verify user is authenticated and is changing their own password
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    const decodedToken = await this.authService.decodeToken(token);

    if (decodedToken.id !== id) {
      throw new UnauthorizedException(
        'Vous ne pouvez modifier que votre propre mot de passe',
      );
    }

    return this.userService.changePassword(
      id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

