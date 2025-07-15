import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProgressCourseCardComponent = ({ title, author, progress, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
          <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">Creado por: {author}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.progressContainer]}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
        </View>
        <Text style={styles.percent}>{progress * 100}%</Text>
      </View>
    </TouchableOpacity>
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
  image: {
    width: 100,
    height: 75,
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
  progressBackground: {
    height: 18,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00aa66',
    borderRadius: 10,
  },
  progressContainer: {
    marginTop: 8,
  },
  percent: {
    color: '#000',
    fontWeight: 'bold',
    paddingHorizontal: 8,  
    width: 60,
    textAlign: 'center'
  }
});

export default ProgressCourseCardComponent;
