import React from 'react';
import { Provider } from 'react-redux';

import Search from './Search';
import store from '../store';

class SearchContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Search navigation={this.props.navigation}/>
      </Provider>
    )
  }
}

export default SearchContainer
