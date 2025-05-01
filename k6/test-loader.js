import { check, group, sleep } from 'k6';
import { createPlayer, deletePlayer } from './player-test.js';
import {
  createMission,
  assignMission,
  completeMission,
  deleteMission,
} from './mission-test.js';

export const options = {
  stages: [
    { duration: '20s', target: 20 }, // Ramp-up para 20 VUs
    { duration: '1m', target: 20 },  // Carga estável
    { duration: '20s', target: 0 },  // Ramp-down
  ],
};

export default function () {
  let playerId;
  let missionId;

  group('Criar jogador e missão', () => {
    const playerRes = createPlayer();
    check(playerRes, {
      'player created': (res) => res.status === 201,
    });
    playerId = playerRes.json().id;

    const missionRes = createMission();
    check(missionRes, {
      'mission created': (res) => res.status === 201,
    });
    missionId = missionRes.json().id;
  });

  group('Atribuir e completar missão', () => {
    const assignRes = assignMission(playerId, missionId);
    check(assignRes, {
      'mission assigned': (res) => res.status === 201,
    });

    const completeRes = completeMission(missionId);
    check(completeRes, {
      'mission completed': (res) => res.status === 200,
    });
  });

  group('Deletar jogador e missão (final)', () => {
    // Adiciona pequena espera para garantir que criação/atribuição foi concluída
    sleep(0.5);

    const deletePlayerRes = deletePlayer(playerId);
    check(deletePlayerRes, {
      'player deleted': (res) => res.status === 200,
    });

    const deleteMissionRes = deleteMission(missionId);
    check(deleteMissionRes, {
      'mission deleted': (res) => res.status === 200,
    });
  });

  sleep(1);
}