import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButtonComponent'
import { backgroundStyle, cardStyle, greenButtonStyle, titleStyle, logoStyle } from "../theme/Style"

export default function WelcomeView({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/forest.jpg')}
      style={backgroundStyle.background}
    >
      <View style={cardStyle.card}>
        <Image style={logoStyle.logo} source={require('../../assets/ClimaZenLogo.png')} />

        <Text style={titleStyle.title}>ClimaZen</Text>

        <CustomButton title="Registrarse" style={greenButtonStyle.greenButton} />

        <CustomButton title="Iniciar sesión" style={greenButtonStyle.greenButton} onPress={() => navigation.navigate('Login')} />

      </View>
    </ImageBackground>
  );
}
