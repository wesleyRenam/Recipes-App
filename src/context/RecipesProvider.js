/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const { makeFetch, isLoading, Error } = useFetch();

  const filterBySearchBar = async (url, type) => {
    const data = await makeFetch(url);
    setFilterRecipes(data[type]);
  };

  const values = useMemo(() => ({
    filterRecipes,
    filterBySearchBar,
    isLoading,
    Error,
  }), [filterRecipes, isLoading, Error]);
  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  return context;
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
