import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('test done recipes page', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  beforeEach(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  const recipesImage = () => screen.getAllByRole('img', {
    name: 'imagem da receita',
  });

  it('should render buttons correctly', () => {
    renderWithRouter(<FavoriteRecipes />);
    const AllButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(AllButton).toBeInTheDocument();
    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });
    expect(MealButton).toBeInTheDocument();
    const DrinkButton = screen.getByRole('button', {
      name: /drinks/i,
    });
    expect(DrinkButton).toBeInTheDocument();
  });
  it('should render done recipes correctly', () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    expect(recipesImage()).toHaveLength(2);
  });
  it('should can click in the meal filter buttons', () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(MealButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should can click in the drink filter buttons', () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const DrinkButton = screen.getByRole('button', {
      name: /drinks/i,
    });

    userEvent.click(DrinkButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should can click in the all filter buttons', () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const AllButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(AllButton);

    expect(recipesImage()).toHaveLength(2);
  });
  it('should render the shares button', async () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const shareButton = screen.getAllByAltText('share button');
    expect(shareButton).toHaveLength(4);
  });
  it('should if click the shares button and receive data', async () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);

    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    expect(mockedWriteText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  it('should if click the favorite button recipes are rerender and localstorage update', () => {
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(recipesImage()).toHaveLength(2);

    userEvent.click(favoriteButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should favorite button render and works correctly after one filter', () => {
    const initialEntries = ['/favorite-recipes'];
    renderWithRouter(<FavoriteRecipes />, { initialEntries });
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(MealButton);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);

    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteButton);
    expect(recipesImage()).toHaveLength(1);
  });
  it('should shares button render and works correctly after one filter', () => {
    const initialEntries = ['/favorite-recipes'];
    renderWithRouter(<FavoriteRecipes />, { initialEntries });
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(MealButton);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should render not recipes when no have done recipes', () => {
    localStorage.clear();
    renderWithRouter(<FavoriteRecipes />);
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const text = screen.getByText('Você não possui receitas favoritas.');

    expect(text).toBeInTheDocument();
  });
});
