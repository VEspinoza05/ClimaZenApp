import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"

export default function RegisterView({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/forest.jpg')}
      style={backgroundStyle.background}
    >
      <View style={cardStyle.card}>
          <Text style={titleStyle.title}>Registrarse</Text>

          <TextInput placeholder="Nombre completo" style={inputStyle.input} />
          <TextInput placeholder="Correo electrónico" style={inputStyle.input} />
          <TextInput placeholder="Contraseña" secureTextEntry style={inputStyle.input} />
          <TextInput placeholder="Confirmar contraseña" secureTextEntry style={inputStyle.input} />

          <View style={checkboxContainerStyle.checkboxContainer}>
                    <Checkbox
                      style={checkboxStyle.checkbox}
                      value={isChecked}
                      onValueChange={setChecked}
                    />
                    <Text style={checkboxLabelStyle.checkboxLabel}>Mostrar Contraseña</Text>
          </View>

          <CustomButton title="Crear cuenta" style={greenButtonStyle.greenButton} onPress={() => navigation.navigate('Tabs')} />

          <Link style={linkStyle.link} title="¿Ya tienes cuenta? Inicia Sesión" />
        </View>
    </ImageBackground>
    
  );
}