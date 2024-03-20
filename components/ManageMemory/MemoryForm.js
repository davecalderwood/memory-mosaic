import { StyleSheet, View, Keyboard, Text, Image } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

function MemoryForm({ onCancel, isEditing, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true
        },
        photo: {
            value: defaultValues ? defaultValues.photo : null,
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true
        },
    });

    function inputChangedHandler(inputIdentifier, inputValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: inputValue, isValid: true }
            }
        });
    }

    async function selectPhoto() {
        try {
            // Request permission to access photo library
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access photo library is required.');
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Image picker result:', result);

            // Update inputs state with selected photo URI
            if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
                console.log('Selected photo URI:', result.assets[0].uri);
                setInputs(prevInputs => ({
                    ...prevInputs,
                    photo: result.assets[0].uri,
                }));
            } else {
                console.log('Image selection cancelled or URI not available.');
            }
        } catch (error) {
            console.error('Error selecting photo:', error);
        }
    }

    function submitHandler() {
        const memoryData = {
            title: inputs.title.value,
            photo: inputs.photo,
            description: inputs.description.value,
            // date: new Date(inputs.date.value),
            date: new Date(),
        }

        const titleIsValid = memoryData.title.trim().length > 0;
        const descriptionIsValid = memoryData.description.trim().length > 0;
        const dateIsValid = memoryData.date.toString() !== 'Invalid Date';
        const photoIsValid = memoryData.photo.trim().length > 0;

        if (!titleIsValid || !descriptionIsValid || !photoIsValid) { // add date validation
            setInputs((currentInputs) => ({
                ...currentInputs,
                title: { value: currentInputs.title.value, isValid: titleIsValid },
                description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                date: { value: currentInputs.date.value, isValid: dateIsValid },
                photo: { value: currentInputs.photo.value, isValid: photoIsValid }
            }));
            return;
        }

        onSubmit(memoryData);
    }

    const formIsInvalid = !inputs.title.isValid || !inputs.description.isValid || !inputs.date.isValid

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
            <View style={styles.form}>
                <Input
                    label="Title"
                    invalid={!inputs.title.isValid}
                    textInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, 'title'),
                        value: inputs.title.value,
                        placeholder: "Give your memory a name!"
                    }}
                />

                {/* {inputs.photo && <Image source={{ uri: inputs.photo }} style={styles.photoPreview} />} */}
                {inputs.photo && <Image source={{ uri: isEditing ? inputs.photo.value : inputs.photo }} style={styles.photoPreview} />}

                <Button onPress={selectPhoto} title="Select Photo" />

                <Input
                    label="Description"
                    invalid={!inputs.description.isValid}
                    textInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, 'description'),
                        value: inputs.description.value,
                        placeholder: "Describe the Memory!",
                        multiline: true
                    }} />

                <Input
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value,
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: () => { }
                    }} />

                {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered date</Text>}

            </View>
            {/* </TouchableWithoutFeedback> */}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </ScrollView>
    )
}

export default MemoryForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    photoPreview: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
})