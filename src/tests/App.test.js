import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login/Login';
import App from '../App';

import { renderWithRouter } from './helpers/RenderWithRouter';
import LoginProvider from '../context/LoginProvider';

const loginInputEmail = () => screen.getByTestId('email-input');
const loginInputPassword = () => screen.getByTestId('password-input');
const loginButton = () => screen.getByRole('button', { name: /enter/i });

describe('test login if"s works correctly', () => {
  it('users inputs and button to be in the document', () => {
    render(<Login />);

    expect(loginInputEmail()).toBeInTheDocument();
    expect(loginInputPassword()).toBeInTheDocument();
    expect(loginButton()).toBeInTheDocument();
  });
  it('should button be disable if type anything on inputs', () => {
    render(<Login />);

    userEvent.type(loginInputEmail(), 'olamundo');
    userEvent.type(loginInputPassword(), 'olamundo');
    expect(loginButton()).toBeDisabled();
  });
  it('should button be enabled if type correct email and correct password on inputs', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <App />
      </LoginProvider>,
    );

    userEvent.type(loginInputEmail(), 'teste@teste.com');
    userEvent.type(loginInputPassword(), '1234567');
    expect(loginButton()).not.toBeDisabled();
    userEvent.click(loginButton());

    expect(history.location.pathname).toBe('/meals');
  });
});

describe('test with footer works correctly', () => {
  it('should be render on bottom page', () => {
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const drinkIcon = screen.getByRole('img', { name: /icone bebida/i });
    const foodIcon = screen.getByRole('img', {
      name: /icone comida/i,
    });

    expect(drinkIcon).toBeInTheDocument();
    expect(foodIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');
  });
});
