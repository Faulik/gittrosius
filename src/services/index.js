import { browserHistory } from 'react-router';

import * as _api from './api';
import * as _local from './local';
import * as _realtime from './realtime';

export const api = _api;
export const history = browserHistory;
export const local = _local;
export const realtime = _realtime;
