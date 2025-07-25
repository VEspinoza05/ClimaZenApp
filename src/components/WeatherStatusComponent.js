import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherStatusComponent = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherArr } = weather;
  const { temp } = main;
  const { description, icon } = weatherArr[0];

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{temp} °C</Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
        </View>
         <Image source={{ uri: iconUrl }} style={styles.image} />
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
