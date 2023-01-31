import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';
import { renderWithRouter } from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

const profileBtn = 'profile-top-btn';
const searchBtn = 'search-top-btn';
const title = 'page-title';
const ingredientSearchRadio = 'ingredient-search-radio';
const searchInput = 'search-input';
const execSearchBtn = 'exec-search-btn';

describe('Header component', () => {
  const renderProvider = () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );
  };
  it('should render correctly all elements', () => {
    renderProvider();
    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should render correct with props are received', () => {
    render(
      <RecipesProvider>
        <Header searchButton={ false } />
      </RecipesProvider>,
    );

    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchBtn)).not.toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should render correct with props are received', () => {
    render(
      <RecipesProvider>
        <Header profileButton={ false } />
      </RecipesProvider>,
    );

    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(profileBtn)).not.toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should redirect to profile when click in profile button', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Header title="profile" />
      </RecipesProvider>,
    );

    act(() => {
      userEvent.click(screen.getByTestId(profileBtn));
    });

    expect(history.location.pathname).toBe('/profile');
    expect(await screen.findByTestId(title)).toHaveTextContent(/profile/i);
  });
  it('should on click search Button, a search bar open', async () => {
    renderProvider();
    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    const searchInputBtn = await screen.findByTestId(searchInput);

    expect(searchInputBtn).toBeInTheDocument();
  });
  it('should on click search Button, a search bar disappear', async () => {
    renderProvider();
    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    const searchInputBtn = await screen.findByTestId(searchInput);

    expect(searchInputBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    expect(searchInputBtn).not.toBeInTheDocument();
  });
  it('should render three radio button and another search button on click search button', async () => {
    renderProvider();
    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    const ingredientSearch = await screen.findByTestId(ingredientSearchRadio);
    const nameSearch = await screen.findByTestId('name-search-radio');
    const firstLetterSearch = await screen.findByTestId('first-letter-search-radio');
    const execSearchButton = await screen.findByTestId(execSearchBtn);

    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
    expect(execSearchButton).toBeInTheDocument();
  });
});
