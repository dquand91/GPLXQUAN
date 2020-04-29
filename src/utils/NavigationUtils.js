import {StackActions, NavigationActions} from 'react-navigation';

export function navigateClearStack(navigation, screenName, data) {
  const action = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: screenName, params: {data: data}}),
    ],
  });
  navigation.dispatch(action);
}

export function goToScreen(navigation, screenName) {
  navigation.navigate(screenName);
}
