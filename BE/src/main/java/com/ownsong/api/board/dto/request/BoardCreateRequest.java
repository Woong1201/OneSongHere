package com.ownsong.api.board.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class BoardCreateRequest {

    @Schema(description = "제목", example = "제목입니다.")
    @NotNull
    private String boardTitle;

    @Schema(description = "헤더", example = "헤더입니다.")
    @NotNull
    private String header;

    @Schema(description = "내용", example = "내용입니다.")
    @NotNull
    private String boardContent;

}