import { getAllUsers } from '../../dao';

export default (req, res) => {
  getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}
