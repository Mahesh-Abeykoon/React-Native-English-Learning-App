import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import * as firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyBysL6m1n_6NZo2noTSygLfgLS9aRMEIMk",
    authDomain: "zinc-fusion-302607.firebaseapp.com",
    databaseURL: "https://zinc-fusion-302607-default-rtdb.firebaseio.com",
    projectId: "zinc-fusion-302607",
    storageBucket: "zinc-fusion-302607.appspot.com",
    messagingSenderId: "215197510308",
    appId: "1:215197510308:web:d17f60de74b890e9769431"

};

firebase.initializeApp(firebaseConfig);


import Loading from "./components/Loading";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AppMain from "./AppMain";
import googleLogScreen from "./components/googleLogScreen"; 
import facebookLogScreen from './components/facebookLogScreen';


const RootStack = createSwitchNavigator(
  {
    Loading: Loading,
    Login: Login,
    SignUp: SignUp,
    AppMain: AppMain,
    googleLogScreen: googleLogScreen,

    facebookLogScreen:facebookLogScreen
  },
  {
    initialRouteName: "Loading"
  }
);

const App = createAppContainer(RootStack);
export default App;

