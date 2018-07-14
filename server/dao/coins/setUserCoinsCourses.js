import db from '../db';
import { guid } from '../../util';

export default async (coinsCourses) => {
  let values = '';
  values += coinsCourses.map(coin =>
    `('${guid()}', '${coin.uc_id}', ${coin.price.toFixed(2)}, ${coin.percent_change_1h}, ${coin.lasttimeupdate})`);
  const query = {
    text: `INSERT INTO 
    usercoincourses(ucc_id, uc_id, price, percent_change_1h, lastupdatedate) 
    VALUES ${values} 
    RETURNING *`,
  };
  const { rows } = await db.query(query);
  return rows;
}