import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header/Header';
import { renderWithRouter } from './helpers/renderWithRouter';

const profileBtn = 'profile-top-btn';
const searchBtn = 'search-top-btn';
const title = 'page-title';

describe('Header component', () => {
  it('should render correctly all elements', () => {
    render(<Header />);

    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should render correct with props are received', () => {
    render(<Header searchButton={ false } />);

    expect(screen.getByTestId(profileBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(searchBtn)).not.toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should render correct with props are received', () => {
    render(<Header profileButton={ false } />);

    expect(screen.getByTestId(searchBtn)).toBeInTheDocument();
    expect(screen.queryByTestId(profileBtn)).not.toBeInTheDocument();
    expect(screen.getByTestId(title)).toBeInTheDocument();
  });
  it('should redirect to profile when click in profile button', async () => {
    const { history } = renderWithRouter(<Header title="profile" />);

    act(() => {
      userEvent.click(screen.getByTestId(profileBtn));
    });

    expect(history.location.pathname).toBe('/profile');
    expect(await screen.findByTestId(title)).toHaveTextContent(/profile/i);
  });
  it('should on click search Button, a search bar open', async () => {
    render(<Header />);

    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    const searchInput = await screen.findByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });
  it('should on click search Button, a search bar disappear', async () => {
    render(<Header />);

    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    const searchInput = await screen.findByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(searchBtn));
    });

    expect(searchInput).not.toBeInTheDocument();
  });
});
