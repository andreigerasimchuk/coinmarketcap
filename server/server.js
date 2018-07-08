import express from 'express';
import { PORT } from './config';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import cors from 'cors';

import { getAllUsers } from './dao';

import usersApi from './routes/users';
import coinsApi from './routes/coins';

import jwtOptions from './jwtOptions';

import { updateCoinsInformations } from './core/services/coins';

const app = express();
const JwtStrategy = passportJwt.Strategy;

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  getAllUsers()
    .then(users => {
      let user = users.findIndex(user => user.u_id === jwt_payload.id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
});

const init = () => {
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(strategy);
  app.use('/api', usersApi);
  app.use('/api/coins', coinsApi);
}

const start = () => {
  const port = process.env.PORT || PORT;
  app.listen(port, err => {
    if (err) {
      console.error(err, 'Internal server error');
      return;
    }
    console.info(`Server is up on ${port}'s port`);
    updateCoinsInformations();
  });
}

export {
    init,
    start,
}
