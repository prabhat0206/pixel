import React from 'react';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import {getLink} from '../Components/NetAddress';
import ListItems from '../Components/listItems';
import {ScrollView} from 'react-native-gesture-handler';

export default function (props: any) {
  return <SearchResult {...props} />;
}

interface State {
  data: any[];
  isLoading: boolean;
  queryData: string;
}

let routeSt: string;
let NewLoad: boolean;

class SearchResult extends React.Component<State> {
  state: Readonly<State>;
  offset: number;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      queryData: '',
    };
    this.offset = 1;
  }

  async componentDidMount() {
    const {route}: any = this.props;
    const {wordToSearch}: any = route.params;
    const query = wordToSearch.replace(' ', '+');
    this.setState({queryData: query});
    this.fetchDatatoShow(this.offset);
  }
  async fetchDatatoShow(pageNo: number, refresh: boolean = false) {
    const {data} = this.state;
    const link = await getLink();
    await fetch(`${link}&q=${this.state.queryData}&page=${pageNo}`)
      .then(res => res.json())
      .then(dataF => {
        if (data === null || refresh || this.offset === 1) {
          this.offset = 2;
          this.setState({
            data: dataF.hits,
          });
        } else {
          this.offset += 1;
          this.setState((prevData: any) => ({
            data: prevData.data.concat(dataF.hits),
          }));
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        (NewLoad = false), this.setState({isLoading: false});
      });
  }

  render() {
    const {route}: any = this.props;
    const {wordToSearch}: any = route.params;
    routeSt = wordToSearch;
    const isLoading = this.state.isLoading;
    const data = this.state.data;
    return (
      <View style={{flex: 1, backgroundColor: '#242424'}}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#7a7a7a" size="large" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            {this.state.data[0] === undefined ? (
              <>
                <HeaderView />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>No Data Found</Text>
                </View>
              </>
            ) : (
              <FlatList
                data={data}
                numColumns={2}
                refreshing={this.state.isLoading}
                onRefresh={() => {
                  this.setState({isLoading: true});
                  this.fetchDatatoShow(1, true);
                }}
                maxToRenderPerBatch={30}
                removeClippedSubviews={true}
                keyExtractor={({id}, index) => id.toString()}
                renderItem={({item}: any) => (
                  <>
                    {item === data[0] || item === data[1] ? (
                      <>
                        {item === data[0] ? (
                          <ListItems items={item} leftradius={15} />
                        ) : (
                          <ListItems items={item} rightradius={15} />
                        )}
                      </>
                    ) : (
                      <>
                        <ListItems items={item} />
                      </>
                    )}
                  </>
                )}
                ListHeaderComponent={<HeaderView />}
                extraData={this.state.data}
                onEndReached={() => {
                  NewLoad = true;
                  this.fetchDatatoShow(this.offset);
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={<ListFooter />}
                ListFooterComponentStyle={{height: 100}}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const HeaderView = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 80,
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text style={{fontSize: 20, color: '#fff'}}>
        Search results for "{routeSt}"
      </Text>
    </View>
  );
};
const ListFooter = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(NewLoad);
  });
  return (
    <>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#7a7a7a" size="small" />
        </View>
      ) : null}
    </>
  );
};
