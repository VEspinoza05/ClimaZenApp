import { View, Text, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const RecicleCentersCardComponent = ({ centerName, location }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lugar de reciclaje cercano</Text>
      <View style={styles.subcard}>
        <View style={styles.row}>
          <Entypo name="location-pin" size={32} color="#6a6a6a" />
          <View style={ {paddingLeft: 8} }>
            <Text style={styles.subtitle}>{centerName}</Text>
            <Text style={styles.subtitle}>{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#6a6a6a',
  },
  subcard: {
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: '#6a6a6a',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'OpenSans_700Bold',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular'
  },
});

export default RecicleCentersCardComponent;
