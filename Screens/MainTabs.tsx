import React from 'react';
import 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import HomeScr from './HomeScr';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import ImageScreen from './ImageScreen';
import ProfileScr from './ProfileScr';
import {View, ActivityIndicator} from 'react-native';
import CategoryScr from './CategoryScr';
import SearchResult from './SearchResult';
import DownloadScr from './DownloadScr';
import FavScr from './FavScr';
import Notify from '../Components/Notifi';
import WelcomeScreen from '../initialScreens/WelcomeScr';
import Terms from '../initialScreens/Terms';
import SetProfile from '../initialScreens/SetProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(0,0,0, 0.1)',
  },
};

const TabNavigator = () => {
  const tabs = createMaterialTopTabNavigator();
  return (
    <tabs.Navigator
      initialRouteName="main"
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: '#242424',
          borderTopWidth: 0,
          elevation: 5,
          zIndex: 5,
        },
        labelStyle: {
          margin: 0,
          padding: 0,
          color: '#fff',
          fontSize: 10,
        },
        showIcon: true,
        iconStyle: {
          margin: 0,
          padding: 0,
          fontSize: 10,
        },
        activeTintColor: '#fff',
        inactiveTintColor: 'rbga(255,255,255,0.6)',
      }}>
      <tabs.Screen
        name="Home"
        component={HomeScr}
        options={{
          tabBarIcon: () => <Icon name="home" color="#fff" size={16} />,
        }}
      />
      <tabs.Screen
        name="Categories"
        component={CategoryScr}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="list-alt" color="#fff" size={16} />
          ),
        }}
      />
      <tabs.Screen
        name="Profile"
        component={ProfileScr}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" color="#fff" size={16} />,
        }}
      />
    </tabs.Navigator>
  );
};

export const PageNavigator = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator>
      <stack.Screen
        name="Image"
        component={ImageScreen}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Search"
        component={SearchResult}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="download"
        component={DownloadScr}
        options={{
          title: 'Downloads',
          headerStyle: {
            backgroundColor: '#242424',
          },
          headerTintColor: '#7a7a7a',
        }}
      />
      <stack.Screen
        name="fav"
        component={FavScr}
        options={{
          title: 'Favorites',
          headerStyle: {
            backgroundColor: '#242424',
          },
          headerTintColor: '#7a7a7a',
        }}
      />
    </stack.Navigator>
  );
};

interface State {
  isFirst: boolean;
  isLoading: boolean;
}

class MainTabs extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      isFirst: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.init();
    RNBootSplash.hide({fade: true});
  }

  async init() {
    const name = await AsyncStorage.getItem('name');
    if (name === undefined || name === null) {
      this.setState({isFirst: true, isLoading: false});
    } else {
      this.setState({isFirst: false, isLoading: false});
    }
  }

  async componentDidUpdate() {
    this.init();
  }

  render() {
    const {stack}: any = this.props;
    return (
      <>
        {this.state.isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#242424',
            }}>
            <ActivityIndicator size="large" color="#7a7a7a" />
          </View>
        ) : (
          <>
            {this.state.isFirst ? (
              <NavigationContainer theme={MyTheme}>
                <stack.Navigator screenOptions={{headerShown: false}}>
                  <stack.Screen name="welcome" component={WelcomeScreen} />
                  <stack.Screen name="terms" component={Terms} />
                  <stack.Screen name="setting" component={SetProfile} />
                </stack.Navigator>
              </NavigationContainer>
            ) : (
              <NavigationContainer theme={MyTheme}>
                <stack.Navigator screenOptions={{headerShown: false}}>
                  <stack.Screen name="tab" component={TabNavigator} />
                  <stack.Screen name="stack" component={PageNavigator} />
                  <stack.Screen name="notify" component={Notify} />
                </stack.Navigator>
              </NavigationContainer>
            )}
          </>
        )}
      </>
    );
  }
}

export default function (props: any) {
  const stack = createStackNavigator();
  return <MainTabs {...props} stack={stack} />;
}
