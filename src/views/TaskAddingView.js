import { View, StyleSheet, TextInput, FlatList, Pressable, Text } from "react-native";
import { inputStyle } from "../theme/Style"
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

export default function TaskAddingView() {
    const DATA = []

    const [date, setDate] = useState(new Date());
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false)

    const onChangeDateSelector = (event, selectedDate) => {
        setShowDateSelector(false);

        if (event?.type === 'dismissed' && !isDateSelected) {
            return;
        }
        
        setIsDateSelected(true);
        setDate(selectedDate);
    };
    
    return(
        <View style={styles.screen}>
            <FlatList
                ListHeaderComponent={() => (
                    <View>
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
                    </View>
                )}

                data={DATA}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    titleInput: {
        height: 100,
        textAlignVertical: 'top',
        color: '#000000',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressableLabel: {
    fontSize: 18,   
    fontFamily: 'OpenSans_400Regular',
    color: '#6a6a6a',
  },
})