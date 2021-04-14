import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Network extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#242424',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="wifi" color="#7a7a7a" size={20} />
        <Text style={{color: '#fff', marginTop: 10}}>
          Check your internet connection
        </Text>
      </View>
    );
  }
}
