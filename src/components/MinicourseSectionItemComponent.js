import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import Checkbox from "expo-checkbox";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MinicourseSectionItemComponent = ({title, cardStyle, onPress, onValueChange, isCompleted, useCheckBox = false, useSeparator = false}) => {
    return(
        <View style={[styles.card, styles.row, cardStyle]}>
            <TouchableOpacity style={[styles.row, {flex: 1}, useSeparator ? styles.separator : undefined]} onPress={onPress}>
                <MaterialCommunityIcons style={styles.iconStyle} name='book-open-page-variant' size={28} color="#6a6a6a" />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            {useCheckBox ? <Checkbox style={styles.checkbox} value={isCompleted} onValueChange={onValueChange}/> : undefined}
        </View>
    )       
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
  },
  iconStyle: {
    marginRight: 10,
  },
  checkbox:{
    marginLeft: 10,
    width: 28,
    height: 28,
    alignSelf: 'flex-start'
  },
  separator: {
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderColor: '#6a6a6a'
  }
})

export default MinicourseSectionItemComponent;