import { createUser } from '../../dao';

export default (req, res) => {
  const { login, password, email } = req.body;
  createUser({ login, password, email })
    .then(userData => {
      res.status(200).json(userData);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}
