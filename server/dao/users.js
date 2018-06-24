import db from './db';

import { guid } from '../util';

const getAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM userstest');
  return rows;
};

const create = async (user) => {
  const textQuery = 'INSERT INTO userstest(id, login, password, email) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [guid(), user.login, user.password, user.email];
  const { rows } = await db.query(textQuery, values);
  return rows;
}

const findUser = async (login) => {
  const query = {
    text: 'SELECT * FROM userstest where login = $1',
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