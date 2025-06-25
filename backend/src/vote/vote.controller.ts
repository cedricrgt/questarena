import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth.guard';
import { VoteOwnershipGuard } from './vote-ownership.guard';
import { CheckVoteDto } from './dto/check-vote.dto';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}


   @Get('target/:id')
  findByTargetId(@Param('id') id: string) {
    return this.voteService.findByTargetId(id);
  }
  @Post('check')
  async checkIfVoted(@Body() checkVoteDto: CheckVoteDto) {
    const hasVoted = await this.voteService.hasVoted( checkVoteDto);
    console.log({hasVoted})
    return hasVoted
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, VoteOwnershipGuard)
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(id, updateVoteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, VoteOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.voteService.remove(id);
  }
}
