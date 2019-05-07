import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Home from "../pages/Home.js"
import Settings from "../pages/Setting.js"

const tabs = {
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: `Home`,
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: `Settings`,
    }),
  }
}

const options = {
  defaultNavigationOptions: ({ navigation }) => ({
    title:() => getTitleName(navigation),
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
  }
}

const getTitleName = (navigation) => {
  const {routeName} = navigation.state;
  if (routeName === 'Home') {
    title = 'Home'
  } else if (routeName === 'Settings') {
    title = 'Settings'
  }

  return title;
}
const getTabBarIcon = (navigation, focused, tintColor) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : ''}`;
      }
    
      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
};
const Nav = createAppContainer(Platform.OS === 'ios' 
                              ? createBottomTabNavigator(tabs, options) 
                              : createBottomTabNavigator(tabs, options))

const Titlebar = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Home,
    },
    Settings: {
      screen: Settings
    }
  })
);

const Navigator = createAppContainer(Titlebar)

export default Navigator