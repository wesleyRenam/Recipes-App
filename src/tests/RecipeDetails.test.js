import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import drinks from '../../cypress/mocks/drinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipesProvider, { RecipesContext } from '../context/RecipesProvider';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import { renderWithRouter } from './helpers/renderWithRouter';

const favoriteButton = 'favorite-btn';
const startButton = 'start-recipe-btn';

describe('recipes details', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all drinks elements correctly', async () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(
      <RecipesProvider>
        <RecipeDetails />
      </RecipesProvider>,
      { initialEntries },
    );

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favoriteButton)).toBeInTheDocument();
    expect(screen.getByTestId(startButton)).toBeInTheDocument();
  });
  it('should render all meals elements correctly', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(
      <RecipesProvider>
        <RecipeDetails />
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
        <RecipeDetails />
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
  it('should redirect to correct page on click in start recipe', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const initialEntries = ['/meals/52771'];
    const { history } = renderWithRouter(
      <RecipesProvider>
        <RecipeDetails />
      </RecipesProvider>,
      { initialEntries },
    );
    const startRecipeBtn = screen.getByTestId(startButton);

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });
  it('should render continue recipe with start button when clicked', async () => {
    renderWithRouter(
      <RecipesProvider>
        <RecipeDetails />
      </RecipesProvider>,
    );

    const startRecipeBtn = screen.getByTestId(startButton);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');

    act(() => {
      userEvent.click(startRecipeBtn);
    });

    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  it('should set favorite on click favorite button', () => {
    renderWithRouter(
      <RecipesProvider>
        <RecipeDetails />
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
  it('should render ingredients correctly', async () => {
    renderWithRouter(
      <RecipesContext.Provider
        value={
          { setRecipeDetail: jest.fn(),
            setRecipes: jest.fn(),
            setIngredients: jest.fn(),
            setFilterRecipes: jest.fn(),
            filterRecipes: drinks.drinks,
            recipe: drinks.drinks,
            ingredients: {
              ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
              measures: ['measure1', 'measure2'],
            } }
        }
      >
        <RecipeDetails />
      </RecipesContext.Provider>,
    );

    expect(await screen.findByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
  });
  it('should not render ingredients when function not work', async () => {
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
        <RecipeDetails />
      </RecipesContext.Provider>,
    );
  });
});
