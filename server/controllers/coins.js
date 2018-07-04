import { getAllCoins as getCoins, getListCoins, createUserCoins } from '../dao/coins';

const getAllCoins = (req, res) => {
  getCoins()
    .then(data => {
      return res.json(data);
    });
}

const getCoinsList = (req, res) => {
  const { userId } = req.params;
  getListCoins(userId)
    .then(data => {
      res.status(200).json(data);
    });
}

const setUserCoins = (req, res) => {
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

export {
  getAllCoins,
  getCoinsList,
  setUserCoins,
}