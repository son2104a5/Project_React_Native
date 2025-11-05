import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('Male');

  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDatePicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const selectedMonth = dateOfBirth.getMonth();
    const selectedYear = dateOfBirth.getFullYear();
    const selectedDay = dateOfBirth.getDate();
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 max-h-[70%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-black">Select Date</Text>
              <Pressable onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </Pressable>
            </View>

            <ScrollView className="mb-4">
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-600 mb-2">Month</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                  {months.map((month, index) => (
                    <Pressable
                      key={index}
                      onPress={() => setDateOfBirth(new Date(selectedYear, index, Math.min(selectedDay, getDaysInMonth(index, selectedYear))))}
                      className={`px-4 py-2 mr-2 rounded-lg ${selectedMonth === index ? 'bg-[#60A5FA]' : 'bg-gray-200'}`}
                    >
                      <Text className={`${selectedMonth === index ? 'text-white font-semibold' : 'text-black'}`}>
                        {month}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-600 mb-2">Day</Text>
                <View className="flex-row flex-wrap">
                  {days.map((day) => (
                    <Pressable
                      key={day}
                      onPress={() => setDateOfBirth(new Date(selectedYear, selectedMonth, day))}
                      className={`w-12 h-12 items-center justify-center mr-2 mb-2 rounded-lg ${selectedDay === day ? 'bg-[#60A5FA]' : 'bg-gray-200'}`}
                    >
                      <Text className={`${selectedDay === day ? 'text-white font-semibold' : 'text-black'}`}>
                        {day}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-600 mb-2">Year</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {years.map((year) => (
                    <Pressable
                      key={year}
                      onPress={() => setDateOfBirth(new Date(year, selectedMonth, Math.min(selectedDay, getDaysInMonth(selectedMonth, year))))}
                      className={`px-4 py-2 mr-2 rounded-lg ${selectedYear === year ? 'bg-[#60A5FA]' : 'bg-gray-200'}`}
                    >
                      <Text className={`${selectedYear === year ? 'text-white font-semibold' : 'text-black'}`}>
                        {year}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>

            <Pressable
              onPress={() => setShowDatePicker(false)}
              className="bg-[#60A5FA] rounded-xl py-4"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

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
          <View className="mt-8 mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 border-[3px] border-[#60A5FA] rounded-full mr-2" />
              <View className="flex-row items-baseline">
                <Text className="text-[#60A5FA] text-lg font-normal">live</Text>
                <Text className="text-[#60A5FA] text-xl font-semibold ml-1">Green</Text>
              </View>
            </View>
          </View>

          {/* Title Section */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-black mb-2" style={styles.fontFamily}>
              Register Now!
            </Text>
            <Text className="text-gray-400 text-base">
              Enter your information below
            </Text>
          </View>

          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-[#60A5FA] text-sm mb-2 font-medium">Name</Text>
            <View className="border-2 border-[#60A5FA] rounded-xl bg-white">
              <TextInput
                className="px-4 py-4 text-base text-black"
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-[#60A5FA] text-sm mb-2 font-medium">Email Address</Text>
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

          {/* Mobile Number Input */}
          <View className="mb-4">
            <Text className="text-[#60A5FA] text-sm mb-2 font-medium">Mobile Number</Text>
            <View className="border-2 border-[#60A5FA] rounded-xl bg-white">
              <TextInput
                className="px-4 py-4 text-base text-black"
                placeholder="Enter your mobile number"
                placeholderTextColor="#9CA3AF"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Date of Birth Input */}
          <View className="mb-4">
            <Text className="text-[#60A5FA] text-sm mb-2 font-medium">Date of Birth</Text>
            <Pressable
              onPress={handleDatePress}
              className="border-2 border-[#60A5FA] rounded-xl bg-white flex-row items-center justify-between"
            >
              <Text className="flex-1 px-4 py-4 text-base text-black">
                {formatDate(dateOfBirth)}
              </Text>
              <Pressable
                onPress={handleDatePress}
                className="px-4"
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#60A5FA"
                />
              </Pressable>
            </Pressable>
            {renderDatePicker()}
          </View>

          {/* Gender Selection */}
          <View className="mb-6">
            <Text className="text-black text-base mb-3 font-medium">Gender</Text>
            <View className="flex-row gap-6">
              <Pressable
                onPress={() => setGender('Male')}
                className="flex-row items-center"
              >
                <View className="w-5 h-5 rounded-full border-2 mr-2 items-center justify-center"
                  style={{ borderColor: gender === 'Male' ? '#60A5FA' : '#9CA3AF' }}
                >
                  {gender === 'Male' && (
                    <View className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                  )}
                </View>
                <Text className="text-black text-base">Male</Text>
              </Pressable>

              <Pressable
                onPress={() => setGender('Female')}
                className="flex-row items-center"
              >
                <View className="w-5 h-5 rounded-full border-2 mr-2 items-center justify-center"
                  style={{ borderColor: gender === 'Female' ? '#60A5FA' : '#9CA3AF' }}
                >
                  {gender === 'Female' && (
                    <View className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                  )}
                </View>
                <Text className="text-black text-base">Female</Text>
              </Pressable>
            </View>
          </View>

          {/* Register Button */}
          <Pressable className="bg-[#60A5FA] rounded-xl py-4 mb-6">
            <Text className="text-white text-center text-lg font-semibold">
              Register
            </Text>
          </Pressable>

          {/* Login Link */}
          <View className="items-center mb-8">
            <View className="flex-row items-center">
              <Text className="text-black text-base">Already a member? </Text>
              <Link href="/auth/login" asChild>
                <Pressable>
                  <Text className="text-[#60A5FA] text-base font-semibold">
                    Login
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
    fontFamily: 'times new roman'
  },
})