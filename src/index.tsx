
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App';

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
      <Router>
        <Provider store={store}>
          <App/>
        </Provider>
      </Router>
  );
}

