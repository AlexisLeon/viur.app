import React, { Component } from 'react';
import { Animated, Keyboard, Picker as RNPicker, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const PICKER_HEIGHT = 216;
const getPosition = visible => (visible ? 0 : -PICKER_HEIGHT);

const styles = StyleSheet.create({
  picker: {
    // backgroundColor: "#000000",
    height: PICKER_HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerPosition: new Animated.Value(getPosition(props.visible)),
    };
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.visible !== this.props.visible) {
      if (nexProps.visible) Keyboard.dismiss();

      Animated.spring(
        this.state.pickerPosition,
        {
          toValue: getPosition(nexProps.visible),
          duration: 100,
          bounciness: 0,
        },
      ).start();
    }
  }

  render() {
    const {
      data,
      value: pickerValue,
      onChange,
      enabled,
      valueExtractor,
      labelExtractor,
      ...rest
    } = this.props;

    return (
      <Animated.View
        style={[styles.picker, {
          bottom: this.state.pickerPosition,
        }]}
      >
        <RNPicker
          {...rest}
          selectedValue={pickerValue}
          onValueChange={onChange}
          enabled={enabled}
        >
          {data.map((item) => {
            const itemValue = valueExtractor(item)
            const itemLabel = labelExtractor(item)
            return <Picker.Item key={itemValue} label={itemLabel} value={itemValue} />
          })}
        </RNPicker>
      </Animated.View>
    );
  }
}

Picker.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
//   date: PropTypes.instanceOf(Date),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
  })),
  value: PropTypes.any,
  labelExtractor: PropTypes.func,
  valueExtractor: PropTypes.func,
};

Picker.defaultProps = {
//   date: null,
  data: [],
  value: null,
  enabled: true,
  labelExtractor: ({label}) => label,
  valueExtractor: ({value}) => value,
};