//browse.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Fullscreen from './Fullscreen';
import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get('window');

const Stack = createStackNavigator();

const Browse = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const imagesCollection1 = await firestore().collection('chairs').get();
      const imagesData1 = imagesCollection1.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData1(imagesData1);

      const imagesCollection2 = await firestore().collection('rooms').get();
      const imagesData2 = imagesCollection2.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData2(imagesData2);

      const imagesCollection3 = await firestore().collection('tables').get();
      const imagesData3 = imagesCollection3.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData3(imagesData3);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item.imageUrl)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.descriptionParent}>
          <Text style={styles.description}>{item.imageDescription}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleImagePress = (imageUrl) => {
    navigation.navigate('Fullscreen', { imageUrl });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BrowseScreen"
        options={{ headerShown: false }}
      >
        {() => (
          <View style={styles.container}>
            <View style={styles.touch}>
              <TouchableOpacity
                style={[styles.button, activeTab === 1 && styles.activeButton]}
                onPress={() => setActiveTab(1)}>
                <Image
                  source={require('./Images/chairs.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeTab === 2 && styles.activeButton]}
                onPress={() => setActiveTab(2)}>
                <Image
                  source={require('./Images/room.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeTab === 3 && styles.activeButton]}
                onPress={() => setActiveTab(3)}>
                <Image
                  source={require('./Images/sofa.png')}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={activeTab === 1 ? data1 : activeTab === 2 ? data2 : data3}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Fullscreen"
        component={Fullscreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  descriptionParent: {
    backgroundColor: 'white',
    padding: 10,
  },
  description: {
    color: 'black',
    fontSize: 18,
  },
  image: {
    width:width/1.035,
    height: height / 2,
    resizeMode: 'cover',
    borderRadius: 5,
    marginLeft:10,
    marginRight:10,
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  button: {
    paddingBottom: 5,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
});

export default Browse;
