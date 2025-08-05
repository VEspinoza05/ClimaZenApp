import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Pressable } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import WeatherStatus from "../components/WeatherStatusComponent";
import EventAndWeather from '../components/EventAndWeatherComponent';
import getWeatherFromSupabase from "../services/WeatherService";
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { GetAllEvents } from '../services/EventsService';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { inputStyle } from "../theme/Style"

export default function WeatherView({navigation}) {
  const [weatherData, setWeatherData] = useState(null);
  const {location, loading, errorMsg} = useCurrentLocation();
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showDateSelector, setShowDateSelector] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingEvents(true)
      const eventsList = await GetAllEvents(currentDate)
      setEvents(eventsList)
      setLoadingEvents(false)
    })();
  }, [events, currentDate])

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

  function convert24to12Hour(time24) {
    let [hours, minutes] = time24.split(':').map(Number);
    let period = (hours >= 12) ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${period}`;
  }

  const onChangeDateSelector = (event, selectedDate) => {
    setShowDateSelector(false);

    if (event?.type === 'dismissed' ) {
      return;
    }

    setCurrentDate(selectedDate);
  };

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
            <Pressable style={[inputStyle.input, styles.dateInput]}
              onPress={() => setShowDateSelector(true)}
            >
              <FontAwesome name='calendar' size={24} color='#6a6a6a' />
              <Text style={[styles.pressableLabel, {color: 'black'} ]}>
                {currentDate.toDateString()}
              </Text>
            </Pressable>
              {showDateSelector && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={currentDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDateSelector}
                />
              )}
          </View>
        )}

        renderItem={({item, index}) => (
          <EventAndWeather
            title={item.title}
            hour={convert24to12Hour(item.time)}
            prediction={''}
            weatherReminder={''}
            weatherImage={require('../../assets/cloudWithRain.png')}
            cardStyle={[
              styles.verticalBorders,
              styles.enventAndWeatherCard,
              (
                index === 0 ? styles.firstItemBorder : 
                index === events.length - 1 ? styles.lastItemBorder :
                styles.noTopAndBottomBorders
              ),
              index !== events.length - 1 ? styles.noUsePaddingBottom : undefined,
            ]}
            useSeparator={index === events.length - 1 ? false : true}
          />
        )}

        ListEmptyComponent={() => {
          loadingEvents ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }}

        keyExtractor={item => item.id}

        data={events}
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
  pressableLabel: {
    fontSize: 18,   
    fontFamily: 'OpenSans_400Regular',
    color: '#6a6a6a',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
  },
});