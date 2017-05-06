import React from 'react';
import { View, ToolbarAndroid } from 'react-native';
import { Icon } from 'native-base';

class Headerhome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <ToolbarAndroid
        title="Now-Playin"
        style={styles.toolbar}
        actions={[{title: 'Search', icon: require('./search.png'), show: 'always', color: 'white'}]}
        onActionSelected={() => {navigation.navigate('Search')}}
        >
          <Icon name="ios-play" style={{ paddingLeft: 10 }} />
        </ToolbarAndroid>
      </View>

    )
  }

}

const styles = {
  toolbar:{
    backgroundColor: 'white',
    color: 'white',
    height: 56,
    elevation: 5,
  },
};

export default Headerhome;
