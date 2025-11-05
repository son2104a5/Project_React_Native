import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { register } from '@/apis/auth.api';
import { RegisterRequest } from '@/interfaces/auth.interface';

export default function Register() {
  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileFocused, setIsMobileFocused] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDobFocused, setIsDobFocused] = useState(false);

  const [gender, setGender] = useState('Male');

  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Thêm state lỗi
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    mobileNumber.trim() !== '';

  const getColor = (isFocused: boolean, value: string) =>
    isFocused || value ? '#6783ff' : '#9CA3AF';

  const handleRegister = async () => {
    setErrors({}); // Xóa lỗi cũ
    try {
      const newRequest: RegisterRequest = {
        fullName: name,
        email: email,
        phone: mobileNumber,
        password: password,
        dateOfBirth: dateOfBirth,
      };

      await register(newRequest);
      Alert.alert("Thành công", "Đăng ký thành công!");
      router.push("/(auth)/login");
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors); // { email: "Email đã tồn tại" }
      } else {
        Alert.alert("Lỗi", error.message || "Đã có lỗi xảy ra");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          <View className="mt-6">
            <Image
              source={require('../../assets/images/logo.png')}
              className="w-48 h-32"
            />
          </View>

          {/* Title */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-black mb-2" style={styles.fontFamily}>
              Register Now!
            </Text>
            <Text className="text-gray-400 text-base">Enter your information below</Text>
          </View>

          {/* Name - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 text-base text-black bg-white rounded-xl border-2"
              style={{ borderColor: getColor(isNameFocused, name), fontSize: 16 }}
              placeholder=" "
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: name || isNameFocused ? 6 : 18,
                fontSize: name || isNameFocused ? 12 : 16,
                color: getColor(isNameFocused, name),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Name
            </Text>
          </View>
          <View className="mb-2 relative">
            {/* ... TextInput ... */}
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.name}</Text>
            )}
          </View>

          {/* Email - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 text-base text-black bg-white rounded-xl border-2"
              style={{ borderColor: getColor(isEmailFocused, email), fontSize: 16 }}
              placeholder=" "
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
          <View className="mb-2 relative">
            {/* ... TextInput ... */}
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.email}</Text>
            )}
          </View>

          {/* Mobile Number - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 text-base text-black bg-white rounded-xl border-2"
              style={{ borderColor: getColor(isMobileFocused, mobileNumber), fontSize: 16 }}
              placeholder=" "
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              onFocus={() => setIsMobileFocused(true)}
              onBlur={() => setIsMobileFocused(false)}
            />
            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: mobileNumber || isMobileFocused ? 6 : 18,
                fontSize: mobileNumber || isMobileFocused ? 12 : 16,
                color: getColor(isMobileFocused, mobileNumber),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Mobile Number
            </Text>
          </View>
          <View className="mb-2 relative">
            {/* ... TextInput ... */}
            {errors.phone && (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.phone}</Text>
            )}
          </View>

          {/* Date of Birth - Floating Label + DateTimePicker */}
          <View className="mb-6 relative">
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="px-4 pt-6 pb-3 rounded-xl border-2 flex-row items-center justify-between"
              style={{ borderColor: getColor(isDobFocused, formatDate(dateOfBirth) || '') }}
            >
              <Text
                className="text-base"
                style={{ color: dateOfBirth ? '#000' : '#9CA3AF' }}
              >
                {formatDate(dateOfBirth) || 'Select date'}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={getColor(isDobFocused, formatDate(dateOfBirth) || '')}
              />
            </Pressable>

            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: dateOfBirth || isDobFocused ? 6 : 18,
                fontSize: dateOfBirth || isDobFocused ? 12 : 16,
                color: getColor(isDobFocused, formatDate(dateOfBirth) || ''),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Date of Birth
            </Text>

            {/* Date Picker Modal - Siêu gọn */}
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios'); // iOS giữ mở, Android đóng
                  if (selectedDate) {
                    setDateOfBirth(selectedDate);
                    setIsDobFocused(true);
                  }
                }}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}

            {/* iOS: Nút Done thủ công */}
            {Platform.OS === 'ios' && showDatePicker && (
              <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex-row justify-end">
                <Pressable
                  onPress={() => setShowDatePicker(false)}
                  className="bg-[#60A5FA] px-6 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Done</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Gender */}
          <View className="mb-6">
            <Text className="text-black text-base mb-3 font-medium">Gender</Text>
            <View className="flex-row gap-6">
              {['Male', 'Female'].map((g) => (
                <Pressable key={g} onPress={() => setGender(g)} className="flex-row items-center">
                  <View
                    className="w-5 h-5 rounded-full border-2 mr-2 items-center justify-center"
                    style={{ borderColor: gender === g ? '#6783ff' : '#9CA3AF' }}
                  >
                    {gender === g && <View className="w-3 h-3 rounded-full bg-[#6783ff]" />}
                  </View>
                  <Text className="text-black text-base">{g}</Text>
                </Pressable>
              ))}
            </View>
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
          </View>

          {/* Confirm Password Input - Floating Label */}
          <View className="mb-6 relative">
            <TextInput
              className="px-4 pt-6 pb-3 pr-12 text-base text-black bg-white rounded-xl border-2"
              style={{
                borderColor: getColor(isConfirmPasswordFocused, confirmPassword),
                fontSize: 16,
              }}
              placeholder=""
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
            <Text
              style={{
                position: 'absolute',
                left: 16,
                top: confirmPassword || isConfirmPasswordFocused ? 6 : 18,
                fontSize: confirmPassword || isConfirmPasswordFocused ? 12 : 16,
                color: getColor(isConfirmPasswordFocused, confirmPassword),
                fontWeight: '500',
              }}
              pointerEvents="none"
            >
              Confirm Password
            </Text>
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-5"
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
          <View className="mb-2 relative">
            {/* ... TextInput ... */}
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1 ml-4">{errors.password}</Text>
            )}
          </View>

          {/* Register Button */}
          <Pressable
            className="rounded-xl py-4 mb-6"
            style={{
              backgroundColor: isFormValid ? '#6783ff' : '#f5f5f6',
            }}
            disabled={!isFormValid}
            onPress={() => handleRegister()}
          >
            <Text className="text-center text-lg font-semibold" style={{ color: isFormValid ? '#fff' : '#c0c1c6' }}>
              Register
            </Text>
          </Pressable>

          {/* Login Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text className="text-black text-base">Already a member? </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text className="text-[#6783ff] text-base font-semibold">Login</Text>
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
  fontFamily: { fontFamily: 'times new roman' },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
