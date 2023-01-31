import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      <img
        src={ img }
        data-testid={ `${index}-card-img` }
        alt="imagem da receita"
        width={ 250 }
        height={ 200 }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default RecipeCard;
