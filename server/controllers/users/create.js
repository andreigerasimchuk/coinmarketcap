import { createUser } from '../../dao';

export default (req, res) => {
  const { login, password, email } = req.body;
  createUser({ login, password, email })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500);
    });
}
