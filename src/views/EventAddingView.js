import { View, StyleSheet, TextInput, Button, Text, Pressable } from "react-native";
import { inputStyle } from "../theme/Style"
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useContext, useEffect } from "react";
import CustomButtonComponent from "../components/CustomButtonComponent";
import { LocationContext } from "../contexts/LocationContext";
import { EventModel } from "../models/EventModel";
import { CreateEvent, UpdateEvent } from "../services/EventsService";
import { useAuth } from "../hooks/useAuth";

export default function EventAddingView({navigation, route}) {
    const event = route.params
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState( new Date() )
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [showTimeSelector, setShowTimeSelector] = useState(false)
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [isTimeSelected, setIsTimeSelected] = useState(false)
    const { locationObj, setLocationObj } = useContext(LocationContext);
    const { session, loading } = useAuth()

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }

    useEffect(() => {
      if(event) {
        setTitle(event.title)
        setDate(new Date(event.date))
        setIsDateSelected(true)
        setTime(new Date(`${event.date}T${event.time.split('-')[0]}`))
        setIsTimeSelected(true)
        setLocationObj(event.latitude ?
          {
            coordinates: { latitude: event.latitude, longitude: event.longitude },
            radius: event.radius,
            address: event.address
          } : null
        )
      }
    },[event])

    useEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        setLocationObj(null)
      });

      return unsubscribe;
    }, [navigation]);

    const handleGoToLocationPicker = () => {
      navigation.navigate('LocationPicker')
    }

    const onChangeDateSelector = (event, selectedDate) => {
        setShowDateSelector(false);

        if (event?.type === 'dismissed' && !isDateSelected) {
            return;
        }
        
        setIsDateSelected(true);
        setDate(selectedDate);
    };

    const onChangeTimeSelector = (event, selectedTime) => {
        setShowTimeSelector(false);

        if (event?.type === 'dismissed' && !isTimeSelected) {
            return;
        }
        
        setIsTimeSelected(true);
        
        setTime(selectedTime);
    };

    const handleSubmit = async () => {
      if(!event) {
        const newEvent = new EventModel({
          title: title,
          date: date,
          time: getCurrentTimeWithTimezone(time),
          user_id:  session.user.id,
          latitude: locationObj ? locationObj.coordinates.latitude : null,
          longitude: locationObj ? locationObj.coordinates.longitude : null,
          radius: locationObj ? locationObj.radius : null,
          address: locationObj ? locationObj.address : null,
        })

        await CreateEvent(newEvent)
      } else {
        const updatedEvent = new EventModel({
          id: event.id,
          title: title,
          date: date,
          time: getCurrentTimeWithTimezone(time),
          latitude: locationObj ? locationObj.coordinates.latitude : null,
          longitude: locationObj ? locationObj.coordinates.longitude : null,
          radius: locationObj ? locationObj.radius : null,
          address: locationObj ? locationObj.address : null,
        })

        await UpdateEvent(updatedEvent)
      }
    }

    function getCurrentTimeWithTimezone(date) {
      const time = date.toTimeString().split(' ')[0];
      const tzOffset = getTimezoneOffsetString();
      return `${time}${tzOffset}`;
    }

    function getTimezoneOffsetString() {
      const offset = new Date().getTimezoneOffset();
      const absOffset = Math.abs(offset);
      const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
      const minutes = String(absOffset % 60).padStart(2, '0');
      const sign = offset <= 0 ? '+' : '-';
      return `${sign}${hours}:${minutes}`;
    }

    if (loading || !session) {
      return null
    }

    console.log(JSON.stringify(event))
    console.log(JSON.stringify(locationObj))

    return(
        <View style={styles.screen}>
            <View style={styles.inputsContainer}>
                <TextInput 
                    multiline={true}
                    placeholder="Titulo"
                    style={[inputStyle.input, styles.titleInput]}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <Pressable style={[inputStyle.input, styles.timeInput]} onPress={() => setShowDateSelector(true)} >
                    <FontAwesome name='calendar' size={24} color={isDateSelected ? 'black' : '#6a6a6a'} />
                    <Text style={[styles.pressableLabel, isDateSelected ? {color: 'black'} : undefined]}>
                        {isDateSelected ? date.toDateString() : 'Fecha'}
                    </Text>
                </Pressable>
                {showDateSelector && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDateSelector}
                    />
                )}
                <Pressable style={[inputStyle.input, styles.timeInput]} onPress={() => setShowTimeSelector(true)} >
                    <FontAwesome name='clock-o' size={24} color={isTimeSelected ? 'black' : '#6a6a6a'} />
                    <Text style={[styles.pressableLabel, isTimeSelected ? {color: 'black'} : undefined]}>
                        {isTimeSelected ? `${time.toLocaleTimeString('en-US', timeOptions)}` : 'Hora'}
                    </Text>
                </Pressable>
                {showTimeSelector && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onChangeTimeSelector}
                    />
                )}
                <Pressable
                  style={[inputStyle.input, styles.locationInput]}
                  onPress={handleGoToLocationPicker}
                >
                    <Entypo name="location-pin" size={24} color={'#6a6a6a'} />
                    <Text style={[styles.pressableLabel, (locationObj && {color: 'black'}) ]}>
                      { locationObj ? locationObj.address : 'Ubicación'}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.actionButtonsContainer}>
                <CustomButtonComponent
                    title={'Cancelar'}
                    textStyle={styles.cancelButtonText}
                    style={styles.cancelButton}
                    onPress={() => {
                      navigation.goBack();
                    }}
                />
                <CustomButtonComponent
                    title={'Guardar'}
                    style={styles.disabledSaveButton}
                    textStyle={styles.saveButtonText}
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleInput: {
    height: 100,
    textAlignVertical: 'top',
    color: '#000000',
  },
  pressableLabel: {
    fontSize: 18,   
    fontFamily: 'OpenSans_400Regular',
    color: '#6a6a6a',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#6a6a6a',
    flex: 1,
  },
  cancelButtonText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 18,
    color: '#6a6a6a',
  },
  disabledSaveButton: {
    borderWidth: 2,
    borderColor: '#6a6a6a',
    backgroundColor: '#6a6a6a',
    flex: 1,
  },
  saveButtonText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 18,
    color: 'white',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputsContainer: {
    flex: 1,
  },
})