import { Text, View, StyleSheet, FlatList } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style";
import CarbonFootprintComponent from "../components/CarbonFootprintComponent";

export default function CarbonFootprintView() {
    const DATA = []

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

              data={DATA}
            />
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
})