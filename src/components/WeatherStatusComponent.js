import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherStatusComponent = ({ hour, weatherStatus, prediction, weatherImage }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">Hora: {hour}</Text>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{weatherStatus}</Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">Prediccion: {prediction}</Text>
        </View>
         <Image source={weatherImage} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#6a6a6a',
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
  textContainer: {
    flex: 1,
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

export default WeatherStatusComponent;
