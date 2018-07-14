import React from 'react';
import Coin from './coin';
import './index.scss';

const UserCoinsList = ({
  list,
  handleRemoving,
  handleUpdateFrequency,
  handleUpdating
}) => {
  const coinsList = list.map(coin => {
    return <Coin
      update={true}
      name={coin.coinname}
      key={coin.c_id}
      id={coin.c_id}
      uc_id={coin.uc_id}
      checked={coin.checked}
      updateFrequency={coin.updatefrequency}
      handleRemoving={handleRemoving}
      handleUpdateFrequency={handleUpdateFrequency}
      handleUpdating={handleUpdating}
    />
  });

  return (
      <div className="coins">
        <form className="coins-form">
          <div className="coins-form__list">{coinsList}</div>
        </form>
      </div>
  )
}

export default UserCoinsList;