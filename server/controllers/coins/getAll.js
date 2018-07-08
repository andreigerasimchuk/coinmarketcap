import { getAllCoins } from '../../dao';

export default (req, res) => {
  getAllCoins()
    .then(data => {
      return res.json(data);
    });
}