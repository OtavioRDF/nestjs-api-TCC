import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mission } from "./mission.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    profile: string;

    @Column()
    reputation: number;

    @Column({type: 'float', default: 0})
    money: number;

    @Column('jsonb', { default: {} })
    skills: Record<string, number>;

    @OneToMany(() => Mission, (mission) => mission.player, { eager: true, lazy: true })
    missions: Mission[];
}
