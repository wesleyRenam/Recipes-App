import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile/Profile';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('', () => {
  const user = { user: 'teste@teste.com' };

  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should render user email and components correctly', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const doneRecipeButton = screen.getByRole('link', {
      name: /done recipes/i,
    });
    expect(doneRecipeButton).toBeInTheDocument();

    const favoriteRecipeButton = screen.getByRole('link', {
      name: /favorite recipes/i,
    });
    expect(favoriteRecipeButton).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(logoutButton).toBeInTheDocument();
  });
  it('should usuario is render if not valid email insert', () => {
    window.localStorage.clear();
    const initialEntries = ['/profile'];
    renderWithRouter(
      <Profile />,
      { initialEntries },
    );
    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('usuario');
  });
  it('should redirect correctly on click in done recipes button', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneRecipeButton = screen.getByRole('link', {
      name: /done recipes/i,
    });

    userEvent.click(doneRecipeButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('should redirect correctly on click in favorite recipes button', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteRecipeButton = screen.getByRole('link', {
      name: /favorite recipes/i,
    });

    userEvent.click(favoriteRecipeButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('should clear local storage and redirect to login on click logout', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    const getItem = window.localStorage.getItem('user');

    expect(JSON.parse(getItem)).toEqual({
      user: 'teste@teste.com',
    });

    userEvent.click(logoutButton);
    const secondGetItem = window.localStorage.getItem('user');

    expect(history.location.pathname).toBe('/');
    expect(secondGetItem).toEqual(null);
  });
});
