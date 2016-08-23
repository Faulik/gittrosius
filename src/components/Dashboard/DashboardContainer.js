import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';

import * as Actions from 'actions';

import RoomList from 'components/Dashboard/RoomList';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.handleJoin = this.handleJoin.bind(this)
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadUserRooms()
  }

  handleJoin(id, name) {
    const { actions } = this.props;
    actions.selectRoom(id, name)
  }

  render() {
    const { children, actions, rooms, room, current } = this.props;

    return (
      <div className="row">
        <Paper className="col-xs-4" rounded={false}>
          <RoomList
            rooms={rooms}
            onJoin={this.handleJoin}
            current={current}
            handleHome={actions.navigateHome}
            handleLogout={actions.logoutUser}
          />
        </Paper>
        <Paper className="col-xs-8" rounded={false} zDepth={3}>
          {children}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.joined,
    current: state.rooms.current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
