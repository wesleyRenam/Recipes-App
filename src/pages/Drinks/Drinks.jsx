/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CategoryBtn from '../../components/CategoryBtn/CategoryBtn';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import { useRecipes } from '../../context/RecipesProvider';

const MAX_LENGTH = 12;
const MAX_CATEGORY = 5;

function Drinks() {
  const { filterRecipes, setRecipes, setCategoryOnState, category } = useRecipes();

  useEffect(() => {
    setRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    setCategoryOnState('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks');
  }, []);

  const resetRecipes = () => {
    setRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
  };

  return (
    <div>
      <Header title="Drinks" />
      <div>
        {
          category && category.map((item, index) => (
            <CategoryBtn
              key={ index }
              category={ item.strCategory }
              type="drinks"
            />)).slice(0, MAX_CATEGORY)
        }
        <button onClick={ resetRecipes } data-testid="All-category-filter">All</button>
      </div>
      {
        filterRecipes && filterRecipes.map((recipe, index) => (
          <Recipes
            key={ index }
            index={ index }
            img={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            id={ recipe.idDrink }
            type="drinks"
          />
        )).slice(0, MAX_LENGTH)
      }
      <Footer />
    </div>
  );
}

export default Drinks;
