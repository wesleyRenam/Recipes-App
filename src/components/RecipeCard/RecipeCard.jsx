import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({
  image, title, categoryOrAlcoholic,
  ingredients, measures, instructions,
  video }) {
  return (
    <div>
      <h1 data-testid="recipe-title">{title}</h1>
      <img
        src={ image }
        alt="imagem da receita"
        data-testid="recipe-photo"
        width={ 250 }
        height={ 200 }
      />
      <p data-testid="recipe-category">{categoryOrAlcoholic}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {
              measures[index] === undefined
                ? `${ingredient}` : `${ingredient} - ${measures[index]}`
            }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      { video && <embed
        type="video/mp4"
        src={ `https://www.youtube.com/embed/${video.split('/')[3]}` }
        data-testid="video"
        width={ 500 }
        height={ 400 }
      />}
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  categoryOrAlcoholic: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  instructions: PropTypes.string,
  video: PropTypes.string,
};

RecipeCard.defaultProps = {
  image: '',
  title: '',
  categoryOrAlcoholic: '',
  ingredients: [],
  measures: [],
  instructions: '',
  video: null,
};

export default RecipeCard;
