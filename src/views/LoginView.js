import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"
import { supabase } from '../lib/supabase'

export default function LoginView({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { height: screenHeight } = Dimensions.get('window');

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    }
  };

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

          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor={'#6a6a6a'}
            style={inputStyle.input}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={'#6a6a6a'}
            secureTextEntry={!passwordVisible}
            style={inputStyle.input}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={checkboxContainerStyle.checkboxContainer}>
            <Checkbox
              style={checkboxStyle.checkbox}
              value={passwordVisible}
              onValueChange={setPasswordVisible}
            />
            <Text style={checkboxLabelStyle.checkboxLabel}>Mostrar Contraseña</Text>
          </View>

          <CustomButton
            title="Entrar"
            style={greenButtonStyle.greenButton}
            disabled={loading}
            onPress={handleLogin}
          />

          <Link style={linkStyle.link} title="¿No tienes cuenta? Registrate" />
          
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}