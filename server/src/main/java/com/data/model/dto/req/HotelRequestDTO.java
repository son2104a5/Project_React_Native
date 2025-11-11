package com.data.model.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelRequestDTO {
    private String hotelName;
    private String hotelAddress;
    private String hotelPhone;
    private String hotelDescription;
    private String image;
    private String hotelCity;
    private String hotelCountry;
}
