import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { getAllUser } from '@/apis/auth.api';
import { getHotels, getImageHotels } from '@/apis/hotel.api';
import { Hotel, HotelImage } from '@/interfaces/hotel.interface';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function Home() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = await AsyncStorage.multiGet(['ACCESS_TOKEN', 'REFRESH_TOKEN']);
        const hasTokens = tokens.some(([_, value]) => value !== null);
        if (!hasTokens) {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        router.replace('/(auth)/login');
      }
    };

    const checkFirstUser = async () => {
      try {
        const response = await getAllUser();
        const users = response?.data;

        if (users.length == 0) {
          router.replace('/(tabs)')
        }
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };

    checkAuth();
    checkFirstUser();
  }, [router]);

  useEffect(() => {
    const fetchHotelsAndImages = async () => {
      try {
        const hotelsRes = await getHotels();
        const imagesRes = await getImageHotels();
  
        const hotelData = hotelsRes?.data;
        const imageData = imagesRes?.data;
  
        const imageMap = new Map<string, string[]>();
        imageData.forEach((img: { hotel: { name: string; }; imageUrl: string; }) => {
          if (!imageMap.has(img.hotel.name)) {
            imageMap.set(img.hotel.name, []);
          }
          imageMap.get(img.hotel.name)!.push(img.imageUrl);
        });
  
        const updatedHotels = hotelData.map((hotel: { name: string; image: any; }) => ({
          ...hotel,
          image: imageMap.get(hotel.name) || hotel.image,
        }));
  
        setHotels(updatedHotels);
      } catch (error) {
        console.error('Lỗi khi lấy hotels và images:', error);
      }
    };
  
    fetchHotelsAndImages();
  }, []);
  

  const renderCity = ({ item }: any) => (
    <Pressable className="items-center mr-4">
      <Image source={{ uri: `${item.image[0]}` }} className="w-16 h-16 rounded-full mb-2" />
      <Text className="text-xs text-gray-700">{item.city}</Text>
    </Pressable>
  );

  const renderHotelCard = (hotel: any) => (
    <Pressable
      key={hotel.id}
      className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
      style={{ width: CARD_WIDTH }}
      onPress={() => router.push(`/search/${hotel.id}`)}
    >
      {hotel.image[0] ? (
        <Image source={{ uri: hotel.image[0] }} className="w-full h-32" />
      ) : (
        <View
          className="w-full h-32 bg-gray-200 flex items-center justify-center"
        >
          <Text className="text-gray-500">No Image</Text>
        </View>
      )}
      <View className="p-3">
        <View className="flex-row items-center mb-1">
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text className="text-xs font-semibold ml-1">{hotel.starRating}</Text>
          <Text className="text-xs text-gray-500 ml-1">({hotel.reviews} Reviews)</Text>
        </View>
        <Text className="font-semibold text-sm">{hotel.name}</Text>
        <Text className="text-xs text-gray-500"><Entypo name="location" size={10} color="black" /> {hotel.address}</Text>
        <Text className="text-lg font-bold text-[#6783ff] mt-1">
          ${hotel.price}<Text className="text-xs font-normal text-gray-500">/night</Text>
        </Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#6783ff] pt-4 pb-8 px-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-6">
          <Ionicons name="menu" size={28} color="white" />
          <Image
            source={require('../../assets/images/logo2.png')}
            className='w-28 h-16'
          />
          <Text className='ml-7'></Text>
        </View>

        {/* Search Bar */}
        <View className="bg-white/20 backdrop-blur-md rounded-full px-4 py-3 flex-row items-center">
          {/* Search Bar - Bấm vào sẽ mở màn hình tìm kiếm */}
          <Pressable
            onPress={() => router.push('/search')}
            className="bg-white/20 backdrop-blur-md rounded-full px-4 py-3 flex-row items-center"
          >
            <Ionicons name="search" size={20} color="white" />
            <Text className="flex-1 ml-2 text-white">Search</Text>
            <Ionicons name="options-outline" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Cities */}
      <View className="px-6 mt-6">
        <FlatList
          data={hotels}
          renderItem={renderCity}
          keyExtractor={(item: any) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        />
      </View>

      {/* Best Hotels */}
      <View className="px-6 mt-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Best Hotels</Text>
          <Pressable>
            <Text className="text-[#6783ff] text-sm font-medium">See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={hotels}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingRight: 16 }}
          renderItem={({ item }) => renderHotelCard(item)}
        />
      </View>


      {/* Nearby */}
      <View className="px-6 mt-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Nearby your location</Text>
          <Pressable>
            <Text className="text-[#6783ff] text-sm font-medium">See All</Text>
          </Pressable>
        </View>
        <View className="space-y-4">
          {hotels.map((hotel) => (
            <Pressable
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden flex-row shadow-sm"
            >
              <Image source={{ uri: `${hotel.image[0]}` }} className="w-24 h-24" />
              <View className="flex-1 p-3 justify-between">
                <View>
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className="text-xs font-semibold ml-1">{hotel.starRating}</Text>
                    <Text className="text-xs text-gray-500 ml-1">({hotel.reviews} Reviews)</Text>
                  </View>
                  <Text className="font-semibold text-sm">{hotel.name}</Text>
                  <Text className="text-xs text-gray-500">{hotel.address}</Text>
                </View>
                <Text className="text-lg font-bold text-[#6783ff]">
                  ${hotel.price}<Text className="text-xs font-normal text-gray-500">/night</Text>
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="h-20" />
    </ScrollView>
  );
}