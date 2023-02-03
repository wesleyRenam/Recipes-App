import React from 'react';
import PropTypes from 'prop-types';

function Button({ handleClick, src, alt, id }) {
  return (
    <button onClick={ handleClick }>
      <img
        src={ src }
        alt={ alt }
        data-testid={ id }
      />
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
