import db from '../db';

export default async (login) => {
  const query = {
    text: 'SELECT * FROM users where username = $1',
    values: [login],
  };
  const { rows } = await db.query(query);
  return rows[0];
}
