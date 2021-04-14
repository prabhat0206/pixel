import React from 'react';
import {Animated, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <SearchCom {...props} navigation={navigation} />;
}

interface State {
  color: string;
  textValue: string;
}

class SearchCom extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      color: '#7a7a7a',
      textValue: '',
    };
  }

  render() {
    const {scrollY, navigation}: any = this.props;
    const color = this.state.color;
    const diffClamp = Animated.diffClamp(scrollY, 0, 70);
    const translateY = diffClamp.interpolate({
      inputRange: [0, 70],
      outputRange: [0, -70],
    });
    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          padding: 10,
          zIndex: 1,
          elevation: 5,
          width: '100%',
          transform: [
            {
              translateY: translateY,
            },
          ],
        }}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#4a4a4a',
            elevation: 7,
            marginTop: 5,
          }}>
          <View
            style={{
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="search" size={20} color={color} />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              style={{backgroundColor: '#4a4a4a', color: '#fff'}}
              placeholder="Search Images"
              placeholderTextColor={color}
              onFocus={() => this.setState({color: '#ababab'})}
              onEndEditing={() => this.setState({color: '#7a7a7a'})}
              onChangeText={(value: string) => {
                this.setState({textValue: value});
              }}
              onSubmitEditing={() => {
                const value = this.state.textValue;
                navigation.navigate('stack', {
                  screen: 'Search',
                  params: {wordToSearch: value},
                });
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}
