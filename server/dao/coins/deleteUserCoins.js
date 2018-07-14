import db from '../db';

export default async (uc_id) => {
  const query = {
    text: `DELETE 
    FROM usercoins 
    WHERE usercoins.uc_id = '${uc_id}' RETURNING c_id`,
  };
  const { rows }  = await db.query(query);
  return rows;
}