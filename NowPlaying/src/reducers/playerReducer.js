import {
  SELECT_SONGS,
  PLAY_SONGS,
  PAUSE_SONGS,
  STOP_SONGS,
} from '../actions/constants';

const initialState = {
  statusPlaying: false,
  song: null,
  msg: '',
}
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SONGS: {
      const newState = {
        ...state,
        statusPlaying: true,
        song: action.payload,
      }
      return newState;
    }
    case PAUSE_SONGS: {
      const newState = {
        ...state,
        statusPlaying: false,
        msg: action.payload,
      }
      return newState
    }
    case STOP_SONGS: {
      const newState = {
        ...initialState,
        msg:'stopped'
      }
      return newState
    }
    case PLAY_SONGS: {
      const newState = {
        ...state,
        statusPlaying: true,
        msg: action.payload,
      }
      return newState
    }

    default: return state

  }
}

export default playerReducer;
