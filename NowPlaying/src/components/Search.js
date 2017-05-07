import React from 'react';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSongs, searchSongs, emptySongs } from '../actions';
import Songs from './Songs';
import Player from './Player';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusSearch: false,
      keyword: '',
    }
    this.searchNow = this.searchNow.bind(this);
  }

  searchNow() {
    this.props.emptySongs()
    this.props.searchSongs(this.state.keyword);
    this.setState({
      statusSearch: true
    })
  }

  render() {
    const { emptySongs ,fetchSongs, navigation } = this.props
    return (

        <Container>
           <Header style={styles.header} searchBar rounded>
              <TouchableOpacity onPress={() => {emptySongs(); fetchSongs(); navigation.goBack()}}>
               <Icon style={{ paddingTop:16, paddingRight:20, }} name="ios-arrow-dropleft" />
              </TouchableOpacity>

              <Item>
                 <Icon name="ios-search" />
                 <Input
                  placeholder="Search"
                  name="keyword"
                  onChangeText={(text) => this.setState({keyword:text})}
                  onSubmitEditing={() => this.searchNow()}
                  value={this.state.keyword}
                 />
              </Item>

              <Button transparent>
                  <Text>Search</Text>
              </Button>
           </Header>
           <Player />
           {this.state.statusSearch ?
            <Songs />
            :
            <View />
           }
       </Container>
    )
  }
}

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
  searchSongs: PropTypes.func.isRequired,
  emptySongs: PropTypes.func.isRequired,
  fetchSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
}
const styles = {
  header: {
    backgroundColor: 'white',
  }
}

const stateProps = state => ({
  songs : state.songs
});

const dispatchProps = dispatch => ({
  searchSongs: (keyword) => dispatch(searchSongs(keyword)),
  fetchSongs: () => dispatch(fetchSongs()),
  emptySongs: () => dispatch(emptySongs()),
});


export default connect(stateProps,dispatchProps)(Search);
