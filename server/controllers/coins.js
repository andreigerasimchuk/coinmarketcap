import fetch from 'node-fetch';

const getAllCoins = (req, res) => {
  fetch('https://api.coinmarketcap.com/v2/listings/', { method: 'GET' })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      return res.json(data)
    })
}

export {
  getAllCoins,
}