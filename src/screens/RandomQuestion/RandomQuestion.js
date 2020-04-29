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
import CustomMultiSelect from '../../components/MultipleSelectExam';
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
import CountDown from '../../components/CountDownTimer';
import {navigateClearStack} from '../../utils/NavigationUtils';
import {generateRandomArray} from '../../utils/RandomQuestionUtils';

const titleText = 'Đề ngẫu nhiên';

// Để lấy được kích thước của màn hình hiển thị
const {width} = Dimensions.get('window');
// Hình theo tỉ lệ 16/9 (16div9)
const imageWidth = width - 10;
const imageHeight = imageWidth / (16 / 9);
const popupMenuWidth = width / 4;

class RandomQuestion extends Component {
  constructor(props) {
    super(props);
    // Lấy data từ navigation với key = listIndexQuestionInput
    // Nếu không tìm thấy data với key listIndexQuestionInput => trả default = null
    const inputListFromNavigation = this.props.navigation.getParam(
      'listIndexQuestionInput',
      null,
    );
    const initQuestionList =
      inputListFromNavigation === null
        ? generateRandomArray(listQuestion, 30)
        : this._getQuestionListFromListIndex(inputListFromNavigation);
    this.state = {
      questionList: initQuestionList,
      questionNumber: 0,
    };
    this._functionIsCheckFromMultiSelect = this._functionIsCheckFromMultiSelect.bind(
      this,
    );
    this._setAnswerList = this._setAnswerList.bind(this);
    this._goToResultScreen = this._goToResultScreen.bind(this);
  }

  componentDidMount() {
    this._setCurrentQuestion(this.state.questionList[0]);
  }

  _getQuestionListFromListIndex(listIndex) {
    const result = [];
    for (var i = 0; i < listIndex.length; i++) {
      result.push(listQuestion[listIndex[i]]);
    }
    return result;
  }

  _setCurrentQuestion = question => {
    this.props.setCurrentQuestion(question);
  };

  _isImageQueston = question => {
    if (question === null) {
      return false;
    }
    if (typeof question.value.image !== 'undefined') {
      return true;
    } else {
      return false;
    }
  };

  _functionIsCheckFromMultiSelect = isAnswer => {
    this.props.setShowAnswer(isAnswer);
    // this.mCustomMultiSelect._setIsCheckAnswer({isAnswer});
  };

  _menuOptionItemStyle = function(selectedColor) {
    return {
      backgroundColor: selectedColor,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 0,
    };
  };

  _questionTitle = () => {
    return `Câu hỏi ` + (this.state.questionNumber + 1).toString();
  };

  _setAnswerList = res => {
    this.props.setListChosenAsnwer(res);
  };

  _goToResultScreen = () => {
    this.props.setListQuestionResult(this.state.questionList);
    this.props.setListAnswerResult(this.props.chosenAnswerList);
    var timePassed = this.refs['CountDownTimer'].getTimePassed();
    this.props.setTimeResult(timePassed);
    console.log('QUAN123 timePassed', timePassed);
    this.refs['CountDownTimer'].stopTimer();
    console.log(
      '_goToResultScreen examGroupId',
      this.props.navigation.getParam('examGroupId', null),
    );
    navigateClearStack(
      this.props.navigation,
      'ResultScreen',
      this.props.navigation.getParam('examGroupId', null),
    );
  };

  render() {
    console.log('PictureQuestion render');
    return (
      <MenuProvider>
        <Container>
          <Header style={styles.header}>
            <Left style={{flex: 2}}>
              <Button
                transparent
                onPress={() => {
                  // console.log('chosenAnswerList', this.props.chosenAnswerList);
                  this.refs['CountDownTimer'].stopTimer();
                  this.props.navigation.goBack();
                }}>
                <Text style={styles.textHeaderFooter}>
                  {(this.state.questionNumber + 1).toString() +
                    `/` +
                    this.state.questionList.length.toString()}
                </Text>
              </Button>
            </Left>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <CountDown
                // style={{marginleft:10}}
                ref="CountDownTimer"
                until={60 * 20 + 0}
                size={20}
                onFinish={timePassed => {
                  // console.log('onFinish timePassed', timePassed);
                  Alert.alert(
                    'Thông báo',
                    'Đã hết thời gian làm bài.',
                    [
                      // {
                      //   text: 'Cancel',
                      //   onPress: () => console.log('Cancel Pressed!'),
                      // },
                      {
                        text: 'Xem kết quả',
                        onPress: () => {
                          this._goToResultScreen();
                          // this.refs['CountDownTimer'].stopTimer();
                          // navigateClearStack(
                          //   this.props.navigation,
                          //   'ResultScreen',
                          // );
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                digitStyle={{
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                digitTxtStyle={{color: 'white'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'MM', s: 'SS'}}
                showSeparator={true}
              />
            </Body>
            <Right style={{flex: 2}}>
              <Button
                transparent
                onPress={() => {
                  this._goToResultScreen();
                }}>
                <Text style={styles.textHeaderFooter}>Chấm điểm</Text>
              </Button>
            </Right>
          </Header>
          <Content contentContainerStyle={styles.content} scrollEnabled={false}>
            <Text style={styles.questionTitle}>{this._questionTitle()}</Text>
            <Text style={styles.questionContent}>
              {
                this.state.questionList[this.state.questionNumber].value
                  .question
              }
            </Text>
            {this._isImageQueston(this.props.currentQuestion) ? (
              <Image
                style={styles.questionImage}
                source={questionImages[this.props.currentQuestion.value.image]}
              />
            ) : (
              <View />
            )}
            <ScrollView alwaysBounceVertical={false}>
              <CustomMultiSelect
                style={{flex: 1}}
                currentScreen="WrongAnswer"
                inputDataList={
                  this.state.questionList[this.state.questionNumber].value
                    .options
                }
                multiple={true}
                callback={res => {
                  console.log(`callback Select: `, res);
                  this._setAnswerList(res);
                }}
                rowBackgroundColor={'#eee'}
                rowHeight={40}
                rowRadius={5}
                iconColor={'#00a2dd'}
                iconSize={30}
                selectedIconName={'md-radio-button-on'}
                unselectedIconName={'md-radio-button-off'}
                labelStyle={{flex: 1, flexWrap: 'wrap', paddingStart: 10}}
                isDisabled={false}
                correctAnswer={[
                  this.state.questionList[this.state.questionNumber].value
                    .answer,
                ]}
                // selected={
                //   this.state.questionList[this.state.questionNumber].value
                //     .answer
                // }
              />
            </ScrollView>
          </Content>
          <Footer style={styles.footer}>
            <Left style={{flex: 1}}>
              <Button
                style={{paddingLeft: 10}}
                transparent
                onPress={() => {
                  this._functionIsCheckFromMultiSelect(false);
                  this.setState(prev => {
                    const prevQuestionNumber =
                      prev.questionNumber === 0 ? 0 : prev.questionNumber - 1;
                    this._setCurrentQuestion(
                      this.state.questionList[prevQuestionNumber],
                    );
                    return {
                      questionList: prev.questionList,
                      questionNumber: prevQuestionNumber,
                    };
                  });
                }}>
                <Image source={appIcons.arrowLeft} style={styles.footerIcon} />
              </Button>
            </Left>
            <Body
              style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                transparent
                onPress={() => {
                  console.log('Dap An OnPress');
                  this._functionIsCheckFromMultiSelect(true);
                }}>
                <Text style={styles.textHeaderFooter}>Đáp án</Text>
              </Button>
            </Body>
            <Right style={{flex: 1}}>
              <Button
                style={{paddingRight: 10}}
                transparent
                onPress={() => {
                  this._functionIsCheckFromMultiSelect(false);
                  this.setState(prev => {
                    const nextQuestionNumber =
                      prev.questionNumber >= this.state.questionList.length - 1
                        ? this.state.questionList.length - 1
                        : prev.questionNumber + 1;
                    this._setCurrentQuestion(
                      this.state.questionList[nextQuestionNumber],
                    );
                    return {
                      questionList: prev.questionList,
                      questionNumber: nextQuestionNumber,
                    };
                  });
                }}>
                <Image source={appIcons.arrowRight} style={styles.footerIcon} />
              </Button>
            </Right>
          </Footer>
        </Container>
      </MenuProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuestion: state.ExamQuestionReducer.currentQuestion,
    chosenAnswerList: state.ExamQuestionReducer.chosenAnswerList,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RandomQuestion);

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
    paddingTop: 10,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    paddingLeft: 10,
    paddingEnd: 10,
  },
  questionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'black',
  },
  questionContent: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#4586ba',
    marginTop: 10,
  },
  questionImage: {
    marginTop: 10,
    alignSelf: 'center',
    width: imageWidth,
    height: imageHeight,
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
  footerIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  menuOptions: {
    width: popupMenuWidth,
    height: 350,
    marginTop: 25,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 10,
  },
  textHeaderFooter: {
    color: 'white',
    fontSize: 20,
  },
});
