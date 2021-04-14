import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNFetchBlob from "rn-fetch-blob";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface State {
  name: string;
  isHistory: boolean;
  history: any[];
}

class ProfileScr extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      isHistory: false,
      history: [],
    };
  }

  async componentDidMount() {
    const name = await AsyncStorage.getItem("name");
    this.setState({ name: name });
    this._getHistory();
  }
  async _getList() {
    const dirs = RNFetchBlob.fs.dirs.DownloadDir + "/PixelGallery/";
    console.log(await RNFetchBlob.fs.ls(dirs));
  }

  async _getHistory() {
    const all_history = await AsyncStorage.getItem("history");
    if (all_history !== null) {
      this.setState({ isHistory: true, history: JSON.parse(all_history) });
    } else {
      this.setState({ isHistory: false, history: [] });
    }
  }

  async componentDidUpdate() {
    const updated_history = await AsyncStorage.getItem("history");
    if (updated_history !== null) {
      if (JSON.parse(updated_history) !== this.state.history) {
        this._getHistory();
      }
    } else {
      this._getHistory();
    }
  }

  async onShare() {
    try {
      const result = await Share.share({
        message: "Link Here",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    const { navigation }: any = this.props;
    return (
      <>
        <View style={{ flex: 1, backgroundColor: "#3d3d3d" }}>
          <View
            style={{
              width: "100%",
              height: 110,
              backgroundColor: "#3d3d3d",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <View
              style={{
                width: 90,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: '#242424',
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                  overflow: "hidden",
                  backgroundColor: "#242424",
                  elevation: 4,
                  zIndex: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="user" color="#fff" size={35} />
              </View>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 80,
                  backgroundColor: "#242424",
                  marginRight: 10,
                  justifyContent: "center",
                  paddingLeft: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  {this.state.name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, padding: 10, paddingBottom: 30 }}>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "33.33%",
                  height: 110,
                  padding: 5,
                }}
                onPress={() => navigation.navigate("stack", { screen: "fav" })}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    backgroundColor: "#242424",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="heart" color="#fff" size={20} />
                  <Text style={{ color: "#fff", fontSize: 11 }}>Favorites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "33.33%",
                  height: 110,
                  padding: 5,
                }}
                onPress={() =>
                  navigation.navigate("stack", { screen: "download" })
                }
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    backgroundColor: "#242424",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="download" color="#fff" size={20} />
                  <Text style={{ color: "#fff", fontSize: 11 }}>Downloads</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "33.33%",
                  height: 110,
                  padding: 5,
                }}
                onPress={() => this.onShare()}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    backgroundColor: "#242424",
                    borderRadius: 10,
                  }}
                >
                  <Icon name="share" color="#fff" size={20} />
                  <Text style={{ color: "#fff", fontSize: 11 }}>Share</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3, padding: 10 }}>
              {this.state.isHistory ? (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#242424",
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <FlatList
                    data={this.state.history}
                    numColumns={3}
                    ListHeaderComponent={<Header />}
                    keyExtractor={({ id }: any, index) => id.toString()}
                    renderItem={({ item }: any) => (
                      <View
                        style={{
                          width: "33.33%",
                          padding: 5,
                          height: 120,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            width: "100%",
                            borderRadius: 8,
                            overflow: "hidden",
                            elevation: 5,
                            zIndex: 5,
                          }}
                          onPress={() =>
                            navigation.navigate("stack", {
                              screen: "Image",
                              params: { name: "tab to stack", item: item },
                            })
                          }
                        >
                          <Image
                            source={{ uri: item.webformatURL }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </>
    );
  }
}

const Header = () => {
  const cleanHistory = () => {
    AsyncStorage.removeItem("history");
  };

  return (
    <View
      style={{
        justifyContent: "center",
        height: 30,
        paddingLeft: 5,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "#fff" }}>Recently Viewed Images</Text>
      </View>
      <TouchableOpacity
        style={{
          paddingRight: 10,
          justifyContent: "center",
        }}
        onPress={() => cleanHistory()}
      >
        <Text style={{ color: "#fff" }}>clear</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function (props: any) {
  const navigation = useNavigation();
  return <ProfileScr {...props} navigation={navigation} />;
}
