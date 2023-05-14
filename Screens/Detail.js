import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';

import { firebase } from '../config.js';
import { useNavigation } from '@react-navigation/native';

//route navigate'in gönderdiği bilgimi alabilmemi sağlıyor
const Detail = ({ route, signOut }) => {
  //firebase ile bağlantı kuruyoruz, bununla
  const todoRef = firebase.firestore().collection('ky_todo');
  //route'dan gelen değişkenlerin içindeki headingi al demiş olduk. 
  const [text, setText] = useState(route.params.item.heading); //route navigaton içinde tanımlı.// text bilgimi aldım
  const navigation = useNavigation();

  const updateTodo = () => {
    if (text && text.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: text,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
     <SafeAreaView style={styles.safeArea}>
    
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}> ToDo Update</Text>
      </View>
    
       <View style={styles.formContainer}>
        <TextInput
          style={styles.textField}
          placeholder="Update Todo"
          placeholderTextColor="#cceeff"
          value={text}
          onChangeText={setText}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={styles.buttonUpdate}  onPress={() => {
          updateTodo();
        }}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

        <FlatList   
        renderItem={() => (
         <View style={styles.container}>
             
          </View>
        )}
           />
            <View style={styles.container}>
              <AntDesign 
              name="arrowleft" 
              size={24} 
              color="black"
              onPress={() => navigation.navigate('Home')} />
          </View>


      <TouchableOpacity style={styles.buttonSignOut} onPress={signOut}>
        <Text style={styles.buttonSignOutText}>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
 
 safeArea:{
flex: 1, 
backgroundColor:"#535890"
 },
   textHeadingContainer: {
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 24,
    color:"#222745"
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  textField: {
  height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  buttonUpdate: {
   height: 47,
    borderRadius: 5,
    backgroundColor: '#222745',
    width: 80,
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonSignOut: {
   marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#222745',
  },
  buttonSignOutText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Detail;