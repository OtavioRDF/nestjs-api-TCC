import http from 'k6/http';

const BASE_URL = 'http://quests-nest:3000';

export function createMission() {
  const payload = JSON.stringify({
    name: `Train Robbery ${Math.floor(Math.random() * 1000)}`,
    description: 'Rob a heavily guarded train',
    completed: false,
    reputationReward: 10,
    moneyReward: 200,
  });

  return http.post(`${BASE_URL}/mission`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function assignMission(playerId, missionId) {
  const payload = JSON.stringify({
    playerId: playerId,
    missionId: missionId,
  });

  return http.post(`${BASE_URL}/mission/assign-player`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function completeMission(missionId) {
  return http.post(`${BASE_URL}/mission/complete/${missionId}`);
}

export function deleteMission(missionId) {
  return http.del(`${BASE_URL}/mission/${missionId}`);
}