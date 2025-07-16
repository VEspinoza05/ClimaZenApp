import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function ReciclyngCentersView() {
    return(
        <View style={styles.screen}>
            <MapView
                style={styles.map}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  map: {
    width: '100%',
    flex: 1,
  },
})