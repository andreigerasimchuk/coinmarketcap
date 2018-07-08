import { getListCoins } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  getListCoins(userId)
    .then(data => {
      res.status(200).json(data);
    });
}