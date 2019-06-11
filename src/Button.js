import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

export default ({title, style, ...props}) => (
  <TouchableOpacity {...props} style={[{ width: 300 }, style]}>
    <ImageBackground source={require('./res/button.png')} style={styles.component} imageStyle={{ borderRadius: 15 }}>
      <Text style={styles.btn}>{title.toUpperCase()}</Text>
    </ImageBackground>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  component: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  btn: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Segoe UI'
  }
});
