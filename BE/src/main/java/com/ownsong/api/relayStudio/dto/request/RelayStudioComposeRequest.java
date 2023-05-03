package com.ownsong.api.relayStudio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RelayStudioComposeRequest {

    @Schema(description = "각 인원의 담당 마디 수", example = "4")
    private long relayStudioID;

    @Schema(description = "제목", example = "제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "최대 인원 수", example = "6")
    private int limitOfUsers;

    @Schema(description = "각 인원의 담당 마디 수", example = "4")
    private int numberOfBars;

//    태그에 대하여 나중에 추가

}
