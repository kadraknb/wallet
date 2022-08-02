export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const loginAction = (par1) => ({
  type: GET_EMAIL,
  payload: par1,
});

export const currenciasAction = (par1) => ({
  type: GET_CURRENCIES,
  payload: par1,
});

// export default { loginAction, currenciasAction };
