import API from './API';
import Alerts from './Alerts';
import MyAppAPI from './MyAppAPI';

let isShowingAlertNoInternet = false;

function handleNoInternet() {
  if (isShowingAlertNoInternet) {
    return;
  }
  isShowingAlertNoInternet = true;
  Alerts.showNoInternet(() => {
    isShowingAlertNoInternet = false;
  });
}
// apiExternalHamic=https://staging.api-external.hamic.jp
const api = new API({
  baseURL: 'https://api.jsonbin.io',
  handleNoInternet,
});

// const messageAPI = new API({
//   baseURL: config.AWS.APIGateway.endpoint,
//   getToken,
//   handleNoInternet,
// });

export default {
  myAppApi: new MyAppAPI({api}),
  // hamic: new HamicAPI({ api }),
  // message: new MessageAPI({ api: messageAPI }),
  // s3: {
  //   upload(userId, photo) {
  //     return Avatar.upload({ id: userId }, photo);
  //   },
  //   getURL(path) {
  //     return getSignedURLFromS3({
  //       Bucket: config.AWS.S3.bucket.hamicRawAudio,
  //       Key: path,
  //     });
  //   },
  // },
};
