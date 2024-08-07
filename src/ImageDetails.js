//imagedetails.js 
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ImageDetailsScreen = ({ route }) => {
  const { image, description } = route.params; // Get the image URL and description from the route parameters

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageDetailsScreen;
