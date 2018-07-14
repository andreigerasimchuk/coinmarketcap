import db from '../db';

export default async (userCoins) => {
  const length = userCoins.length - 1;
  let values = '(';
  values += userCoins.map((coin, index) => {
    if (!length === index ){
      return `'${coin.uc_id}',`;
    } else {
      return `'${coin.uc_id}'`;
    }
  });
  values += ')';
  const query = {
    text: `SELECT 
    usercoins.uc_id, 
    usercoins.updatefrequency, 
    coins.c_id,
    coins.coinname, 
    coins.coinsymbol
    FROM usercoins
    LEFT JOIN coins ON usercoins.c_id = coins.c_id
    WHERE usercoins.uc_id in ${values} `,
  };
  const { rows } = await db.query(query);
  return rows;
}