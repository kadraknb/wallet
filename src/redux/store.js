import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

if (window.Cypress) {
  window.store = store;
}

// store.subscribe(() => {
//   console.log(store.getState());
//   store.getState().wallet.expenses.forEach((aa) => {
//     const total += Number(aa.exchangeRates[aa.currency].ask) * Number(aa.value);
//     console.log(total.toFixed(2));
//   });
//   //  total;
// });

// store.subscribe(() => {
//   console.log(store.getState());
//   store
//     .getState()
//     .wallet.expenses.reduce(
//       (aa) => Number(aa.exchangeRates[aa.currency].ask) * Number(aa.value),
//       0,
//     );
// });
// export { total };
export default store;
