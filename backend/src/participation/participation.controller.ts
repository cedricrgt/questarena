import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { JwtAuthGuard } from '../auth-guard/jwt-auth.guard';
import { ParticipationOwnershipGuard } from './participation-ownership.guard';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createParticipationDto: CreateParticipationDto, @Req() req) {
    return this.participationService.create({
      ...createParticipationDto,
      user_id: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.participationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ParticipationOwnershipGuard)
  update(
    @Param('id') id: string,
    @Body() updateParticipationDto: UpdateParticipationDto,
  ) {
    return this.participationService.update(id, updateParticipationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ParticipationOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.participationService.remove(id);
  }
}
