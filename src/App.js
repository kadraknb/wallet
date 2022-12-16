import React, { useState } from 'react';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  const [router, setRouter] = useState('Wallet');

  const routers = {
    Login: <Login router={ setRouter } />,
    Wallet: <Wallet router={ setRouter } />,
  };

  return (
    <div id="W_main">
      {routers[router]}
    </div>
  );
}

export default App;
