import { View, Text, StyleSheet } from "react-native";

const IconLabelOptionComponent = ({title, titleStyle, iconContainerStyle, icon}) => {
    return(
        <View style={styles.container}>
            <View style={[styles.iconContainer, iconContainerStyle]}>
                {icon}
            </View>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 4,
        marginRight: 12,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'OpenSans_400Regular',
    }
})

export default IconLabelOptionComponent;