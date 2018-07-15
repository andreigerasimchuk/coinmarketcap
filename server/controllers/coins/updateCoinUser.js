import { updateUserCoin } from '../../dao';

export default (req, res) => {
  const { uc_id, updatefrequency } = req.body;
  updateUserCoin(uc_id, updatefrequency)
    .then(updatedRows => {
      if (updatedRows === 0) {
        res.status(400).json({ message: 'not a valid id' });
        return;
      }
      res.status(200).json({ message: 'ok' });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}