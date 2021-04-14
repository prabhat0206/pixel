import React from 'react';
import {View, Animated, FlatList, StatusBar} from 'react-native';
import SearchCom from '../Components/search';
import ListItems from '../Components/listItems';
import {ActivityIndicator} from 'react-native-paper';
import {getLink} from '../Components/NetAddress';
import Network from './Network';

export default function (props: any) {
  return <HomeScr {...props} />;
}

interface State {
  isLoading: boolean;
  data: any[];
  pageNo: number;
  isConnected: boolean;
}

class HomeScr extends React.Component<State> {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      pageNo: 1,
      isConnected: true,
    };
  }

  async componentDidMount() {
    this._FetchData(this.state.pageNo);
  }

  async _FetchData(pageNo: number, refresh: boolean = false) {
    const {data} = this.state;
    const link = await getLink();
    await fetch(`${link}&page=${pageNo}`)
      .then(res => res.json())
      .then(dataF => {
        if (data === null || refresh) {
          this.setState({
            data: dataF.hits,
            pageNo: 2,
          });
        } else {
          this.setState((prevData: any) => ({
            data: prevData.data.concat(dataF.hits),
            pageNo: prevData.pageNo + 1,
          }));
        }
      })
      .catch(err => this.setState({isConnected: false}))
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    const scrollY = new Animated.Value(0);
    const {data, isLoading} = this.state;
    return (
      <>
        {this.state.isConnected ? (
          <View style={{flex: 1, width: '100%', backgroundColor: '#242424'}}>
            <StatusBar backgroundColor="#242424" />
            <SearchCom scrollY={scrollY} />
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#4a4a4a" />
              </View>
            ) : (
              <>
                <FlatList
                  data={data}
                  numColumns={2}
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    this.setState({isLoading: true});
                    this._FetchData(1, true);
                  }}
                  maxToRenderPerBatch={20}
                  removeClippedSubviews={true}
                  keyExtractor={({id}, index) => id.toString()}
                  renderItem={({item}: any) => (
                    <>
                      {item === data[0] || item === data[1] ? (
                        <>
                          {item === data[0] ? (
                            <ListItems
                              items={item}
                              situations={78}
                              leftradius={15}
                            />
                          ) : (
                            <ListItems
                              items={item}
                              situations={78}
                              rightradius={15}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <ListItems items={item} />
                        </>
                      )}
                    </>
                  )}
                  onScroll={e =>
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                  }
                  ListFooterComponent={<ListFooter />}
                  extraData={this.state.data}
                  onEndReached={() => {
                    const {pageNo}: any = this.state;
                    this._FetchData(pageNo);
                  }}
                  onEndReachedThreshold={0.5}
                />
              </>
            )}
          </View>
        ) : (
          <Network />
        )}
      </>
    );
  }
}

const ListFooter = () => {
  return (
    <View style={{height: 70, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color="#7a7a7a" size="small" />
    </View>
  );
};
