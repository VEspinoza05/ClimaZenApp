import { View, Text, StyleSheet } from "react-native"
import Checkbox from 'expo-checkbox'

const TaskCardComponent = ({title, hour, isCompleted, onValueChange, cardStyle, useSeparator = false}) => {
    return (
        <View style={[styles.card, cardStyle]}>
            <View style={styles.row}>
                <Checkbox
                    style={styles.checkbox}
                    value={isCompleted}
                    onValueChange={onValueChange}
                />
                <View style={[styles.textContainer, useSeparator ? styles.bottomBorder : undefined]}>
                    <Text style={[styles.title, isCompleted ? styles.strikethroughText : undefined ]} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                    <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{hour}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#6a6a6a',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBorder: {
    borderBottomColor: '#6a6a6a',
    borderBottomWidth: 2,
    paddingBottom: 12,
  },
  checkbox: {
    marginRight: 10,
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular',
    color: '#6a6a6a',
  },
});

export default TaskCardComponent;