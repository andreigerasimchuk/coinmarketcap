import db from '../db';

export default async (userId) => {
  const query = {
    text: `SELECT
    usercoins.c_id,
    coins.coinname,
    coins.coinsymbol,
    usercoins.updatefrequency,
    usercoins.uc_id
    FROM usercoins 
    JOIN coins 
      ON usercoins.c_id=coins.c_id 
      AND usercoins.u_id = '${userId}';`,
  };
  const { rows } = await db.query(query);
  return rows;
}