package com.data.service;

import com.data.model.dto.req.ReviewRequestDTO;
import com.data.model.entity.Hotel;
import com.data.model.entity.Review;
import com.data.model.entity.User;

import java.util.List;

public interface IReviewService {
    List<Review> findAllByHotelId(Long id);
    Review makeNewReview(ReviewRequestDTO review, User user);
    Review updateReview(ReviewRequestDTO review, Long id);
}
