import { Text, SectionList, View, Image, StyleSheet } from "react-native"
import { secondTitleScreenStyle } from '../theme/Style'
import MinicourseSectionItemComponent from "../components/MinicourseSectionItemComponent"

export default function MinicourseProgressView({navigation}) {
    const DATA = [
      {
        sectionName: 'Introducción',
        data: [
          {id: 1, title: 'Como funciona este curso', isCompleted: true, },
          {id: 2, title: 'Que se espera aprender', isCompleted: true, },
        ],
      },
      {
        sectionName: 'Lo básico',
        data: [
          {id: 3, title: 'Como hacer lapicera de botella', isCompleted: true, },
          {id: 4, title: 'Como hacer carrito de botella', isCompleted: true, },
          {id: 5, title: 'Como hacer avioncito de botella', isCompleted: false, },
        ],
      },
    ]

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

              renderSectionHeader={({section: {sectionName}}) => (
                <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.sectionTitle]}>{sectionName}</Text>
              )}

              renderItem={({item, index, section}) => (

                <MinicourseSectionItemComponent
                  title={item.title}
                  isCompleted={item.isCompleted}
                  useCheckBox={true}
                  cardStyle={[
                    styles.verticalBorders,
                    (
                      index === 0 ? styles.firstItemBorder : 
                      index === section.data.length - 1 ? styles.lastItemBorder :
                      styles.noTopAndBottomBorders
                    ),
                    index !== section.data.length - 1 ? styles.noUsePaddingBottom : undefined,
                    
                  ]}
                  useSeparator={index === section.data.length - 1 ? false: true}
                />
              )}

              keyExtractor={(item, index) => item.id + index}

              sections={DATA}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    paddingVertical: 20,
  },
  homeTitleScreen: {
    textAlign: 'left',
    paddingVertical: 0,
  },
  sectionTitle: {
    textAlign: 'left',
    paddingVertical: 0,
    marginVertical: 16,
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
    gap: 8,
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
})