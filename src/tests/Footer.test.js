import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals/Meals';
import { renderWithRouter } from './helpers/RenderWithRouter';

describe('test with footer works correctly', () => {
  it('should be render on bottom page', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );

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
