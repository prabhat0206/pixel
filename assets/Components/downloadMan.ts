import {Alert, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const _getPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const downloadImage = async (url: string) => {
  const checkFirst = await _getPermissions();
  if (!checkFirst) {
    return false;
  } else {
    var date = new Date();
    var image_URL = url;
    var ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    // fs.mkdir(fs.dirs.SDCardDir + '/' + 'Images');
    let PictureDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/PixelGallery' +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };

    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        return true;
      });
  }
};
export const getExtention = (filename: any) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

export const _createFolder = () => {
  const {mkdir, dirs} = RNFetchBlob.fs;
  mkdir(dirs.SDCardDir + '/' + 'Custom');
};
