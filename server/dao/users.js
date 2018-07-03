import db from './db';
import { guid } from '../util';

const getAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
};

const create = async (user) => {
  const query = {
    text: 'INSERT INTO users(u_id, username, password, email) VALUES($1, $2, $3, $4) RETURNING *',
    values: [guid(), user.login, user.password, user.email],
  }
  const { rows } = await db.query(query);
  return rows;
}

const findUser = async (login) => {
  const query = {
    text: 'SELECT * FROM users where username = $1',
    values: [login]
  }
  const { rows } = await db.query(query);
  return rows[0];
}

module.exports = {
  getAllUsers,
  create,
  findUser,
}