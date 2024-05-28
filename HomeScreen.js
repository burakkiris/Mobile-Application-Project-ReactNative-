import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const openEmptyScreen = () => {
    navigation.navigate('EmptyScreen');
  };

  const goToAuthScreen = () => {
    navigation.navigate("AuthScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Köpeğinizin Duygu Durumunu Öğrenin</Text>
      <Text style={styles.contentText}>Hoş Geldiniz!</Text>
      <Button title="Başla" onPress={openEmptyScreen} />
      <Button title="Üye Ol" onPress={goToAuthScreen} color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contentText: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default HomeScreen;
