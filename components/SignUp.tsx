import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface SignUpState {
  email: string;
  password: string;
}

interface SignUpComponentProps {
  toggleView: () => void;
}

const SignUpComponent = ({ toggleView }: SignUpComponentProps) => {
  const [state, setState] = useState<SignUpState>({ email: '', password: '' });

  const handleSignUp = () => {
    const { email, password } = state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Success', `User created: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        Alert.alert('Error', `Error creating user: ${error.message}`);
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Already have an account? Log In" onPress={toggleView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default SignUpComponent;
