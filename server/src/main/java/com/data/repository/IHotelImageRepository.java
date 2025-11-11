package com.data.repository;

import com.data.model.entity.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHotelImageRepository extends JpaRepository<HotelImage, Long> {
}
