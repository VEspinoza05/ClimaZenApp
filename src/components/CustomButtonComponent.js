import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButtonComponent = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
  },
});

export default CustomButtonComponent;