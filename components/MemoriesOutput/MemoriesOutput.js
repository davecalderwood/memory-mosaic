import { StyleSheet, View, Text } from "react-native";
import MemoriesList from "./MemoriesList";
import MemoriesSummary from "./MemoriesSummary";
import { GlobalStyles } from "../../constants/styles";

function MemoriesOutput({ memories, memoryPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (memories.length > 0) {
        content = <MemoriesList memories={memories} />
    }

    return (
        <View style={styles.container}>
            <MemoriesSummary memories={memories} periodName={memoryPeriod} />
            {content}
        </View>
    )
}

export default MemoriesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})