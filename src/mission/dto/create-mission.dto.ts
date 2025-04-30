import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMissionDto {
  @IsNumber()  
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
