import http from 'k6/http';

const BASE_URL = 'http://quests-nest:3000';

export function createPlayer() {
  const payload = JSON.stringify({
    name: `Arthur Morgan ${Math.floor(Math.random() * 1000)}`,
    profile: 'outlaw',
    skills: { shooting: 90, stealth: 80, horseRiding: 95 },
    money: 100.0,
    reputation: 50,
  });

  return http.post(`${BASE_URL}/players`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function deletePlayer(playerId) {
  return http.del(`${BASE_URL}/players/${playerId}`);
}

export function updatePlayer(playerId) {
  const payload = JSON.stringify({
    money: Math.floor(Math.random() * 500) + 100,
    reputation: Math.floor(Math.random() * 100),
  });

  return http.patch(`${BASE_URL}/players/${playerId}`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
} 