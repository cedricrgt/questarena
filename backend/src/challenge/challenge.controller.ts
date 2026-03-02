import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { JwtAuthGuard } from '../auth-guard/jwt-auth.guard';
import { ChallengeOwnershipGuard } from './challenge-ownership.guard';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create({ ...createChallengeDto });
  }

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ChallengeOwnershipGuard)
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengeService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ChallengeOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
