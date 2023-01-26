/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipesContext = createContext({});

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { makeFetch, isLoading } = useFetch();
  const [typeSearch, setTypeSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const realizeFetch = async () => {
      const dataDrinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinks(dataDrinks.drinks);
      const dataMeals = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMeals(dataMeals.meals);
    };
    realizeFetch();
  }, []);

  const values = useMemo(() => ({
    meals, drinks, isLoading, typeSearch, setTypeSearch, searchInput, setSearchInput,
  }), [meals, drinks, isLoading, typeSearch, searchInput]);

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
