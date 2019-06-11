import React, { Component } from 'react';
import { Picker, StyleSheet, Modal } from 'react-native';

export default class AnimatedPicker extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <Picker
          selectedValue={this.props.value}
          // style={{ height: 50, width: 100 }}
          onValueChange={this.props.onChange}
        >
          {this.props.data.map(({ label, value }) => (
            <Picker.Item label={label} value={value} />
          ))}
        </Picker>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  
})