import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMissionDto {
  @IsString()  
  name: string;
  
  @IsString()
  description: string;
  
  @IsBoolean()
  completed: boolean;

  @IsNumber()
  reputationReward: number;
  
  @IsNumber()
  moneyReward: number;
}
