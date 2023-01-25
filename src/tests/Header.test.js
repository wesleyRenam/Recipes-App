import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header/Header';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Header, e verifica: ', () => {
  test('Se o botão para o profile funciona corretamente', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getAllByRole('button');
    fireEvent.click(profileButton[0]);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');
  });
  test('Se o botão para exibir a SearchBar funciona corretamente', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/meals');
    });
    const allButtons = screen.getAllByRole('button');
    fireEvent.click(allButtons[1]);
    const searchBar = screen.getByTestId('search-top-btn');
    expect(searchBar).toBeInTheDocument();
  });
});
