const { Pool } = require('pg')

var config = {
  user: 'postgres',
  database: 'coinmarketcap', 
  password: '123', 
  port: 5432, 
};

const pool = new Pool(config)

module.exports = {
  query: (text, params) => pool.query(text, params)
}