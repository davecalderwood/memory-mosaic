import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";


function MemoryForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true
        },
        photo: '',
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

    function submitHandler() {
        const memoryData = {
            title: inputs.title.value,
            photo: '',
            description: inputs.description.value,
            date: new Date(inputs.date.value),
        }

        const titleIsValid = memoryData.title.trim().length > 0;
        const descriptionIsValid = memoryData.description.trim().length > 0;
        const dateIsValid = memoryData.date.toString() !== 'Invalid Date';

        if (!titleIsValid && !descriptionIsValid && !dateIsValid) {
            setInputs((currentInputs) => {
                return {
                    title: { value: currentInputs.title.value, isValid: titleIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                }
            })
            return;
        }

        onSubmit(memoryData);
    }

    const formIsInvalid = !inputs.title.isValid || !inputs.description.isValid || !inputs.date.isValid

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

                <Input label="Photo" />

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

                <View style={styles.buttons}>
                    <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                    <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    }
})