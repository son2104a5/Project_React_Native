import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Stack, Tabs } from 'expo-router'
import React from 'react'

export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#6783ff',   
      tabBarInactiveTintColor: '#9ca3af',  
      tabBarShowLabel: false,             
      tabBarStyle: {
        borderTopWidth: 0,                 
        elevation: 0,
        shadowOpacity: 0,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }} />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Bookings',
          tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />
          ),
        }} />
    </Tabs>
  )
}
