// App.js
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Browse from './src/Browse';
import About from './src/About';
import Fullscreen from './src/Fullscreen';
import Login from './src/Login';

import Chat from './src/Chat';
import Services from './src/Services';


const { height, width } = Dimensions.get('window');

const CustomHomeIcon = () => (
  <Image
    source={require('./src/Images/Home.png')}
    style={{ width: 30, height: 30 }}
  />
);

const CustomProfileIcon = () => (
  <Image
    source={require('./src/Images/about.png')}
    style={{ width: 30, height: 30 }}
  />
);

const CustomBrowseIcon = () => (
  <Image
    source={require('./src/Images/shop.jpg')}
    style={{ width: 30, height: 30 }}
  />
);
const CustomMessengerIcon = () => (
  <Image
    source={require('./src/Images/messenger.png')}
    style={{ width: 30, height: 30 }}
  />
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require('./src/Images/splash.png')}
      style={{ width: width, height: height }}
    />
  </View>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#fc6603', // Active tab color (orange)
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: () => <CustomHomeIcon />,
      }}
    />
    <Tab.Screen
      name="ShowRoom"
      component={Browse}
      options={{
        headerShown: false,
        tabBarIcon: () => <CustomBrowseIcon />,
      }}
    />
     <Tab.Screen
      name="Services"
      component={Services}
      options={{
        headerShown: false,
        tabBarIcon: () => <CustomBrowseIcon />,
      }}
    />
    <Tab.Screen
      name="About"
      component={About}
      options={{
        headerShown: false,
        tabBarIcon: () => <CustomProfileIcon />,
      }}
      />
      <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        headerShown: false,
        tabBarIcon: () => <CustomMessengerIcon />,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); // Hide splash screen after timeout
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSplashVisible ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/*<Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: false }}
            />*/}
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fullscreen"
              component={Fullscreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
