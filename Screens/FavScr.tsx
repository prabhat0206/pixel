import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import ListItems from '../Components/listItems';

export default function (props: any) {
  return <FavScr {...props} />;
}

interface State {
  data: any[];
  isAvailable: boolean;
  isLoading: boolean;
}

class FavScr extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isAvailable: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const arr = await AsyncStorage.getItem('fav');
    if (arr !== null) {
      const raw_arr = JSON.parse(arr);
      this.setState({data: raw_arr, isAvailable: true, isLoading: false});
    } else {
      this.setState({isAvailable: false, isLoading: false});
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#242424'}}>
        {this.state.isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#7a7a7a" size="large" />
          </View>
        ) : (
          <>
            {this.state.isAvailable ? (
              <View>
                <FlatList
                  data={this.state.data.reverse()}
                  keyExtractor={({id}, index) => id.toString()}
                  numColumns={2}
                  renderItem={({item}: any) => <ListItems items={item} />}
                  extraData={this.state.data}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#7a7a7a', fontSize: 15, fontWeight: 'bold'}}>
                  Currently you have no favorite images
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    );
  }
}
