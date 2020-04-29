/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

export default class MyResultButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {image, imageColor, text, textColor, inputStyle} = this.props;
    return (
      <View
        style={[
          inputStyle,
          {
            backgroundColor: 'transparent',
            flexDirection: 'row',
            //   flex: 1,
            //   justifyContent: 'center',
            alignSelf: 'center',
          },
        ]}>
        <Image
          source={image}
          style={{width: 18, height: 18, tintColor: imageColor}}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: textColor,
            marginLeft: 5,
          }}>
          {text}
        </Text>
      </View>
    );
  }
}
