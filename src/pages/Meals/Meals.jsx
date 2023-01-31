import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipes } from '../../context/RecipesProvider';

const MAX_LENGTH = 12;

function Meals() {
  const { filterRecipes } = useRecipes();
  return (
    <div>
      <Header title="Meals" />
      {
        filterRecipes && filterRecipes.map((recipe, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ recipe.strMealThumb }
            name={ recipe.strMeal }
            id={ recipe.idMeal }
          />
        )).slice(0, MAX_LENGTH)
      }
      <Footer />
    </div>
  );
}

export default Meals;
