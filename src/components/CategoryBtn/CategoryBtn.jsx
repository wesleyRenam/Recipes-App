import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecipes } from '../../context/RecipesProvider';
import { CategoryButton, CategoryButtonContainer } from './style';

function CategoryBtn({ category, type, icon }) {
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
    <CategoryButtonContainer>
      <CategoryButton
        data-testid={ `${category}-category-filter` }
        onClick={ handleClick }
      >
        {icon}
      </CategoryButton>
      <span>{category}</span>
    </CategoryButtonContainer>
  );
}

CategoryBtn.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default CategoryBtn;
