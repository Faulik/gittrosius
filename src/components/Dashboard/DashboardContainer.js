import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';

import * as Actions from 'actions';

import Dashboard from 'components/Dashboard';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className="col-xs-offset-4 col-xs-4">
        <Dashboard
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
