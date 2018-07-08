import { getAllUsers } from '../../dao';

export default (req, res) => {
  getAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500);
    });
}
