import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RecipesProvider from '../context/RecipesProvider';
import Header from '../components/Header/Header';
import { renderWithRouter } from './helpers/RenderWithRouter';

describe('Testa o componente Header, e verifica: ', () => {
  const dataTestIdButtonToSearch = 'exec-search-btn';
  const dataTestIdInputSearch = 'search-input';
  test('Se o filtro funciona corretamente, na página drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><Header /></RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const allButtons = screen.getAllByRole('button');
    userEvent.click(allButtons[1]);
    const inputSearch = screen.getByTestId(dataTestIdInputSearch);
    userEvent.type(inputSearch, 'Aquamarine');
    const radioButtonName = screen.getByTestId('name-search-radio');
    userEvent.click(radioButtonName);
    const buttonToSearch = screen.getByTestId(dataTestIdButtonToSearch);
    userEvent.click(buttonToSearch);
  });
  test('Se o filtro funciona corretamente, na página meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><Header /></RecipesProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const allButtons = screen.getAllByRole('button');
    userEvent.click(allButtons[1]);
    const inputSearch = screen.getByTestId(dataTestIdInputSearch);
    userEvent.type(inputSearch, 'Chicken');
    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioButtonIngredient);
    const buttonToSearch = screen.getByTestId(dataTestIdButtonToSearch);
    userEvent.click(buttonToSearch);
  });
  test('Se o filtro funciona corretamente no first letter button radio, na página drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider><Header /></RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const allButtons = screen.getAllByRole('button');
    userEvent.click(allButtons[1]);
    const inputSearch = screen.getByTestId(dataTestIdInputSearch);
    userEvent.type(inputSearch, 'G');
    const radioButtonLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioButtonLetter);
    const buttonToSearch = screen.getByTestId(dataTestIdButtonToSearch);
    const event = userEvent.click(buttonToSearch);

    console.log(event);
  });
});
