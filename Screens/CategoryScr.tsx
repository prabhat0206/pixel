import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <CategoryScr {...props} navigation={navigation} />;
}

class CategoryScr extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {navigation}: any = this.props;
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: '#3d3d3d',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={categories}
            numColumns={3}
            keyExtractor={({id}, index) => id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  width: '33.33%',
                  height: 120,
                  flexDirection: 'row',
                  padding: 5,
                }}
                onPress={() =>
                  navigation.navigate('stack', {
                    screen: 'Search',
                    params: {wordToSearch: item.name},
                  })
                }>
                <ImageBackground
                  source={{uri: item.image_uri}}
                  blurRadius={3}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    overflow: 'hidden',
                    elevation: 4,
                    backgroundColor: '#242424',
                    zIndex: 4,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const categories: any[] = [
  {
    id: 1,
    name: 'Animals',
    image_uri:
      'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg',
  },
  {
    id: 14,
    name: 'Bikes',
    image_uri:
      'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg',
  },
  {
    id: 2,
    name: 'Cars',
    image_uri:
      'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg',
  },
  {
    id: 5,
    name: 'Cartoons',
    image_uri:
      'https://cdn.pixabay.com/photo/2016/07/10/21/53/super-mario-1508624_960_720.jpg',
  },
  {
    id: 6,
    name: 'Celebrities',
    image_uri:
      'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg',
  },
  {
    id: 3,
    name: 'Flowers',
    image_uri:
      'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_960_720.jpg',
  },
  {
    id: 7,
    name: 'Games',
    image_uri:
      'https://cdn.pixabay.com/photo/2017/09/08/20/29/chess-2730034_960_720.jpg',
  },
  {
    id: 11,
    name: 'Movies',
    image_uri:
      'https://cdn.pixabay.com/photo/2015/09/02/12/45/movie-918655_960_720.jpg',
  },
  {
    id: 10,
    name: 'Music',
    image_uri:
      'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074_960_720.jpg',
  },
  {
    id: 4,
    name: 'Nature',
    image_uri:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
  },
  {
    id: 12,
    name: 'Scenery',
    image_uri:
      'https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518_960_720.jpg',
  },
  {
    id: 8,
    name: 'Space',
    image_uri:
      'https://cdn.pixabay.com/photo/2018/08/15/13/10/galaxy-3608029_960_720.jpg',
  },
  {
    id: 13,
    name: 'Sports',
    image_uri:
      'https://cdn.pixabay.com/photo/2016/09/18/14/21/swimmer-1678307_960_720.jpg',
  },
  {
    id: 9,
    name: 'Superheroes',
    image_uri:
      'https://cdn.pixabay.com/photo/2019/10/14/14/41/osaka-4549068_960_720.jpg',
  },
];
