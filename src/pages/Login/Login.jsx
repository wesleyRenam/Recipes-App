import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginProvider';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { setEmail } = useContext(LoginContext);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setEmail(user.email);
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
  };

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const MAX_NUMBER = 6;

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        onChange={ handleChange }
        placeholder="Digite seu email"
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        onChange={ handleChange }
        placeholder="Digite seu senha"
      />
      <button
        data-testid="login-submit-btn"
        disabled={ !regexEmail.test(user.email) || user.password.length <= MAX_NUMBER }
        type="button"
        onClick={ handleSubmit }
      >
        {' '}
        Enter
        {' '}

      </button>
    </div>
  );
}

export default Login;
