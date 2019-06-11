import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import CheckInForm from './CheckInForm'
import Button from './Button';

var sharedProps = {
  apiKey: "28D8905E-C8E3-4F60-8041-8A93D2317145",
};

var InitialScene = require('./scene');

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps: sharedProps,
      modalVisible: false,
    }
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false })

    // Maybe? run animation once
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <CheckInForm closeModal={this.onCloseModal}/>
        </Modal>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: InitialScene}}
        />
        <View style={styles.buttonWrapper}>
          <Button
            title="Registra tu visita"
            onPress={() => this.setState({ modalVisible: true })}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: "#ffffff",
    paddingBottom: 20,
    textAlign: 'center',
    fontFamily: 'Segoe UI'
  }
});

module.exports = ViroSample
