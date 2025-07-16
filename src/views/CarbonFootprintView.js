import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import CarbonFootprintComponent from "../components/CarbonFootprintComponent";
import TaskCardComponent from "../components/TaskCardComponent";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CarbonFootprintView() {
    const DATA = [
      {id: 1, title: 'Preparar cena sin carne', hour: '6:00 pm', isCompleted: false},
      {id: 2, title: 'Usar la lavadora con carga completa xxxxxxxxxxxxxxxxxxxxx', hour: '4:00 pm', isCompleted: true},
      {id: 3, title: 'Plantar 1 arbol en mi patio', hour: '2:00 pm', isCompleted: true},
      {id: 4, title: 'Plantar 1 arbol en mi patio', hour: '2:00 pm', isCompleted: true},
      {id: 5, title: 'Plantar 1 arbol en mi patio', hour: '2:00 pm', isCompleted: true},
      {id: 6, title: 'Plantar 1 arbol en mi patio xxxxxxxxxx', hour: '2:00 pm', isCompleted: true},
    ]

    return(
        <View style={styles.screen}>
            <FlatList style={{paddingHorizontal: 20}}
              ListHeaderComponent={() => (
                <View>
                  <View style={styles.componentContainer}>
                      <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Más Eventos</Text>
                      <CarbonFootprintComponent
                          completedActivities={2}
                          totalActivities={4}
                          cardStyle={{margin: 0}}
                      />
                  </View>
                  <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.taskListTitle]}>Lista de ecotareas</Text>
                </View>
                )}

              renderItem={({item, index}) => (
                <TaskCardComponent
                  title={item.title}
                  hour={item.hour}
                  isCompleted={item.isCompleted}
                  cardStyle={[
                    styles.verticalBorders,
                    styles.enventAndWeatherCard,
                    (
                      index === 0 ? styles.firstItemBorder : 
                      index === DATA.length - 1 ? styles.lastItemBorder :
                      styles.noTopAndBottomBorders
                    ),
                    index !== DATA.length - 1 ? styles.noUsePaddingBottom : undefined,
                  ]}

                  useSeparator={index === DATA.length - 1 ? false : true}
                />
              )}
              
              data={DATA}

              keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addButton}>
              <FontAwesome name='plus' size={27} color={'white'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
  },
  componentContainer: {
    marginTop: 16,
    gap: 16,
  },
  taskListTitle: {
    textAlign: 'left',
    marginVertical: 16,
    paddingVertical: 0,
  },
  verticalBorders: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: '#6a6a6a',
    borderRightColor: '#6a6a6a',
  },
  firstItemBorder: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderTopColor: '#6a6a6a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  lastItemBorder: {
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderBottomColor: '#6a6a6a',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 100,
  },
  noTopAndBottomBorders: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  noUsePaddingBottom: {
    paddingTop: 12,
    paddingBottom: 0,
    paddingHorizontal: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3ca380',
    borderRadius: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})