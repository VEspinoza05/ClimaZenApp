import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AvailableCourseCard from '../components/AvailableCourseCardComponent'
import { secondTitleScreenStyle } from '../theme/Style'

export default function ExploreMinicoursesView({navigation}) {
  return (
    <View style={styles.screen}>
        <Text style={secondTitleScreenStyle.secondTitleScreen}>Más Minicursos</Text>
        <ScrollView>
            <AvailableCourseCard
              title="Curso de manualidades con botellas"
              author="Juan"
              image={require('../../assets/botellas.png')}
          />
          <AvailableCourseCard
              title="Curso de manualidades con cartón"
              author="Juan"
              image={require('../../assets/carton.jpg')}
          />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    padding: 8
  },
});