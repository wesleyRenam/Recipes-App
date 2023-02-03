import React, { useEffect, useState } from 'react';
import DoneAndFavCard from '../../components/DoneAndFavCard/DoneAndFavCard';
import Header from '../../components/Header/Header';

function FavoriteRecipes() {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [getItems, setGetItems] = useState([]);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!localState) return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    return setGetItems(localState);
  }, []);

  const handleFilter = (category) => {
    const newFilter = getItems.filter((recipe) => recipe.type === category);
    setFilterRecipes(newFilter);
  };

  const resetFilter = () => {
    setFilterRecipes([]);
  };

  const setFavorite = (id) => {
    const newFavs = getItems.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setFilterRecipes(newFavs);
    setGetItems(newFavs);
  };

  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
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
          <p>Você não possui receitas favoritas.</p>
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
              alcoholic={ recipe.alcoholicOrNot }
              nationality={ recipe.nationality }
              type={ recipe.type }
              id={ recipe.id }
              isFav={ setFavorite }
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
              isFav={ setFavorite }
            />
          ))
        )
      }

    </div>
  );
}

export default FavoriteRecipes;
