import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/database/entities/player.entity';
import { Repository } from 'typeorm';
import { Mission } from 'src/database/entities/mission.entity';
import { AssignMissionDto } from '../mission/dto/assign-mission.dto';

@Injectable()
export class PlayersService {

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,

    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    return await this.playerRepository.save(createPlayerDto);
  }

  async findAll() {
    return await this.playerRepository.find();
  }

  async findOne(id: number) {
    return await this.playerRepository.findOne(
      { 
        where: { id } 
      }
    );
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerRepository.manager.transaction(
      async transactionalEntityManager => {
        const player = await transactionalEntityManager.findOne(Player, { where: { id } });

        if(!player){
          throw new NotFoundException(`Player with ID ${id} not found!`);
        }

        Object.assign(player, updatePlayerDto);

        return transactionalEntityManager.save(player);
      }
    )
  }

  async remove(id: number) {
    const result = await this.playerRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`Player with ID ${id} not found!`);
    }
  }
}
