import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Text, TouchableOpacity, AppState} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

const DEFAULT_DIGIT_STYLE = {backgroundColor: '#FAB913'};
const DEFAULT_DIGIT_TXT_STYLE = {color: '#000'};
const DEFAULT_TIME_LABEL_STYLE = {color: '#000'};
const DEFAULT_SEPARATOR_STYLE = {color: '#000'};
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];
const DEFAULT_TIME_LABELS = {
  d: 'Days',
  h: 'Hours',
  m: 'Minutes',
  s: 'Seconds',
};

class CountDown extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    digitStyle: PropTypes.object,
    digitTxtStyle: PropTypes.object,
    timeLabelStyle: PropTypes.object,
    separatorStyle: PropTypes.object,
    timeToShow: PropTypes.array,
    showSeparator: PropTypes.bool,
    size: PropTypes.number,
    until: PropTypes.number,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    onFinish: PropTypes.func,
  };

  state = {
    until: Math.max(this.props.until, 0),
    lastUntil: null,
    wentBackgroundAt: null,
    timePassed: 0,
  };

  constructor(props) {
    super(props);
    this.timer = setInterval(this.updateTimer, 1000);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this.stopTimer();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(this.updateTimer, 1000);
  }

  restartTimer() {
    this.setState({
      lastUntil: 0,
      until: Math.max(this.props.until, 0),
      timePassed: 0,
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(this.updateTimer, 1000);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(
    //   'QUAN componentWillReceiveProps componentWillReceiveProps',
    //   nextProps,
    // );
    if (
      this.props.until !== nextProps.until ||
      this.props.id !== nextProps.id
    ) {
      this.setState({
        lastUntil: this.state.until,
        until: Math.max(nextProps.until, 0),
      });
    }
  }

  _handleAppStateChange = currentAppState => {
    const {until, wentBackgroundAt} = this.state;
    if (
      currentAppState === 'active' &&
      wentBackgroundAt &&
      this.props.running
    ) {
      const diff = (Date.now() - wentBackgroundAt) / 1000.0;
      this.setState(prev => ({
        lastUntil: until,
        until: Math.max(0, until - diff),
        timePassed: prev.timePassed + diff,
      }));
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  };

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  getTimePassed() {
    return this.state.timePassed;
  }

  updateTimer = () => {
    // Không nên khai báo kiểu const như bên dưới, vì state ở đây sẽ thay đổi thường xuyên
    // nên nếu dùng như bên dưới nó sẽ cố định state của mình lại
    // const {lastUntil, until} = this.state;
    // console.log('CountDownTimer updateTimer lastUntil', this.state.lastUntil);
    // console.log('CountDownTimer updateTimer until', this.state.until);
    // console.log('CountDownTimer updateTimer running', this.props.running);
    // console.log('CountDownTimer -------------------');
    if (this.state.lastUntil === this.state.until || !this.props.running) {
      return;
    }
    if (
      this.state.until === 1 ||
      (this.state.until === 0 && this.state.lastUntil !== 1)
    ) {
      if (this.props.onFinish) {
        this.props.onFinish(this.state.timePassed);
      }
      if (this.props.onChange) {
        this.props.onChange(this.state.until);
      }
    }

    if (this.state.until === 0) {
      // this.restartTimer();
    } else {
      if (this.props.onChange) {
        this.props.onChange(this.state.until);
      }
      this.setState(prev => ({
        lastUntil: this.state.until,
        until: Math.max(0, this.state.until - 1),
        timePassed: prev.timePassed + 1,
      }));
    }
  };

  renderDigit = d => {
    const {digitStyle, digitTxtStyle, size} = this.props;
    return (
      <View
        style={[
          styles.digitCont,
          digitStyle,
          {width: size * 1.5, height: size},
        ]}>
        <Text style={[styles.digitTxt, {fontSize: size}, digitTxtStyle]}>
          {d}
        </Text>
      </View>
    );
  };

  renderDoubleDigits = digits => {
    return (
      <View style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>{this.renderDigit(digits)}</View>
      </View>
    );
  };

  renderSeparator = () => {
    const {digitTxtStyle, size} = this.props;
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.digitTxt, {fontSize: size}, digitTxtStyle]}>
          {':'}
        </Text>
      </View>
    );
  };

  renderCountDown = () => {
    const {timeToShow, timeLabels, showSeparator} = this.props;
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf(
      '%02d:%02d:%02d:%02d',
      days,
      hours,
      minutes,
      seconds,
    ).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    return (
      <Component style={styles.timeCont} onPress={this.props.onPress}>
        {/* {timeToShow.includes('D')
          ? this.renderDoubleDigits(timeLabels.d, newTime[0])
          : null}
        {showSeparator && timeToShow.includes('D') && timeToShow.includes('H')
          ? this.renderSeparator()
          : null}
        {timeToShow.includes('H')
          ? this.renderDoubleDigits(timeLabels.h, newTime[1])
          : null}
        {showSeparator && timeToShow.includes('H') && timeToShow.includes('M')
          ? this.renderSeparator()
          : null} */}
        {timeToShow.includes('M') ? this.renderDoubleDigits(newTime[2]) : null}
        {showSeparator && timeToShow.includes('M') && timeToShow.includes('S')
          ? this.renderSeparator()
          : null}
        {timeToShow.includes('S') ? this.renderDoubleDigits(newTime[3]) : null}
      </Component>
    );
  };

  render() {
    return <View style={this.props.style}>{this.renderCountDown()}</View>;
  }
}

CountDown.defaultProps = {
  digitStyle: DEFAULT_DIGIT_STYLE,
  digitTxtStyle: DEFAULT_DIGIT_TXT_STYLE,
  timeLabelStyle: DEFAULT_TIME_LABEL_STYLE,
  timeLabels: DEFAULT_TIME_LABELS,
  separatorStyle: DEFAULT_SEPARATOR_STYLE,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  showSeparator: false,
  until: 0,
  size: 15,
  running: true,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  separatorTxt: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
});

export default CountDown;
export {CountDown};
