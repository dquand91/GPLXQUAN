import React, {Component} from 'react';
import {Provider} from 'react-redux';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import {StyleProvider} from 'native-base';
import store from './redux/store';
import MyRootAppNativeBase from './navigation/MyRootAppNativeBase';

export default class MyApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Provider store={store}>
          <MyRootAppNativeBase />
        </Provider>
      </StyleProvider>
    );
  }
}
