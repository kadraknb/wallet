import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './components.css';

import {
  currenciasAction,
  editTableLAction,
  expensesAction,
  funEditTableAction,
  totalBRLAction,
} from '../redux/actions';

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
      removTotalBRL: 0,
      idToEdit: '',
      buttonEdit: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(funEditTableAction(this.editExpenses));
    this.fetchApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const api = await this.getCurrencias();
    dispatch(currenciasAction(Object.keys(api).filter((aa) => aa !== 'USDT')));
  }

  getCurrencias = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const api = await response.json();
    return api;
  }

  totalBRL = (despesa, api, currency, dispatch) => {
    const total = Number(api[currency].ask) * Number(despesa);
    dispatch(totalBRLAction(Number(total)));
  }

  newExpense = async () => {
    const exchangeRates = await this.getCurrencias();
    const { store: { wallet: { expenses } } } = this.props;
    const { despesa, description, currency, method, tag } = this.state;

    const expense = {
      id: expenses.length,
      value: Number(despesa).toFixed(2),
      description,
      currency,
      method,
      tag,
      exchangeRates,
      removTotalBRL: Number(exchangeRates[currency].ask)
      * Number(despesa),
      ADD_TotalBRL: Number(exchangeRates[currency].ask)
      * Number(despesa),
    };
    return expense;
  }

  submit = async (aa) => {
    aa.preventDefault();
    const api = await this.getCurrencias();
    const { dispatch, store: { wallet: { expenses } } } = this.props;
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

  editExpenses = (id) => {
    const { store: { wallet: { expenses } } } = this.props;
    const data = expenses.find((aa) => aa.id === id.id);

    this.setState({
      buttonEdit: false,
      despesa: data.value,
      description: data.description,
      currency: data.currency,
      method: data.method,
      tag: data.tag,
      idToEdit: id.id,
      removTotalBRL: id.value,
    });
  }

  editTableSubmit = async (aa) => {
    aa.preventDefault();
    const { store: { wallet: { expenses } }, dispatch } = this.props;
    const {
      despesa,
      description,
      currency,
      method,
      tag,
      idToEdit,
      removTotalBRL,
    } = this.state;
    const exchangeRates = await this.getCurrencias();
    const editExpense = {
      expense: {
        id: expenses.length,
        value: despesa,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
      changeTotalBRL: Number(exchangeRates[currency].ask)
      * Number(despesa) - removTotalBRL,
    };
    editExpense.expense.id = idToEdit;
    dispatch(editTableLAction(editExpense));
    this.setState({
      despesa: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      buttonEdit: true,
    });
  }

  render() {
    const { despesa, description, currency, method, tag, buttonEdit } = this.state;
    const { store: { wallet: { currencies } } } = this.props;
    return (
      <form id="W_Form_WF">
        <input
          className="W_input_WF"
          placeholder="valor"
          type="number"
          name="despesa"
          value={ despesa }
          onChange={ (ee) => this.change(ee) }
        />
        <input
          className="W_input_WF"
          placeholder="descrição"
          type="text"
          name="description"
          value={ description }
          onChange={ (ee) => this.change(ee) }
        />
        <select
          className="W_select"
          name="currency"
          value={ currency }
          onChange={ (ee) => this.change(ee) }
        >
          {currencies.map((aa, index) => (
            <option key={ `${aa}-${index}` }>{aa}</option>
          ))}
        </select>
        <select
          className="W_select"
          name="method"
          value={ method }
          onChange={ (ee) => this.change(ee) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          className="W_select"
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
        <button
          className="W_butoon"
          type="submit"
          onClick={ (aa) => {
            const button = buttonEdit ? this.submit(aa) : this.editTableSubmit(aa);
            return button;
          } }
        >
          { buttonEdit ? 'Adicionar despesa' : 'Editar despesa' }
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  store: PropTypes.shape({
    wallet: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string),
      expenses: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(WalletForm);
