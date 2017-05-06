import { FETCH_SONGS, SEARCH_SONGS, EMPTY_SONGS } from '../actions/constants';

const songsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SONGS: {
      const newState = action.payload;
      return newState;
    }
    case SEARCH_SONGS: {
      const newState = action.payload;
      return newState;
    }
    case EMPTY_SONGS: {
      return action.payload;
    }
    default: return state

  }
}

export default songsReducer;
