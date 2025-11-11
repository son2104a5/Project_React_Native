package com.data.service.impl;

import com.data.model.entity.Room;
import com.data.repository.IRoomImageRepository;
import com.data.repository.IRoomRepository;
import com.data.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {
    private final IRoomRepository roomRepository;
    private final IRoomImageRepository roomImageRepository;

    @Override
    public List<Room> getRooms(String roomNumber, int max, int min , String sort) {
        return roomRepository.getRoomsByFilter(roomNumber, min, max, Sort.by(sort));
    }

    @Override
    public Room getRoom(Long id) {
        return roomRepository.getRoomById(id);
    }
}
