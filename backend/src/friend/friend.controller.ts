import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from '../auth-guard/jwt-auth.guard';

@Controller('friend')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  getFriends(@Request() req) {
    return this.friendService.getFriends(req.user.id);
  }

  @Post(':friendId')
  addFriend(@Request() req, @Param('friendId') friendId: string) {
    return this.friendService.addFriend(req.user.id, friendId);
  }

  @Delete(':friendId')
  removeFriend(@Request() req, @Param('friendId') friendId: string) {
    return this.friendService.removeFriend(req.user.id, friendId);
  }

  @Get('status/:friendId')
  getFriendshipStatus(@Request() req, @Param('friendId') friendId: string) {
    return this.friendService.getFriendshipStatus(req.user.id, friendId);
  }
}
