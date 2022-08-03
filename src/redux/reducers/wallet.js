import { GET_CURRENCIES, GET_EXPENSES, TOTALBRL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalBRL: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload],
    };
  case TOTALBRL:
    return {
      ...state,
      totalBRL: state.totalBRL + action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
