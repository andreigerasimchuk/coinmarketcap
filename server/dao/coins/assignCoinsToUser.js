import db from '../db';
import { guid } from '../../util';

export default async (userId, coinsId) => {
  const query = {
    text: `INSERT INTO usercoins(id, userid, coinsid) VALUES($1, $2, $3) RETURNING *`,
    values: [guid(), userId, coinsId],
  };
  const { rows } = await db.query(query);
  return rows;
}