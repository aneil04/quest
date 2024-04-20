import React from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/home';
import LeaderboardPage from '../pages/leaderboard';
import ProfilePage from '../pages/profile';

import {
  HomeIcon as HomeIconSolid,
  TrophyIcon as TrophyIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  QuestionMarkCircleIcon
} from "react-native-heroicons/solid";
import {
  HomeIcon as HomeIconOutline,
  TrophyIcon as TrophyIconOutline,
  UserCircleIcon as UserCircleIconOutline,
} from "react-native-heroicons/outline";

const Tab = createBottomTabNavigator();

const UserStack = () => {
  const screenOptions: BottomTabNavigationOptions = {
    headerStyle: {
      backgroundColor: "#151e2b"
    },
    headerTitleStyle: {
      color: "#FFF",
      fontSize: 20
    },
    headerTitleAlign: "center",
    tabBarHideOnKeyboard: true
  }

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return focused ? <HomeIconSolid color={color} size={size} /> : <HomeIconOutline color={color} size={size} />;
        } else if (route.name === 'Leaderboard') {
          return focused ? <TrophyIconSolid color={color} size={size} /> : <TrophyIconOutline color={color} size={size} />;
        } else if (route.name == 'Profile') {
          return focused ? <UserCircleIconSolid color={color} size={size} /> : <UserCircleIconOutline color={color} size={size} />;
        }

        return <QuestionMarkCircleIcon color={color} size={size} />
      },
      tabBarActiveTintColor: '#FFF',
      tabBarInactiveTintColor: '#FFF',
      tabBarStyle: {
        backgroundColor: "#151e2b",
        paddingTop: 10,
      },
      headerShown: false,
    })} initialRouteName='Dashboard'>
      <Tab.Screen name="Home" component={HomePage} options={screenOptions} />
      <Tab.Screen name="Leaderboard" component={LeaderboardPage} options={screenOptions} />
      <Tab.Screen name="Profile" component={ProfilePage} options={screenOptions} />
    </Tab.Navigator>
  );
}

export default UserStack