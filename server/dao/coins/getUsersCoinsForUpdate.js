import db from '../db';

export default async (userId) => {
  const query = {
    text: `SELECT
    usercoins.uc_id, 
    usercoins.c_id, 
    usercoins.updatefrequency, 
    usercoins.u_id,
    (SELECT 
      usercoincourses.lastupdatedate + usercoins.updatefrequency AS lastupdatedate  
    FROM usercoincourses 
    WHERE usercoincourses.uc_id = usercoins.uc_id 
    ORDER BY usercoincourses.lastupdatedate DESC 
    LIMIT 1) AS lastupdatedate
    FROM usercoins
    WHERE usercoins.u_id = '${userId}';`,
  };
  const { rows } = await db.query(query);
  return rows;
}