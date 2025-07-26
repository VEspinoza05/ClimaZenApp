import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, {Marker, Circle} from "react-native-maps";
import Slider from '@react-native-community/slider';
import CustomButton from '../components/CustomButtonComponent'
import { useState, useEffect } from "react";
import { greenButtonStyle } from '../theme/Style'
import * as Location from "expo-location";
import React from "react";

export default function ReciclyngCentersView({navigation}) {
  const [radiusValue, setRadiusValue] = useState(0);
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  const state = navigation.getState();
  const routes = state.routes;
  const currentRouteIndex = state.index;
  const previousRoute = routes[currentRouteIndex - 1];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita el permiso de ubicación para usar esta función.');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Obteniendo ubicación...</Text>
      </View>
    );
  }

  console.log('Ubicacion', `lat: ${location.latitude}, lon: ${location.latitude}, radius: ${radiusValue}`)

    return(
        <View style={styles.screen}>
            <MapView
              style={styles.map}
              region={{
                ...location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={location}
                draggable
                onDragEnd={handleMarkerDrag}
              />
              <Circle
                center={location}
                radius={radiusValue}
                strokeWidth={1}
                strokeColor="rgba(0,112,255,0.6)"
                fillColor="rgba(0,112,255,0.2)"
              />
            </MapView>
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
            <CustomButton
                title={previousRoute.name === 'EventAdding' ? 'Seleccionar' : 'Recordarme reciclar' }
                style={[greenButtonStyle.greenButton, styles.reminderButton]}
                onPress={() => {
                  if(previousRoute.name === 'EventAdding') {
                    navigation.goBack();
                  }
                }}
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
  reminderButton: {
    marginVertical: 0,
  }
})