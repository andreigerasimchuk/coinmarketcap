import db from '../db';

export default async (coins) => {
  const length = coins.length - 1;
  let values = '(';
  values += coins.map((coin, index) => {
    if (!length === index ){
      return `'${coin.c_id}',`;
    } else {
      return `'${coin.c_id}'`;
    }
  });
  values += ')';
  const query = {
    text: `SELECT 
    *
    from coins
    WHERE coins.c_id in ${values} `,
  };
  const { rows } = await db.query(query);
  return rows;
}