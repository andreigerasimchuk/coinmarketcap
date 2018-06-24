import { create, getAllUsers, findUser } from '../dao/users';
import jwt from 'jsonwebtoken';

const createUser = (req, res) => {
  const { login, password, email } = req.body;
  create({ login, password, email })
    .then(rows => {
      console.log(rows);
      res.json(rows);
    })
    .catch(e => {
      res.status(500);
    });
}

const getUsers = (req, res) => {
  getAllUsers()
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => {
      res.status(500);
    });
}

const login = (req, res) => {
  const { name, password } = req.body;
  if (req.body.name && req.body.password) {
    const { name, password } = req.body;
  }
  findUser()
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "no such user found" });
        return;
      }
      if (user.password === password) {
        var payload = { id: user.id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: "ok", token: token });
      } else {
        res.status(401).json({ message: "passwords did not match" });
      }
    })
    .then(err => {
      res.status(500);
    });
}

export {
  createUser,
  getUsers,
  login,
}