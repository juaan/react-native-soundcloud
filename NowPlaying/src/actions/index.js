import {
  FETCH_SONGS,
  SEARCH_SONGS,
  EMPTY_SONGS,
  SELECT_SONGS,
  PAUSE_SONGS,
  PLAY_SONGS,
  STOP_SONGS,
  NEXT_SONGS
 } from './constants';


export const fetchSongsSuccess = data => ({
  type: FETCH_SONGS,
  payload: data,
});

export const searchSongsSuccess = data => ({
  type: SEARCH_SONGS,
  payload: data
})

export const fetchSongs = () => (
  dispatch => (
    fetch('https://api.soundcloud.com/tracks?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&filter=public&limit=100&offset=0')
    .then(res => res.json())
    .then(data => dispatch(fetchSongsSuccess(data)))
    .catch(err => {console.log(err)})
  )
)

export const searchSongs = (keyword) => (
  dispatch => (
    fetch(`https://api.soundcloud.com/tracks?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&q=${keyword}&limit=20&offset=0`)
    .then(res => res.json())
    .then(data => dispatch(searchSongsSuccess(data)))
    .catch(err => {console.log(err)})
  )
)

export const selectSongs = (song,songs) => ({
    type: SELECT_SONGS,
    payload: {song, songs},
})

export const emptySongs = () => ({
  type: EMPTY_SONGS,
  payload: [],
})

export const pauseSongs = () => ({
  type: PAUSE_SONGS,
  payload: 'paused',
})

export const stopSongs = () => ({
  type: STOP_SONGS,
  payload: 'stopped',
})

export const playSongs = () => ({
  type: PLAY_SONGS,
  payload: 'played',
})

const nextSongsPlaying = (song) => ({
  type: NEXT_SONGS,
  payload: song,
})

export const nextSongs = () => (
  (dispatch, getState) => {
    const { player } = getState();
    console.log('player nih', player);
    const currentIdx = player.playList.findIndex( x => player.song.id === x.id);
    const nextSong = player.playList[currentIdx+1];
    return dispatch(nextSongsPlaying(nextSong));

  }
)
