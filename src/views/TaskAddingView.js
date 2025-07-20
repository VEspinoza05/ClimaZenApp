import { View, StyleSheet, TextInput, FlatList, Pressable, Text, TouchableOpacity, Alert } from "react-native";
import { inputStyle, secondTitleScreenStyle } from "../theme/Style"
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

export default function TaskAddingView() {
    const suggestedTasks = [
        'Plantar 1 árbol en mi patio',
        'Instalar bombillos LED',
        'Comprar ropa de segunda mano',
    ]

    const DATA = [
        ...suggestedTasks,
        'Ver mas tareas...',
    ]

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [showDateSelector, setShowDateSelector] = useState(false)
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
                        <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Tareas Sugeridas</Text>
                    </View>
                )}

                data={DATA}

                renderItem={({item, index}) => (
                    <View
                        style={[
                        styles.verticalBorders,
                        styles.paddingItemContainer,
                        index === 0 ? styles.firstItemBorder : undefined,
                        index === DATA.length - 1 ? styles.lastItemBorder : undefined,
                        ]}
                    >
                        <TouchableOpacity
                            style={[styles.touchableContainer, index !== DATA.length - 1 ? styles.separatorLine : undefined,]}
                            onPress={() => index === DATA.length - 1 ?
                                Alert.alert("La ultima opcion abre la lista de tareas sugeridas") :
                                Alert.alert("Tarea sugerida")
                            }
                        >
                            <Text style={styles.textItem}>
                                {item}
                            </Text>
                            {index === DATA.length - 1 ? <AntDesign name="rightcircle" size={24} color="black" /> : undefined}
                        </TouchableOpacity>
                    </View>
                )}
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
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  verticalBorders: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: '#6a6a6a',
    borderRightColor: '#6a6a6a',
  },
  firstItemBorder: {
    borderTopWidth: 2,
    borderTopColor: '#6a6a6a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItemBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#6a6a6a',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  noTopAndBottomBorders: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  paddingItemContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  separatorLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#6a6a6a',
  },
  textItem: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    textAlignVertical: 'center'
  },
  touchableContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingBottom: 12
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
    marginBottom: 16,
  },
})