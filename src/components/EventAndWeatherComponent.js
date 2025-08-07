import { View, Text, Image, StyleSheet } from 'react-native';

const EventAndWeatherComponent = ({ title, hour,  prediction, weatherReminder, weatherImage, cardStyle, useSeparator = false }) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <View style={[styles.row, useSeparator ? styles.bottomBorder : undefined]}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">Hora: {hour}</Text>
          <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">Prediccion: {prediction}</Text>
          <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">{weatherReminder}</Text>
        </View>
         <Image source={weatherImage} style={styles.image} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBorder: {
    borderBottomColor: '#6a6a6a',
    borderBottomWidth: 2,
    paddingBottom: 12,
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

export default EventAndWeatherComponent;
