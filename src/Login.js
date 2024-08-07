import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Login = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [name,setname] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const signinWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phonenumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code:", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredentials = await confirm.confirm(code);
      const user = userCredentials.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Details", { uid: user.uid });
      }
    } catch (error) {
      console.log("Invalid code:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {!confirm ? (
        <>
        <TextInput
            style={styles.input}
            placeholder='Enter your name'
            value={name}
            onChangeText={setname}
          />
          <Text style={styles.label}>Enter your Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder='e.g., +91 9034XXXXXX'
            value={phonenumber}
            onChangeText={setPhonenumber}
          />
          
          <TouchableOpacity
            onPress={signinWithPhoneNumber}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter the code sent to your phone:</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Code'
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Confirm Code</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 150,
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#841584",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default Login;
