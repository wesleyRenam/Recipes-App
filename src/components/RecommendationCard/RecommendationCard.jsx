import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ image, title, index }) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
    >
      <h4 data-testid={ `${index}-recommendation-title` }>{title}</h4>
      <img src={ image } alt="receita recomendada" width={ 150 } height={ 100 } />
    </div>
  );
}

RecommendationCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecommendationCard;
