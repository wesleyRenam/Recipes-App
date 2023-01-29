import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import { RecipesContext } from '../../context/RecipesProvider';
import Card from './Card';

function CarouselCards({ type }) {
  const { meals, drinks } = useContext(RecipesContext);
  const dataR = (type === 'meals' ? drinks : meals);
  console.log(dataR);
  const TWO = 2;
  const FOUR = 4;
  const SIX = 6;
  const datId = dataR.map((eachR, index) => ({ ...eachR, id: index }));
  const recommed = [datId.slice(0, TWO), datId.slice(TWO, FOUR), datId.slice(FOUR, SIX)];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={ index } onSelect={ handleSelect }>
      { recommed.map((recipes, ind) => (
        <Carousel.Item key={ `recipes${ind}` }>
          { recipes.map((eachRec, i) => (
            <Card
              key={ i }
              title={ (type === 'meals' ? eachRec.strDrink : eachRec.strMeal) }
              imgSrc={ (type === 'meals' ? eachRec.strDrinkThumb : eachRec.strMealThumb) }
              index={ eachRec.id }
            />
          )) }
        </Carousel.Item>
      )) }

    </Carousel>
  );
}

CarouselCards.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CarouselCards;
