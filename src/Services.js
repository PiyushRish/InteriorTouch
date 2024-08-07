import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview'; // Import WebView
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

  const renderVideoTab = () => {
    // Array of video objects with IDs and titles
    const videos = [
      { id: '-NYbY4tX2-M', title: 'Video Title 1' },
      { id: '1q3byTYb22I', title: 'Video Title 2' },
      { id: 'VSkqdm0lOYk', title: 'Video Title 3' },
      { id: 'Xzx1ZXo1PiI', title: 'Video Title 4' },
    ];

    return (
      <ScrollView style={styles.videoContainer}>
        {videos.map(video => (
          <View key={video.id} style={styles.videoWrapper}>
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${video.id}` }}
              style={styles.youtubePlayer}
              allowsFullscreenVideo={true}
              javaScriptEnabled={true}
            />
            <Text style={styles.videoTitle}>{video.title}</Text>
          </View>
        ))}
      </ScrollView>
    );
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
                <Text>House</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeTab === 2 && styles.activeButton]}
                onPress={() => setActiveTab(2)}>
                <Text>Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeTab === 3 && styles.activeButton]}
                onPress={() => setActiveTab(3)}>
                <Text>Tab 3</Text>
              </TouchableOpacity>
            </View>
            {activeTab === 1 ? (
              <FlatList
                data={data1}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : activeTab === 2 ? (
              renderVideoTab()
            ) : (
              <FlatList
                data={data3}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
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
    width: width / 1.035,
    height: height / 2,
    resizeMode: 'cover',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
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
  videoContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  videoWrapper: {
    marginBottom: 20, // Increased margin to separate video and title
  },
  youtubePlayer: {
    width: width - 20,
    height: width * 9 / 16,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Browse;
