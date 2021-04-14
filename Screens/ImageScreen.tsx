import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {downloadImage} from '../Components/downloadMan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

export default function (props: any) {
  const navigation = useNavigation();
  return <ImageScreen {...props} navigation={navigation} />;
}

interface State {
  like: boolean;
  color: string;
  isInHistory: boolean;
}

class ImageScreen extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      like: false,
      color: '#fff',
      isInHistory: false,
    };
  }

  async componentDidMount() {
    const {route}: any = this.props;
    const {item}: any = route.params;
    if (await this.CheckItem(item, 'fav')) {
      this.setState({like: true, color: 'red'});
    }
    if (!(await this.CheckItem(item, 'history'))) {
      this.historySave(this.state.isInHistory);
    }
  }

  async CheckItem(item: any, key: string) {
    const arr = await AsyncStorage.getItem(key);
    if (arr !== null) {
      const raw_arr = JSON.parse(arr);
      let status = false;
      for (let data in raw_arr) {
        if (raw_arr[data].id === item.id) {
          status = true;
          break;
        }
      }
      return status;
    }
  }

  async checkPermission(url: string) {
    const {navigation}: any = this.props;
    if (await downloadImage(url)) {
      null;
    }
  }
  async GetIndex(item: any, key: string) {
    const get_saved_fav_images = await AsyncStorage.getItem(key);
    if (get_saved_fav_images !== null) {
      const saved_image_json_to_array = JSON.parse(get_saved_fav_images);
      let index = '';
      for (let data in saved_image_json_to_array) {
        if (saved_image_json_to_array[data].id === item.id) {
          index = data;
          break;
        }
      }
      return parseInt(index);
    }
  }

  async setFav(condition: boolean) {
    const {route}: any = this.props;
    const {item}: any = route.params;
    const saved_fav_image = await AsyncStorage.getItem('fav');
    if (!condition) {
      if (saved_fav_image !== null) {
        const array_of_saved_fav = JSON.parse(saved_fav_image);
        array_of_saved_fav.push(item);
        AsyncStorage.removeItem('fav');
        AsyncStorage.setItem('fav', JSON.stringify(array_of_saved_fav));
      } else {
        const array_to_save = [];
        array_to_save.push(item);
        AsyncStorage.setItem('fav', JSON.stringify(array_to_save));
      }
      this.setState({like: true, color: 'red'});
    } else {
      if (saved_fav_image !== null) {
        const array_of_saved_fav = JSON.parse(saved_fav_image);
        const index = await this.GetIndex(item, 'fav');
        array_of_saved_fav.splice(index, 1);
        console.log('Found');
        AsyncStorage.removeItem('fav');
        // console.log(arr);
        AsyncStorage.setItem('fav', JSON.stringify(array_of_saved_fav));
      }
      this.setState({like: false, color: '#fff'});
    }
  }

  async historySave(condition: boolean) {
    const {route}: any = this.props;
    const {item}: any = route.params;
    const savedHistory = await AsyncStorage.getItem('history');
    if (!condition) {
      if (savedHistory !== null) {
        const history_to_save = JSON.parse(savedHistory);
        const reversed_history = history_to_save.reverse();
        reversed_history.push(item);
        const number = this.getNumber(history_to_save);
        if (number > 20) {
          const again_history_resverse = reversed_history.reverse();
          const new_array_of_history = again_history_resverse.slice(0, 20);
          AsyncStorage.removeItem('history');
          AsyncStorage.setItem('history', JSON.stringify(new_array_of_history));
        } else {
          const new_again_history = reversed_history.reverse();
          AsyncStorage.removeItem('history');
          AsyncStorage.setItem('history', JSON.stringify(new_again_history));
        }
      } else {
        const new_history: any[] = [];
        new_history.push(item);
        AsyncStorage.setItem('history', JSON.stringify(new_history));
      }
      console.log('something');
      this.setState({isInHistory: true});
    }
  }

  getNumber(obj: any[]) {
    let count: number[] = [];
    for (const i in obj) {
      count.push(parseInt(i));
    }
    return count.length;
  }

  render() {
    const {route}: any = this.props;
    const {item}: any = route.params;

    return (
      <>
        <StatusBar backgroundColor="#242424" />
        <ImageBackground
          source={{uri: item.webformatURL}}
          style={{flex: 1, width: '100%'}}
          blurRadius={5}>
          <View style={{flex: 4.5, padding: 10}}>
            <View style={style.im_box}>
              <ImageBackground
                source={{uri: item.largeImageURL}}
                style={{
                  width: '100%',
                  flex: 1,
                  flexDirection: 'column-reverse',
                }}>
                <View style={style.credit}>
                  <View style={style.credit_name}>
                    <Text style={{color: '#fff'}}>
                      Image provided by pixabay.com
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={style.cont}>
              <View style={{flex: 1, padding: 10}}>
                <View
                  style={{height: 50, paddingLeft: 10, flexDirection: 'row'}}>
                  <View style={{width: 60, justifyContent: 'center'}}>
                    <Image
                      source={{uri: item.userImageURL}}
                      style={{height: 50, width: 50, borderRadius: 50}}
                    />
                  </View>
                  <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 18}}>
                      {item.user}
                    </Text>
                  </View>
                  <Text style={style.smLabel}>id: {item.user_id}</Text>
                </View>
                <View style={style.sControl}>
                  <View style={style.smallBox}>
                    <Icon name="eye" color="#fff" size={16} />
                    <Text style={style.smallBoxText}>{item.views}</Text>
                  </View>
                  <TouchableOpacity
                    style={style.smallBox}
                    onPress={() => this.setFav(this.state.like)}>
                    <Icon name="heart" color={this.state.color} size={15} />
                    <Text style={style.smallBoxText}>
                      {this.state.like ? parseInt(item.likes) + 1 : item.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.smallBox}
                    onPress={() => this.checkPermission(item.fullHDURL)}>
                    <Icon name="download" color="#fff" size={15} />
                    <Text style={style.smallBoxText}>{item.downloads}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const style = StyleSheet.create({
  smallBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBoxText: {
    color: '#fff',
    fontSize: 16,
  },
  smLabel: {
    color: '#fff',
    fontSize: 12,
  },
  sControl: {
    flex: 1,
    flexDirection: 'row',
  },
  cont: {
    flex: 1,
    backgroundColor: 'rgba(36, 36, 36, 0.9)',
    elevation: 5,
    zIndex: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  im_box: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    zIndex: 5,
  },
  credit: {
    width: '100%',
    height: 50,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  credit_name: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
});
