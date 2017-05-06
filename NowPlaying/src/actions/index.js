import {FETCH_SONGS , SEARCH_SONGS, EMPTY_SONGS} from './constants';


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

export const emptySongs = () => ({
  type: EMPTY_SONGS,
  payload: [],
})
