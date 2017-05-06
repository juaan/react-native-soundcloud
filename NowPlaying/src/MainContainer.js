import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

import Main from './components/Main';

class MainContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <Main navigation={this.props.navigation}/>
      </Provider>
    );
  }
}

export default MainContainer;
