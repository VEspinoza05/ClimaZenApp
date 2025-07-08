import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LinkComponent = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.link, style]} onPress={onPress}>
      <Text style={[styles.linkText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#3ca380',
    fontSize: 14,
    fontFamily: 'OpenSans_700Bold'
  },
});

export default LinkComponent;