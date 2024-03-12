import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginState {
  email: string;
  password: string;
}

interface LoginComponentProps {
  toggleView: () => void;
}

const LoginComponent = ({ toggleView }: LoginComponentProps) => {
  const [state, setState] = useState<LoginState>({ email: '', password: '' });

  const handleLogin = () => {
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Success', `User logged in: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        Alert.alert('Error', `Error logging in: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => setState({ ...state, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={state.password}
        onChangeText={(text) => setState({ ...state, password: text })}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={toggleView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default LoginComponent;
