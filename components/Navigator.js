import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Home from "../screens/Home.js"
import Profile from "../screens/Profile.js"
import Activity from "../screens/Activity.js"
import AddActivity from "../screens/AddActivity.js"
import Meal from "../screens/Meal.js"
import AddMeal from "../screens/AddMeal.js"
import Sleep from "../screens/Sleep.js"
import AddSleep from "../screens/AddSleep.js"
import Details from "../screens/Details.js"

const tabs = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
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
  } else {
    title = 'Profile'
  }

  return title;
}
const getTabBarIcon = (navigation, focused, tintColor) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : ''}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : ''}`;
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
      screen: Nav,
      navigationOptions: () => ({
        title: 'Health App',
        headerTitleStyle: {flex:1, marginLeft:157, paddingBottom:30, justifyContent:'center', alignItems: 'center',}
      }),
    },
    Activity: {
      screen: Activity,
      navigationOptions: () => ({
        title: `Activity`,
      }),
    },
    Meal: {
      screen: Meal,
      navigationOptions: () => ({
        title: `Meal`,
      }),
    },
    Sleep: {
      screen: Sleep,
      navigationOptions: () => ({
        title: `Sleep`,
      }),
    },
    ADDACTIVITY: {
      screen: AddActivity,
      navigationOptions: () => ({
        title: `Add Activity`,
      }),
    },
    ADDMEAL: {
      screen: AddMeal,
      navigationOptions: () => ({
        title: `Add Meal`,
      }),
    },
    ADDSLEEP: {
      screen: AddSleep,
      navigationOptions: () => ({
        title: `Add Sleep`,
      }),
    },
    Activities: {
      screen: Details,
    },
    Meals: {
      screen: Details,
    },
    Pedometer: {
      screen: Details,
    },
    NutrientChart: {
      screen: Details,
    }
  })
);

const Navigator = createAppContainer(Titlebar)

export default Navigator