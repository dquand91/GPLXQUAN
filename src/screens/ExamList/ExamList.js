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

import ButtonHome from '../../components/ButtonHome';
import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Content,
  Button,
} from 'native-base';

import {appIcons, questionImages} from '../../utils/ImagesAsset';
import {listQuestion} from '../../data/QuestionList';
import {connect} from 'react-redux';
import {
  setList8GroupExam,
  setFinishExam,
  refreshFinishExam,
} from '../../redux/examList/actions';
import {navigateClearStack, goToScreen} from '../../utils/NavigationUtils';
import {randomIndexFor8GroupOfExam} from '../../utils/RandomQuestionUtils';
import ItemExam from './ItemExam';

const titleText = 'Thi theo bộ đề';
var screenWidth = Dimensions.get('window').width;

class ExamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list8GroupOfExam: [],
    };
  }

  componentDidMount() {
    console.log(
      '************componentDidMount list8GroupExamRedux',
      this.props.list8GroupExamRedux,
    );
    if (
      typeof this.props.list8GroupExamRedux === 'undefined' ||
      this.props.list8GroupExamRedux === null ||
      this.props.list8GroupExamRedux.length === 0
    ) {
      this.props.setList8GroupExam(randomIndexFor8GroupOfExam());
    }
    // this.setState({list8GroupExam: this.props.list8GroupExamRedux});
  }

  render() {
    // console.log('@@@@@@@@ KetQua @@@@', randomIndexFor8GroupOfExam());
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => {
                // this._clearAllState();
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
                this.props.refreshFinishExam();
                // this.setState(prevState => ({
                //   list8GroupOfExam: prevState.list8GroupOfExam.map(obj =>
                //     Object.assign(obj, {isFinish: false}),
                //   ),
                // }));
              }}>
              <Image source={appIcons.refresh} style={styles.rightIcon} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <FlatList
            data={this.props.list8GroupExamRedux}
            renderItem={({item, index}) => {
              return (
                <ItemExam
                  text={item.title}
                  isFinish={item.isFinish}
                  correctAnswer={item.correctList.length}
                  wrongAnswer={30 - item.correctList.length}
                  itemWidth={(screenWidth - 100) / 2}
                  onPress={() => {
                    console.log('Clicked Index', index);
                    this.props.setFinishExam(item, true);
                    // truyền danh sách index qua cho màn hình RandomQuestion
                    // với key là listIndexQuestionInput
                    this.props.navigation.navigate('RandomQuestion', {
                      listIndexQuestionInput: item.indexQuestionList,
                      examGroupId: item.id,
                    });
                  }}
                />
              );
            }}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    // time: state.ResultReducer.time,
    // listAnswer: state.ResultReducer.listAnswer,
    // listQuestion: state.ResultReducer.listQuestion,
    list8GroupExamRedux: state.ExamListReducer.list8GroupExam,
  };
}

const mapDispatchToProps = dispatch => ({
  setList8GroupExam: list8GroupExam =>
    dispatch(setList8GroupExam(list8GroupExam)),
  setFinishExam: (item, isFinish) => dispatch(setFinishExam(item, isFinish)),
  refreshFinishExam: () => dispatch(refreshFinishExam()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamList);

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
    alignItems: 'center',
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
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
