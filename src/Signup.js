import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  
  const Front = () => {
    return (
      <View style={{ flex: 4 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#123a80',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30, margin: 10, color: 'white' }}>WELCOME</Text>
          <Image
            source={require('./src/assets/images/lo.png')}
            style={{ resizeMode: 'center', height: 200, width: 200 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
         
          <TextInput
            placeholder='Email Id'
            placeholderTextColor="black"
            style={{
              borderColor: '#4c1d85',
              backgroundColor: 'white',
              borderRadius: 6,
              borderWidth: 1,
              marginTop: 15,
              paddingVertical: 8,
              paddingHorizontal: 10,
              width: 250,
              fontStyle: 'italic',
              height:55
            }}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor="black"
            style={{
              borderColor: '#4c1d85',
              backgroundColor: 'white',
              borderRadius: 6,
              borderWidth: 1,
              marginTop: 15,
              paddingVertical: 8,
              paddingHorizontal: 10,
              width: 250,
              fontStyle: 'italic',
              height:55
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#123a80',
              height: 50,
              width: 100,
              borderRadius: 10,
  
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
          
          
        </View>
      </View>
    );
  };
  
  export default Front;
  
  const styles = StyleSheet.create({});
  