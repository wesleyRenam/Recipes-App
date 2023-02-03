import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import CategoryBtn from '../components/CategoryBtn/CategoryBtn';
import RecipesProvider from '../context/RecipesProvider';
import Drinks from '../pages/Drinks/Drinks';
import Meals from '../pages/Meals/Meals';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('category button', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render all buttons correctly', () => {
    render(
      <RecipesProvider>
        <CategoryBtn category="Beef" type="meals" key={ 1 } />
      </RecipesProvider>,
    );

    expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
  });

  it('should render correct recipes when click in one meal category', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    const initialEntries = ['/meals'];
    renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
      { initialEntries },
    );

    const categoryBtn = await screen.findByRole('button', {
      name: /beef/i,
    });

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('should render correct recipes when click in one meal category', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });

    const initialEntries = ['/meals'];
    renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
      { initialEntries },
    );

    const categoryBtn = await screen.findByRole('button', {
      name: /beef/i,
    });

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalled();

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  it('should render correct recipes when click in one drink category', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    const initialEntries = ['/drinks'];
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
      { initialEntries },
    );

    const categoryBtn = await screen.findByRole('button', {
      name: /shake/i,
    });

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('should render correct recipes when click in one drink category', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    const initialEntries = ['/drinks'];
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
      { initialEntries },
    );

    const categoryBtn = await screen.findByTestId('Ordinary Drink-category-filter');

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalled();

    act(() => {
      userEvent.click(categoryBtn);
    });

    expect(global.fetch).toHaveBeenCalledTimes(4);
  });
});
