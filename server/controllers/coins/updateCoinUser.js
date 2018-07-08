import { updateUserCoin } from '../../dao';

export default (req, res) => {
  const { uc_id, updatefrequency } = req.body;
  updateUserCoin(uc_id, updatefrequency)
    .then(data => {
      res.status(200).json(data);
    })
}