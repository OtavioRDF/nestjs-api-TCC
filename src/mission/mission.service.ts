import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from 'src/database/entities/mission.entity';
import { Player } from 'src/database/entities/player.entity';
import { AssignMissionDto } from './dto/assign-mission.dto';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createMissionDto: CreateMissionDto) {
    const mission = this.missionRepository.create(createMissionDto);
    return await this.missionRepository.save(mission);
  }

  async findAll() {
    return await this.missionRepository.find();
  }

  async findOne(id: number) {
    const mission = await this.missionRepository.findOne({ where: { id } });

    if (!mission) {
      throw new NotFoundException(`Mission with ID ${id} not found!`);
    }

    return mission;
  }

  async update(id: number, updateMissionDto: UpdateMissionDto) {
    return await this.missionRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const mission = await transactionalEntityManager.findOne(Mission, {
          where: { id },
        });

        if (!mission) {
          throw new NotFoundException(`mission with ID ${id} not found!`);
        }

        Object.assign(mission, updateMissionDto);

        return transactionalEntityManager.save(mission);
      },
    );
  }

  async remove(id: number) {
    const result = await this.missionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found!`);
    }
  }

  async completeMission(missionId: number): Promise<void> {
    const mission = await this.missionRepository.findOne({
      where: { id: missionId },
      relations: ['player'],
    });

    if (!mission) {
      throw new Error('Mission not found');
    }

    if (mission.completed) {
      throw new Error('Mission already completed');
    }

    // Atualiza o status da missão
    mission.completed = true;
    await this.missionRepository.save(mission);

    // Atualiza o jogador
    const player = mission.player;
    
    if (player) {
      player.reputation += mission.reputationReward;
      player.money += mission.moneyReward;
  
      await this.playerRepository.save(player);
    }
    
  }

  async assignMission(assignMissionDto: AssignMissionDto) {
    try {
      const player = await this.playerRepository.findOne({
        where: { id: assignMissionDto.playerId },
      });

      if (!player) {
        throw new NotFoundException(
          `Player with ID ${assignMissionDto.playerId} not found!`,
        );
      }

      const mission = await this.missionRepository.findOne({
        where: { id: assignMissionDto.missionId },
      });

      if (!mission) {
        throw new NotFoundException(
          `Mission with ID ${assignMissionDto.playerId} not found!`,
        );
      }
      mission.player = player;

      if (mission.completed) {
        player.reputation += mission.reputationReward;
        player.money += mission.moneyReward;
        await this.playerRepository.save(player);
      }

      return await this.missionRepository.save(mission);
    } catch (error) {
      throw new Error(`Error assigning mission: ${error.message}`);
    }
  }
}
