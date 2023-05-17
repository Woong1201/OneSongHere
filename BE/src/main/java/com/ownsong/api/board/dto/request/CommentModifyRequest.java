package com.ownsong.api.board.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CommentModifyRequest {

    @Schema(description = "댓글 번호", example = "1", required = true)
    @NotNull
    private long commentId;

    @Schema(description = "내용", example = "내용입니다.")
    @NotNull
    private String commentContent;

}