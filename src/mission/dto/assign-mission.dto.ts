import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignMissionDto {
  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @IsNumber()
  @IsNotEmpty()
  missionId: number;
}