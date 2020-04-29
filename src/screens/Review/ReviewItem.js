/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {ListItem, Left, Right, Text, Icon} from 'native-base';
// import flatListData from '../data/flatListData';
import {appIcons} from '../../utils/ImagesAsset';

export default class ReviewItem extends Component {
  render() {
    // console.log(
    //   `Title = ${this.props.itemTitle}, index = ${this.props.itemContent}`,
    // );
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            maxHeight: 50,
          }}>
          <View
            style={{
              flex: 9,
              flexDirection: 'column',
            }}>
            <Text style={styles.flatListItem}>{this.props.itemTitle}</Text>
            <Text style={styles.flatListItem}>{this.props.itemContent}</Text>
          </View>
          <Image
            source={appIcons.arrowRight}
            style={{flex: 1, width: 20, height: 20, alignSelf: 'center'}}
          />
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            marginTop: 5,
            marginBottom: 10,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'black',
    fontSize: 18,
  },
});
