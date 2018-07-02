import db from './db';
import { guid } from '../util';

const getAllCoins = async () => {
  const { rows } = await db.query('SELECT * FROM coins');
  return rows;
}

const createCoins = async (coins) => {
  let values = '';
  values += coins.map(coin => {
    return `(${coin.id}, '${coin.name}', '${coin.symbol}')`;
  });
  const query = {
    text: `INSERT INTO coins(id, name, symbol) VALUES ${values} RETURNING *`,
  }
  const { rows } = await db.query(query);
  return rows;
}

const assignCoinsToUser = async (userId, coinsId) => {
  const query = {
    text: `INSERT INTO usercoins(id, userid, coinsid) VALUES($1, $2, $3) RETURNING *`,
    values: [guid(), userId, coinsId],
  }
  const { rows } = await db.query(query);
  return rows;
}

export {
  getAllCoins,
  createCoins,
  assignCoinsToUser,
}
