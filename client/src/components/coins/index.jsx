import React, { Component } from 'react';
import AuthWrapped from '../AuthWrapped';
import ReactTable from 'react-table';
import './index.scss';

class Coins extends Component {
  state = {
    coins: [],
  };

  componentDidMount() {
    this.props.coinsService.getCoinsCourses()
      .then(data => {
        this.setState({ coins: data });
      });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'coinname'
      },
      {
        Header: 'Symbol',
        accessor: 'coinsymbol'
      },
      {
        Header: 'price',
        accessor: 'price'
      }, {
        Header: 'percent_change_1h',
        accessor: 'percent_change_1h'
      },
      {
        Header: 'time passed',
        accessor: 'lastupdatedate'
      },
    ];

    return (
      <div className="page-container">
        <div className="coins">
          <div className="coins__table">
            <ReactTable data={this.state.coins} columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthWrapped(Coins);