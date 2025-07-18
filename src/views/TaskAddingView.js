import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { inputStyle } from "../theme/Style"

export default function TaskAddingView() {
    const DATA = []
    
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
})