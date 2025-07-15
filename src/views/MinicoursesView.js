import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ProgressCourseCard from '../components/ProgressCourseCardComponent';
import CustomButton from '../components/CustomButtonComponent';
import { greenButtonStyle, titleStyle, secondTitleScreenStyle } from '../theme/Style'

export default function MinicoursesView({navigation}) {
  return (
    <View style={styles.screen}>
        <Text style={secondTitleScreenStyle.secondTitleScreen}>Minicursos Seleccionados</Text>
        <ScrollView>
            <ProgressCourseCard
              title="Curso de manualidades con botellas"
              author="Juan"
              progress={1}
              image={require('../../assets/botellas.png')}
              onPress={() => navigation.navigate('MinicourseProgress')}
          />
          <ProgressCourseCard
              title="Curso de manualidades con cartón"
              author="Juan"
              progress={0.5}
              image={require('../../assets/carton.jpg')}
          />
        </ScrollView>
        
        <CustomButton
          title="Explorar más..."
          style={[greenButtonStyle.greenButton, styles.exploreButton]} 
          onPress={() => navigation.navigate('ExploreMinicourses')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff" ,
    padding: 8
  },
  exploreButton: {
    width: 100,
    alignSelf:'center',
    width: 'fit-content',
    paddingHorizontal: 40,
  },
});