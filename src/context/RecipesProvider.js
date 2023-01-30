import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider>
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
