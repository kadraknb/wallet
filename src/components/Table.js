import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removExpensesAction } from '../redux/actions';
import './components.css';

class Table extends Component {
  removExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(removExpensesAction(id));
  };

  editExpenses = (id) => {
    const {
      store: {
        wallet: { funEdit },
      },
    } = this.props;
    funEdit(id);
  };

  render() {
    const {
      store: {
        wallet: { expenses },
      },
    } = this.props;
    const itensTH = [
      'Descrição',
      'Tipo',
      'Método de pagamento',
      'Valor',
      'Câmbio utilizado',
      'Moeda de conversão',
      'Valor convertido',
      'Editar/Excluir',
    ];
    return (
      <table id="W_table">
        <thead>
          <tr>
            {itensTH.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses
            && expenses.map((aa) => {
              const ValorConvertido = Number(
                aa.exchangeRates[aa.currency].ask,
              ) * Number(aa.value);
              return (
                <tr key={ aa.id }>
                  <td>{aa.description}</td>
                  <td>{aa.tag}</td>
                  <td>{aa.method}</td>
                  <td>{Number(aa.value).toFixed(2)}</td>
                  <td>{aa.currency}</td>
                  <td>
                    {Number(aa.exchangeRates[aa.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    R$
                    {' '}
                    {ValorConvertido.toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="W_butoon"
                      type="button"
                      onClick={ () => this.editExpenses({
                        id: aa.id,
                        value: ValorConvertido,
                      }) }
                    >
                      Editar
                    </button>
                    <button
                      className="W_butoon"
                      type="button"
                      onClick={ () => this.removExpenses({
                        id: aa.id,
                        value: ValorConvertido,
                      }) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  store: PropTypes.shape({
    wallet: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.string),
      expenses: PropTypes.arrayOf(PropTypes.shape()),
      funEdit: PropTypes.func,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ store });

export default connect(mapStateToProps)(Table);
