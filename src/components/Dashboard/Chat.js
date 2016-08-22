import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

const Chat = ({ messages, room, message, handleChange, handleKeyDown }) => {
  if (!room) {
    return <div className="loading"><CircularProgress size={2}/></div>
  }

  return (
    <div className="box chat_container">
      <p className="title"><Avatar src={room.avatarUrl} /><h2>{room.name}</h2></p>
      <p>{room.topic}</p>
      <Divider style={{ height: 2 }}/>
      { messages.length > 0 &&
        <List className="chat_messages">
          { messages.map((message) =>
            <ListItem
              key={message.id}
              primaryText={'~ ' + message.fromUser.username}
              secondaryText={<p style={{ height: 'auto' }} dangerouslySetInnerHTML={{__html: message.html}}></p>}
              />
          )}
        </List>
      }
      { messages.length == 0 &&
        <div className="loading"><CircularProgress size={2}/></div>
      }
      <Divider/>
      <TextField
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
        floatingLabelText="Type chat message"
        hintText="Message Field"
        fullWidth={true}
      />
    </div>
  );
}

export default Chat;
