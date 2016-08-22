import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from 'actions';

import Home from 'components/Dashboard/Home';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions, params } = this.props;
  }

  render() {
    const { actions } = this.props;

    return (
      <Home/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
