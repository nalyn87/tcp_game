import Game from '../classes/models/game.class';
import { gameSessions } from './session';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSessions.push(session);
  return session;
};

export const removeGameSession = (id) => {
  const index = gameSessions.findIndex((game) => game.id === id);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const getGameSession = (id) => {
  return gameSessions.find((game) => game.id === id);
};

export const getAllGameSession = () => {
  return gameSessions;
};