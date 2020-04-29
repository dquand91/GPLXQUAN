import {Alert, Platform} from 'react-native';
import {parseAPIError} from './APIError';

function showErrorAPI(responseJSON, onOkPress = null) {
  const {title, detail} = parseAPIError(responseJSON);
  const okButton = {text: 'Close', onPress: onOkPress};
  Alert.alert(title, detail, [okButton]);
}

function apiError(responseJSON) {
  showErrorAPI(responseJSON);
}

function showMessage(message, textButton = 'Close') {
  Alert.alert(null, message, [{text: textButton}]);
}

function showMessageCallback(message, onOkBtn = null) {
  Alert.alert(null, message, [{text: 'Close', onPress: onOkBtn}], {
    cancelable: false,
  });
}

function showAlertMessage(title, message, onOkBtn = null) {
  Alert.alert(
    title,
    message,
    [{text: 'Cancel', style: 'cancel'}, {text: 'OK', onPress: onOkBtn}],
    {cancelable: false},
  );
}

function showNoInternet(onPress: () => void) {
  Alert.alert(
    'Connection',
    'Please connect the Internet',
    [{text: 'OK', onPress}],
    {cancelable: false},
  );
}

function showAlert(
  title,
  message,
  okTextBtn = 'Close',
  onOkBtnPress: () => {},
) {
  Alert.alert(title, message, [{text: okTextBtn, onPress: onOkBtnPress}], {
    cancelable: false,
  });
}

function showMessageOnModal(message, textButton = 'Close') {
  setTimeout(() => showMessage(message, textButton), 200);
}

function showAlertOnModal(
  title,
  message,
  okTextBtn = 'OK',
  onOkBtnPress: () => {},
) {
  setTimeout(() => showAlert(title, message, okTextBtn, onOkBtnPress), 200);
}

export default {
  apiError,
  showErrorAPI,
  showMessage,
  showMessageCallback,
  showNoInternet,
  showAlertMessage,
  showMessageOnModal,
  showAlertOnModal,
  showAlert,

  // confirmSignOut: (onPressSignOut: () => {}) => {
  //   Alert.alert(
  //     t(`scene.Settings.signOut.confirmAlert.title${Platform.OS === 'ios' ? 'IOS' : 'Android'}`),
  //     t('scene.Settings.signOut.confirmAlert.message'),
  //     [
  //       { text: t('general.cancel'), style: 'default' },
  //       { text: t('scene.Settings.signOut.title'), style: 'destructive', onPress: onPressSignOut },
  //     ],
  //     { cancelable: false },
  //   );
  // },

  // confirmEditName: (onPressOk: () => {}, onPressCancel: () => {}) => {
  //   Alert.alert(
  //     null,
  //     t('scene.UserSettings.confirmEditNameAlert.message'),
  //     [
  //       { text: t('general.cancel'), style: 'default', onPress: onPressCancel },
  //       { text: t('general.ok'), style: 'destructive', onPress: onPressOk },
  //     ],
  //     { cancelable: false },
  //   );
  // },
};
