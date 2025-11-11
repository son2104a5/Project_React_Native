package com.data.model.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomRequestDTO {
    private String roomNumber;
    private int min;
    private int max;
    private String sort;
}
