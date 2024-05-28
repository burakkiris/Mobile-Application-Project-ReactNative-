import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react'

const AuthenticatedScreen = ({ user, handleHome ,handleAuthentication }) => {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Button title="Anasayfa" onPress={handleHome} color="#0000FF" />
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
  };

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  }
});
export default AuthenticatedScreen;
