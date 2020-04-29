/* eslint-disable react-native/no-inline-styles */
import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class MultipleSelectExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      selected: [
        // {
        //   id: '',
        //   value: [],
        // },
      ],
      // correctAnswer: [],
    };
  }
  componentDidMount = () => {
    const {selected} = this.state;
    // console.log('componentDidMount selected ', selected);
    if (selected.length > 0) {
      if (Array.isArray(selected[0].value)) {
        selected[0].value.map(select => {
          this._onSelect(select);
        });
      } else {
        this._onSelect(selected[0].value);
      }
    }
  };

  getNewDimensions(event) {
    var pageHeight = event.nativeEvent.layout.height;
    var pageWidth = event.nativeEvent.layout.width;
    this.setState({
      ...this.state,
      pageHeight,
      pageWidth,
    });
  }

  _updateStateSelected = (prev, currentQuestion, currentSelectedValue) => {
    var isNewQuestion = true;
    var result = prev.selected.map(obj => {
      if (obj.id === currentQuestion.id) {
        isNewQuestion = false;
        return Object.assign(obj, {value: currentSelectedValue});
      } else {
        return obj;
      }
    });
    if (isNewQuestion) {
      var newSelected = {
        id: currentQuestion.id,
        value: currentSelectedValue,
      };
      result.push(newSelected);
    }
    return result;
  };

  _onSelect = item => {
    var currentQuestion = this.props.currentExamQuestion;
    var selected = this.state.selected;
    var currentSelectedValue = [];
    // console.log('_onSelect currenQuestion', currentQuestion);
    // console.log('_onSelect selected', selected);
    for (var i = 0; i < selected.length; i++) {
      // console.log('_onSelect selected[i].id', selected[i].id);
      // console.log('_onSelect currenQuestion.id', currentQuestion.id);
      if (selected[i].id === currentQuestion.id) {
        currentSelectedValue = selected[i].value;
        break;
      }
    }
    if (this.props.multiple) {
      // Chọn
      // Nếu item đã chọn là item mới (chưa tồn tại trong list selected)
      if (currentSelectedValue.indexOf(item) === -1) {
        currentSelectedValue.push(item);
        this.setState(
          prev => ({
            ...this.state,
            selected: this._updateStateSelected(
              prev,
              currentQuestion,
              currentSelectedValue,
            ),
          }),
          () => {
            this.props.callback(this.state.selected);
          },
        );
      } else {
        // Bỏ chọn
        // Nếu item đã chọn đã tồn tại trong list selected
        // Hàm filter để lọc bỏ cái item đã chọn ra khỏi list selected
        currentSelectedValue = currentSelectedValue.filter(i => i !== item);
        this.setState(
          prev => ({
            ...this.state,
            selected: this._updateStateSelected(
              prev,
              currentQuestion,
              currentSelectedValue,
            ),
          }),
          () => {
            this.props.callback(this.state.selected);
          },
        );
      }
    } else {
      if (currentSelectedValue.indexOf(item) === -1) {
        currentSelectedValue = [item];
        this.setState(
          prev => ({
            ...this.state,
            selected: this._updateStateSelected(
              prev,
              currentQuestion,
              currentSelectedValue,
            ),
          }),
          () => {
            this.props.callback(this.state.selected);
          },
        );
      } else {
        currentSelectedValue = [];
        this.setState(
          prev => ({
            ...this.state,
            selected: this._updateStateSelected(
              prev,
              currentQuestion,
              currentSelectedValue,
            ),
          }),
          () => {
            this.props.callback(this.state.selected);
          },
        );
      }
    }
  };

  _isSelected = item => {
    for (var i = 0; i < this.state.selected.length; i++) {
      // console.log('this.state.selected[i]', this.state.selected[i]);
      // console.log(
      //   'this.props.currentExamQuestion',
      //   this.props.currentExamQuestion,
      // );
      if (
        this.state.selected[i] !== null &&
        this.props.currentExamQuestion !== null &&
        this.state.selected[i].id === this.props.currentExamQuestion.id
      ) {
        var currentQuestionValue = this.state.selected[i].value;
        if (currentQuestionValue.indexOf(item) === -1) {
          return false;
        }
        return true;
      }
    }
    // console.log('_isSelected return FALSE');
    return false;
  };

  _textColor = (item, isSlected) => {
    // console.log('_textColor this.props.isShowAnswer ', this.props.isShowAnswer);
    if (this.props.isShowAnswer) {
      // console.log('_textColor selected', this.state.selected);
      // console.log(
      //   '_textColor currentExamQuestion',
      //   this.props.currentExamQuestion,
      // );
      // console.log('_textColor item', item);
      // console.log('_textColor isSlected', isSlected);
      // console.log('==================');
      if (this.props.currentExamQuestion.value.answer === item) {
        return 'blue';
      } else {
        if (isSlected) {
          return 'red';
        } else {
          return 'black';
        }
      }
    } else {
      return 'black';
    }
  };

  _renderSelectedView = (item, index) => {
    const {
      selectedIconName,
      iconColor,
      iconSize,
      selectedIconStyle,
      labelStyle,
    } = this.props;
    const textColor = this._textColor(item, true);
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={selectedIconName}
          style={[
            {
              color: iconColor,
              fontSize: iconSize,
            },
            selectedIconStyle,
          ]}
        />
        <Text
          style={[
            {
              color: textColor,
              justifyContent: 'center',
            },
            labelStyle,
          ]}>
          {`${index + 1}- ${item}`}
        </Text>
      </View>
    );
  };

  _renderUnSelectView = (item, index) => {
    const {
      unselectedIconName,
      iconColor,
      iconSize,
      unselectedIconStyle,
      labelStyle,
    } = this.props;
    const textColor = this._textColor(item, false);
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={unselectedIconName}
          style={[
            {
              color: iconColor,
              fontSize: iconSize,
            },
            unselectedIconStyle,
          ]}
        />
        <Text
          style={[
            {
              color: textColor,
              fontWeight: 'normal',
              justifyContent: 'center',
            },
            labelStyle,
          ]}>
          {`${index + 1}- ${item}`}
        </Text>
      </View>
    );
  };

  _renderNoAnswer = (item, index) => {
    if (this._isSelected(item)) {
      return this._renderSelectedView(item, index);
    } else {
      return this._renderUnSelectView(item, index);
    }
  };

  render() {
    console.log('MultipleSelectExam render() selected', this.state.selected);
    const {inputDataList} = this.props;
    const listData = inputDataList;

    return (
      <View
        onLayout={evt => {
          this.getNewDimensions(evt);
        }}>
        {listData.map((item, index) => {
          return (
            <TouchableOpacity
              key={Math.round(Math.random() * 1000000)}
              style={[
                {
                  flex: 1,
                  padding: 7,
                  marginTop: 0,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: 6,
                  backgroundColor: this.props.rowBackgroundColor,
                  //   height: this.props.rowHeight,
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: this.props.rowRadius,
                },
                this.props.itemStyle,
              ]}
              onPress={() => {
                this._onSelect(item);
              }}>
              {this._renderNoAnswer(item, index)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

let mapStateToProps = state => ({
  currentExamQuestion: state.ExamQuestionReducer.currentQuestion,
  isShowAnswer: state.ExamQuestionReducer.showAnswer,
  listChosenAnswer: state.ExamQuestionReducer.chosenAnswerList,
});

export default connect(mapStateToProps)(MultipleSelectExam);
