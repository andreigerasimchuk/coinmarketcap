import jwtOptions from '../../jwtOptions';
import { findUser } from '../../dao';
import jwt from 'jsonwebtoken';

export default (req, res) => {
  const { login, password } = req.body;
  findUser(login)
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "no such user found" });
        return;
      }
      if (user.password === password) {
        var payload = { id: user.id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({
          message: 'ok',
          user: {
            userId: user.u_id,
            login: user.username,
            email: user.email,
            token: token
          }
        });
      } else {
        res.status(401).json({ message: "passwords did not match" });
      }
    })
    .then(err => {
      res.status(500);
    });
}
