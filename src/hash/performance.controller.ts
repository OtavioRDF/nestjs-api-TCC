import { Controller, Get, Query } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Controller('performance')
export class PerformanceController {
  @Get('heavy-hashing')
  async heavyHashing(@Query('rounds') rounds, @Query('hashes') hashes): Promise<{ duration: string }> {
    const roundsToUse = parseInt(rounds);
    const hashesToGenerate = parseInt(hashes);
    
    const password = 'A@longPasswordThatWillBeHashedMultipleTimes1234567890';
    const start = Date.now();

    const promises = [];
    for (let i = 0; i < hashesToGenerate; i++) {
      promises.push(bcrypt.hash(password + i, roundsToUse));
    }

    await Promise.all(promises);
    const durationMs = Date.now() - start;

    return { duration: `${durationMs}ms` };
  }
}
