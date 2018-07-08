import { getListCoins, createUserCoins } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  const { coins } = req.body;
  createUserCoins(userId, coins)
    .then(data => {
      return getListCoins(userId);
    })
    .then(data => {
      res.status(200).json(data);
    });
}