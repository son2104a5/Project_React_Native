package com.data.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Booking booking;

    @ManyToOne
    private Room room;

    private Double price;
    private String note;
}
