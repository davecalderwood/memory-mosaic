import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Context
import MemoriesContextProvider from './store/MemoriesContext';
import AuthContextProvider from './store/AuthContext';
import { AuthContext } from './store/AuthContext';

// Screens
import ManageMemories from './screens/ManageMemories';
import RecentMemories from './screens/RecentMemories';
import AllMemories from './screens/AllMemories';
import MemoryDetailScreen from './screens/MemoryDetails';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

// Components
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MemoriesOverview() {
  const { logout } = useContext(AuthContext);
  return <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerLeft: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={() => logout()} />,
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

function AuthStack() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MemoriesOverview" component={MemoriesOverview} options={{
            headerShown: false
          }} />
          <Stack.Screen name="MemoryDetail" component={MemoryDetailScreen} options={({ route }) => ({ title: route.params?.selectedMemoryTitle })} />
          <Stack.Screen name="ManageMemory" component={ManageMemories} options={{ presentation: 'modal' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function Root() {
  const { authenticate } = useContext(AuthContext);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  useEffect(() => {
    // Hide splash screen only when isTryingLogin becomes false
    if (!isTryingLogin) {
      SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null; // Return null to render nothing during the loading process
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto hiding
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <MemoriesContextProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </MemoriesContextProvider>
      </AuthContextProvider>
    </>
  );
}
