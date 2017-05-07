import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import { fetchSongs } from '../actions';
import Headerhome from './Header';
import Songs from './Songs';
import Player from './Player';

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSongs();
  }

  render() {
    return (
      <View style={styles.container}>
        <Headerhome navigation={this.props.navigation} />
        <Player />
        <Songs />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
}
const dispatcProps = dispatch => ({
  fetchSongs: () => dispatch(fetchSongs()),
})

export default connect(null,dispatcProps)(Main);
