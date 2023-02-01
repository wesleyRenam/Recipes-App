import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipesProvider from '../context/RecipesProvider';
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
});
