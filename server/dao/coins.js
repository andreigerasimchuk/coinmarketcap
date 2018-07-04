import db from './db';
import { guid } from '../util';

const getAllCoins = async () => {
  const { rows } = await db.query('SELECT * FROM coins');
  return rows;
}

const getListCoins = async (userId) => {
  const query = {
    text: `SELECT 
    coins.c_id,
    coins.coinname, 
    coins.coinsymbol
    from coins 
    where coins.c_id NOT IN(
    SELECT 
    usercoins.c_id 
    from usercoins 
    where usercoins.u_id = '${userId}');`
  };
  const { rows } = await db.query(query);
  return rows;
}

const createUserCoins = async (userId, coins) => {
  let values = '';
  values += coins.map(coin => `('${guid()}', '${userId}', ${coin.c_id}, ${coin.updatefrequency})`);
  const query = {
    text: `INSERT INTO usercoins(uc_id, u_id, c_id, updatefrequency) VALUES ${values} RETURNING *`,
  };
  const { rows } = await db.query(query);
  return rows;
}

const getUserCoins = async (userId) => {
  const query = {
    text: 'SELECT c_id, updatefrequency FROM usercoins where u_id = $1',
    values: [userId]
  }
  const { rows } = await db.query(query);
  return rows;
}

const createCoins = async (coins) => {
  let values = '';
  values += coins.map(coin => `(${coin.id}, '${coin.name}', '${coin.symbol}')`);
  const query = {
    text: `INSERT INTO coins(c_id, coinname, coinsymbol) VALUES ${values} RETURNING *`,
  };
  const { rows } = await db.query(query);
  return rows;
}

const assignCoinsToUser = async (userId, coinsId) => {
  const query = {
    text: `INSERT INTO usercoins(id, userid, coinsid) VALUES($1, $2, $3) RETURNING *`,
    values: [guid(), userId, coinsId],
  };
  const { rows } = await db.query(query);
  return rows;
}

export {
  getAllCoins,
  createCoins,
  assignCoinsToUser,
  getListCoins,
  getUserCoins,
  createUserCoins,
}
