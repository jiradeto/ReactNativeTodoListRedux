import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Input from './common/Input';
import Button from './common/Button';

import { onUpdateInput, onLogin } from '../actions';

class Auth extends Component {
  
  componentDidUpdate() {
    if (this.props.error) {
      Alert.alert('Error', this.props.error, { cancelable: true });
    }
  }

  onLogin() {
    const { username, password } = this.props;
    this.props.dispatch(onLogin({ username, password }));
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" style={styles.spinner} />;
    }

    return (
      <Button style={styles.button} onPress={this.onLogin.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          value={this.props.username}
          onChangeText={value =>
            this.props.dispatch(onUpdateInput({ prop: 'username', value }))
          }
          placeholder="Username"
        />
        <Input
          style={styles.input}
          secureTextEntry
          value={this.props.password}
          onChangeText={value =>
            this.props.dispatch(onUpdateInput({ prop: 'password', value }))
          }
          placeholder="Password"
        />
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    paddingTop: 50
  },
  button: {
    marginTop: 10,
    padding: 20,
    alignSelf: 'stretch'
  },
  container: {
    padding: 20
  },
  input: {
    padding: 20,
    marginTop: 10
  }
});

const select = store => {
  const { username, password, loading, error } = store.auth;
  return {
    username,
    password,
    loading,
    error
  };
};

export default connect(select)(Auth);
