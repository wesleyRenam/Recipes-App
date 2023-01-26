import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes/Recipes';
import { renderWithRouter } from './helpers/RenderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

const categoryMock = [
  { strCategory: 'Beef' }, { strCategory: 'Breakfast' }, { strCategory: 'Chicken' }, { strCategory: 'Dessert' }, { strCategory: 'Goat' }, { strCategory: 'Lamb' }, { strCategory: 'Miscellaneous' }, { strCategory: 'Pasta' }, { strCategory: 'Pork' }, { strCategory: 'Seafood' }, { strCategory: 'Side' }, { strCategory: 'Starter' }, { strCategory: 'Vegan' }, { strCategory: 'Vegetarian' },
];

const mealMock = [
  { idMeal: 52978, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg' },
  { idMeal: 52979, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//tkxquw1628771028.jpg' },
  { idMeal: 52980, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//g046bb1663960946.jpg' },
  { idMeal: 52981, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//mlchx21564916997.jpg' },
  { idMeal: 52982, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg' },
  { idMeal: 52983, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//urzj1d1587670726.jpg' },
  { idMeal: 52984, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//4er7mj1598733193.jpg' },
  { idMeal: 52985, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//g046bb1663960946.jpg' },
  { idMeal: 52986, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//mlchx21564916997.jpg' },
  { idMeal: 52987, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//sxysrt1468240488.jpg' },
  { idMeal: 52989, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//ysxwuq1487323065.jpg' },
  { idMeal: 52990, strMeal: 'Corba', strMealThumb: 'https://www.themealdb.com//images//media//meals//ysxwuq1487323065.jpg' },
];

describe('test if recipes works correctly', () => {
  it('should render all category correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ categoryMock }
        isLoading={ false }
        recipe={ mealMock }
      />,
    );

    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons.length).toBe(6);
  });
  it('should render "Carregando" if isLoading is true', () => {
    render(
      <Recipes
        categorys={ categoryMock }
        isLoading
        recipe={ mealMock }
      />,
    );

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
  });
  it('should all the recipes render correctly', () => {
    renderWithRouter(
      <Recipes
        categorys={ categoryMock }
        isLoading={ false }
        recipe={ mealMock }
      />,
    );

    const recipes = screen.getAllByRole('img', {
      name: /foto do produto/i,
    });

    expect(recipes).toHaveLength(12);
  });
  it('should render filterRecipes onclick the filterButton', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes
          categorys={ categoryMock }
          isLoading={ false }
          recipe={ mealMock }
        />
      </RecipesProvider>,
    );

    const recipes = screen.getAllByRole('img');

    expect(recipes).toHaveLength(12);

    const recipe = screen.getByTestId('0-recipe-card');

    userEvent.click(recipe);

    expect(history.location.pathname).toBe('/meals/52978');
  });
});
