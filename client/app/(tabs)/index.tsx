import { useRouter } from 'expo-router';
import React from 'react'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/auth/login');
  }
  return (
    <SafeAreaView>
      <Text>index</Text>
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  )
}
