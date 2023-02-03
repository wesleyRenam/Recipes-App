import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecipes } from '../../context/RecipesProvider';

function CategoryBtn({ category, type }) {
  const [isActive, setIsActive] = useState(false);
  const { setRecipes } = useRecipes();

  const handleClick = () => {
    if (isActive) {
      setIsActive(false);
      if (type === 'drinks') return setRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
      if (type === 'meals') return setRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    }
    setIsActive(true);
    if (type === 'meals') return setRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, type);
    if (type === 'drinks') return setRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`, type);
  };

  return (
    <button data-testid={ `${category}-category-filter` } onClick={ handleClick }>
      {category}
    </button>
  );
}

CategoryBtn.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CategoryBtn;
