import React from 'react';

export default function HomePage() {
  const signIn = () => {
    fetch('/auth/github/callback', { mode: 'no-cors' })
      .then((res, err) => {
        if (err) console.log(err);
        else console.log('success');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="loginContainer">
      <h1>LOGIN PAGE</h1>
      <div className="loginInnerContainer">
        <button className="loginButton" onClick={signIn}>
          Sign In With GitHub
        </button>
      </div>
    </div>
  );
}

// auth/github/callback =>
// https://localhost:3000/auth/github/callback?error=redirect_uri_mismatch&error_description=The+redirect_uri+MUST+match+the+registered+callback+URL+for+this+application.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23redirect-uri-mismatch

// auth/github/callback =>
// https://localhost:3000/auth/github/callback?error=redirect_uri_mismatch&error_description=The+redirect_uri+MUST+match+the+registered+callback+URL+for+this+application.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23redirect-uri-mismatch
