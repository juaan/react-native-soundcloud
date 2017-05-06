import React from 'react';
import { View,ListView} from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import Song from './Song';

class Songs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      }
    }

    render() {
      return (
        <View style={{height: 'auto'}}>
          { this.props.songs.length > 0 ?
            <ListView
              dataSource={this.state.ds.cloneWithRows(this.props.songs)}
              renderRow={(rowData) => <Song song={rowData}/> }
            />
            :
            <Spinner color='blue'/>
          }
        </View>
      );
    }
}

const stateProps = state => ({
  songs: state.songs,
});


export default connect(stateProps, null)(Songs);
