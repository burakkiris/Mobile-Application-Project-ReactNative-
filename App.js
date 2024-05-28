import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { ScrollView, StyleSheet } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import AuthenticatedScreen from './screens/AuthenticatedScreen';
import HomeScreen from './screens/HomeScreen';
import EmptyScreen from './screens/EmptyScreen';
import { firebaseApp } from './FirebaseConfig';

const Stack = createStackNavigator();
const auth = getAuth(firebaseApp);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();  // Clean up the subscription
  }, []);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
        console.error('Authentication error:', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="AuthScreen" children={() => (
  <AuthScreen
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    isLogin={isLogin}
    setIsLogin={setIsLogin}  // Düzeltildi
    handleAuthentication={handleAuthentication}
  />
)} options={{ title: isLogin ? 'Giriş Yap' : 'Kayıt Ol' }} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
        <Stack.Screen name="Authenticated" children={() => (
          <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
        )} options={{ title: 'Hoş Geldiniz' }} />
        <Stack.Screen name="EmptyScreen" component={EmptyScreen} options={{ title: 'Boş Ekran' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  }
});
