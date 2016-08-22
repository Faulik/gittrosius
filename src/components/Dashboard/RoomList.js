import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { history } from 'services';


const RoomList = ({ rooms=[], onJoin, current, handleHome }) => {
  return (
    <div className="sidebar">
      <br/>
      <FlatButton label="Home" secondary={true} onClick={handleHome}/>
      <Subheader>My chats</Subheader>
      <List className="box room_list">
        { rooms.map((room) =>
          <ListItem
            key={room.id}
            primaryText={room.name}
            secondaryText={room.id === current ? 'current' : ''}
            leftAvatar={<Avatar src={room.avatarUrl} />}
            onClick={() => onJoin(room.id, room.name)}
            />
        )}
      </List>
    </div>
  );
}

export default RoomList;
