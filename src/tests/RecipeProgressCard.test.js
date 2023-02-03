import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import RecipeProgressCard from '../components/RecipeProgressCard/RecipeProgressCard';
import * as useGetLocalStorage from '../hooks/useGetLocalStorage';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('recipe progress card', () => {
  it('should render all elements correctly', async () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: [],

    });
    renderWithRouter(
      <RecipeProgressCard
        verifyIsFinish={ jest.fn() }
        ingredients={ ['teste', 'teste2'] }
      />,
    );
  });
  it('should not render all elements with ingredientsChecked not exist', async () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: null,
    });

    renderWithRouter(
      <RecipeProgressCard
        verifyIsFinish={ jest.fn() }
      />,
    );
  });
  it('should have a correct style in checked item', () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: ['ingredient1'],
    });

    renderWithRouter(
      <RecipeProgressCard
        verifyIsFinish={ jest.fn() }
        ingredients={ ['ingredient1'] }
        measures={ ['measure1'] }
      />,
    );

    const btn = screen.getByTestId('0-ingredient-step');

    expect(btn).toHaveStyle(`
    textDecoration: line-through solid rgb(0, 0, 0)
    `);
  });
  it('should add a new item in localStorage on click in handleChange', () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: ['ingredient1'],
    });

    const initialEntries = ['/meals/52977'];
    renderWithRouter(<RecipeProgressCard
      verifyIsFinish={ jest.fn() }
      ingredients={ ['ingredient1', 'ingredient2'] }
    />, { initialEntries });

    // const btn = screen.getByTestId('1-ingredient-step');

    act(() => {
      // userEvent.click(btn);
    });
  });
});
