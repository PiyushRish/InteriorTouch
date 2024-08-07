//Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Fullscreen from './Fullscreen';

const { height, width } = Dimensions.get('window');

const Stack = createStackNavigator();

const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesCollection = await firestore().collection('home').get();
        const imagesData = imagesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(imagesData);
        const images2Collection = await firestore().collection('home-1').get();
        const images2Data = images2Collection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData1(images2Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
      >
        {() => <HomeScreen data={data} data1={data1} />}
      </Stack.Screen>
      <Stack.Screen
        name="Fullscreen"
        component={Fullscreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = ({ data, data1 }) => {
  const navigation = useNavigation();

  const handleImagePress = (imageUrl) => {
    navigation.navigate('Fullscreen', { imageUrl });
  };

  return (
    <View style={{ flex: 1,backgroundColor:"#fffaef" }}>
      <ScrollView>
        <Text style={{ fontSize: 25, paddingLeft: 10,color:'black' }}>
          Trending stuffs
        </Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImagePress(item.imageUrl)}>
                <View style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <View style={{ flex: 1 }}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                      />
                    </View>
                    <View style={{ flex: 1, borderWidth: 0 }}>
                      <Text style={styles.description}>
                        {item.imageDescription}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={{ fontSize: 25, paddingLeft: 10,color:'black' }}>
          Trending designs
        </Text>
        <View style={styles.container}>
          <FlatList
            data={data1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImagePress(item.imageUrl)}>
                <View style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <View style={{ flex: 1 }}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                      />
                    </View>
                    <View style={{ flex: 1, borderWidth: 0 }}>
                      <Text style={styles.description}>
                        {item.imageDescription}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    borderWidth: 0,
    borderColor: 'grey',
  },
  itemContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  description: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 0,
    maxWidth: width - 10,
    marginLeft: 0,
    paddingHorizontal: 5,
  },
  image: {
    width: width - 20,
    height: height / 4,
    resizeMode: 'cover',
    borderRadius: 5,
    margin:5,
  },
});

export default Home;
