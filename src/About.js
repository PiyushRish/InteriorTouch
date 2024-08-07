import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const About = () => {
  const description = `Your home is your sanctuary. It’s the place where you relax, unwind, and recharge. That’s why it’s so important to create a space that reflects your personal style and taste.

If you’re looking for high-end furniture and furnishings that will elevate your home’s interior, then look no further than INTERIOR TOUCH. We offer a wide selection of premium pieces from India’s leading designers, so you’re sure to find something that you love.

At Interior Touch, we believe that furniture is more than just functional pieces; it’s a reflection of your style, personality, and the way you live. Our passion for interior design and creating inviting spaces drives us to curate a diverse and exceptional collection of furniture that caters to every taste and preference.

With a commitment to quality and craftsmanship, we source our furniture from reputable artisans, designers, and manufacturers who share our dedication to creating pieces that stand the test of time. Whether you’re furnishing your home, office, or any other space, we offer an array of options that encompass various styles – from modern minimalism to classic elegance.

What sets us apart is not only the quality of our products but also our unwavering dedication to customer satisfaction. Our team of experienced professionals is here to assist you every step of the way – from browsing our online catalog to making informed decisions and ensuring a seamless delivery process.

Explore our website to discover an inspiring range of sofas and sectionals that beckon you to relax, dining sets that invite conversations, beds that promise sweet dreams, and storage solutions that combine functionality with aesthetics. You’ll find an array of materials, colors, and designs to choose from, allowing you to create spaces that resonate with your unique vision.

Thank you for choosing Interior Touch to embark on your furniture journey. We’re excited to be a part of your quest to turn your house into a home, and your workspace into an oasis of productivity and style. Join us in shaping spaces that tell your story – because with the right furniture, every room becomes an opportunity to express yourself.

Feel free to contact us with any inquiries or assistance you may need. Happy shopping!

Warm regards, The Interior Touch Team`;

  const email = 'example@example.com';
  const address = 'Jhansi, Uttar Pradesh';
  const phone = '+91 88742 22267';

  const [activeContent, setActiveContent] = useState('details'); // Initial state

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  const renderDetailsContent = () => (
    <View style={styles.content}>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>Phone:</Text> {phone}
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>Email:</Text> {email}
        </Text>
        <Text style={styles.address}>
          <Text style={styles.contactLabel}>Address:</Text> {address}
        </Text>
      </View>
    </View>
  );

  const renderDevelopersContent = () => (
    <View style={styles.content}>
      <View style={styles.developersContainer}>
        <View style={styles.developerImageContainer}>
          <Image source={require('./Images/piyush.jpg')} style={styles.developerImage} resizeMode="cover" />
          <Text style={styles.developerName}>Piyush Rishi</Text>
          <Text style={styles.developerTitle}>Developer and Designer</Text>
          <Text style={styles.developerTitle}>B.Tech(CSE)</Text>
        </View>
        <View style={styles.developerImageContainer}>
          <Image source={require('./Images/nisha.jpg')} style={styles.developerImage} resizeMode="cover" />
          <Text style={styles.developerName}>Nishant Rajput</Text>
          <Text style={styles.developerTitle}>Developer and Designer</Text>
          <Text style={styles.developerTitle}>B.Tech(CSE)</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeContent) {
      case 'details':
        return renderDetailsContent();
      case 'developers':
        return renderDevelopersContent();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('details')}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('developers')}>
          <Text style={styles.buttonText}>Developers</Text>
        </TouchableOpacity>
      </View>
      {activeContent === 'details' ? (
        <View style={styles.imageContainer}>
          <Image source={require('./Images/interiortouch.jpg')} style={styles.image} resizeMode="cover" />
        </View>
      ) : null}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#fc6603',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: '95%',
    height: 300,
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  developersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  developerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  developerImage: {
    width: 150,
    height: 150,
  },
  developerName: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
  },
  developerTitle: {
    marginTop: 2,
    textAlign: 'center',
    color: 'black',
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
    color: 'black',
  },
  contactContainer: {
    marginTop: 10,
  },
  contact: {
    fontSize: 18,
    marginBottom: 5,
    paddingLeft: 10,
    color: 'black',
  },
  address: {
    fontSize: 18,
    paddingLeft: 10,
    color: 'black',
  },
  contactLabel: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default About;
