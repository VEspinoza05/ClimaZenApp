import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';
import { backgroundStyle, cardStyle, titleStyle, inputStyle, greenButtonStyle, checkboxContainerStyle, checkboxStyle, checkboxLabelStyle, linkStyle } from "../theme/Style"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { supabase } from '../lib/supabase'

export default function RegisterView({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [extraScroll, setExtraScroll] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')

  const handleSignUp = async () => {
    setLoading(true);

    if(password !== confirmationPassword) {
      Alert.alert("Passwords do not match");
      setLoading(false)
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username 
        },
      }
    })

    setLoading(false)

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
  };

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
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={inputStyle.input}
            onPress={() => setExtraScroll(50)}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={'#6a6a6a'}
            secureTextEntry={!passwordVisible}
            style={inputStyle.input}
            onPress={() => setExtraScroll(100)}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor={'#6a6a6a'}
            secureTextEntry={!passwordVisible}
            style={inputStyle.input}
            onPress={() => setExtraScroll(150)}
            onChangeText={(text) => setConfirmationPassword(text)}
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
            title="Crear cuenta"
            style={greenButtonStyle.greenButton}
            onPress={handleSignUp}
            disabled={loading}
          />

          <Link style={linkStyle.link} title="¿Ya tienes cuenta? Inicia Sesión" />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
    
  );
}