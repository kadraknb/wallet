export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const TOTALBRL = 'TOTALBRL';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

export const loginAction = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const currenciasAction = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const expensesAction = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const removExpensesAction = (payload) => ({
  type: REMOVE_EXPENSES,
  payload,
});

export const totalBRLAction = (payload) => ({
  type: TOTALBRL,
  payload,
});

// export default { loginAction, currenciasAction };
