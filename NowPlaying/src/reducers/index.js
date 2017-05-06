import { combineReducers } from 'redux';

import songsReducer from './songsReducer';

const rootReducer = combineReducers({
  songs: songsReducer,
})

export default rootReducer;
