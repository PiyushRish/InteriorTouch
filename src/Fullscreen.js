//FullScreen.js

import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const FullscreenImageView = ({ route, navigation }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
});

export default FullscreenImageView;
