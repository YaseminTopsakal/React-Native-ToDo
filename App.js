import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import Detail from './Screens/Detail';

import {firebase} from './config.js';


const Stack = createStackNavigator();

const AuthContext = React.createContext();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue = useMemo(
    () => ({

      signIn: async (email, password) => {
        try{
          await firebase.auth.signInWithEmailAndPassword(email, password);
        }catch (error){
          console.log(error.message);
        }
      },

      signOut: async () => {
        try{
          await firebase.auth().signOut();
        }catch(error){
          console.log(error.message);
        }
      },
    }), []);


    const signOut = () => {

      firebase.auth().signOut().then( () => {
        console.log("Signed Out Successfully.");
      }).catch((error) => {
        console.log("Error signing out: ", error);
      })

    }

  return (

    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
         <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        {user ? (
          <>
          <Stack.Screen name="Home" 
            children={(props) => <Home {...props} user={user} signOut={signOut} />} 
            />
          <Stack.Screen name="Detail"
            children={(props)=> <Detail {...props} signOut={signOut} />}
            />
          </>
        ) : (
         null
        )
        }
          
         
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>


  );
}