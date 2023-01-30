import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareSvg from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [copied, setCopied] = useState('');
  const [filter, setFilter] = useState([]);
  const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleClick = (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    copy(url);
    setCopied('Link copied!');
  };

  const handleFilter = (category) => {
    const newFilter = getLocalStorage.filter((recipe) => recipe.type === category);
    setFilter(newFilter);
  };

  const resetFilter = () => {
    setFilter([]);
  };

  const setFavorite = (id) => {
    const newFavs = getLocalStorage.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setFilter(newFavs);
  };

  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn" onClick={ resetFilter }>All</button>
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
      {filter.length >= 1 ? (
        filter.map((recipe, index) => (
          <div key={ recipe.id }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt="imagem da receita"
                  data-testid={ `${index}-horizontal-image` }
                  width={ 250 }
                  height={ 250 }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`}
              </p>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
            </div>
            <div>
              <button
                onClick={ () => handleClick(recipe.id, recipe.type) }
              >
                <img
                  src={ shareSvg }
                  alt="share button"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                {copied}
              </button>
              <button
                onClick={ () => setFavorite(recipe.id) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="favorite button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        ))

      ) : (
        getLocalStorage.map((recipe, index) => (
          <div key={ recipe.id }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt="imagem da receita"
                  data-testid={ `${index}-horizontal-image` }
                  width={ 250 }
                  height={ 250 }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`}
              </p>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
            </div>
            <div>
              <button onClick={ () => handleClick(recipe.id, recipe.type) }>
                <img
                  src={ shareSvg }
                  alt="share button"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                {copied}
              </button>
              <button onClick={ () => setFavorite(recipe.id) }>
                <img
                  src={ blackHeartIcon }
                  alt="botão de favorito"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default FavoriteRecipes;
