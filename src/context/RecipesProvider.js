/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export const RecipesContext = createContext({});

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const { makeFetch, isLoading } = useFetch();
  const [typeSearch, setTypeSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    const realizeFetch = async () => {
      const dataDrinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinks(dataDrinks.drinks);
      const dataMeals = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMeals(dataMeals.meals);
      const categoryDrinksData = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategoryDrinks(categoryDrinksData.drinks);
      const categoryMealsData = await makeFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategoryMeals(categoryMealsData.meals);
    };
    realizeFetch();
  }, []);

  const setFilterOnCategoryMeal = async (category) => {
    const dataMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    setFilterRecipes(dataMeals.meals);
  };

  const setFilterOnCategoryDrink = async (category) => {
    const dataDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    setFilterRecipes(dataDrinks.drinks);
  };

  const resetFilterOnCategory = () => {
    setFilterRecipes(...filterRecipes, []);
  };

  const verifyIfExistMealOrDrink = (array) => {
    if (array === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const redirectOnButtonSearchClick = (url, array) => {
    if (array === null) return;
    if (array.length === 1) {
      switch (url) {
      case 'thecocktaildb':
        console.log(array);
        history.push(`/drinks/${array[0].idDrink}`);
        break;
      case 'themealdb':
        history.push(`/meals/${array[0].idMeal}`);
        break;
      default:
        break;
      }
    }
  };

  const alertLengthOfFirstLetter = () => {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const showFilteredArray = (recipesArray) => {
    if (!recipesArray) return;
    setFilterRecipes(recipesArray);
    setIsFilter(!isFilter);
  };

  const onButtonSearchClickMeals = async (url) => {
    let dataSearch;
    switch (typeSearch) {
    case 'ingrediente':
      dataSearch = await makeFetch(`https://www.${url}.com/api/json/v1/1/filter.php?i=${searchInput}`);
      if (url === 'thecocktaildb') {
        verifyIfExistMealOrDrink(dataSearch.drinks);
        redirectOnButtonSearchClick(url, dataSearch.drinks);
        showFilteredArray(dataSearch.drinks);
        return;
      }
      verifyIfExistMealOrDrink(dataSearch.meals);
      redirectOnButtonSearchClick(url, dataSearch.meals);
      showFilteredArray(dataSearch.meals);
      break;
    case 'nome':
      dataSearch = await makeFetch(`https://www.${url}.com/api/json/v1/1/search.php?s=${searchInput}`);
      if (url === 'thecocktaildb') {
        verifyIfExistMealOrDrink(dataSearch.drinks);
        redirectOnButtonSearchClick(url, dataSearch.drinks);
        showFilteredArray(dataSearch.drinks);
        return;
      }
      verifyIfExistMealOrDrink(dataSearch.meals);
      redirectOnButtonSearchClick(url, dataSearch.meals);
      showFilteredArray(dataSearch.meals);
      break;
    case 'primeira-letra':
      alertLengthOfFirstLetter();
      dataSearch = await makeFetch(`https://www.${url}.com/api/json/v1/1/search.php?f=${searchInput}`);
      if (url === 'thecocktaildb') {
        verifyIfExistMealOrDrink(dataSearch.drinks);
        redirectOnButtonSearchClick(url, dataSearch.drinks);
        showFilteredArray(dataSearch.drinks);
        return;
      }
      verifyIfExistMealOrDrink(dataSearch.meals);
      redirectOnButtonSearchClick(url, dataSearch.meals);
      showFilteredArray(dataSearch.meals);
      break;
    default:
      break;
    }
  };

  const values = useMemo(() => ({
    meals,
    drinks,
    isLoading,
    categoryDrinks,
    categoryMeals,
    filterRecipes,
    setFilterOnCategoryDrink,
    setFilterOnCategoryMeal,
    resetFilterOnCategory,
    typeSearch,
    setTypeSearch,
    searchInput,
    setSearchInput,
    onButtonSearchClickMeals,
    isFilter,
    setIsFilter,
  }), [
    meals,
    drinks,
    isLoading,
    categoryDrinks,
    categoryMeals,
    filterRecipes,
    typeSearch,
    searchInput,
    isFilter,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
