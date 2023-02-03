import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './style';
import bgImage from '../../images/backgroundImage.png';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const VALID_PASSWORD = 6;

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };

  return (
    <S.LoginContainer onSubmit={ handleSubmit }>
      <img src={ bgImage } alt="background login" />
      <S.Input
        type="email"
        data-testid="email-input"
        placeholder="Digite seu email"
        name="email"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      />
      <S.Input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        name="password"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      />
      <S.Button
        data-testid="login-submit-btn"
        disabled={ !validEmail.test(user.email)
          || user.password.length <= VALID_PASSWORD }
        onClick={ handleSubmit }
      >
        Enter

      </S.Button>
    </S.LoginContainer>
  );
}

export default Login;
