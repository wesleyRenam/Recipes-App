import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ index, name, img, id, type }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ type === 'drinks' ? `/drinks/${id}` : `/meals/${id}` }>
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
        <img
          src={ img }
          data-testid={ `${index}-card-img` }
          alt="imagem da receita"
          width={ 250 }
          height={ 200 }
        />
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCard;
