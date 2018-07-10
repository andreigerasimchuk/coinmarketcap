import db from '../db';

export default async (userCoinId, updatefrequency) => {
  const query = {
    text: `UPDATE usercoins 
    SET updatefrequency = ${updatefrequency} 
    WHERE uc_id = '${userCoinId}'`,
  };
  const { rowCount } = await db.query(query);
  return rowCount;
}