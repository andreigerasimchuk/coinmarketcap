import db from '../db';

export default async (userId) => {
  const query = {
    text: `SELECT 
    coins.c_id,
    coins.coinname, 
    coins.coinsymbol
    FROM coins 
    WHERE coins.c_id NOT IN (
      SELECT 
      usercoins.c_id 
      FROM usercoins 
      WHERE usercoins.u_id = '${userId}'
    );`,
  };
  const { rows } = await db.query(query);
  return rows;
}