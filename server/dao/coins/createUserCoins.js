import db from '../db';
import { guid } from '../../util';

export default async (userId, coins) => {
  let values = '';
  values += coins.map(coin => `('${guid()}', '${userId}', ${coin.c_id}, ${coin.updatefrequency})`);
  const query = {
    text: `INSERT INTO usercoins(uc_id, u_id, c_id, updatefrequency) VALUES ${values} RETURNING *`,
  };
  const { rows } = await db.query(query);
  return rows;
}