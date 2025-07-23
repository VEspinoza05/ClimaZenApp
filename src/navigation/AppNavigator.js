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
import MinicourseProgressView from '../views/MinicourseProgressView';
import EventAddingView from '../views/EventAddingView';
import TaskAddingView from '../views/TaskAddingView';
import SuggestedTasksView from '../views/SuggestedTasksView';
import LessonView from '../views/LessonView';
import MinicourseDetailsView from '../views/MinicourseDetailsView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ 
        headerShown: false,
        headerStyle: { backgroundColor: '#3ca380', }, 
        headerTitleStyle: {
          fontFamily: 'OpenSans_800ExtraBold',
          fontSize: 27,
        }, 
        headerTintColor: 'white', 
      }}
    >
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
        }}
      />
      <Stack.Screen
        name="MinicourseProgress"
        component={MinicourseProgressView}
        options={{
          headerShown: true,
          title: 'Minicursos'
        }}
      />
      <Stack.Screen name="EventAdding"
        component={EventAddingView}
        options={{ 
          headerShown: true,
          title: 'Agregar Evento'
        }}
      />
      <Stack.Screen
        name='TaskAdding'
        component={TaskAddingView}
        options={{
          headerShown: true,
          title: 'Agregar Tarea'
        }}
      />
      <Stack.Screen
        name='SuggestedTasks'
        component={SuggestedTasksView}
        options={{
          headerShown: true,
          title: 'Tareas Sugeridas'
        }}
      />
      <Stack.Screen
        name='Lesson'
        component={LessonView}
        options={{
          headerShown: true,
          title: 'Aprendizaje'
        }}
      />
      <Stack.Screen
        name='MinicourseDetails'
        component={MinicourseDetailsView}
        options={{
          headerShown: true,
          title: 'Aprendizaje'
        }}
      />
    </Stack.Navigator>
  );
}
