import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';

import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './UI/HomeScreen';
import ListScreen from './UI/ListScreen';
import PostsScreen from './UI/posts/PostsScreen';
import { ShoppingItem } from './src/types';
import ShoppingItemDetailScreen from './src/screens/shopping/ShoppingItemDetailScreen';
import ShoppingListScreen from './src/screens/shopping/ShoppingListScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  ShoppingItemDetail: { item?: ShoppingItem }; // optional = 新增模式
  Detail: { id: number; title: string };
};

export type TabParamList = {
  ShoppingList: undefined;
  Home: undefined;
  List: undefined;
  Posts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'ShoppingList') {
            iconName = focused ? 'list' : 'list-outline';
          }
          else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'list' : 'list-outline';
          } else {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Posts" component={PostsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ShoppingItemDetail" component={ShoppingItemDetailScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// App 包上 AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

/*
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // App 啟動時檢查是否已有 token
  useEffect(() => {
    const checkToken = async () => {
      const token = await tokenStorage.get();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  // 還在檢查 token，顯示 loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ShoppingItemDetail" component={ShoppingItemDetailScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {() => <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
*/