import db from '../db';

export default async (coins) => {
  let values = '';
  values += coins.map(coin => `(${coin.id}, '${coin.name}', '${coin.symbol}')`);
  const query = {
    text: `INSERT INTO coins(c_id, coinname, coinsymbol) VALUES ${values} RETURNING *`,
  };
  const { rows } = await db.query(query);
  return rows;
}