import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"

export default function LoginView({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/forest.jpg')}
      style={backgroundStyle.background}
    >
      <View style={cardStyle.card}>
        <Text style={titleStyle.title}>Iniciar Sesión</Text>

        <TextInput placeholder="Correo electrónico" style={inputStyle.input} />

        <TextInput placeholder="Contraseña" secureTextEntry style={inputStyle.input} />

        <View style={checkboxContainerStyle.checkboxContainer}>
          <Checkbox
            style={checkboxStyle.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={checkboxLabelStyle.checkboxLabel}>Mostrar Contraseña</Text>
        </View>

        <CustomButton title="Entrar" style={greenButtonStyle.greenButton}/>

        <Link style={linkStyle.link} title="¿No tienes cuenta? Registrate" />
        
      </View>
    </ImageBackground>
  );
}