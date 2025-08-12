import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Pressable } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import WeatherStatus from "../components/WeatherStatusComponent";
import EventAndWeather from '../components/EventAndWeatherComponent';
import { getWeatherFromSupabase } from "../services/WeatherService";
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { GetAllEvents } from '../services/EventsService';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { inputStyle } from "../theme/Style"
import { useFocusEffect } from '@react-navigation/native';

export default function WeatherView({navigation}) {
  const [weatherData, setWeatherData] = useState(null);
  const {location, loading, errorMsg} = useCurrentLocation();
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [nextEvent, setNextEvent] = useState(null)
  const lastFetchRef = useRef(null);

  const fetchEvents = useCallback(async () => {
    const now = Date.now();
    if (lastFetchRef.current && now - lastFetchRef.current < 500) {
      return;
    }
    lastFetchRef.current = now;

    setLoadingEvents(true);
    const eventsList = await GetAllEvents(currentDate);
    setEvents(eventsList);
    setLoadingEvents(false);
  }, [currentDate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );

  useEffect(() => {
    (() => {
      const today = new Date()
      if(events && currentDate.getDate() === today.getDate()) {
        const nearestEvent = getItemWithNearestTime(events)
        setNextEvent(nearestEvent)
      }
    })()
  }, [events])

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

  function convertToHourInMinutes(hourStr) {
    const [hh, mm] = hourStr.split(":").map(Number);
    return hh * 60 + mm;
  }

  function getItemWithNearestTime(list) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nearest = null;
    let smallerDifference = Infinity;

    for (const item of list) {
      const itemMinutes = convertToHourInMinutes(item.time);
      const difference = Math.abs(itemMinutes - currentMinutes);

      if(currentMinutes > itemMinutes) continue

      if (difference < smallerDifference) {
        smallerDifference = difference;
        nearest = item;
      }
    }

    return nearest;
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
              <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Proximo Evento de hoy</Text>
              {loadingEvents && !nextEvent ? (
                <ActivityIndicator size="large" color="#007aff" />
              ) : !nextEvent ? (
                <Text>No hay evento disponible</Text>
              ) : (
                <EventAndWeather
                  title={nextEvent.title}
                  hour={convert24to12Hour(nextEvent.time)}
                  prediction={nextEvent.weatherCondition ? nextEvent.weatherCondition.text : 'Sin datos. Ubicacion no especificada'}
                  weatherReminder={nextEvent.weatherCondition ? nextEvent.weatherCondition.reminder : 'Sin datos. Ubicacion no especificada'}
                  weatherImage={nextEvent.weatherCondition ? {uri: 'https:' + nextEvent.weatherCondition.icon} : null}
                  cardStyle={styles.enventAndWeatherCard}
                />
              )
              }
            </View>
            <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.moreEventsTitle]}>Más Eventos</Text>
            <Pressable style={[inputStyle.input, styles.dateInput]}
              onPress={() => setShowDateSelector(true)}
            >
              <FontAwesome name='calendar' size={24} color='#6a6a6a' />
              <Text style={[styles.pressableLabel, {color: 'black'} ]}>
                {currentDate.toLocaleDateString('es-ES')}
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
            onPress={() => navigation.navigate('EventAdding', item)}
            hour={convert24to12Hour(item.time)}
            prediction={item.weatherCondition ? item.weatherCondition.text : 'Sin datos. Ubicacion no especificada'}
            weatherReminder={item.weatherCondition ? item.weatherCondition.reminder : 'Sin datos. Ubicacion no especificada'}
            weatherImage={item.weatherCondition ? {uri: 'https:' + item.weatherCondition.icon} : null}
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