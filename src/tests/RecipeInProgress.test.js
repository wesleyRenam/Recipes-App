import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import RecipesProvider, { RecipesContext } from '../context/RecipesProvider';
import * as useGetLocalStorage from '../hooks/useGetLocalStorage';
import RecipeInProgress from '../pages/RecipeInProgress/RecipeInProgress';
import { renderWithRouter } from './helpers/renderWithRouter';
import { drinks } from '../../cypress/mocks/drinks';

const favoriteButton = 'favorite-btn';

describe('recipe in progress', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should render all drinks elements', () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
      { initialEntries },
    );

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favoriteButton)).toBeInTheDocument();
  });

  it('should render all meals elements', () => {
    const initialEntries = ['/meals'];
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
      { initialEntries },
    );

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favoriteButton)).toBeInTheDocument();
  });

  it('should render clicked on click in share button', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
      { initialEntries },
    );
    const shareBtn = screen.getByTestId('share-btn');

    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };

    act(() => {
      userEvent.click(shareBtn);
    });

    await wait(async () => {
      const linkCopied = await screen.findByText('Link Copied!');
      expect(linkCopied).toBeInTheDocument();
      expect(mockedWriteText).toBeCalledWith('http://localhost/meals/52771');
    });
  });
  it('should not render ingredients when function not work', async () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: [],
      isFavorite: false,
      inProgress: true,
      setInProgress: jest.fn(),
      setIsFavorite: jest.fn(),
    });
    renderWithRouter(
      <RecipesContext.Provider
        value={
          { setRecipeDetail: jest.fn(),
            setRecipes: jest.fn(),
            setIngredients: jest.fn(),
            setFilterRecipes: jest.fn(),
            filterRecipes: drinks.drinks,
            recipe: {
              idDrink: '15997',
              strDrink: 'GG',
              strDrinkAlternate: null,
              strDrinkES: null,
              strDrinkDE: null,
              strDrinkFR: null,
              'strDrinkZH-HANS': null,
              'strDrinkZH-HANT': null,
              strTags: null,
              strVideo: null,
              strCategory: 'Ordinary Drink',
              strIBA: null,
              strAlcoholic: 'Optional alcohol',
              strGlass: 'Collins Glass',
              strInstructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
              strInstructionsES: null,
              strInstructionsDE: 'Den Galliano-Likör über Eis gießen. Füllen Sie den Rest des Glases mit Ginger Ale und das ist alles, was dazu gehört. Du hast jetzt ein eigenes GG.',
              strInstructionsFR: null,
              'strInstructionsZH-HANS': null,
              'strInstructionsZH-HANT': null,
              strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
              strIngredient1: 'Galliano',
              strIngredient2: 'Ginger ale',
              strIngredient3: 'Ice',
              strIngredient4: null,
              strIngredient5: null,
              strIngredient6: null,
              strIngredient7: null,
              strIngredient8: null,
              strIngredient9: null,
              strIngredient10: null,
              strIngredient11: null,
              strIngredient12: null,
              strIngredient13: null,
              strIngredient14: null,
              strIngredient15: null,
              strMeasure1: '2 1/2 shots ',
              strMeasure2: null,
              strMeasure3: null,
              strMeasure4: null,
              strMeasure5: null,
              strMeasure6: null,
              strMeasure7: null,
              strMeasure8: null,
              strMeasure9: null,
              strMeasure10: null,
              strMeasure11: null,
              strMeasure12: null,
              strMeasure13: null,
              strMeasure14: null,
              strMeasure15: null,
              strCreativeCommonsConfirmed: 'No',
              dateModified: '2016-07-18 22:06:00',
            },
            ingredients: {
              ingredients: [],
              measures: [],
            } }
        }
      >
        <RecipeInProgress />
      </RecipesContext.Provider>,
    );
  });

  it('should set favorite on click favorite button', () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: [],
      isFavorite: false,
      inProgress: false,
      setInProgress: jest.fn(),
      setIsFavorite: jest.fn(),
    });
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
    );

    const favBtn = screen.getByTestId(favoriteButton);

    act(() => {
      userEvent.click(favBtn);
    });

    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(favBtn);
    });

    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
  it('should set favorite on click favorite button', () => {
    jest.spyOn(useGetLocalStorage, 'default').mockReturnValue({
      ingredientsChecked: [],
      isFavorite: false,
      inProgress: false,
      setInProgress: jest.fn(),
      setIsFavorite: jest.fn(),
    });
    renderWithRouter(
      <RecipesProvider>
        <RecipeInProgress />
      </RecipesProvider>,
    );

    const finishBtn = screen.getByTestId('finish-recipe-btn');

    act(() => {
      userEvent.click(finishBtn);
    });
  });
});
