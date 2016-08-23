import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class AppWrapper extends Component {
  render() {
    return (
      this.props.children
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
