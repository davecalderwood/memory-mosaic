import { Text } from 'react-native'
import MemoriesOutput from '../components/MemoriesOutput/MemoriesOutput'
import { useContext, useEffect, useState } from 'react';
import { MemoriesContext } from '../store/MemoriesContext';
import { getDateMinusDays } from '../util/date';
import { fetchMemories } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentMemories() {
    const memoriesCtx = useContext(MemoriesContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getMemories() {
            setIsLoading(true);
            try {
                const memories = await fetchMemories();
                memoriesCtx.setMemories(memories);
            } catch (error) {
                setError('Could not fetch memories');
            }
            setIsLoading(false);
        }

        getMemories();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isLoading) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    if (isLoading) {
        return <LoadingOverlay />
    }


    const recentMemories = memoriesCtx.memories.filter((memory) => {
        const today = new Date();
        const dateSevenDays = getDateMinusDays(today, 7);
        return memory.date > dateSevenDays
    })

    return <MemoriesOutput memories={recentMemories} memoryPeriod="Last 7 Days" fallbackText="No Memories registered for the last 7 days" />
}

export default RecentMemories