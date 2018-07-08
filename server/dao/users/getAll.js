import db from '../db';

export default async () => {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
};
