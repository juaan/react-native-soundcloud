import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import RCTAudio from 'react-native-player';
import { connect } from 'react-redux';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {
  pauseSongs,
  stopSongs,
  playSongs,
  nextSongs
} from '../actions';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.playMusic = this.playMusic.bind(this)
    this.pause = this.pause.bind(this)
    this.stop = this.stop.bind(this)
    this.onEnd = this.onEnd.bind(this);
    this.onReady = this.onReady.bind(this);

  }
  componentWillMount() {
    RCTDeviceEventEmitter.addListener('error',this.onError);
    RCTDeviceEventEmitter.addListener('end',this.onEnd);
    RCTDeviceEventEmitter.addListener('ready',this.onReady);
  }

  componentDidUpdate(prevProps) {
    if(this.props.player.song !== null && prevProps.player.song !== this.props.player.song) {
      console.log('mantab');
      this.startSong();
    }
  }

  playMusic() {
    this.props.playSongs();
    RCTAudio.start();
  }

  pause() {
    this.props.pauseSongs();
    RCTAudio.pause();
  }

  stop() {
    this.props.stopSongs();
    RCTAudio.stop();
  }

  onError(err) {
    console.log(err);
  }

  onEnd() {
    console.log('end');
    this.props.nextSongs();
  }

  onReady () {
    console.log('start');
  }

  startSong() {
    const {song} = this.props.player;
    RCTAudio.prepare(`${song.uri}/stream?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c`, true);
  }



  render() {
    const { player } = this.props;
    return (
      <View>
      { player.song !== null ?

        <TouchableOpacity style={styles.container}>
          <Image
            style={{ width: '30%' }}
            source={{ uri: player.song.artwork_url ? player.song.artwork_url : player.song.user.avatar_url }}
          />
          <View style={{ flexDirection:'column', paddingLeft: 15 }}>
            <Text style={{ color: 'ghostwhite' }}> {player.song.user.username} </Text>
            <Text style={{ color: 'white' }}> {player.song.title} </Text>

          { player.statusPlaying !== true ?
            <TouchableOpacity
             onPress={this.playMusic}
            >
              <Icon style={styles.icon} name="ios-play" />
            </TouchableOpacity>
            :
            <View style={{ flexDirection:'row'}}>
              <TouchableOpacity
               onPress={this.stop}
              >
                <Icon style={styles.icon} name="ios-square" />

              </TouchableOpacity>
              <TouchableOpacity
               onPress={this.pause}
              >
                <Icon style={styles.icon} name="ios-pause" />

              </TouchableOpacity>
            </View>
          }
          </View>
        </TouchableOpacity>
        :
        <View />
      }
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 'auto',
    padding: 15,
    backgroundColor: '#F9690E',
    elevation: 10,
  },
  icon: {
    color: 'white',
    padding: 10,
  }
}

Player.propTypes = {

  player: PropTypes.object.isRequired,
  stopSongs: PropTypes.func.isRequired,
  playSongs: PropTypes.func.isRequired,
  pauseSongs: PropTypes.func.isRequired,
}

const stateToProps = state => ({
  player: state.player,
})

const dispatchToProps = dispatch => ({
  pauseSongs: () => dispatch(pauseSongs()),
  stopSongs: () => dispatch(stopSongs()),
  playSongs: () => dispatch(playSongs()),
  nextSongs: () => dispatch(nextSongs()),
})

export default connect(stateToProps, dispatchToProps)(Player);
