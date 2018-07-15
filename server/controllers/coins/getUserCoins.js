import { getCoinsUser } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  getCoinsUser(userId)
    .then(data =>  res.status(200).json(data))
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}