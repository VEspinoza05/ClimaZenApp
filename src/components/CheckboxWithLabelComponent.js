import { Text, StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox'

const CheckboxWithLabelComponent = ({ label, value, onValueChange, checkboxStyle, labelStyle }) => {
  return (
    <View style={styles.checkboxContainer}>
        <Checkbox
            style={[styles.checkbox, checkboxStyle]}
            value={value}
            onValueChange={onValueChange}
        />
        <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: 'OpenSans_400Regular',
  },
  checkbox: {
    margin: 8,
  },
});

export default CheckboxWithLabelComponent;