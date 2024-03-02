import React from 'react';
import { View, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const TestFirebaseConnection = () => {
  const testFirebaseAuth = () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    createUserWithEmailAndPassword(auth, testEmail, testPassword)
      .then((userCredential) => {
        Alert.alert('Success', `User created: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        Alert.alert('Error', `Error creating user: ${error.message}`);
      });
  };

  const testFirebaseLogin = () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    signInWithEmailAndPassword(auth, testEmail, testPassword)
      .then((userCredential) => {
        Alert.alert('Success', `User logged in: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        Alert.alert('Error', `Error logging in: ${error.message}`);
      });
  };

  return (
    <View>
      {/* Test user creation */}
      <Button title="Test Create User" onPress={testFirebaseAuth} />

      {/* Test user login */}
      <Button title="Test Login" onPress={testFirebaseLogin} />
    </View>
  );
};

export default TestFirebaseConnection;
