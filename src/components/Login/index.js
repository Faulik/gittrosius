import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Login = ({ onSubmit, status, onChange, token }) => (
  <div className="login_form">
    <h2>Gittrosious</h2>
    <br />
    <p>
      Follow this
      <a
        href="https://developer.gitter.im/apps"
        target="_blank"
        rel="noopener noreferrer"
      >
        link
      </a>
      to get your authentication token.
    </p>
    <p>
       Copy it and paste into the textinput below.
    </p>
    <form onSubmit={onSubmit}>
      <TextField
        onChange={onChange}
        value={token}
        floatingLabelText="Paste your token here"
        fullWidth
        required
        errorText={status === 'failure' ? 'Wrong token' : ''}
      />
      <br />
      <br />
      <RaisedButton
        type="submit"
        label="Login"
        secondary
        fullWidth
      />
    </form>
  </div>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default Login;
