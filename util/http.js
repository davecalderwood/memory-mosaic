import axios from "axios";

const BACKEND_URL = 'https://memorymosaic-f633f-default-rtdb.firebaseio.com'

export async function storeMemory(memoryData) {
    const response = await axios.post(
        BACKEND_URL + '/memories.json',
        memoryData
    )
    const id = response.data.name;
    return id;
}

export async function fetchMemories() {
    const response = await axios.get(BACKEND_URL + '/memories.json')

    const memories = [];

    for (const key in response.data) {
        const memoryObj = {
            id: key,
            title: response.data[key].title,
            description: response.data[key].description,
            photo: response.data[key].photo,
            date: new Date(response.data[key].date)
        }

        memories.push(memoryObj);
    }

    return memories;
}

export function updateMemory(id, memoryData) {
    return axios.put(BACKEND_URL + `/memories/${id}.json`, memoryData)
}

export function deleteMemory(id) {
    return axios.delete(BACKEND_URL + `/memories/${id}.json`)
}