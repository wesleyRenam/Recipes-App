import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import RecipesProvider from './context/RecipesProvider';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <RecipesProvider>
          <GlobalStyle />
          <App />
        </RecipesProvider>
      </ThemeProvider>
    </BrowserRouter>,
  );
