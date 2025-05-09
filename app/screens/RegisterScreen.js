import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    // In a real app, you'd validate inputs here
    if (email && password && password === confirmPassword) {
      register({ email });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '100%',
  },
});

export default RegisterScreen; 