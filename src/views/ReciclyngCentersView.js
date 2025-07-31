import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, {Marker, Circle} from "react-native-maps";
import Slider from '@react-native-community/slider';
import CustomButton from '../components/CustomButtonComponent'
import { useState, useEffect, useContext } from "react";
import { greenButtonStyle } from '../theme/Style'
import { useCurrentLocation } from '../hooks/useCurrentLocation'
import { reverseGeocodeAsync } from "expo-location";
import { LocationContext } from "../contexts/LocationContext";

export default function ReciclyngCentersView({navigation}) {
  const { locationObj, setLocationObj } = useContext(LocationContext);
  const [radiusValue, setRadiusValue] = useState(100);
  const {location, loading, errorMsg} = useCurrentLocation();
  const [markedLocation, setMarkedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false)

  const state = navigation.getState();
  const routes = state.routes;
  const currentRouteIndex = state.index;
  const previousRoute = routes[currentRouteIndex - 1];

  useEffect(() => {
    if (location && !markedLocation) {
      setMarkedLocation(location);
    }
  }, [location]); 

  useEffect(() => {
    (async () => {
      if(!markedLocation) return

      setLoadingAddress(true)

      try {
        const reverseCodedAddress = await reverseGeocodeAsync(markedLocation);
        setAddress(reverseCodedAddress[0].formattedAddress);
        console.log(reverseCodedAddress[0].formattedAddress);
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingAddress(false)
      }
    })();
  },[markedLocation])

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkedLocation({ latitude, longitude });
    console.log('Ubicacion', `lat: ${latitude}, lon: ${longitude}, radius: ${radiusValue}`)
  };

  const handleReturnToEventAdd = () => {
    setLocationObj({
      coordinates: markedLocation,
      radius: radiusValue,
      address: address,
    })

    navigation.goBack()
  }

  if (loading || !location || !markedLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Obteniendo ubicación...</Text>
      </View>
    );
  }

    return(
        <View style={styles.screen}>
            <MapView
              style={styles.map}
              region={{
                ...markedLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={markedLocation}
                draggable
                onDragEnd={handleMarkerDrag}
              />
              <Circle
                center={markedLocation}
                radius={radiusValue}
                strokeWidth={1}
                strokeColor="rgba(0,112,255,0.6)"
                fillColor="rgba(0,112,255,0.2)"
              />
            </MapView>
            <Text style={styles.addressLabel}>{loadingAddress ? 'Cargando...' : address}</Text>
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
                onPress={previousRoute.name === 'EventAdding' ? handleReturnToEventAdd : undefined }
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
  },
  addressLabel: {
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
  }
})