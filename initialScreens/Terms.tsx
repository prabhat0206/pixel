import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <Terms {...props} navigation={navigation} />;
}

interface State {
  isAccepted: boolean;
}

class Terms extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      isAccepted: false,
    };
  }

  async _getPermissions() {
    try {
      const {navigation}: any = this.props;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('setting');
      } else {
        Alert.alert(
          'Permission denied, You will not be able to save images on this device',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#242424', padding: 10}}>
        <StatusBar backgroundColor="#242424" />
        <View
          style={{
            padding: 10,
            paddingLeft: 0,
            width: '100%',
            borderBottomColor: '#fff',
            borderBottomWidth: 0.5,
            height: 50,
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Terms & Conditions</Text>
        </View>
        <Text style={{color: '#fff', marginTop: 10}}>
          Please read carefully before using this app
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            backgroundColor: '#1f1f1f',
            padding: 15,
            borderRadius: 15,
          }}>
          <ScrollView>
            <Text style={{color: '#fff'}}>Welcome to Pixel Galley </Text>
            <Text style={{color: '#fff'}}>
              "Pixel Gallery" whose main aim to provide high quality images for
              free for all.{' '}
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>Conditions for Use - </Text>
            <Text style={{color: '#fff'}}>
              All images are licensed under pixabay.com which means you are not
              able to sell these images for any profit. All Images are free to
              use anywhere and these images are end-user consumption. If you
              sell any image for any profit this act will come under our illegal
              act. Legal action will be taken against this action. If you are
              comfortable with our condition then continue to use our service
              otherwise you can stop using it.{' '}
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>Permissions requires- </Text>
            <Text style={{color: '#fff'}}>
              We don’t require any permission except storage which help you to
              store downloaded images locally on your phone storage.{' '}
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>Features- </Text>
            <Text style={{color: '#fff'}}>
              All images are free, High Quality images and This app is powered
              by pixabay.com{' '}
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>
              We will try to push update regularly. Please share this app as
              much you can to use this service for free in future.
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>
              Thanks for giving time to read this terms and conditions
            </Text>
            <View style={{height: 20}} />
            <Text style={{color: '#fff'}}>About Developer- </Text>
            <Text style={{color: '#fff'}}>
              Pixel Gallery is designed, programmed and managed by Prabhat
              Ranjan and his company.{' '}
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            height: 80,
            width: '100%',
            marginTop: 10,
            borderTopWidth: 0.5,
            borderTopColor: '#fff',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Checkbox
                value={this.state.isAccepted}
                onValueChange={(value) => {
                  this.setState({isAccepted: value});
                }}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>
                I agree to the Terms and Conditions
              </Text>
            </View>
            {this.state.isAccepted ? (
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: 'green',
                  borderRadius: 50,
                  height: 50,
                  overflow: 'hidden',
                  elevation: 5,
                  zIndex: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this._getPermissions()}>
                <Icon name="arrow-right" color="#fff" size={20} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
