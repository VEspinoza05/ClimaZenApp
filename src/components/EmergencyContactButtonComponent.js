import { View, Text, Image, StyleSheet } from 'react-native';

const EmergencyContactButtonComponent = ({ title, telephone, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{telephone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#3ca380',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
    fontSize: 14,
  },
});

export default EmergencyContactButtonComponent;
