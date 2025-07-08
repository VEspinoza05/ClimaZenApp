import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButtonComponent'

export default function WelcomeView({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/forest.jpg')}
      style={styles.background}
    >
      <View style={styles.card}>
        <Image style={styles.logo} source={require('../../assets/ClimaZenLogo.png')} />

        <Text style={styles.appName}>ClimaZen</Text>

        <CustomButton title="Registrarse" style={styles.button}/>

        <CustomButton title="Iniciar sesión" style={styles.button} />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 32,
    color: '#000',
    marginVertical: 8,
    fontFamily: 'OpenSans_700Bold'
  },
  button: {
    backgroundColor: '#3ca380',
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
  logo: {
    width: 170,
    height: 150,
  }
});
