import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App animated={!localStorage.getItem('notAnimated')} specialEffects={window.__SPECIAL_EFFECTS__ || []} />,
  document.getElementById('root'),
);
