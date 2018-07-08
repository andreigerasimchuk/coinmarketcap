import db from '../db';

export default  async (userId) => {
  const query = {
    text: `SELECT DISTINCT ON (usercoincourses.uc_id) 
    usercoincourses.ucc_id, 
    usercoincourses.price, 
    usercoincourses.percent_change_1h,
    usercoincourses.lastupdatedate,
    coins.coinname,
    coins.coinsymbol
    FROM usercoincourses, usercoins, coins 
    WHERE usercoincourses.uc_id = usercoins.uc_id
      AND usercoins.u_id = '${userId}'
      AND usercoins.c_id = coins.c_id
    ORDER BY usercoincourses.uc_id, usercoincourses.lastupdatedate DESC;`,
  };
  const { rows } = await db.query(query);
  return rows;
}