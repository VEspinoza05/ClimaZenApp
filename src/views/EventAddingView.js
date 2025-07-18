import { View, StyleSheet, TextInput, Button, Text, Pressable } from "react-native";
import { inputStyle } from "../theme/Style"
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import CustomButtonComponent from "../components/CustomButtonComponent";

export default function EventAddingView() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState( new Date() )
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [showTimeSelector, setShowTimeSelector] = useState(false)
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [isTimeSelected, setIsTimeSelected] = useState(false)

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
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

    return(
        <View style={styles.screen}>
            <View style={styles.inputsContainer}>
                <TextInput 
                    multiline={true}
                    placeholder="Titulo"
                    style={[inputStyle.input, styles.titleInput]}
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
                <Pressable style={[inputStyle.input, styles.locationInput]} >
                    <Entypo name="location-pin" size={24} color={'#6a6a6a'} />
                    <Text style={[styles.pressableLabel]}>
                        Ubicación
                    </Text>
                </Pressable>
            </View>
            <View style={styles.actionButtonsContainer}>
                <CustomButtonComponent
                    title={'Cancelar'}
                    textStyle={styles.cancelButtonText}
                    style={styles.cancelButton}
                />
                <CustomButtonComponent
                    title={'Guardar'}
                    style={styles.disabledSaveButton}
                    textStyle={styles.saveButtonText}
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