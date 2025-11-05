import { Stack, Tabs } from 'expo-router'
import React from 'react'

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name='account' />
    </Tabs>
  )
}
