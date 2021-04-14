import React from 'react';
import {TouchableOpacity, Image, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ListItems = ({
  items,
  situations = 0,
  leftradius = 0,
  rightradius = 0,
}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: '50%',
        height: 300,
        marginTop: situations,
        borderTopLeftRadius: leftradius,
        borderTopRightRadius: rightradius,
        overflow: 'hidden',
      }}
      onPress={() =>
        navigation.navigate('stack', {
          screen: 'Image',
          params: {name: 'tab to stack', item: items},
        })
      }>
      <Image
        source={{
          uri: items.webformatURL,
        }}
        style={{height: '100%', width: '100%'}}
      />
    </TouchableOpacity>
  );
};

export default ListItems;
