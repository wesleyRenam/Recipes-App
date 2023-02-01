import React from 'react';
import { useRecipes } from '../../context/RecipesProvider';
import RecommendationCard from '../RecommendationCard/RecommendationCard';

const MAX_LENGTH = 6;

const style = {
  alignItems: 'center',
  border: '1px solid black',
  display: 'flex',
  gap: '2rem',
  height: '200px',
  overflowX: 'scroll',
  textAlign: 'center',
  width: '350px',
};

function Carousel() {
  const { filterRecipes } = useRecipes();

  return (
    <div style={ style }>
      {filterRecipes.map((recipe, index) => (
        <div key={ index }>
          <RecommendationCard
            image={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            title={ recipe.strMeal || recipe.strDrink }
          />
        </div>
      )).slice(0, MAX_LENGTH)}
    </div>
  );
}

export default Carousel;
