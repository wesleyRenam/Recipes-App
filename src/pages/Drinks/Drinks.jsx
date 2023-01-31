import React from 'react';
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipes } from '../../context/RecipesProvider';

const MAX_LENGTH = 12;

function Drinks() {
  const { filterRecipes } = useRecipes();
  return (
    <div>
      <Header title="Drinks" />
      {
        filterRecipes && filterRecipes.map((recipe, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            id={ recipe.idDrink }
          />
        )).slice(0, MAX_LENGTH)
      }
    </div>
  );
}

export default Drinks;
