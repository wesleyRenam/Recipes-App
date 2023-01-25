import React from 'react';

function Login() {
  return (
    <div>
      <input type="email" name="email" data-testid="email-input" />
      <input type="password" name="password" data-testid="password-input" />
      <button data-testid="login-submit-btn" type="button"> Enter </button>
    </div>
  );
}

export default Login;
