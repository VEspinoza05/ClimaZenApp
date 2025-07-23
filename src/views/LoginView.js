import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"

export default function LoginView({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  const { height: screenHeight } = Dimensions.get('window');

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true} 
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{flexGrow: 1}}
    >
      <ImageBackground
        source={require('../../assets/forest.jpg')}
        style={[backgroundStyle.background, {minHeight: screenHeight}]}
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

          <CustomButton title="Entrar" style={greenButtonStyle.greenButton} onPress={() => navigation.navigate('Tabs')}/>

          <Link style={linkStyle.link} title="¿No tienes cuenta? Registrate" />
          
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}