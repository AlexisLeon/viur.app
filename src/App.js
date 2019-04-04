import React, { Component } from 'react';
import {
  View,
  Button,
  Modal,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';
import CheckInForm from './CheckInForm';

var sharedProps = {
  apiKey: "28D8905E-C8E3-4F60-8041-8A93D2317145",
}

var InitialScene = require('./scene');

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps: sharedProps,
      modalVisible: false,
    }

    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  showForm() {
    this.setState({
      modalVisible: true,
    })
  }

  closeForm() {
    this.setState({
      modalVisible: false,
    })
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeForm}>
          <CheckInForm onSuccess={() => this.closeForm()}/>
        </Modal>
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialScene}} />
        <View style={styles.buttonWrapper}>
          <Button
            title="Registro"
            style={styles.button}
            color="#FFFFFF"
            onPress={this.showForm}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    backgroundColor: '#5FCEE7',
    borderRadius: 99,
    paddingVertical: 8,
  },
  button: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: 'bold'
  }
});

module.exports = ViroSample
