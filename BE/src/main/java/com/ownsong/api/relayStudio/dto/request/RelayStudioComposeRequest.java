package com.ownsong.api.relayStudio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RelayStudioComposeRequest {

    @Schema(description = "relayStudioID", example = "4")
    private long relayStudioID;

    @Schema(description = "악보", example = "[[1, 2], [0, 1]]")
    private String relayStudioSheet;

    @Schema(description = "완료 : true, 중간저장 : false", example = "true")
    private boolean complete;
}
