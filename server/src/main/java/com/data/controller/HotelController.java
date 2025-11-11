package com.data.controller;

import com.data.model.dto.req.HotelRequestDTO;
import com.data.model.dto.res.APIResponse;
import com.data.service.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hotel")
public class HotelController {
    private final IHotelService hotelService;

    @PostMapping
    public ResponseEntity<?> addHotel(@RequestBody HotelRequestDTO hotel) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                APIResponse.builder()
                        .message("Create success")
                        .success(true)
                        .data(hotelService.addHotel(hotel))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<?> getHotels() {
        return ResponseEntity.status(HttpStatus.OK).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(hotelService.getAllHotelActive())
                .build());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> getHotelById(@RequestParam long id) {
        return ResponseEntity.status(HttpStatus.OK).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(hotelService.getHotelById(id))
                .build());
    }

    @GetMapping("/image")
    public ResponseEntity<?> getHotelImage() {
        return ResponseEntity.status(HttpStatus.OK).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(hotelService.getAllHotelImages())
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<?> getHotelSearch(@RequestParam("hotelName") String hotelName) {
        return ResponseEntity.status(HttpStatus.OK).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(hotelService.findHotelByNameContaining(hotelName))
                .build());
    }
}
