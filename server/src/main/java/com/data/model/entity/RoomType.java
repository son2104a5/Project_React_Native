package com.data.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "room_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer capacity;
    private Double pricePerNight;
    private String bedType;
    private Double area;

    private Boolean status = true;

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    private List<Room> rooms;
}
