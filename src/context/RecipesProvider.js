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
  const [favoritos, setFavoritos] = useState([]);
  const [detailMeal, setDetailMeal] = useState(['']);
  const [detailDrink, setDetailDrink] = useState(['']);
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
    setFavoritos(JSON.parse(localStorage.getItem('favoriteRecipes')) ?? []);
  }, []);

  const setFilterOnCategoryMeal = async (category) => {
    const dataMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    setFilterRecipes(dataMeals.meals);
  };

  const setFilterOnCategoryDrink = async (category) => {
    const dataDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    setFilterRecipes(dataDrinks.drinks);
  };

  const setMealDetails = async (id) => {
    const setMeal = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    setDetailMeal(setMeal.meals);
  };
  const setDrinkDetails = async (id) => {
    const setDrink = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setDetailDrink(setDrink.drinks);
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

  const favoriteBtn = (type) => {
    let arrayFav = [];
    arrayFav = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    if (type === 'drinks') {
      arrayFav.push(
        {
          id: detailDrink[0].idDrink,
          type: 'drink',
          nationality: (detailDrink[0].strArea === null
        || detailDrink[0].strArea === undefined ? '' : detailDrink[0].strArea),
          category: detailDrink[0].strCategory,
          alcoholicOrNot: detailDrink[0].strAlcoholic,
          name: detailDrink[0].strDrink,
          image: detailDrink[0].strDrinkThumb,
        },
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFav));
    } else {
      arrayFav.push(
        {
          id: detailMeal[0].idMeal,
          type: 'meal',
          nationality: (detailMeal[0].strArea === null
          || detailMeal[0].strArea === undefined ? '' : detailMeal[0].strArea),
          category: detailMeal[0].strCategory,
          alcoholicOrNot: (detailMeal[0].strAlcoholic === null
          || detailMeal[0].strAlcoholic === undefined ? '' : detailMeal[0].strAlcoholic),
          name: detailMeal[0].strMeal,
          image: detailMeal[0].strMealThumb,
        },
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFav));
    }
    setFavoritos(JSON.parse(localStorage.getItem('favoriteRecipes')) ?? []);
  };

  const removeFavorite = (type) => {
    let arrayFav = [];
    arrayFav = JSON.parse(localStorage.getItem('favoriteRecipes')) ?? [];
    if (type === 'meals') {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(arrayFav.filter((each) => each.id !== detailMeal[0].idMeal)));
      setFavoritos(favoritos.filter((each) => each.id !== detailMeal[0].idMeal));
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(arrayFav.filter((each) => each.id !== detailDrink[0].idDrink)));
      setFavoritos(favoritos.filter((each) => each.id !== detailDrink[0].idDrink));
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
    favoritos,
    setFavoritos,
    favoriteBtn,
    removeFavorite,
    setMealDetails,
    setDrinkDetails,
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
    favoritos,
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
