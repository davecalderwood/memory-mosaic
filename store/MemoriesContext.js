import { createContext, useReducer } from "react";

export const MemoriesContext = createContext({
    memories: [],
    addMemory: ({ title, photo, description }) => { },
    setMemories: (memories) => { },
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
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
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
    const [memoriesState, dispatch] = useReducer(memoriesReducer, []);

    function addMemory(memoryData) {
        dispatch({ type: 'ADD', payload: memoryData });
    }

    function setMemories(memories) {
        dispatch({ type: 'SET', payload: memories })
    }

    function deleteMemory(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateMemory(id, memoryData) {
        dispatch({ type: 'UPDATE', payload: { id, data: memoryData } })
    }

    const value = {
        memories: memoriesState,
        setMemories: setMemories,
        addMemory: addMemory,
        deleteMemory: deleteMemory,
        updateMemory: updateMemory
    }

    return (
        <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>
    )
}

export default MemoriesContextProvider;