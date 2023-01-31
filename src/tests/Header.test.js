import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header/Header';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from './helpers/RenderWithRouter';

describe('Testa o componente Header, e verifica: ', () => {
  test('Se o botão para o profile funciona corretamente', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getAllByRole('button');
    userEvent.click(profileButton[0]);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');
  });
  test('Se o botão para exibir a SearchBar funciona corretamente', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/meals');
    });
    const allButtons = screen.getAllByRole('button');
    userEvent.click(allButtons[1]);
    const searchBar = screen.getByTestId('search-top-btn');
    expect(searchBar).toBeInTheDocument();
  });
  test('Se o input do SearchBar funciona corretamente', () => {
    const { history } = renderWithRouter(<RecipesProvider><Header /></RecipesProvider>);
    act(() => {
      history.push('/meals');
    });
    const allButtons = screen.getAllByRole('button');
    userEvent.click(allButtons[1]);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    userEvent.type(searchBar, 'Corba');
    expect(searchBar).toHaveValue('Corba');
  });
});
