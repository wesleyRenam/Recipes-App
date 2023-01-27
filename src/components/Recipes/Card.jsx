import PropTypes from 'prop-types';
import React from 'react';

function Card({ title, imgSrc, index }) {
  return (
    <div data-testid={ `${index}-recommendation-card` }>
      <img src={ imgSrc } alt={ title } width="200rem" />
      <h2 data-testid={ `${index}-recommendation-title` }>{title}</h2>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
