import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';


const RoomList = ({ rooms = [], onJoin, current, handleHome, handleLogout }) => (
  <div className="sidebar">
    <br />
    <FlatButton label="Home" secondary onClick={handleHome} />
    <Subheader>My chats</Subheader>
    <Divider />
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
    <Divider />

    <br />
    <FlatButton label="Log out" secondary onClick={handleLogout} />
    <br />
  </div>
);

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
  onJoin: PropTypes.func.isRequired,
  current: PropTypes.string,
  handleHome: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default RoomList;
