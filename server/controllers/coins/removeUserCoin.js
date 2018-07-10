import { deleteUserCoins } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  deleteUserCoins(userId)
    .then(deletedRows => {
      if (deletedRows === 0) {
        res.status(400).json({ message: 'not a valid id' });
        return;
      }
      res.status(200).json({ message: 'ok' });
    })
}