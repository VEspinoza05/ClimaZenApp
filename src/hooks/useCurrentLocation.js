import { useEffect, useState, useContext } from 'react';
import * as Location from 'expo-location';
import { LocationContext } from '../contexts/LocationContext';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locationObj, setLocationObj } = useContext(LocationContext);

  useEffect(() => {
    if (locationObj) {
      setLoading(false)
      setLocation(locationObj.coordinates)
      return
    };

    (async () => {
      try {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, [locationObj]);

  return { location, errorMsg, loading };
}
