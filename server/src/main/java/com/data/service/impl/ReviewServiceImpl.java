package com.data.service.impl;

import com.data.model.dto.req.ReviewRequestDTO;
import com.data.model.entity.Hotel;
import com.data.model.entity.Review;
import com.data.model.entity.User;
import com.data.repository.IReviewRepository;
import com.data.service.IHotelService;
import com.data.service.IReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements IReviewService {
    private final IReviewRepository reviewRepository;
    private final IHotelService hotelService;

    @Override
    public List<Review> findAllByHotelId(Long id) {
        return reviewRepository.findByHotel_Id(id);
    }

    @Override
    public Review makeNewReview(ReviewRequestDTO review, User user) {
        Hotel hotel = hotelService.getHotelById(review.getHotelId());

        Review newReview = Review.builder()
                .user(user)
                .hotel(hotel)
                .comment(review.getComment())
                .createdAt(LocalDateTime.now())
                .rating(review.getRating())
                .build();
        return reviewRepository.save(newReview);
    }


    @Override
    public Review updateReview(ReviewRequestDTO review, Long id) {
        return null;
    }
}
