package com.data.repository;

import com.data.model.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoomImageRepository extends JpaRepository<RoomImage, Long> {
}
