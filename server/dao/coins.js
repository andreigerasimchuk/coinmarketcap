import db from './db';
import { guid } from '../util';

const getAllCoins = async () => {
  const { rows } = await db.query('SELECT * FROM coins');
  console.log(rows);
  return rows;
}

export {
  getAllCoins,
}
