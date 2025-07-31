import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './src/hooks/useAuth';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold, OpenSans_800ExtraBold } from '@expo-google-fonts/open-sans'
import { LocationProvider } from './src/contexts/LocationContext';

export default function App() {
  const { session, loading } = useAuth();

  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LocationProvider>
      <AppNavigator session={session} />
    </LocationProvider>
  );
}
