import React from 'react';
import Header from '../../components/Header/Header';

function Login() {
  return (
    <div>
      <Header />
      <input type="email" name="email" data-testid="email-input" />
      <input type="password" name="password" data-testid="password-input" />
      <button data-testid="login-submit-btn" type="button"> Enter </button>
    </div>
  );
}

export default Login;
