import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import PropTypes from 'prop-types';

import { currenciasAction, expensesAction, totalBRLAction } from '../redux/actions';

const ALIMENTACAO = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      despesa: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    };
  }

  componentDidMount() {
    const fetchApi = async () => {
      const { dispatch } = this.props;
      const api = await this.getCurrencias();
      dispatch(currenciasAction(Object.keys(api).filter((aa) => aa !== 'USDT')));
    };
    fetchApi();
  }

  getCurrencias = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const api = await response.json();
    return api;
  };

  totalBRL = (despesa, api, currency, dispatch) => {
    const total = Number(api[currency].ask) * Number(despesa);
    dispatch(totalBRLAction(Number(total)));
  }

  submit = async (aa) => {
    aa.preventDefault();
    const api = await this.getCurrencias();
    const { dispatch, store: { walletReducer: { expenses } } } = this.props;
    const { despesa, description, currency, method, tag } = this.state;

    const expense = {
      id: expenses.length,
      value: despesa,
      description,
      currency,
      method,
      tag,
      exchangeRates: api,
    };

    dispatch(expensesAction([expense]));

    this.setState({
      despesa: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });

    this.totalBRL(despesa, api, currency, dispatch);
  }

  change = (ee) => {
    const { value, name } = ee.target;
    this.setState({ [name]: value });
  }

  render() {
    const { despesa, description, currency, method, tag } = this.state;
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
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (ee) => this.change(ee) }
        >
          {currencies.map((aa) => (
            <option key={ aa }>{aa}</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (ee) => this.change(ee) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (ee) => this.change(ee) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button type="submit" onClick={ (aa) => this.submit(aa) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  store: PropTypes.shape({
    walletReducer: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string),
      expenses: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(WalletForm);
