import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login/Login';

import { renderWithRouter } from './helpers/RenderWithRouter';
import LoginProvider from '../context/LoginProvider';

const loginInputEmail = () => screen.getByTestId('email-input');
const loginInputPassword = () => screen.getByTestId('password-input');
const loginButton = () => screen.getByRole('button', { name: /enter/i });

describe('test login works correctly', () => {
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
        <Login />
      </LoginProvider>,
    );

    userEvent.type(loginInputEmail(), 'teste@teste.com');
    userEvent.type(loginInputPassword(), '1234567');
    expect(loginButton()).not.toBeDisabled();
    userEvent.click(loginButton());

    expect(history.location.pathname).toBe('/meals');
  });
});
