import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

const RoomList = ({ rooms=[], onJoin }) => {
  return (
    <div className="sidebar">
      <Subheader>My chats</Subheader>
      <List className="box room_list">
        { rooms.map((room) =>
          <ListItem
            key={room.id}
            primaryText={room.name}
            leftAvatar={<Avatar src={room.avatarUrl} />}
            onClick={() => onJoin(room.id, room.name)}
            />
        )}
      </List>
    </div>
  );
}

export default RoomList;
