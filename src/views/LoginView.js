import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'
import CustomButton from '../components/CustomButtonComponent'
import Link from '../components/LinkComponent'
import { useState } from 'react';

export default function LoginView({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/forest.jpg')}
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput placeholder="Correo electrónico" style={styles.input} />
        
        <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.label}>Mostrar Contraseña</Text>
        </View>

        <CustomButton title="Entrar" style={styles.button}/>

        <Link style={styles.link} title="¿No tienes cuenta? Registrate" />
        
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
  title: {
    fontSize: 32,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    borderWidth: 2,
    width: '100%',
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 18,
    color: '#6a6a6a'
  },
  button: {
    backgroundColor: '#3ca380',
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,   
    fontFamily: 'OpenSans_700Bold',
    color: '#6a6a6a',
  },
  checkbox: {
    margin: 8,
  },
  link: {
    margin: 8,
  }
});
