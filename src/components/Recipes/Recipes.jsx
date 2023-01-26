import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesProvider';

function Recipes(props) {
  const [isFilter, setIsFilter] = useState(false);
  const { recipe, isLoading, categorys } = props;
  const history = useHistory();
  const { filterRecipes,
    setFilterOnCategoryMeal,
    setFilterOnCategoryDrink,
    resetFilterOnCategory,
  } = useContext(RecipesContext);

  const MAX_LENGTH = 12;
  const MAX_CATEGORY = 5;

  const toggleChange = (category) => {
    setIsFilter(!isFilter);
    if (history.location.pathname === '/meals') return setFilterOnCategoryMeal(category);
    if (history.location.pathname === '/drinks') setFilterOnCategoryDrink(category);
  };

  const redirectToRecipe = (id) => {
    if (history.location.pathname === '/meals') {
      return `/meals/${id}`;
    }
    if (history.location.pathname === '/drinks') {
      return `/drinks/${id}`;
    }
  };

  const resetFilter = () => {
    setIsFilter(false);
    resetFilterOnCategory();
  };

  if (isLoading) return 'Carregando';

  return (
    <main>
      <div>
        {
          categorys.map((category) => (
            <button
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              onClick={ ({ target }) => toggleChange(target.innerHTML) }
            >
              {category.strCategory}
            </button>
          )).slice(0, MAX_CATEGORY)
        }
        <button
          data-testid="All-category-filter"
          onClick={ resetFilter }
        >
          All

        </button>
      </div>
      <div>
        { isFilter ? (
          filterRecipes.map((item, index) => (
            <Link
              to={ redirectToRecipe(item.idDrink || item.idMeal) }
              key={ item.idDrink || item.idMeal }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb || item.strMealThumb }
                  alt="foto do produto"
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal || item.strDrink}
                </p>
              </div>
            </Link>
          )).slice(0, MAX_LENGTH)
        ) : (
          recipe.map((item, index) => (
            <Link
              to={ redirectToRecipe(item.idDrink || item.idMeal) }
              key={ item.idDrink || item.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb || item.strMealThumb }
                  alt="foto do produto"
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal || item.strDrink}
                </p>
              </div>
            </Link>
          )).slice(0, MAX_LENGTH))}
      </div>
    </main>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.arrayOf().isRequired,
  categorys: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Recipes;
