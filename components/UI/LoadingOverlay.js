import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay({ message }) {
    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}
export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})