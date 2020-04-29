/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';

export default class ItemResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {image, imageColor, text, inputStyle} = this.props;
    return (
      <View
        style={[
          inputStyle,
          {
            backgroundColor: '#efefef',
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            aspectRatio: 1,
            paddingTop: 15,
            paddingBottom: 15,
          },
        ]}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: 'black',
            alignSelf: 'center',
          }}>
          {text}
        </Text>
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            tintColor: imageColor,
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
      </View>
    );
  }
}
