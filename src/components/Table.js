import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removExpensesAction } from '../redux/actions';

class Table extends Component {
  removExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(removExpensesAction(id));
  }

  render() {
    const { store: { walletReducer: { expenses } } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            && expenses.map((aa) => (
              <tr key={ aa.id }>
                <td>{aa.description}</td>
                <td>{aa.tag}</td>
                <td>{aa.method}</td>
                <td>{aa.value}</td>
                <td>{aa.exchangeRates[aa.currency].name}</td>
                <td>{aa.tag}</td>
                <td>
                  {Number(aa.exchangeRates[aa.currency].ask) * Number(aa.value)}
                </td>
                <td>{Number(aa.exchangeRates[aa.currency].ask).toFixed(2)}</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.removExpenses({
                      id: aa.id,
                      value:
                          Number(aa.exchangeRates[aa.currency].ask)
                          * Number(aa.value),
                    }) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  store: PropTypes.shape({
    walletReducer: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string),
      expenses: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ store: state });

export default connect(mapStateToProps)(Table);
