import { Text, View, StyleSheet, ScrollView } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import WeatherStatus from "../components/WeatherStatusComponent";

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
  }
});