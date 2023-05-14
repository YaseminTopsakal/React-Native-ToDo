import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { firebase } from '../config.js';

const Home = (props) => {
  const [todoList, setTodoList] = useState([]);
  const todoRef = firebase.firestore().collection('ky_todo');
  const [addData, setAddData] = useState('');
  const [completed, setCompleted] = useState([]);
  const { user } = props;
  const { signOut } = props;
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) return;
    console.log(user.uid);
    console.log(typeof user.uid);
    todoRef
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const todoList = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          todoList.push({
            id: doc.id,
            heading,
            value:doc.value
          });
        });
        setTodoList(todoList);
      });
  }, [user]);

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const user = firebase.auth().currentUser;
      if (user) {
        const data = {
          heading: addData,
          createdAt: timestamp,
          userId: user.uid,
          value: false,
        };

        todoRef
          .add(data)
          .then(() => {
            setAddData('');
            Keyboard.dismiss();
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };

  const deleteTodo = (todo) => {
    todoRef
      .doc(todo.id)
      .delete()
      .then(() => {
        Alert.alert('toDo', 'The todo has been deleted.');
      })
      .catch((error) => {
        Alert.alert('toDo', 'The todo has been deleted.', error);
      });
  };

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}> ToDo List</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add New ToDo"
          placeholderTextColor="#8f8fe5"
          value={addData}
          onChangeText={(heading) => setAddData(heading)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todoList}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.container}>
              <Text               
                style={completed ? styles.check : styles.itemHeading}>
                {' '}
                {item.heading}{' '}
              </Text>
              
              <FontAwesome              
                name="edit"
                onPress={() => navigation.navigate('Detail', { item })}
                style={styles.edit}
              />

              <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonSignOut} onPress={signOut}>
        <Text style={styles.buttonSignOutText}>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#535890',
  },
  container: {
    backgroundColor: '#e4e5f6',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeadingContainer: {
    paddingVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#222745',
  },

  itemHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 22,
    textAlignVertical: 'top',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#222745',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  edit: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
    color: 'green',
  },

  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
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

export default Home;
