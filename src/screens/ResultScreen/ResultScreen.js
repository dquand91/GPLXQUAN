/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Image,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';

import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Content,
  Button,
  Footer,
} from 'native-base';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {appIcons, questionImages} from '../../utils/ImagesAsset';
import {listQuestion} from '../../data/QuestionList';
import {connect} from 'react-redux';
import {
  setCurrentExamQuestion,
  setShowAnswer,
  setListChosenExamQuestion,
} from '../../redux/examQuestion/actions';
import {
  setListAnswerResult,
  setListQuestionResult,
  setTimeResult,
} from '../../redux/result/actions';
import {setCorrectAnswerList} from '../../redux/examList/actions';
import {navigateClearStack, goToScreen} from '../../utils/NavigationUtils';
import MyResultButton from './MyResultButton';
import ItemResult from './ItemResult';
import GridView from 'react-native-super-grid';
import {sprintf} from 'sprintf-js';

const titleText = 'Kết quả bài thi';

// Để lấy được kích thước của màn hình hiển thị
const {width} = Dimensions.get('window');
// Hình theo tỉ lệ 16/9 (16div9)
const imageWidth = width - 10;
const imageHeight = imageWidth / (16 / 9);
const popupMenuWidth = width / 4;

class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._parseTime = this._parseTime.bind(this);
    this._isPassExam = this._isPassExam.bind(this);
  }

  componentDidMount() {
    // 'data' này được truyền theo navigation từ bên ExamList => RandomQuestion => ResultScreen
    const dataNavigation = this.props.navigation.getParam('data', null);
    console.log('*********Navigation data', dataNavigation);
    const listCorrectAnswer = this._calculateNumberOfCorrectAnswer(true);
    this.props.setCorrectAnswerList(dataNavigation, listCorrectAnswer);
  }

  _calculateNumberOfCorrectAnswer(isReturnList) {
    const listAnswer = this.props.listAnswer;
    var listQuestion = this.props.listQuestion;
    console.log('_calculateNumberOfCorrectAnswer  listAnswer', listAnswer);
    console.log('_calculateNumberOfCorrectAnswer  listQuestion', listQuestion);
    var correct = [];
    for (var x = 0; x < listAnswer.length; x++) {
      for (var y = 0; y < listQuestion.length; y++) {
        if (listQuestion[y].id === listAnswer[x].id) {
          if (listAnswer[x].value.length === 1) {
            if (listAnswer[x].value[0] === listQuestion[y].value.answer) {
              correct.push(listAnswer[x].id);
              listQuestion = listQuestion.filter(
                item => item !== listQuestion[y],
              );
              break;
            }
          }
        }
      }
    }
    console.log('*********_calculateNumberOfCorrectAnswer correct', correct);
    if (isReturnList) {
      return correct;
    }
    return correct.length;
  }

  _parseTime() {
    const rawTime = this.props.time;
    const sec = rawTime % 60;
    const minute = parseInt(rawTime / 60, 10) % 60;
    const newTime = sprintf('%02d:%02d', minute, sec).split(':');
    return `${newTime[0]}:${newTime[1]}`;
  }

  _isPassExam(correctAnswer) {
    if (correctAnswer === this.props.listQuestion.length) {
      return true;
    }
    return false;
  }

  _parseQuestionTitle(index) {
    return 'Câu ' + (index + 1);
  }

  _parseQuestionIcon(item, index) {
    const {listAnswer} = this.props;
    for (var i = 0; i < listAnswer.length; i++) {
      if (listAnswer[i].id === item.id) {
        if (
          listAnswer[i].value.length === 1 &&
          listAnswer[i].value[0] === item.value.answer
        ) {
          return {
            icon: appIcons.tick,
            color: 'green',
          };
        } else {
          return {icon: appIcons.wrongAnswer, color: 'red'};
        }
      }
    }
    return {icon: appIcons.warning, color: 'orange'};
  }

  _clearAllState() {
    console.log('_clearAllState');
    this.props.setCurrentQuestion(null);
    this.props.setShowAnswer(false);
    this.props.setListChosenAsnwer([]);
    this.props.setListAnswerResult([]);
    this.props.setListQuestionResult([]);
    this.props.setTimeResult(0);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this._clearAllState();
  }

  render() {
    var correctAnswer = this._calculateNumberOfCorrectAnswer(false);
    var isPassedExam = this._isPassExam(correctAnswer);
    var totalQuestion = this.props.listQuestion.length;
    var passedTime = this._parseTime();
    var warningAnswer = totalQuestion - this.props.listAnswer.length;
    var wrongAnswer = totalQuestion - correctAnswer - warningAnswer;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => {
                this._clearAllState();
                navigateClearStack(this.props.navigation, 'Home');
              }}>
              <Image source={appIcons.home} style={styles.leftIcon} />
            </Button>
          </Left>
          <Body style={{flex: 3, alignItems: 'center'}}>
            <Title style={{color: 'white'}}>{titleText}</Title>
          </Body>
          <Right style={{flex: 1}}>
            <Button
              transparent
              onPress={() => {
                alert('Top Right button pressed');
              }}>
              <Image source={appIcons.share} style={styles.rightIcon} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <View style={styles.contentWrapper}>
            <View style={styles.contentTitle}>
              <MyResultButton
                image={appIcons.clock}
                imageColor="blue"
                text={passedTime}
                textColor="blue"
              />
              <Text
                style={[
                  styles.textNoticeResult,
                  {
                    backgroundColor: isPassedExam ? 'green' : 'pink',
                    color: isPassedExam ? 'white' : 'red',
                  },
                ]}>
                {isPassedExam ? 'Đạt' : 'Không đạt'}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  color: 'red',
                  fontSize: 20,
                }}>
                {correctAnswer + '/' + this.props.listQuestion.length}
              </Text>
            </View>
            <View style={styles.contentTitle}>
              <MyResultButton
                image={appIcons.sum}
                imageColor="black"
                text={totalQuestion}
                textColor="black"
              />
              <MyResultButton
                image={appIcons.tick}
                imageColor="green"
                text={correctAnswer}
                textColor="black"
                inputStyle={{marginLeft: 15}}
              />
              <MyResultButton
                image={appIcons.wrongAnswer}
                imageColor="red"
                text={wrongAnswer}
                textColor="black"
                inputStyle={{marginLeft: 15}}
              />
              <MyResultButton
                image={appIcons.warning}
                imageColor="orange"
                text={warningAnswer}
                textColor="black"
                inputStyle={{marginLeft: 15}}
              />
            </View>
          </View>
          <GridView
            itemDimension={80}
            items={this.props.listQuestion}
            renderItem={({item, index}) => {
              const iconImage = this._parseQuestionIcon(item, index);
              return (
                <ItemResult
                  image={iconImage.icon}
                  imageColor={iconImage.color}
                  text={this._parseQuestionTitle(index)}
                />
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.ResultReducer.time,
    listAnswer: state.ResultReducer.listAnswer,
    listQuestion: state.ResultReducer.listQuestion,
  };
}

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: question => dispatch(setCurrentExamQuestion(question)),
  setShowAnswer: isShowAnswer => dispatch(setShowAnswer(isShowAnswer)),
  setListChosenAsnwer: answer => dispatch(setListChosenExamQuestion(answer)),
  setListAnswerResult: answerList => dispatch(setListAnswerResult(answerList)),
  setListQuestionResult: questionList =>
    dispatch(setListQuestionResult(questionList)),
  setTimeResult: time => dispatch(setTimeResult(time)),
  setCorrectAnswerList: (groupExamId, listCorrectAnswer) =>
    dispatch(setCorrectAnswerList(groupExamId, listCorrectAnswer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultScreen);

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 60 : 70,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: '#5897cc',
  },
  footer: {
    height: 40,
    backgroundColor: '#4586ba',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentWrapper: {
    backgroundColor: '#efefef',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  contentTitle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  textNoticeResult: {
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: 'red',
    backgroundColor: '#eba7a5',
    fontSize: 20,
  },
  leftIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  rightIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 10,
  },
});
