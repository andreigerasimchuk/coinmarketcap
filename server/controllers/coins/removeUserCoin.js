import { deleteUserCoins } from '../../dao';

export default (req, res) => {
  const { userId } = req.params;
  deleteUserCoins(userId)
    .then(data => {
      res.status(200).json(data);
    })
}