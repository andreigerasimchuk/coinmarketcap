import db from '../db';

export default async (uc_id) => {
  const query = {
    text: `DELETE 
    FROM usercoins 
    WHERE usercoins.uc_id = '${uc_id}'`,
  };
  const { rowCount } = await db.query(query);
  return rowCount;
}