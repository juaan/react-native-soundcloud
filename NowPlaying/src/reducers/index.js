import { combineReducers } from 'redux';

import songsReducer from './songsReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  songs: songsReducer,
  player: playerReducer,
})

export default rootReducer;
