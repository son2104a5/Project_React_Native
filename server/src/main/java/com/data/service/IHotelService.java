package com.data.service;

import com.data.model.dto.req.HotelRequestDTO;
import com.data.model.entity.Hotel;
import com.data.model.entity.HotelImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IHotelService {
    public List<Hotel> getAllHotelActive();
    public List<HotelImage> getAllHotelImages();
    public Hotel addHotel(HotelRequestDTO hotel) throws IOException;
    public Hotel getHotelById(long hotelId);
    public List<Hotel> findHotelByNameContaining(String hotelName);
}
