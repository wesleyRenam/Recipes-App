import React from 'react';
import PropTypes from 'prop-types';

function MealIngredients(props) {
  const { mealIng } = props;

  const ingArray = [];
  const measureArray = [];

  console.log(mealIng[0]);

  const mealKeys = Object.keys(mealIng[0])
    .filter((eachIng) => eachIng.includes('strIngredient'));

  const measureKeys = Object.keys(mealIng[0])
    .filter((eachIng) => eachIng.includes('strMeasure'));

  const verifyPropertyContent = (key) => mealIng[0][key] !== null
  && mealIng[0][key] !== '' && mealIng[0][key] !== ' ';

  mealKeys.forEach((mealKey) => {
    if (verifyPropertyContent(mealKey)) {
      ingArray.push(mealIng[0][mealKey]);
    }
  });

  measureKeys.forEach((measureKey) => {
    if (verifyPropertyContent(measureKey)) {
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
};

export default MealIngredients;
