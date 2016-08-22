import realtimeClient from 'gitter-realtime-client';

import { store } from '../index';
import * as actions from 'actions';

const client = new realtimeClient.RealtimeClient({ token: '6635a37b54dbd4ed4afe7a1ab4b30ef44510a355' });

const rooms = new realtimeClient.RoomCollection([], { client: client, listen: true });

var recents = realtimeClient.filteredRooms.recents(rooms);

/* Display all the recents, all the time */
rooms.on('change', function(model) {
  store.dispatch(actions.updateRoom(model.id, model))
});
