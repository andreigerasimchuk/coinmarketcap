import { deleteUserCoins, getCoinListById } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  deleteUserCoins(userId)
    .then(deletedCoins => {
      console.log(deletedCoins);
      if (!deletedCoins.length) {
        res.status(400).json({ message: 'not a valid id' });
        return;
      }
      //res.status(200).json({ message: 'ok' });
      return getCoinListById(deletedCoins);
    })
    .then(coins => {
      console.log(coins);
      res.status(200).json({ message: 'ok', coins });
    })
}