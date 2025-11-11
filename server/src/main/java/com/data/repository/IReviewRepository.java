package com.data.repository;

import com.data.model.entity.Hotel;
import com.data.model.entity.Review;
import com.data.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHotel_Id(Long id);
    boolean existsByUserAndHotel(User user, Hotel hotel);
}
