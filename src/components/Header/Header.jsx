import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiSearchAlt } from 'react-icons/bi';
import SearchBar from '../SearchBar/SearchBar';
import * as S from './style';
import Button from '../Button/Button';

function Header({ title, profileButton, searchButton }) {
  const [isSearch, setIsSearch] = useState(false);

  const history = useHistory();

  const profileRedirect = () => {
    history.push('/profile');
  };

  const handleToggle = () => {
    setIsSearch(!isSearch);
  };

  return (
    <S.HeaderContainer isSearch={ isSearch }>
      <S.ButtonsContainer>
        { searchButton && (
          <Button
            handleClick={ handleToggle }
            id="search-top-btn"
            alt="Icone de Pesquisa"
            color="primary"
            size="35px"
          >
            <BiSearchAlt />
          </Button>
        )}
        { profileButton && (
          <Button
            handleClick={ profileRedirect }
            id="profile-top-btn"
            alt="Icone de perfil"
            color="primary"
            size="35px"
          >
            <CgProfile />
          </Button>
        )}
      </S.ButtonsContainer>
      <h1 data-testid="page-title">{title}</h1>
      {
        isSearch && (
          <SearchBar pathname={ history.location.pathname } />
        )
      }
    </S.HeaderContainer>
  );
}

Header.propTypes = {
  title: propTypes.string,
  profileButton: propTypes.bool,
  searchButton: propTypes.bool,
};

Header.defaultProps = {
  title: 'header',
  profileButton: true,
  searchButton: true,
};

export default Header;
