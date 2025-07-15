import { View, Text, StyleSheet } from 'react-native';
import CheckboxWithLabel from './CheckboxWithLabelComponent';

const renderNextActivityContainer = (nextActivity) => {
  return(
    <View>
          <Text style={[styles.title, {marginVertical: 10} ]}>Proxima Actividad</Text>
          <View style={styles.subcard}>
            <CheckboxWithLabel 
              label={nextActivity}
              value={false}
              labelStyle={ {fontSize: 12}}
            />
          </View>
    </View>
  )
}

const carbonFootprintComponent = ({ completedActivities, totalActivities, nextActivity, cardStyle }) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={styles.title}>Progreso</Text>
      <View style={[styles.row, styles.progressContainer]}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${Math.min((completedActivities / totalActivities) * 100, 100)}%` }]} />
        </View>
        <Text style={styles.percent}>{(completedActivities / totalActivities)  * 100}%</Text>
      </View>
      <Text style={styles.subtitle}>{completedActivities} de {totalActivities}</Text>
        {nextActivity ? renderNextActivityContainer(nextActivity) : undefined}
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
    marginVertical: 8,
  },
  percent: {
    color: '#000',
    fontWeight: 'bold',
    paddingLeft: 4,  
    width: 60,
    textAlign: 'center'
  }
});

export default carbonFootprintComponent;
