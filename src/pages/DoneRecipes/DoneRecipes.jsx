import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import shareSvg from '../../images/shareIcon.svg';

const mockLocalStorage = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '26/01/2023',
    tags: ['Soup'],
  }, {
    id: '52978',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Kumpir',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    doneDate: '26/01/2023',
    tags: ['Soup'],
  }, {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '27/01/2023',
    tags: [],
  }];

function DoneRecipes() {
  const [copied, setCopied] = useState('');
  const [filter, setFilter] = useState([]);
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

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

      {filter.length >= 1 ? (filter.map((recipe, index) => (
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
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleClick(recipe.id, recipe.type) }
            >
              <img
                src={ shareSvg }
                alt="share button"
              />
              {copied}
            </button>
            {recipe.tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </p>
            )).slice(0, 2)}
          </div>
        </div>
      ))) : (getLocalStorage.map((recipe, index) => (
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
            {recipe.tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </p>
            )).slice(0, 2)}
          </div>
        </div>
      )))}

    </div>
  );
}

export default DoneRecipes;
