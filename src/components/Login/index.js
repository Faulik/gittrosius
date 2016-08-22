import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

const Login = ({ onSubmit, status, onChange, token }) => {
  return (
    <div className="login_form">
      <h2>Gittrosious</h2>
      <br/>
      <p>
        Follow this <a href="https://developer.gitter.im/apps" target="_blank">link</a> to get your authentication token.
      </p>
      <p>
         Copy it and paste into the textinput below.
      </p>
      <form onSubmit={onSubmit}>
        <TextField
          onChange={onChange}
          value={token}
          floatingLabelText="Paste your token here"
          fullWidth={true}
          required={true}
          />
        <br/>
        <br/>
        <RaisedButton
          type="submit"
          label="Login"
          secondary={true}
          fullWidth={true}
          />
      </form>
    </div>
  );
}

export default Login;
