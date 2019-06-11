import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from './Button';

export default ({ closeModal, newCheckin }) => (
  <View style={styles.screen}>
    <View style={styles.modal}>
      <Image source={require('./res/checkmark.png')} style={styles.checkmark} />
      <Text style={styles.title}>Gracias por registrarte, en breve te atenderemos</Text>
      <Button onPress={closeModal} title="Terminar" style={{ marginBottom: 40 }}/>
      <Button onPress={newCheckin} title="Otro registro" style={{ marginBottom: 20 }}/>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: "#000000",
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    marginBottom: 40,
  },
  checkmark: {
    width: 100,
    height: 100,
    marginBottom: 40,
  }
});
