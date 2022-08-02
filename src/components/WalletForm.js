import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import PropTypes from 'prop-types';

import { currenciasAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      despesa: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getCurrencias();
  }

  getCurrencias = async () => {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const api = await response.json();
    dispatch(currenciasAction(Object.keys(api).filter((aa) => aa !== 'USDT')));
  };

  change = (ee) => {
    const { value, name } = ee.target;
    this.setState({ [name]: value }, () => this.disabled());
  }

  render() {
    const { despesa, description } = this.state;
    const { store: { walletReducer: { currencies } } } = this.props;
    return (
      <form>
        <input
          type="number"
          name="despesa"
          value={ despesa }
          onChange={ (ee) => this.change(ee) }
          data-testid="value-input"
        />
        <input
          type="text"
          name="description"
          value={ description }
          onChange={ (ee) => this.change(ee) }
          data-testid="description-input"
        />
        <select data-testid="currency-input">
          { currencies.map((aa) => <option key={ aa }>{aa}</option>) }
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  store: PropTypes.shape({
    walletReducer: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(WalletForm);
