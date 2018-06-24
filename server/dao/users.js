import db from './db';

import { guid } from '../util';

const getAllUsers = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM userstest');
  return rows;
};

const create = async (user) => {
  const textQuery = 'INSERT INTO userstest(id, login, password, email) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [guid(), user.login, user.password, user.email];
  const { rows } = await db.query(textQuery, values);
  return rows;
}

const findUser = async (req, res) => {
  const query = {
    text: 'SELECT * FROM userstest where id = $1',
    values: ["c7064ae0-c371-8da0-b842-1e52e5a8d5b9"]
  }
  const { rows } = await db.query(query);
  return rows[0];
}

module.exports = {
  getAllUsers,
  create,
  findUser,
}