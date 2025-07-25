import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from '../views/WelcomeView';
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  )
}