import React, { useEffect, useState } from 'react';
import DoneAndFavCard from '../../components/DoneAndFavCard/DoneAndFavCard';
import Header from '../../components/Header/Header';

function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [getItems, setGetItems] = useState([]);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localState) return localStorage.setItem('doneRecipes', JSON.stringify([]));
    return setGetItems(localState);
  }, []);

  const handleFilter = (category) => {
    const newFilter = getItems.filter((recipe) => recipe.type === category);
    setFilterRecipes(newFilter);
  };

  const resetFilter = () => {
    setFilterRecipes([]);
  };

  return (
    <div>
      <Header title="Done Recipes" searchButton={ false } />
      <button
        data-testid="filter-by-all-btn"
        onClick={ resetFilter }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>

      {
        getItems.length === 0 && (
          <p>Você não possui receitas inciadas.</p>
        )
      }

      {
        filterRecipes.length >= 1 ? (
          filterRecipes.map((recipe, index) => (
            <DoneAndFavCard
              tags={ recipe.tags }
              name={ recipe.name }
              index={ index }
              image={ recipe.image }
              doneDate={ recipe.doneDate }
              category={ recipe.category }
              key={ index }
              alcoholic={ recipe.alcoholic }
              nationality={ recipe.nationality }
              type={ recipe.type }
              id={ recipe.id }
              done
            />
          ))
        ) : (
          getItems.map((recipe, index) => (
            <DoneAndFavCard
              tags={ recipe.tags }
              name={ recipe.name }
              index={ index }
              image={ recipe.image }
              doneDate={ recipe.doneDate }
              category={ recipe.category }
              key={ index }
              alcoholic={ recipe.alcoholicOrNot }
              nationality={ recipe.nationality }
              type={ recipe.type }
              id={ recipe.id }
              done
            />
          ))
        )
      }
    </div>
  );
}

export default DoneRecipes;
