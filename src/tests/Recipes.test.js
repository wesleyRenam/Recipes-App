import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes/Recipes';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/RenderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('test if recipes works correctly', () => {
  it('should render "Carregando" if isLoading is true', () => {
    render(
      <Recipes
        categorys={ mealCategories.meals }
        isLoading
        recipe={ meals.meals }
      />,
    );

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
  });

  it('should render all category meals correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ mealCategories.meals }
        isLoading={ false }
        recipe={ meals.meals }
      />,
    );

    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons.length).toBe(6);
  });

  it('should render all category drinks correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ drinkCategories.drinks }
        isLoading={ false }
        recipe={ drinks.drinks }
      />,
    );

    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons.length).toBe(6);
  });

  it('should all the meals recipes render correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ mealCategories.meals }
        isLoading={ false }
        recipe={ meals.meals }
      />,
    );

    const recipes = screen.getAllByRole('img', {
      name: /foto do produto/i,
    });

    expect(recipes).toHaveLength(12);
  });

  it('should all the drinks recipes render correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ drinkCategories.drinks }
        isLoading={ false }
        recipe={ drinks.drinks }
      />,
    );

    const recipes = screen.getAllByRole('img', {
      name: /foto do produto/i,
    });

    expect(recipes).toHaveLength(12);
  });

  it('should click in the meal filterButton', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ mealCategories.meals }
          isLoading={ false }
          recipe={ meals.meals }
        />
      </RecipesProvider>,
    );

    const filterButton = screen.getByRole('button', {
      name: /chicken/i,
    });

    userEvent.click(filterButton);
  });

  it('should click in the drinks filterButton', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ drinkCategories.drinks }
          isLoading={ false }
          recipe={ drinks.drinks }
        />
      </RecipesProvider>,
    );

    const filterButton = screen.getByRole('button', {
      name: /shake/i,
    });

    userEvent.click(filterButton);
  });

  it('should redirect to meals/:id page', async () => {
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ mealCategories.meals }
          isLoading={ false }
          recipe={ meals.meals }
        />
      </RecipesProvider>,
      { initialEntries },
    );

    const recipe = screen.getByRole('link', {
      name: /foto do produto corba/i,
    });

    userEvent.click(recipe);

    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('should redirect to drinks/:id page', async () => {
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ drinkCategories.drinks }
          isLoading={ false }
          recipe={ drinks.drinks }
        />
      </RecipesProvider>,
      { initialEntries },
    );

    const recipe = screen.getByRole('link', {
      name: /foto do produto gg/i,
    });
    userEvent.click(recipe);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('should reset all filter onclick on All button', () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ mealCategories.meals }
          isLoading={ false }
          recipe={ meals.meals }
        />
      </RecipesProvider>,
    );

    userEvent.click(screen.getByRole('button', {
      name: /all/i,
    }));

    const recipes = screen.getAllByRole('img', {
      name: /foto do produto/i,
    });

    expect(recipes).toHaveLength(12);
  });
});
