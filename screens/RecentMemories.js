import { Text } from 'react-native'
import MemoriesOutput from '../components/MemoriesOutput/MemoriesOutput'
import { useContext } from 'react';
import { MemoriesContext } from '../store/MemoriesContext';
import { getDateMinusDays } from '../util/date';

function RecentMemories() {
    const memoriesCtx = useContext(MemoriesContext);

    const recentMemories = memoriesCtx.memories.filter((memory) => {
        const today = new Date();
        const dateSevenDays = getDateMinusDays(today, 7);
        return memory.date > dateSevenDays
    })

    return <MemoriesOutput memories={recentMemories} memoryPeriod="Last 7 Days" fallbackText="No Memories registered for the last 7 days" />
}

export default RecentMemories