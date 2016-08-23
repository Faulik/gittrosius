import realtimeClient from 'gitter-realtime-client';

import * as actions from 'actions';
import { store } from '../index';

const client = new realtimeClient.RealtimeClient({
  token: '6635a37b54dbd4ed4afe7a1ab4b30ef44510a355',
});

const rooms = new realtimeClient.RoomCollection([], { client, listen: true });

rooms.on('change', (model) => {
  store.dispatch(actions.updateRoom(model.id, model));
});
