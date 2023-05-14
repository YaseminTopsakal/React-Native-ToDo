import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { firebase } from '../config.js';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');

  const signupUser = async () => {
     if(email == "" ||password=="" || passwordRep==""){
       Alert.alert('100KY - ToDo', 'The fields cannot be left blank');

     }
     else if (password != passwordRep) {
       Alert.alert('100KY - ToDo', 'Passwords do not match.');
      }else{

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('100KY - ToDo', 'Sign up successfully created!');
        navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
      Alert.alert('100KY - ToDO', `Error: ${error.message} `);
    }
      }

  };

  return (
    <View style={styles.container}>
      <View style={styles.textHeadingContainer}>
        <Text style={styles.title}> Signup</Text>
      </View>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#8f8fe5"
        keyboardType='email-address' 
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#8f8fe5"
        secureTextEntry
        returnKeyType="next"
      
        

      />
      <TextInput
        style={styles.input}
        value={passwordRep}
        onChangeText={setPasswordRep}
        placeholder="Repeat Password"
        placeholderTextColor="#8f8fe5"
        secureTextEntry
         returnKeyType="go"
        

      />

      <View style={styles.buttonViewLog}>
        <TouchableOpacity style={styles.buttonLog} onPress={signupUser}>
          <Text style={styles.buttonText} title="Signup">
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonViewSign}>
        <TouchableOpacity
          style={styles.buttonSign}
          title="Signup"
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText} title="Login">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#535890',
  },
  textHeadingContainer: {
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#222745',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  buttonViewLog: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonViewSign: {
    alignItems: 'center',
    marginTop: 30,
  },
  buttonLog: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#222745',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonSign: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#8f8fe5',
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
