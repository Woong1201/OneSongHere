package com.ownsong.api.studio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class StudioSheetRequest {


    @Schema(description = "스튜디오 아이디", example = "3")
    @NotNull
    private long studioId;

    @Schema(description = "작성 중인 악보", example = "[[0, 1, 0], [1, 0, 0], [1, 1, 1]]")
    @NotNull
    private String studioSheet;

    @Builder
    public StudioSheetRequest(long studioId, String studioSheet) {
        this.studioId = studioId;
        this.studioSheet = studioSheet;
    }
}
