import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./player.entity";


@Entity()
export class Mission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string; 

  @Column({ type: 'text', nullable: true })
  description: string; 

  @Column({ default: false })
  completed: boolean; 

  @Column({ type: 'int', default: 0 })
  reputationReward: number;  

  @Column({ type: 'float', default: 0 })
  moneyReward: number; 

  @ManyToOne(() => Player, (player) => player.missions, {
    onDelete: 'CASCADE',
  })
  player: Player; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
