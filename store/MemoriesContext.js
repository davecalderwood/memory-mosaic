import { createContext, useReducer } from "react";

const DUMMY_DATA = [
    {
        id: 1,
        title: 'Photo 1',
        photo: null,
        description: 'Description of the first photo',
        date: new Date('2024-02-21')
    },
    {
        id: 2,
        title: 'Photo 2',
        photo: null,
        description: 'Description of the second photo. This is an example of a long description of our trip. Here we can see what it looks like when the description is super long. Description of the second photo. This is an example of a long description of our trip. Here we can see what it looks like when the description is super long.',
        date: new Date('2024-03-19')
    },
    {
        id: 3,
        title: 'Photo 3',
        photo: null,
        description: 'Description of the third photo',
        date: new Date('2024-03-20')
    },
]

export const MemoriesContext = createContext({
    memories: [],
    addMemory: ({ title, photo, description }) => { },
    deleteMemory: (id) => { },
    updateMemory: (id, { title, photo, description }) => { },
});

function generateGUID() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function memoriesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = generateGUID()
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableMemoryIndex = state.findIndex((memory) => memory.id === action.payload.id);
            const updatableMemory = state[updatableMemoryIndex];
            const updatedMemory = { ...updatableMemory, ...action.payload.data }
            const updatedMemories = [...state];
            updatedMemories[updatableMemoryIndex] = updatedMemory
            return updatedMemories;
        case 'DELETE':
            return state.filter((memory) => memory.id !== action.payload)
        default:
            return state;
    }
}

function MemoriesContextProvider({ children }) {
    const [memoriesState, dispatch] = useReducer(memoriesReducer, DUMMY_DATA);

    function addMemory(memoryData) {
        dispatch({ type: 'ADD', payload: memoryData });
    }

    function deleteMemory(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateMemory(id, memoryData) {
        dispatch({ type: 'UPDATE', payload: { id, data: memoryData } })
    }

    const value = {
        memories: memoriesState,
        addMemory: addMemory,
        deleteMemory: deleteMemory,
        updateMemory: updateMemory
    }

    return (
        <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>
    )
}

export default MemoriesContextProvider;