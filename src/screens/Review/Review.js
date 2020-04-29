/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Platform, Text, Image, FlatList, TouchableOpacity} from 'react-native';

import ReviewItem from './ReviewItem';
import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Content,
  Button,
  List,
  ListItem,
  Icon,
} from 'native-base';
import {appIcons} from '../../utils/ImagesAsset';

const textReview = 'Ôn tập câu hỏi';

const dataTest = [
  {id: 0, title: 'Toàn bộ câu hỏi', content: '100 câu hỏi'},
  {id: 1, title: 'Câu hỏi sa hình', content: '30 câu hỏi'},
];

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewListData: dataTest,
    };
  }
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={appIcons.home} style={styles.leftIcon} />
            </Button>
          </Left>
          <Body style={{flex: 3, alignItems: 'center'}}>
            <Title style={{color: 'white'}}>{textReview}</Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        <Content style={{flex: 1}} contentContainerStyle={styles.content}>
          <FlatList
            data={dataTest}
            renderItem={({item, index}) => {
              console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.id === 1) {
                      console.log('Press PictureQuestion');
                      this.props.navigation.navigate('PictureQuestion');
                    } else {
                      console.log('Press AllQuestion');
                      this.props.navigation.navigate('AllQuestion');
                    }
                  }}>
                  <ReviewItem
                    itemTitle={item.title}
                    itemContent={item.content}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 60 : 70,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: '#5897cc',
  },
  content: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: 'white',
    paddingTop: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  leftIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
});
