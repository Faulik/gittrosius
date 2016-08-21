import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

class AppWrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppWrapper;
