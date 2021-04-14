import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {_getPermissions} from '../Components/downloadMan';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <DownloadScr {...props} navigation={navigation} />;
}

interface State {
  ext: any[];
  data: any[];
  isLoading: boolean;
  isAvailable: boolean;
}

class DownloadScr extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      ext: ['jpg', 'png', 'gif', 'jpeg'],
      data: [],
      isLoading: true,
      isAvailable: true,
    };
  }

  async componentDidMount() {
    const {navigation}: any = this.props;
    if (await _getPermissions()) {
      const dirs = RNFetchBlob.fs.dirs.DownloadDir + '/PixelGallery/';
      if (await RNFetchBlob.fs.isDir(dirs)) {
        const all_images = await RNFetchBlob.fs.ls(dirs);
        let data_arr = [];
        for (let data in all_images) {
          const image = all_images[data];
          const data_ext = image.slice(-5).split('.')[1];
          let get_ext = this.getIndex(data_ext);
          if (get_ext) {
            let obj = {
              id: '',
              image: '',
            };
            obj.id = data;
            obj.image = 'file://' + dirs + image;
            data_arr.push(obj);
          }
        }
        this.setState({data: data_arr, isLoading: false});
      } else {
        this.setState({isLoading: false, isAvailable: false});
      }
    } else {
      navigation.navigate('notify', {
        message:
          'allow storage permission to see previous downloaded images in your phone',
      });
    }
  }

  getIndex(value: string) {
    const ext = this.state.ext;
    const getvalue = ext.indexOf(value);
    if (getvalue === undefined || getvalue === null) {
      return false;
    } else {
      return true;
    }
  }

  async _openPhoto(url: string) {
    // const supported = await Linking.canOpenURL('photo-content://' + url);
    // if (supported) {
    // await Linking.openURL('http://' + url);
    // } else {
    //   Alert.alert(`unsupported`);
    // }
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
          <View style={{flex: 1}}>
            {this.state.isAvailable ? (
              <FlatList
                data={this.state.data.reverse()}
                keyExtractor={({id}, index) => id.toString()}
                numColumns={2}
                renderItem={({item}: any) => (
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      height: 300,
                      overflow: 'hidden',
                    }}
                    onPress={() => this._openPhoto(item.image)}>
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{height: '100%', width: '100%'}}
                    />
                  </TouchableOpacity>
                )}
                extraData={this.state.data}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#7a7a7a'}}>
                  Download some images to see here
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
