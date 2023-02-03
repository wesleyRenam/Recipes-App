import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

function RecipeCard({
  image, title, categoryOrAlcoholic,
  ingredients, measures, instructions,
  video }) {
  return (
    <S.RecipeCardContainer>
      <img
        src={ image }
        alt="imagem da receita"
        data-testid="recipe-photo"
        width={ 250 }
        height={ 200 }
      />
      <S.IngredientsContainer>
        <h1 data-testid="recipe-title">{title}</h1>
        <h4 data-testid="recipe-category">{categoryOrAlcoholic}</h4>
        <h2>Ingredients</h2>
        <br />
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
        <h2>Instructions</h2>
        <br />
        <p data-testid="instructions">{instructions}</p>
        <br />
        { video && (
          <>
            <h2>Video</h2>
            <embed
              type="video/mp4"
              src={ `https://www.youtube.com/embed/${video.split('/')[3]}` }
              data-testid="video"
            />
          </>
        )}
      </S.IngredientsContainer>
    </S.RecipeCardContainer>
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
