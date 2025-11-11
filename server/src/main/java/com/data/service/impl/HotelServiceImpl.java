package com.data.service.impl;

import com.data.model.dto.req.HotelRequestDTO;
import com.data.model.entity.Hotel;
import com.data.model.entity.HotelImage;
import com.data.model.enums.HotelStatus;
import com.data.repository.IHotelImageRepository;
import com.data.repository.IHotelRepository;
import com.data.service.CloudinaryService;
import com.data.service.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements IHotelService {
    private final CloudinaryService cloudinaryService;
    private final IHotelRepository hotelRepository;
    private final IHotelImageRepository hotelImageRepository;

    @Override
    public List<Hotel> getAllHotelActive() {
        return hotelRepository.findAllActive();
    }

    @Override
    public List<HotelImage> getAllHotelImages() {
        return hotelImageRepository.findAll();
    }

    @Override
    public Hotel addHotel(HotelRequestDTO hotelRequestDTO) throws IOException {
        Hotel newHotel = Hotel.builder()
                .name(hotelRequestDTO.getHotelName())
                .address(hotelRequestDTO.getHotelAddress())
                .description(hotelRequestDTO.getHotelDescription())
                .status(HotelStatus.ACTIVE)
                .city(hotelRequestDTO.getHotelCity())
                .country(hotelRequestDTO.getHotelCountry())
                .starRating((double) 0)
                .createdAt(LocalDateTime.now())
                .build();

//        String imageUrl = cloudinaryService.uploadFile(hotelRequestDTO.getImage());
        hotelRepository.save(newHotel);
        if (hotelRequestDTO.getImage() != null) {
            HotelImage hotelImage = HotelImage.builder()
                    .hotel(newHotel)
                    .imageUrl(hotelRequestDTO.getImage())
                    .build();
            hotelImageRepository.save(hotelImage);
        }

        return newHotel;
    }

    @Override
    public Hotel getHotelById(long hotelId) {
        return hotelRepository.findById(hotelId).orElse(null);
    }

    @Override
    public List<Hotel> findHotelByNameContaining(String hotelName) {
        return hotelRepository.findByNameContaining(hotelName);
    }
}
