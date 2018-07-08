import db from '../db';
import { guid } from '../../util';

export default async (user) => {
  const query = {
    text: 'INSERT INTO users(u_id, username, password, email) VALUES($1, $2, $3, $4) RETURNING *',
    values: [guid(), user.login, user.password, user.email],
  }
  const { rows } = await db.query(query);
  return rows;
}
