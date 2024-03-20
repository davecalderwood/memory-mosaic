import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles';
import { View, StyleSheet } from 'react-native';
import { MemoriesContext } from '../store/MemoriesContext';
import MemoryForm from '../components/ManageMemory/MemoryForm';

function ManageMemories({ route, navigation }) {
    const memoriesCtx = useContext(MemoriesContext);

    const editedMemoryId = route.params?.memoryId;
    const isEditing = !!editedMemoryId;

    const selectedMemory = memoriesCtx.memories.find((memory) => memory.id === editedMemoryId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Memory' : 'Add Memory'
        })
    }, [navigation, isEditing]);

    function deleteMemoryHandler() {
        memoriesCtx.deleteMemory(editedMemoryId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(memoryData) {
        if (isEditing) {
            memoriesCtx.updateMemory(editedMemoryId, memoryData);
        } else {
            memoriesCtx.addMemory(memoryData);
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <MemoryForm
                onCancel={cancelHandler}
                isEditing={isEditing}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={selectedMemory}
            />
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteMemoryHandler} />
                </View>
            }
        </View>
    )
}

export default ManageMemories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})