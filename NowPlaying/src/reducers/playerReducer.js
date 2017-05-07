import { SELECT_SONGS, PLAY_SONGS, PAUSE_SONGS } from '../actions/constants';

const initialState = {
  statusPlaying: false,
  statusPaused: true,
  song: null,
}
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SONGS: {
      const newState = {
        ...state,
        statusPlaying: true,
        statusPaused: false,
        song: action.payload,
      }
      return newState;
    }
    default: return state

  }
}

export default playerReducer;
