package com.data.controller;

import com.data.model.dto.req.RoomRequestDTO;
import com.data.model.dto.res.APIResponse;
import com.data.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/rooms")
public class RoomController {
    private final IRoomService roomService;

    @GetMapping
    public ResponseEntity<?> getAllRooms(@RequestBody RoomRequestDTO roomRequestDTO) {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Successfully retrieved all rooms")
                .data(roomService.getRooms(roomRequestDTO.getRoomNumber(), roomRequestDTO.getMin(), roomRequestDTO.getMax(), roomRequestDTO.getSort()))
                .timestamp(LocalDateTime.now())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Successfully retrieved all rooms")
                .data(roomService.getRoom(id))
                .timestamp(LocalDateTime.now())
                .build());
    }
}
