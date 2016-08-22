import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';

import Login from 'components/Login';

import * as Actions from 'actions';

const style = {
  height: 'auto',
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      token: ''
    }
  }

  handleChange(e) {
    this.setState({ token: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();

    const { actions: { setUserAppToken } } = this.props;
    setUserAppToken(this.state.token)
  }

  render() {
    const { actions, status } = this.props;
    return (
      <div className="col-xs-offset-4 col-xs-4">
        <Paper
          zDepth={1}
          style={style}
        >
        <Login
          status={status}
          token={this.state.token}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.user.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
