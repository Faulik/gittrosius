import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from 'actions';

import Home from 'components/Dashboard/Home';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const { actions, params } = this.props;
  }

  handleChange(event) {
    const { actions } = this.props;
    const query = event.target.value;

    actions.searchRoom(query);

    this.setState({ query });
  }

  handleSubmit(event) {
    const { actions } = this.props;
    const { query } = this.state;

    if (event.key === 'Enter' && !event.shiftKey && query.length > 0) {
      actions.searchRoom(query);
      return false;
    }
  }

  render() {
    const { actions, rooms } = this.props;

    return (
      <Home
        rooms={rooms}
        query={this.state.query}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleJoin={actions.joinRoom}
      />
    );
  }
}

HomeContainer.propTypes = {
  rooms: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.searched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
