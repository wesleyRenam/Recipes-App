import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('test done recipes page', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  const recipesImage = () => screen.getAllByRole('img', {
    name: 'imagem da receita',
  });

  it('should render buttons correctly', () => {
    renderWithRouter(<DoneRecipes />);
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
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    expect(recipesImage()).toHaveLength(2);
  });
  it('should can click in the meal filter buttons', () => {
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(MealButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should can click in the drink filter buttons', () => {
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const DrinkButton = screen.getByRole('button', {
      name: /drinks/i,
    });

    userEvent.click(DrinkButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should can click in the all filter buttons', () => {
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const AllButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(AllButton);

    expect(recipesImage()).toHaveLength(2);
  });
  it('should render the shares button', async () => {
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const shareButton = screen.getAllByAltText('share button');
    expect(shareButton).toHaveLength(2);
  });
  it('should if click the shares button and receive data', () => {
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);

    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    expect(mockedWriteText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  it('should copy button render and works correctly after one filter', () => {
    const initialEntries = ['/favorite-recipes'];
    renderWithRouter(<DoneRecipes />, { initialEntries });
    JSON.parse(localStorage.getItem('FavoriteRecipes'));

    const MealButton = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(MealButton);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);

    expect(recipesImage()).toHaveLength(1);
  });
  it('should render not recipes when no have done recipes', () => {
    localStorage.clear();
    renderWithRouter(<DoneRecipes />);
    JSON.parse(localStorage.getItem('doneRecipes'));

    const text = screen.getByText('Você não possui receitas inciadas.');

    expect(text).toBeInTheDocument();
  });
});
