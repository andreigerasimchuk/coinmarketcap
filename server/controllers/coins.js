import { getAllCoins as getCoins } from '../dao/coins';

const getAllCoins = (req, res) => {
  getCoins()
    .then(data => {
      return res.json(data);
    })
}

export {
  getAllCoins,
}