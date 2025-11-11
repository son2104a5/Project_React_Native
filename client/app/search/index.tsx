import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Hotel } from '@/interfaces/hotel.interface';
import {
  getHotelByNameContain,
  getHotels,
  getImageHotels,
} from '@/apis/hotel.api';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function SearchScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all hotels ban đầu
  useEffect(() => {
    const fetchHotelsAndImages = async () => {
      try {
        const hotelsRes = await getHotels();
        const imagesRes = await getImageHotels();

        const hotelData = hotelsRes?.data;
        const imageData = imagesRes?.data;

        const imageMap = new Map<string, string[]>();
        imageData.forEach(
          (img: { hotel: { name: string }; imageUrl: string }) => {
            if (!imageMap.has(img.hotel.name)) {
              imageMap.set(img.hotel.name, []);
            }
            imageMap.get(img.hotel.name)!.push(img.imageUrl);
          }
        );

        const updatedHotels = hotelData.map(
          (hotel: { name: string; image: any }) => ({
            ...hotel,
            image: imageMap.get(hotel.name) || hotel.image,
          })
        );

        setHotels(updatedHotels);
      } catch (error) {
        console.error('Lỗi khi lấy hotels và images:', error);
      }
    };

    fetchHotelsAndImages();
  }, []);

  // ✅ Search realtime (debounce 400ms)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length === 0) {
        return;
      }
      handleSearch(search.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  // ✅ Hàm gọi API search
  const handleSearch = async (text: string) => {
    try {
      setLoading(true);
      const res = await getHotelByNameContain(text);
      if (res.success) {
        setHotels(res.data);
      } else {
        setHotels([]);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render từng khách sạn
  const renderHotel = (hotel: any) => (
    <Pressable
      key={hotel.id}
      className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
      style={{ width: CARD_WIDTH }}
      onPress={() => router.push(`/search/${hotel.id}`)}
    >
      {hotel?.image ? (
        <Image source={{ uri: hotel?.image[0] }} className="w-full h-32" />
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
          <Text className="text-xs text-gray-500 ml-1">
            ({hotel.reviews} Reviews)
          </Text>
        </View>
        <Text className="font-semibold text-sm">{hotel.name}</Text>
        <Text className="text-xs text-gray-500">
          <Entypo name="location" size={10} color="black" /> {hotel.address}
        </Text>
        <Text className="text-lg font-bold text-[#6783ff] mt-1">
          ${hotel.price}
          <Text className="text-xs font-normal text-gray-500">/night</Text>
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 pt-4 pb-3">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              className="flex-1 ml-2 text-base"
              autoFocus
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={20} color="gray" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Use current location */}
        <Pressable className="flex-row items-center mt-6 mb-6">
          <Ionicons name="location-outline" size={20} color="#6783ff" />
          <Text className="ml-2 text-[#6783ff] font-medium">
            or use my current location
          </Text>
        </Pressable>

        {/* Recent Search */}
        <Text className="text-sm text-gray-500 mb-3">Recent Search</Text>

        {/* Nearby */}
        <Text className="text-lg font-bold mt-6 mb-4">
          Search Result
        </Text>

        {/* Kết quả */}
        {loading ? (
          <Text className="text-gray-400 text-center mt-6">Loading...</Text>
        ) : hotels.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {hotels.map(renderHotel)}
          </View>
        ) : (
          <Text className="text-gray-400 text-center mt-6">
            No hotels found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});