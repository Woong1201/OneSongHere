package com.ownsong.api.board.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CommentCreateRequest {

    @Schema(description = "게시글 번호", example = "1", required = true)
    @NotNull
    private long boardId;

    @Schema(description = "내용", example = "내용입니다.")
    @NotNull
    private String commentContent;

}