import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Bọc ScrollView bằng KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled" // để bấm ngoài input vẫn ẩn bàn phím
          className="flex-1 px-6"
        >
          {/* Logo Section */}
          <View className="mt-12 mb-8">
            <View className="flex-row items-center">
              <View className="w-12 h-12 border-[3px] border-[#60A5FA] rounded-full mr-2" />
              <View className="flex-row items-baseline">
                <Text className="text-[#60A5FA] text-lg font-normal">live</Text>
                <Text className="text-[#60A5FA] text-xl font-semibold ml-1">
                  Green
                </Text>
              </View>
            </View>
          </View>

          {/* Title Section */}
          <View className="mb-8">
            <Text
              className="text-3xl font-bold text-black mb-2"
              style={styles.fontFamily}
            >
              Let's get you Login!
            </Text>
            <Text className="text-gray-400 text-base">
              Enter your information below
            </Text>
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row gap-4 mb-6">
            <Pressable className="flex-1 bg-white border border-gray-300 rounded-xl py-4 px-4 flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="google"
                size={20}
                color="#4285F4"
                style={{ marginRight: 8 }}
              />
              <Text className="text-black font-medium">Google</Text>
            </Pressable>

            <Pressable className="flex-1 bg-white border border-gray-300 rounded-xl py-4 px-4 flex-row items-center justify-center">
              <Ionicons
                name="logo-facebook"
                size={20}
                color="#1877F2"
                style={{ marginRight: 8 }}
              />
              <Text className="text-black font-medium">Facebook</Text>
            </Pressable>
          </View>

          {/* Separator */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">Or login with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-[#60A5FA] text-sm mb-2 font-medium">
              Email Address
            </Text>
            <View className="border-2 border-[#60A5FA] rounded-xl bg-white">
              <TextInput
                className="px-4 py-4 text-base text-black"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-black text-sm mb-2 font-medium">
              Password
            </Text>
            <View className="border-2 border-[#60A5FA] rounded-xl bg-white flex-row items-center">
              <TextInput
                className="flex-1 px-4 py-4 text-base text-black"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="px-4"
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable className="bg-[#3B82F6] rounded-xl py-4 mb-6">
            <Text className="text-white text-center text-lg font-semibold">
              Login
            </Text>
          </Pressable>

          {/* Register Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text className="text-black text-base">
                Don't have an account?{' '}
              </Text>
              <Link href="/auth/register" asChild>
                <Pressable>
                  <Text className="text-[#60A5FA] text-base font-semibold">
                    Register Now
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'times new roman',
  },
});
