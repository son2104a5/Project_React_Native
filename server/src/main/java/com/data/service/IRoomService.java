package com.data.service;

import com.data.model.entity.Hotel;
import com.data.model.entity.Room;
import org.springframework.data.domain.Limit;

import java.util.List;

public interface IRoomService {
    public List<Room> getRooms(String roomNumber, int max, int min, String sort);
    public Room getRoom(Long id);

}
