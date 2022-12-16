import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './components.css';

class Header extends Component {
  render() {
    const { store } = this.props;
    return (
      <div id="W_Header_main">
        <h4>
          Olá
          {' '}
          {store.user.email}
        </h4>
        <div>
          <p>
            BRL:
            {' '}
            {store.wallet.totalBRL.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  store: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    wallet: PropTypes.shape({
      totalBRL: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(Header);
