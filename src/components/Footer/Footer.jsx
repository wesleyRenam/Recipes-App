import React from 'react';
import { Link } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { FooterContainer } from './style';

function Footer() {
  return (
    <FooterContainer
      data-testid="footer"
    >
      <div>
        <Link to="/drinks">
          <BiDrink alt="icone de bebida" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/meals">
          <GiMeal alt="icone de comida" data-testid="meals-bottom-btn" />
        </Link>
      </div>
    </FooterContainer>
  );
}

export default Footer;
