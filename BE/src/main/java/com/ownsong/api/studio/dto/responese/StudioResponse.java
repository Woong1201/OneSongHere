package com.ownsong.api.studio.dto.responese;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StudioResponse {

    @Schema(description = "스튜디오 id", example = "1")
    @NotNull
    private long studioId;

    @Schema(description = "스튜디오 제목", example = "힙합만드실분@@")
    @NotNull
    private String studioTitle;

    @Schema(description = "장르", example = "힙합")
    @NotNull
    private String genre;

    @Schema(description = "호스트(방장) id", example = "3")
    @NotNull
    private long hostId;

    @Schema(description = "스튜디오 종료일자", example = "2023-05-04T04:38:20.871Z")
    @NotNull
    private LocalDateTime endDate;

    @Builder
    public StudioResponse(long studioId, String studioTitle, String genre, long hostId, LocalDateTime endDate) {
        this.studioId = studioId;
        this.studioTitle = studioTitle;
        this.genre = genre;
        this.hostId = hostId;
        this.endDate = endDate;
    }
}
