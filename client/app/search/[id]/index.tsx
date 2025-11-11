import { getHotelById, getImageHotels } from '@/apis/hotel.api';
import { Hotel } from '@/interfaces/hotel.interface';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchDetail() {
  const { id } = useLocalSearchParams();
  const hotelId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const [hotel, setHotel] = useState<Hotel>();

  useEffect(() => {
    const fetchHotelAndImages = async () => {
      try {
        const hotelRes = await getHotelById(hotelId);
        const imagesRes = await getImageHotels();

        const hotelData = hotelRes?.data;
        const imageData = imagesRes?.data;

        const hotelImages = imageData
          .filter((img: { hotel: { id: number } }) => img.hotel.id === hotelData.id)
          .map((img: { imageUrl: string }) => img.imageUrl);

        const updatedHotel = {
          ...hotelData,
          image: hotelImages.length > 0 ? hotelImages : hotelData.image,
        };

        setHotel(updatedHotel);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết hotel và hình ảnh:', error);
      }
    };

    fetchHotelAndImages();
  }, [id]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <Icon name="heart-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Main Image */}
        <Image
          source={{ uri: `${hotel?.image[0]}` }}
          style={styles.mainImage}
        />

        {/* Rating & Reviews */}
        <Pressable style={styles.ratingContainer} onPress={() => router.push(`/search/${hotel?.id}/review`)}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={16} color="#FFD700" />
            ))}
          </View>
          <Text style={styles.ratingText}>{hotel?.starRating}</Text>
          <Text style={styles.reviews}>(20 reviews)</Text>
        </Pressable>

        {/* Title */}
        <Text style={styles.title}>{hotel?.name}</Text>
        <Text style={styles.location}>
          <Icon name="location-outline" size={14} color="#666" /> {hotel?.address}
        </Text>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>
          Animi autem mollit con deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>

        {/* Photos Grid */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <View style={styles.photoGrid}>
          {[1, 2, 3, 4].map((i) => (
            <FlatList
              data={hotel?.image}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.photoItem}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ))}
        </View>

        {/* Room Info */}
        <Text style={styles.roomTitle}>Room in boutique hotel</Text>
        <Text style={styles.hostedBy}>
          Hosted by <Text style={styles.hostName}>Marine</Text>
        </Text>
        <Text style={styles.roomDetails}>
          2 guests · 1 bedroom · 1 bed · 1 bathroom
        </Text>

        {/* Highlights */}
        <View style={styles.highlights}>
          {[
            { icon: 'shield-checkmark', title: 'Enhanced Clean', desc: 'This host committed to Airbnb\'s 5-step enhanced cleaning process.' },
            { icon: 'location', title: 'Great Location', desc: '95% of recent guests gave the location a 5-star rating.' },
            { icon: 'key', title: 'Great check-in experience', desc: '90% of recent guests gave the check-in process a 5-star rating.' },
          ].map((item, i) => (
            <View key={i} style={styles.highlightItem}>
              <Icon name={item.icon} size={24} color="#000" />
              <View style={styles.highlightText}>
                <Text style={styles.highlightTitle}>{item.title}</Text>
                <Text style={styles.highlightDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Cancellation Policy */}
        <View style={styles.cancellation}>
          <Icon name="calendar-outline" size={20} color="#000" />
          <Text style={styles.cancellationText}>
            Free cancellation until 2:00 PM on 8 May
          </Text>
        </View>

        {/* Price & Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>$120 <Text style={styles.perNight}>/night</Text></Text>
          <TouchableOpacity style={styles.selectDateButton}>
            <Text style={styles.selectDateText}>Select Date</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'absolute', top: 50, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10,
  },
  backButton: { backgroundColor: '#fff', borderRadius: 20, padding: 6 },
  heartButton: { backgroundColor: '#fff', borderRadius: 20, padding: 6 },
  mainImage: { width: '100%', height: 300, borderRadius: 0 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 12 },
  stars: { flexDirection: 'row' },
  ratingText: { fontWeight: 'bold', marginLeft: 4 },
  reviews: { color: '#666', marginLeft: 4 },
  title: { fontSize: 22, fontWeight: 'bold', paddingHorizontal: 16, marginTop: 8 },
  location: { color: '#666', paddingHorizontal: 16, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 16, marginTop: 24 },
  overview: { color: '#444', paddingHorizontal: 16, marginTop: 8, lineHeight: 20 },
  showAll: { color: '#0066CC', paddingHorizontal: 16, marginTop: 4, fontWeight: '500' },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 12 },
  photoItem: { width: '48%', height: 100, margin: '1%', borderRadius: 8 },
  roomTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 16, marginTop: 24 },
  hostedBy: { color: '#666', paddingHorizontal: 16, marginTop: 4 },
  hostName: { fontWeight: 'bold', color: '#000' },
  roomDetails: { color: '#666', paddingHorizontal: 16, marginTop: 4 },
  highlights: { paddingHorizontal: 16, marginTop: 20 },
  highlightItem: { flexDirection: 'row', marginBottom: 16 },
  highlightText: { marginLeft: 12, flex: 1 },
  highlightTitle: { fontWeight: '600' },
  highlightDesc: { color: '#666', fontSize: 13, marginTop: 2 },
  cancellation: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 },
  cancellationText: { marginLeft: 8, color: '#000', fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 20,
  },
  price: { fontSize: 20, fontWeight: 'bold' },
  perNight: { fontWeight: 'normal', color: '#666' },
  selectDateButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectDateText: { color: '#fff', fontWeight: '600' },
});