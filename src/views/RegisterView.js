import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RegisterView({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [extraScroll, setExtraScroll] = useState(0)

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={extraScroll}
      enableOnAndroid={true} 
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{flexGrow: 1}}
    >
      <ImageBackground
        source={require('../../assets/forest.jpg')}
        style={backgroundStyle.background}
      >
        <View style={cardStyle.card}>
          <Text style={titleStyle.title}>Registrarse</Text>

          <TextInput
            placeholder="Nombre completo"
            style={inputStyle.input}
            onPress={() => setExtraScroll(50)}  
          />
          <TextInput
            placeholder="Correo electrónico"
            style={inputStyle.input}
            onPress={() => setExtraScroll(50)}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={'#6a6a6a'}
            secureTextEntry={!passwordVisible}
            style={inputStyle.input}
            onPress={() => setExtraScroll(100)}
          />
          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor={'#6a6a6a'}
            secureTextEntry={!passwordVisible}
            style={inputStyle.input}
            onPress={() => setExtraScroll(150)}
          />

          <View style={checkboxContainerStyle.checkboxContainer}>
            <Checkbox
              style={checkboxStyle.checkbox}
              value={passwordVisible}
              onValueChange={setPasswordVisible}
            />
              <Text style={checkboxLabelStyle.checkboxLabel}>Mostrar Contraseña</Text>
          </View>

          <CustomButton title="Crear cuenta" style={greenButtonStyle.greenButton} onPress={() => navigation.navigate('Tabs')} />

          <Link style={linkStyle.link} title="¿Ya tienes cuenta? Inicia Sesión" />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
    
  );
}