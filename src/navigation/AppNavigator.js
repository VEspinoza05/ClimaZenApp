import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={() => (<Text>This is the welcome view</Text>)} />
    </Stack.Navigator>
  );
}
