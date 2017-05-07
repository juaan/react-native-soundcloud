import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RCTAudio from 'react-native-player';
import { connect } from 'react-redux';


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.selectSong = this.selectSong.bind(this)
  }

  componentWillMount() {
    RCTDeviceEventEmitter.addListener('error',this.onError);
    RCTDeviceEventEmitter.addListener('end',this.onEnd);
    RCTDeviceEventEmitter.addListener('ready',this.onReady);
  }

  onError(err) {
    console.log(err);
  }

  onEnd() {
    console.log("end");
  }

  onReady () {
    console.log('on ready...')
  }

  playMusic() {
    RCTAudio.start()
  }

  pause() {
    RCTAudio.pause()
  }

  stop() {
    RCTAudio.stop()
  }

  selectSong() {
    const { song } = this.props.player
    console.log('ngeplay ni', song.id);
    RCTAudio.prepare(`https://api.soundcloud.com/tracks/${song.id}/stream?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c`, true)
  }

  render() {
    const { player } = this.props;
    return (
      <View>
      { player.song !== null ?

        <TouchableOpacity onPress={this.selectSong()} style={styles.container}>
          <Image
            style={{ height:50, width: 50 }}
            source={{ uri: player.song.artwork_url ? player.song.artwork_url : player.song.user.avatar_url }}
          />
          { player.statusPlaying !== true ?
            <TouchableOpacity
             onPress={this.playMusic}
            >
              <Icon name="ios-play-outline" />
            </TouchableOpacity>
            :
            <TouchableOpacity
             onPress={this.pause}
            >
              <Icon name="ios-pause-outline" />

            </TouchableOpacity>
          }
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
    justifyContent: 'space-between',
    height: 70,
    padding: 10,
    backgroundColor: '#F9690E',
    borderTopWidth: 2,
    borderTopColor: '#f50'
  }
}

const stateToProps = state => ({
  player: state.player,
})


export default connect(stateToProps, null)(Player);
