package com.ownsong.api.board.dto.response;

import com.ownsong.api.board.entity.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class CommentResponse {
    @Schema(description = "댓글 번호", example = "1", required = true)
    @NotNull
    private long commentId;

    @Schema(description = "작성자 번호", example = "1", required = true)
    @NotNull
    private long userId;

    @Schema(description = "작성자 닉네임 입니다.", example = "Zi존두현")
    @NotNull
    private String nickName;

    @Schema(description = "내용", example = "내용입니다.")
    @NotNull
    private String commentContent;

    @Schema(description = "작성일", example = "2023-04-28T16:41:33.6369331")
    @NotNull
    private LocalDateTime commentDate;

    public CommentResponse(Comment comment) {
        this.commentId = comment.getCommentId();
        this.commentContent = comment.getCommentContent();
        this.commentDate = comment.getCommentDate();
        this.userId = comment.getUser().getUserID();
        this.nickName = comment.getUser().getNickname();
    }
}
