package com.ownsong.api.studio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StudioCreateRequest {
    @Schema(description = "스튜디오 제목", example = "힙합 만들 사람 @@")
    @NotNull
    private String studioTitle;

    @Schema(description = "스튜디오 장르", example = "힙합")
    @NotNull
    private String genre;

    @Builder
    public StudioCreateRequest(String studioTitle, String genre) {
        this.studioTitle = studioTitle;
        this.genre = genre;
    }
}
