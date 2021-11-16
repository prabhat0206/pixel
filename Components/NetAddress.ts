import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLink = async (perPage: number = 30) => {
  const age = await AsyncStorage.getItem('age');
  if (age !== null) {
    if (parseInt(age) > 18) {
      return `https://pixabay.com/api/?key=apikeye&per_page=${perPage}`;
    } else {
      return `https://pixabay.com/api/?key=apikey&safesearch=true&per_page=${perPage}`;
    }
  }
};

const perAdd =
  'https://pixabay.com/api/?key=11444695-decde4774366bdb72fa4100ce&per_page=30';
export default perAdd;
export const image_uri =
  'https://cdn.pixabay.com/photo/2021/02/07/09/11/sunset-5990540_960_720.jpg';

export const FetchData = async (location: string) => {
  let dataDelta: any;
  await fetch(location)
    .then((res) => res.json())
    .then((data) => (dataDelta = data.hits));
  return dataDelta;
};
