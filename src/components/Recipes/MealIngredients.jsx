import React from 'react';
import PropTypes from 'prop-types';

function MealIngredients(props) {
  const { mealIng, isLoading } = props;

  const ingArray = [];
  const measureArray = [];
  const mealKeys = Object.keys(mealIng[0])
    .filter((eachIng) => eachIng.includes('strIngredient'));
  const measureKeys = Object.keys(mealIng[0])
    .filter((eachIng) => eachIng.includes('strMeasure'));
  mealKeys.forEach((mealKey) => {
    if (mealIng[0][mealKey].length > 0) {
      ingArray.push(mealIng[0][mealKey]);
    }
  });
  measureKeys.forEach((measureKey) => {
    if (mealIng[0][measureKey].length > 0) {
      measureArray.push(mealIng[0][measureKey]);
    }
  });

  const htmlIngredients = measureArray
    .map((measure, i) => (
      <li
        key={ i }
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {`${measure} ${ingArray[i]}`}
      </li>));

  return (
    <div>
      <ul>
        {htmlIngredients}
      </ul>
    </div>
  );
}

MealIngredients.propTypes = {
  mealIng: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MealIngredients;
