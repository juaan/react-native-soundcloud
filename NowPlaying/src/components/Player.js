import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import RCTAudio from 'react-native-player';
import { connect } from 'react-redux';

import {
  pauseSongs,
  stopSongs,
  playSongs,
} from '../actions';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.playMusic = this.playMusic.bind(this)
    this.pause = this.pause.bind(this)
    this.stop = this.stop.bind(this)
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

const stateToProps = state => ({
  player: state.player,
})

const dispatchToProps = dispatch => ({
  pauseSongs: () => dispatch(pauseSongs()),
  stopSongs: () => dispatch(stopSongs()),
  playSongs: () => dispatch(playSongs()),
})

export default connect(stateToProps, dispatchToProps)(Player);
