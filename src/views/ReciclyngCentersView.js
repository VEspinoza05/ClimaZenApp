import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Slider from '@react-native-community/slider';
import { useState } from "react";

export default function ReciclyngCentersView() {
    const [radiusValue, setRadiusValue] = useState(0);

    return(
        <View style={styles.screen}>
            <MapView
                style={styles.map}
            />
            <Text style={styles.sliderLabel}>Radio: {radiusValue}</Text>
            <Slider
                style={styles.slider}
                minimumValue={100}
                maximumValue={500}
                step={100}
                value={radiusValue}
                onValueChange={setRadiusValue}
                minimumTrackTintColor='#3ca380'
                maximumTrackTintColor='#6a6a6a'
                thumbTintColor='#3ca380'
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
    gap: 20,
  },
  map: {
    width: '100%',
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
  },
})