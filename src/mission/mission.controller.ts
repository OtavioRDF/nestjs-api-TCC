import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { AssignMissionDto } from './dto/assign-mission.dto';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.missionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMissionDto: UpdateMissionDto) {
    return this.missionService.update(id, updateMissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.missionService.remove(id);
  }
  
  @Post('assign-player')
  assignPlayer(@Body() assignMissionDto: AssignMissionDto) {
    return this.missionService.assignMission(assignMissionDto);
  }

  @Post('complete/:missionId')
  async completeMission(@Param('missionId', ParseIntPipe) missionId: number) {
    return await this.missionService.completeMission(missionId);
  }

}
