import { Text, SectionList, View, Image, StyleSheet } from "react-native"
import { secondTitleScreenStyle } from '../theme/Style'

export default function MinicourseProgressView({navigation}) {
    const DATA = []

    return(
        <View style={styles.screen}>
            <SectionList style={{paddingHorizontal: 20}}
              ListHeaderComponent={() => (
                <View style={styles.listHeader}> 
                  <Image style={styles.picture} source={require('../../assets/botellas.png')} />
                  <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.homeTitleScreen]}>Curso de manualidades con botellas plásticas</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                  <Text style={styles.paragraph}>Creado por: Juan López</Text>
                  <Text style={styles.paragraph}>3 secciones, 8 lecciones</Text>
                </View>
              )}

              sections={DATA}
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
  paragraph: {
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular',
  },
  picture: {
    width: '100%',
    height: 200,
  },
  listHeader: {
    paddingVertical: 20,
    gap: 8,
  }
})