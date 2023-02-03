import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as S from './styles';

function Recipes({ index, name, img, id, type }) {
  return (
    <S.RecipeCardContainer data-testid={ `${index}-recipe-card` }>
      <Link to={ type === 'drinks' ? `/drinks/${id}` : `/meals/${id}` }>
        <img
          src={ img }
          data-testid={ `${index}-card-img` }
          alt="imagem da receita"
        />
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      </Link>
    </S.RecipeCardContainer>
  );
}

Recipes.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Recipes;
