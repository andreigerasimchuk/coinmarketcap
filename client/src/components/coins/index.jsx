import React, { Component } from 'react';
import AuthWrapped from '../AuthWrapped';
import ReactTable from "react-table"
import './index.scss';

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    this.getCoins()
      .then(data => {
        console.log(data);
        this.setState({ coins: data });
      });
  }

  getCoins = () => {
    return fetch('http://localhost:3009/api/coins/1', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        return data.coins;
      })
  }

  handleChecked = (id) => {
    const { coins } = this.state;
    const index = coins.findIndex(coin => coin.id === id);
    coins[index].checked = !coins[index].checked;
    this.setState({ coins: coins });
  }

  render() {
    const columns = [
      {
        Header: '',
        accessor: '',
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={original.checked}
              onChange={() => this.handleChecked(original.id)}
            />
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Symbol',
        accessor: 'symbol'
      }, {
        Header: 'Coin id',
        accessor: 'id'
      }];

    return (
      <div className="page-container">
        <div className="coins">
          <button onClick={this.getCoins}>test</button>
          <div className='coins__form'>

          </div>
          <div className="coins__table">
            <ReactTable data={this.state.coins} columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthWrapped(Coins);