import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

class Song extends React.Component {

  convertDuration(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    const { song } = this.props
    const duration = this.convertDuration(song.duration);
    return (
      <View style={styles.container}>

        <TouchableOpacity>
          <Image
           style={{height:100, width: 100}}
           source={{uri: song.artwork_url ? song.artwork_url : song.user.avatar_url }}
          />
        </TouchableOpacity>

          <View style={styles.detail}>
            <TouchableOpacity>
              <Text style={{ color: 'grey' }}> {song.user.username} </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}> {song.title} </Text>
            </TouchableOpacity>
            <TouchableOpacity style= {{ flexDirection: 'row', padding: 10 }}>
              <Icon style={{fontSize: 25}} name="ios-headset-outline" />
              <Text style= {{ paddingLeft: 5, fontSize: 18}}>{song.playback_count}</Text>
            </TouchableOpacity>
          </View>
        <Text> {duration} </Text>
      </View>
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
}

export default Song
