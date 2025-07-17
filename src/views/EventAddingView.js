import { View, StyleSheet, TextInput, Button, Text, Pressable } from "react-native";
import { inputStyle } from "../theme/Style"
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

export default function EventAddingView() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isDateSetted, setIsDateSetted] = useState(false)

    const onChange = (event, selectedDate) => {
        setShow(false);

        if (event?.type === 'dismissed' && !isDateSetted) {
            return;
        }
        
        setIsDateSetted(true);
        setDate(selectedDate);
    };

    return(
        <View style={styles.screen}>
            <TextInput 
                multiline={true}
                placeholder="Titulo"
                style={[inputStyle.input, styles.titleInput]}
            />
            <Pressable style={[inputStyle.input, styles.timeInput]} onPress={() => setShow(true)} >
                <FontAwesome name='calendar' size={24} color={isDateSetted ? 'black' : '#6a6a6a'} />
                <Text style={[styles.pressableLabel, isDateSetted ? {color: 'black'} : undefined]}>
                    {isDateSetted ? date.toDateString() : 'Fecha'}
                </Text>
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
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
  }
})