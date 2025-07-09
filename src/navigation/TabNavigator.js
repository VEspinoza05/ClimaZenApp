import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';
import MinicoursesView from '../views/MinicoursesView';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
        initialRouteName="Minicourses"
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
        name="PantallaA"
        component={() => (<Text>PantallaA</Text>)} 
        options={{
          title: 'Pantalla A',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="stepforward" size={size} color={color}/>
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