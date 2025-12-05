import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User management
  @Post('users')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id/block')
  blockUser(@Param('id') id: string) {
    return this.adminService.blockUser(id);
  }

  @Patch('users/:id/unblock')
  unblockUser(@Param('id') id: string) {
    return this.adminService.unblockUser(id);
  }

  @Patch('users/:id/reset-password')
  resetUserPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.adminService.resetUserPassword(id, resetPasswordDto.newPassword);
  }

  // Password reset requests
  @Get('password-requests')
  getPasswordResetRequests() {
    return this.adminService.getPasswordResetRequests();
  }

  @Patch('password-requests/:id/approve')
  approvePasswordResetRequest(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.adminService.approvePasswordResetRequest(id, resetPasswordDto.newPassword);
  }

  @Patch('password-requests/:id/reject')
  rejectPasswordResetRequest(@Param('id') id: string) {
    return this.adminService.rejectPasswordResetRequest(id);
  }

  // Challenge management
  @Get('challenges')
  getAllChallenges() {
    return this.adminService.getAllChallenges();
  }

  @Delete('challenges/:id')
  deleteChallenge(@Param('id') id: string) {
    return this.adminService.deleteChallenge(id);
  }

  // Participation management
  @Get('participations')
  getAllParticipations() {
    return this.adminService.getAllParticipations();
  }

  @Delete('participations/:id')
  deleteParticipation(@Param('id') id: string) {
    return this.adminService.deleteParticipation(id);
  }
}
