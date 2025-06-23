import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Get('leaderboard')
  leaderboard(@Query('limit') limit?: string){
    const top = limit ? parseInt(limit) : 10;
    return this.userService.getLeaderboard(top)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }

 
}
