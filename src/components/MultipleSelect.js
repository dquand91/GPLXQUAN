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

class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      selected: [],
    };
  }
  componentDidMount = () => {
    const {selected, currentScreen, isDisabled} = this.props;
    if (isDisabled) {
      if (currentScreen === 'PictureQuestion') {
        this._onSelect(this.props.currentPictureQuestion);
      } else if (currentScreen === 'AllQuestion') {
        this._onSelect(this.props.currentAllQuestion);
      } else if (currentScreen === 'WrongAnswer') {
        this._onSelect(this.props.currentWrongAnswer);
      }
      return;
    }
    if (typeof selected === 'object') {
      selected.map(select => {
        this._onSelect(select);
      });
    } else {
      this._onSelect(selected);
    }
  };

  getNewDimensions(event) {
    var pageHeight = event.nativeEvent.layout.height;
    var pageWidth = event.nativeEvent.layout.width;
    this.setState({
      pageHeight,
      pageWidth,
    });
  }

  _onSelect = item => {
    var selected = this.state.selected;
    if (this.props.isDisabled) {
      selected.push(item.value.answer);
      this.setState({
        selected: selected,
      });
      this.props.callback(selected);
      return;
    }
    if (this.props.multiple) {
      // Chọn
      // Nếu item đã chọn là item mới (chưa tồn tại trong list selected)
      if (selected.indexOf(item) === -1) {
        selected.push(item);
        this.setState({
          selected: selected,
        });
      } else {
        // Bỏ chọn
        // Nếu item đã chọn đã tồn tại trong list selected
        // Hàm filter để lọc bỏ cái item đã chọn ra khỏi list selected
        selected = selected.filter(i => i !== item);
        this.setState({
          selected: selected,
        });
      }
    } else {
      if (selected.indexOf(item) === -1) {
        selected = [item];
        this.setState({
          selected: selected,
        });
      } else {
        selected = [];
        this.setState({
          selected: selected,
        });
      }
    }
    this.props.callback(selected);
  };

  _isSelected = item => {
    var selected = this.state.selected;
    if (this.props.isDisabled) {
      if (this.props.currentScreen === 'PictureQuestion') {
        return item === this.props.currentPictureQuestion.value.answer
          ? true
          : false;
      } else if (this.props.currentScreen === 'AllQuestion') {
        return item === this.props.currentAllQuestion.value.answer
          ? true
          : false;
      } else {
        return item === this.props.currentWrongAnswer.value.answer
          ? true
          : false;
      }
    }
    if (selected.indexOf(item) === -1) {
      return false;
    }
    return true;
  };

  _renderSelectedView = (item, index) => {
    const {
      selectedIconName,
      iconColor,
      iconSize,
      selectedIconStyle,
      labelStyle,
    } = this.props;
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
              fontWeight: 'bold',
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

  render() {
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
              disabled={this.props.isDisabled}
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
              {this._isSelected(item)
                ? this._renderSelectedView(item, index)
                : this._renderUnSelectView(item, index)}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

let mapStateToProps = state => ({
  currentPictureQuestion: state.PictureQuestionReducer.currentQuestion,
  currentAllQuestion: state.AllQuestionReducer.currentQuestion,
  currentWrongAnswer: state.WrongAnswerReducer.currentQuestion,
});

export default connect(mapStateToProps)(MultipleSelect);
