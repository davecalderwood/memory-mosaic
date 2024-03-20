import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles';
import { View, StyleSheet } from 'react-native';
import Button from '../components/UI/Button';
import { MemoriesContext } from '../store/MemoriesContext';

function ManageMemories({ route, navigation }) {
    const memoriesCtx = useContext(MemoriesContext);

    const editedMemoryId = route.params?.memoryId;
    const isEditing = !!editedMemoryId;

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

    function confirmHandler() {
        if (isEditing) {
            memoriesCtx.updateMemory(editedMemoryId, { title: 'Updated Title', description: 'Updated Description', photo: '', date: new Date() });
        } else {
            memoriesCtx.addMemory({ title: 'Title', photo: '', description: 'Description', date: new Date() });
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})