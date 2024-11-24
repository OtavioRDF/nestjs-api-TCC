import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsString } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    @IsString()
    profile: string;
    
    skills: {
        shooting: number;
        stealth: number;
        horseRiding: number;
    };
}
