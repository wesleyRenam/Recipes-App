import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="icone de bebida" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="icone de comida" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
