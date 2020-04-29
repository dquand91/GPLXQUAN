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
import CustomMultiSelect from '../../components/MultipleSelect';
import {listQuestion} from '../../data/QuestionList';
import {connect} from 'react-redux';
import {setCurrentWrongQuestion} from '../../redux/wrongAnswers/actions';

const titleText = 'Xem câu bị sai';

// Để lấy được kích thước của màn hình hiển thị
const {width} = Dimensions.get('window');
// Hình theo tỉ lệ 16/9 (16div9)
const imageWidth = width - 10;
const imageHeight = imageWidth / (16 / 9);
const popupMenuWidth = width / 4;

const wrongQuestionList = listQuestion.filter((item, index) => {
  return index >= 70;
});

const randomIndex = (min, max) => {
  // return parseInt(min + Math.random() * (max - min));
  // Max + 1: vì nếu ko + 1 thì rất khó để random ra được Max.
  var result = parseInt(min + Math.random() * (max + 1 - min));
  if (result >= max) {
    result = max;
  }
  return result;
};

const randomArray10Items = inputArray => {
  let result = [];
  for (let i = 0; i < 10; i++){
    result.push(inputArray[randomIndex(0, inputArray.length - 1)]);
  }
  return result;
};

class WrongAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: randomArray10Items(listQuestion),
      questionNumber: 0,
    };
    this._setCurrentQuestion(this.state.questionList[0]);
  }

  _setCurrentQuestion = question => {
    this.props.setCurrentQuestion(question);
  };

  _isImageQueston = question => {
    console.log('_isImageQueston question', question);
    if (question === null) {
      return false;
    }
    if (typeof question.value.image !== 'undefined') {
      return true;
    } else {
      return false;
    }
  };

  _menuOptionItemStyle = function(selectedColor) {
    return {
      backgroundColor: selectedColor,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 0,
    };
  };

  render() {
    console.log(
      'WrongQuestion render currentQuestion',
      this.props.currentQuestion,
    );
    return (
      <MenuProvider>
        <Container>
          <Header style={styles.header}>
            <Left style={{flex: 1}}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image source={appIcons.arrowLeft} style={styles.leftIcon} />
              </Button>
            </Left>
            <Body style={{flex: 3, alignItems: 'center'}}>
              <Title style={{color: 'white'}}>{titleText}</Title>
            </Body>
            <Right style={{flex: 1}}>
              <Menu>
                <MenuTrigger>
                  <Image source={appIcons.popup} style={styles.rightIcon} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                  <FlatList
                    data={this.state.questionList}
                    renderItem={({item, index}) =>
                      this.state.questionNumber === index ? (
                        <MenuOption
                          style={this._menuOptionItemStyle('gray')}
                          onSelect={value => {
                            this.setState(prev => {
                              const nextQuestionNumber = index;
                              this._setCurrentQuestion(
                                this.state.questionList[index],
                              );
                              return {
                                questionList: prev.questionList,
                                questionNumber: nextQuestionNumber,
                              };
                            });
                          }}>
                          <Text style={{color: 'black'}}>{item.id}</Text>
                          <View style={styles.divider} />
                        </MenuOption>
                      ) : (
                        <MenuOption
                          style={this._menuOptionItemStyle('')}
                          onSelect={value => {
                            this.setState(prev => {
                              const nextQuestionNumber = index;
                              this._setCurrentQuestion(
                                this.state.questionList[index],
                              );
                              return {
                                questionList: prev.questionList,
                                questionNumber: nextQuestionNumber,
                              };
                            });
                          }}>
                          <Text style={{color: 'black'}}>{item.id}</Text>
                          <View style={styles.divider} />
                        </MenuOption>
                      )
                    }
                    keyExtractor={item => item.id.toString()}
                  />
                </MenuOptions>
              </Menu>
            </Right>
          </Header>
          <Content contentContainerStyle={styles.content} scrollEnabled={false}>
            <Text style={styles.questionTitle}>
              {this.state.questionList[this.state.questionNumber].id}
            </Text>
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
                  console.log(`callback Select: ${res}`);
                }}
                rowBackgroundColor={'#eee'}
                rowHeight={40}
                rowRadius={5}
                iconColor={'#00a2dd'}
                iconSize={30}
                selectedIconName={'md-radio-button-on'}
                unselectedIconName={'md-radio-button-off'}
                labelStyle={{flex: 1, flexWrap: 'wrap', paddingStart: 10}}
                isDisabled={true}
                selected={
                  this.state.questionList[this.state.questionNumber].value
                    .answer
                }
              />
            </ScrollView>
          </Content>
          <Footer style={styles.footer}>
            <Left style={{flex: 1}}>
              <Button
                style={{paddingLeft: 10}}
                transparent
                onPress={() => {
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
              <Title style={{color: 'white'}}>
                {(this.state.questionNumber + 1).toString() +
                  `/` +
                  this.state.questionList.length.toString()}
              </Title>
            </Body>
            <Right style={{flex: 1}}>
              <Button
                style={{paddingRight: 10}}
                transparent
                onPress={() => {
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
    currentQuestion: state.WrongAnswerReducer.currentQuestion,
  };
}

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: question => dispatch(setCurrentWrongQuestion(question)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrongAnswer);

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
});
