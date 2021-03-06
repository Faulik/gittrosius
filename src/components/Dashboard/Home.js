import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const Dasboard = ({ rooms = [], query, handleChange, handleSubmit, handleJoin }) => (
  <div className="dashboard">
    <h1>Gittrosius</h1>
    <TextField
      value={query}
      className="search_field"
      hintText="Enter room name"
      floatingLabelText="Search room"
      fullWidth
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
    <GridList
      cols={3}
      padding={20}
      cellHeight={200}
      style={styles.gridList}
    >
      {rooms.map((room) => (
        <GridTile
          key={room.id}
          title={room.name}
          subtitle={<span>users: <b>{room.userCount}</b></span>}
          actionIcon={
            <FlatButton
              label="Join"
              secondary
              onClick={() => handleJoin(room.uri, room.id)}
            />
          }
        >
          <img src={room.avatarUrl} alt={room.name} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

Dasboard.propTypes = {
  rooms: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleJoin: PropTypes.func.isRequired,
};

export default Dasboard;
