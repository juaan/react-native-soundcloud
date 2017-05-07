import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RCTAudio from 'react-native-player';

import { selectSongs,nextSongs } from '../actions';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.selectSong = this.selectSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  convertDuration(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  componentWillMount() {
    this.nextSong();
    RCTDeviceEventEmitter.addListener('error',this.onError);
    RCTDeviceEventEmitter.addListener('end',this.onEnd);
    RCTDeviceEventEmitter.addListener('ready',this.onReady);
  }

  onError(err) {
    console.log(err);
  }

  onEnd() {
    console.log("end");
    this.props.nextSongs();
  }

  onReady () {
    console.log('on ready...');
  }

  nextSong() {
    this.selectSong(this.props.player.song);
  }
  selectSong(song) {
    RCTAudio.prepare(`https://api.soundcloud.com/tracks/${song.id}/stream?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c`, true);
    this.props.selectSongs(song,this.props.songs);

  }

  render() {
    const { song, songs } = this.props
    const duration = this.convertDuration(song.duration);
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.selectSong(song)}>
          <Image
           style={{height:100, width: 100}}
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
