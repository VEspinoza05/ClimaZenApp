import { Text, View, StyleSheet, ScrollView } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import WeatherStatus from "../components/WeatherStatusComponent";
import EventAndWeather from '../components/EventAndWeatherComponent';

export default function WeatherView({navigation}) {
    return(
        <View style={styles.screen}>
            <ScrollView>
              <View style={styles.componentContainer}>
                <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Clima Actual</Text>
                <WeatherStatus
                  hour={'12:30 pm'}
                  weatherStatus={'Soleado 25°'}
                  prediction={'0% de lluvia'}
                  weatherImage={require('../../assets/sun.png')}
                />
              </View>
              <View style={styles.componentContainer}>
                <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Proximo Evento</Text>
                <EventAndWeather
                  title={'Reunion con pedro'}
                  hour={'2:00 pm'}
                  prediction={'70% de lluvia'}
                  weatherReminder={'¡Lleva tu paraguas!'}
                  weatherImage={require('../../assets/cloudWithRain.png')}
                  cardStyle={styles.enventAndWeatherCard}
                />
              </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    paddingHorizontal: 20,
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
  },
  componentContainer: {
    marginTop: 16,
    gap: 16,
  },
  enventAndWeatherCard: {
    margin: 0,
  }
});