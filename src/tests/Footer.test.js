import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Footer from '../components/Footer/Footer';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/renderWithRouter';

const mealButton = 'meals-bottom-btn';
const drinkButton = 'drinks-bottom-btn';

describe('footer component', () => {
  it('should render correctly', () => {
    renderWithRouter(
      <RecipesProvider>
        <Footer />
      </RecipesProvider>,
    );

    expect(screen.getByTestId(mealButton)).toBeInTheDocument();
    expect(screen.getByTestId(drinkButton)).toBeInTheDocument();
  });

  it('should redirect to meal page on click drink button', async () => {
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries },
    );

    act(() => {
      userEvent.click(screen.getByTestId(drinkButton));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });
  });

  it('should redirect to drink page on click meal button', async () => {
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries },
    );

    act(() => {
      userEvent.click(screen.getByTestId(mealButton));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
  });
});
