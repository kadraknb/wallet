import {
  EDIT_TABLEL,
  FUN_EDIT_TABLEL,
  GET_CURRENCIES,
  GET_EXPENSES,
  REMOVE_EXPENSES,
  TOTALBRL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalBRL: 0,
  funEdit: () => '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
    };
  case GET_EXPENSES:
    console.log(state.expenses);
    console.log(action.payload);
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((aa) => aa.id !== action.payload.id),
      totalBRL: Math.abs(state.totalBRL - action.payload.value),
    };
  case TOTALBRL:
    return {
      ...state,
      totalBRL: state.totalBRL + action.payload,
    };
  case EDIT_TABLEL:
    state.expenses.splice(action.payload.id, 1, action.payload.expense);
    return {
      ...state,
      totalBRL: Math.abs(state.totalBRL + action.payload.changeTotalBRL),
    };
  case FUN_EDIT_TABLEL:
    return {
      ...state,
      funEdit: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
