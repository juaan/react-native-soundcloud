import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSongs,nextSongs } from '../actions';

const {height, width} = Dimensions.get('window');

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.selectSong = this.selectSong.bind(this);
  }

  convertDuration(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  selectSong(song) {
    this.props.selectSongs(song,this.props.songs);
  }

  render() {
    const { song } = this.props
    const duration = this.convertDuration(song.duration);
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.selectSong(song)}>
          <Image
           style={{height:height * 0.2, width: width * 0.2}}
           source={{uri: song.artwork_url ? song.artwork_url : song.user.avatar_url }}
          />
          <View style={styles.detail}>
            <Text style={{ color: 'grey' }}> {song.user.username} </Text>
            <Text style={{ fontSize: 16, color: 'black' }}> {song.title} </Text>
            <View style= {{ flexDirection: 'row', padding: 10 }}>
              <Icon style={{fontSize: 25}} name="ios-headset-outline" />
              <Text style= {{ paddingLeft: 5, fontSize: 18}}>{song.playback_count}</Text>
            </View>
          </View>
        <Text> {duration} </Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 10,
    borderColor: 'ghostwhite',
    height: 'auto'
  },
  detail: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  selectSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
}

const stateToProps = state => ({
  songs: state.songs,
  player: state.player
})

const dispatchToProps = dispatch => ({
  selectSongs: (song,songs) => dispatch(selectSongs(song,songs)),
  nextSongs: () => dispatch(nextSongs()),
})

export default connect(stateToProps,dispatchToProps)(Song);
