import React from 'react';
import './coin.scss';

const Coin = ({
  id,
  name,
  uc_id,
  update,
  checked,
  updateFrequency,
  handleChecking,
  handleUpdateFrequency,
  handleRemoving,
  handleUpdating,
}) => {
  const handleChangeCheckbox = () => {
    handleChecking(id);
  }
  const handleChangeInput = (event) => {
    handleUpdateFrequency(id, event.target.value);
  }
  const handleRemovingCoin = (event) => {
    event.preventDefault();
    handleRemoving(uc_id);
  }
  const handleUpdatingCoin = (event) => {
    event.preventDefault();
    handleUpdating(uc_id, updateFrequency);
  }
  return (
    <div className="coin" >
      {!update &&  <input
        type="checkbox"
        className="coin-checbox"
        checked={checked}
        onChange={handleChangeCheckbox}
      />}
      <div className="coin-name">{name}</div>
      <div className="coin-updateFrequency-text">
        Interval:
      </div>
      <input
        type="text"
        className="coin-updateFrequency"
        value={updateFrequency}
        onChange={handleChangeInput}
      />
      <label htmlFor="">min</label>
      {update && <button className="coin-update-btn btn" onClick={handleUpdatingCoin}>update</button>}
      {update && <button className="coin-delete-btn btn" onClick={handleRemovingCoin}>delete</button>}
    </div> 
  );
}

export default Coin;