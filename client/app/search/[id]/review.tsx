import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Hotel } from "@/interfaces/hotel.interface";
import { getHotelById, getImageHotels } from "@/apis/hotel.api";

export default function Review() {
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
  const reviews = [
    {
      id: 1,
      name: "Savannah Nguyen",
      date: "05 May, 2023",
      rating: 5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Wade Warren",
      date: "04 May, 2023",
      rating: 5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 3,
      name: "Devon Lane",
      date: "04 May, 2023",
      rating: 5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Kathryn Murphy",
      date: "04 May, 2023",
      rating: 5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Reviews</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overall rating */}
        <View style={styles.ratingSummary}>
          <Text style={styles.overallScore}>5.0</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name="star"
                size={20}
                color={i <= 4 ? "#FFD700" : "#E5E7EB"}
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>120 Reviews</Text>
        </View>

        {/* Reviews list */}
        <View style={{ marginTop: 10 }}>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.row}>
                <Image source={{ uri: r.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{r.name}</Text>
                  <Text style={styles.date}>{r.date}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color="#FFD700"
                      style={{ marginLeft: 2 }}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.comment}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
  ratingSummary: {
    alignItems: "center",
    marginVertical: 16,
  },
  overallScore: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  stars: {
    flexDirection: "row",
    marginVertical: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  reviewCard: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  comment: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
});
