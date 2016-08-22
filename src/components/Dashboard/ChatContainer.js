import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from 'actions';

import Chat from 'components/Dashboard/Chat';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
    this.handleToggleLeaveModal = this.handleToggleLeaveModal.bind(this);

    this.state = {
      message: '',
      showLeaveModal: false
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleKeyDown(event) {
    const { actions, room } = this.props;
    const { message } = this.state;

    if(event.key == 'Enter' && !event.shiftKey && message.length > 0){
      actions.postMessage(room.id, message);
      this.setState({ message: '' });
      return false
    }
  }

  handleLeaveRoom() {
    const { actions, room } = this.props;
    actions.leaveRoom(room.id);
    this.handleToggleLeaveModal();
  }

  handleToggleLeaveModal() {
    this.setState({ showLeaveModal: !this.state.showLeaveModal });
  }

  componentDidUpdate() {
    const element = document.getElementsByClassName('chat_messages')[0];
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  componentDidMount() {
    const { actions, params: { repo='', channel=''}, room } = this.props;

    if (!room) {
      const name = repo + (channel ? `/${channel}` : '');
      actions.checkRoom(name);
    }
  }

  render() {
    const { actions, messages, room } = this.props;

    return (
      <Chat
        messages={messages}
        room={room}
        message={this.state.message}
        handleChange={this.handleChange}
        handleKeyDown={this.handleKeyDown}
        showLeaveModal={this.state.showLeaveModal}
        handleLeaveRoom={this.handleLeaveRoom}
        handleToggleLeaveModal={this.handleToggleLeaveModal}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const current = state.rooms.current
  const room = current ? state.rooms.joined.find((room) => room.id === current) : undefined
  return {
    messages: state.messages.visible,
    room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
