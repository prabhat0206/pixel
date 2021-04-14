import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Notify = ({route}: any) => {
  const navigation = useNavigation();
  const message = route.params.message;
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242424',
        padding: 40,
      }}>
      <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
        {message}
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          borderColor: '#fff',
          justifyContent: 'center',
          borderWidth: 1,
          marginTop: 200,
          width: 80,
          borderRadius: 15,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{textAlign: 'center', color: '#fff'}}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notify;
