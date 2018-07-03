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
    coins.coinsymbol,
    usercoins.updatefrequency,
    CASE
      WHEN
        usercoins.u_id = '${userId}' THEN true 
      ELSE false 
    END AS checked
    from coins 
    LEFT JOIN usercoins 
    ON coins.c_id = usercoins.c_id 
    AND usercoins.u_id = '${userId}';`
  };
  const { rows } = await db.query(query);
  return rows;
}

const createCoins = async (coins) => {
  let values = '';
  values += coins.map(coin => {
    return `(${coin.id}, '${coin.name}', '${coin.symbol}')`;
  });
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
}
