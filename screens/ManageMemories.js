import { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles';
import { View, StyleSheet } from 'react-native';
import { MemoriesContext } from '../store/MemoriesContext';
import MemoryForm from '../components/ManageMemory/MemoryForm';
import { deleteMemory, storeMemory, updateMemory } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageMemories({ route, navigation }) {
    const memoriesCtx = useContext(MemoriesContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const editedMemoryId = route.params?.memoryId;
    const isEditing = !!editedMemoryId;

    const selectedMemory = memoriesCtx.memories.find((memory) => memory.id === editedMemoryId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Memory' : 'Add Memory'
        })
    }, [navigation, isEditing]);

    async function deleteMemoryHandler() {
        setIsSubmitting(true);
        try {
            await deleteMemory(editedMemoryId);
            memoriesCtx.deleteMemory(editedMemoryId);
            setIsSubmitting(false);
            navigation.navigate('MemoriesOverview');
        } catch (error) {
            setError('Error while trying to delete a memory');
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(memoryData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                if (memoryData.photo) {
                    const photoUri = memoryData.photo;
                    memoryData.photo = photoUri;
                }
                memoriesCtx.updateMemory(editedMemoryId, memoryData);
                await updateMemory(editedMemoryId, memoryData);
            } else {
                if (memoryData.photo) {
                    const photoUri = memoryData.photo;
                    memoryData.photo = photoUri;
                }
                const id = await storeMemory(memoryData);
                memoriesCtx.addMemory({ ...memoryData, id: id });
            }
            // navigation.goBack();
            navigation.navigate('MemoriesOverview');
        } catch (error) {
            setError('Could not save data - please try again later');
            setIsSubmitting(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    if (isSubmitting) {
        return <LoadingOverlay />
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