import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from './style';

function Button({ handleClick, children, alt, id, color, size }) {
  return (
    <CustomButton
      onClick={ handleClick }
      alt={ alt }
      data-testid={ id }
      color={ color }
      size={ size }
    >
      {children}
    </CustomButton>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Button;
