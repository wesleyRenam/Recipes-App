import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoginProvider from './context/LoginProvider';
import RecipesProvider from './context/RecipesProvider';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </RecipesProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
