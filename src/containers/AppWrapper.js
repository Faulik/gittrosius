import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

class AppWrapper extends Component {
  render() {
    return (
      this.props.children
    );
  }
}

export default AppWrapper;
