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

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault();

    const { actions: { setUserAppToken } } = this.props;
    const token = e.target[0].value
    setUserAppToken(token)
  }

  render() {
    const { actions } = this.props;
    return (
      <div className="col-xs-offset-4 col-xs-4">
        <Paper
          zDepth={1}
          style={style}
        >
        <Login
          handleSubmit={this.onSubmit}
        />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lol: 'lol'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
