package com.data.repository;

import com.data.model.entity.Room;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r WHERE r.roomNumber LIKE %:roomNumber% AND r.price BETWEEN :min AND :max")
    List<Room> getRoomsByFilter(@Param("roomNumber") String roomNumber,
                                @Param("min") int min,
                                @Param("max") int max,
                                Sort sort);

    Room getRoomById(Long id);
}
