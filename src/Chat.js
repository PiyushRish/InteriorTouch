import React from 'react';
import { Linking, Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Chat = () => {
  const openWhatsApp = () => {
    const url = 'whatsapp://app';

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          console.log('WhatsApp supported, opening URL');
          return Linking.openURL(url)
            .catch((err) => {
              Alert.alert('Error', 'Failed to open WhatsApp. Please try again.');
              console.error('Error opening WhatsApp:', err);
            });
        } else {
          Alert.alert('WhatsApp is not installed on this device');
          console.log('WhatsApp not supported');
        }
      })
      .catch((err) => {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        console.error('Error checking WhatsApp URL:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Images/chat.png')}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.text}>
        Chat with Us!
      </Text>
      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Text style={styles.buttonText}>Open WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
