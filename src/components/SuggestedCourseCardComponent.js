import { View, Text, Image, StyleSheet } from 'react-native';

const SuggestedCourseCardComponent = ({ name, image }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Contiúa con: </Text>
      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 75,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
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
    marginTop: 4,
    color: '#666',
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular'
  },
});

export default SuggestedCourseCardComponent;
