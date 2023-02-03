import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from '../Button/Button';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DoneAndFavCard({
  name,
  image, category, doneDate, tags, index, type, nationality, alcoholic, id, done, isFav,
}) {
  const [isCopy, setIsCopy] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(!isCopy);
  };

  const handleFavorite = () => {
    isFav(id);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
        <img
          src={ image }
          alt="imagem da receita"
          data-testid={ `${index}-horizontal-image` }
          width={ 250 }
          height={ 200 }
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'meal' ? `${nationality} - ${category}`
          : `${alcoholic}`}
      </p>
      {doneDate ? (
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      ) : null}
      { tags ? tags.map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ tag }
        >
          {tag}
        </p>
      )) : null }
      {isCopy && (
        <div>
          <span>Link copied!</span>
        </div>
      )}
      {
        done ? (
          <Button
            handleClick={ handleShare }
            src={ shareIcon }
            alt="share button"
            id={ `${index}-horizontal-share-btn` }
          />
        ) : (
          <>
            <Button
              handleClick={ handleFavorite }
              src={ blackHeartIcon }
              alt="share button"
              id={ `${index}-horizontal-favorite-btn` }
            />
            <Button
              handleClick={ handleShare }
              src={ shareIcon }
              alt="share button"
              id={ `${index}-horizontal-share-btn` }
            />
          </>
        )
      }
    </div>
  );
}

DoneAndFavCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  alcoholic: PropTypes.string,
  id: PropTypes.string.isRequired,
  done: PropTypes.bool,
  isFav: PropTypes.func,
};

DoneAndFavCard.defaultProps = {
  name: '',
  image: '',
  category: '',
  doneDate: '',
  index: 0,
  tags: [],
  nationality: '',
  alcoholic: '',
  done: false,
  isFav: () => {},
};

export default DoneAndFavCard;
