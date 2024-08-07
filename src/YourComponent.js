import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const {height, width} = Dimensions.get('window');

const YourComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const imagesCollection = await firestore().collection('home').get();
      const imagesData = imagesCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(imagesData);
    };
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Latest designs</Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <ScrollView horizontal>
                  <View style={styles.imageContainer}>
                    <View style={{flex: 1}}>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={styles.image}
                      />
                    </View>
                    <View style={{flex: 1, borderWidth:0,}}>
                      <Text style={styles.description}>
                        {item.imageDescription}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          />
        </View>
       
      </ScrollView>
      <View style={styles.touch}>
          <TouchableOpacity style={{width:100,height:80,backgroundColor:'green'}}>
            <Text>Bedroom</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Dinning room</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Hallroom</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  itemContainer: {
    marginBottom: 20,
    justifyContent:'center',
    alignContent:'center',
  },
  description: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 18,paddingTop:15,
    
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    
    
  },
  image: {
    width: width,
    height: height/4,
    resizeMode: 'cover',
    borderRadius: 10,
    left:0,
    right:10,
    position:"relative",
    
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
    marginTop: 20,
    height:80,
    backgroundColor:"blue"
  },
});

export default YourComponent;
