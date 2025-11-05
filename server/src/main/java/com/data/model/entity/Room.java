package com.data.model.entity;

import com.data.model.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    private Integer floor;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    private RoomStatus status = RoomStatus.AVAILABLE;
}
