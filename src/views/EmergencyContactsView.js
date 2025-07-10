import { View, Text, StyleSheet } from 'react-native';
import { secondTitleScreenStyle } from '../theme/Style'

export default function EmergencyContactsView({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={[secondTitleScreenStyle.secondTitleScreen, {paddingVertical:0, marginBottom: 12}]}>Toca una opcion para llamar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    padding: 12,
  },
});
