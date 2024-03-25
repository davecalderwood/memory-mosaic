import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { MemoriesContext } from '../store/MemoriesContext';

function MemoryDetailScreen({ route, navigation }) {
    const memoriesCtx = useContext(MemoriesContext);
    const memoryId = route.params?.memoryId;
    const selectedMemory = memoriesCtx.memories.find((memory) => memory.id === memoryId);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.photoContainer}>
                {selectedMemory.photo && <Image source={{ uri: selectedMemory.photo }} style={styles.photo} />}
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{selectedMemory.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => navigation.navigate('ManageMemory', { memoryId: memoryId })} />
            </View>
        </ScrollView>
    );
}

export default MemoryDetailScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        paddingVertical: 20,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FFFFFF',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    descriptionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },
    buttonContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
});
