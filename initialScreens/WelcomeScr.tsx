import React from 'react';
import {Image, Text, TouchableOpacity, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <WelcomeScreen {...props} navigation={navigation} />;
}

class WelcomeScreen extends React.Component {
  render() {
    const {navigation}: any = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#242424',
        }}>
        <StatusBar backgroundColor="#242424" />
        <Text style={{fontSize: 25, color: '#fff', marginBottom: 50}}>
          Welcome!
        </Text>
        <Image
          source={require('../assets/icon.png')}
          style={{height: 150, width: 150}}
        />
        <Text style={{color: 'white', marginTop: 50}}>
          We are going to represent you
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Pixel Gallery
        </Text>
        <TouchableOpacity
          style={{height: 100, justifyContent: 'center'}}
          onPress={() => navigation.navigate('terms')}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#fff',
            }}>
            <Icon name="arrow-right" color="#fff" size={20} />
          </View>
        </TouchableOpacity>
        <Text style={{color: 'white', marginTop: 20, marginBottom: 5}}>
          Powered by
        </Text>
        <View style={{width: 130, height: 40, padding: 10}}>
          <Image
            source={require('../assets/pixabay.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>
    );
  }
}
