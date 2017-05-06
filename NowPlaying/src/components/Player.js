import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Icon } from 'native-base';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RCTAudio from 'react-native-player';

class Player extends React.Component {

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

  buttonClick() {
    RCTAudio.prepare("https://api.soundcloud.com/tracks/321237853/stream?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c", true)
  }

  render() {
    return (
      <View>
        <TouchableOpacity
         onPress={this.buttonClick}
        >
          <Text>Prepare</Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={this.playMusic}
        >
          <Icon name="ios-play" />
        </TouchableOpacity>
        <TouchableOpacity
         onPress={this.pause}
        >
          <Text>pause !!!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Player;
