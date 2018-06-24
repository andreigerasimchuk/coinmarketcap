import express from 'express';
import { PORT } from './config';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import { getAllUsers } from './dao/users';

import api from './routes/users';
import apiCoins from './routes/coins';

const app = express();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: 'secret'
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    getAllUsers()
      .then(users =>{
        let user = users.findIndex(user => user.id === jwt_payload.id);
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
    app.use('/api', api);
    app.use('/api/coins', apiCoins);
}

const start = () => {
    const port = process.env.PORT || PORT;
    app.listen(port, err => {
        if (err) {
            console.error(err, 'Internal server error');
        } else {
            console.info(`Server is up on ${port}'s port`);
        }
    });
}

export {
    init,
    start,
}
