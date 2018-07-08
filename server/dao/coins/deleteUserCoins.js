import db from '../db';

export default async (userId) => {
  const query = {
    text: `DELETE 
    FROM usercoins 
    WHERE usercoins.uc_id = '${userId}'`,
  };
  const { rows } = await db.query(query);
  return rows;
}