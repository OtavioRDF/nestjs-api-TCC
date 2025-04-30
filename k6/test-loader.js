import { check, group, sleep } from 'k6';
import { createPlayer, deletePlayer } from './player-test.js';
import { createMission, assignMission, completeMission, deleteMission } from './mission-test.js';

export const options = {
  stages: [
    { duration: '20s', target: 20 }, // Ramp-up para 20 usuários
    { duration: '1m', target: 20 },  // Steady load
    { duration: '20s', target: 0 },  // Ramp-down
  ],
};

const BASE_URL = 'http://quests-nest:3000';

export default function () {
  group('Player Tests', () => {
    // Criar jogador
    const player = createPlayer();

    check(player, {
      'player created': (res) => res.status === 201,
    });
    
    // Deletar jogador
    deletePlayer(player.json().id);
    
    check(deletePlayer, {
      'player deleted': (r) => r.status === 200 && r.json().message === 'Player deleted successfully'
    });
  });

  group('Mission Tests', () => {
    // Criar missão
    const mission = createMission();

    check(mission, {
      'mission created': (res) => res.status === 201,
    });

    // Atribuir missão
    // const assign = assignMission(player.json().id, mission.json().id);

    // check(assign, {
    //   'mission assigned': (res) => res.status === 201,
    // });

    // Completar missão
    // const complete = completeMission(mission.json().id);

    // check(complete, {
    //   'mission completed': (res) => res.status === 200,
    // });

    // Deletar missão
    const deleteResp = deleteMission(mission.json().id);

    check(deleteResp, {
      'mission deleted': (res) => res.status === 200,
    });
  });

  sleep(1);
}