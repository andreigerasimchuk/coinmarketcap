import { getListCoins, createUserCoins, getUserCoinsByUserCoinsId } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  const { coins } = req.body;
  let addedCoins;
  createUserCoins(userId, coins)
    .then(data => getUserCoinsByUserCoinsId(data))
    .then(data => {
      addedCoins = data;
      return getListCoins(userId);
    })
    .then(data => res.status(200).json({ message: 'ok', addedCoins, coins: data }))
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}