package com.ownsong.api.relayStudio.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RelayStudioCreateRequest {

    @Schema(description = "제목", example = "제목입니다.")
    private String relayStudioTitle;

    @Schema(description = "최대 인원 수", example = "6")
    private int limitOfUsers;

    @Schema(description = "각 인원의 담당 마디 수", example = "4")
    private int numberOfBars;

    @Schema(description = "태그", example = "[\"락\", \"발라드\", \"십덕\"]")
    private List<String> tags;

}
