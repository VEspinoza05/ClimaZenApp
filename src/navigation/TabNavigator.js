import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';
import MinicoursesView from '../views/MinicoursesView';
import Entypo from '@expo/vector-icons/Entypo';
import HomeView from '../views/HomeView'

const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}) {
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#3ca380', }, 
          headerTitleStyle: {
            fontFamily: 'OpenSans_800ExtraBold',
            fontSize: 27,
          }, 
          headerTintColor: 'white',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily:'OpenSans_400Regular',
          },
          tabBarActiveTintColor: '#3ca380',
          tabBarInactiveTintColor: '#6a6a6a' 
        }}
    >
      <Tab.Screen 
        name='Home'
        component={HomeView}
        options={{
          title: 'Minicursos', 
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 20, marginRight: 16, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('EmergencyContacts')}>
                <Entypo name="phone" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Entypo name="user" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
          }}
      />
      <Tab.Screen 
        name='Minicourses'
        component={MinicoursesView}
        options={{
          title: 'Minicursos', 
          tabBarIcon: ({color, size}) => (
            <FontAwesome name='graduation-cap' size={size} color={color}/>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <TouchableOpacity>
                <FontAwesome name='search' size={27} color={'white'}/>
              </TouchableOpacity>
            </View>
          ),
          }}
      />
    </Tab.Navigator> 
  );
}