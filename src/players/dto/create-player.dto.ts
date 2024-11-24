import { IsJSON, IsNumber, IsString } from "class-validator";

export class CreatePlayerDto {
    @IsString()
    name: string;

    @IsString()
    profile: string;
    
    skills: {
        shooting: number;
        stealth: number;
        horseRiding: number;
    };
    
    @IsNumber()
    money: number;
    
    @IsNumber()
    reputation: number;
}
