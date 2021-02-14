import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // AsyncStorage.setItem("key", "I like to save it.");
        this.props.navigation.navigate("AppMain");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
       <Image
          style={{ width:"50%", height: 200 }}
          source={require('../assets/mylo.png')}
          resizeMode="contain"
        />

      <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }} >Hello! welcome to smart English app</Text>
      
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
        
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
              <TouchableOpacity 
                  onPress={() => this.handleLogin()}
                  style={{ width: 350, backgroundColor: '#0d47a1', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 30 }}
                  >
                  <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16 }}>Sign In </Text>
                </TouchableOpacity>

         <TouchableOpacity 
          onPress={() => this.props.navigation.navigate("SignUp")}
          style={{ width: 280, backgroundColor: '#FFF', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginTop: 30 }}
          >
          <Text style={{ textAlign: 'center', color: '#0d47a1', fontSize: 16 }}>Don't have an account? Create here </Text>
        </TouchableOpacity>
         <FontAwesome.Button name="google" backgroundColor="#DD4B39" onPress={() => this.props.navigation.navigate("google")}>
         Login with Google </FontAwesome.Button>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  textInput: {
    height: 45,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 8,
    fontSize: 18,
    padding:12,
    marginBottom: 10,
    marginBottom: 10,
    
  }
});
