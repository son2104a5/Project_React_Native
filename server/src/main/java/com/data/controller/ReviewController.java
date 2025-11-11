package com.data.controller;

import com.data.model.dto.req.ReviewRequestDTO;
import com.data.model.dto.res.APIResponse;
import com.data.model.entity.User;
import com.data.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {
    private final IReviewService reviewService;

    @GetMapping("/{hotelId}")
    public ResponseEntity<?> getReviewByHotelId(@PathVariable long hotelId) {
        return ResponseEntity.status(HttpStatus.OK).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(reviewService.findAllByHotelId(hotelId))
                .build());
    }

    @PostMapping("/{hotelId}")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequestDTO review, User user) {
        return ResponseEntity.status(201).body(APIResponse.builder()
                .message("Success")
                .success(true)
                .data(reviewService.makeNewReview(review, user))
                .build());
    }
}
