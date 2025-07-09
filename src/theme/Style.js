import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-web";

const backgroundStyle = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

const cardStyle = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        width: '90%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    }
});

const titleStyle = StyleSheet.create({
    title: {
    fontSize: 32,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 16,
    color: '#000',
  },
})

const inputStyle = StyleSheet.create({
    input: {
        borderWidth: 2,
        width: '100%',
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 12,
        marginBottom: 16,
        fontFamily: 'OpenSans_400Regular',
        fontSize: 18,
        color: '#6a6a6a'
    }
})

const greenButtonStyle = StyleSheet.create({
  greenButton: {
    backgroundColor: '#3ca380',
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
})

const logoStyle = StyleSheet.create({
  logo: {
    width: 170,
    height: 150,
  }
})

const checkboxContainerStyle = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
})

const checkboxLabelStyle = StyleSheet.create({
  checkboxLabel: {
    fontSize: 14,   
    fontFamily: 'OpenSans_700Bold',
    color: '#6a6a6a',
  },
})

const checkboxStyle = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
})

const linkStyle = StyleSheet.create({
  link: {
    margin: 8,
  }
})

const secondTitleScreenStyle = StyleSheet.create({
  secondTitleScreen: {
    fontSize: 22,
    fontFamily: 'OpenSans_700Bold',
    textAlign: 'center',
    paddingVertical: 8,
  }
})

export { backgroundStyle,
    cardStyle,
    titleStyle,
    inputStyle,
    greenButtonStyle,
    logoStyle,
    checkboxContainerStyle,
    checkboxLabelStyle,
    checkboxStyle,
    linkStyle,
    secondTitleScreenStyle
};