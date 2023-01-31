import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import App from '../App';
import SearchBar from '../components/SearchBar/SearchBar';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/renderWithRouter';

const ingredientSearchRadio = 'ingredient-search-radio';
const searchInput = 'search-input';
const execSearchBtn = 'exec-search-btn';
const nameSearchBtn = 'name-search-radio';

describe('search bar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a filter list when use ingredient filter on drink page', () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/drinks" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksByIngredient.drinks),
    });

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'ice');
      userEvent.click(screen.getByTestId(ingredientSearchRadio));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ice');
  });

  it('should render a filter list when use wrong name filter on drink page', async () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/drinks" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const alertMock = jest.spyOn(global, 'alert');

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'xablau');
      userEvent.click(screen.getByTestId(nameSearchBtn));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should render a filter list when use name filter on drink page', () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/drinks" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ filterRecipes: drinksByIngredient.drinks }),
    });

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'beef');
      userEvent.click(screen.getByTestId(nameSearchBtn));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should render a filter list when use wrong first letter filter on drink page', async () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/drinks" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ filterRecipes: drinksByIngredient.drinks }),
    });

    const alertMock = jest.spyOn(global, 'alert');

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'beef');
      userEvent.click(screen.getByTestId('first-letter-search-radio'));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('should render a filter list when use first letter filter on drink page', () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/drinks" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ filterRecipes: drinksByIngredient.drinks }),
    });

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'b');
      userEvent.click(screen.getByTestId('first-letter-search-radio'));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should render a filter list when use ingredient filter on meals page', () => {
    render(
      <RecipesProvider>
        <SearchBar pathname="/meals" />
      </RecipesProvider>,
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient.meals),
    });

    act(() => {
      userEvent.type(screen.getByTestId(searchInput), 'chicken');
      userEvent.click(screen.getByTestId(ingredientSearchRadio));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('should redirect to unique page with have a unique meal result', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [{ idMeal: '1' }] }),
    });

    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    act(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    });

    act(() => {
      userEvent.click(screen.getByTestId(nameSearchBtn));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/meals/1');
    });
  });

  it('should redirect to unique page with have a unique drink result', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: [{ idDrink: '1' }] }),
    });

    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    act(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    });

    act(() => {
      userEvent.click(screen.getByTestId(nameSearchBtn));
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/drinks/1');
    });
  });
});
