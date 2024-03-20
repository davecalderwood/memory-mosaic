import { FlatList } from "react-native";
import MemoryItem from "./MemoryItem";

function renderMemoriesItem(itemData) {
    return <MemoryItem {...itemData.item} />
}

function MemoriesList({ memories }) {
    return <FlatList data={memories} renderItem={renderMemoriesItem} keyExtractor={(item) => item.id} />
}

export default MemoriesList;