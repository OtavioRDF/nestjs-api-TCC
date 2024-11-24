import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AssignMissionDto {
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @IsString()
  @IsNotEmpty()
  missionId: string;
}