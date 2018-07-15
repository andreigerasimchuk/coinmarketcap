import React from 'react';
import Coin from './coin';
import './index.scss';

const CoinsList = ({
  list,
  onSubmitForm,
  handleChecking,
  handleCoinUpdatingFrequency,
}) => {
  const coinsList = list.map(coin => {
    return <Coin
      name={coin.coinname}
      key={coin.c_id}
      handleChecking={handleChecking}
      id={coin.c_id}
      checked={coin.checked}
      updateFrequency={coin.updatefrequency}
      handleUpdateFrequency={handleCoinUpdatingFrequency}
    />
  });
  return (
    <div className="coins">
      <div className="coins-header">Coins</div>
      <form className="coins-form" onSubmit={onSubmitForm}>
        <button
          type="submit"
          className="coins-form__btn btn"
        >
          SAVE
          </button>
        <div className="coins-form__list">{coinsList}</div>
      </form>
    </div>
  );
}

export default CoinsList;
