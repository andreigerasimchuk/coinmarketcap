import { getAllCoins as getCoins, getListCoins } from '../dao/coins';

const getAllCoins = (req, res) => {
  getCoins()
    .then(data => {
      return res.json(data);
    })
}

const getCoinsList = (req, res) => {
  const { userId } = req.params;
  getListCoins(userId)
    .then(data => {
      res.status(200).json(data);
    });
}

export {
  getAllCoins,
  getCoinsList,
}