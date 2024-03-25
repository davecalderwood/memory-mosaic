import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Components
import ManageMemories from './screens/ManageMemories';
import RecentMemories from './screens/RecentMemories';
import AllMemories from './screens/AllMemories';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import MemoriesContextProvider from './store/MemoriesContext';
import MemoryDetailScreen from './screens/MemoryDetails';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MemoriesOverview() {
  return <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton icon="add" size={24} color={tintColor} onPress={() => {
          navigation.navigate('ManageMemory')
        }} />
      )
    })}>
    <BottomTabs.Screen
      name="RecentMemories"
      component={RecentMemories}
      options={{
        title: 'Recent Memories',
        tabBarLabel: 'Recent Memories',
        tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
      }}
    />
    <BottomTabs.Screen
      name="AllMemories"
      component={AllMemories}
      options={{
        title: 'All Memories',
        tabBarLabel: 'All Memories',
        tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
      }}
    />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <MemoriesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="MemoriesOverview" component={MemoriesOverview} options={{ headerShown: false }} />
            <Stack.Screen name="MemoryDetail" component={MemoryDetailScreen} options={({ route }) => ({ title: route.params?.selectedMemoryTitle })} />
            <Stack.Screen name="ManageMemory" component={ManageMemories} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MemoriesContextProvider>
    </>
  );
}
