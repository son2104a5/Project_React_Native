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
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  // --- Tự động đổi màu border & label ---
  const getColor = (isFocused: boolean, value: string) =>
    isFocused || value ? '#6783ff' : '#e0e0e0'; // xanh khi focus, xám khi trống

  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      setLoginError(error?.message || "Sai email hoặc mật khẩu");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1 px-6"
        >
          {/* Logo */}
          <View className="mt-6">
            <Image
              source={require('../../assets/images/logo1.png')}
              className="w-48 h-32"
            />
          </View>

          {/* Title */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-black mb-2" style={styles.fontFamily}>
              Let's get you Login!
            </Text>
            <Text className="text-gray-400 text-base">
              Enter your information below
            </Text>
          </View>

          {/* Social Login */}
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

          {/* Email Input - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 text-base text-black bg-white rounded-xl border-2"
              style={{
                borderColor: getColor(isEmailFocused, email),
                fontSize: 16,
              }}
              placeholder=""
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: email || isEmailFocused ? 6 : 18,
                fontSize: email || isEmailFocused ? 12 : 16,
                color: getColor(isEmailFocused, email),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Email Address
            </Text>
          </View>

          {/* Password Input - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 pr-12 text-base text-black bg-white rounded-xl border-2"
              style={{
                borderColor: getColor(isPasswordFocused, password),
                fontSize: 16,
              }}
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: password || isPasswordFocused ? 6 : 18,
                fontSize: password || isPasswordFocused ? 12 : 16,
                color: getColor(isPasswordFocused, password),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Password
            </Text>
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-5"
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
            <View className='items-end'>
              <Text className='text-[#6783ff] mt-3'>Forgot Password?</Text>
            </View>
          </View>
          {/* Hiển thị lỗi login */}
          {loginError ? (
            <View className="mb-4 p-3 bg-red-100 rounded-lg">
              <Text className="text-red-600 text-center text-sm">{loginError}</Text>
            </View>
          ) : null}

          {/* Login Button */}
          <Pressable
            className="rounded-xl py-4 mb-6"
            style={[
              styles.loginButton,
              { backgroundColor: isFormValid ? '#6783ff' : '#f5f5f6' },
            ]}
            disabled={!isFormValid}
            android_ripple={{ color: '#fff' }}
            onPress={() => handleLogin()}
          >
            <Text className="text-center text-lg font-semibold" style={{ color: isFormValid ? '#fff' : '#c0c1c6' }}>
              Login
            </Text>
          </Pressable>

          {/* Register Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text className="text-black text-base">Don't have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text className="text-[#6783ff] text-base font-semibold">
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
  inputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
