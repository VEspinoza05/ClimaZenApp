import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { secondTitleScreenStyle } from '../theme/Style'
import EventAndWeather from '../components/EventAndWeatherComponent';
import CarbonFootprint from '../components/CarbonFootprintComponent';
import RecicleCentersCard from '../components/RecicleCentersCardComponent';
import SuggestedCourseCardComponent from '../components/SuggestedCourseCardComponent';

export default function MinicoursesView({navigation}) {
  return (
    <View style={styles.screen}>
      <ScrollView>
          <View>
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Clima</Text>
              <EventAndWeather 
                title={'Reunion con pedro'}
                hour={'2:00 pm'}
                prediction={'70% de lluvia'}
                weatherReminder={'¡Lleva tu paraguas!'}
                weatherImage={require('../../assets/cloudWithRain.png')}
              />
          </View>
          <View>
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Huella de carbono</Text>
              <CarbonFootprint
                completedActivities={2}
                totalActivities={4}
                nextActivity={'Plantar 1 árbol en mi patio'}
              />
          </View>
          <View>
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Lugares de reciclaje</Text>
              <RecicleCentersCard
                centerName={'Centro 3R'}
                location={'Diriamba, Carazo'}
              />
          </View>
          <View>
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Minicursos</Text>
              <SuggestedCourseCardComponent
                name={'Curso de manualidades con plástico'}
                image={require('../../assets/botellas.png')}
              />
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    padding: 12
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
  }
});