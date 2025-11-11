import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    Switch,
    StyleSheet,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Profile() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);

    const user = {
        name: 'Curtis Weaver',
        email: 'curtis.weaver@example.com',
        avatar: require('../../assets/images/react-logo.png'),
    };

    const menuItems = [
        { icon: 'pencil', label: 'Edit Profile', onPress: () => router.push("/(tabs)/profile") },
        { icon: 'lock-closed', label: 'Change Password', onPress: () => router.push("/(tabs)/profile") },
        { icon: 'card', label: 'Payment Method', onPress: () => router.push("/(tabs)/profile") },
        { icon: 'receipt', label: 'My Bookings', onPress: () => router.push("/(tabs)/profile") },
        { icon: 'moon', label: 'Dark Mode', isToggle: true },
        { icon: 'shield-checkmark', label: 'Privacy Policy', onPress: () => router.push("/(tabs)/profile") },
        { icon: 'document-text', label: 'Terms & Conditions', onPress: () => router.push("/(tabs)/profile") },
    ];

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.multiRemove(['ACCESS_TOKEN', 'REFRESH_TOKEN', 'USER']);
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header - Purple */}
            <View className="bg-[#6783ff] pt-4 pb-12 px-6 rounded-b-3xl">
                <Text className="text-white text-xl font-bold text-center mt-4">My Profile</Text>

                {/* User Info */}
                <View className="flex-row items-center mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                    <Image
                        source={user.avatar}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-white text-lg font-bold">{user.name}</Text>
                        <Text className="text-white/80 text-sm">{user.email}</Text>
                    </View>
                    <Pressable className="p-2">
                        <AntDesign name="edit" size={18} color="#fff" />
                    </Pressable>
                </View>
            </View>

            {/* Menu List */}
            <View className="px-6">
                <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={item.onPress}
                            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 last:border-0"
                        >
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 bg-gray-100 rounded-xl items-center justify-center mr-3">
                                    <Ionicons name={item.icon as any} size={20} color="#000" />
                                </View>
                                <Text className="text-gray-800 text-base font-medium">{item.label}</Text>
                            </View>

                            {item.isToggle ? (
                                <Switch
                                    value={darkMode}
                                    onValueChange={setDarkMode}
                                    trackColor={{ false: '#e5e7eb', true: '#6783ff' }}
                                    thumbColor={darkMode ? '#fff' : '#f3f4f6'}
                                />
                            ) : (
                                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                            )}
                        </Pressable>
                    ))}
                </View>

                {/* Logout Button */}
                <Pressable
                    onPress={handleLogout}
                    className="my-4 bg-[#6783ff] rounded-full py-4 flex-row items-center justify-center"
                >
                    <Ionicons name="log-out-outline" size={20} color="white" className="mr-2" />
                    <Text className="text-white text-base font-semibold">Logout</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}