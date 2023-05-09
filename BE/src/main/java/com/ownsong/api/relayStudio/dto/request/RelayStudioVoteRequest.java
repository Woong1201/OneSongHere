package com.ownsong.api.relayStudio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RelayStudioVoteRequest {
    @Schema(description = "relayStudioId", example = "4")
    private long relayStudioId;

    @Schema(description = "찬성 : true, 반대 : false", example = "true")
    private boolean vote;
}
