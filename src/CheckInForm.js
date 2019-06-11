import React, { Component } from 'react';
import { Keyboard, Alert, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ImageBackground, View, Modal, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
// import DeviceInfo from 'react-native-device-info';
import SuccessView from './SuccessView';
// import Picker from './Picker';
import Button from './Button';
const API_HOST = 'https://ironbitcheckin.herokuapp.com'
const isTablet = Platform.isPad;

const SUBJECTS = [
  { label: 'Entrevista', value: 'entrevista' },
  { label: 'Cliente', value: 'cliente' },
  { label: 'Proveedor', value: 'proveedor' },
  { label: 'Personal', value: 'personal' },
  { label: 'Contratación', value: 'contratacion' },
  { label: 'Otro', value: 'otro' },
]

export default class CheckInForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      phone: '',
      email: '',
      host: '',
      reason: '',
      error: null,
      // errors: {
      //   name: null,
      //   phone: null,
      //   email: null,
      //   host: null,
      // },
      availableHosts: [],
      modalVisible: false,
      privacyVisible: false,
    };

    this.getHosts = this.getHosts.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getHosts()

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardVisble: true })
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardVisble: false })
  }

  async getHosts() {
    try {
      const rawResponse = await fetch(`${API_HOST}/hosts`)
      const hostsData = await rawResponse.json();
      const hosts = hostsData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() );
      this.setState({ availableHosts: hosts })
    } catch(e) {
      Alert.alert('Error', "Intenta mas tarde");
    }
  }

  async submit() {
    try {
      const {
        name,
        phone,
        email,
        host,
        reason,
      } = this.state;

      // Mini validation
      if(name.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        host.trim() === '' ||
        reason.trim() === '') {
          this.setState({ error: 'Formulario incompleto' })
          // Alert.alert('Formulario incompleto', 'Asegurate de completar todos los campos del forumario')
          return;
        } else {
          this.setState({ error: null })
        }

      const rawResponse = await fetch(`${API_HOST}/checkin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          host,
          reason,
        })
      });
      const visitor = await rawResponse.json();
      // this.props.navigation.navigate('Success');
      this.showSuccessModal()
      // Alert.alert("Enviado", `Gracias por registrarte, ${visitor.name}`, [
      //   { text: 'Listo', onPress: this.props.onSuccess},
      // ])
    } catch(e) {
      Alert.alert('Error', "Intenta mas tarde");
      this.props.navigation.pop()
    }
  }

  showSuccessModal = () => {
    this.setState({
      modalVisible: true,
    })
  };

  closeAll = () => {
    this.setState({
      modalVisible: false,
    }, this.props.closeModal)
  };

  showPrivacyPolicy = () => {
    this.setState({
      privacyVisible: true,
    })
  }

  newCheckin = () => {
    this.setState({
      name: '',
      phone: '',
      email: '',
      host: '',
      error: null,
      modalVisible: false,
    })
  };

  render() {
    const {
      name,
      phone,
      email,
      host,
      availableHosts,
    } = this.state;

    return (
      <ImageBackground style={styles.component} source={require('./res/bg_large.png')}>
        <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
          >
            <SuccessView closeModal={this.closeAll} newCheckin={this.newCheckin} />
          </Modal>
          <TouchableOpacity style={styles.hero} onPress={this.props.closeModal}>
            <Image
                source={require('./res/ironbit_logo.png')}
                style={styles.heroLogo}
                resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.formCard}>
            <View style={styles.formContent}>
              <Text style={styles.title}>Ingresa tus Datos</Text>
              <TextField
                label='Nombre'
                value={name}
                onChangeText={(name) => this.setState({ name })}
              />
              <TextField
                label='Telefono'
                value={phone}
                onChangeText={(phone) => this.setState({ phone })}
              />
              <TextField
                label='Correo'
                value={email}
                onChangeText={(email) => this.setState({ email })}
              />
              <Dropdown
                label='Motivo de la visita'
                data={SUBJECTS}
                labelExtractor={({ label }) => label}
                valueExtractor={({ value }) => value}
                onChangeText={reason => this.setState({ reason })}
              />
              <Dropdown
                label='A quien visita'
                data={availableHosts}
                labelExtractor={({ name }) => name}
                valueExtractor={({ id }) => id}
                onChangeText={(host) => this.setState({ host })}
              />

              <Text style={styles.error}>{this.state.error}</Text>
            </View>
            <Text
              style={[styles.title, styles.privacy]}
            >
              Haciendo click en Registrarme confirmo que he leido y acepto la Politica de Privacidad
            </Text>
            <Button title="Registrarme" onPress={this.submit} />
          </View>
          <View style={{ height: this.state.keyboardVisble ? (isTablet ? 100 : 200) : 0 }} />
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    paddingTop: 20,
    // backgroundColor: '#072B39',
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },
  hero: {
    flex: isTablet ? 4 : 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroLogo: {
    maxWidth: isTablet ? 400 : 250,
  },
  formCard: {
    flex: isTablet ? 8 : 10,
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingBottom: 30,
  },
  formContent: {
    width: isTablet ? 500 : 300,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    color: "#000000",
    textAlign: 'center',
    fontFamily: 'Segoe UI'
  },
  privacy: {
    fontSize: 16,
    color: '#8D8D8D',
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
});
