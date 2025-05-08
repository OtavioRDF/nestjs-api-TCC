import { check, group, sleep } from 'k6';
import { createPlayer, deletePlayer, updatePlayer } from './player-test.js';
import {
  createMission,
  assignMission,
  completeMission,
  deleteMission,
  updateMission,
} from './mission-test.js';

export const options = {
  stages: [
    { duration: "20s", target: 10 },
    { duration: "20s", target: 50 }, // Ramp-up para 50 VUs
    { duration: "20s", target: 100 }, // Ramp-up para 100 VUs
    { duration: "1m", target: 100 }, // Carga estável
    { duration: "20s", target: 0 }, // Ramp-down
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

  group('Alterar jogador e missão', () => {
    const updatePlayerRes = updatePlayer(playerId);
    check(updatePlayerRes, {
      'player updated': (res) => res.status === 200,
    });

    const updateMissionRes = updateMission(missionId);
    check(updateMissionRes, {
      'mission updated': (res) => res.status === 200,
    });
  });

  group('Atribuir, completar e alterar missão', () => {
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

    const deleteMissionRes = deleteMission(missionId);
    check(deleteMissionRes, {
      'mission deleted': (res) => res.status === 200,
    });

    const deletePlayerRes = deletePlayer(playerId);
    check(deletePlayerRes, {
      'player deleted': (res) => res.status === 200,
    });
  });

  sleep(1);
}
