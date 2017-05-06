/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainContainer from './src/MainContainer';
import SearchContainer from './src/components/SearchContainer';


const NowPlaying = StackNavigator({
  Main: {screen: MainContainer},
  Search: {screen: SearchContainer},
  }, {
    headerMode: 'none',
  }
);


AppRegistry.registerComponent('NowPlaying', () => NowPlaying);
