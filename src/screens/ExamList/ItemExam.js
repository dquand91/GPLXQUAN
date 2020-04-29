/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import MyResultButton from '../ResultScreen/MyResultButton';
import {appIcons} from '../../utils/ImagesAsset';
export default class ItemExam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      text,
      inputStyle,
      isFinish,
      correctAnswer,
      wrongAnswer,
      onPress,
      itemWidth,
    } = this.props;
    if (isFinish) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View
            style={[
              inputStyle,
              {
                backgroundColor: '#ff3334',
                flexDirection: 'column',
                alignSelf: 'center',
                justifyContent: 'center',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                aspectRatio: 1,
                paddingTop: 15,
                paddingBottom: 15,
                margin: 10,
                width: itemWidth,
              },
            ]}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 17,
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {text.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#cccccc',
                height: '35%',
                width: '100%',
                bottom: 0,
                position: 'absolute',
                justifyContent: 'center',
              }}>
              <MyResultButton
                image={appIcons.tick}
                imageColor="green"
                text={correctAnswer}
                textColor="blue"
              />
              <MyResultButton
                image={appIcons.wrongAnswer}
                imageColor="red"
                text={wrongAnswer}
                textColor="red"
                inputStyle={{marginLeft: 15}}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
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
                margin: 10,
                width: itemWidth,
              },
            ]}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: 'blue',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {text.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
