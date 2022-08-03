import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // constructor() {
  // super();

  // this.state = {
  //   total: 0,
  // };
  // }

  render() {
    const { store } = this.props;
    // const { total } = this.state;
    return (
      <div>
        <h4 data-testid="email-field">{store.user.email}</h4>
        <div data-testid="total-field">
          {store.walletReducer.totalBRL.toFixed(2)}
        </div>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  store: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    walletReducer: PropTypes.shape({
      totalBRL: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(Header);
