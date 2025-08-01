import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import WeatherStatus from "../components/WeatherStatusComponent";
import EventAndWeather from '../components/EventAndWeatherComponent';
import getWeatherFromSupabase from "../services/WeatherService";
import { useCurrentLocation } from '../hooks/useCurrentLocation';

export default function WeatherView({navigation}) {
  const [weatherData, setWeatherData] = useState(null);
  const {location, loading, errorMsg} = useCurrentLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!location) return; 

        const data = await getWeatherFromSupabase(location.latitude, location.longitude);
        setWeatherData(data);
      } catch (error) {
        console.error('Error al obtener el clima:', error);
      }
    };

    fetchWeather();
  }, [location]);

  const DATA = [
    {id: 1, title:'Reunión Familiar', hour:'7:00 pm', prediction:'0% de lluvia', weatherReminder:'¡Lleva tu Sueter!', imagePath:require('../../assets/halfMoon.png')},
    {id: 2, title:'Reunión Familiar', hour:'8:00 pm', prediction:'0% de lluvia', weatherReminder:'¡Lleva tu Sueter!', imagePath:require('../../assets/halfMoon.png')},
    {id: 3, title:'Reunión Familiar', hour:'9:00 pm', prediction:'0% de lluvia', weatherReminder:'¡Lleva tu Sueter!', imagePath:require('../../assets/halfMoon.png')},
  ]

  return(
    <View style={styles.screen}>
      <FlatList style={{paddingHorizontal: 20}}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.componentContainer}>
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Clima Actual</Text>
              {loading ? (
                <ActivityIndicator size="large" color="#007aff" />
              ) : (
                <WeatherStatus weather={weatherData} />
              )}

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
            <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.moreEventsTitle]}>Más Eventos</Text>
          </View>
        )}

        renderItem={({item, index}) => (
          <EventAndWeather
            title={item.title}
            hour={item.hour}
            prediction={item.prediction}
            weatherReminder={item.weatherReminder}
            weatherImage={item.imagePath}
            cardStyle={[
              styles.verticalBorders,
              styles.enventAndWeatherCard,
              (
                index === 0 ? styles.firstItemBorder : 
                index === DATA.length - 1 ? styles.lastItemBorder :
                styles.noTopAndBottomBorders
              ),
              index !== DATA.length - 1 ? styles.noUsePaddingBottom : undefined,
            ]}
            useSeparator={index === DATA.length - 1 ? false : true}
          />
        )}

        keyExtractor={item => item.id}

        data={DATA}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
  },
  moreEventsTitle: {
    textAlign: 'left',
    marginVertical: 16,
    paddingVertical: 0,
  },
  componentContainer: {
    marginTop: 16,
    gap: 16,
  },
  enventAndWeatherCard: {
    margin: 0,
  },
  verticalBorders: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: '#6a6a6a',
    borderRightColor: '#6a6a6a',
  },
  firstItemBorder: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderTopColor: '#6a6a6a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  lastItemBorder: {
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderBottomColor: '#6a6a6a',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 16,
  },
  noTopAndBottomBorders: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  noUsePaddingBottom: {
    paddingTop: 12,
    paddingBottom: 0,
    paddingHorizontal: 12,
  },
});