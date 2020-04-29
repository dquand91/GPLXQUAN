import React, {Component} from 'react';
import MyNavigatior from './MyNavigatior';
import {Root} from 'native-base';

export default class MyRootAppNativeBase extends Component {
  render() {
    return (
      <Root>
        <MyNavigatior />
      </Root>
    );
  }
}
