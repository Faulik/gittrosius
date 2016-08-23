import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

import LeaveModal from 'components/Dashboard/LeaveModal';

const Chat = ({ ...props }) => {
  const {
    messages,
    room,
    message,
    handleChange,
    handleKeyDown,
    showLeaveModal,
    handleToggleLeaveModal,
    handleLeaveRoom,
  } = props;

  if (!room) {
    return <div className="loading"><CircularProgress size={2} /></div>;
  }

  return (
    <div className="box chat_container">
      <div className="title">
        <Avatar src={room.avatarUrl} />
        <h2>{room.name}</h2>
        {!room.oneToOne &&
          <FlatButton label="Leave" secondary onClick={handleToggleLeaveModal} />
        }
      </div>
      <p>{room.topic}</p>
      <Divider style={{ height: 2 }} />
      { messages.length > 0 &&
        <List className="chat_messages">
          { messages.map((elem) =>
            <ListItem
              key={elem.id}
              primaryText={`@${elem.fromUser.username}`}
              secondaryText={
                <p
                  style={{ height: 'auto' }}
                  dangerouslySetInnerHTML={{ __html: elem.html }}
                />
              }
            />
          )}
        </List>
      }
      { messages.length === 0 &&
        <div className="loading"><CircularProgress size={2} /></div>
      }
      <Divider />
      <TextField
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
        floatingLabelText="Type chat message"
        hintText="Message Field"
        fullWidth
      />
      <LeaveModal
        handleClose={handleToggleLeaveModal}
        handleSubmit={handleLeaveRoom}
        open={showLeaveModal}
      />
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  room: PropTypes.object,
  message: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  showLeaveModal: PropTypes.bool.isRequired,
  handleToggleLeaveModal: PropTypes.func.isRequired,
  handleLeaveRoom: PropTypes.func.isRequired,
};

export default Chat;
