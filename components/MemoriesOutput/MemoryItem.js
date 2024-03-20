import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function MemoryItem({ id, title, photo, description, date }) {
    const navigation = useNavigation();

    function memoryPressHandler() {
        navigation.navigate('ManageMemory', {
            memoryId: id
        })
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Pressable onPress={memoryPressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.memory}>
                <Text style={[styles.textBase, styles.title]}>{title}</Text>

                {photo && <Image source={{ uri: photo }} style={styles.photo} />}

                <View style={styles.descriptionContainer}>
                    <Text>{description}</Text>
                </View>

                <Text style={[styles.textBase, styles.date]}>{formattedDate}</Text>
            </View>
        </Pressable>
    );
}

export default MemoryItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5
    },
    memory: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    photo: {
        width: '100%',
        height: 200, // Adjust the height as needed
        marginBottom: 8,
        borderRadius: 6,
    },
    descriptionContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    date: {
        marginTop: 8,
        textAlign: 'right', // Align the date to the right
    },
});
