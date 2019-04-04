import React, { Component } from 'react';
import { Alert, Text, Button, StyleSheet, View, } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
const API_HOST = 'https://ironbitcheckin.herokuapp.com'

export default class CheckInForm extends Component {
  constructor() {
    super();
    
    this.state = {
      name: '',
      phone: '',
      email: '',
      host: '',
      error: null,
      // errors: {
      //   name: null,
      //   phone: null,
      //   email: null,
      //   host: null,
      // },
      availableHosts: [],
    }

    this.getHosts = this.getHosts.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.getHosts()
  }

  async getHosts() {
    try {
      const rawResponse = await fetch(`${API_HOST}/hosts`)
      const hosts = await rawResponse.json();
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
      } = this.state;

      // Mini validation
      if(name.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        host.trim() === '') {
          this.setState({ error: 'Formulario incompleto' })
          Alert.alert('Formulario incompleto', 'Asegurate de completar todos los campos del forumario')
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
        })
      });
      const visitor = await rawResponse.json();
      Alert.alert("Enviado", `Gracias por registrarte, ${visitor.name}`, [
        { text: 'Listo', onPress: this.props.onSuccess},
      ])
    } catch(e) {
      Alert.alert('Error', "Intenta mas tarde");
      // this.props.onFailure()
    }
  }

  render() {
    const {
      name,
      phone,
      email,
      host,
      availableHosts,
    } = this.state;

    return (
      <View style={styles.component}>
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
          label='A quien visita'
          data={availableHosts}
          labelExtractor={({ name }) => name}
          valueExtractor={({ id }) => id}
          onChangeText={(host) => this.setState({ host })}
        />

        <Text style={styles.error}>{this.state.error}</Text>
        <Button title="Enviar" onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  error: {
    color: 'red',
  }
})
