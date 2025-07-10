import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from '../views/WelcomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import TabNavigator from './TabNavigator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ExploreMinicoursesView from '../views/ExploreMinicoursesView';
import { View, TouchableOpacity } from 'react-native';
import EmergencyContactsView from '../views/EmergencyContactsView';
import ProfileView from '../views/ProfileView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="ExploreMinicourses" 
        component={ExploreMinicoursesView}
        options={{ 
          headerShown: true,
          title: 'Más Cursos',
          headerStyle: { backgroundColor: '#3ca380' },
          headerTintColor: 'white', 
          headerRight: () => (
            <View>
              <TouchableOpacity>
                <FontAwesome name='search' size={27} color={'white'}/>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsView}
        options={{ 
          headerShown: true,
          title: 'Numeros emergencia'
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileView}
        options={{ 
          headerShown: true,
          title: 'Perfil',
          headerStyle: { backgroundColor: '#3ca380' },
          headerTintColor: 'white', 
        }}
      />
    </Stack.Navigator>
  );
}
