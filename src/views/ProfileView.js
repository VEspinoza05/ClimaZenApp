import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButtonComponent'
import { greenButtonStyle } from '../theme/Style';
import IconLabelOption from '../components/IconLabelOptionComponent'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProfileView = () => {
  return (
    <View style={styles.displayContainer}>
      <View style={styles.optionsContainer}>
        <View style={styles.alignmentContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/profilePlaceholder.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.username}>José Pérez</Text>

        <View style={{gap:16}}>
          <IconLabelOption 
            title={"Editar Perfil"}
            icon={<MaterialCommunityIcons name="account-edit" size={36} color="white" />}
            iconContainerStyle={[styles.circleIconContainer, styles.normalIconColor]}
            titleStyle={styles.optionLabel}
          />

          <IconLabelOption 
            title={"Cambiar contraseña"}
            icon={<MaterialCommunityIcons name="lock" size={36} color="white" />}
            iconContainerStyle={[styles.circleIconContainer, styles.normalIconColor]}
            titleStyle={styles.optionLabel}
          />

          <IconLabelOption 
            title={"Eliminar cuenta"}
            icon={<MaterialCommunityIcons name="trash-can" size={36} color="white" />}
            iconContainerStyle={[styles.circleIconContainer, styles.deleteIconColor]}
            titleStyle={styles.optionLabel}
          />
        </View>
      </View>
      <CustomButton title="Cerrar sesion" style={greenButtonStyle.greenButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  circleIconContainer: {
    borderRadius: '50%',
  },
  normalIconColor: {
    backgroundColor: '#3ca380'
  },
  deleteIconColor: {
    backgroundColor: '#ff3131'
  },
  optionLabel: {
    fontSize: 20,
  },
  displayContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  alignmentContainer: {
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#888',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3ca380',
    borderRadius: '50%',
    padding: 6,
  },
  username: {
    fontSize: 26,
    fontFamily: 'OpenSans_700Bold',
    textAlign: 'center',
    marginVertical: 16,
  }
});

export default ProfileView;
