import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
        initialRouteName="PantallaA"
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
        name="PantallaB"
        component={() => (<Text>PantallaB</Text>)}
        options={{
          title: 'Pantalla B', 
          tabBarIcon: ({color, size}) => (
            <AntDesign name="stepbackward" size={size} color={color}/>
          )
          }}
      />
    </Tab.Navigator> 
  );
}