import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function (props: any) {
  return <SetProfile {...props} />;
}

interface State {
  isFilled: boolean;
  isClicked: boolean;
  name: string;
  age: string;
}

class SetProfile extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      isFilled: false,
      isClicked: false,
      name: '',
      age: '',
    };
  }

  saveData() {
    this.setState({isClicked: true});
    const {name, age} = this.state;
    AsyncStorage.setItem('name', name);
    AsyncStorage.setItem('age', age.toString());
  }

  render() {
    const {name, age} = this.state;
    return (
      <View style={{backgroundColor: '#242424', flex: 1, padding: 10}}>
        <View style={{height: 100, flexDirection: 'column-reverse'}}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
            Let know something about you !
          </Text>
        </View>
        <View
          style={{
            height: 100,
            alignItems: 'center',
            flexDirection: 'column-reverse',
          }}>
          <Icon name="user" size={50} color="#fff" />
        </View>
        <View style={{height: 200, alignItems: 'center', marginTop: 25}}>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#7a7a7a"
            style={styles.textInput}
            onChangeText={(value: string) => this.setState({name: value})}
          />
          <TextInput
            placeholder="Enter your age"
            placeholderTextColor="#7a7a7a"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(value: string) =>
              this.setState({age: parseInt(value)})
            }
          />
        </View>
        <View
          style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
          {name !== '' && age !== '' ? (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'red',
                borderRadius: 60,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.saveData()}>
              {this.state.isClicked ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Icon name="arrow-right" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: 250,
    color: '#fff',
    fontSize: 15,
    padding: 10,
    paddingLeft: 0,
    marginTop: 10,
  },
});
