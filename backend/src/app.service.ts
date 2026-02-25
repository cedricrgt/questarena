import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { status: 'ok', message: 'QuestArena API is running' };
  }
}
