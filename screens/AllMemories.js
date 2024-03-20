import { useContext } from 'react'
import MemoriesOutput from '../components/MemoriesOutput/MemoriesOutput'
import { MemoriesContext } from '../store/MemoriesContext'

function AllMemories() {
    const memoriesCtx = useContext(MemoriesContext);

    return <MemoriesOutput memories={memoriesCtx.memories} memoryPeriod="All" fallbackText="No Memories Saved" />
}

export default AllMemories