package com.data.model.entity;

import com.data.model.enums.HotelStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String address;
    private String city;
    private String country;

    private Integer starRating;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @Enumerated(EnumType.STRING)
    private HotelStatus status = HotelStatus.ACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<RoomType> roomTypes;
}
