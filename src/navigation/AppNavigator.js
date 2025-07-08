import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from '../views/WelcomeView';
import LoginView from '../views/LoginView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeView} />
      <Stack.Screen name="Login" component={LoginView} />
    </Stack.Navigator>
  );
}
