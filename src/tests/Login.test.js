import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login/Login';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('login page', () => {
  const emailInput = () => screen.getByTestId('email-input');
  const passwordInput = () => screen.getByTestId('password-input');
  const enterButton = () => screen.getByTestId('login-submit-btn');
  it('should render login page correctly', () => {
    render(<Login />);

    expect(emailInput()).toBeInTheDocument();
    expect(passwordInput()).toBeInTheDocument();
    expect(enterButton()).toBeInTheDocument();
  });
  it('should can use inputs and before click redirect to correct page, using correct dates', () => {
    const { history } = renderWithRouter(<Login />);

    act(() => {
      userEvent.type(emailInput(), 'correctEmail@email.com');
      userEvent.type(passwordInput(), 'correctPassword');
      userEvent.click(enterButton());
    });

    expect(history.location.pathname).toBe('/meals');
  });
  it('should can use inputs and before click not redirect to correct page, using wrong dates', () => {
    const { history } = renderWithRouter(<Login />);

    act(() => {
      userEvent.type(emailInput(), 'wrongEmail');
      userEvent.type(passwordInput(), 'wrongPassword');
    });

    expect(history.location.pathname).toBe('/');
    expect(enterButton()).toBeDisabled();
  });
});
