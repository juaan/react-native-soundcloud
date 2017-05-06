import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import { fetchSongs } from '../actions';
import Headerhome from './Header';
import Songs from './Songs';

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSongs();
  }

  render() {
    return (
      <View>
        <Headerhome navigation={this.props.navigation} />
        <Songs />
      </View>
    );
  }
}

const dispatcProps = dispatch => ({
  fetchSongs: () => dispatch(fetchSongs()),
})

export default connect(null,dispatcProps)(Main);
