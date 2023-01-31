/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CategoryBtn from '../../components/CategoryBtn/CategoryBtn';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/Recipes/Recipes';
import { useRecipes } from '../../context/RecipesProvider';

const MAX_LENGTH = 12;
const MAX_CATEGORY = 5;

function Meals() {
  const { filterRecipes, setRecipes, setCategoryOnState, category } = useRecipes();

  useEffect(() => {
    setRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    setCategoryOnState('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals');
  }, []);

  const resetRecipes = () => {
    setRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
  };

  return (
    <div>
      <Header title="Meals" />
      <div>
        {
          category && category.map((item, index) => (
            <CategoryBtn
              key={ index }
              category={ item.strCategory }
              type="meals"
            />)).slice(0, MAX_CATEGORY)
        }
        <button onClick={ resetRecipes } data-testid="All-category-filter">All</button>
      </div>
      {
        filterRecipes && filterRecipes.map((recipe, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            img={ recipe.strMealThumb }
            name={ recipe.strMeal }
            id={ recipe.idMeal }
            type="meals"
          />
        )).slice(0, MAX_LENGTH)
      }
      <Footer />
    </div>
  );
}

export default Meals;
