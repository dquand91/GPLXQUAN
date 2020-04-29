/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

import {Button} from 'native-base';

export default class ButtonHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {inputImage, inputText, inputColor, myOnPress} = this.props;
    return (
      <Button
        onPress={myOnPress}
        style={{
          backgroundColor: inputColor,
          flexDirection: 'column',
          borderRadius: 10,
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          aspectRatio: 1,
        }}>
        <Image source={inputImage} style={{width: 40, height: 40}} />
        <View style={{height: 20}} />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            paddingTop: 80,
          }}>
          {inputText}
        </Text>
      </Button>
    );
  }
}
