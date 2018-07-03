import React from 'react';
import './coin.scss';

const Coin = ({
  id,
  name,
  checked,
  updateFrequency,
  handleChecked,
  handleUpdateFrequency
}) => {
  const handleChangeCheckbox = () => {
    handleChecked(id);
  }
  const handleChangeInput = (event) => {
    handleUpdateFrequency(id, event.target.value);
  }
  return (
    <div className="coin" >
      <input
        type="checkbox"
        className="coin-checbox"
        checked={checked}
        onChange={handleChangeCheckbox}
      />
      <div className="coin-name">{name}</div>
      <div className="coin-updateFrequency-text">
        Interval:
      </div>
      <input
        type="text"
        className="coin-updateFrequency"
        value={updateFrequency || 30}
        onChange={handleChangeInput}
      />
    </div>
  );
}

export default Coin;