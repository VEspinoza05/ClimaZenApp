import { SectionList, Text, StyleSheet, TouchableOpacity, View } from "react-native"
import { secondTitleScreenStyle } from "../theme/Style"

export default function SuggestedTasksView({navigation, route}) {
    const DATA = [
        {
            category: 'Movilidad',
            data: [
                {id: 1, name: 'Caminar o usar la bicicleta'},
                {id: 2, name: 'Usar Transporte público'},
                {id: 3, name: 'Compartir coche'}
            ]
        },
        {
            category: 'Consumo alimenticio',
            data: [
                {id: 4, name: 'Reducir el consumo de carne'},
                {id: 5, name: 'Comer productos locales y de temporada'},
                {id: 6, name: 'Reducir el desperdicio de alimentos'}
            ]
        }
    ]

    const sendDataAndGoBack = (data) => {
        route.params.onGoBack(data.name);
        navigation.goBack();
    };

    return(
        <View style={styles.screen}>
            <SectionList
                renderSectionHeader={({section: {category}}) => (
                    <Text style={[secondTitleScreenStyle.secondTitleScreen, styles.sectionTitle]}>{category}</Text>
                )}

                renderItem={({item, index, section}) => (
                    <View
                        style={[
                        styles.verticalBorders,
                        styles.paddingItemContainer,
                        index === 0 ? styles.firstItemBorder : undefined,
                        index === section.data.length - 1 ? styles.lastItemBorder : undefined,
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.touchableContainer,
                                index !== section.data.length - 1 ? styles.separatorLine : undefined
                            ]}
                            onPress={() => sendDataAndGoBack(item)}
                        >
                            <Text style={styles.textItem}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                keyExtractor={(item, index) => item.id + index}

                sections={DATA}

                contentContainerStyle={{
                    paddingHorizontal: 20,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    verticalBorders: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderLeftColor: '#6a6a6a',
        borderRightColor: '#6a6a6a',
    },
    firstItemBorder: {
        borderTopWidth: 2,
        borderTopColor: '#6a6a6a',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    lastItemBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#6a6a6a',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    separatorLine: {
        borderBottomWidth: 2,
        borderBottomColor: '#6a6a6a',
    },
    textItem: {
        fontSize: 14,
        fontFamily: 'OpenSans_400Regular',
        textAlignVertical: 'center'
    },
    touchableContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingBottom: 12
    },
    sectionTitle: {
        textAlign: 'left',
        paddingVertical: 0,
        marginVertical: 16,
    },
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    paddingItemContainer: {
        paddingTop: 12,
        paddingHorizontal: 12,
    },
})