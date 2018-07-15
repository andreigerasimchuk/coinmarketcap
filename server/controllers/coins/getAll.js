import { getAllCoins } from '../../dao';

export default (req, res) => {
  getAllCoins()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}