import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { secondTitleScreenStyle } from '../theme/Style'
import EmergencyContactButton from '../components/EmergencyContactButtonComponent'

export default function EmergencyContactsView({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={[secondTitleScreenStyle.secondTitleScreen, {paddingVertical:0, marginBottom: 24}]}>Toca una opcion para llamar</Text>
      <ScrollView>
        <EmergencyContactButton
        title="Policia"
        telephone="128"
        image={require('../../assets/police.png')}
      />
      <EmergencyContactButton
        title="bomberos"
        telephone="115"
        image={require('../../assets/fireTruck.png')}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    padding: 16,
  },
});
