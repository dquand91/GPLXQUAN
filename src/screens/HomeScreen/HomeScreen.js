/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';

import ButtonHome from '../../components/ButtonHome';
import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Button,
  Content,
} from 'native-base';
import {appIcons} from '../../utils/ImagesAsset';
import api from '../../data/network';
import Logger from '../../utils/Logger';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _convertDataResponseToArray = dataInput => {
    let myData = dataInput;
    let allKey = Object.keys(myData);
    let listQuestion = allKey.map((entry, index) => {
      return {id: entry, value: Object.values(myData)[index]};
    });
    let resultList = [];
    for (let i = listQuestion.length - 1; i >= 0; i--) {
      resultList.push(listQuestion[i]);
    }
    console.log('BEFORE LIST listQuestion = ', listQuestion);
    console.log('AFTER resultList = ', resultList);
    return resultList;
  };

  _getAllQuestionAPI = () => {
    api.myAppApi.getAllQuestionList().then(responseData => {
      console.log('QUAN responseData = ', responseData);
      let dataOutput = this._convertDataResponseToArray(responseData);
      console.log('listQuestion = ', dataOutput);
      Logger.log(`responseData = ${responseData}`);
    });
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => {
                this._getAllQuestionAPI();
                // console.log('chosenAnswerList', this.props.chosenAnswerList);
              }}>
              <Text style={styles.textHeaderFooter}>GetAPI</Text>
            </Button>
          </Left>
          <Body style={{flex: 3, alignItems: 'center'}}>
            <Title style={{color: 'white'}}>100 câu điểm liệt</Title>
          </Body>
          <Right style={{flex: 1}} />
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <ButtonHome
              inputImage={appIcons.randomQuestion}
              inputText={'Đề ngẫu nhiên'}
              inputColor="#ffa100"
              myNavigation={this.props.navigation}
              navigateScreenName={'RandomQuestion'}
              myOnPress={() => {
                this.props.navigation.navigate('RandomQuestion');
              }}
            />

            <View style={{width: 20}} />

            <ButtonHome
              inputImage={appIcons.exam}
              inputText="Thi theo bộ đề"
              inputColor="#ff3333"
              myOnPress={() => {
                this.props.navigation.navigate('Exam');
              }}
            />
          </View>

          {/* ====================== */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: 20,
            }}>
            <ButtonHome
              inputImage={appIcons.wrongAnswer}
              inputText="Xem câu bị sai"
              inputColor="#63da38"
              myOnPress={() => {
                this.props.navigation.navigate('WrongAnswer');
              }}
            />
            <View style={{width: 20}} />
            <ButtonHome
              inputImage={appIcons.review}
              inputText="Ôn tập câu hỏi"
              inputColor="#33bac0"
              myOnPress={() => {
                this.props.navigation.navigate('Review');
              }}
            />
          </View>
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
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});
